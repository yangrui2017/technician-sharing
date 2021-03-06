// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
// import {
//   CouponCell,
//   CouponList
// }
import 'vant/lib/icon/local.css';
import VueJsonp from 'vue-jsonp'
// import Vant from 'vant'
Vue.prototype.HOST = '/apis'
// import 'vant/lib/index.css'
// import VueAwesomeSwiper from 'vue-awesome-swiper'
// import 'swiper/dist/css/swiper.css'
import api from './api/index.js'
Vue.use(VueJsonp)

Vue.config.productionTip = false
axios.defaults.withCredentials = true
Vue.prototype.$http = axios
// Vue.use(CouponCell).use(CouponList)
// Vue.use(VueAwesomeSwiper)
// Vue.use(Vant)
axios.defaults.withCredentials = false
axios.defaults.baseURL = '/api'
axios.defaults.headers.post['Content-Type'] = 'application/json' // 切换环境js
// 将API方法绑定到全局
Vue.prototype.$api = api
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
