<template>
  <div class="page-search">
  <cwx-form v-bind="searchFormConfig" v-model="formData">
        <template #header>
          <h1 class="header">高级检索</h1>
        </template>
        <template #footer>
          <div class="handle-btns">
            <el-button type="default" icon="Refresh" @click="handleResetClick">重置</el-button>
            <el-button type="success" icon="Search" @click="handleQueryClick">搜索</el-button>
          </div>
        </template>
    </cwx-form>
  </div>
</template>

<script lang='ts'>
import { defineComponent,ref } from 'vue'
import CwxForm from '@/base-ui/form'
export default defineComponent({
    name: '',
    components:{
      CwxForm

    },
    props:{
      searchFormConfig:{
        type:Object,
        required:true
      }

    },

    emits:['resetBtnClick','queryBtnClick'],
      setup(props,{emit}) {
      //双向绑定的属性应该是由配置文件的field来决定的
      //优化1.formData对象应该动态决定
      const formItems=props.searchFormConfig.formItems??[]
      const formOriginData:any={}
      for(const item of formItems){
        formOriginData[item.field]=''
      }
      const formData=ref(formOriginData)


      //优化2.重置时恢复默认值
      const handleResetClick=()=>{
        formData.value=formOriginData
        emit('resetBtnClick')
      }




      //优化3.当用户点击搜索
      const handleQueryClick=()=>{
        emit('queryBtnClick',formData.value)
      }


         return {
           formData,
           handleResetClick,
           handleQueryClick
         }
      }
  });
</script>
<style scoped lang="less">
.header{
  color:red
}
.handle-btns{
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>