<template>
  <div class="cart">
    <div class="order-address-info">
      <div class="address-box" v-if="this.addressOne">
        <div class="contact-box">
          <div class="contact">
            <div class="name">
              <img src="../../assets/img/icon/user.png">
              <span class="text">{{addressOne.consigneeName}}</span>
            </div>
            <div class="mobile">
              <img src="../../assets/img/icon/mobile.png">
              <span class="text">{{addressOne.consigneePhone}}</span>
            </div>
          </div>
          <div class="detail">
            {{addressOne.address}}&nbsp; {{addressOne.detailedAddress}}
          </div>
        </div>
        <div class="contact-icon">
          <img src="../../assets/img/icon/arrow@right.png">
        </div>
      </div>
      <div class="add-address"
           v-else @click="addAddress">
        <i class="icon-add">+</i>
        <span>选择地址</span>
      </div>
    </div>
    <hr/>
    <div v-if="cartAllList.length>0">
      <div class="cart-box">
        <div class="cart-item vux-1px-b" v-for="(item,index) in cartAllList" :key="item.cartId">
          <div class="cart-item-main">

            <div class="cart-item-checkbox">
              <input type="checkbox"
                     name="checkboxinput"
                     class="icon_checkbox"
                     :value="item.cartId"
                     checked="checked"
                     @click="toggleSelect(item.flowerId)">
            </div>
            <div class="cart-item-image" @click="linkToDetail(item.flowerId)">
              <img :src="url+'/flower/'+item.flower.flowerImageName" alt="img">
            </div>

            <div class="cart-item-ctrl">
              <div class="title-box">
                <span class="title">{{item.flower.flowerName}} </span>
                <span class="price"
                      style="color: #ec8b89">{{item.cartAmount*item.flower.flowerPrice|formatMoney}}</span>
              </div>
              <div class="bottom-box">
                <div class="cart-item-counts">
                  <group>
                    <x-number width="30px" v-model="item.cartAmount" :min="1" :max="10"
                              @on-change="updateCartAmountById(item.cartId,item.cartAmount)"></x-number>
                  </group>
                </div>
                <span class="delete" @click="del(item.cartId)">×</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="cart-footer">
        <div class="all-select">
          <img src="../../assets/img/icon/all@selected.png"
               alt="all" v-if="checkData>0">
          <img src="../../assets/img/icon/all.png" alt="" v-else>
          <span>全选({{cartAllList.length}})</span>

        </div>
        <span class="userName">下单人：{{userName}}</span>
        <div class="all-price-cutmit" :class="[total===0?'disabled':'']">
          <span class="accounts-btn">{{total | formatMoney}}</span>
          <span v-for="(item,index) in cartAllList">
          <span class="price-text" @click="submitOrder(item.cartId,item.cartAmount); toggleSelect(item.flowerId)">下单</span>
            </span>
          <span class="arrow-icon">
            <img src="../../assets/img/icon/arrow@grey.png" v-if="total!==0">
            <img src="../../assets/img/icon/arrow.png" v-else>
          </span>
        </div>
      </div>
    </div>
    <div class="no-data" v-else>
      您的购物车空空如也。
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'

  function onc() {
    var pidsArray = $("input[name=checkboxinput]:checked").serializeArray();
    console.log(pidsArray);
    var flowerIds = [];
    for(var i = 0; i < pidsArray.length; i++) {
      flowerIds.push(parseInt(pidsArray[i].value));
    }
    console.log(JSON.stringify(flowerIds));
  }



  import {mapGetters, mapMutations} from 'vuex'
  import * as api from '../../../static/js/api/api.js'
  import InlineXNumber from "vux/src/components/inline-x-number/index";
  import XNumber from "vux/src/components/x-number/index";
  import {Group} from 'vux'

  const userName = sessionStorage.getItem('userName')
  export default {
    name: 'cart',
    components: {XNumber, InlineXNumber, Group},
    data() {
      return {
        cartAllList: [],
        flowerList: [],
        userName: userName,
        checkData: ['1'],
        totalPrice: [],
        addressOne: [],
        datetiem: new Date().toLocaleDateString(),
        Id:[],
        cId:[],
        cardIdsun:[],
        url:api.url,
      }
    },
    computed: {
      ...mapGetters(['tolalPrice', 'selectedArr']),
      allChecked() {
        return this.selectedArr.length === this.cartAllList.length
      },
      totalMoney: function (item, index) {
        let sum = 0;
        for (let i = 0; i < this.totalPrice.length; i++) {
          sum += this.totalPrice[i];
        }
        ;
        return sum;
      },
      total() {
        var sum = 0;
        for (var i = 0; i < this.cartAllList.length; i++) {
          sum += (this.cartAllList[i].flower.flowerPrice * this.cartAllList[i].cartAmount);
        }
        return sum;
      },

    },
    created() {
      this.selectAllCart()
      this.selectAddress()
    },
    methods: {
      ...mapMutations([
        'TOGGLE_STATUS',
        'DELETE_PRODUCT',
        'ADD_PRODUCT',
        'CUT_PRODUCT',
        'TOGGLE_ALLCHEK'
      ]),
      linkToDetail(id) {
        this.$router.push({path: '/page/detail', query: {id: id}})
      },
      findIndexById(cartId) {
        return this.cartAllList.findIndex(item => {
          return item.cartId === cartId
        })
      },
      toggleSelect(id) {
         this.Id=id
        console.log(this.Id)
      },
      addAddress() {
        this.$router.push({path: '/page/address'})
      },
      del(id) {
        let that = this
        that.$http.post(api.deleteCart, {
          cartId: id
        }).then((res) => {
          this.$vux.toast.show({
            text: '取消完成'
          })
          setTimeout(() => {
            location.reload()
          }, 1000)
        }).catch((err) => {
          console.log(err)
        })
      },
      submitOrder(id,cartAmount) {
        var pidsArray = $("input[name=checkboxinput]:checked").serializeArray();
        console.log(pidsArray);
        var items = [];
        for(var i = 0; i < pidsArray.length; i++) {
          items.push(parseInt(pidsArray[i].value));
        }
        const item=JSON.stringify(items)
        console.log(item);

        const userId = sessionStorage.getItem('userId')
        const userPhoneAndMailbox = sessionStorage.getItem("userPhoneAndMailbox");
        // const cIds=[id]
        const that=this
        that.cardIdsun=id
        if(that.addressOne==''||that.addressOne==null){
          this.$vux.toast.text({
            text: '请添加地址'
          })
          this.$router.push({path: '/page/address'})
        }else{
          that.$http.get(api.insertOrderByOrderId, {
            params: {
              orderPrice: that.total,
              orderConsigneeName: that.addressOne.consigneeName,
              orderConsigneePhone: that.addressOne.consigneePhone,
              orderAddress: that.addressOne.address,
              orderDetailedAddress: that.addressOne.detailedAddress,
              orderDeliveryTime: (new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDay()),
              orderBuyerPhone: '',
              orderDeliveryTimeFrame: '下午',
              orderBuyerName: that.userName,
              orderMailbox: userPhoneAndMailbox,
              orderGreetingMessage: '',
              userId: userId
            }
          }).then((res) => {
            that.$http.get(api.insertOrderflowerOne, {
              params: {
                flowerId: that.Id,
                orderFlowerAmount: cartAmount,
                orderFlowerPrice: that.total,
                orderId: res.data.getCount,
                cartId: id
              }
            }).then((res)=>{
              that.$http.post(api.deleteCart,{
                  cartId:id
              }).then((res)=>{
                console.log(res.data)
              })
              setTimeout(()=>{
                this.$router.push({path: '/page/order'})
              },1000)
            })
            this.$vux.toast.show({
              text: '下单完成'
            })
          }).catch((err) => {
            console.log(err)
          })
        }
      },
      submitflower(id) {
        console.log(id)
      }
      , selectAllCart() {
        const userId = sessionStorage.getItem('userId')
        let that = this
        that.$http.post(api.selectAllCart, {
          'userId': userId
        }).then((res) => {
          that.cartAllList = res.data.data
          console.log(that.cartAllList)
        }).catch((err) => {
          console.log(err)
        })
      },
      updateCartAmountById(id, cartAmount) {
        console.log(id)
        console.log(cartAmount)
        let that = this
        that.$http.post(api.updateCartAmount, {
          'cartId': id,
          'cartAmount': cartAmount,
        }).then((res) => {
          that.$vux.loading.show({
            text: 'loading'
          })
        }).catch((err) => {
          console.log(err)
        })
      }
      ,
      selectAddress() {
        const that = this
        const userId = sessionStorage.getItem("userId");
        that.$http.post(api.selectUserIdByStateId, {"userId": userId, 'stateId': 11})
          .then(res => {
            that.addressOne = res.data.data;
            console.log(that.addressOne = res.data.data)
          }).catch(res => {
          console.log(res);
        })
      },
    },

    filters: {
      formatMoney(value) {
        return '￥' + value
      }
    }
  }
