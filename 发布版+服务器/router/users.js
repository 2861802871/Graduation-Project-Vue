const express = require('express')
const router = express.Router()//初始化路由
const methods = require('../routerMethods/usersMethods')


router.post('/getUser', methods.getUser)//根据学号查询
router.post('/getStudent', methods.getStudent)
router.post('/getTeacher', methods.getTeacher)
router.post('/getAdmin', methods.getAdmin)
router.post('/editUser', methods.editUser)
router.post('/getClass', methods.getClass)
router.post('/editPassword', methods.editPassword)
router.delete('/deleteUser/:id', methods.deleteUser)
module.exports = router