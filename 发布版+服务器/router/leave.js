const express = require('express')
const router = express.Router()//初始化路由
const methods = require('../routerMethods/leaveMethods')


router.post('/apply', methods.apply)//申请请假
router.post('/getVerify', methods.getVerify)//获取待审核假条数据
router.post('/submitVerify', methods.submitVerify)//提交审核结果
router.post('/getResult', methods.getResult)//查询审核结果
router.post('/getVerifyByuserId', methods.getVerifyByuserId)//根据userId查询待审核假条数据
router.post('/getResultByuserId', methods.getResultByuserId)//根据userId查询已审核假条数据removeLeave
router.post('/removeLeave', methods.removeLeave)//销假
module.exports = router