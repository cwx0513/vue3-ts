<template>
  <div class="nav-header">
      <el-icon class="fold-menu" @click="handleFoldClick">
        <component :is="isFold?'fold':'Expand'"/>
      </el-icon>
      <div class="content">
        <cwx-breadcrumb :breadcrumbs="breadcrumbs"></cwx-breadcrumb>
        <user-info></user-info>
      </div>
  </div>
</template>

<script lang='ts'>
import { computed, defineComponent,ref } from 'vue'
import UserInfo from './user-info.vue'
import CwxBreadcrumb from '@/base-ui/breadcrumb';
import { pathMatchBreadcrumbs } from '@/utils/map-menus';
import { useStore } from '@/store';
import { useRoute } from 'vue-router';
export default defineComponent({
    name: '',
    components:{
      UserInfo,
      CwxBreadcrumb
    },
    emits:['foldChange'],
    setup(props,{emit}) {

        const isFold=ref(false)
        const handleFoldClick=()=>{
          isFold.value=!isFold.value
          emit('foldChange',isFold.value)
        }

        //面包屑的数据
        //计算属性，依赖某变量，随着变量的改变而改变
        const breadcrumbs=computed(()=>{
          const store=useStore()
          const userMenus=store.state.login.userMenus
          const route=useRoute()
          const currentPath=route.path
          return pathMatchBreadcrumbs(userMenus,currentPath)
        })




         return {
           isFold,
           breadcrumbs,
           handleFoldClick
         }
      }
  });
</script>
<style scoped lang="less">
.nav-header{
  display: flex;
  width: 100%;
  .fold-menu{
    font-size: 30px;
    cursor: pointer;
  }
  .content{
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>