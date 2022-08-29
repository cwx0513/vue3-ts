import { useStore } from "@/store";


export function usePermission(pageName:string,handleName:string){
  const store=useStore()
  const permissions=store.state.login.permissions
  const verifyPermission=`system:${pageName}:${handleName}`
  //!!是把有值的变量编程布尔值true,例如:name="cwx"  !name=false  !!name=true
  return !!permissions.find((item)=>item===verifyPermission)

}