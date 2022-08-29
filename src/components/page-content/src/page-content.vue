<template>
  <div class="page-content">
    <cwx-table
      v-bind="contentTableConfig"
      :listData="dataList"
      :listCount="dataCount"
      v-model:page="pageInfo">
        <!-- handler中的插槽 -->
        <template #headerHandler>
          <el-button
          v-if="isCreate"
          type="primary"
          size="medium"
          @click="handleNewClick"
          >新建{{contentTableConfig.title}}</el-button>
          <el-button icon="refresh"></el-button>
        </template>

        <!-- 列中的插槽 -->
        <template #status="scope">
          <el-button
          :plain="true" size="small"
          :type="scope.row.enable||scope.row.status?'success':'danger'"
          >{{scope.row.enable||scope.row.status?'启用':'禁用'}}</el-button>
        </template>
        <template #createAt="scope">
          <strong>{{ formatUtcString(scope.row.createAt)}}</strong>
        </template>
        <template #updateAt="scope">
          <strong>{{ formatUtcString(scope.row.updateAt)}}</strong>
        </template>
        <template #handler="scope">
          <div class="handle-btns">
            <el-button
            v-if="isUpdate"
            size="small"
            type="primary"
            icon="Edit"
            @click="handleEditClick(scope.row)">编辑</el-button>
            <el-popconfirm
            confirm-button-text="Yes"
            cancel-button-text="No"
            icon="Warning"
            icon-color="red"
            title="确定删除吗?"
            cancelButtonType="primary"
            confirmButtonType="success"
            @confirm="confirmEvent(scope.row)"
            @cancel="cancelEvent"
            >
              <template #reference>
                <el-button v-if="isDelete" size="small" type="danger" icon="Delete">删除</el-button>
              </template>
          </el-popconfirm>
          </div>
        </template>

        <!-- 其他插槽,在pagecontent动态插入剩余的插槽 -->
        <template v-for="item in otherPropSlots" :key="item.prop" #[item.slotName]="scope">
          <template v-if="item.slotName">
            <!-- :row="scope.row"是把scope.row这个对象传到上一层，上一层可通过scope.row调用这个对象 -->
            <slot :name="item.slotName" :row="scope.row"></slot>
          </template>
        </template>
      </cwx-table>
  </div>
</template>

<script lang='ts'>
import { computed, defineComponent, ref, watch } from 'vue'
import { useStore } from '@/store';
import CwxTable from '@/base-ui/table';
import { formatUtcString } from '@/utils/data-format';
import { usePermission } from '@/hooks/use-permission';
import { ElMessage } from 'element-plus';
export default defineComponent({
    name: '',
    props:{
      contentTableConfig:{
        type:Object,
        required:true
    },
      pageName:{
        type:String,
        required:true
    }
    },
    components:{
      CwxTable
    },

    emits:['newBtnClick','editBtnClick'],
    setup(props,{emit}) {
    const store=useStore()

    //0.获取操作的权限
    const isCreate=usePermission(props.pageName,'create')
    const isUpdate=usePermission(props.pageName,'update')
    const isDelete=usePermission(props.pageName,'delete')
    const isQuery=usePermission(props.pageName,'query')




    //1.双向绑定
    const pageInfo=ref({currentPage:1,pageSize:10})
    watch(pageInfo,()=>{
      getPageData()
      })

    //2.发送网络请求
    const getPageData=(queryInfo:any={})=>{
      if(!isQuery) return
      store.dispatch('system/getPageListAction',{
      pageName:props.pageName,
      queryInfo:{
        offset:(pageInfo.value.currentPage-1)*pageInfo.value.pageSize,
        size:pageInfo.value.pageSize,
        ...queryInfo
      }
    })
    }

    getPageData()

    //3.从vuex中获取数据
    const dataList=computed(()=>store.getters['system/pageListData'](props.pageName))

    const dataCount=computed(()=>store.getters['system/pageListCount'](props.pageName))


    //4.获取其他动态插槽名称
    const otherPropSlots=props.contentTableConfig.propList.filter((item:any)=>{
      if(item.slotName==='status') return false
      if(item.slotName==='createAt') return false
      if(item.slotName==='updateAt') return false
      if(item.slotName==='handler') return false
      return true
    })


    //5.删除/编辑/新增操作
    const handleDeleteClick=(item:any)=>{
      store.dispatch('system/deletePageData',{
        pageName:props.pageName,
        id:item.id
      })



      setTimeout(()=>{
        ElMessage({
        showClose: true,
        message: '删除成功',
        type: 'success',
        duration:2000
      })
      },1000)
    }

    const handleNewClick=()=>{
      console.log("new")
      emit('newBtnClick')
    }

    const handleEditClick=(item:any)=>{
      console.log("edit")
      emit('editBtnClick',item)
    }

    const confirmEvent=(item:any)=>{
      handleDeleteClick(item)
    }
    const cancelEvent=()=>{
      return;
    }




         return {
           dataList,
           dataCount,
           pageInfo,
           otherPropSlots,
           isCreate,
           isDelete,
           isUpdate,
           formatUtcString,
           getPageData,
           handleDeleteClick,
           handleNewClick,
           handleEditClick,
           confirmEvent,
           cancelEvent
         }
      }
  });
</script>
<style scoped lang="less">
.page-content{
  padding: 20px;
  border-top:20px solid #f5f5f5
}
</style>