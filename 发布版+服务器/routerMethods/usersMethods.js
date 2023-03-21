const db = require('../mysql/mysql')
const { genPassword } = require('../encrpty/encrpty')// crypto


// 查询所有学生用户
exports.getStudent = (req, res) => {
    const request = req.body
    const sql = `select * from users where identity="学生" && status!=0 order by userId asc`
    db.query(sql, (err, results) => {
        if (err) return res.er(err)
        if (results.leng == 0) return res.er('获取数据失败')

        const start = (request.pagenum - 1) * request.pagesize//数据开始序号
        const end = request.pagenum * request.pagesize > results.length ? results.length : request.pagenum * request.pagesize//数据结束序号
        const data = results.slice(start, end)//截取数据
        res.send({ status: 200, message: '获取学生列表数据成功！', data: { total: results.length, pagenum: request.pagenum, users: data } })

    })
}
// 查询所有老师用户
exports.getTeacher = (req, res) => {
    const request = req.body
    const sql = `select * from users where identity="老师" && status!=0 order by userId asc`
    db.query(sql, (err, results) => {
        if (err) return res.er(err)
        if (results.leng == 0) return res.er('获取数据失败')

        const start = (request.pagenum - 1) * request.pagesize
        const end = request.pagenum * request.pagesize > results.length ? results.length : request.pagenum * request.pagesize
        const data = results.slice(start, end)
        res.send({ status: 200, message: '获取老师列表数据成功！', data: { total: results.length, pagenum: request.pagenum, users: data } })

    })
}
// 查询所有管理员用户
exports.getAdmin = (req, res) => {
    const request = req.body

    const sql = `select * from users where identity="管理员" && status!=0 order by userId asc`
    db.query(sql, (err, results) => {
        if (err) return res.er(err)
        if (results.leng == 0) return res.er('获取数据失败')

        const start = (request.pagenum - 1) * request.pagesize
        const end = request.pagenum * request.pagesize > results.length ? results.length : request.pagenum * request.pagesize
        const data = results.slice(start, end)
        res.send({ status: 200, message: '获取管理员列表数据成功！', data: { total: results.length, pagenum: request.pagenum, users: data } })

    })
}

// 根据userId和身份查询用户信息
exports.getUser = (req, res) => {
    console.log(req.body);
    const sql = `select * from users where userId=${req.body.userId} &&identity="${req.body.identity}" && status!=0`
    db.query(sql, (err, results) => {
        if (err) return res.er(err)
        if (results.leng == 0) return res.er('获取数据失败')
        delete results[0].password
        res.send({
            status: 200,
            message: '获取用户列表数据成功！',
            data: { total: results.length, pagenum: 1, users: results }
        })

    })
}
//根据班级查找学生用户
exports.getClass = (req, res) => {
    const request = req.body
    console.log(request);
    const sql1 = `select * from users where identity="学生" && whichClas="${request.class}" && status!=0`
    const sql2 = `select * from users where identity="学生" &&  status!=0`

    db.query(req.body.class ? sql1 : sql2, (err, results) => {
        if (err) return res.er(err)
        if (results.leng == 0) return res.er('获取数据失败')

        const start = (request.pagenum - 1) * request.pagesize
        const end = request.pagenum * request.pagesize > results.length ? results.length : request.pagenum * request.pagesize
        const data = results.slice(start, end)
        console.log(data);
        res.send({ status: 200, message: '获取管理员列表数据成功！', data: { total: results.length, pagenum: request.pagenum, users: data } })

    })
}


// 根据userId,和身份编辑用户信息
exports.editUser = (req, res) => {
    const userInfo = req.body
    console.log(userInfo);
    const sql = `update users set  name="${userInfo.name}", phone="${userInfo.phone}", gender="${userInfo.gender}",  yuanxi ="${userInfo.yuanxi}",discipline="${userInfo.discipline}", whichClas="${userInfo.whichClas}" where userId= "${userInfo.userId}"`
    db.query(sql, (err, results) => {
        if (err) return res.er(err)
        if (results.affectedRows !== 1) {//影响行数！==1则没有添加成功
            return res.er('修改失败！')
        }
        res.send({ status: 200, message: '修改用户成功！', data: results })

    })
}

// 根据userId删除用户
exports.deleteUser = (req, res) => {
    const userId = req.params.id
    console.log(req.params);
    const sql = `update users set status=0 where userId = ${userId}`
    db.query(sql, (err, results) => {
        if (err) return res.er(err)
        if (results.affectedRows !== 1) {//影响行数！==1则没有添加成功
            return res.er('删除失败！')
        }
        res.send({ status: 200, message: '删除成功！', data: [] })
    })
}
//修改用户密码
exports.editPassword = (req, res) => {
    const passwordInfo = req.body
    console.log(passwordInfo);
    // 加密密码
    passwordInfo.OriginalPassword = genPassword(passwordInfo.OriginalPassword)

    const sql = `select * from users where status=1 && userId  = ${passwordInfo.userId}`
    db.query(sql, (err, results) => {
        if (err) return res.er(err)
        if (results.length !== 1) return res.er('用户不存在！')
        // 加密密码,和数据库中存储的密码进行对比
        if (passwordInfo.OriginalPassword !== results[0].password) { return res.er('验证不通过，原密码错误！') }
        // 加密新密码
        if (passwordInfo.password === passwordInfo.checkPass) {
            passwordInfo.password = genPassword(passwordInfo.password)
        }
        const sql2 = `update users set  password="${passwordInfo.password}" where userId=${passwordInfo.userId}`
        db.query(sql2, (err, results) => {
            if (err) return res.er(err)
            if (results.affectedRows !== 1) {//影响行数！==1则没有修改成功
                return res.er('分修改失败！')
            }
            res.send({ status: 200, message: '修改成功', data: [] })
        })
    })
}