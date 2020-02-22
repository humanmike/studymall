<template>
  <div id="app">
    <main-tab-bar-item></main-tab-bar-item>
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import mainTabBarItem from "components/content/maintabbar/MainTabBarItem"

export default {
  name: 'App',
  components: {
    mainTabBarItem
  }
}
</script>

<style>
  /*引入CSS文件*/
  @import "assets/css/base.css";

</style>
