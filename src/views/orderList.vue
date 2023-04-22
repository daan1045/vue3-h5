<template>
  <div class="order_wrap">
    <div
      v-for="item in orderList"
      :key="item.id"
      class="order_item"
    >
    <p>订单号：{{item.id}}</p>
    <p>总价格：{{item.totalAmount}}</p>
    <p>收货人：{{item.deliveryUserName}}</p>
    <p>收货电话：{{item.deliveryUserPhone}}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component"
import { useRoute, useRouter } from "vue-router"
import {useStore} from "vuex"
import { orderListApi } from "@/utils/request"
@Options({
  components: {}
})
export default class orderList extends Vue {
  route = useRoute()
  router = useRouter()
  store = useStore()
  orderList:any[] = []
  public async mounted() {
    const res:any = await orderListApi({
      userId: this.store.state.uInfo.id
    })
    if(res.code == 200) {
      this.orderList = res.body
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