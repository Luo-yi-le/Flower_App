<template>
  <div class="myOrders">

    <tab :line-width="2" custom-bar-width="45px">
      <tab-item :selected="selected == '8'" @on-item-click="selected = '8'">全部</tab-item>
      <tab-item :selected="selected == '3'" @on-item-click="selected = '3'">待付款</tab-item>
      <tab-item :selected="selected == '4'" @on-item-click="selected = '4'">待收货</tab-item>
      <tab-item :selected="selected == '6'" @on-item-click="selected = '6'">已取消</tab-item>
      <tab-item :selected="selected == '5'" @on-item-click="selected = '15'">已付款</tab-item>
      <tab-item :selected="selected == '7'" @on-item-click="selected = '7'">待评价</tab-item>
    </tab>
    <!--显示全部-->
    <div class="order-all">
      <div v-for="item in orderInfo" v-show="item.orderState == selected || selected == '8'">
        <div class="vux-1px-b">
          <span>订单编号:{{item.orderId}}</span>
          <span v-if="item.orderState == '3'" style="color:#f53c27">{{item.orderState | filterState}}</span>
          <span v-if="item.orderState == '4'" style="color:#f59a27 ">{{item.orderState | filterState}}</span>
          <span v-if="item.orderState == '15'" style="color:#f59a27 ">{{item.orderState | filterState}}</span>
          <span v-if="item.orderState == '7'" style="color:#3a3a3c ">{{item.orderState | filterState}}</span>
          <span v-if="item.orderState == '6'" style="color:#3a3a3c ">{{item.orderState | filterState}}</span>
        </div>
        <div class="img-box ">
          <div>
            <img v-for="orderflower in item.orderflowerList"
                 :src="url+'/flower/'+orderflower.flower.flowerImageName"/>
          </div>
        </div>
        <div class="vux-1px-t">
          <span v-for="orderflower in item.orderflowerList">共{{orderflower.orderFlowerAmount}}件&nbsp;</span>
          合计:<span v-for="orderflower in item.orderflowerList">￥{{item.orderPrice}}</span>
          <button class="btn" @click="UpdateOrderState(item.orderId,item.orderPrice)">{{item.orderState | filterBtnTxt}}</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {Tab, TabItem} from 'vux'
  import * as api from '../../../static/js/api/api'
  import {mapGetters} from 'vuex'

  export default {
    name: 'myOrders',
    data() {
      return {
        orderImgWidth: 300,
        selected: this.$route.query.selected ? this.$route.query.selected : '8',//tab选中状态,
        orderInfo: [],
        url:api.url,
      }
    },
    components: {
      Tab,
      TabItem,
    },
    created() {
      this.selectAllOrder()
    },
    methods: {
      selectAllOrder() {
        const that = this
        const userId = sessionStorage.getItem('userId')
        that.$http.get(api.selectAllOrder, {
          params: {
            userId: userId,
            orderState: 8
          }
        }).then(res => {
          that.orderInfo = res.data.data;
          console.log(that.orderInfo)
        }).catch(err => {
          console.log(err)
        })
      },
      UpdateOrderState(id,orderPrice){
        console.log(id)
        const that=this
        that.$http.post(api.UpdateOrderState,{
          orderId:id,
          orderState:15
        }).then((res)=>{
          that.$vux.toast.show({
            text: '你已支付了'+orderPrice+'元'
          })
        }).catch((err)=>{
          that.$vux.toast.text({
            text: '支付失败'
          })
        })
      }
    },
    mounted() {
      //console.log(this.$route.query)
    },
    filters: {
      filterState: function (value) {
        if (value == '3') {
          value = '待付款';
        } else if (value == '4') {
          value = '待收货';
        } else if (value == '15') {
          value = '已付款'
        } else if (value == '7') {
          value = '待评价';
        }else if (value == '6') {
          value = '已取消';
        }
        return value;
      },
      filterBtnTxt: function (value) {
        if (value == '3') {
          value = '立即支付';
        } else if (value == '4') {
          value = '确认收货';
        } else if (value == '15') {
          value = '已付款'
        } else if (value == '7') {
          value = '立即评价';
        }else if (value == '6') {
          value = '已取消';
        }
        return value;
      }
    },
    computed: {
      ...mapGetters(['userInfo']),
    },
  }
</script>

<style scoped lang="less">
  @white: #FFFFFF;
  @black: #393a3e;
  .order-all {
    margin-bottom: 15px;

    > div {
      padding-left: 15px;
      background-color: @white;
      font-size: 12px;
      margin-top: 15px;
      overflow-x: scroll;
      color: #666666;

      > div:first-of-type, > div:last-of-type {
        height: 45px;
        line-height: 45px;
        padding-right: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      > div:last-of-type {
        > span span {
          color: @black;
        }

        button {
          width: 70px;
          height: 27px;
          border: none;
          background-color: @black;
          color: @white;
          font-size: 0.85em;
        }
      }

      .img-box {
        padding: 10px 15px 10px 0px;

        > div {
          overflow: scroll;
          width: auto;
          white-space: nowrap;

          img {
            width: 60px;
            height: 60px;
            margin-right: 10px;
          }
        }
      }
    }
  }

</style>