</script>

<style scoped lang="less">
  .cart {
    .cart-box {
      overflow: hidden;
      margin-bottom: 46px;
      font-size: 15px;
      line-height: 21px;

      .cart-item {
        display: flex;
        padding: 10px;
        padding-left: 0;
        background-color: #fff;
        height: 93px;

        &:last-child {
          margin-bottom: 0;
        }

        .cart-item-main {
          width: 100%;
          display: flex;

          .cart-item-checkbox {
            width: 42px;
            height: 100%;
            height: 93px;
            display: flex;
            align-items: center;
            justify-content: center;

            .icon_checkbox {
              height: 22px;
              width: 22px;
              border-radius: 10px;
              background: url('../../assets/img/icon/circle@selected.png') no-repeat;
              background-size: 100% 100%;

              &.checked {
                border-radius: 10px;
                background: url('../../assets/img/icon/circle@noselected.png') no-repeat;
                background-size: 100% 100%;
              }
            }
          }

          .cart-item-image {
            width: 93px;
            height: 100%;
            background-color: #f5f6f5;
            border-radius: 2px;

            img {
              width: 100%;
              height: 100%;
            }
          }

          .cart-item-ctrl {
            display: flex;
            flex: 1;
            flex-direction: column;
            justify-content: space-between;
            padding: 4px 0;
            margin: 0 10px;
            box-sizing: border-box;
            color: #454553;

            .title-box {
              display: flex;
              justify-content: space-between;

              .title,
              .price {
                font-size: 12px;
                display: flex;
                align-items: center;
                justify-content: space-between;
              }
            }

            .bottom-box {
              font-size: 12px;
              display: flex;
              align-items: center;
              justify-content: space-between;

              .cart-item-counts {
                width: 200px;
                display: flex;
                justify-content: space-between;
                text-align: center;

                .btns {
                  color: #454553;
                  font-size: 25px;
                  padding: 0 5px;
                  display: flex;
                  justify-content: center;
                  align-items: center;

                  &.disabled {
                    color: #d5d5db;
                    pointer-events: none;
                  }
                }

                .counts {
                  color: #454553;
                  font-size: 12px;
                  padding-top: 6px;
                  box-sizing: border-box;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }
              }

              .delete {
                font-size: 20px;
                padding: 0 5px;
              }
            }
          }
        }
      }
    }

    .cart-footer {
      position: fixed;
      bottom: 53px;
      height: 46px;
      width: 100%;
      display: flex;
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      box-sizing: border-box;
      background-color: #ab956d;
      color: #fff;
      z-index: 100;

      div {
        display: flex;
        align-items: center;

        &.all-select {
          font-size: 14px;
          width: 40%;

          img {
            height: 24px;
            width: 24px;
            margin: 0 10px;
          }
        }

        &.all-price-cutmit {
          width: 60%;

          .accounts-btn,
          .price-text,
          .arrow-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 16px;
          }

          .accounts-btn {
            width: 50%;
            font-size: 14px;
            border-right: 1px dotted #fff;
          }

          .price-text {
            width: 20%;
            font-size: 14px;
            margin-left: 5px;

          }

          .arrow-icon {
            width: 30%;

            img {
              width: 16px;
              height: 16px;
            }
          }

          &.disabled {
            color: #e6e6e6;
            pointer-events: none;
          }
        }
      }
    }

    .no-data {
      display: flex;
      height: 70px;
      font-size: 13px;
      color: #ccc;
      align-items: center;
      justify-content: center;
    }
  }

  .userName {
    font-size: 0.8rem;
    width: 15rem;
    margin-top: 0.8rem;
    color: lime;
    margin-right: -8rem;
  }

  .order-address-info {
    padding: 10px 20px;
    margin-bottom: 10px;
    background: #fff;

    .address-box {
      display: flex;

      .contact-box {
        flex: 1;

        .contact {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;

          div {
            display: flex;
            align-items: center;

            &.mobile {
              flex-basis: 100px;
            }

            img {
              height: 16px;
              width: 16px;
              margin-right: 5px;
            }

            .text {
              color: #333;
            }
          }
        }

        .detail {
          color: #999999;
        }
      }

      .contact-icon {
        flex-basis: 55px;
        display: flex;
        align-items: center;
        justify-content: flex-end;

        img {
          transform: rotate(270deg);
          height: 24px;
          width: 24px;
        }
      }
    }

    .add-address {
      width: 100%;
      color: #989898;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;

      .icon-add {
        font-style: normal;
        margin-right: 5px;
      }
    }
  }
</style>
