

/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare let $store:any //声明$store为any类型
declare let filters:any
declare module '*.json'  //导入json文件需要在此文件声明
declare let $formatTime:any
