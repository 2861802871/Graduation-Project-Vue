const db = require('../mysql/mysql')

// 修改学分
exports.editScore = (req, res) => {
    const queryInfo = req.body
    console.log(queryInfo);
    var score = Number(queryInfo.score)
    console.log(score);
    const sql1 = `select score from users where userId =${queryInfo.userId}`

    db.query(sql1, (err, results) => {
        if (err) return res.er(err)
        if (results.length < 0) return res.er('未查找到改用户')
        if (queryInfo.type === '加分') { score = results[0].score - 0 + score - 0 }
        if (queryInfo.type === '扣分') { score = results[0].score - score }
        console.log(score);
        console.log('查询通过');

        const sql2 = `insert into score set ?`
        db.query(sql2, queryInfo, (err, results) => {
            if (err) return res.er(err)
            if (results.affectedRows !== 1) {//影响行数！==1则没有修改成功
                return res.er('学分详情修改失败！')
            }
            const sql3 = `update users set  score=${score} where userId=${queryInfo.userId}`
            db.query(sql3, (err, results) => {
                if (err) return res.er(err)
                if (results.affectedRows !== 1) {//影响行数！==1则没有修改成功
                    return res.er('学分修改失败！')
                }
                res.send({ status: 200, message: '修改成功', data: [] })

            })
        })


    })
}

// 查看学分详情
exports.getScore = (req, res) => {
    const userId = req.params.userId
    console.log(userId);
    const sql = `select * from score where  userId =?`
    db.query(sql, userId, (err, results) => {
        if (err) return res.er(err)
        // if (results.length == 0) return res.send({ status: 200, message: '暂无数据', score: results })
        res.send({
            status: 200,
            message: '获取学分详情数据成功！',
            data: { total: results.length, score: results }
        })

    })
}