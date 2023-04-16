<template>
  <div class="goods_car_wrap">
    <div class="list_wrap">
      <div class="item flex-float" v-for="item in carGoodsList" :key="item.id">
        <div class="wrap flex">
          <img :src="require('@/assets/images/goods/'+item.goodsPictureName)"   ismapalt="">
          <div>
            <p>商品名：{{item.goodsName}}</p>
            <p>单价：{{item.goodsPrice}}</p>
              
          </div>
        </div>
        <van-stepper v-model="item.goodsNum" min="0" :before-change="(value)=>{return beforeChange(value, item)}"/>
      </div>
    </div>
    <van-submit-bar :price="allPrice" button-text="提交订单" @submit="onSubmit" />
    <tab-bar></tab-bar>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component"
import { useRoute, useRouter } from "vue-router"
import {useStore} from "vuex"
import {Watch } from 'vue-property-decorator'
import TabBar from "@/components/tabBar.vue"
import { goodsListType } from "@/utils/interface"
import { addCarApi, getCarApi } from "@/utils/request"
@Options({
  components: {
    TabBar
  }
})
export default class GoodsDec extends Vue {
  route = useRoute()
  router = useRouter()
  store = useStore()
  carGoodsList: goodsListType[] = []
  allPrice: string | number = 0

  onSubmit = () => {}

  beforeChange = async (val:string, item:goodsListType):Promise<boolean> => {
    const res:any = await addCarApi({
      'userId': this.store.state.uInfo.id,
      'goodsId': item.id,
      'goodsNum': val
    })
    if(res.code==200){
      if(val=='0'){
        // this.init()
      }
      return true;
    }else{
      return false
    }
  }

  public async mounted() {
    if (this.store.state.uInfo.id) {
      const res: any = await getCarApi({
        userId: this.store.state.uInfo.id
      })
      if (res.code == 200) {
        console.log(res)
        this.carGoodsList = res.body.records
      }
    }
  }
}
</script>

<style lang="less" scoped>
.goods_car_wrap {
  min-height: 100vh;
  background: #ececec;
}
.item {
  padding:30px;
  background: #fff;
  margin-bottom: 30px;
  .wrap {
    font-size: 30px;
    p {
      padding-bottom: 20px;
    }
    img {
      display: block;
      width: 200px;
      height: 200px;
      margin-right: 30px;
    }
  }
}
.sub_nav {
  bottom:100px;
}
.address {
  width:100%;
  height: 200px;
  background: #fff;
  margin-bottom: 30px;
  padding:20px; 
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  .add_address{
    font-size: 30px;
    font-weight: bold;
  }
}
.input_box input,.input_box textarea {
  border: 1px solid gray;
}
.addres_box {
  width: 500px;
}
.addres_list {
  padding:30px;
}
.addres_list_item{
  border-bottom: 1px solid #aaaaaa;
  p {
    line-height: 2;
    font-size: 30px;
  }
}
.no_goods {
  font-size: 40px;
  color:#aaa;
  line-height: 300px;
  text-align: center;
}
</style>