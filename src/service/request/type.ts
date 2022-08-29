import type {AxiosRequestConfig,AxiosResponse } from 'axios'



export  interface CwxRequestInterceptors<T = AxiosResponse>{
  requestInterceptor?:(config:any)=>any
  requestInterceptorCatch?:(error: any)=> any
  responseInterceptor?:(res:T)=>T
  responseInterceptorCatch?:(error: any)=> any
}

export interface CwxRequestConfig<T=AxiosResponse> extends AxiosRequestConfig{
  Interceptors?:CwxRequestInterceptors<T>
  showLoading?:boolean
}
