<template>
  <div class="cwx-form">
    <div class="header">
     <slot name="header"></slot>
    </div>
    <el-form :label-width="labelWidth">
        <el-row>
          <template v-for="item in formItems" :key="item.label">
            <el-col v-bind="colLayout">
              <el-form-item
              v-if="!item.isHidden"
              :label="item.label"
              :rules="item.rules"
              :style="itemStyle"
              >
                <template v-if="item.type==='input'||item.type==='password'">
                  <el-input
                  :placeholder="item.placeholder"
                  :show-password="item.type==='password'"
                  v-bind="item.otherOptions"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event,item.field)"
                  clearable>
                  </el-input>
                </template>
                <template v-else-if="item.type==='select'">
                  <el-select
                  :placeholder="item.placeholder"
                  style="width:100%"
                  v-bind="item.otherOptions"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event,item.field)"
                  clearable>
                    <el-option v-for="option in item.options"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value">
                    </el-option>
                  </el-select>
                </template>
                <template v-else-if="item.type==='datepicker'">
                  <el-date-picker
                  v-bind="item.otherOptions"
                  style="width:100%"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event,item.field)"
                  ></el-date-picker>
                </template>
              </el-form-item>
            </el-col>
          </template>
        </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent,PropType } from 'vue'
import { IFormItem } from '../types';
export default defineComponent({
    name: '',
    props:{
      modelValue:{
        type:Object,
        required:true
      },
      formItems:{
        type:Array as PropType<IFormItem[]>,
        default:()=>[], //?????????????????????????????????
      },
      labelWidth:{
        type:String,
        default:()=>'100px'
      },
      itemStyle:{
        type:Object,
        default:()=>({padding:'10px 40px'})
      },
      colLayout:{
        type:Object,
        default:()=>({
          xl:6,
          lg:8,
          md:12,
          sm:24,
          xs:24
        })
      }
    },

    emits:['update:modelValue'], //?????????update:modelValue,?????????????????????????????????v-model????????????
    setup(props,{emit}) {

      // const formData=ref({...props.modelValue})

      // watch(()=>props.modelValue,(newValue)=>{
      //   formData.value={...newValue}

      // })

      // watch(formData,(newValue)=>{
      //   emit('update:modelValue',newValue)
      // },{deep:true})

      const handleValueChange=(value:any,field:string)=>{
        emit('update:modelValue',{...props.modelValue,[field]:value})
      }

         return {
           handleValueChange
         }
      }
  });
</script>
<style scoped lang="less">
.cwx-form{
  padding-top:22px;
  .form-item{
    padding:5px 30px;
  }
}

</style>