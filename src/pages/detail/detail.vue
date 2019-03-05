<template>
  <div class="detail">
    <div class="detail-main" v-for="pro in product">
      <!-- v-if="product"-->
      <div class="fixed-cart-box">
        <img src="../../../static/img/icon/cart@top.png" alt="icon-cart" ref="topCart"
             @click="linkToCart" :class="[isShake ?'animate':'']">
        <span class="total-count" v-if="cartAllList.length>0">{{cartAllList.length}}</span>
        <span class="total-count" v-else>0</span>
        <label v-if="collectCount>0" style="font-size: 0.8rem" @click="deleteCollect()">已收藏</label>
        <label v-else style="font-size: 0.8rem" @click="insertCollect">收藏</label>
      </div>
      <div class="detail-img">
        <img :src="'./../../../static/img/flower/'+pro.flowerImageName" alt="image">
      </div>
      <div class="cart-box">
        <div class="product-counts">
          <span class="counts-tips">数量</span>
          <popup-picker :data="countsArray" v-model="count" class="picker"
                        popup-title="请选择数量" value-text-align="left">
          </popup-picker>
        </div>
        <div class="middle-border"></div>
        <div class="add-cart-btn" @touchstart="insertCart">
          <span class="add-cart">加入购物车</span>
          <i class="icon-cart"></i>
          <img class="small-top-img" ref="smallTopImg" src="./../../../static/img/flower/9012177.jpg"
               :class="[isFly ?'animate':'']" alt="image">
        </div>
      </div>
      <div class="product-info-box">
        <!--<div class="stock" v-if="pro.state.stateId==2">已上架</div>-->
        <!--<div class="stock no" v-else>已下架</div>-->
        <div class="stock">库存：{{pro.flowerInventory}}件</div>
        <div class="name">{{pro.flowerName}}</div>
        <div class="price">{{pro.flowerPrice|formatMoney}}</div>
      </div>
    </div>
    <div class="detail-bottom">
      <tab :line-width=2 active-color='#AB956D' v-model="index">
        <tab-item class="vux-center" :selected="selectd === item"
                  v-for="(item, index) in list" @click="selectd = item" :key="index">
          {{item}}
        </tab-item>
      </tab>
      <swiper  height="auto" :show-dots="false">
        <swiper-item v-for="(item, index) in product" :key="index" >
          <div class="tab-swiper">
            <p>鲜花名称：<span class="span">{{item.flowerName}}</span></p>
            <p>鲜花包装：<span class="span">{{item.flowerPackaging}}</span></p>
            <p>鲜花支数：<span class="span">{{item.flowerBranchNumberId}}</span></p>
            <p>鲜花材料：<span class="span">{{item.flowerMaterials}}</span></p>
            <p>花语：<span class="span">{{item.flowerLanguage}}</span></p>
          </div>
        </swiper-item>
      </swiper>
    </div>
  </div>
</template>

