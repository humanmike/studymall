import axios from 'axios'

// 封装网络请求
export function request(config) {
  const instance = axios.create({
    baseURL: 'http://106.54.54.237:8000/api/hy',
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
