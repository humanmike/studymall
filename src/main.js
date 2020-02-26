import Vue from 'vue'
import App from './App.vue'
// 导入路由插件
import router from './router'
// 导入vuex插件
import store from './store'

Vue.config.productionTip = false

// 创建事件总线
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  // 挂载路由
  router,
  // 挂载vuex
  store,
}).$mount('#app')
