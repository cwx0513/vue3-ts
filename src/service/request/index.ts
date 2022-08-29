import axios from "axios"
import type { AxiosInstance } from 'axios'
import {CwxRequestConfig,CwxRequestInterceptors} from './type'

import { ElLoading } from 'element-plus'

import { LoadingInstance } from "element-plus/es/components/loading/src/loading"

// import localCache from '@/utils/cache'


const DEFAULT_LOADING=true

class CwxRequest{

  instance:AxiosInstance
  interceptors?:CwxRequestInterceptors
  loading?:LoadingInstance
  showLoading:boolean

  constructor(config:CwxRequestConfig){
    //创建axios实例
    this.instance=axios.create(config)

    //保存基本信息
    this.showLoading=config.showLoading??DEFAULT_LOADING
    this.interceptors=config.Interceptors

    //使用拦截器
    //1.从config中取出的拦截器是对应的实例的拦截器
    // 单个实例有的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    //2.添加所有实例都有的拦截器
    this.instance.interceptors.request.use(
      (config)=>{


      //携带token的拦截
      // const token=localCache.getCache("token")
      // if(token){
      //   config.headers.Authorization=`Bearer ${token}`
      // }



        console.log("所有的实例都有的拦截器:请求成功")
        if(this.showLoading){
          this.loading=ElLoading.service({
            lock:true,
            text:"正在请求数据....",
            background:'rbga(0,0,0,0.5)'
          })

        }

        return config
      },
      (err)=>{
        console.log("所有的实例都有的拦截器:请求失败")
        return err
      }
      )

      this.instance.interceptors.response.use(
        (res)=>{
          console.log("所有的实例都有的拦截器:响应成功")
          const data=res.data

          //将loading移除
            this.loading?.close()



          if(data.returnCode==='-1001'){
            console.log("错误信息")
          }else{
            return data
          }

        },
        (err)=>{
          console.log("所有的实例都有的拦截器:响应失败")
          //讲loading移除
          this.loading?.close()

          //例子：判断不同的httpErrorCode显示不同的错误信息
          if(err.response.status===404){
            console.log("404错误")
          }

          return err
        }
        )
  }


  request<T=any>(config:CwxRequestConfig<T>):Promise<T>{
    return new Promise((resolve,reject)=>{
    //单个请求对config的处理
    //单个请求带上请求拦截器
    if(config.Interceptors?.requestInterceptor){
      config=config.Interceptors.requestInterceptor(config)
    }

    //判断是否要显示loading
    if(config.showLoading===false){
      this.showLoading=config.showLoading
    }

    //单个请求对数据的处理
    //单个请求带上响应拦截器
    this.instance.request<any,T>(config).then(res=>{ //这里的request可要可不要，因为axios()和axios.request()是一样的作用
      if(config.Interceptors?.responseInterceptor){
        res=config.Interceptors.responseInterceptor(res)
      }


      //将showLoading设置为true,这样不会影响到下一个请求
      this.showLoading=DEFAULT_LOADING

      //将结果resolve出去
      resolve(res)

    }).catch((err)=>{
      this.showLoading=DEFAULT_LOADING
      reject(err)
    })

    })

  }

  get<T=any>(config:CwxRequestConfig<T>):Promise<T>{
    return this.request<T>({...config,method:'GET'})
  }

  post<T=any>(config:CwxRequestConfig<T>):Promise<T>{
    return this.request<T>({...config,method:'POST'})
  }

  delete<T=any>(config:CwxRequestConfig<T>):Promise<T>{
    return this.request<T>({...config,method:'DELETE'})
  }

  patch<T=any>(config:CwxRequestConfig<T>):Promise<T>{
    return this.request<T>({...config,method:'PATCH'})
  }

}

export default CwxRequest