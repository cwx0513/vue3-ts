<template>
  <div class="line-echart">
      <base-echart :options="options"></base-echart>
  </div>
</template>

<script lang='ts' setup>
import { defineProps,computed,withDefaults } from 'vue';
import BaseEchart from '../../../base-ui/echart';





const props=withDefaults(defineProps<{
  title?:string,
  xLabels:string[],
  values:any[]
}>(),{
  title:''
})



const options=computed(()=>{
  return {
      // title: {
      //   text: 'Stacked Area Chart'
      // },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        // data可以不写，会自动从数据中获取
        // data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
      },
      toolbox: {
        // feature: {
        //   saveAsImage: {}
        // }
      },
      grid: {  //grid用来做布局,
        left: '3%',//左边标签离左边的边框的距离
        right: '4%',//右边标签离右边的边框的距离
        bottom: '3%', //下边标签离下边的边框的距离
        containLabel: true //距离是否包含坐标标签文字
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: props.xLabels
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '类别销量',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: props.values
        }
      ]
    };
})

</script>
<style scoped>
</style>