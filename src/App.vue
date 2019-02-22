<template>
  <div id="app">
  <div v-transfer-dom>
    <loading :text="loadText" v-model="isLoading"></loading>
  </div>
  <keep-alive>
    <router-view v-if="$route.meta.keepAlive"></router-view>
  </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
</div>
</template>

<script>
  import { Loading, TransferDom } from 'vux'
  import { mapState } from 'vuex'
export default {
  name: 'App',
  directives: {
    TransferDom
  },
  provide(){
    return{
      reload:this.reload
    }
  }
  ,
  components: {
    Loading,
    TransferDom
  },
  data(){
    return {
      loadText:"loading",
      isRouterAlive:true
    }
  },

  methods:{
    reload(){
      this.isRouterAlive=false
      this.$nextTick(()=>{
        this.isRouterAlive = true
      })
    }
  }
  ,
  computed:{
    ...mapState({
      isLoading: state => state.onLoading.isLoading
    })
  }
}
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
  @import '~vux/src/styles/1px.less';
  @import '~vux/src/styles/tap.less';
  html,
  body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
  }
  #app{
    width: 100%;
    height: 100%;
  }
  .vux-slider .vux-icon-dot {
    width: 8px !important;
    height: 8px !important;
    border-radius: 4px !important;
  }
  .detail .vux-cell-value {
    color: #fff !important;
  }
  .detail .vux-cell-box::before {
    display: none;
  }
  .detail .vux-cell-box .weui-cell__ft::after {
    display: none;
  }
</style>
