<template>
  <div class="products">
    <div class="products-item"
         v-for="(item,index) in flowerList"
         :key="index"
         :data-id="item.flowerId"
         @click="linkToDetail">
      <img :src="'./../../static/img/flower/'+item.flowerImageName"
           alt="image"
           class="products-image">
      <div class="products-item-bottom">
        <h2 class="name">{{item.flowerName}}</h2>
        <p class="price">¥&nbsp;{{item.flowerPrice}}</p>
      </div>

    </div>
    <div><router-link to="/page/products">没有数据了? 查看全部</router-link></div>
  </div>
</template>

<script>
  import * as api from '../../static/js/api/api.js'

  export default {
    name: 'products',
    props: ['products'],
    data() {
      return {
        flowerList: [],
      }
    },
    created() {
      this.FlowerList()
    },
    methods: {
      linkToDetail(e) {
        let id = e.currentTarget.dataset.id
        this.$router.push({path: '/page/detail', query: {id: id}})
      },
      FlowerList() {
        const that=this
        that.$http.get(api.getFlower, {params:{skip: 0, size: 20}})
          .then((res)=>{
            that.flowerList = res.data.data
            console.log(that.flowerList = res.data.data)
          }).catch((err) => {
          console.log(err)
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .products {
    margin: 0 10px 10px 10px;
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
  }
</style>
