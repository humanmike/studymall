import axios from 'axios'

// 封装网络请求
export function request(config) {
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000/api/wh',
    timeout: 5000
  })

  // 响应后拦截
  instance.interceptors.response.use( res => {
    return res.data
  }, err => {
    console.log(err);
  })
  return instance(config)
}
