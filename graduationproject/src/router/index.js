import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import Welcome from '../components/Welcome'

Vue.use(VueRouter)

const routes = [
  // 空时重定向到登录
  { path: '/', redirect: '/Login' },
  // 登录路由
  { path:'/login', component:Login},
  {
    path: '/home',
    component: Home,
    redirect:'welcome',component:Welcome,
    children:[

    ]
  },
  
]

const router = new VueRouter({
  routes
})

export default router
