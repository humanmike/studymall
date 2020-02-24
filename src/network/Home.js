// 针对每个组件进行再次封装，目的为了一个.vue针对一个.js文件
// 这样子好处在于当出现问题的时候只需要修改该js文件

import {request} from "./request"

// 获取导航栏数据
export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

// 获取首页货品数据
export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params:{
      type, page
    }
  })
}
