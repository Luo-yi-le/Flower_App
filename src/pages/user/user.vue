<template>
  <div class="user">
    <div class="user-header">
      <img class="avatar" link="/setUp"
           :src="'../../../static/img/user/'+userName+'.jpg'"
           alt="">
      <span class="nickname"></span>
      {{userName}}
      <router-link to="/page/setUp" class="nickname1">我的信息</router-link>
    </div>
    <div class="user-address"
         @click="editAddress()">
      <div class="address-info"
      >
        <!--   v-if="this.userInfo.addressInfo"-->
        <h5 class="address-title">地址管理<i class="icon-arrow"></i></h5>
        <div class="address-main" v-for="address in addressList">
          <div class="text-row">
            {{address.consigneeName}}&nbsp;&nbsp;{{address.consigneePhone}}&nbsp;&nbsp;
            {{address.address}}&nbsp;&nbsp;{{address.detailedAddress}}
          </div>
          <!--<div class="text-row"></div>-->
          <!--<div class="text-row"></div>-->
        </div>
      </div>
      <div class="add-new-address">
        <!--  v-else-->
        <i class="icon-add">+</i>
        <span>添加地址</span>
      </div>
    </div>
    <div class="user-order">
      <h5 class="order-title">我的订单</h5>
      <div class="order-list" v-if="orderInfo.length>0">
        <div class="order-item" v-for="(order,index) in orderInfo" :key="index">
          <div class="order-header">
            订单编号:
            <span class="order-no">
              {{order.orderId}}
            </span>
          </div>
          <div class="order-main">
            <span v-for="(show,index) in order.orderflowerList">
              <div class="item-left">
                <img :src="'../../../static/img/flower/'+show.flower.flowerImageName">
              </div>
              <!--<div class="item-middle">-->
                <!--&lt;!&ndash;<div>&ndash;&gt;-->
                  <!--&lt;!&ndash;{{show.cartId}}&ndash;&gt;-->
                <!--&lt;!&ndash;</div>&ndash;&gt;-->
                <!--<div>-->
                  <!--&lt;!&ndash;{{show.index(1)}}&ndash;&gt;-->
                  <!--件商品-->
                <!--</div>-->
              <!--</div>-->
            </span>
            <div class="item-right">
              <p class="order-status-txt unpay" v-if="order.orderState==3">待付款</p>
              <!--<p class="order-status-txt payed" v-if="item.orderState==4">已付款</p>-->
              <p class="order-status-txt done" v-if="order.orderState==4">已发货</p>
            </div>
          </div>
          <div class="order-footer" v-if="order.orderState==3">
            <span>实付:</span>
            {{order.orderPrice|formatMoney}}
            <button class="pay">付款</button>
          </div>
        </div>
      </div>
      <div class="no-data" v-else>
        您还没有订单哦~
      </div>
    </div>
  </div>
</template>

<script>
  import * as api from '../../../static/js/api/api'
  import {mapGetters} from 'vuex'

  var userName = sessionStorage.getItem("userName");
  export default {
    name: 'user',
    data() {
      return {
        userName: userName,
        addressList: [],
        orderInfo: [],
        list: []
      }
    },
    computed: {
      // ...mapGetters(['userInfo']),
      totalDetail() {
        // return this.userInfo.addressInfo.cityVal + ' ' + this.userInfo.addressInfo.detail
      }
    },
    mounted() {
    },
    created() {
      this.selectAddress()
      this.selectAllOrder()
    },
    methods: {
      editAddress() {
        this.$router.push({path: '/page/address'})
      }
      , selectAddress() {
        const that = this
        const userId = sessionStorage.getItem("userId");
        that.$http.post(api.selectAllAddress, {"userId": userId})
          .then(res => {
            that.addressList = res.data.data;
            console.log(that.addressList);
          }).catch(res => {
          console.log(res);
        })
      }
      , selectAllOrder() {
        const that = this
        const userId = sessionStorage.getItem('userId')
        that.$http.get(api.selectAllOrder, {
          params: {
            userId: userId,
            orderState: 8
          }
        })
          .then(res => {
            that.orderInfo = res.data.data;
            console.log(that.orderInfo);
             that.list=res.data.data.orderflowerList
            // console.log( that.list=res.data.data.orderflowerList)
          }).catch(err => {
          console.log(err)
        })
      }
    }

    , filters: {
      formatMoney(value) {
        return '￥' + value
      }
    }
  }
