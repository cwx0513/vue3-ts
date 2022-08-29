<template>
  <div class="line-echart">
      <base-echart :options="options"></base-echart>
  </div>
</template>

<script lang='ts' setup>
import { defineProps,computed,withDefaults } from 'vue';
import {convertData } from '../utils/convert-data'
import { IDataType } from '../types';
import BaseEchart from '../../../base-ui/echart';




const props=withDefaults(defineProps<{
  title?:string,
  mapData:IDataType[]
}>(),{
  title:''
})



const options=computed(()=>{
  return {
        backgroundColor: '#fff',
        // title: {
        //     text: '全国销量统计',
        //     left: 'center',
        //     textStyle: {
        //         color: 'black'
        //     }
        // },
        tooltip: {
            trigger: 'item',
            formatter: function(params:any) {
                return params.name + ' : ' + params.value[2];
            }
        },
        legend: {
            orient: 'vertical',
            right: 20,
            top: 10,
            data: ['商品销售数量'],
            itemStyle:{
              color:'green'
            },
            textStyle: {
                color: 'black'
            }

        },
        visualMap: {
            min: 0,
            max: 200,
            left: 10,
            bottom: 20,
            calculable: true,
            text: ['高', '低'],
            inRange: {
                color:['rgb(70, 240, 252)', 'rgb(250, 220, 46)', 'green']
            },
            textStyle: {
                color: 'black'
            }
        },
        geo: {  //geo代表地理编码，
            map: 'china',
            // roam:'scale', 禁止放大
            label: {
                emphasis: {
                    show: false
                }
            },
            itemStyle: {
                normal: {
                    areaColor: '#fff',
                    borderColor: 'rgb(9, 54, 95)'
                },
                emphasis: {
                    areaColor: 'rgb(70, 240, 252)'
                }
            }
        },
        series: [{
                name: '商品销售数量',
                type: 'scatter',
                coordinateSystem: 'geo', //coordinateSystem坐标系统，相对于geo
                data: convertData(props.mapData),
                symbolSize: 10,
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                },
                itemStyle: {
                    emphasis: {
                        borderColor: '#fff',
                        borderWidth: 1,
                    }
                }
            },
            {
                type: 'map',
                map: 'china',
                geoIndex: 0,
                aspectScale: 0.75,
                tooltip: {
                    show:false
                }
            }
        ],
        // dataset: {source: mapdata}
    }
})

</script>
<style scoped>
</style>