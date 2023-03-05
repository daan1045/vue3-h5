<template>
  <div>
    <div id="tBox">{{ uname }}</div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
@Options({
  components: {
    // 组件声明
  }
})
export default class HomeView extends Vue{
  // 声明变量 不可使用关键字 var,let, const 并且必须有初始值
  // 使用的时候使用this
  uname:string = '小习'
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
}
</script>
<style lang="less" scoped>
</style>
