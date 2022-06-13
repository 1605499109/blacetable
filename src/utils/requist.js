import axios from 'axios'
import router from '@/router/index'
const instance = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 5000

})
instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token') || ''
  if (token) {
    // 设置请求头
    config.headers.Authorization = token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  if (response.data.status === 401) {
    router.push({ name: 'login' })
  }
  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})
export default instance
