<template>
  <div id="shop-item">
    <div class="item-selector">
      <!--子组件内props里面的isCheck值，根据对象模型(购物商品对象里面的Key来决定是否显示点击状态)-->
      <check-button :isCheck="cartListItems.isCheck" @click.native="cartCheckClick"></check-button>
    </div>
    <div class="item-img">
      <img :src="cartListItems.image" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="item-title">{{cartListItems.title}}</div>
      <div class="item-desc">商品描述: {{cartListItems.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">¥{{cartListItems.price}}</div>
        <div class="item-count right">x{{cartListItems.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import checkButton from 'components/content/checkbutton/CheckButton'

  export default {
    name: "CartListItem",
    components:{
      checkButton
    },
    props:{
      cartListItems:{
        type: Object,
        default(){
          return {}
        }
      }
    },
    methods:{
      // 修改vuex购物商品的对象属性，来决定是否显示点击
      cartCheckClick(){
        // 直接取该值的反结果，可以保证可以频繁确认取消
        this.cartListItems.isCheck = ! this.cartListItems.isCheck
      }
    }
  }
</script>

<style scoped>
  #shop-item {
    width: 100%;
    display: flex;
    font-size: 0;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }

  .item-selector {
    width: 14%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item-title, .item-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .item-img {
    padding: 5px;
    /*border: 1px solid #ccc;*/
  }

  .item-img img {
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }

  .item-info {
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }

  .item-info .item-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }

  .info-bottom {
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }

  .info-bottom .item-price {
    color: orangered;
  }
</style>
