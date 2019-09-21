// // 对axios进行处理
import axios from 'axios'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
// 请求拦截，在请求发给后台之前，将token塞进去
axios.interceptors.request.use(function (config) {
  let token = localStorage.getItem('user-token')
  config.headers.Authorization = `Bearer ${token}`
  return config
}, function (err) {
  return Promise.reject(err)
})
// 响应拦截，在数据响应回来之前，将返回来的数据进行处理
axios.interceptors.response.use(function (response) {
  return response.data ? response.data : {}
}, function (err) {
  return Promise.reject(err)
})
export default {
  install (abc) {
    abc.prototype.$http = axios
  }
}
