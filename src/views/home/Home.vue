<template>
    <div id="home">
      <!--首页导航栏-->
      <nav-bar class="home-nav">
          <div slot="center" >购物车</div>
      </nav-bar>

      <!-- 添加两个tabControl组件上拉到不同位置的时候根据isTabFixed来显示不同的tabControl-->
      <home-tab-control :titles="['流行','新款','精选']"
                        @tab-click="tabClick" ref="tabControlFrist"
                        v-show="isTabFixed" class="tab-control"></home-tab-control>

      <!-- 在组件例定义ref是获取组件对象-->
      <!-- probeTypeOption根据此值决定是否检测-->
      <!-- @scroll="scrollControl" 使用函数来获取内部组件的传递-->
      <scroll class="content" ref="scroll"
              :clickOption="true" :probeTypeOption="3" :pullUpLoadOption="true"
              @scroll="scrollControl" @pulling-up="loadMore">
        <!--轮播图-->
        <!-- 根据子组件自定义传出确定图片是否加载完成-->
        <home-swiper :banners="banners" @swiper-image-load="swiperImageLoad"></home-swiper>
        <!--推荐栏-->
        <home-recommend-view :recommends="recommend"></home-recommend-view>

        <!--本周流行-->
        <home-feature-view></home-feature-view>

        <!--首页选项-->
        <!--tab-click获取子组件中的Index数据，为根据不同titles展示不同数据-->
        <!-- 此处的ref是为了获得该组件的实际高度，所以定义一个ref获取该子组件对象-->
        <home-tab-control :titles="['流行','新款','精选']"
                          @tab-click="tabClick" ref="tabControlSecond"></home-tab-control>

        <!-- 货物展示 -->
        <!-- 传入服务器获取的货物数组-->
        <!-- showGoodList为计算属性   -->
        <goodList :goods="showGoodList"></goodList>
      </scroll>
      <!-- .native监听组件的根元素事件,此处就是监听backTop里面的div-->
      <!-- 通过tabControl来修改tabTopType来决定回到顶部按钮是否显示-->
      <backTop @click.native="backClick" v-show="tabTopType"></backTop>
    </div>
</template>

