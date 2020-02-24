<template>
    <div class="goods">
        <good-item  v-for="(item, index) in goods" :goodItems="item" :key="index"></good-item>
    </div>
</template>

<script>
  // 导入goodItem子组件
  import goodItem from './GoodItem'

  export default {
    name: "GoodList",
    props: {
      // 把从Home组件获取货物(goods)数组数据
      goods:{
        type: Array,
        default(){
          return []
        }
      },
    },

    components: {
      goodItem
    }
  }
</script>

<style scoped>
  .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    padding: 2px;
  }
</style>
