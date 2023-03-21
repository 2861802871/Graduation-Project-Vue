const express = require('express')
const router = express.Router()//初始化路由
const expressJoi = require('@escook/express-joi')

const userMethods = require('../routerMethods/userMethods')
const { login, register } = require('../rules/userRules')

// 注册新用户 expressJoi(register),
router.post('/register', userMethods.register)

// 登录expressJoi(login),
router.post('/login', userMethods.login)


// 导出路由
module.exports = router