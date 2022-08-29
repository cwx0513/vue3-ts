//axios拦截器

// import axios from "axios";


//fn1:请求发送成功会执行的函数
//fn2:请求发送失败会执行的函数
// axios.interceptors.request.use(
//   (config)=>{
  //1.给请求添加token
  //2.启用loading动画
//   console.log("请求成功的拦截")
//   return config
//   },
//   (err)=>{
//     console.log("请求失败的拦截")
//     return err
//   }
// )


//fn1:数据响应成功会执行的函数
//fn2:数据响应失败会执行的函数
// axios.interceptors.response.use(
//   (res)=>{
//   console.log("数据响应成功")
//   return res.data
//   },
//   (err)=>{
//     console.log("服务器响应数据失败")
//     return err
//   }
// )