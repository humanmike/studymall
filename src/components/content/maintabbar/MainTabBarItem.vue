<template>
  <tab-bar>
    <tab-bar-item path="/home" activeColor="deepPink">
      <!--
      在标签页中使用别名要添加~符号,
      此处的~assets 其实是别名中的src/assets
       -->
      <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt="" >
      <img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg" alt="">
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <!--
    在子组件中定义了需要从父组件中获取path,activeColor变量所以在使用子组件的时候传入
    因为activeColor在子组件中包含了默认值，所以非必传
    -->
    <tab-bar-item path="/category" activeColor="deepPink">
      <img slot="item-icon" src="~assets/img/tabbar/category.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/category_active.svg" alt="">
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/shopcart" activeColor="deepPink">
      <img slot="item-icon" src="~assets/img/tabbar/shopcart.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/shopcart_active.svg" alt="">
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile" activeColor="deepPink">
      <img slot="item-icon" src="~assets/img/tabbar/profile.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/profile_active.svg" alt="">
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
  // 因为在webpack.base.config.js中配置了别名所以此处路径可以使用快捷键
  // 此处的components已经配置了别名路径所以实际上是src/components
  import TabBar from "components/common/tabbar/TabBar"
  import TabBarItem from "components/common/tabbar/TabBarItem"
  // 把App.vue的大部分组件内容在进行一个抽离到此处
  export default {
    name: "MainTabBarItem",
    components: {
      TabBar, TabBarItem
    }
  }
</script>

<style scoped>

</style>
