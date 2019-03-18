<template>
  <div class="cart">
    <div class="shopping">
      <div class="shop-group-item">
        <ul>
          <li v-for="(item,index) in cartAllList" :key="index">
            <div class="shop-info">
              <input type="checkbox" class="check goods-check goodsCheck" @click="goodsCheck">
              <div class="shop-info-img"><a href="#">
                <img :src="'./../../../static/img/flower/'+item.flower.flowerImageName" alt="img">
              </a></div>
              <div class="shop-info-text">
                <h4>{{item.flower.flowerName}}</h4>
                <div class="shop-brief"><span>重量:3.3kg</span><span>颜色:标配版</span><span>版本:13.3英寸</span></div>
                <div class="shop-price">
                  <div class="shop-pices"><b class="price">{{item.flower.flowerPrice|formatMoney}}</b></div>
                  <div class="shop-arithmetic">
                    <a href="javascript:;" class="minus" @click="minus">-</a>
                    <span class="num">{{item.cartAmount}}</span>
                    <a href="javascript:;" class="plus" @click="plus">+</a>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div class="shopPrice">本店总计：￥<span class="shop-total-amount ShopTotal">0.00</span></div>
      </div>
    </div>
    <!--<div class="payment-bar">-->
      <!--<div class="all-checkbox"><input type="checkbox" class="check goods-check" id="AllCheck" @click="AllCheck">全选-->
      <!--</div>-->
      <!--<div class="shop-total">-->
        <!--<strong>总价：<i class="total" id="AllTotal">0.00</i></strong>-->
        <!--<span>减免：123.00</span>-->
      <!--</div>-->
      <!--<a href="#" class="settlement">结算</a>-->
    <!--</div>-->
    <div class="cart-footer">
      <div class="all-checkbox"><input type="checkbox" class="check goods-check" id="AllCheck" @click="AllCheck"></div>
      <div class="all-select">
      </div>
      <span class="userName">下单人：</span>
      <div class="all-price-cutmit" >
        <span class="accounts-btn">0.00</span>
        <span class="price-text" @click="submitOrder(item.cartId)">下单</span>
        <span class="arrow-icon">
            <img src="../../assets/img/icon/arrow@grey.png" >
            <img src="../../assets/img/icon/arrow.png" >
          </span>
      </div>
    </div>
  </div>
</template>

<script>
  import {XNumber, Group} from "vux";

  const userName = sessionStorage.getItem('userName')
  import '../../../static/js/shopping.js'
  import * as api from '../../../static/js/api/api'

  export default {
    name: "car",
    components: {XNumber, Group},
    data() {
      return {
        cartAllList: [],
        flowerList: [],
        userName: userName,
      }
    },
    created() {
      this.selectAllCart()
    },
    methods: {
      selectAllCart() {
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
      minus() {
        var t = $(this).parent().find('.num');
        t.text(parseInt(t.text()) - 1);
        if (t.text() <= 1) {
          t.text(1);
        }
        this.TotalPrice();
      },
      plus() {
        var t = $(this).parent().find('.num');
        t.text(parseInt(t.text()) + 1);
        // if (t.text() <= 1) {
        //   t.text(1);
        // }
        console.log(t)
        this.TotalPrice();
      },
      goodsCheck() {
        var goods = $(this).closest(".cart").find(".goodsCheck"); //获取所有商品
        var goodsC = $(this).closest(".cart").find(".goodsCheck:checked"); //获取本店铺所有被选中的商品
        var Shops = $(this).closest(".cart").find(".cart"); //获取本店铺的全选按钮
        if (goods.length == goodsC.length) { //如果选中的商品等于所有商品
          Shops.prop('checked', true); //店铺全选按钮被选中
          if ($(".cart").length == $(".cart:checked").length) { //如果店铺被选中的数量等于所有店铺的数量
            $("#AllCheck").prop('checked', true); //全选按钮被选中
            this.TotalPrice();
          } else {
            $("#AllCheck").prop('checked', false); //else全选按钮不被选中
            this.TotalPrice();
          }
        } else { //如果选中的商品不等于所有商品
          Shops.prop('checked', false); //店铺全选按钮不被选中
          $("#AllCheck").prop('checked', false); //全选按钮也不被选中
          // 计算
          this.TotalPrice();
          // 计算
        }
      },
      shopCheck() {
        if ($(this).prop("checked") == true) { //如果店铺按钮被选中
          $(this).parents(".cart").find("#AllCheck").prop('checked', true); //店铺内的所有商品按钮也被选中
          if ($(".cart").length == $(".cart:checked").length) { //如果店铺被选中的数量等于所有店铺的数量
            $("#AllCheck").prop('checked', true); //全选按钮被选中
            this.TotalPrice();
          } else {
            $("#AllCheck").prop('checked', false); //else全选按钮不被选中
            this.TotalPrice();
          }
        } else { //如果店铺按钮不被选中
          $(this).parents(".cart").find("#AllCheck").prop('checked', false); //店铺内的所有商品也不被全选
          $("#AllCheck").prop('checked', false); //全选按钮也不被选中
          this.TotalPrice();
        }
      },
      AllCheck() {
        if ($(this).prop("checked") == true) { //如果全选按钮被选中
          $("#AllCheck").prop('checked', true); //所有按钮都被选中
          this.TotalPrice();
        } else {
          $("#AllCheck").prop('checked', false); //else所有按钮不全选
          this.TotalPrice();
        }
        $("#AllCheck").change(); //执行店铺全选的操作
      },
      TotalPrice() {
        var allprice = 0; //总价
        $(".cart").each(function () { //循环每个店铺
          var oprice = 0; //店铺总价
          $(this).find(".goodsCheck").each(function () { //循环店铺里面的商品
            if ($(this).is(":checked")) { //如果该商品被选中
              var num = parseInt($(this).parents(".shop-info").find(".num").text()); //得到商品的数量
              var price = parseFloat($(this).parents(".shop-info").find(".price").text()); //得到商品的单价
              var total = price * num; //计算单个商品的总价
              oprice += total; //计算该店铺的总价
            }
            $(this).closest(".cart").find(".accounts-btn").text(oprice.toFixed(2)); //显示被选中商品的店铺总价
          });
          var oneprice = parseFloat($(this).find(".accounts-btn").text()); //得到每个店铺的总价
          allprice += oneprice; //计算所有店铺的总价
        });
        $(".accounts-btn").text(allprice.toFixed(2)); //输出全部总价
      }
    },
    computed: {

    },

    mounted() {
    },


    filters: {
      formatMoney(value) {
        return '￥' + value
      }
    },
  }
</script>

<style scoped lang="less">
  .cart{
  @import "../../../static/styles/base";
  @import "../../../static/styles/module.less";

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

  .userName {
    font-size: 0.8rem;
    width: 15rem;
    margin-top: 0.8rem;
    color: lime;
    margin-right: -8rem;
  }
  }
</style>
