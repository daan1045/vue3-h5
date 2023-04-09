import axios from "axios"
import { showLoadingToast, showToast, closeToast } from "vant"
// 创建请求实例 
interface typeData{
  code:number,
  message:string,
  data?:any
}
const Service = axios.create({
  timeout:8000,
  baseURL:"/api",
  headers:{
    "Content-type":"application/json;charset:utf-8"
  }
})
// 请求拦截
Service.interceptors.request.use((config):any=>{
  // 请求成功发送 
  // Toast.loading({
  //   type:"loading",
  //   message: '加载中'
  // });
  showLoadingToast({
    message: '加载中...',
    forbidClick: true
  });
  return config
},(error: any):any => {
  Promise.reject(error)
})
// 响应拦截
Service.interceptors.response.use((response:any):any =>{
  // Toast.clear();
  closeToast()
  const data:typeData =response.data
  if(data.code==200){
    return data
  }else{
    showToast(data.message || '响应出错');
    return data
  }
}, (error: any):any => {
  console.log(error)
  // Toast.clear();
  closeToast()
})
interface configType{
  url:string,
  data?:any,
  headers?:any
}
// 暴露请求方法
// post get put delete


export const post=(config:configType)=>{
  return Service({
    ...config,
    method:"post",
    data:config.data
  })
}
export const get=(config:configType)=>{
  return Service({
    ...config,
    method:"get",
    params:config.data
  })
}
 export const put=(config:configType)=>{
  return Service({
    ...config,
    method:"put",
    data:JSON.stringify(config.data)
  })
 }
// 例子:delete请求方式没有data参数传递 url?id=1&type=2
 export const del=(config:configType)=>{
  return Service({
    ...config,
    method:"delete", 
  })
}
 
