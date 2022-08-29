import {App} from 'vue'
import * as ElIconModules from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import {
  ElButton,ElForm,ElFormItem,
  ElRadio,ElAlert,ElAside,
  ElTabPane, ElTabs, ElIcon,
  ElCheckbox, ElLink, ElContainer,
  ElHeader, ElMain, ElMenu,
  ElMenuItem, ElMenuItemGroup, ElSubMenu,
  ElDropdown,ElDropdownMenu,ElDropdownItem,
  ElAvatar,ElRow,ElCol,
  ElSelect,ElOption,ElDatePicker,
  ElBreadcrumb,ElBreadcrumbItem,ElInput,
  ElTable,ElTableColumn, ElPagination,
  ElImage,ElDialog, ElTree, ElCard,
  ElPopconfirm,ElCarousel,ElCarouselItem
  } from 'element-plus'


const components=[
  ElButton,ElForm,ElFormItem,
  ElInput,ElRadio,ElAlert,
  ElAside,ElTabs,ElTabPane,
  ElIcon,ElCheckbox,ElLink,
  ElContainer,ElHeader,ElMain,
  ElMenu,ElMenuItem,ElMenuItemGroup,
  ElSubMenu,ElDropdown,ElDropdownMenu,
  ElDropdownItem,ElAvatar,ElRow,
  ElCol,ElSelect,ElOption,
  ElDatePicker,ElBreadcrumb,ElBreadcrumbItem,
  ElTable,ElTableColumn,ElPagination,
  ElImage,ElDialog,ElTree,
  ElCard,ElPopconfirm,ElCarousel,
  ElCarouselItem
]


//按需导入element-plus中的组件
export function registerElement (app:App) :void{
  for(const component of components){
    app.component(component.name,component) //全局注册组件
  }
}

//全局导入icon图标
export function registerIcon(app:App){
  for (const iconName in ElIconModules) {
    if (Reflect.has(ElIconModules, iconName)) {
      const item = ElIconModules[iconName]
      app.component(iconName, item)
    }
  }
}



