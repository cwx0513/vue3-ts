<template>
  <div class="user">
    <page-search
    :searchFormConfig="searchFormConfig"
    @resetBtnClick="(handleResetClick as any)"
    @queryBtnClick="(handleQueryClick as any)"
    ></page-search>
    <page-content
    ref="pageContentRef"
    :contentTableConfig="contentTableConfig"
    pageName="users"
    @newBtnClick="(handleNewData as any)"
    @editBtnClick="(handleEditData as any)"
    ></page-content>
    <page-modal
    ref="PageModalRef"
    :modalConfig="modalConfigRef"
    :defaultInfo="defaultInfo"
    pageName="users"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import {  computed, defineComponent} from 'vue'

import PageSearch from '@/components/page-search/index'
import PageContent from '@/components/page-content/index'
import PageModal from '@/components/page-modal/index'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'


import { usePageSearch } from '@/hooks/use-page-search'
import {usePageModal} from '@/hooks/use-page-modal'

import { useStore } from '@/store'



export default defineComponent({
  name: 'user',
  components:{
    PageSearch,
    PageContent,
    PageModal
},
  setup() {

    const [pageContentRef,handleResetClick,handleQueryClick]=usePageSearch()


    //pageModal相关的hook逻辑
    const newCallback=()=>{
      const passwordItem=modalConfig.formItems.find((item)=>item.field==="password")
      passwordItem!.isHidden=false
    }
    const editCallback=()=>{
      const passwordItem=modalConfig.formItems.find((item)=>item.field==="password")
      passwordItem!.isHidden=true
    }

    //2.动态添加部门和角色列表
    const store=useStore()
    const modalConfigRef=computed(()=>{
          const departmentItem=modalConfig.formItems.find(item=>item.field==='departmentId')
          departmentItem!.options=store.state.entireDepartment.map(item=>{
          return {label:item.name,value:item.id}
        })

          const roleItem=modalConfig.formItems.find(item=>item.field==='roleId')
          roleItem!.options=store.state.entireRole.map(item=>{
          return {label:item.name,value:item.id}
        })
        return modalConfig
    })


    //3.调用hook获取公共变量和函数




    const [PageModalRef,defaultInfo,handleNewData,handleEditData]=usePageModal(newCallback,editCallback)

    return {
      searchFormConfig,
      contentTableConfig,
      pageContentRef,
      handleResetClick,
      handleQueryClick,
      modalConfigRef,
      PageModalRef,
      defaultInfo,
      handleNewData,
      handleEditData
    }
  }
})
</script>

<style scoped lang="less">


</style>
