<template>
	<div class="receiptAddress">
		<div class="addres-item" v-for="item in addressList" @click="handleSelect">
			<p>{{item.consigneeName}}&nbsp;&nbsp;{{item.consigneePhone}}</p>
			<p>{{item.address}}&nbsp;&nbsp;{{item.detailedAddress}}</p>
			<div>
				<check-icon :value.sync="item.state.stateId==11" @click.native.stop="handleCheckedItem(item)">默认地址</check-icon>
				<router-link @click.native.stop :to="{path:'/page/addAddress',query:{id:item.addressId}}">编辑</router-link>
			</div>
		</div>
		<x-button type="primary" class="add-btn" @click.native="handleAddAddress">+ 添加收货地址</x-button>
	</div>
</template>

<script>
	import { CheckIcon, XButton } from 'vux'
  import * as api from '../../../static/js/api/api'
	export default {
		name: 'receiptAddress',
		data() {
			return {
				checked:true,
        addressList:[],
			}
		},
    created(){
		  this.selectAddress()
    },
		methods:{
			handleCheckedItem(item){
				this.addressList.forEach((item) => {
					item.isDefault = false;
				})
				item.isDefault = true;
			},
			handleAddAddress(){
				this.$router.push({
					path:'/page/addAddress'
				})
			},
			handleSelect(){
				this.$router.push({
					path:'/PerfectOrder'
				})
			},
      selectAddress() {
        const that = this
        const userId = sessionStorage.getItem("userId");
        that.$http.post(api.selectAllAddress, {"userId": userId})
          .then(res => {
            that.addressList = res.data.data;
            console.log(that.addressList = res.data.data)
          }).catch(res => {
          console.log(res);
        })
      }
		},
		components: {
			CheckIcon,
			XButton
		},
	}
</script>

<style scoped lang="less">
	.receiptAddress{
		padding-bottom: 50px;
	}
	.addres-item{
		height: 95px;
		padding: 15px;
		background-color: #FFFFFF;
		font-size: 13px;
		margin-bottom: 10px;
		p:first-of-type{
			font-weight: bold;
			font-size: 16px;
			margin-bottom: 5px;
		}
		p:last-of-type{
			height: 40px;
			line-height: 20px;
			-webkit-line-clamp: 2;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			overflow: hidden;
		}
		>div{
			height: 30px;
			line-height: 30px;
			a{
				float: right;
				display: inline-block;
				width: 60px;
				height: 100%;
				text-align: center;
			}
		}
	}
	.add-btn{
		position: fixed;
		bottom: 0px;
		left: 0px;
		font-size: 14px;
		height: 50px;
	}
</style>
