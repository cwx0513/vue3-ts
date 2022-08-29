<template>
  <div class="login-panel">
    <h1 class="title">权限管理系统</h1>
    <el-tabs type="border-card" class="demo-tabs" stretch v-model="currentTab">
    <el-tab-pane name="account">
      <template #label>
        <span class="custom-tabs-label">
          <el-icon><avatar/></el-icon>
          <span>账号登录</span>
        </span>
      </template>
      <login-account ref="accountRef"></login-account>
    </el-tab-pane>
    <el-tab-pane name="phone">
      <template #label>
        <span class="custom-tabs-label">
          <el-icon><iphone /></el-icon>
          <span>手机登录</span>
        </span>
      </template>
      <login-phone ref="phoneRef"></login-phone>
    </el-tab-pane>
  </el-tabs>
  <div class="account-control">
    <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
    <el-link type="primary">忘记密码</el-link>
  </div>
  <el-button class="login-btn" type="primary" @click="handleLoginClick()">立即登录</el-button>
  </div>
</template>

<script lang='ts'>
import { defineComponent,ref } from 'vue'
import LoginPhone from './login-phone.vue'
import LoginAccount from './login-account.vue'
export default defineComponent({
    name: '',
    components:{
      LoginPhone,
      LoginAccount
    },
      setup() {
        const isKeepPassword=ref(true)
        const currentTab=ref<string>("account")

        //把组件作为类型传给变量，然后父组件调用子组件的函数，方法或者变量
        const accountRef=ref<InstanceType<typeof LoginAccount>>()
        const phoneRef=ref<InstanceType<typeof LoginPhone>>()

        const handleLoginClick=()=>{

          if(currentTab.value==='account'){
            console.log("账号登录")
            accountRef.value?.loginAction(isKeepPassword.value)
          }else{
            console.log("手机号登录")

          }
        }

         return {
           isKeepPassword,
           accountRef,
           phoneRef,
           currentTab,
           handleLoginClick,
         }
      }
  });
</script>
<style scoped lang="less">
.login-panel{
  margin-bottom: 150px;
  width: 320px;
  // background-color:rgba(225,225,225,0.8);
}
.title{
  text-align: center;
}
.account-control{
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
.login-btn{
  width:100%;
  margin-top: 10px;
}
</style>