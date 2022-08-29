<template>
  <div class="cwx-table">
    <div class="header">
      <slot name="header">
        <div class="title">{{title}}列表</div>
        <div class="handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <el-table
    :data="listData"
    border
    style="width: 100%"
    @selection-change="handleSelectionChange"
    v-bind="childrenProps"
    >
      <el-table-column v-if="showSelectColumn" type="selection" align="center" width="60">
      </el-table-column>
      <el-table-column v-if="showIndexColumn" type="index" label="序号" align="center" width="60">
      </el-table-column>
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center" show-overflow-tooltip #default="scope">
          <!-- <template #default="scope"> 默认default插槽可以放在组件上面 -->
            <slot :name="propItem.slotName" :row="scope.row">
              {{scope.row[propItem.prop]}}
            </slot>
          <!-- </template> -->
        </el-table-column>
      </template>
    </el-table>
    <div class="footer" v-if="showFooter">
      <slot name="footer">
      <el-pagination
      v-model:currentPage="page.currentPage"
      v-model:page-size="page.pageSize"
      :page-sizes="[10, 20, 30]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="listCount"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      class="el-pagination"
    ></el-pagination>
      </slot>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent,PropType } from 'vue'
import { ITableItem } from '../index';
export default defineComponent({
    name: '',
    props:{
      title:{
        type:String,
        default:()=>''
      },
      listData:{
        type:Array,
        required:true
      },
      listCount:{
        type:Number,
        defalut:()=>0

      },
      propList:{
        type:Array as PropType<ITableItem[]>,
       default:()=>[]
      },
      showIndexColumn:{
        type:Boolean,
        default:()=>false
      },
      showSelectColumn:{
        type:Boolean,
        default:()=>false
      },
      page:{
        type:Object,
        default:()=>({currentPage:1,pageSize:10})
      },
      childrenProps:{
        type:Object,
        default:()=>({})
      },
      showFooter:{
        type:Boolean,
        default:()=>true
      }

    },
      emits:['selectionChange','update:page'],
      setup(props,{emit}) {
        const handleSelectionChange=(value:any)=>{
          emit('selectionChange',value)

        }

        const handleSizeChange=(currentPage:number)=>{
          console.error("handleSizeChange")
          emit('update:page',{...props.page,currentPage})

        }


        const handleCurrentChange=(pageSize:number)=>{
          console.error("handleCurrentChange")
            emit('update:page',{...props.page,pageSize})
        }



         return {
           handleSelectionChange,
           handleCurrentChange,
           handleSizeChange
         }
      }
  });
</script>
<style scoped lang="less">
.header{
  display:flex;
  height: 45px;
  padding:0 5px;
  justify-content: space-between;
  align-items: center;

  .title{
    font-size:20px;
    font-weight: 700;
  }

  .handler{
    align-items: center;
  }
}

.footer{
  display: flex;
  justify-content:right;
  width: 100%;
  margin-top: 15px;
}


</style>