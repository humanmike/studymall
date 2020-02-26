// 导入常量修改函数名方便统一管理
import {
  ADD_SHOP_CART,
  ADD_COUNTER,
} from './mutations_types'

export default {
  // 同步修改数据
  // mutations里面的的方法一个方法只对应做一件事情
  // 因为当你在浏览器使用vueTools调试的时候，如果方法做的事情很多，无法准确监测到数据变化
  // 如果操作较为复杂，或者是异步操作应当在actions里面处理

  // 为购物车添加新数据
  [ADD_SHOP_CART](state,payload){
    state.shopCartList.push(payload)
  },
  // 为已存在购物车的数据修改数量
  [ADD_COUNTER](state,payload){
    // 因为引用值关系直接修改，最后相关得映射都会被修改
    payload.count++
  }

}
