<template>
  <div class="cart">
    <div v-if="cartAllList.length>0">
      <div class="cart-box">
        <div class="cart-item vux-1px-b" v-for="(item,index) in cartAllList" :key="index">
          <div class="cart-item-main">
            <div class="cart-item-checkbox" @click="toggleSelect(item.cartId)">
              <i class="icon_checkbox" v-if="item.isChecked"></i>
              <i class="icon_checkbox checked" v-else></i>
            </div>
            <div class="cart-item-image" @click="linkToDetail(item.cartId)">
              <img :src="'./../../../static/img/flower/'+item.flower.flowerImageName" alt="img">
            </div>

            <div class="cart-item-ctrl">
              <div class="title-box">
                <span class="title">{{item.flower.flowerName}}</span>
                <span class="price" style="color: #ec8b89">{{item.flower.flowerPrice|formatMoney}}</span>
              </div>
              <div class="bottom-box">
                <div class="cart-item-counts">
                  <group>
                    <x-number width="30px" v-model="item.cartAmount" :min="1" :max="10"
                              @on-change="updateCartAmount(item.cartId,item.cartAmount)"></x-number>
                  </group>
                </div>
                <span class="delete" @click="del(item.cartId)">×</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="cart-footer">
        <div class="all-select" @click="toggleAllCheck">
          <img src="../../../static/img/icon/all@selected.png"
               alt="all">
          <!-- v-if="this.cartData.length===this.selectedArr.length"-->
          <img src="../../../static/img/icon/all.png" alt="">
          <!--v-else-->
          <span>全选()</span>
          <!--{{this.selectedArr.length}}-->
        </div>
        <span class="userName">下单人：{{userName}}</span>
        <div class="all-price-cutmit" :class="[tolalPrice===0?'disabled':'']">
          <span class="accounts-btn" @click="submitOrder">下单</span>
          <span class="price-text">{{tolalPrice | formatMoney}}</span>
          <span class="arrow-icon">
            <img src="../../../static/img/icon/arrow@grey.png" v-if="tolalPrice===0">
            <img src="../../../static/img/icon/arrow.png" v-else>
          </span>
        </div>
      </div>
    </div>
    <div class="no-data" v-else>
      您的购物车空空如也。
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'
  import * as api from '../../../static/js/api/api.js'
  import InlineXNumber from "vux/src/components/inline-x-number/index";
  import XNumber from "vux/src/components/x-number/index";
  import {Group} from 'vux'

  const userName = sessionStorage.getItem('userName')
  export default {
    name: 'cart',
    components: {XNumber, InlineXNumber, Group},
    data() {
      return {
        cartAllList: [],
        flowerList: [],
        userName: userName
      }
    },
    computed: {
      ...mapGetters([ 'tolalPrice', 'selectedArr']),
      allChecked() {
        return this.selectedArr.length === this.cartAllList.length
      }
    },
    created() {
      this.selectAllCart()
    },
    methods: {
      ...mapMutations([
        'TOGGLE_STATUS',
        'DELETE_PRODUCT',
        'ADD_PRODUCT',
        'CUT_PRODUCT',
        'TOGGLE_ALLCHEK'
      ]),
      linkToDetail(id) {
        this.$router.push({path: '/page/detail', query: {id: id}})
      },
      findIndexById(cartId) {
        return this.cartAllList.findIndex(item => {
          return item.cartId === cartId
        })
      },
      toggleSelect(id) {
        let index = this.findIndexById(id)
        this.TOGGLE_STATUS({index: index})
      },
      del(id) {
        let that = this
        that.$http.post(api.deleteCart, {
          cartId: id
        }).then((res) => {
          this.$vux.toast.show({
            text: '取消完成'
          })
          setTimeout(() => {
            location.reload()
          }, 1000)
        }).catch((err) => {
          console.log(err)
        })
      },
      toggleAllCheck() {
        this.TOGGLE_ALLCHEK({flag: this.allChecked})
      },
      submitOrder() {
        this.$router.push({
          path: '/page/order',
          query: {account: this.tolalPrice}
        })
      }
      , selectAllCart() {
        const userId = sessionStorage.getItem('userId')
        let that = this
        that.$http.post(api.selectAllCart, {
          'userId': userId
        }).then((res) => {
          that.cartAllList = res.data.data
          console.log(that.cartAllList)
        }).catch((err) => {
          console.log(err)
        })
      },
       updateCartAmount(id, cartAmount) {
        let that = this
        that.$http.post(api.updateCartAmount, {
          cartAmount: cartAmount,
          cartId: id
        }).then((res) => {
          that.$vux.loading.show({
            text: 'loading'
          })
        }).catch((err) => {
          console.log(err)
        })
      }
    },

    filters: {
      formatMoney(value) {
        return '￥' + value
      }
    }
  }
