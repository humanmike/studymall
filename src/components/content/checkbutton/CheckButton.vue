<template>
    <div class="check-button " :class="{check: isCheck}">
      <img src="~assets/img/cart/tick.svg" alt="" >
    </div>
</template>

<script>
  export default {
    name: "CheckButton",
    // 根据父组件传过来的对象模型的参数决定是否显示点击状态
    props:{
      isCheck:{
        type: Boolean,
        default: true
      }
    }
  }
</script>

<style scoped>
  .check-button {
    position: relative;
    margin: 0;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid #ccc;
    cursor: pointer;
  }

  .check{
    background-color: #ff8198;
    border-color: #ff8198;
  }
</style>
