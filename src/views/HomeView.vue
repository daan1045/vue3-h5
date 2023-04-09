<template>
  <div>
    <div id="tBox">{{ uname }}</div>
    <div>
      <router-link to="/about">跳转1</router-link><br>
      <router-link :to="{ name:'about', query: { name: 'abc' } }">跳转2</router-link><br>
      <router-link :to="{ name:'about', params: { idnex: 1 } }">跳转3</router-link><br>
      <router-link :to="{ path:'/about', query: { name: 'abcde' } }">跳转4</router-link><br>
      <van-button type="primary" @click="handleQuery">传参形式 query</van-button><br>
      <br>
      <van-button type="primary" @click="handleParams">传参形式 params(新vue-router已抛弃这个方法)</van-button>
      <br>
      <br>
      <van-button type="primary" @click="handleState">不能用params传参，用state代替</van-button>
    </div>
  </div>
</template>

<script lang="ts">
import { throwStatement } from '@babel/types'
import { Vue, Options } from 'vue-class-component'
import { useRoute, useRouter } from 'vue-router'
@Options({
  components: {
    // 组件声明
  }
})
export default class HomeView extends Vue{
  // 声明变量 不可使用关键字 var,let, const 并且必须有初始值
  // 使用的时候使用this
  uname:string = '小习'


  route = useRoute()
  router = useRouter()
  // 生命周期里面进行方法执行
  // 8个生命周期
  // 数据的初始化一般是在 created/mounted 中操作
  // 1. beforeCreate
  public beforeCreate(): void {
    console.log('beforeCreate', this.uname)
  }
  // 2. created
  public created(): void {
    console.log('created', this.uname)
  }
  // 3.beforeMount
  public beforeMount (): void {
    // 数据渲染前
    console.log('beforeMount', this.uname)
    console.log('beforeMount', document.querySelector('#tBox'))
  }
  // 4.mounted
  public mounted (): void {
    // 数据渲染后
    console.log('mounted', this.uname)
    console.log('mounted', document.querySelector('#tBox'))
    setTimeout(() => {
      this.uname = '小邓'
    }, 2000)
  }
  // update数据更新并且引发了dom更新，就会触发
  // 5.beforeUpdate
  public beforeUpdate(): void {
    console.log('beforeUpdate', this.uname)
  }
  // 6.update
  public updated(): void {
    console.log('updated', this.uname)
  }
  // destory 销毁
  public beforeUnmount(): void {
    // vue实例销毁前
    console.log('beforeUnmount')
  }
  public unmounted(): void {
    // vue实例销毁后
    console.log('unmounted')
  }

  // 方法声明
  handleQuery () {
    // this.$router.push({
    //   name: 'about',
    //   query: {
    //     id: 123456
    //   }
    // })
    this.router.push({
      path: '/about',
      query: {
        id: 123456
      }
    })
  }

  handleParams () {
    const id = 1234
    this.router.push({
      name: 'about',
      params: {
        id
      }
    })
  }
  // 从Vue Router的2022-8-22 这次更新后，我们使用上面的方式params传参在新页面无法获取：
  // 使用HistoryAPI方式传递和接收: 在跳转前的页面使用 state 参数：(不想所有传递参数都显示在路由地址用state)
  handleState () {
    const params = {
      id: 12,
      name: '小习',
      age: 20
    }
    this.router.push({
      name: 'about',
      state: { params }
    })
  }
}
</script>
<style lang="less" scoped>
</style>
