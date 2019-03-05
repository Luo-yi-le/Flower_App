<template>
  <div class="home">
    <!--<mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit" class="scrollView">-->
      <swiper :aspect-ratio="400/750" loop auto dots-position="center" :duration="800">
        <swiper-item class="swiper-item" v-for="(item, index) in imgList" :key="index"
                     @click.native="linkToDetail(2)">
          <img :src="item.img " alt="image">
        </swiper-item>
      </swiper>
    <group style="margin-bottom: 0.5rem">
      <cell-box>
        <div class="order-type-box">
          <div class="type-item" @click="linkToProducts">
            <!--<router-link :to="{path:'/page/products'}">-->
            <img src="../../../static/img/planting/flower.png"/>
              <span style="">鲜花</span>
            <!--</router-link>-->
          </div>
          <div class="type-item" >
            <img src="../../../static/img/planting/Immortal-flower.png"/>
            <span>永生花</span>
          </div>
          <div class="type-item" >
            <img src="../../../static/img/planting/cake.png"/>
            <span>蛋糕</span>
          </div>
          <div class="type-item" >
            <img src="../../../static/img/planting/gift.png"/>
            <span>礼品</span>
          </div>
          <div class="type-item" >
            <img src="../../../static/img/planting/chocolate.png"/>
            <span>巧克力</span>
          </div>
        </div>
      </cell-box>
    </group>
      <div class="selected-themes">
        <div class="title">
          <h5>精选主题</h5>
        </div>
        <div class="selectd-box">
          <div class="selectd-item big" v-if="index===2" v-for="(item,index) in 2" :key="index"
               :data-name="item.name">
            <img src="./../../../static/img/flower/201708111123591219.jpg" alt="">
          </div>
          <div class="selectd-item" :data-id="item.id" :data-name="item.name"  v-else>
            <img src="./../../../static/img/flower/201709151725463208.jpg" alt="">
          </div>
        </div>
      </div>
      <div class="recent-products">
        <div class="title">
          <h5>最近新品</h5>
        </div>
        <products :products="recentList"></products>
      </div>
    <!--</mescroll-vue>-->
  </div>
</template>

<script>
  import {SwiperItem, Swiper,CellBox,Group, Cell,} from 'vux'
  import products from '@/components/Products.vue'

  import MescrollVue from 'mescroll.js/mescroll.vue'

  const bannerId = 1
  const themeIds = '1,2,3'

  export default {
    name: 'Home',
    data() {
      return {
        imgList: [
          {id: '101', img: './../../../static/img/planting/17_spz_m.jpg'},
          {id: '102', img: './../../../static/img/planting/18_birthday_m.jpg'},
          {id: '103', img: './../../../static/img/planting/19_yuanxiao_m.jpg'},
        ],
        themeList: [],
        recentList: [],
      }
    },
    created() {

    },
    methods: {
      linkToDetail(id) {
        this.$router.push({path: '/page/detail', query: {id: id}})
      },
      linkToProducts() {
        this.$router.push({path:'/page/products'})
      },
      linkToTheme(id) {
        this.$router.push({
          path: '/page/theme',
          query: {id: id}
        })
      },
      getBanner() {
        this.$http
          .get(
            `/banner/${bannerId}`
          )
          .then(res => {
            this.imgList = res.data.data.items
          })
      },
      getTheme() {
        this.$http
          .get(
            `/theme?ids=${themeIds}`
          )
          .then(res => {
            this.themeList = res.data.data
          })
      },
      getRecent() {
        this.$http
          .get(
            '/product/recent'
          )
          .then(res => {
            this.recentList = res.data.data
          })
      }
    },

    components: {
      CellBox,
      Swiper,
      products,
      SwiperItem,
      MescrollVue,
      Group,
      Cell,
    }
  }
</script>

<style scoped lang="less">
  @import "../../../static/styles/font-awesome-4.7.0/css/font-awesome.css";
  .home {
    .swiper-item img {
      width: 100%;
    }
    .user-info {
      width: 100%;
      height: 140px;
      display: flex;
      align-items: center;
      @width77: 77px;
      >div {
        height: @width77;
      }
      .user-img {
        width: @width77;
        border-radius: 50%;
        overflow: hidden;
        margin-left: 30px;
        background-color: #b0b6c4;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .name-mobile {
        padding: 5px 10px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
      }
    }
    .order-type-box{
      width: 100%;
      display: flex;
      >div{
        flex: 1;
        height: 55px;
        font-size: 12px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        img{
          width: 24px;
          height: 24px;
          margin-bottom: 5px;
        }
      }
    }
    .selected-themes {
      overflow: hidden;

      .title {
        padding: 10px 0;
        font-size: 18px;
        color: #ab956d;
        text-align: center;

        h5 {
          font-weight: normal;
        }
      }

      .selectd-box {
        font-size: 0;
        overflow: hidden;

        .selectd-item {
          display: inline-block;
          width: 50%;
          border-bottom: 2px solid #fff;
          box-sizing: border-box;

          img {
            width: 100%;
          }

          &:nth-child(1) {
            border-right: 1px solid #fff;
          }

          &:nth-child(2) {
            border-left: 1px solid #fff;
          }

          &.big {
            width: 100%;
          }
        }
      }
    }

    .recent-products {
      .title {
        padding: 10px 0;
        font-size: 18px;
        color: #ab956d;
        text-align: center;

        h5 {
          font-weight: normal;
        }
      }
    }
  }


</style>
