<template>
  <div class="my">
    <div class="user-info">
      <div class="user-img">
        <img :src="'../../../static/img/user/'+protrait"/>
      </div>
      <div class="name-mobile">
        <p>{{name}}</p>
        <p>{{mobile}}</p>
      </div>
    </div>
    <group style="margin-bottom: 10px;">
      <cell title="我的订单" value="查看全部订单" is-link :link="{path:'/page/order',query:{selected:'8'}}"></cell>
      <cell-box>
        <div class="order-type-box">
          <div class="type-item" @click="toWaitPay">
            <img src="../../../static/img/icon/icon-type-wait.png"/>
            <span>待付款</span>
          </div>
          <div class="type-item" @click="toWaitGet">
            <img src="../../../static/img/icon/icon-type-get.png"/>
            <span>待收货</span>
          </div>
          <div class="type-item" @click="toWaitAccess">
            <i class="fa fa-envelope-o fa-2x"></i>
            <!--<img src="../../../static/img/icon/icon-type-assess.png"/>-->
            <span>待评价</span>
          </div>
          <!--<div class="type-item" @click="toService">-->
            <!--<img src="../../../static/img/icon/icon-type-service.png"/>-->
            <!--<span>今日配送</span>-->
          <!--</div>-->
        </div>
      </cell-box>
    </group>
    <group>
      <cell title="个人信息" is-link :link="{path:'/page/userInfo'}"></cell>
      <cell title="我的收藏" is-link :link="{path:'/page/myCollection'}"></cell>
      <cell title="收货地址" is-link :link="{path:'/page/address'}"></cell>
      <cell title="客服MM" is-link></cell>
      <cell title="修改密码" is-link></cell>
    </group>
  </div>
</template>

<script>
  import { Group, Cell, CellBox, Flexbox, FlexboxItem } from 'vux'
import {mapState} from 'vuex'

  const userName=sessionStorage.getItem("userName")
  const userPhoneAndMailbox=sessionStorage.getItem("userPhoneAndMailbox")
  const userHeadPortrait=sessionStorage.getItem("userHeadPortrait")
  export default {
    name: 'my',
    data() {
      return {
        name:userName,
        mobile: userPhoneAndMailbox,
        protrait:userHeadPortrait
      }
    },
    computed:{
      ...mapState(['userInfo']),
    },
    methods:{
      toWaitPay(){
        this.$router.push({
          path:'/page/order',
          query:{
            selected:'3'
          }
        })
      },
      toWaitGet(){
        this.$router.push({
          path:'/page/order',
          query:{
            selected:'4'
          }
        })
      },
      toWaitAccess(){
        this.$router.push({
          path:'/page/order',
          query:{
            selected:'7'
          }
        })
      },
      toService(){
        this.$router.push({
          path:'/page/order',
          query:{
            selected:'5'
          }
        })
      }
    },
    components: {
      Group,
      Cell,
      CellBox,
      Flexbox,
      FlexboxItem,
    }
  }
</script>

<style scoped lang="less">
  @import "../../../static/styles/font-awesome-4.7.0/css/font-awesome.css";
  .user-info {
    width: 100%;
    height: 140px;
    display: flex;
    align-items: center;
    @width77: 77px;
    >div {
      height: @width77;
    }
    .user-img {
      width: @width77;
      border-radius: 50%;
      overflow: hidden;
      margin-left: 30px;
      background-color: #b0b6c4;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .name-mobile {
      padding: 5px 10px;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
  }
  .order-type-box{
    width: 100%;
    display: flex;
    >div{
      flex: 1;
      height: 55px;
      font-size: 12px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img{
        width: 24px;
        height: 24px;
        margin-bottom: 5px;
      }
    }
  }
</style>