<script>
  import {PopupPicker, Tab, TabItem, Swiper, SwiperItem} from 'vux'
  import {mapState, mapMutations, mapGetters} from 'vuex'
  import * as api from '../../../static/js/api/api.js'
  import XSwitch from "vux/src/components/x-switch/index";

  const tabList = () => ['商品详情']
  const array=['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
  export default {
    inject: ['reload'],
    name: 'detail',
    data() {
      return {
        product: [],
        countsArray: [array],
        count: ['1'],
        list: tabList(),
        selectd: '商品详情',
        index: 0,
        isFly: false,
        isShake: false,
        cartAllList: [],
        collectCount: [],
        collect:[],
        collectId:''
      }
    },
    computed: {
      ...mapState(['userInfo']),
      ...mapGetters(['totalCount']),
      isDisabled() {
        return this.product.stock > 0
      }
    },
    created() {
      this.seleteCartCount()
      this.selectCollectOne()
      this.selectCollect()
    },
    activated() {
      this.getAllProducts()
    },
    watch: {
      '$route'(to, from) {
        this.id = this.$route.params.id;
        this.seleteCartCount();
      }
    },
    methods: {
      ...mapMutations(['ADD_TO_CART']),
      linkToCart() {
        this.$router.push({path: '/page/cart'})
      },
      getAllProducts() {
        let that = this
        let flowerId = this.$route.query.id
        that.$http.get(api.getFlower, {
          params: {
            flowerId: flowerId,
            skip: 0,
            size: 1
          }
        })
          .then(res => {
            that.product = res.data.data
            console.log(that.product = res.data.data)
            // let detailData = res.data.data.filter(item => {
            //   return item.id === +this.$route.query.id
            // })
            // console.log(detailData)
            //that.product = detailData[0]
          }).catch((err) => {
          console.log(err)
        })
      },
      seleteCartCount() {
        let that = this
        let userId = sessionStorage.getItem('userId')
        that.$http.post(api.selectAllCart, {userId: userId})
          .then((res) => {
            that.cartAllList = res.data.data
            console.log(that.cartAllList)
          }).catch((err) => {
          console.log(err)
        })
      },
      selectCollectOne() {
        let that = this
        let userId = sessionStorage.getItem('userId')
        let flowerId = this.$route.query.id
        that.$http.get(api.selectCollectOne, {
          params: {
            userId: userId,
            flowerId: flowerId
          }
        }).then((res) => {
          that.collectCount = res.data.data
          console.log(that.collectCount)
        }).catch((err) => {

        })
      },
      selectCollect() {
        let that = this
        let userId = sessionStorage.getItem('userId')
        let flowerId = this.$route.query.id
        that.$http.get(api.selectCollectId, {
          params: {
            userId: userId,
            flowerId: flowerId
          }
        }).then((res) => {
          that.collect = res.data.data
          that.collectId=that.collect.collectId
          console.log(that.collect)
          console.log(that.collectId)
        }).catch((err) => {

        })
      },
      insertCollect() {
        let that = this
        let userId = sessionStorage.getItem('userId')
        let flowerId = this.$route.query.id
        that.$http.get(api.insertCollect, {
          params: {
            userId: userId,
            flowerId: flowerId
          }
        }).then((res) => {
          console.log(res.data.data)
          this.$vux.toast.show({
            text: '收藏成功'
          })
          setTimeout(() => {
            location.reload()
          }, 1000);
        }).catch((err) => {
          console.log(err)
        })
      }
      ,deleteCollect(){
        let that=this
        that.$http.get(api.deleteCollect,{
          params:{"collect":that.collectId}
        }).then((res)=>{
          this.$vux.toast.show({
            text: '取消收藏'
          })
          setTimeout(() => {
            location.reload()
          }, 1000);
        })
      }
      , insertCart() {
        console.log('11'+this.count[0])
        console.log('22'+JSON.stringify(this.count))
        let userId = sessionStorage.getItem('userId')
        let that = this
        let flowerId = this.$route.query.id
          that.$http.post(api.insertCart, {
            // params: {
            'flowerId': flowerId,
            'userId': userId,
            'cartAmount': that.count[0]
            //}
          }).then((res) => {
            if (res.data.msg == "success") {
              this.$vux.toast.show({
                text: '加入购物车成功'
              })
              setTimeout(() => {
                location.reload()
              }, 1000);
            }
          })
      }

      , onAddToCart() {
        // 如果没登录，先去登录
        if (!this.userInfo) {
          this.$router.push({path: '/loginLoginId'})
          return
        }
        // 缺货时禁止点击
        if (!this.isDisabled) {
          this.$vux.toast.text('暂时缺货哦~', 'middle')
          return
        }
        // 防止过快点击
        if (this.isFly) return
        // 移动距离
        let rect1 = this.$refs.smallTopImg.getBoundingClientRect()
        let rect2 = this.$refs.topCart.getBoundingClientRect()
        let x = rect1.right - rect2.right + (40 - 16)
        let y = rect2.top - rect1.top - 20
        this.isFly = true
        this.$nextTick(() => {
          this.$refs.smallTopImg.style.transform = `translate(${x}px,${y}px) rotate(350deg) scale(0)`
        })
        setTimeout(() => {
          // 飞入购物车动画恢复到最初状态
          this.isFly = false
          this.$refs.smallTopImg.style.transform = 'none'
          // 右侧购物车图标放大
          this.isShake = true
          setTimeout(() => {
            let count = +this.count // 字符串类型数字转为数字
            if (this.product.isChecked === undefined) {
              this.$set(this.product, 'isChecked', true)
            }
            this.ADD_TO_CART(
              Object.assign({}, this.product, {count: count})
            )
            this.isShake = false
          }, 200)
        }, 1000)
      }
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      $route: {
        handler: function (val, oldVal) {
          //console.log(val);
          location.reload()
        },
        // 深度观察监听
        deep: true,
      }
    },
    components: {
      XSwitch,
      PopupPicker,
      Tab,
      TabItem,
      Swiper,
      SwiperItem
    },
    filters: {
      formatMoney(value) {
        return '￥' + value
      }
    }
  }
</script>

<style scoped lang="less">
  @import '~vux/src/styles/center.less';

  .detail {
    background-color: #f9f9f9;

    .detail-main {
      background: #fff;

      .fixed-cart-box {
        position: fixed;
        z-index: 10;
        top: 71px;
        right: 12px;
        width: 40px;
        height: 32px;

        img {
          width: 32px;
          height: 32px;
        }

        .total-count {
          font-size: 12px;
          background-color: #ab956d;
          color: #fff;
          position: absolute;
          right: 32px;
          top: 0;
          height: 18px;
          width: 18px;
          line-height: 18px;
          border-radius: 18px;
          text-align: center;
        }

        &.animate {
          animation: animateCartScale 200ms cubic-bezier(0.17, 0.67, 0.83, 0.67);
          animation-fill-mode: backwards;
        }
      }

      .detail-img {
        position: relative;
        height: 0;
        padding-top: 100%;

        img {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          vertical-align: top;
        }
      }

      .cart-box {
        height: 50px;
        margin: 15px;
        border-radius: 50px;
        background-color: #ab956d;
        color: #fff;
        display: flex;
        align-items: center;

        .product-counts {
          width: 50%;
          height: 100%;
          display: flex;
          font-size: 12px;
          align-items: center;
          justify-content: center;

          .picker {
            margin: 0 10px;
            width: 35%;
            background: url('../../../static/img/icon/arrow@down.png') no-repeat right center;
          }

          .counts-tips {
            width: 30%;
            text-align: center;
            margin-left: 15px;
          }
        }

        .middle-border {
          width: 1px;
          height: 15px;
          border-right: 1px #fff dotted;
        }

        .add-cart-btn {
          height: 100%;
          display: flex;
          font-size: 12px;
          align-items: center;
          justify-content: center;
          position: relative;
          flex: 1;

          &:active {
            color: #fff;
          }

          &.disabled {
            color: #d5d5db;
          }

          .icon-cart {
            margin-left: 20px;
            height: 16px;
            width: 16px;
            background: url('../../../static/img/icon/cart.png') no-repeat;
            background-size: 100% 100%;
          }

          .small-top-img {
            width: 80px;
            height: 80px;
            right: 5px;
            position: absolute;
            // opacity: 0;
            visibility: hidden;

            &.animate {
              // opacity: 1;
              visibility: visible;
              transition: all 1000ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }
          }
        }
      }

      .product-info-box {
        padding: 8px 0;
        color: #454552;
        text-align: center;

        div {
          margin: 10px auto;

          &.stock {
            font-size: 12px;

            &.no {
              color: #b42f2d;
            }
          }

          &.name {
            font-size: 20px;
          }

          &.price {
            font-size: 18px;
          }
        }
      }
    }

    .detail-bottom {
      background: #fff;
      margin-top: 15px;

      .tab-swiper {
        text-align: center;
        background-color: #fff;
        height: 180px;
        p{
          .span{
            color: #ec8b89
          }
        }
      }
    }
  }

  @keyframes animateCartScale {
    0% {
      -webkit-transform: scale(1.2);
    }
    100% {
      -webkit-transform: scale(1);
    }
  }
</style>
