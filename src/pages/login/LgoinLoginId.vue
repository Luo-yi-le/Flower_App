<template>
  <div class="login"
       @keyup.enter="onLogin">
    <div class="logo-wrap">
      <span v-if="">
        <img :src="'../../../static/img/user/'+userPor" class="app-logo">
      </span>
      <h2 class="app-name">{{userName}}</h2>
    </div>

    <group>
      <x-input placeholder="登陆账号" v-model="userPhoneAndMailbox" @keyup.native="keyUpUserPor"></x-input>
      <x-input type="number" placeholder="请输入密码" v-model="userPassword"></x-input>
    </group>
    <box gap="10px 10px" style="text-align:right">
      <p>
        <router-link to="/phoneLogin">手机登陆</router-link>
        <router-link to="">注册</router-link>
      </p>
    </box>
    <div style="padding:15px;margin-top:30px;">
      <x-button @click.native="userLogin" type="primary"> 登录</x-button>
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
        userList: [],
        btnText: '发送验证码',
        disabled: false,
        time: 0,
        userId: '',
        userName: '',
        userPassword: '',
        verifyCode: '',
        smsCode: '',
        userPhoneAndMailbox: '',
        userPor: '',
        defauliPro: '',
        cartAllList:[]
      }
    },
    activated() {
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('userInfo')
      sessionStorage.removeItem('cartAllList')
      this.UPDATE_USERINFO({
        userInfo: null
      })
    },
    created(){
      // this.getCookie()
      // console.log(this.getCookie())
      // setTimeout(()=>{
      //
      // },1400)
    }
    , methods: {
      userLogin() {
        this.$store.commit('axiosStart')
        const that = this
        const user = new URLSearchParams();
        user.append('userPhoneAndMailbox', that.userPhoneAndMailbox);
        this.$http.get(api.appLogin, {
          params: {"userPhoneAndMailbox": that.userPhoneAndMailbox}
        }).then((res) => {
            //console.log(res.data.token)
            that.userList = res.data.userInfoList
              if (that.userPassword !== res.data.userInfoList.userPassword) {
                this.$vux.toast.hide({
                  text: that.userPhoneAndMailbox + '用户密码错误！'
                })
              } else {
                if (res.data.userInfoList.userPassword === this.userPassword) {
                  that.userId = that.userList.userId;
                  that.userName = that.userList.userName;
                  sessionStorage.setItem("userPhoneAndMailbox", that.userPhoneAndMailbox);
                  this.$vux.toast.show({
                    text: that.userName + '登陆成功'
                  })
                  window.sessionStorage.setItem('token',res.data.token)
                  window.sessionStorage.setItem('userInfo', JSON.stringify(res.data.userInfoList))
                  sessionStorage.setItem("userId", that.userId);
                  sessionStorage.setItem("userName", that.userName);
                  // 重定向到首页或者登录前的页面
                  let redirect = decodeURIComponent(
                    this.$route.query.redirect || '/'
                  )
                  setTimeout(() => {
                    that.selectAllCart()
                    this.$router.push({
                      path: redirect
                    })
                  }, 1500)
                }
              }
          }).catch((err) => {
          console.log(err)
        })
      }
      , keyUpUserPor() {
        const that = this
        const user = new URLSearchParams();
        user.append('userPhoneAndMailbox', that.userPhoneAndMailbox);
        this.$http.get(api.selectByUserPhoneAndMailbox, {params:
            {"userPhoneAndMailbox": that.userPhoneAndMailbox}
        })
          .then((res) => {
            that.userList = res.data.data
            if (res.data.data !== null) {
              that.userPor = that.userList.userHeadPortrait;
              that.userName = that.userList.userName;
              sessionStorage.setItem("userHeadPortrait",that.userPor)
            } else {
              that.defauliPro = '../../../static/img/flower/9012055.jpg'
            }
          }).catch((err) => {
          console.log(err)
        })
      }
      , selectAllCart() {
      //  const userId = sessionStorage.getItem('userId')
        let that = this
        that.$http.post(api.selectAllCart, {
          'userId': that.userId
        }).then((res) => {
          that.cartAllList = res.data.data
          //console.log(that.cartAllList)
          sessionStorage.setItem("cartAllList",JSON.stringify(that.cartAllList))
        }).catch((err) => {
          console.log(err)
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
