import * as types from 'mutation-types.js'
// 同步方法
const mutations = {
    [types.UPDATE_TITLE](state, title) {
        state.title = title
    },
  [types.UPDATE_LOADING](state, status) {
    state.isLoading = status
  }
}

export default mutations
