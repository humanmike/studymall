<template>
  <scroll ref="scroll" class="content" :clickOption="true">
    <div class="cart-list">
      <div>
        <cart-list-item v-for="(item,index) in shopCartData" :cartListItems="item" :key="index"></cart-list-item>
      </div>
    </div>
  </scroll>

</template>

<script>
  // 导入滚动条组件
  import scroll from 'components/common/scroll/Scroll'

  // 导入展示的item组件
  import cartListItem from './CartListItem'

  // 导入vuex 辅助函数mapGetters
  import {mapGetters} from 'vuex'

  export default {
    name: "CartList",
    components:{
      scroll,
      cartListItem
    },
    computed:{
      // 获取vuex用户购物车的所有数据
      //在computed中使用辅助函数mapGetters展示vuex中getters得数据
      ...mapGetters(['shopCartData'])
    },
    activated() {
      this.$refs.scroll.refreshScroll()
    }
  }
</script>

<style scoped>
  .cart-list {
    height: calc(100%-44px-49px);
  }
  .content{
    height: 100%;
    overflow: hidden;
  }
</style>
