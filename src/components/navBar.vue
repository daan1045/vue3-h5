<template>
  <van-nav-bar fixed placeholder>
    <template #title>
      <van-search
        v-model="searchValue"
        placeholder="请输入搜索关键词"
        @search="handleSearch"/>
    </template>
  </van-nav-bar>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component"
import { Prop, Emit } from "vue-property-decorator"
import { useRouter, useRoute } from "vue-router"
@Options({})
export default class NavBar extends Vue{
  searchValue: string = ''
  router = useRouter()
  route = useRoute()
  handleSearch = ():void => {
    // 输入的值，需要传给父组件
    // 在父组件声明一个方法，绑定在子组件，然后触发方法进行数据传递
    this.search()
    this.router.push({
      path: "/goodsList",
      query: {
        key: this.searchValue
      }
    })
  }
  @Emit()// 事件名对应
  search():string {
    return this.searchValue
  }
  public mounted(): void {
    this.searchValue = this.route.query.key as string || ''
  }
}
</script>

<style lang="less" scoped>
:deep .van-nav-bar__title {
  max-width:100%;
  width: 100%;
}
</style>