import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyLoad from 'vue-lazyload'
//
import App from './App.vue'
import router from './router'
import store from './store'

// mockjs 开关
let mock = false
if (mock) {
  require('./mock/api')
}
// 接口基本设置
// baseURL 根据前端跨域做调整
// axios.defaults.baseURL = '/api'
axios.defaults.timeout = 7000

// axios.defaults.baseURL = '' // 本地mock
// axios.defaults.baseURL = 'https://reqres.in/api/'
axios.defaults.baseURL = '/api' // mockjs

// 接口拦截 interceptors
axios.interceptors.response.use(function (response) {
  let res = response.data
  if (res.status === 0) {
    return res.data
  } else if (res.status === 10) {
    window.location.href = '/'
  } else {
    // alert(res.msg)
    return Promise.reject(res)
  }
})
//
Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(VueLazyLoad, {
  loading: '/imgs/loading-svg/loading-bars.svg'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
