<template>
    <div id="detail">
      <!--顶部导航栏-->
      <detail-nav-bar class="detail-nav" @detail-item-click="detailItemClick" ref="detailNav"></detail-nav-bar>
      <!--滚动-->
      <scroll class="content" ref="scroll" :probeTypeOption="3" @scroll-control="scrollControl">
        <!-- 传入轮播图数据给子组件-->
        <detail-swiper :swiperImgs="topImages"></detail-swiper>
        <!--传入商品对象数据给子组件-->
        <detail-base-info :goods="goods" ref="detailBaseInfo"></detail-base-info>
        <!--传入商家对象数据给子组件-->
        <detail-shop-info :shop="shop" ></detail-shop-info>
        <!--传入商品明细数据（尺寸）给子组件-->
        <detail-param-info :goodsParamInfo="goodsParamInfo" ref="detailParamInfo"></detail-param-info>
        <!--传入商品细节（更多图片）数据给子组件-->
        <detail-goods-info
          :shopDetailInfo="shopDetailInfo"
          @detail-img-load="detailImgLoad"></detail-goods-info>
        <!--传入评论数据给子组件-->
        <detail-comment-info :commentInfo="commentInfo" ref="detailCommentInfo"></detail-comment-info>
        <!--传入推荐数据给公共组件-->
        <good-list :goods="recommendInfo" ref="detailGoodList"></good-list>
      </scroll>
      <!--底部导航栏-->
      <detail-bottom-bar @add-shop-cart="detailAddShopCart"></detail-bottom-bar>
      <!--这里back-top组件,tabTopType值,backClick函数来自Mixin-->
      <back-top v-show="tabTopType" @click.native="backClick"></back-top>
    </div>
</template>

