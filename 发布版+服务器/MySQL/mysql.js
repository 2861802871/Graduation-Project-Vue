const mysql = require('mysql')
// tcp://server.natappfree.cc:36378
const db = mysql.createPool({
    //host: '127.0.0.1',//数据库的IP地址
    host: 'rm-bp1gl9j0w5p16f022no.mysql.rds.aliyuncs.com',//数据库的IP地址
    //host:'tcp://3t2214f670.qicp.vip',
    port:'3306',
    //port:'48312',
    user: 'xiaobing',
    password: '@xiaobing123',
    database: 'studentsystem'//指定要操作数据库的名字
})

module.exports = db