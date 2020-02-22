<template>
    <div class="param-info">
      <!-- goodsParamInfo.sizes是一个嵌套了多层的数组，所以需要多次遍历取出对应的值-->
      <table v-for="(table, index) in goodsParamInfo.sizes"
             class="info-size" :key="index">
        <tr v-for="(tr, indey) in table" :key="indey">
          <td v-for="(td, indez) in tr" :key="indez">{{td}}</td>
        </tr>
      </table>
      <!-- 遍历goodsParamInfo数组获取详细的参数值-->
      <table class="info-param">
        <tr v-for="(info, index) in goodsParamInfo.infos">
          <td class="info-param-key">{{info.key}}</td>
          <td class="param-value">{{info.value}}</td>
        </tr>
      </table>
      <!--goodsParamInfo.image可能有些商品并没有这个图片就给他一个默认0-->
      <div class="info-img" v-if="goodsParamInfo.image === 0">
        <img :src="goodsParamInfo.image" alt="">
      </div>
    </div>
</template>

<script>
  export default {
    name: "DetailParamInfo",
    props: {
      goodsParamInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .param-info {
    padding: 20px 15px;
    font-size: 14px;
    border-bottom: 5px solid #f2f5f8;
  }

  .param-info table {
    width: 100%;
    border-collapse: collapse;
  }

  .param-info table tr {
    height: 42px;
  }

  .param-info table tr td {
    border-bottom: 1px solid rgba(100,100,100,.1);
  }

  .info-param-key {
    /*当value的数据量比较大的时候, 会挤到key,所以给一个固定的宽度*/
    width: 95px;
  }

  .info-param {
    border-top: 1px solid rgba(0,0,0,.1);
  }

  .param-value {
    color: #eb4868
  }

  .info-img img {
    width: 100%;
  }
</style>
