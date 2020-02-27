<template>
    <div class="bottom-menu">
      <check-button class="select-all" :isCheck="cartSelect" @click.native="clickSelectAll"></check-button>
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
      },
      // 判断购物车内的单选是否全勾
      cartSelect(){
        // 未选中的清空有三个状态
        // 1.当什么都没有的时候加入购物车的时候应该返回false
        if (this.shopCartData.length == 0) return false
        // 这里判断两种状态,
        // 2.只要有一个isChecked返回False就直接返回True然后取反
        // 3.如果都没有返回False意味着没有就返回False然后取反
        return !(this.shopCartData.find(n => n.isCheck == false))

      }

    },
    methods:{
      // 全选按钮点击
      clickSelectAll(){
        // 根据计算属性cartSelect的值来判断，如果是true证明就已经是全选了修改成false
        if (this.cartSelect) {
          return this.shopCartData.forEach(n => n.isCheck = false)
        }else {
          // 只要有部分没选那就是false全部改成true
          return this.shopCartData.forEach(n => n.isCheck = true)
        }
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
