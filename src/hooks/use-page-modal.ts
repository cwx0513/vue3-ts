import PageModal from "@/components/page-modal"
import { ref } from "vue"



type CallbackFn=(item?:any)=>void

export function usePageModal(newCb?:CallbackFn,editCb?:CallbackFn){
  const PageModalRef=ref<InstanceType<typeof PageModal>>()
  const defaultInfo=ref({})
  const handleNewData=():void=>{
    defaultInfo.value={}
    if(PageModalRef.value){
      PageModalRef.value.dialogVisible=true
    }
    newCb && newCb()//&&表示当newCb有值的时候才去调用newCb()

  }
  const handleEditData=(item:any):void=>{
    defaultInfo.value=item
    if(PageModalRef.value){
      PageModalRef.value.dialogVisible=true
    }
    editCb && editCb(item)
  }


  return [PageModalRef,defaultInfo,handleNewData,handleEditData]
}