<template>
  <div class="role">
    <page-search :searchFormConfig="searchFormConfig"></page-search>
    <page-content
    :contentTableConfig="contentTableConfig"
    pageName="role"
    @newBtnClick="(handleNewData as any)"
    @editBtnClick="(handleEditData as any)"
    ></page-content>
    <page-modal
    ref="PageModalRef"
    :defaultInfo="defaultInfo"
    :otherInfo="otherInfo"
    :modalConfig="modalConfig"
    pageName="role">
      <div class="menu-tree">
        <el-tree
        ref="elTreeRef"
        :data="menus"
        show-checkbox
        node-key="id"
        :props="{children:'children',label:'name'}"
        @check="handleCheckChange"
        />
      </div>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent,ref,nextTick } from 'vue'
import { ElTree } from 'element-plus'
import {useStore} from '@/store'

import PageContent from '@/components/page-content'
import PageSearch from '@/components/page-search'
import PageModal from '@/components/page-modal'

import { contentTableConfig } from './config/content.config'
import { searchFormConfig } from './config/search.config'
import { modalConfig } from './config/modal.config'

import { usePageModal } from '@/hooks/use-page-modal'

import {menuMapLeafKeys} from '@/utils/map-menus'

export default defineComponent({
  name: 'role',
  components:{
    PageContent,
    PageSearch,
    PageModal
  },
  setup() {
    //1.处理pageModal的hook
    const elTreeRef=ref<InstanceType<typeof ElTree>>()
    const editCallback=(item:any)=>{
      const leafKeys=menuMapLeafKeys(item.menuList)
      nextTick(()=>{
        elTreeRef.value?.setCheckedKeys(leafKeys,false)
      })
    }
    const [PageModalRef,defaultInfo,handleNewData,handleEditData]=usePageModal(undefined,editCallback)
    const store=useStore()
    const menus=computed(()=>store.state.entireMenu)
    const otherInfo=ref({})
    const handleCheckChange=(data1:any,data2:any)=>{
      const checkedKeys=data2.checkedKeys
      const halfCheckedKeys=data2.halfCheckedKeys
      const menuList=[...checkedKeys,...halfCheckedKeys]
      otherInfo.value={menuList}

    }
    return {
      contentTableConfig,
      searchFormConfig,
      modalConfig,
      PageModalRef,
      defaultInfo,
      handleNewData,
      handleEditData,
      menus,
      otherInfo,
      elTreeRef,
      handleCheckChange
    }
  }
})
</script>

<style scoped lang="less">
.menu-tree{
  margin-left:25px
}
</style>
