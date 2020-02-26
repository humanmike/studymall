export default  {
  // 获取列表中的count来计算处真正商品的个数
  shopCartCount(state){
    return state.shopCartList.reduce((totalVal, currentVal) => {
      return totalVal + currentVal.count
    },0)
  },
  // 获取vuex用户购物车列表全部数据
  shopCartData(state){
    return state.shopCartList
  }
}
