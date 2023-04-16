<template>
  <div class="goods-list_wrap">
    <nav-bar @search="hSearch"></nav-bar>
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      offset="80"
      :immediate-check="false"
    >
      <van-cell v-for="item in goodsList" :key="item.id" class="goods_wrap">
        <div class="flex goods_item" @click="handleToDetail(item.id)">
          <img :src="require('@/assets/images/goods/'+item.goodsPictureName)"   ismapalt="">
          <div class="goods_info">
            <h1>{{item.goodsName}}</h1>
            <p>价格：{{item.goodsPrice}}</p>
            <p>库存：{{item.goodsNum}}</p>
          </div>
        </div>
      </van-cell>
    </van-list>
    <tab-bar></tab-bar>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component"
import { useRouter, useRoute } from "vue-router"
import TabBar from "@/components/tabBar.vue"
import NavBar from "@/components/navBar.vue"
import { goodsListType } from "@/utils/interface"
import { getGoodsListApi } from "@/utils/request"
type paramsType = {
  goodsName: string,
  currentPage: number,
  size: number
}
@Options({
  components: {
    TabBar,
    NavBar
  }
})
export default class GoodsList extends Vue {
  route = useRoute()
  router = useRouter()
  searchParams:paramsType = {
    goodsName: '',
    currentPage: 1,
    size: 10
  }
  key:string = this.route.query.key as string
  goodsList:goodsListType[] = []
  loading:boolean = false
  finished:boolean = false

  onLoad():void {
    // 加载下一页
    // 页码进行加一
    this.searchParams.currentPage += 1
    this.loading = true
    this.getGoodsList(true)
  }
  hSearch (val?:string):void {
    val ? this.searchParams.goodsName = val : null
    // 搜索对应商品
    this.getGoodsList(false)
  }
  getGoodsList (type:boolean):void {
    getGoodsListApi(this.searchParams).then((res:any) => {
      console.log(res)
      // type是用来判断是输入框值有改变下来刷新更多还是原搜索值下拉加载更多
      if (type) {
        this.goodsList = [...this.goodsList, ...res.body.records]
      } else {
        this.goodsList = res.body.records
      }
      // 分页是否全部加载完成
      if (res.body.total <= this.goodsList.length) {
        this.finished = true
      }
      // 请求异步结束loading一定改为false
      this.loading = false
    })
  }

  handleToDetail (id:number):void {
    this.router.push({
      name:"goodsDec",
      query:{
        id
      }
    })
  }

  public mounted(): void {
    this.searchParams.goodsName = this.key
    this.hSearch()
  }
}
</script>

<style lang="less" scoped>
.van_box{
  padding-bottom: 80px;
  background: rgb(247, 247, 247); 
}
.goods-list_wrap {
  background: rgb(247, 247, 247); 
  padding:0 30px;
}
.goods_wrap {
  margin-bottom: 30px;
}
.goods_item{
  img{
    width:50%;
    height:160px;
  }
  background: rgb(255, 255, 255);
  .goods_info{
    padding-left: 50px;
    h1{
      font-size: 40px;
    }
    p{
      font-size: 34px;
      padding-top:18px;
    }
  }
}
</style>
