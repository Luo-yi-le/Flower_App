// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import storeIndex from './store'

import store from './store/loading.js'
import http from './common/js/http.js'
import { AlertPlugin, ToastPlugin } from 'vux'
Vue.use(AlertPlugin);
Vue.use(ToastPlugin);
Vue.use(http)
import $ from 'jquery';
window.jQuery = $;
window.$ = $;
Vue.config.productionTip = false;

const FastClick=require("fastclick");
FastClick.attach(document.body);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  storeIndex,
  router,
  render: h => h(App),
})
