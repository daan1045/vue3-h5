<template>
  <div class="index_wrap">
    <nav-bar @search="hSearch"></nav-bar>
    <div class="page_content">
      <van-swipe class="my-swipe" :initial-swipe="activeIndex" :autoplay="3000" indicator-color="white" @change="handleSwiperChange">
        <van-swipe-item @click="handleSwiperItem" v-for="item in swiperGoodsList" :key="item.id">
          <img :src="require('@/assets/images/goods/'+item.goodsPictureName)" />
        </van-swipe-item>
      </van-swipe>
      <!-- 消息tips -->
      <div class="tips">女装5折</div>
      <!-- 商品推荐 -->
      <div class="goods_list">
        <h3>商品推荐</h3>

        <div  class="flex-float">
          <div v-for="item in goodsList" :key="item.id" class="item flex" @click="toDetail(item.id)">
            <img :src="require('@/assets/images/goods/'+item.goodsPictureName)" alt="">
            <div>
              <p>{{item.goodsName}}</p>
              <p>价格：￥{{item.goodsPrice}}</p>
            </div>  
          </div> 
        </div>
      </div>
    </div>
    <!-- 父组件传子组件数据，通过在子组件的标签内添加属性，子组件通过prop获取 -->
    <tab-bar :active="1"></tab-bar>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component"
import { useRouter } from "vue-router"
import TabBar from "@/components/tabBar.vue"
import NavBar from "@/components/navBar.vue"
import { getIndexPageDataApi } from "@/utils/request"
import { goodsListType } from "@/utils/interface"

@Options({
  components: {
    TabBar,
    NavBar
  }
})
export default class AboutView extends Vue{
  searchKey: string = ''
  swiperGoodsList: goodsListType[] = []
  goodsList: goodsListType[] = []
  activeIndex:number = 0
  router = useRouter()
  hSearch = (val:string):void => {
    console.log(val)
    this.searchKey = val
  }
  // 获取首页商品数据接口
  getGoodsData = ():void => {
    getIndexPageDataApi({
      currentPage: 1,
      size: 10
    }).then((res:any) => {
      if (res.code == 200) {
        console.log(res)
        const resData = res.body.records
        this.swiperGoodsList = resData.slice(0, 3)
        // 拿到商品数据
        this.goodsList = resData.slice(3)
      }
    })
  }
  // 生命周期
  public mounted(): void {
    this.getGoodsData()
  }
  handleSwiperItem():void{ 
    this.router.push({
      path:"/goodsDec",
      query:{
        id:this.swiperGoodsList[this.activeIndex].id
      }
    })
  }
  handleSwiperChange(index:number):void{
    this.activeIndex = index
  }
  toDetail (id:number):void {
    this.router.push({
      name:"goodsDec",
      query:{
        id
      }
    })
  }
}
</script>

<style lang="less" scoped>
.index_wrap {
  .page_content{
    padding:0 15px;
    
    .my-swipe{
        background-color: palegreen;
        height: 320px;
        img{
            width: 100%;
            height: 320px;
        }
    }
    .tips{
        box-sizing: border-box;
        border: 1px solid orange;
        color:orange;
        line-height: 2;
        font-size: 26px;
        margin: 30px 0;;
        padding:0 20px
    }
    .goods_list{
        .item{
            width: 48%;
            background: gainsboro; 
            margin-bottom: 30px;
            padding: 20px;
            border-radius: 5px;
            img{
                width: 90px;
                height: 90px;
                display: block;
                margin-right: 20px;
            }
        }
    }
  }
}
</style>