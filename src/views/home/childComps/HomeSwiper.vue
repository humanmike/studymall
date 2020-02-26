<template>
  <swiper>
    <swiper-item v-for="(item,index) in banners" :key="index">
      <a :href="item.link">
        <!--
        监听该load来待该图片加载完成后获取首页选项(tabControl)的高度，
        如果不等图片加载完成高度显示不准确
        -->
        <img :src="item.image" alt="" @load="swiperImageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  // 这个轮播图组件非自己写
  import {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
    name: "HomeSwiper",
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    data(){
      return {
        checkImageLoad: true
      }
    },
    methods: {
      swiperImageLoad(){
        if (this.checkImageLoad){
          this.$emit('swiper-image-load')
          // 因为获取高度只需要加载一张图就可以知道了，不需要四次，所以使用一个值来判断
          this.checkImageLoad = false
        }
      }
    }
  }
</script>

<style scoped>

</style>
