<template>
  <!-- <div class="overview">
    <img src="../../../../assets/img/banner.jpg" class="img">
  </div> -->

    <div class="swiper">
      <el-carousel :interval="3000" arrow="always">
        <el-carousel-item v-for="item in imagesBox" :key="item">
        <img :src="item.idView" class="image">
      </el-carousel-item>
      </el-carousel>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'overview',
  setup() {
          const imagesBox=[
              {id:0,idView:require("../../../../assets/img/1.png")},
              {id:1,idView:require("../../../../assets/img/2.png")},
              {id:2,idView:require("../../../../assets/img/3.png")},
              {id:3,idView:require("../../../../assets/img/4.png")}
              ]
          const fiveNews:any=[]
    return {
      imagesBox,
      fiveNews
    }
  }
})
</script>

<style scoped lang="less">
// .overview{
//   box-sizing: border-box;
// }
// .img{
//   width: 100%;
//   height: 100%;
// }


.swiper{
        padding: 0;
        margin: 0;
        width: 100%;
        margin-bottom: 30px;
        height: 300px;
    }
    .el-carousel__container{
      height: 400px;
    }
    .el-carousel__item h3 {
    font-size: 18px;
    line-height: 300px;
    margin: 0;
  }
   .image{
     width: 100%;
     height: 100%;
     background-attachment: fixed;
     background-size: 100%;
   }
</style>
