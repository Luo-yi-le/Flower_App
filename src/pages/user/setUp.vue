<template>
  <!--设置 组件-->
  <div class="setting">
    <section>
      <div class="weui-cells">
        <router-link to="" class="weui-cell weui-cell_access">
          <div class="weui-cell__bd">余额</div>
          <div class="weui-cell__ft" style="color: #2baee9">已保护</div>
        </router-link>
      </div>
      <div class="weui-cells">
        <router-link to="/page/userInfo" class="weui-cell weui-cell_access">
          <div class="weui-cell__bd">个人资料</div>
          <div class="weui-cell__ft"></div>
        </router-link>
        <router-link to="" class="weui-cell weui-cell_access">
          <div class="weui-cell__bd">常用收货人</div>
          <div class="weui-cell__ft"></div>
        </router-link>
      </div>
      <div class="weui-cells">
        <router-link to="" class="weui-cell weui-cell_access">
          <div class="weui-cell__bd">修改密码</div>
          <div class="weui-cell__ft"></div>
        </router-link>
        <router-link to="" class="weui-cell weui-cell_access">
          <div class="weui-cell__bd">修改用户名</div>
          <div class="weui-cell__ft"></div>
        </router-link>
      </div>
      <div class="weui-cells">
        <router-link to="" class="weui-cell weui-cell_access">
          <div class="weui-cell__bd">功能反馈</div>
          <div class="weui-cell__ft"></div>
        </router-link>
      </div>
    </section>
  </div>
</template>
<script>
  export default {
    name:'setUp',
    data(){
      return{
        tit:'相关'
      }
    }
    ,methods:{
    }
  }
</script>
<style scoped>
  @import "../../../static/styles/weui.min.css";
</style>
