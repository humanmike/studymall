<template>
    <!--itemClick跳转至对应详情页-->
    <div class="goods-item" @click="itemClick">
      <!-- @load事件，用来监听图片标签是否已经加载完成-->
      <img :src="goodItems.show.img" alt="" @load="imgFinish">
      <div class="goods-info">
        <p>{{goodItems.title}}</p>
        <span class="price">价格: {{goodItems.price}}</span>
        <span class="collect">收藏: {{goodItems.cfav}}</span>
      </div>
    </div>
</template>

<script>
  export default {
    name: "GoodItem",
    props: {
      goodItems: {
        type: Object,
        default(){
          return {}
        }
      }
    },
    methods: {
      imgFinish(){
        // 通过事件总线传递出去图片已经加载成功信息
        this.$bus.$emit('imgFinish')
      },
      // 跳转详情页路由
      itemClick(){
        this.$router.push('/detail/' + this.goodItems.iid )
      }
    }
  }
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;

    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
