<template>
  <div class="add-address">
    <group >
      <x-input title="联系人"
               placeholder="名字"
               v-model="form.consigneeName"></x-input>
      <x-input title="手机号码"
               placeholder="11位手机号"
               v-model="form.consigneePhone"></x-input>
      <x-address title="地区信息"
                 class="border"
                 :list="ChinaAddressV4Data"
                 raw-value
                 v-model="form.address"
                 @on-shadow-change="onShadowChange"
                 clearable
                 ></x-address>

      <x-textarea :max="30"
                  name="detail"
                  placeholder="请输入详细地址、如街道、楼牌号等"
                  v-model="form.detailedAddress"></x-textarea>
      <check-icon class="is-default" :value.sync="isDefault" v-model="form.stateId">默认地址</check-icon>
      <div style="margin:40px 10px;">
      <x-button @click.native="submitAddress">保存</x-button>
      </div>
    </group>
  </div>
</template>
<script>
  import * as api from '../../../static/js/api/api'
  import {mapGetters, mapMutations} from 'vuex'
  import {
    XTextarea,
    Group,
    XInput,
    XAddress,
    ChinaAddressV4Data,
    XButton,
    Value2nameFilter as value2name,
    Cell,
    CheckIcon
  } from 'vux'
  export default {
    name: 'addAddress',
    data() {
      return {
        form: [{
          consigneeName: '',
          consigneePhone: '',
          address:[],
          detailedAddress: '',
          stateId:'12',
        }],
        name:'',

        // addressList: [],
        ChinaAddressV4Data: ChinaAddressV4Data,
      }
    },
    created() {
      this.selectAddressId()
    },
    computed: {
      ...mapGetters(['userInfo'])
    },
    mounted(){
      // this.form=this.addressList
      // console.log(this.form)
    },
    methods: {
      onShadowChange (ids,names) {
        this.form.address=names[0]+names[1]+names[2];
     this.name= this.form.address
        //console.log(this.form.address)
        sessionStorage.setItem('address',this.name)
       console.log('b:'+this.name)
        //console.log(ids,names)
        // this.address1 =names;
      },
      submitAddress() {
        const userId=sessionStorage.getItem('userId')
        const address=sessionStorage.getItem('address')
        const that=this
        that.$http.post(api.insertAddress,{
          'userId':userId,
          'consigneeName':that.form.consigneeName,
          'consigneePhone':that.form.consigneePhone,
          'address':address,
          'detailedAddress':that.form.detailedAddress,
          'stateId':12
        }).then((res)=>{
          this.$vux.toast.show({
            text:'添加成功'
          })
          setTimeout(()=>{
            this.$router.push('/page/address')
          },1000)
        })
        // const {consigneeName, consigneePhone, detailedAddress} = this.form
        // if (!consigneeName) {
        //   this.$vux.toast.text('请输入名字~', 'middle')
        //   return
        // }
        // if (!consigneePhone) {
        //   this.$vux.toast.text('请输入手机号~', 'middle')
        //   return
        // }
        // // if (!address) {
        // //   this.$vux.toast.text('请选择地区~', 'middle')
        // //   return
        // // }
        // if (!detailedAddress) {
        //   this.$vux.toast.text('请输入详情地址~', 'middle')
        //   return
        // }
        // //let cityVal = value2name(address, ChinaAddressV4Data)
        // this.$router.go(-1)
      },
      selectAddressId() {
        let that = this
        let id = this.$route.query.id
        that.$http.post(api.selectAddressId, {addressId: id})
          .then((res) => {
            that.form.address = res.data.data.address
            that.form.consigneeName = res.data.data.consigneeName
            that.form.consigneePhone = res.data.data.consigneePhone
            that.form.detailedAddress = res.data.data.detailedAddress
            console.log(that.form.address)
            console.log(that.form.consigneeName)
            console.log(that.form.consigneePhone)
            console.log(that.form.detailedAddress)
          }).catch((error) => {
          console.log(error)
        })
      },
    },
    components: {
      CheckIcon,
      XTextarea,
      Group,
      XInput,
      XAddress,
      XButton,
      Cell,
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
