<template>
	<div class="myCollection">
		<div v-for="item in collectionList" :key="item.collectId">
			<div class="goods-img">
				<img :src="'../../../static/img/flower/'+item.flower.flowerImageName"/>
			</div>
			<div class="goods-info">
				<p>{{item.flower.flowerName}}</p>
				<div><span>￥{{item.flower.flowerPrice}}</span>
          <a href="javascript:;" @click="deleteCollect(item.collectId)">取消收藏</a></div>
			</div>
		</div>
	</div>
</template>

<script>
  import * as api from '../../../static/js/api/api'

	export default {
		name: 'myCollection',
		data() {
			return {
				collectionList:[],
			}
		},
    created(){
		  this.selectCollection()
    },
    methods:{
      selectCollection(){
        const userId=sessionStorage.getItem("userId")
        const that=this
        that.$http.get(api.selectAllCollect,{params:{"userId":userId}})
          .then((res)=>{
            that.collectionList=res.data.data
            console.log(that.collectionList)
          }).catch((err)=>{
            console.log(err)
        })
      }
      ,deleteCollect(collectId){
        alert(collectId)
        let that=this
        that.$http.get(api.deleteCollect,{
          params:{"collect":collectId}
        }).then((res)=>{
          this.$vux.toast.show({
            text: '取消收藏'
          })
          setTimeout(() => {
            location.reload()
          }, 1000);
        })
      }
    }
	}
</script>

<style scoped lang="less">
	.myCollection >div{
		padding: 17.5px 20px;
		height: 90px;
		background-color: #FFFFFF;
		font-size: 14px;
		margin-bottom: 10px;
		.goods-img{
			width: 90px;
			height: 90px;
			margin-right: 17.5px;
			overflow: hidden;
			border-radius: 6px;
			background-color: #eaeeef;
			float: left;
			img{
				width: 100%;
				height: 100%;
			}
		}
		.goods-info{
			height: 90px;
			float: left;
			width: calc(~"100% - 107.5px");
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			>p{
				line-height: 20px;
				-webkit-line-clamp: 2;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				overflow: hidden;
			}
			>div a{
				float: right;
			}
		}
	}
</style>
