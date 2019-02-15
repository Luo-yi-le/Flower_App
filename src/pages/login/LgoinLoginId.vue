<template>
  <div class="login"
       @keyup.enter="onLogin">
    <div class="logo-wrap">
      <img src="~@/assets/logo.png"
           class="app-logo">
      <h2 class="app-name">百花轩__账号登陆</h2>
    </div>
    <group>
      <x-input placeholder="登陆账号"
               v-model="userName"
              >
        <!--is-type="china-mobile"-->
      </x-input>
      <x-input type="number"
               placeholder="请输入密码"
               v-model="userPassword">
        <!--@on-enter="onLogin" -->
      </x-input>
    </group>
    <box gap="10px 10px" style="text-align:right">
      <p>
        <router-link to="/phoneLogin">手机登陆</router-link>
        <router-link to="">注册</router-link>
      </p>
    </box>
    <div style="padding:15px;margin-top:30px;">
      <x-button @click.native="onLogin"
                type="primary"> 登录
      </x-button>
    </div>

  </div>
</template>

<script>
  import axios from 'axios'
  import * as api from '../../api/api.js'
  import {XInput, Group, XButton, Cell, Toast, base64,Box} from 'vux'


  export default {
    name: "Login",
    components: {
      Box,
      XInput,
      XButton,
      Group,
      Cell,
      Toast
    },
    data() {
      return {
        btnText: '发送验证码',
        disabled: false,
        time: 0,
        userName: '',
        userPassword:'',
        verifyCode: '',
        smsCode: ''
      }
    }
    , methods: {
      onLogin: function () {
        var that = this;
        var user = new URLSearchParams();
        user.append('userName', that.userName);
        user.append('userPassword', that.userPassword);
        if (this.userName !== "" && this.userPassword !== "") {
          axios.post(api.login, user)
            .then(res => {
              sessionStorage.setItem("userPassword", that.userPassword);
              alert(that.userName + '登陆成功');
              this.$router.push("/index");
              console.log(this.userName)
            }).catch(error => {
            this.$Loading.error();
            alert('账号或者密码错误')
            console.log(error);
          });
        } else {
          alert('账号或者密码错误');
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .login {
    height: 100%;
    text-align: center;
    overflow: hidden;

    .logo-wrap {
      margin: 50px 0;

      .app-logo {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        margin-bottom: 15px;
      }

      .app-name {
        font-size: 18px;
        color: #AB956D;
        font-weight: normal;
        line-height: 25px;
      }
    }

    a {
      text-decoration: none;
    }
  }

</style>
