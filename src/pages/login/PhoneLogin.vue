<template>
  <div class="login"
       @keyup.enter="onLogin">
    <div class="logo-wrap">
      <img src="~@/assets/logo.png"
           class="app-logo">
      <h2 class="app-name">百花轩__手机登陆</h2>
    </div>
    <group>
      <x-input placeholder="11位手机号"
               :max="11"
               type="tel"
               v-model="phoneNumber"
               is-type="china-mobile">
        <x-button slot="right"
                  type="primary"
                  mini
                  :text="btnText"
                  :disabled="disabled"
                  @click.native="sendCode"></x-button>
      </x-input>
      <x-input type="number"
               placeholder="请输入验证码"
               v-model="verifyCode">
        <!--@on-enter="onLogin" -->

      </x-input>
    </group>
    <box gap="10px 10px" style="text-align:right">
      <p>
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
  import {XInput, Group, XButton, Cell, Toast, base64} from 'vux'
  import Box from "vux/src/components/box/index.vue";

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
        phoneNumber: '',
        verifyCode: '',
        smsCode: ''
      }
    },
    methods: {
      sendCode() {
        const reg = /^1[345789]\d{9}$/ // 手机号正则校验
        if (!this.phoneNumber) {
          this.$vux.toast.text('请输入手机号~', 'middle')
          return
        }
        if (!reg.test(this.phoneNumber)) {
          this.$vux.toast.text('手机号格式不正确~', 'middle')
          return
        }
        this.time = 60
        this.disabled = true
        this.timer()
        // 获取验证
        this.$http
          .post(
            '/sendSms',
            {phoneNumber: this.phoneNumber}
          )
          .then(res => {
            let smsCode = res.data.data.verifCode
            this.smsCode = smsCode
            this.$vux.alert.show({
              title: '验证码',
              content: `验证码已发送,【${smsCode}】,10分钟有效`
            })
            setTimeout(() => {
              this.$vux.alert.hide()
            }, 3000)
          })
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
