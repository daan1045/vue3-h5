<template>
  <div class="detail_wrap">   
    <img :src="goodsDetail.goodsPictureName&&require('@/assets/images/goods/'+goodsDetail.goodsPictureName)" alt="">
    <h1>{{goodsDetail.goodsName}}</h1>
    <p class="price">价格：{{goodsDetail.goodsPrice}}</p>
    <p class="dec" v-html="goodsDetail.goodsDesc"></p>
  </div> 
  <!-- <van-button class="add_btn" :disabled="!goodsDetail.goodsNum" type="primary" @click="handleAddCar">添加到购物车</van-button> -->
  <van-icon name="cart-o" class="add_btn" :disabled="!goodsDetail.goodsNum" type="primary" @click="handleAddCar"/>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component"
import { useRoute, useRouter } from "vue-router"
import {useStore} from "vuex"
import { getGoodsDetailApi, addCarApi } from "@/utils/request"
type goodsDetail={
  goodsPictureName:string,
  goodsDesc:string,
  goodsName:string,
  goodsPrice:string,
  goodsNum:string,
  id?:number
}
@Options({})
export default class GoodsDec extends Vue {
  route = useRoute()
  router = useRouter()
  store = useStore()
  goodsDetail:goodsDetail = {
    goodsPictureName: '',
    goodsDesc: '',
    goodsName: '',
    goodsPrice: '',
    goodsNum: ''
  }

  handleAddCar = async ():Promise<void> => {
    // 请求添加购物车接口
    // 成功之后goodsNum -1
    // 用户id,商品id,数量 
    const res:any = await addCarApi({
      'userId': this.store.state.uInfo.id,
      'goodsId': this.goodsDetail.id,
      'goodsNum': 1
    })
    if (res.code == 200){
      this.router.push({
        name: 'goodsCar'
      })
    }
  }

  public async mounted() {
    if (this.route.query.id) {
      const res:any = await getGoodsDetailApi({
        id:this.route.query.id
      })
      console.log(res)
      if (res.code == 200) {
        const {goodsPictureName,goodsDesc,goodsName,goodsPrice,goodsNum,id} = res.body 
        this.goodsDetail={goodsPictureName,goodsDesc,goodsName,goodsPrice,goodsNum,id}
      }
    }
  }
}
</script>

<style lang="less" scoped>
.detail_wrap{
  font-size: 36px;
  .dec{
    padding: 20px 0;
  }
  .price{
    margin: 10px 0;
    color:rgb(206, 117, 0);
    font-size: 40px;
    font-weight: bold;
  }
  padding:0 30px;
  img{
    width: 100%;
  }
}
.add_btn{
  position: absolute;
  bottom:50px;
  right:30px;
  color:rgb(206, 117, 0);
  font-size: 80px;
}
</style>
