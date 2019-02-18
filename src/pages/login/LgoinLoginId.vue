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

  import * as api from '../../../static/js/api/api.js'
  import {XInput, Group, XButton, Cell, Toast, base64, Box, Msg} from 'vux'

  export default {
    name: "Login",
    components: {
      Box,
      XInput,
      XButton,
      Group,
      Cell,
      Toast,
      Msg
    },
    data() {
      return {
        btnText: '发送验证码',
        disabled: false,
        time: 0,
        userId: '',
        userName: '',
        userPassword: '',
        verifyCode: '',
        smsCode: ''
      }
    }
    , methods: {
      onLogin: function () {
        const that = this;
        const user = new URLSearchParams();
        user.append('userName', that.userName);
        user.append('userPassword', that.userPassword);
        if (this.userName !== "" && this.userPassword !== "") {
          this.$http.post(api.login, user)
            .then(res => {
             // if (res.data.userName !== "") {
                sessionStorage.setItem("userName", that.userName);
                this.$vux.toast.show({
                  text: that.userName+'登陆成功'
                })
              this.$router.push("/page/home");
             // }
            }).catch(error => {
            //this.$Loading.error();
            this.$vux.toast.text({
              text: that.userName+'账号或者密码错误'
            })
            //console.log(error);
          });
        } else {
          alert('账号或者密码错误');
        }
      }
    }
  }
</script>


<style scoped lang="less">
  /*@import '~iview/dist/styles/iview.css';*/

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
