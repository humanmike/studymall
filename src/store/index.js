import Vue from 'vue'
import Vuex from 'vuex'

// 导入实例中需要得Key
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

// 注册插件
Vue.use(Vuex)

const state = {
  shopCartList:[]
}

// 实例化插件
const store = new Vuex.Store({
  // 静态数据存放
  state,
  // 同步数据操作
  mutations,
  // 异步或者复杂数据操作
  actions,
  // 类似计算属性
  getters,
})

// 导出插件供App.vue挂载
export default store
