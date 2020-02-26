import {request} from "./request"

// 详情页数据请求
export function getDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}

// 获取推荐商品接口
export function getRecommend() {
  return request({
    url: '/recommend',
  })
}

// 处理详情页需要数据
// 商品信息
export class Goods{
  constructor(itemInfo,columns,shopInfo){
    // 商品简述
    this.desc = itemInfo.desc
    // 商品标题
    this.title = itemInfo.title
    // 现价格
    this.newPrice = itemInfo.price
    // 老价格
    this.oldPrice = itemInfo.price
    // 真是价格
    this.realPrice = itemInfo.lowNowPrice
    // 现价格解释
    this.discountDesc = itemInfo.discountDesc
    // # 销量 收藏(返回数组)
    this.columns = columns
    // 补运费 全国包邮 七天无理由退款(数组)
    this.services = shopInfo.services
  }
}

// 商家信息
export class Shop{
  constructor(shopInfo){
    // 商家Logo
    this.logo = shopInfo.shopLogo
    // 商家名称
    this.name = shopInfo.name
    // 商家粉丝
    this.fnas = shopInfo.cFans
    // 商家总销量
    this.sells = shopInfo.cSells
    // 商家评分(数组)
    this.score = shopInfo.score
    // 商家好评
    this.goodsCount = shopInfo.cGoods
  }
}

// 商品详情明细
export class GoodsParam{

  constructor(info, rule){
    // 这个数据有时候可能没有值，所以没有的时候返回一个''
    this.image = info.images ? info.images[0] : ''
    this.infos = info.set
    this.sizes = rule.tables

  }
}
