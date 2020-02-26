<template>
    <div class="bottom-menu">
      <check-button class="select-all"></check-button>
      <span>全选</span>
      <span class="total-price">合计: ¥{{totalPrice}}</span>
      <span class="buy-product">去计算({{getCartCount}})</span>
    </div>
</template>

<script>
  // 导入checkButton子组件
  import checkButton from 'components/content/checkbutton/CheckButton'

  // 导入vuex 辅助函数mapGetters
  import {mapGetters} from 'vuex'

  export default {
    name: "CartBottomBar",
    components:{
      checkButton
    },
    computed: {
      ...mapGetters(['shopCartData']),
      // 计算总件数的价格
      totalPrice(){
        return this.shopCartData.filter(n => n.isCheck == true)
          .reduce((totalVal, currentVal) => {
            return  totalVal + currentVal.count * currentVal.price
          },0).toFixed(2)
      },
      // 共选择购买个数
      getCartCount(){
        return this.shopCartData.filter(n => n.isCheck == true).length == 0 ? 0 : this.shopCartData.filter(n => n.isCheck == true).length
      }

    }

  }
</script>

<style scoped>
  .bottom-menu {
    width: 100%;
    height: 44px;
    background-color: #eee;
    position: fixed;
    bottom: 50px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
  }

  .bottom-menu .select-all {
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
  }

  .bottom-menu .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }

  .bottom-menu .buy-product {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  }

</style>
