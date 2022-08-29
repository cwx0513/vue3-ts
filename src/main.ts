import { createApp } from 'vue'
import { registerApp } from './global'
import 'normalize.css'
import './assets/css/index.less'
import { setupStore } from './store';
// import ElementPlus from "element-plus"全局引入

import App from './App.vue'
import router from './router'
import store from './store'

const app=createApp(App) //app的类型是App
app.use(registerApp) //app.use(function(app))当传入一个函数是会默认传入app参数
app.use(store)
setupStore()
app.use(router)
app.mount('#app')





