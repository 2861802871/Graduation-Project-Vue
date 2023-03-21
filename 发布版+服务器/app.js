const express = require('express')
const path = require('path')
const fs = require('fs')
const cors = require('cors')
const jsonwebtoken = require('jsonwebtoken')//生成token
const expressJWT = require('express-jwt')//解密token
const secreKey = require('./secre/secreKey')//自定义的jwt身份验证的秘钥

const app = express()

app.use(cors())//跨越请求

// 返回异常处理中间件
app.use((req, res, next) => {//定义处理异常返回数据er
  res.er = (err, status = 201) => {
    res.send({
      status,
      // 判断是错误还是字符串
      message: err instanceof Error ? err.message : err
    })
  }
  next()
})
// app.use(express.urlencoded({ extended: false }))//解析表单数据中间件X-www...内置中间件不需要下载body-parser,express新版本中将此抽离出来需要单独安装模块
const bodyParser = require('body-parser')//解析post表单中间件
// app.use(express.urlencoded({ extended: false }))//解析表单数据中间件X-www...
// elementUI表单数据格式为JSON需要配置
app.use(bodyParser.json({ extended: false }))//解析表单数据中间件X-www...内置中间件不需要下载body-parser

// 配置全局中间件，user开头不需要验证 /^\S/
app.use(expressJWT({ secret: secreKey, algorithms: ['HS256'] }).unless({ path: [/^\/user\//, /^\S/] }))
// const { UnauthorizedError } = require('express-jwt')//解析失败产生错误 UnauthorizedError用于错误捕获

// 全局中间件捕获解析失败的错误
app.use((err, req, res, next) => {
  // if (err instanceof joi.ValidationError) {//判断错误是否为joi的实例对象，是否为验证失败导致的错误
  //   return res.er('数据合法性验证失败，请检查' + err)
  // }
  // 捕获身份验证失败的错误
  if (err.name === 'UnauthorizedError') { return res.send('身份验证失败！请重新登录' + err) }

  res.send(err)//不是表单验证错误返回其他的错误
})

// 登录注册路由
const usersRouter = require('./router/user')
app.use('/user', usersRouter)//添加路由前缀

//编辑用户
const userRouter = require('./router/users')
app.use('/users', userRouter)//添加路由前缀

// 编辑学分
const scoreRouter = require('./router/score')
app.use('/score', scoreRouter)

//事假中心
const leaveRouter = require('./router/leave')
app.use('/leave', leaveRouter)

// 文件静态托管
app.use(express.static('./dist'))

// app.get('*', function (req, res) {
//   const html = fs.readFileSync(path.resolve(__dirname, './dist/index.html'), 'utf-8')
//   res.send(html)
// })
// app.use(express.static(__dirname + "./dist/index.html'", { index: "index.html" }));

// 开启服务器
app.listen(84, () => {
  console.log('server runing at http://127.0.0.1:84');
})