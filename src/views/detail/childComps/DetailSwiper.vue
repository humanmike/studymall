<template>
    <div class="detail-swiper">
      <swiper class="swiper-cls">
        <swiper-item v-for="(item,index) in swiperImgs" :key="index">
          <img :src="item" alt="">
        </swiper-item>
      </swiper>
    </div>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
    name: "DetailSwiper",
    components: {
      Swiper,SwiperItem
    },
    props:{
      swiperImgs:{
        type: Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .swiper-cls{
    height: 300px;
    overflow: hidden;
  }
</style>
