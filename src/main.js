// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import store from './store'
import axios from 'axios'
Vue.prototype.$http=axios

import { AlertPlugin, ToastPlugin } from 'vux'
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)

import $ from 'jquery';
window.jQuery = $;
window.$ = $;
Vue.config.productionTip = false

const FastClick=require("fastclick")
FastClick.attach(document.body)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  // store,
  router,
  render: h => h(App),
})
