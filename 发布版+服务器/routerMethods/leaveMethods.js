const db = require('../mysql/mysql')

// 提交请假申请
exports.apply = (req, res) => {
    const leaveInfo = req.body
    console.log(leaveInfo);

    const sql = `insert into holiday set ?`
    db.query(sql, leaveInfo, (err, results) => {
        if (err) return res.er(err)
        if (results.affectedRows !== 1) {//影响行数！==1则没有修改成功
            return res.er('申请提交失败！')
        }
        res.send({ status: 200, message: '申请已提交，等待审核' })
    })
}

// 获取待审核数据
exports.getVerify = (req, res) => {
    const request = req.body

    const sql = `select * from holiday where verifyStatus="待审核"`
    db.query(sql, (err, results) => {
        if (err) return res.er(err)
        if (results.leng == 0) return res.er('暂无数据')

        const start = (request.pagenum - 1) * request.pagesize
        const end = request.pagenum * request.pagesize > results.length ? results.length : request.pagenum * request.pagesize
        const data = results.slice(start, end)
        res.send({ status: 200, message: '假条数据成功！', data: { total: results.length, pagenum: request.pagenum, ApplyList: data } })
    })
}

// 根据id搜索待审核的假条信息
exports.getVerifyByuserId = (req, res) => {
    const request = req.body

    const sql = `select * from holiday where verifyStatus="待审核" && userId=${request.userId}`
    db.query(sql, (err, results) => {
        if (err) return res.er(err)
        if (results.leng == 0) return res.er('暂无数据')

        const start = (request.pagenum - 1) * request.pagesize
        const end = request.pagenum * request.pagesize > results.length ? results.length : request.pagenum * request.pagesize
        const data = results.slice(start, end)
        res.send({ status: 200, message: '假条数据成功！', data: { total: results.length, pagenum: request.pagenum, ApplyList: data } })
    })
}

// 假条审核
exports.submitVerify = (req, res) => {
    const request = req.body
    console.log(request);
    const id = request.id

    const sql = `update holiday set verifyStatus= "${request.verifyStatus}", resultStatus="${request.resultStatus}", auditor="${request.auditor}" ,opinion="${request.opinion}", auditorId=${request.auditorId} where id= ${id}`
    db.query(sql, (err, results) => {
        if (err) return res.er(err)
        if (results.affectedRows !== 1) {//影响行数！==1则没有修改成功
            return res.er('申请提交失败！')
        }
        res.send({ status: 200, message: '审核成功' })
    })
}


// 查看假条审核结果
exports.getResult = (req, res) => {
    const queryInfo = req.body
    console.log(queryInfo);

    const sql1 = `select * from holiday where verifyStatus="已审核"`
    const sql2 = `select * from holiday where verifyStatus="已审核"&&userId=${queryInfo.userId}`
    var sql
    if (queryInfo.userId === '管理员' || queryInfo.userId === '老师') sql = sql1
    else sql = sql2
    db.query(sql, (err, results) => {
        if (err) return res.er(err)

        if (results.leng == 0) return res.er('暂无数据')

        const start = (queryInfo.pagenum - 1) * queryInfo.pagesize
        const end = queryInfo.pagenum * queryInfo.pagesize > results.length ? results.length : queryInfo.pagenum * queryInfo.pagesize

        const data = results.slice(start, end)
        res.send({ status: 200, message: '查询假条数据获取成功！', data: { total: results.length, pagenum: queryInfo.pagenum, ApplyList: data } })
    })
}

// 根据id搜索已审核的假条信息
exports.getResultByuserId = (req, res) => {
    const queryInfo = req.body

    const sql = `select * from holiday where verifyStatus="已审核" && userId=${queryInfo.userId}`
    db.query(sql, (err, results) => {
        if (err) return res.er(err)
        if (results.leng == 0) return res.er('暂无数据')

        const start = (queryInfo.pagenum - 1) * queryInfo.pagesize
        const end = queryInfo.pagenum * queryInfo.pagesize > results.length ? results.length : queryInfo.pagenum * queryInfo.pagesize
        const data = results.slice(start, end)

        res.send({ status: 200, message: '查询假条数据获取成功！', data: { total: results.length, pagenum: queryInfo.pagenum, ApplyList: data } })
    })
}

// 销假
exports.removeLeave = (req, res) => {
    const queryInfo = req.body

    const sql = `update holiday set removeStatus="已销假" where  id=${queryInfo.id}`
    db.query(sql, (err, results) => {
        if (err) return res.er(err)
        if (results.affectedRows !== 1) {//影响行数！==1则没有修改成功
            return res.er('申请提交失败！')
        }

        res.send({ status: 200, message: '销假成功' })
    })
}