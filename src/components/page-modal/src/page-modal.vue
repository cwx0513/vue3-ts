<template>
  <div class="page-modal">
    <!-- destroy-on-close属性是dialog关闭时，让他销毁，不然其缓存 -->
      <el-dialog
      v-model="dialogVisible"
      :title="Object.keys(defaultInfo).length===0?`新建${modalConfig.title}`:`编辑${modalConfig.title}`"
      width="30%"
      center
      destroy-on-close>
        <cwx-form v-bind="modalConfig" v-model="formData"></cwx-form>
        <slot></slot>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="handleConfirmClick">确定</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
</template>

<script lang='ts'>
import { defineComponent, ref,watch } from 'vue'
import CwxForm from '@/base-ui/form';
import { useStore } from '@/store';
export default defineComponent({
    name: '',
    props:{
      modalConfig:{
        type:Object,
        required:true
      },
      defaultInfo:{
        type:Object,
        default:()=>({})
      },
      otherInfo:{
        type:Object,
        default:()=>({})
      },
      pageName:{
        type:String,
        required:true
      }

    },
    components:{
      CwxForm
    },
    setup(props) {
      const dialogVisible=ref(false)
      const formData=ref({})
      console.log("page-modal")
      watch(
        ()=>props.defaultInfo,
        (newValue)=>{
          for(const item of props.modalConfig.formItems){
            formData.value[`${item.field}`]=newValue[`${item.field}`]
          }

      })


      const store=useStore()
      const handleConfirmClick=()=>{
        dialogVisible.value=false
        if(Object.keys(props.defaultInfo).length){
          //编辑
          store.dispatch('system/editPageDataAction',{
            pageName:props.pageName,
            editData:{...formData.value,...props.otherInfo},
            id:props.defaultInfo.id
          })
        }else{
          //新建
          store.dispatch('system/createPageDataAction',{
            pageName:props.pageName,
            newData:{...formData.value,...props.otherInfo}
          })
        }

      }
         return {
           dialogVisible,
           formData,
           handleConfirmClick
         }
      }
  });
</script>
<style scoped>
</style>