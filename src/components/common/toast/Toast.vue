<template>
    <div class="toast" v-show="isShow">
      <div>{{message}}</div>
    </div>
</template>

<script>
  export default {
    name: "Toast",
    data(){
      return {
        isShow: false,
        message: '',
      }
    },
    methods:{
      // 封装好的组件方法
      showToast(message='Toast desc', duration=5000){
        this.isShow = true
        this.message = message
        setTimeout(() => {
          this.isShow = false
          this.message = ''
        },duration)
      }
    }
  }
</script>

<style scoped>
  .toast{
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 999;
    transform: translate(-50%, -50%);
    padding: 8px 10px;

    color: #fff;
    background-color: rgba(0,0,0,.75);
  }
</style>
