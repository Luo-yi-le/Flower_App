<template>
  <div class="profile" style="margin-top: 30px">
    <div class="weui-cells">
      <div class="weui-cell" id="avatarCell" style="height: 20px" >
        <div class="weui-cell__bd" >
          <p>头像</p>
        </div>
        <div class="weui-cell__ft" align="center">
          <img src="../../../static/img/icon/user@default.png" style="width: 40px;height: 40px;">
        </div>
      </div>
    </div>
      <div class="weui-cells">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>名字</p>
          </div>
          <div class="weui-cell__ft" >
            <input :placeholder="userInfo.userName" type="text"
                   class="Xinput"></input>
          </div>
        </div>
      </div>

      <div class="weui-cells">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>账号</p>
          </div>
          <div class="weui-cell__ft">
            <input  :placeholder="userInfo.userName"
                    class="Xinput" readonly="readonly"></input>
          </div>
        </div>
      </div>

      <div class="weui-cells">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>邮箱</p>
          </div>
          <div class="weui-cell__ft">
            <input :class="{XInput: inputCss}" type="email" :placeholder="userInfo.userMailbox"
                   class="Xinput"></input>
          </div>
        </div>
      </div>

        <div class="weui-cells">
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <p>性别</p>
            </div>
            <div class="weui-cell__ft">
              <select>
                <option value="volvo">男</option>
                <option value="saab">女</option>
              </select>
            </div>
          </div>
        </div>

      <div class="weui-cells">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>电话</p>
          </div>
          <div class="weui-cell__ft">
            <input type="number" :placeholder="userInfo.userPhone"
                   class="Xinput"></input>
          </div>
        </div>
      </div>
    <div style="padding:15px;margin-top:30px;">
      <x-button
                type="primary"> 修改信息
      </x-button>
    </div>
    </div>

</template>

<script>
  import axios from 'axios'
  import {XInput,XButton} from "vux";
  import * as api from '../../../static/js/api/api.js'

  export default {
    name: "UserInfo",
    components: {XButton, XInput},
    data() {
      return {
        userInfo: [],
        inputCss:true
      }
    }
    , created() {
      this.showUser();
    }
    , methods: {
      showUser() {
        const userName=sessionStorage.getItem("userName");
        const info = new URLSearchParams();
        info.append('userName', userName);
        const that = this;
        axios.post(api.selectUserName, info)
          .then(res=> {
            that.userInfo = res.data;
            console.log(that.userInfo = res.data);
          }).catch(res=> {
          console.log(res);
        })
      }
    }

  }
</script>

<style scoped>
  @import "../../../static/styles/weui.min.css";
  .Xinput{
    text-align: right;
    border: 0;
    font-size: 18px;
    height: 30px;
    outline:medium;
    cursor: pointer;
  }

  .left-arrow-a {
    margin-left: 20px;
    position: absolute;
    width: 50px;
    margin-top: 5px;
  }
</style>
