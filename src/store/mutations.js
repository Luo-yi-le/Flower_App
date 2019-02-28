import * as types from './mutation-types'
import { randomString } from '../../src/common/js/common'
// 同步方法
const mutations = {
    [types.UPDATE_USERINFO](state, { userInfo }) {
        state.userInfo = userInfo
    },
    [types.UPDATE_TITLE](state, title) {
        state.title = title
    },
    [types.UPDATE_LOADING](state, status) {
        state.isLoading = status
    },
    [types.UPDATE_DIRECTION](state, direction) {
        state.direction = direction
    },
    [types.ADD_TO_CART](state, product) {
        let { id, count } = product
        // 判断当前添加的商品是否存在购物车数组中
        let record = state.cartAllList.find(n => n.id === id)
        if (!record) {
            state.cartAllList.push(product)
          sessionStorage.setItem('cartAllList', JSON.stringify(state.cartAllList))
        } else {
            record.count += count
          sessionStorage.setItem('cartAllList', JSON.stringify(state.cartAllList))
        }
    },
    [types.TOGGLE_STATUS](state, { index }) {
        state.cartAllList[index].isChecked = !state.cartAllList[index].isChecked
      sessionStorage.setItem('cartAllList', JSON.stringify(state.cartAllList))
    },
    [types.DELETE_PRODUCT](state, { index }) {
        state.cartAllList.splice(index, 1)
      sessionStorage.setItem('cartAllList', JSON.stringify(state.cartAllList))
    },
    [types.ADD_PRODUCT](state, { index }) {
        state.cartAllList[index].count++
      sessionStorage.setItem('cartAllList', JSON.stringify(state.cartAllList))
    },
    [types.CUT_PRODUCT](state, { index }) {
        state.cartAllList[index].count--
        sessionStorage.setItem('cartAllList', JSON.stringify(state.cartAllList))
    },
    [types.TOGGLE_ALLCHEK](state, { flag }) {
        let data = state.cartAllList
        let len = state.cartAllList.length
        for (let i = 0; i < len; i++) {
            data[i].isChecked = !flag
        }
      sessionStorage.setItem('cartAllList', JSON.stringify(state.cartAllList))
    },
    [types.UPDATE_ADDRESS](state, form) {
        state.addressInfo = form
      sessionStorage.setItem('userInfo', JSON.stringify(state.userInfo))
    },
    [types.PLACE_ORDER](state, orderItem) {
        let orderNo = randomString(12) // 模拟生成随机订单号
        let createdTime = new Date().getTime() // 当前时间戳
        let snapName =
            orderItem.productItem.length > 1
                ? orderItem.productItem[0].name + '等'
                : orderItem.productItem[0].name
        let snapImg = orderItem.productItem[0].main_img_url
        let totalPrice = orderItem.account
        let totalCount = 0
        orderItem.productItem.forEach(item => {
            totalCount += item.count
        })
        let orderStatus = 1
        const data = {
            order_no: orderNo,
            created_time: createdTime,
            snap_name: snapName,
            snap_img: snapImg,
            total_price: totalPrice,
            total_count: totalCount,
            status: orderStatus
        }
        state.orderInfo.push(data) // 加入订单数组
        let ids = []
        orderItem.productItem.forEach(item => {
            ids.push(item.id)
        })
        ids.forEach(id => {
            state.cartAllList.forEach((item, index, arr) => {
                if (item.id === id) {
                    arr.splice(index, 1)
                }
            })
        })
      sessionStorage.setItem('cartAllList', JSON.stringify(state.cartAllList))
    }
}

export default mutations
