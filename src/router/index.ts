import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// 获取proxy对象中属性值方法  https://blog.csdn.net/weixin_51327185/article/details/129732379
import { toRaw } from '@vue/reactivity'
// toRaw是一张方法  还有一种是通过json序列化之后可获取值JSON.parse(JSON.stringify(xxxx))
import store from "../store/index"

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/views/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  // 商品详情
  {
    path: '/goodsDec',
    name: 'goodsDec',
    component: () => import('@/views/goodsDec.vue')
  },
  // 商品列表
  {
    path: '/goodsList',
    name: 'goodsList',
    component: () => import('@/views/goodsList.vue')
  },
  // 购物车页面
  {
    path: '/goodsCar',
    name: 'goodsCar',
    component: () => import('@/views/goodsCar.vue')
  },
  // 订单列表
  {
    path: '/orderList',
    name: 'orderList',
    component: () => import('@/views/orderList.vue')
  },
  // 我的
  {
    path: '/my',
    name: 'my',
    component: () => import('@/views/my.vue')
  },
  // 地址管理
  {
    path:"/addressList",
    name:"addressList",
    component:()=>import("../views/addressList.vue")
  }, 
  //下面两个页面非本项目
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  }
]

// 声明路由对象
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 路由守卫
// 只要进入到某个路由就会执行此方法
router.beforeEach((to, from, next) => {
  // from 从哪个路由跳转的
  // to 到达的路由
  // 只有执行了next页面才会被渲染
  // 判断用户是否登录
  /**
   * 如果用户没有登录则进行跳转到登录页的操作，否则正常跳转
  */
 console.log('store---', store.state)
 // 通过ID判断用户是否已登录
 console.log(1111, toRaw(store.state))
//  const userInfo = toRaw(store.state)
 const { uInfo } = JSON.parse(JSON.stringify(store.state))
 console.log(uInfo)
 // toRaw是一张方法  还有一种是通过json序列化之后可获取值JSON.parse(JSON.stringify(xxxx))
 if (uInfo && uInfo.id || to.path == '/login') {
  // 用户已登录
  next()
 } else {
  // 未登录
  if (to.path == '/login') {
    return
  }
  next('/login')
 }
})

export default router
