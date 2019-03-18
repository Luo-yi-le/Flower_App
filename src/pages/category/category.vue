<template>
  <div class="category">
    <ul class="category-menu vux-1px-r">
      <li class="menu-item">
        鲜花
      </li>
    </ul>
    <div class="category-main">
      <div class="category-detail-box">
        <div class="category-top">
          <div class="category-header"
               style="background-image: url('../../assets/img/planting/banner_flower.jpg');height: 175px">
            <div class="navigation"><a href="#">浪漫告白·卡罗拉红玫瑰11枝</a></div>
          </div>
          <div class="category-title"><h2 class="text">鲜花</h2></div>
        </div>
        <div class="category-list">
          <div class="category-goods-items" v-for="(item,index) in menu"
               @click="onProducts(item.flowerUseId)" :key="index">
            <img :src="url+'/planting/'+item.flowerUseId+'.jpg'"
                 alt=""
                 class="goods-image">
            <div class="goods-name">{{item.flowerUseName}}</div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  const categoryList = () => ['', '', '']
  import * as api from '../../../static/js/api/api'

  export default {
    name: 'category',
    data() {
      return {
        menu: [],
        list: "",
        currentIndex: 0,
        url:api.url,
      }
    },
    created() {
      this.getData()
    },
    computed: {
      // menuBanner() {
      //     return this.menu[this.currentIndex].img.url
      // },
      // categoryTitle() {
      //     return this.menu[this.currentIndex].name
      // }
    },
    methods: {
      switchCategory(index, id) {
        this.currentIndex = index
        this.getProduct(id)
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
      onProducts(id) {
        this.$router.push({
          path: '/page/products',
          query: {
            selected: id
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .category {
    height: 100%;
    display: flex;
    overflow: hidden;

    .category-menu {
      width: 70px;
      flex: 0 0 75px;
      height: 100%;

      .menu-item {
        height: 25px;
        padding: 5px 0;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-left: 3px solid #fff;

        &.active {
          color: #ab956d;
          border-color: #ab956d;
          font-size: 15px;
          // transform: scale(1.125);
          transition: all linear 0.3s;
        }
      }
    }

    .category-main {
      flex: 1;
      height: 100%;
      transition: all 500ms ease-in-out;

      .category-detail-box {
        overflow-y: auto;
        padding: 20px;
        height: 100%;
        box-sizing: border-box;
        -webkit-overflow-scrolling: touch;

        .category-top {
          .category-header {
            img {
              width: 100%;
              vertical-align: top;
              border-radius: 2px;
            }

            .navigation {
              display: block;
              width: 90%;
              margin: auto;
              height: 100%;
              line-height: 6.28571429rem;
              -webkit-box-sizing: border-box;
              -moz-box-sizing: border-box;
              box-sizing: border-box;
              background-color: rgba(35, 38, 40, 0.5);
              padding: 0 1.14285714rem;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              text-align: center;
              font-size: 2rem;

              a {
                color: #f0f0f0;
              }

              a:hover {
                color: #f0f0f0;
              }
            }
          }

          .category-title {
            margin: 15px;
            display: flex;
            align-items: center;
            justify-content: center;

            .text {
              font-size: 12px;
              color: #ab956d;
              font-weight: normal;
              margin-right: 20px;

              &::before,
              &::after {
                content: '';
                display: inline-block;
                position: relative;
                top: -3px;
                width: 20px;
                height: 1px;
                margin: 0;
                background-color: #979797;
                transform: scaleY(0.5);
              }
            }
          }
        }

        .category-list {
          display: flex;
          flex-wrap: wrap;

          .category-goods-items {
            width: 30%;
            margin-right: 5%;
            margin-bottom: 10px;
            text-align: center;

            &:nth-child(3n) {
              margin-right: 0;
            }

            .goods-image {
              width: 80%;
              border-radius: 50%;
            }

            .goods-name {
              color: #444452;
              font-size: 12px;
            }
          }
        }
      }
    }
  }

</style>
