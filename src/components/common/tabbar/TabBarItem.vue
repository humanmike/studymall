<template>
    <div :style="activityStyle"  class="tab-bar-item" @click="itemClick">
      <div v-if="isActive">
        <slot name="item-icon"></slot>
      </div>
      <div v-else>
        <slot name="item-icon-active"></slot>
      </div>
      <slot name="item-text"></slot>
      <!--错误示范，不可以在插槽中添加属性否则会直接在调用的时候被全部替换掉-->
      <!--可以将其绑定在上一级标签中-->
      <!--<slot :style="activityStyle" name="item-text"></slot>-->
    </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props:{
      // 从父组件获取跳转路径
      path:{
        type: String,
      },
      // 从父组件获取颜色来让子组件文件颜色变化
      activeColor:{
        type: String,
        default: 'blue'
      }
    },
    computed:{
      // 结合路由组件来做确认跳转的时的图片变，因为this.path是通过父组件传入
      // 而当你每次跳转的时候$route.path可以获取你活跃路由，所以根据此来判断
      isActive(){
        return this.$route.path.includes(this.path) != false
      },
      activityStyle(){
        return this.isActive ? {color: this.activeColor} : {}
      }
    },
    methods:{
      // 触发跳转事件来激活案件的颜色切换
      itemClick(){
        this.$router.push(this.path)
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }

  .tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
</style>
