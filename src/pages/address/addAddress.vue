<template>
  <div class="add-address">
    <group>
      <x-input title="联系人"
               placeholder="名字"
               :value="addressList.consigneeName"></x-input>
      <x-input title="手机号码"
               placeholder="11位手机号"
               v-model="addressList.consigneePhone"></x-input>
      <x-address title="地区信息"
                 class="border"
                 v-model="addressList.address"
                 :list="ChinaAddressV4Data"
                 :raw-value="true"
                 placeholder="请选择地址"></x-address>
      <x-textarea :max="30"
                  name="detail"
                  placeholder="请输入详细地址、如街道、楼牌号等"
                  :value="addressList.detailedAddress"></x-textarea>
    </group>
    <div style="margin:40px 10px;">
      <x-button @click.native="submitAddress">保存</x-button>
    </div>
  </div>
</template>

<script>
  import * as api from '../../../static/js/api/api'
  import { mapGetters, mapMutations } from 'vuex'
  import {
    XTextarea,
    Group,
    XInput,
    XAddress,
    ChinaAddressV4Data,
    XButton,
    Value2nameFilter as value2name,
    Cell
  } from 'vux'
  export default {
    name: 'addAddress',
    data() {
      return {
        form: {
          consigneeName: '',
          consigneePhone: '',
          address: [],
          detailedAddress: ''
        },
        addressList:[],
        ChinaAddressV4Data: ChinaAddressV4Data
      }
    },
    created() {
      this.selectAddressId()
    },
    computed: {
      ...mapGetters(['userInfo'])
    },
    methods: {
      submitAddress() {
        const { consigneeName, consigneePhone,  detailedAddress } = this.form
        if (!consigneeName) {
          this.$vux.toast.text('请输入名字~', 'middle')
          return
        }
        if (!consigneePhone) {
          this.$vux.toast.text('请输入手机号~', 'middle')
          return
        }
        // if (!address) {
        //   this.$vux.toast.text('请选择地区~', 'middle')
        //   return
        // }
        if (!detailedAddress) {
          this.$vux.toast.text('请输入详情地址~', 'middle')
          return
        }
        //let cityVal = value2name(address, ChinaAddressV4Data)
        this.$router.go(-1)
      },
      selectAddressId(){
        let that=this
        let id = this.$route.query.id
        that.$http.post(api.selectAddressId,{addressId:id})
          .then((res)=>{
            that.addressList=res.data.data
            console.log(that.addressList)
          }).catch((error) =>{
            console.log(error)
        })
      }
    },
    components: {
      XTextarea,
      Group,
      XInput,
      XAddress,
      XButton,
      Cell
    }
  }
</script>

<style scoped lang="less">
  .border {
    position: relative;
    &::before {
      content: ' ';
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      height: 1px;
      border-top: 1px solid #d9d9d9;
      color: #d9d9d9;
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
      left: 15px;
    }
  }
</style>
