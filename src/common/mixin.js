import {debounce} from './util'

// 监听组件离开的时候不调用图片刷新
export const itemImgListenerMixin = {
  data(){
    return {
      itemRefresh: null,
    }
  },
  mounted() {
    // 获取 防抖动函数对象
    const refresh = debounce(this.$refs.scroll.refreshScroll,200)
    // 执行防抖动函数对象
    // 箭头函数里面的回调函数其实一直都是引用这外部 const refresh所以不管调用几次都是在使用同一个函数变量
    this.itemRefresh = () => {
      // 执行防抖动对象
      refresh()
    }
    // 监听图片加载完成刷新scroll对象
    // 当gooditem组件的传递出来imgFinish后就以为着1张图片加载成功就刷新1次
    // 来多少张图片就刷新多少次
    // on传入两个参数
    // 1.从事件总线传递出来的监听对象
    // 2.需要执行的函数对象
    this.$bus.$on('img-finish', this.itemRefresh)
  },
}

// 回到顶部按钮mixin

// 导入回到顶部组件
import backTop from 'components/content/backtop/BackTop'
export const backTopMixin ={
  components:{
    backTop
  },
  data(){
    return {
      // 回到顶部组件是否显示
      tabTopType: false,
    }
  },
  methods:{
    // 监听回到顶部
    backClick(){
      // 调用<scroll>组件对象内的方法
      this.$refs.scroll.backTo(0,0)
    },
  }

}
