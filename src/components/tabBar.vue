<template>
  <van-tabbar route>
    <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
    <van-tabbar-item icon="balance-list-o" to="/goodsList">列表页</van-tabbar-item>
    <van-tabbar-item icon="shopping-cart-o" to="/goodsCar">购物车</van-tabbar-item>
    <van-tabbar-item icon="friends-o" to="/my">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component"
import { useRoute } from "vue-router"
// 安装 vue-property-decorator
// npm i vue-property-decorator --save
// import { Prop } from "vue-property-decorator"
@Options({})
export default class TabBar extends Vue{
  // @Prop(Number)
  // private active;
}
</script>

<style lang="less" scoped>
</style>