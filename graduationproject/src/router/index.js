import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import Welcome from '../components/Welcome'
import Student from '../components/users/Student.vue'
import Teacher from '../components/users/Teacher.vue'
import Admin from '../components/users/Admin.vue'
import Score from '../components/score/Score.vue'
import ApplyLeave from '../components/leave/ApplyLeave.vue'
import ApprovalLeave from '../components/leave/ApprovalLeave.vue'
import FindLeave from '../components/leave/FindLeave.vue'
import RemoveLeave from '../components/leave/RemoveLeave.vue'
import UserInfo from '../components/user/UserInfo.vue'
import UserPassword from '../components/user/UserPassword.vue'

Vue.use(VueRouter)

const routes = [
  // 空时重定向到登录
  { path: '/', redirect: '/login' },
  // 登录路由 
  { path:'/login', component:Login},
  {
    path: '/home',
    component: Home,
    redirect:'/welcome',
    children:[
      {path:'/welcome',component:Welcome},
      {path:'/student',component:Student},
      {path:'/teacher',component:Teacher},
      {path:'/admin',component:Admin},
      {path:'/score',component:Score},
      {path:'/apply',component:ApplyLeave},
      {path:'/audit',component:ApprovalLeave},
      {path:'/inquire',component:FindLeave},
      {path:'/remove',component:RemoveLeave},
      {path:'/UserInfo',component:UserInfo},
      {path:'/password',component:UserPassword}
    ]
  },
  
]

const router = new VueRouter({
  routes
})
// 路由守卫
router.beforeEach((to, from, next) => {
  //to从哪里来路径
  //将要去哪里路径
  //next函数是否放行，next()放行,next('/login')强制跳转
  if (to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
