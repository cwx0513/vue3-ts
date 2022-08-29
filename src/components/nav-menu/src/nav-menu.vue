<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.svg" alt="logo"/>
      <span v-if="!collapse" class="title">通用权限管理系统</span>
    </div>
    <el-menu
     :default-active="defaultValue"
     class="el-menu-vertical"
     :collapse="collapse"
     background-color="rgb(227,239,237)"
     text-color="black"
     active-text-color="#0a60bd">
      <template v-for="item in userMenu" :key="item.id">
        <!-- 二级菜单 -->
        <template v-if="item.type===1">
          <!-- 二级菜单可以展开的标题 -->
          <el-sub-menu :index="item.id+''">
            <template #title>
              <el-icon color="#FF4E37"><component :is='substr(item.icon)'/> </el-icon>
              <span>{{item.name}}</span>
            </template>
            <!-- 遍历里面的item -->
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item :index="subitem.id+''" @click="handleMenuItemClick(subitem)">
              <el-icon v-if="subitem.icon" color="#FF4E37"><component :is='substr(subitem.icon)'/> </el-icon>
              <span>{{subitem.name}}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- 一级菜单 -->
        <template v-else-if="item.type===2">
          <el-menu-item :index="item.id+''">
            <el-icon v-if="item.icon" color="#FF4E37"><component :is='substr(item.icon)'/></el-icon>
            <span>{{item.name}}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang='ts'>
import { computed, defineComponent,ref } from 'vue'
// useRoute可以拿到当前路由对象
import { useRouter,useRoute } from 'vue-router';
import { useStore} from '@/store';
import {pathMatchMenus} from '@/utils/map-menus'
export default defineComponent({
    name: '',
    props:{
      collapse:{
        type:Boolean,
        default:false
      }
    },
    setup() {
        const store=useStore()
        const userMenu=computed(()=>store.state.login.userMenus)

        const router=useRouter()
        const route=useRoute()
        const currentPath=route.path

        const menu=pathMatchMenus(userMenu.value,currentPath)
        const defaultValue=ref(menu.id+'')



        //事件处理
        const handleMenuItemClick=(item:any)=>{
          router.push({
            path:item.url??'/not-found'
          })

        }


        const substr=(icon:any):string=>{
          return icon.substr(8) //字符切割
        }

         return {
           userMenu,
           defaultValue,
           substr,
           handleMenuItemClick
         }
      },
  });
</script>
<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: rgb(159,214,169);

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    border-right: none;
  }

  // 目录
  .el-sub-menu {
    // background-color: #001529 !important;
    background-color: rgb(227,239,237);
    // 二级菜单 ( 默认背景 )
  }
    .el-menu-item {
      padding-left: 50px !important;
      // background-color: #0c2135 !important;
       background-color: rgb(227,239,237);
  }

  ::v-deep .el-sub-menu__title {
    // background-color: #001529 !important;
     background-color: rgb(227,239,237);
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>