// 使用常量函数名调用
import {
  ADD_SHOP_CART,
  ADD_COUNTER,
} from './mutations_types'


export default {
  // 复杂操作及异步操作处理
  // 添加或者修改购物车内容
  optionAddShopCart(context, payload){
    // 通过find函数去寻找是否购物车存在相同信息
    // 如果存在会返回该数组内的具体内容
    // （注意因为数组和对象都是引用值,所以就算是其它值在引用 意思是当A修改得时候B也会跟着被修改）
    let oldProduct = context.state.shopCartList.find((n) => n.iid == payload.iid)
    if (oldProduct){
      // 因为是引用值得关系所以直接把获取到相同值直接拿出来给同步函数修改即可
      context.commit(ADD_COUNTER,oldProduct)
    }else{
      payload.count = 1
      payload.isCheck = true
      context.commit(ADD_SHOP_CART,payload)
    }
  }
}
    