<script>
  // 公共组件
  // 导入轮播图
  import scroll from "components/common/scroll/Scroll"
  // 导入公共货物展示组件
  import goodList from "components/content/goods/GoodList"

  // 子组件导入
  // 导入导航栏
  import detailNavBar from "./childComps/DetailNavBar"
  // 导入轮播图组件
  import detailSwiper from "./childComps/DetailSwiper"
  // 导入商品详情页组件
  import detailBaseInfo from "./childComps/DetailBaseInfo"
  // 导入商家详情页组件
  import detailShopInfo from "./childComps/DetailShopInfo"
  // 导入商品细节页(图片等)组件
  import detailGoodsInfo from "./childComps/DetailGoodsInfo"
  // 导入商品明细(商品参数)信息组件
  import detailParamInfo from "./childComps/DetailParamInfo"
  // 导入商品评论组件
  import detailCommentInfo from "./childComps/DetailCommentInfo"
  // 导入底部导航栏
  import detailBottomBar from "./childComps/DetailBottomBar"

  // 导入防抖函数
  import {debounce} from 'common/util'
  // 导入mixin
  import {itemImgListenerMixin,backTopMixin} from 'common/mixin'

  // 网络请求导入
  import {getDetail,getRecommend,Goods,Shop,GoodsParam} from "network/Detail"

  // 导入vuex辅助函数来做actions内容映射
  import {mapActions} from 'vuex'

  export default {

    name: "Detail",
    mixins: [itemImgListenerMixin,backTopMixin],
    components: {
      scroll,
      goodList,

      detailNavBar,
      detailSwiper,
      detailBaseInfo,
      detailShopInfo,
      detailGoodsInfo,
      detailParamInfo,
      detailCommentInfo,
      detailBottomBar,
    },
    data(){
      return {
        // 滚动索引
        scrollCurrentIndex: null,
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
        goodsParamInfo:{},
        // 商品评论数据
        commentInfo:{},
        // 推荐商品数据
        recommendInfo: [],
        // 获取所有组件的高度
        detailComOffsetList: [],
        // 获取所有组件高度函数
        getDetailComOffsetFunc: null
      }
    },
    created(){
      // 获取动态路由iid
      this.iid = this.$route.params.iid

      // 发送轮播图数据请求
      this.getDetail()
      // 发送推荐商品数据请求
      this.getRecommend()

      // 获取组件高度函数对象(防抖函数)
      this.getDetailComOffsetFunc = debounce(() => {
        // 慎防多次获取所以先让数组为空
        this.detailComOffsetList = []
        // 在图片加载完成后获取所有组件高度
        this.detailComOffsetList.push(0)
        this.detailComOffsetList.push(this.$refs.detailParamInfo.$el.offsetTop)
        this.detailComOffsetList.push(this.$refs.detailCommentInfo.$el.offsetTop)
        this.detailComOffsetList.push(this.$refs.detailGoodList.$el.offsetTop)
        // 在添加一个最大值为了后续作滚动作黑魔法
        this.detailComOffsetList.push(Number.MAX_VALUE)

      },100)
    },
    methods: {
      // 0.导入vuex辅助函数
      ...mapActions(['optionAddShopCart']),
      // 1.发送网络请求
      // 获取详情页轮播图和服装展示数据
      getDetail(){
        getDetail(this.iid).then(res => {
          // 获取轮播图数据
          const data = res.result
          this.topImages = data.itemInfo.topImages
          // 整理相关信息
          const itemInfo = data.itemInfo
          const columns = data.columns
          const shopInfo = data.shopInfo
          const rate = data.rate

          // 获取整理好的商品信息
          this.goods = new Goods(itemInfo,columns, shopInfo)

          // 获取整理好的店铺信息
          this.shop = new Shop(shopInfo)

          // 获取整理好的商品细节(图片)信息
          this.shopDetailInfo = data.detailInfo

          // 获取整理好的商品明细(商品参数)信息
          this.goodsParamInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
          // 获取评论信息
          // 有些商品可能没有评论数据，所以获取的时候先判断下
          if(rate.cRate != 0){
            this.commentInfo = rate.list[0]
          }
        })
      },

      // 获取评价信息数据
      getRecommend(){
        getRecommend().then(res =>{
          this.recommendInfo = res.data.list
        })
      },

      // 2.事件监听
      // 监听子组件图片是否加载完成
      detailImgLoad(){
        // 加载完成刷新scroll获取正确高度
        this.$refs.scroll.refreshScroll()

        // 在图片加载完成后执行获取高度函数(防抖)
        this.getDetailComOffsetFunc()
      },

      // 监听NavBar的点击事件
      detailItemClick(index){
        // 点击移动到对应的位置
        // 此处的y值高度以从数组获取
        this.$refs.scroll.backTo(0,-this.detailComOffsetList[index],300)
      },

      // 监测滚动
      scrollControl(position){
        // 首先把position.y的上拉值负数转为正
        const positionY = - position.y

        // 判断是否显示回到顶部按钮
        this.tabTopType = positionY > 1000

        // 遍历获取到各个组件高度的数据，这个数组还加了一个最大值数字，来方便遍历
        for (let i = 0; i < this.detailComOffsetList.length-1; i++) {
          // 判断scrollCurrentIndex不是一个Null并且positionY要大于第一个值和小于第二个值得区间才符合
          if (this.scrollCurrentIndex !== i &&
            (positionY >= this.detailComOffsetList[i] && positionY < this.detailComOffsetList[i+1])){
            this.scrollCurrentIndex = i
            // 把值给得Nav组件中得currentIndex从而改变NavBar点击效果
            this.$refs.detailNav.currentIndex = this.scrollCurrentIndex
          }
        }
      },

      // 添加购物车
      detailAddShopCart(){
        // 从data中获取该商品的信息传递给vuex
        const product = {}
        // 把对应商品数据加了的对象中
        // 原本应该是从这个接口获取数据，但是因为这里有时候返回不到所以从轮播图获取
        // product.image = this.goodsParamInfo.image
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid = this.iid

        // 传递给vuex的actions中去做复杂或者异步操作
        // 因为使用了new Promise所以可以直接调用then方法来知道函数到底有没有执行成功
        // 这个是正常调用
        // this.$store.dispatch('optionAddShopCart',product).then(resolve => console.log(resolove))
        // 也可以使用辅助函数(mapActions)来做映射
        this.optionAddShopCart(product).then(resolve => this.$toast.showToast(resolve))

      }
    },
    destroyed() {
      // 因为此处是非keep-alive下,所以使用该Key来暂停事件监听
      // 路由离开的时候当不去当前路由的事件总线的图片加载
      // 传入两个参数 1.事件总线传递出来的对象，2.当前执行传递出来对象的对应函数对象
      this.$bus.$off('imgFinish', this.itemRefresh)
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
<!--if (this.scrollCurrentIndex !== i-->
<!--&& (-position.y >= this.detailComOffsetList[i]-->
<!--&& -position.y <= this.detailComOffsetList[i+1])){-->
<!--this.$refs.detailNav.currentIndex = this.scrollCurrentIndex-->
<!--}-->
