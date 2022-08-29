import CwxRequest from "../index";

import { IAccount,ILoginResult } from "./type";
import { IDataType } from "../types";

enum LoginAPI{    //enum代表枚举类型
  AccountLogin='/login',
  LoginUserInfo='/users/',  //  /users/1
  UserMenus='/role/'        // 用法  role/1/menu
}

export function accountLoginRequest(account:IAccount){
  return CwxRequest.post<IDataType<ILoginResult>>({
    url:LoginAPI.AccountLogin,
    data:account
  })

}

export function requestUserInfoById(id:number){
  return CwxRequest.get<IDataType>({
    url:LoginAPI.LoginUserInfo+id
  })
}

export function requestUserMenusByRoleId(id:number){
  return CwxRequest.get<IDataType>({
    url:LoginAPI.UserMenus+id+'/menu'
  })
}