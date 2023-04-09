<template>
  <div>
    <div style="width: 200px;padding: 18px;" :class="{red: isRed, big: isBig}">{{ num }}</div>
  </div>
  <div v-for="(item, index) in list" :key="index">
    {{ item.goodsName }}--{{ item.goodsPrice }}--{{ item.goodsDes }}
  </div>
  <div>
    {{ historyParams }}
  </div>
</template>

<script lang="ts">
import { useRoute } from 'vue-router'
interface IGoods{
  goodsName: string,
  goodsPrice: number,
  goodsDes?: string
}
import { Options, Vue } from "vue-class-component"
@Options({
  components: {}
})
export default class AboutView extends Vue{
  isRed:boolean = true
  isBig:boolean = true
  num:number = 100

  historyParams:any = history.state.params

  route = useRoute()

  public created () {
    console.log(this)
    console.log(this.route.params.name)
    console.log(this.route.params.id)
    console.log(this.route.query.id)
    console.log(this.route.query.name)

    // HistoryAPI方式传递和接收  state参数
    console.log('history.state', history.state)
  }
  
  list:IGoods[] = [
    {
      goodsName: '商品名称1',
      goodsPrice: 100,
      goodsDes: '商品详情'
    },
    {
      goodsName: '商品名称2',
      goodsPrice: 100,
      goodsDes: '商品详情2'
    },
    {
      goodsName: '商品名称3',
      goodsPrice: 100,
      goodsDes: '商品详情3'
    }
  ]
}
</script>

<style lang="less" scoped>
.red {
  color: #ff0;
}
.big {
  background-color: #f00;
}
</style>
