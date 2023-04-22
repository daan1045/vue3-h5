<template>
  <div class="my_wrap">
    <div class="top">
      <div>
        <span class="avear"></span>
        <p class="unamw">{{ uInfo.userName || "匿名" }}</p>
      </div>

    </div>
    <div class="nav">
      <p @click="toOrder">我的订单</p>
      <p @click="toAddress">地址管理</p>
    </div>
    <TabBar />
  </div>
</template>

<script lang="ts">
import {Options , Vue } from "vue-class-component" 
import {useStore} from "vuex"
import {useRouter} from "vue-router"
import TabBar from "@/components/tabBar.vue"
@Options({
  components:{
    TabBar
  }
})
export default class my extends Vue {
  store = useStore()
  router = useRouter()
  uInfo:any = this.store.state.uInfo
  toOrder(){
    this.router.push({
      name: 'orderList'
    })
  }
  toAddress () {
    this.router.push({
      name: 'addressList'
    })
  }
}
</script>

<style lang="less" scoped>
.my_wrap{
  background: #eee;
  min-height: 100vh;
  .top{
    padding: 60px 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: #fff;
    margin-bottom: 30px;
  }
  // 导航
  .avear{
    display: block;
    width: 200px;
    height: 200px;
    background: chocolate;
    border-radius: 50%;
    margin-bottom: 20px;
  }
  .unamw{
    font-size: 50px;
    text-align: center;
  }
}
.nav{
  p {
    background: #fff;
    margin-bottom: 1px;
    padding: 30px;
    font-size: 38px;
  }
}
</style>