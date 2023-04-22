<template>
  <div class="order_wrap">
    <div
      v-for="item in addressrList"
      :key="item.id"
      class="order_item"
    > 
    <p>收货人：{{item.deliveryUserName}}</p>
    <p>收货电话：{{item.deliveryUserPhone}}</p>
    <p>收货地址：{{item.deliveryUserAddress}}</p>
    </div>
  </div>
</template>

<script lang="ts">
import {Options , Vue } from "vue-class-component" 
import {getAddressApi} from "@/utils/request"
import {useStore} from "vuex"
@Options({})
export default class my extends Vue {
  store = useStore()
  addressrList:any[]=[]

  public async mounted(){
    const res:any = await getAddressApi({
      userId:this.store.state.uInfo.id
    })
    if(res.code==200){
      this.addressrList=res.body
    }
  }
}
</script>

<style lang="less" scoped>
.order_wrap{
  padding:0 30px;
  background: #eee;
  min-height: 100vh;
  .order_item{
    background: #fff;
    border-radius: 5px;
    margin-bottom: 30px;
    font-size: 30px;
    padding: 15px;
    p{
      line-height: 2;
    }
  }
}
</style>