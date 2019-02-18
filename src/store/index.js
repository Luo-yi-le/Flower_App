import Vue from 'vue'
import Vuex from 'vuex'

import * as getters from './getters.js'
import mutations from './mutations.js'
import state from './state.js'

// 开发模式下使用日志，和谷歌浏览器里面的vuedevtool插件类似
// 子修改state的时候会在控制台打印一些信息
// import createLogger from 'vuex/dist/logger'
Vue.use(Vuex)
// Vue.use(Vue)
// 调试,开发模式开启严格模式，要使用mutations提交
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    getters,
    state,
    mutations,
    strict: debug,
    plugins: debug ? [createLogger()] : []
})
