import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import '../src/assets/css/global.css'

import axios from 'axios'
// 将axios挂载到vue的原型对象上
Vue.prototype.$http = axios
// 设置axios请求根路径挂载请求头
axios.defaults.baseURL = 'http://127.0.0.1:8081/api/'
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})



Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
