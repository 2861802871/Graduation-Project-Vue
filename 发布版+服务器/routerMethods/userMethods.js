const db = require('../mysql/mysql')
const bcrypt = require('bcryptjs')//加密包
const { genPassword } = require('../encrpty/encrpty')// crypto
const secreKey = require('../secre/secreKey')
const jwt = require('jsonwebtoken')//token包生成加密的token

// 注册处理函数
exports.register = (req, res) => {
    const userInfo = req.body
    console.log(userInfo);
    if (!userInfo.userId && !userInfo.password) return res.er('用户名或密码不合法')
    console.log(userInfo);

    // 检测用户名是否被占用
    const sql = 'select * from users where  userId = ?'
    db.query(sql, [userInfo.userId], (err, results) => {
        if (err) {
            return res.er(err.message)
        }
        if (results.length > 0) {
            return res.er('该用户名已被占用！请更换其他用户名.')
        }
        // 加密密码
        userInfo.password = genPassword(userInfo.password)
        // console.log(userInfo.password);//查看加密数据
        const sql = 'insert into users set ?'
        db.query(sql, userInfo, (err, results) => {
            if (err) {
                return res.er('注册失败！ ' + err.message)
            }
            if (results.affectedRows !== 1) {//影响行数！==1则没有添加成功
                return res.er('注册失败！')
            }
            res.send({ status: 200, msg: '注册成功' })
        })
    })
}

// 登录
exports.login = (req, res) => {

    const userInfo = req.body//获取合法验证用户登录信息
    // 加密密码
    userInfo.password = genPassword(userInfo.password)

    const sql = 'select * from users where status=1 && userId  = ?'
    db.query(sql, [userInfo.userId], (err, results) => {
        if (err) return res.er(err)
        if (results.length !== 1) return res.er('登陆失败,用户不存在！')
        // 加密密码,和数据库中存储的密码进行对比
        if (userInfo.password !== results[0].password) { return res.er('验证不通过，密码错误！') }

        // 验证通过后
        //  用户信息剔除用户密码，
        const user = { ...results[0], password: '', }
        //生成加密token字符
        // 'Bearer ' + tokenStr拼接好字符串前缀方便前端使用
        const tokenStr = jwt.sign(user, secreKey, { expiresIn: '10h' })
        delete results[0].password
        res.send({ status: 200, message: '登录成功', token: 'Bearer ' + tokenStr, data: results[0] })//将不包含
    })
}