import { IRootState } from '@/store/types'
import {Module} from 'vuex'
import { ISystemState } from './types'
import { getPageListData,deletePageData,createPageData,editPageData } from '@/service/main/system/system'



//Module必须传入两个类型，第一个是模块state的返回值类型，第二个是根state的类型
const systemModule:Module<ISystemState,IRootState>={
  namespaced:true,
    state(){
        return {
            usersList:[],
            usersCount:0,
            roleList:[],
            roleCount:0,
            goodsList:[],
            goodsCount:0,
            menuList:[],
            menuCount:0
        }
    },
    mutations:{
      changeUsersList(state,userList:any[]){
        state.usersList=userList
      },
      changeUsersCount(state,userCount:number){
        state.usersCount=userCount
      },
      changeRoleList(state,roleList:any[]){
        state.roleList=roleList
      },
      changeRoleCount(state,roleCount:number){
        state.roleCount=roleCount
      },
      changeGoodsList(state,goodsList:any[]){

        //原本的写法
        // state.goodsList=goodsList
        
        const newArr = goodsList.slice(1);
        state.goodsList=newArr
      },
      changeGoodsCount(state,goodsCount:number){
        state.goodsCount=goodsCount

      },
      changeMenuList(state,menuList:any[]){
        state.menuList=menuList
      },
      changeMenuCount(state,menuCount:number){
        state.menuCount=menuCount
      }

    },
    getters:{ //getters可以返回一个函数
      pageListData(state){
        return (pageName:string)=>{
          return state[`${pageName}List`]  //也可以用switch
        }
      },
      pageListCount(state){
        return (pageName:string)=>{
          return state[`${pageName}Count`]  //也可以用switch
        }
      }

    },
    actions:{
      async getPageListAction(context,payload:any){
        //1.获取pageUrl
        const pageName=payload.pageName
        const pageUrl=`/${pageName}/list`
        // switch(pageName){
        //   case 'users':
        //     pageUrl='/users/list'
        //     break
        //   case 'role':
        //     pageUrl='/role/list'
        //     break
        // }
        //2.发送请求，获取数据
        const pageResult=await getPageListData(pageUrl,payload.queryInfo)


        //3.将数据存储到store中

        const {list,totalCount}=pageResult.data

        // switch(pageName){
        //   case 'user':
        //   commit(`changeUserList`,list)
        //   commit(`changeUserCount`,totalCount)
        //   break
        //   case 'role':
        //   commit(`changeRoleList`,list)
        //   commit(`changeRoleCount`,totalCount)
        //   break
        // }

        const changeName=pageName.slice(0,1).toUpperCase()+pageName.slice(1)
        context.commit(`change${changeName}List`,list)
        context.commit(`change${changeName}Count`,totalCount)
      },

      async deletePageData({dispatch},payload:any){
        //1.获取pageName和id
        //pageName -> /users
        //id -> /users/id
        const {pageName,id} = payload
        const pageUrl=`/${pageName}/${id}`

        //2.调用删除网络请求
        await deletePageData(pageUrl)

        //3.重新请求最新的数据
        dispatch('getPageListAction',{
          pageName,
          queryInfo:{
            offset:0,
            size:10
          }
        })

      },
      async createPageDataAction({dispatch},payload:any){
        //1.创建数据的请求
        const {pageName,newData}=payload
        const pageUrl=`/${pageName}`
        await createPageData(pageUrl,newData)

        //2.请求最新的数据
        dispatch('getPageListAction',{
          pageName,
          queryInfo:{
            offset:0,
            size:10
          }
        })
      },
      async editPageDataAction({dispatch},payload:any){
        //1.编辑数据的请求
        const {pageName,editData,id}=payload
        const pageUrl=`/${pageName}/${id}`
        await editPageData(pageUrl,editData)

        //2.请求最新的数据
        dispatch('getPageListAction',{
          pageName,
          queryInfo:{
            offset:0,
            size:10
          }
        })
      }


    }
}

export default systemModule