<template>
  <div id="container">
    <div class="header">

      <span style="float: left;">{{userName}}</span>
      <span style="margin:0 auto;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{time}}</span>
      <span style="float: right;">客服</span>
    </div>
    <ul class="content">
      <li v-for="(item, index) in AllMessageContent">
        <img :src="url+'/user/'+(item.isSelf?'aunt.png':userHeadPortrait)"
             :class="'img'+(item.isSelf?'left':'right')">
        <span :class="'span'+(item.isSelf?'left':'right')">{{item.messageContent}}</span>
      </li>
    </ul>
    <div class="footer">
      <!-- 添加输入内容 -->
      <input id="text" type="text" placeholder="说点什么吧..." v-model="inputValue" @keyup.enter="chat">
      <!-- 给发送也绑定一个事件 -->
      <span id="btn" @click="chat">发送</span>
    </div>
  </div>

</template>

<script>
  import $ from 'jquery'
  import * as api from '../../../static/js/api/api'
  const userName = sessionStorage.getItem("userName")
  const userHeadPortrait = sessionStorage.getItem("userHeadPortrait")
  const userId = sessionStorage.getItem("userId")
  export default {
    name: 'customer',
    data() {
      return {
        inputValue: '',
        //聊天窗口内容
        messageList: [],
        userName: userName,
        time: '',
        AllMessageContent: [],
        userHeadPortrait: userHeadPortrait,
        messageId: '',
        url:api.url,
      }
    },
    created() {
      this.getData()
      this.selectAllMessageContentByUser()
    },
    methods: {
      chat() {
        this.AllMessageContent.push({
          messageContent: this.inputValue,
          isSelf: true,

        })
        this.$http.get(api.selectMessage, {
          params: {
            senderId: userId,
            recipientId: 999999
          }
        }).then((res) => {
          if (res.data.data == null) {
            this.$http.get(api.insertMessageApp, {
              params: {
                senderId: userId,
                recipientId: 999999
              }
            }).then((res) => {
              this.messageId = res.data.messageId.messageId
              this.$http.get(api.insertMessagecontent, {
                params: {
                  messageContent: this.inputValue,
                  messageContentDate: '',
                  messageId: this.messageId
                }
              }).then((res) => {
                this.AllMessageContent.push({
                  messageContent: res.text,
                  isSelf: false
                })
              }).catch((err) => {
                console.log(err)
              })
            }).catch((err) => {
              console.log(err)
            })
          } else {
            this.$http.get(api.selectMessage, {
              params: {
                senderId: userId,
                recipientId: 999999
              }
            }).then((res)=>{
              const messageId=res.data.data.messageId
              this.$http.get(api.insertMessagecontent, {
                params: {
                  messageContent: this.inputValue,
                  messageContentDate: this.time,
                  messageId: messageId
                }
              }).then((res) => {
                this.AllMessageContent.push({
                  messageContent: res.text,
                  isSelf: false
                })
              }).catch((err) => {
                console.log(err)
              })
            })

          }

        })


        // 三.获取机器人接口内容,也将内容渲染到页面
        // $.ajax({
        //   url: 'http://www.tuling123.com/openapi/api',
        //   data: {
        //     userid: 1,//添加id,实现上下文连贯
        //     key: 'b6ef78a0c1f24fee90d2317139b9c3d5',
        //     info: this.inputValue
        //   },
        //   // 注意使用箭头函数,不然里面的this会发生变化
        //   success: (obj) => {
        //     console.log(obj);
        //     // 三.获取机器人接口内容,也将内容渲染到页面
        //     this.messageList.push({
        //       message: obj.text,
        //       isSelf: false
        //     })
        //   }
        // })
        this.inputValue = '';  //最后清除文本框
      },
      selectAllMessageContentByUser() {
        const userId = sessionStorage.getItem("userId")
        const that = this
        that.$http.get(api.selectAllMessageContentByUserId, {params: {userId}})
          .then((res) => {
            that.AllMessageContent = res.data.data
          }).catch((err) => {
          console.log(err)
        })
      },
      getData() {
        const t = new Date();//创建一个date的对象，才可以引用相关的date
        const h = t.getHours();
        const m = t.getMinutes();
        const s = t.getSeconds();
        this.time = h + ':' + m + ':' + s;
        let _this = this;
        setTimeout(() => {
          _this.getData();
        }, 1000);
      },
    },
    computed: {}
  }
</script>

<style scoped>
  /**重置标签默认样式*/
  #container {
    width: 100%;
    height: 780px;
    background: #eee;
    margin: 0 auto 0;
    position: relative;

  }

  .header {
    background: #fff;
    height: 30px;
    color: #000;
    line-height: 34px;
    font-size: 20px;
    padding: 0 10px;
  }

  .footer {
    width: 430px;
    height: 50px;
    background: #666;
    position: absolute;
    bottom: 0;
    padding: 10px;
  }

  .footer input {
    width: 360px;
    height: 45px;
    outline: none;
    font-size: 20px;
    text-indent: 10px;
    position: absolute;
    border-radius: 6px;
    right: 80px;
  }

  .footer span {
    display: inline-block;
    width: 62px;
    height: 48px;
    background: #ccc;
    font-weight: 900;
    line-height: 45px;
    cursor: pointer;
    text-align: center;
    position: absolute;
    right: 10px;
    border-radius: 6px;
  }

  .footer span:hover {
    color: #fff;
    background: #999;
  }

  /* #user_face_icon {
    display: inline-block;
    background: red;
    width: 60px;
    height: 60px;
    border-radius: 30px;
    position: absolute;
    bottom: 6px;
    left: 14px;
    cursor: pointer;
    overflow: hidden;
  } */
  img {
    width: 60px;
    height: 60px;
  }

  .content {
    font-size: 20px;
    width: 435px;
    height: 662px;
    overflow: auto;
    padding: 5px;
  }

  .content li {
    margin-top: 10px;
    padding-left: -10px;
    width: 412px;
    display: block;
    clear: both;
    overflow: hidden;
  }

  .content li img {
    float: left;
  }

  .content li span {
    background: #7cfc00;
    padding: 10px;
    border-radius: 10px;
    float: left;
    margin: 6px 10px 0 0px;
    max-width: 310px;
    border: 1px solid #ccc;
    box-shadow: 0 0 3px #ccc;
  }

  .content li img.imgleft {
    float: left;
  }

  .content li img.imgright {
    float: right;
  }

  .content li span.spanleft {
    float: left;
    background: #fff;
  }

  .content li span.spanright {
    float: right;
    background: #7cfc00;
  }
</style>
