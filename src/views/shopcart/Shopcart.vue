<template>
    <div id="cart">
        <!--顶部导航栏-->
        <nav-bar class="nav-bar">
          <div slot="left">
            <img src="~assets/img/common/back.svg" alt="" @click="shopCartBackUp">
          </div>

          <div slot="center">购物车({{shopCartCount}})</div>
        </nav-bar>
      <!--选中商品列表-->
      <cart-list class="cart-list"></cart-list>
      <!--底部导航栏-->
      <cart-bottom-bar></cart-bottom-bar>
    </div>
</template>

<script>
  // 导入公共组件
  // 导入顶部导航栏
  import navBar from 'components/common/navbar/NavBar'

  // 导入子组件
  // vuex用户购物车数据
  import cartList from './childComps/CartList'
  // 底部导航栏
  import cartBottomBar from './childComps/CartBottomBar'


  // 导入vuex 辅助函数mapGetters
  import {mapGetters} from 'vuex'

  export default {
    name: "ShopCart",
    components: {
      navBar,

      cartList,
      cartBottomBar,
    },
    computed:{
      //在computed中使用辅助函数mapGetters展示vuex中getters得数据
      ...mapGetters(['shopCartCount'])
    },
    methods:{
      // 回到上一页
      shopCartBackUp(){
        this.$router.back()
      }
    }

  }
</script>

<style scoped>
  #cart {
    /*position: relative;*/
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }

  .cart-list {
    position: absolute;
    top: 44px;
    bottom: 49px;
    width: 100%;
  }

</style>
