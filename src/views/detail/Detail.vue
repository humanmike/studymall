<template>
    <div id="detail">
      <detail-nav-bar class="detail-nav"></detail-nav-bar>
      <!--滚动-->
      <scroll class="content" ref="scroll">
        <!-- 传入轮播图数据给子组件-->
        <detail-swiper :swiperImgs="topImages"></detail-swiper>
        <!--传入商品对象数据给子组件-->
        <detail-base-info :goods="goods"></detail-base-info>
        <!--传入商家对象数据给子组件-->
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-param-info :goodsParamInfo="goodsParamInfo"></detail-param-info>
        <!--传入商品明细数据给子组件-->
        <detail-goods-info :shopDetailInfo="shopDetailInfo" @detail-img-load="detailImgLoad"></detail-goods-info>
      </scroll>
    </div>
</template>

<script>
  // 公共组件
  // 导入轮播图
  import scroll from "components/common/scroll/Scroll"

  // 子组件导入
  // 导入导航栏
  import detailNavBar from "./childComps/DetailNavBar"
  // 导入轮播图
  import detailSwiper from "./childComps/DetailSwiper"
  // 导入商品详情页
  import detailBaseInfo from "./childComps/DetailBaseInfo"
  // 导入商家详情页
  import detailShopInfo from "./childComps/DetailShopInfo"
  // 导入商品明细页
  import detailGoodsInfo from "./childComps/DetailGoodsInfo"
  import detailParamInfo from "./childComps/DetailParamInfo"


  // 网络请求导入
  import {getDetail,Goods,Shop,GoodsParam} from "network/Detail"

  export default {
    name: "Detail",
    components: {
      scroll,

      detailNavBar,
      detailSwiper,
      detailBaseInfo,
      detailShopInfo,
      detailGoodsInfo,
      detailParamInfo,
    },
    data(){
      return {
        // 商品详情iid
        iid: null,
        // 轮播图数据
        topImages: [],
        // 商品页展示数据对象
        goods: {},
        // 商家详情展示数据对象
        shop: {},
        // 商品详情数据展示(因为数据量没有很复杂所以不使用类管理)
        shopDetailInfo: {},
        // 商品明细展示数据对象
        goodsParamInfo:{}

      }
    },
    created(){
      // 获取动态路由iid
      this.iid = this.$route.params.iid

      // 发送轮播图数据请求
      this.getDetail()
    },
    methods: {
      // 1.发送网络请求
      getDetail(){
        getDetail(this.iid).then(res => {
          // 获取轮播图数据
          const data = res.result
          this.topImages = data.itemInfo.topImages

          // 整理相关信息
          const itemInfo = data.itemInfo
          const columns = data.columns
          const shopInfo = data.shopInfo

          // 获取整理好的商品信息
          this.goods = new Goods(itemInfo,columns, shopInfo)

          // 获取整理好的店铺信息
          this.shop = new Shop(shopInfo)

          // 获取整理好的商品详情信息
          this.shopDetailInfo = data.detailInfo

          // 获取整理好的商品明细信息
          this.goodsParamInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
        })
      },

      // 2.事件监听
      // 监听子组件图片是否加载完成
      detailImgLoad(){
        // 加载完成刷新scroll获取正确高度
        this.$refs.scroll.refreshScroll()
      }
    }
  }

</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: white;
    height: 100vh;
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: white;

  }

  .content{
    height: calc(100% - 44px);
  }
</style>
