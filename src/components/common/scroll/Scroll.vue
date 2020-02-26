<template>
      <!--
        ref有两个功效
        1.在绑定组件的时候获取的是组件对象
        2.在绑定元素的时候获取的是元素对象
       -->
    <div class="wrapper" ref="wrapper">
      <!--
        为什么需要在此处设置两个div
        因为better-scroll规定了在使用的时候必须是在父标签下的子标签才可生效
        此处的子标签就是content，不可以存在多个子标签
      -->

      <div class="content" >
        <slot></slot>
      </div>
    </div>
</template>

<script>
  // 导入BScroll
  import bScroll from 'better-scroll'

  export default {
    name: "Scroll",
    data(){
      return {
        // scroll变量用来存放better scroll实例
        scroll: null
      }
    },
    props: {
      // 父组件传入是否检测滚动
      probeTypeOption: {
        type: Number,
        default: 0,
      },
      // 父组件传入是否需要上拉
      pullUpLoadOption: {
        type: Boolean,
        default: false
      },
      clickOption:{
        type: Boolean,
        default: false
      }
    },
    mounted() {
      this.scroll = new bScroll(this.$refs.wrapper, {
        // 用于在scroll对象内的元素需要触发原生点击的时候需要设置该属性
        click: this.clickOption,
        // 定义一个默认参数，根据该参数来据欸的那个是否要监听滚动
        // 0,1 不滚动
        // 2 手指离开后不监测
        // 3 全时检测
        probeType: this.probeTypeOption,
        pullUpLoad: this.pullUpLoadOption,

      })
      this.scroll.on('scroll', (position) => {
        // 把滚动对象传出父组件，供外部组件调用
        this.$emit('scroll-control', position)
      })

      this.scroll.on('pullingUp',() =>{
        // 把上拉对象传出父组件，供外部组件调用
        this.$emit('pulling-up')
      } )
    },

    methods: {
      // 回到顶部函数，供父组件调用
      backTo(x,y, time=300){
        // scrollTo方法可以使监听内的scroll回到顶部
        // 确保this.scroll已经是一个对象为true才去执行后面的方法
        this.scroll && this.scroll.scrollTo( x, y, time)
      },
      // 完成上拉组件，确保下次可以上拉更多
      finishPullUp(){
        this.scroll && this.scroll.finishPullUp()
      },
      refreshScroll(){
        this.scroll && this.scroll.refresh()
      },
      getScrollY(){
        return this.scroll ? this.scroll.y : 0
      }
    }
  }
</script>

<style scoped>

</style>