</script>

<style scoped lang="less">
  .user {
    background-color: #ededed;

    .user-header {
      background-color: #ab956d;
      color: #fff;
      display: flex;
      align-items: center;
      padding: 15px;
      font-size: 14px;

      .avatar {
        height: 50px;
        width: 50px;
        border-radius: 50px;
      }

      .nickname {
        margin-left: 10px;
      }

      .nickname1 {
        margin-left: 10px;
        color: #fff;
      }
    }

    .user-address {
      background-color: #fff;

      .add-new-address {
        padding: 10px 0;
        width: 100%;
        color: #989898;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;

        .icon-add {
          font-style: normal;
          margin-right: 5px;
        }
      }

      .address-info {
        .address-title {
          font-weight: normal;
          padding: 10px 0;
          color: #999999;
          text-align: center;
          border-bottom: 1px solid #ededed;
          font-size: 14px;
          background-color: #fff;
          position: relative;

          .icon-arrow {
            position: absolute;
            transform: rotate(270deg);
            height: 24px;
            width: 24px;
            right: 5px;
            top: 10px;
            background: url("../../../static/img/icon/arrow@right.png") no-repeat;
            background-size: 100% 100%;
            display: block;
          }
        }

        .address-main {
          .text-row {
            padding: 10px 15px 10px 0;
            display: flex;
            align-items: center;
            border-bottom: 1px solid #e9e9e9;
            margin-left: 15px;
            height: 45px;
            font-size: 14px;
            color: #7c7c7c;
            box-sizing: border-box;

            &:last-child {
              border-bottom: none;
            }
          }
        }
      }
    }

    .user-order {
      margin-top: 10px;

      .order-title {
        font-weight: normal;
        padding: 10px 0;
        color: #999999;
        text-align: center;
        border-bottom: 1px solid #ededed;
        font-size: 14px;
        background-color: #fff;
        position: relative;
      }

      .order-item {
        margin-bottom: 10px;
        color: #777777;
        background-color: #fff;
        font-size: 14px;

        &:last-child {
          margin-bottom: 0;
        }

        .order-header {
          margin-left: 15px;
          border-bottom: 1px solid #ededed;
          padding: 10px 0;

          .order-no {
            margin-left: 5px;
          }
        }

        .order-main {
          display: flex;
          height: 75px;
          color: #6d6d6d;
          padding: 10px 15px;

          .item-left {
            flex-basis: 75px;
            height: 100%;
            background-color: #f5f6f5;
            border-radius: 2px;

            img {
              height: 4.6rem;
              width: 4.6rem;
            }
          }

          .item-middle {
            flex: 1;
            margin-left: 10px;
            display: flex;
            flex-direction: column;
            justify-content: center;

            div {
              margin: 5px 0;
            }
          }

          .item-right {
            display: flex;
            flex-basis: 60px;
            align-items: center;
            justify-content: flex-end;
            color: #b42f2d;
            text-align: right;
          }
        }

        .order-footer {
          margin-left: 15px;
          border-top: 1px solid #ededed;
          height: 45px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #2f2f2f;

          .pay {
            width: 85px;
            height: 30px;
            margin-right: 15px;
            background-color: #b42f2d;
            border-radius: 2px;
            color: #fff;
            text-align: center;
            line-height: 30px;
            border: none;
            outline: none;

            &:active {
              background-color: #9a211f;
            }
          }
        }
      }

      .no-data {
        display: flex;
        height: 40px;
        font-size: 13px;
        color: #ccc;
        align-items: center;
        justify-content: center;
        background: #fff;
      }
    }
  }
</style>
