<template>
  <div>
    <div ref="mescroll" class="mescroll">
      <div class="category">
        <tab :line-width="2" custom-bar-width="50px">
          <tab-item :selected="selected === '1'" @on-item-click="selected = '1'">爱情鲜花</tab-item>
          <tab-item :selected="selected === '2'" @on-item-click="selected = '2'">友情鲜花</tab-item>
          <tab-item :selected="selected === '3'" @on-item-click="selected = '3'">生日鲜花</tab-item>
          <tab-item :selected="selected === '4'" @on-item-click="selected = '4'">问候长辈</tab-item>
          <tab-item :selected="selected === '5'" @on-item-click="selected = '5'">回报老师</tab-item>
          <tab-item :selected="selected === '6'" @on-item-click="selected = '6'">探病慰问</tab-item>
          <tab-item :selected="selected === '7'" @on-item-click="selected = '7'">道歉鲜花</tab-item>
          <tab-item :selected="selected === '8'" @on-item-click="selected = '8'">婚庆鲜花</tab-item>
        </tab>

      </div>

        <div class="products">
          <div class="products-item"
               v-for="(item,index) in flowerList"
               v-show="item.flowerUseId == selected || selected ==='1'"
               :key="index"
               :data-id="item.flowerId"
               @click="linkToDetail">
            <img :src="url+'/flower/'+item.flowerImageName"
                 alt="image"
                 class="products-image">
            <div class="products-item-bottom">
              <h2 class="name">{{item.flowerName}}</h2>
              <p class="price">¥&nbsp;{{item.flowerPrice}}</p>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
  //引入mescroll.min.js和mescroll.min.css
  import MeScroll from 'mescroll.js'
  import 'mescroll.js/mescroll.min.css'

  import * as api from '../../../static/js/api/api'
  import Tab from "vux/src/components/tab/tab";
  import TabItem from "vux/src/components/tab/tab-item";

  export default {
    name: 'products',
    components: {TabItem, Tab},
    props: ['products'],

    data() {
      return {
        flowerList: [],
        mescroll: null, //mescroll实例对象
        menu: [],
        url:api.url,
        selected: this.$route.query.selected ? this.$route.query.selected : '1',//tab选中状态,
      }
    },
    mounted() {
      this.mescroll = new MeScroll(this.$refs.mescroll, {
        up: {
          callback: this.FlowerList,
          // 以下是一些常用的配置,当然不写也可以的.
          page: {
            num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
            size: 10, //每页数据条数,默认10
          },
          htmlNodata: '<p class="upwarp-nodata">亲,没有更多数据了~</p>',
          noMoreSize: 5, //如果列表已无数据,可设置列表总数大于5才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
          toTop: {
            //回到顶部按钮
            src: "http://localhost:8080/img/icon/top.png", //图片路径,默认null,支持网络图
            offset: 1000, //列表滚动1000px才显示回到顶部按钮
          },
          lazyLoad: {
            use: true // 是否开启懒加载,默认false
          },
          empty: {
            //列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
            warpId: "xxid", //父布局的id (1.3.5版本支持传入dom元素)
            icon: "fa fa-refresh fa-spin", //图标,默认null,支持网络图
            tip: "暂无相关数据~", //提示
          }
        }
      });
    },
    created() {
    },
    methods: {
      linkToDetail(e) {
        let id = e.currentTarget.dataset.id
        this.$router.push({path: '/page/detail', query: {id: id}})
      },
      mescrollInit(mescroll) {
        this.mescroll = mescroll
      },
      FlowerList(page, selected) {
        const id = this.$route.query.selected
        // console.log(id)
        setTimeout(() => {
          const that = this
          that.$http.get(api.getFlower, {
            params: {
              skip: page.num,
              size: page.size,
              flowerUseId: id,
              rank:8
            }
          })
            .then((res) => {
              let arr = res.data.data
              if (page.num == 1)
                that.flowerList = [];
              console.log(that.flowerList = res.data.data)
              that.flowerList = this.flowerList.concat(arr);

              that.$nextTick(() => {
                that.mescroll.endSuccess(arr.length);
              })
            }).catch((err) => {
            that.mescroll.endErr();
          })
        }, 1000)
      },
      async getData() {
        let res = await this.getCategory()
        this.menu = res.data.data
        console.log(this.menu = res.data.data)
      },
      getCategory() {
        return this.$http
          .get(api.getAllFloweruse)
      },
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        if (vm.mescroll) {
          // 恢复到之前设置的isBounce状态
          if (vm.mescroll.lastBounce != null) vm.mescroll.setBounce(vm.mescroll.lastBounce)
          // 滚动到之前列表的位置 (注意:路由使用keep-alive才生效)
          if (vm.mescroll.lastScrollTop) {
            vm.mescroll.setScrollTop(vm.mescroll.lastScrollTop)
            setTimeout(function () { // 需延时,因为setScrollTop内部会触发onScroll,可能会渐显回到顶部按钮
              // vm.mescroll.setTopBtnFadeDuration(0)// 设置回到顶部按钮显示时无渐显动画
              vm.mescroll.setTopBtnFadeDuration(false)
            }, 16)
          }
        }
      })
    },
    // 离开路由时,记录列表状态
    beforeRouteLeave(to, from, next) {  // 如果没有配置回到顶部按钮或isBounce,则beforeRouteLeave不用写
      if (this.mescroll) {
        this.mescroll.lastBounce = this.mescroll.optUp.isBounce// 记录当前是否禁止ios回弹
        this.mescroll.setBounce(true) // 允许bounce
        this.mescroll.lastScrollTop = this.mescroll.getScrollTop()// 记录当前滚动条的位置
        this.mescroll.hideTopBtn(false)// 隐藏回到顶部按钮,无渐隐动画
      }
      next()
    }
  }
</script>

<style scoped lang="less">
  @import "../../../static/styles/font-awesome-4.7.0/css/font-awesome.css";

  @white: #FFFFFF;
  @black: #393a3e;
  .products {
    margin: 10px 10px 10px 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .products-item {
      width: 49%;
      border-radius: 5px;
      margin-right: 0;
      margin-bottom: 5px;
      background-color: #f5f6f5;
      text-align: center;

      .products-image {
        margin: 5px auto 0 auto;
        width: 80%;
        border-radius: 5px;
      }

      .products-item-bottom {
        text-align: center;
        margin-bottom: 10px;
        color: #333;

        .name {
          font-size: 12px;
          font-weight: normal;
        }

        .price {
          font-size: 16px;
          color: #ec8b89;
        }
      }
    }

    .category {

    }
  }


  .mescroll {
    position: fixed;
    top: 44px;
    bottom: 0;
    height: auto;
  }
</style>
