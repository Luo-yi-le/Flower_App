import Vue from 'vue'
import Vuex from 'vuex'
import router from './../router'
import axios from 'axios'
Vue.use(Vuex)

const store = new Vuex.Store({})
//处理头部请求
// axios.defaults.headers = {
//   "Content-Type": "application/x-www-form-urlencoded"
// }

//拦截request,设置全局请求
axios.interceptors.request.use(config => {
  // //处理头部请求
  // config.headers['X-Requested-With'] = 'XMLHttpRequest'
  store.commit('axiosStart')
  return config;
})
//response,设置全局响应
axios.interceptors.response.use(response => {
  store.commit('axiosEnd')
  return response
})

store.registerModule('onLoading', { // onLoading名字自己定义
  state: {
    isLoading: false
  },
  mutations: {
    LoadingStart(state, payload) {
      state.isLoading = payload.isLoading
    },
    axiosStart(state) {
      state.isLoading = true
    },
    axiosEnd(state) {
      state.isLoading = false
    },
  },
  getter: {
    isLoading: state => state.isLoading
  }
})


router.beforeEach(function (to, from, next) {
  store.commit('LoadingStart', {isLoading: true})
  next()
})

router.afterEach(function (to) {
  store.commit('LoadingStart', {isLoading: false})
})

export default store;

