import CwxRequest from "./request";
import {BASE_URL,TIME_OUT} from './request/config'
import localCache from '@/utils/cache'



const cwx1=new CwxRequest({  //构造实例
  baseURL:BASE_URL,
  timeout:TIME_OUT,
  Interceptors:{
    requestInterceptor:(config)=>{
      //携带token的拦截
      const token=localCache.getCache("token")
      if(token){
        config.headers.Authorization=`Bearer ${token}`
      }

      console.log("请求成功的拦截")
      return config
    },
    requestInterceptorCatch:(error)=>{
      console.log("请求失败的拦截")
      return error
    },
    responseInterceptor:(res)=>{
      console.log("响应成功的拦截")
      return res
    },
    responseInterceptorCatch:(error)=>{
      console.log("响应失败的拦截")
      return error
    }
  },
  showLoading:true
})


export default cwx1