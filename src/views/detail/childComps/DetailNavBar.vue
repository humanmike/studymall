<template>
    <div class="nav-bar">
      <nav-bar>
        <!--返回图标设置-->
        <div slot="left" @click="itemClickBack ">
          <img src="~assets/img/common/back.svg" alt="">
        </div>
        <!--导航选项-->
        <div slot="center" class="title">
          <div v-for="(item, index) in navTitleList"
               :key="item"
               class="title-item"
               :class="{active: currentIndex === index}"
               @click="itemClick(index)">
            {{item}}
          </div>
        </div>
      </nav-bar>

    </div>
</template>

<script>
  // 导入导航栏
  import navBar from 'components/common/navbar/NavBar'


  export default {
    name: "DetailNavBar",
    data(){
      return {
        navTitleList: ['商品','参数','评论','推荐'],
        currentIndex: 0,
      }
    },
    components: {
      navBar
    },
    methods:{
      // 导航栏点击
      itemClick(index){
        this.currentIndex = index
      },
      // 返回上一页点击
      itemClickBack(){
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .title {
    display: flex;
    font-size: 13px;
  }

  .title-item {
    flex: 1;
  }

  .active {
    color: var(--color-high-text)
  }

  .back img {
    margin-top: 12px;
  }
</style>