</script>

<style scoped lang="less">
  .cart {
    .cart-box {
      overflow: hidden;
      margin-bottom: 46px;
      font-size: 15px;
      line-height: 21px;

      .cart-item {
        display: flex;
        padding: 10px;
        padding-left: 0;
        background-color: #fff;
        height: 93px;

        &:last-child {
          margin-bottom: 0;
        }

        .cart-item-main {
          width: 100%;
          display: flex;

          .cart-item-checkbox {
            width: 42px;
            height: 100%;
            height: 93px;
            display: flex;
            align-items: center;
            justify-content: center;

            .icon_checkbox {
              height: 22px;
              width: 22px;
              background: url('../../../static/img/icon/circle@selected.png') no-repeat;
              background-size: 100% 100%;

              &.checked {
                background: url('../../../static/img/icon/circle@noselected.png') no-repeat;
                background-size: 100% 100%;
              }
            }
          }

          .cart-item-image {
            width: 93px;
            height: 100%;
            background-color: #f5f6f5;
            border-radius: 2px;

            img {
              width: 100%;
              height: 100%;
            }
          }

          .cart-item-ctrl {
            display: flex;
            flex: 1;
            flex-direction: column;
            justify-content: space-between;
            padding: 4px 0;
            margin: 0 10px;
            box-sizing: border-box;
            color: #454553;

            .title-box {
              display: flex;
              justify-content: space-between;

              .title,
              .price {
                font-size: 12px;
                display: flex;
                align-items: center;
                justify-content: space-between;
              }
            }

            .bottom-box {
              font-size: 12px;
              display: flex;
              align-items: center;
              justify-content: space-between;

              .cart-item-counts {
                width: 200px;
                display: flex;
                justify-content: space-between;
                text-align: center;

                .btns {
                  color: #454553;
                  font-size: 25px;
                  padding: 0 5px;
                  display: flex;
                  justify-content: center;
                  align-items: center;

                  &.disabled {
                    color: #d5d5db;
                    pointer-events: none;
                  }
                }

                .counts {
                  color: #454553;
                  font-size: 12px;
                  padding-top: 6px;
                  box-sizing: border-box;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }
              }

              .delete {
                font-size: 20px;
                padding: 0 5px;
              }
            }
          }
        }
      }
    }

    .cart-footer {
      position: fixed;
      bottom: 53px;
      height: 46px;
      width: 100%;
      display: flex;
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      box-sizing: border-box;
      background-color: #ab956d;
      color: #fff;
      z-index: 100;

      div {
        display: flex;
        align-items: center;

        &.all-select {
          font-size: 14px;
          width: 40%;

          img {
            height: 24px;
            width: 24px;
            margin: 0 10px;
          }
        }

        &.all-price-cutmit {
          width: 60%;

          .accounts-btn,
          .price-text,
          .arrow-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 16px;
          }

          .accounts-btn {
            width: 50%;
            font-size: 14px;
            border-right: 1px dotted #fff;
          }

          .price-text {
            width: 20%;
            font-size: 14px;
            margin-left: 5px;

          }

          .arrow-icon {
            width: 30%;

            img {
              width: 16px;
              height: 16px;
            }
          }

          &.disabled {
            color: #e6e6e6;
            pointer-events: none;
          }
        }
      }
    }

    .no-data {
      display: flex;
      height: 70px;
      font-size: 13px;
      color: #ccc;
      align-items: center;
      justify-content: center;
    }
  }

  .userName {
    font-size: 0.8rem;
    width: 15rem;
    margin-top: 0.8rem;
    color: lime;
    margin-right: -8rem;
  }
</style>
