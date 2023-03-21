const express = require('express')
const router = express.Router()//初始化路由
const methods = require('../routerMethods/scoreMethods')


router.post('/editScore', methods.editScore)//加分和扣分
router.get('/getScore/:userId', methods.getScore)

module.exports = router