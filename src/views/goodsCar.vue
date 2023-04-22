<template>
  <div class="goods_car_wrap" v-if="carGoodsList.length">
    <!-- 地址栏 -->
    <div class="address">
      <div v-if="addressList.length <= 0" class="add_address" @click="handleAddAddress">
        <van-icon name="plus"></van-icon>
        <span>添加地址</span>
      </div>
      <div v-else class="flex-float">
        <!-- 选取第一个地址展示 -->
        <div class="addres_box">
          <p>收件人：{{addressObj.deliveryUserName}}</p>
          <p>手机号：{{addressObj.deliveryUserPhone}}</p>
          <p>地址：{{addressObj.deliveryUserAddress}}</p>
        </div>
        <van-button @click="changeAddress">切换</van-button>
      </div>
    </div>

    <!-- 地址列表 -->
    <van-action-sheet v-model:show="addressListShow" title="收货地址">
      <div class="addres_list">
        <div
          v-for="item in addressList"
          :key="item.id"
          class="addres_list_item" 
          @click="checkAddress(item)"
        >
          <p>收件人：{{item.deliveryUserName}}</p>
          <p>手机号：{{item.deliveryUserPhone}}</p>
          <p>地址：{{item.deliveryUserAddress}}</p>
        </div>
        <van-button @click="handleAddAddress">新建地址</van-button>
      </div>
    </van-action-sheet>


    <!---->
    <div class="list_wrap" v-if="carGoodsList.length">
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
    <!-- 添加地址弹窗 -->
    <van-dialog v-model:show="addresShow" title="添加地址" show-cancel-button :before-close="sumbitAddress"> 
      <!-- 表单 -->
      <van-cell-group inset>
      <!-- 输入任意文本 --> 
        <!-- 输入手机号，调起手机号键盘 -->
        <van-field class="input_box" v-model="formValues.deliveryUserName" type="text" label="姓名" /> 
        <van-field class="input_box" v-model="formValues.deliveryUserPhone" type="number" label="手机号" /> 
        <van-field class="input_box" v-model="formValues.deliveryUserAddress"  type="textarea" label="地址" rows=3 /> 
        <!-- 输入密码 --> 
      </van-cell-group>
    </van-dialog>
  </div>
  <p v-else class="no_goods">暂无商品</p>
  <tab-bar></tab-bar>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component"
import { useRoute, useRouter } from "vue-router"
import {useStore} from "vuex"
import { Watch } from 'vue-property-decorator'
import TabBar from "@/components/tabBar.vue"
import { goodsListType } from "@/utils/interface"
import { addCarApi, getCarApi, getAddressApi, addAddressApi, addOrderApi } from "@/utils/request"
import { showFailToast } from 'vant';
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
  addressList:any[] = []
  allPrice = 0
  addresShow:boolean = false
  addressListShow:boolean = false
  formValues:any = {
    userId:this.store.state.uInfo.id,
    deliveryUserName: '',
    deliveryUserPhone: '',
    deliveryUserAddress: ''
  }
  addressObj:any = {}

  // 监听watch carGoodsList 的改变然后计算价格
  @Watch('carGoodsList', {deep: true, immediate: true})
  onCarGoodsList () {// class 类里面，监听下紧跟要执行的方法
    this.allPrice = this.countPrice()
  }

  // 提交订单
  onSubmit = async ():Promise<void> => {
    const res:any = await addOrderApi({
      userId: this.store.state.uInfo.id,
      addressId: this.addressObj.id
    })
    if (res.code == 200) {
      // 跳转到订单列表页
      this.router.push({
        name:"orderList"
      })
    }
  }

  // 总价计算
  countPrice = ():any => {
    let price = 0
    this.carGoodsList.forEach(item => {
      price += (item.goodsNum * item.goodsPrice)
    })
    return price * 100 // 因组件是按分为单位，所以这里要乘100
  }

  beforeChange = async (val:string, item:goodsListType):Promise<boolean> => {
    const res:any = await addCarApi({
      'userId': this.store.state.uInfo.id,
      'goodsId': item.id,
      'goodsNum': val
    })
    if (res.code == 200) {
      if (val == '0') {
        this.init()
      }
      return true
    }else{
      return false
    }
  }
  // 获取收货地址
  getAddres = async ():Promise<void> => {
    const res:any = await getAddressApi({
      userId: this.store.state.uInfo.id
    })
    if (res.code == 200) {
      console.log(res)
      this.addressList = res.body
      this.addressObj=this.addressList[0]
    }
  }

  init = async ():Promise<void> => {
    if (this.store.state.uInfo.id) {
      const res: any = await getCarApi({
        userId: this.store.state.uInfo.id
      })
      if (res.code == 200) {
        console.log(res)
        this.carGoodsList = res.body.records
        this.allPrice = this.countPrice()
      }
      // 执行获取地址函数
      this.getAddres()
    }
  }

  // 添加地址
  handleAddAddress = () => {
    this.addresShow = true
  }

  // 地址列表
  changeAddress = () => {
    this.addressListShow = true
  }

  // 切换地址
  checkAddress = (item: any) => {
    this.addressListShow = false
    this.addressObj = item
  }

  // 关闭地址弹窗之前
  sumbitAddress = async (action:string):Promise<boolean>=>{
    if(action == 'confirm'){
      // 验证手机号 
      if(!/^1[3-9]\d{9}$/.test(this.formValues.deliveryUserPhone)){
        showFailToast('请输入正确手机号')
        return false
      }
      const res:any = await addAddressApi(this.formValues)

      if(res.code == 200){
        this.getAddres()
        return true
      }
      return false
    }else{
      return true
    }
  }

  public mounted() {
    this.init()
  }
}
</script>

<style lang="less" scoped>
.goods_car_wrap {
  min-height: 100vh;
  background: #ececec;
  .van-submit-bar {
    bottom: 100px;
  }
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
::v-deep .input_box input,::v-deep .input_box textarea {
  border: 1px solid gray;
}
.addres_box {
  width: 500px;
}
.addres_list {
  padding:30px;
}
.addres_list_item {
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