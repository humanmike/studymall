import Vue from 'vue'
import App from './App.vue'
// 导入路由插件
import router from './router'
// 导入vuex插件
import store from './store'
// 导入自己编写Toast插件
import toast from './components/common/toast'

Vue.config.productionTip = false

// 创建事件总线
Vue.prototype.$bus = new Vue()

// 安装自己的Toast插件
Vue.use(toast)

new Vue({
  render: h => h(App),
  // 挂载路由
  router,
  // 挂载vuex
  store,
}).$mount('#app')
