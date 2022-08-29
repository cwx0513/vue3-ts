import CwxRequest from "../../index";
import { IDataType } from "@/service/types";


export function getPageListData(url:string,queryInfo:any){
  return CwxRequest.post<IDataType>({
    url:url,
    data:queryInfo
  })
}

//url:'/users/id'
export function deletePageData(url:string){
  return CwxRequest.delete<IDataType>({
    url:url
  })
}

export function createPageData(url:string,newData:any){
  return CwxRequest.post<IDataType>({
    url:url,
    data:newData
  })
}


export function editPageData(url:string,editData:any){
  return CwxRequest.patch<IDataType>({
    url:url,
    data:editData
  })
}