<script>
  // 导入导航栏
  import navBar from 'components/common/navbar/NavBar'
  // 导入首页选项
  import homeTabControl from 'components/content/hometabcontrol/HomeTabControl'
  // 导入货物展示
  import goodList from 'components/content/goods/GoodList'
  // 导入回到顶部组件
  import backTop from 'components/content/backtop/BackTop'
  // 导入滚动组件
  import scroll from 'components/common/scroll/Scroll'

  // 子组件
  // 导入子轮播图
  import homeSwiper from './childComps/HomeSwiper'
  // 导入子推荐栏
  import homeRecommendView from './childComps/HomeRecommendView'

  // 导入本期流行
  import homeFeatureView from './childComps/HomeFeatureView'

  // 导入针对该Home组件的网络请求库
  import {getHomeMultidata,getHomeGoods} from 'network/Home'

  // 工具类
  // 导入防抖函数
  import {debounce} from 'common/util'

  export default {
    name: "Home",
    data(){
      return {
        // 导航栏数据
        banners: [],
        dKeyword: [],
        keywords: [],
        // 推荐栏数据
        recommend: [],
        // 货品数据(分别存储不同货品的数据，
        // page用来记录页数，一旦页数改变，会像服务器请求更多数据)
        goods: {
          pop: {page: 0, list: []},
          new: {page: 0, list: []},
          sell: {page: 0, list: []},
        },
        // 回到顶部组件是否显示
        tabTopType: false,
        // 默认货物数据展示
        currentTabType: 'pop',
        // 获取首页选项(tabControl高度)
        tabTopOffsetTop: 0,
        // 根据这个值来显示什么时候显示对应首页选项
        isTabFixed: false,
        // 记录y轴信息
        scrollY: 0
      }
    },
    computed: {
      showGoodList(){
        return this.goods[this.currentTabType].list
      }
    },
    components: {
      scroll,
      navBar,
      goodList,
      backTop,

      homeSwiper,
      homeRecommendView,
      homeFeatureView,
      homeTabControl,


    },
    // 在创建该组件的时候调用created生命周期函数，提起获得服务器数据
    // created:在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图。
    created() {
      // 获取导航栏，推荐栏数据
      this.getHomeMultidata()

      // 请求首页Pop，New, Sell数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    //mounted:在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。
    mounted() {

      // 获取 防抖动函数对象
      const refresh = debounce(this.$refs.scroll.refreshScroll,200)

      // 监听图片加载完成刷新scroll对象
      // 当gooditem组件的传递出来imgFinish后就以为着1张图片加载成功就刷新1次
      // 来多少张图片就刷新多少次
      this.$bus.$on('imgFinish', () => {
        // 执行防抖动对象
        refresh()
      })


    },
    // 添加Keep-alive标签才可以使用
    activated(){
      // 回到路由时跳转至对应坐标
      this.$refs.scroll.backTo(0,this.scrollY,0)
      // 刷新一下scroll对象保证其坐标准确
      this.$refs.scroll.refreshScroll()
    },
    deactivated(){
      // 路由离开时记录y轴标签
      this.scrollY = this.$refs.scroll.getScrollY()

    },
    methods:{
      // 1.事件监听
      // 监听首页选项
      tabClick(index){
        switch (index) {
          case 0:
            this.currentTabType = 'pop'
            break
          case 1:
            this.currentTabType = 'new'
            break
          case 2:
            this.currentTabType = 'sell'
            break
        }
        // 监听点击后同时给两个首页选项赋值修改其默认currentIndex
        this.$refs.tabControlFrist.currentIndex = index
        this.$refs.tabControlSecond.currentIndex = index

      },
      // 监听回到顶部
      backClick(){
        // 调用<scroll>组件对象内的方法
        this.$refs.scroll.backTo(0,0)
      },

      // 监听滚动
      scrollControl(position){
        // 1.监听滚动到什么位置显示回到顶部案件
        this.tabTopType = -(position.y) > 1000

        // 2.监听首页选项（tabControl）什么时候吸顶
        this.isTabFixed = -(position.y) > this.tabTopOffsetTop

      },
      // 加载更多数据
      loadMore(){
        this.getHomeGoods(this.currentTabType)
        this.$refs.scroll.finishPullUp()
        console.log('更新数据成功');
      },
      // 确定图片是否加载成来获取tab-control高度
      swiperImageLoad(){
        // 记录高度到Home组件中
        this.tabTopOffsetTop = this.$refs.tabControlSecond.$el.offsetTop
        console.log(this.$refs.tabControlSecond.$el.offsetTop);
      },
      // 2.封装网络请求方法，不在created函数内处理过多逻辑
      // 请求导航栏，推荐栏数据
      getHomeMultidata(){
        // 调用axios实例的then获得响应成功数据
        getHomeMultidata().then(res => {
          // 把获取到的数据分别付给该组件的data
          this.banners = res.data.banner.list
          this.keywords = res.data.keywords
          this.recommend = res.data.recommend.list
          this.dKeyword = res.data.dKeyword
        })
      },
      // 请求首页货品数据
      getHomeGoods(type){
        // 从data中获取Page，根据Page的页数来获取更多数据
        // 默认是0，所以需要加1,而且每次用户上拉获取数据的时候其实也是+1
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          // 数组解析，把新获取的数组值一个个遍历的原本数组中
          this.goods[type].list.push(...res.data.list)
          // 当获得新数据后记得把原本的page+1
          // 因为下次上拉就是获取更多
          this.goods[type].page +=1
        })
      },
    },
  }
</script>

<style scoped>
  .home-nav {
    /*此处的var是引入了css定义的变量，这里是引用其变量，定义的css在App.vue里面导入了*/
    background-color: var(--color-tint);
    color: #fff;

    /* 此处是针对当滚动使用原生的时候需要保证其navbar存在而设置的属性，
    现在因为滚动已经给了scroll处理所以不需要处理 */
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
  }

  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  
  .tab-control{
    position: relative;
    z-index: 9;
  }
</style>
