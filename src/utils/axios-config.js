// // 对axios进行处理
import axios from 'axios'
import router from '../premission'
import { Message } from 'element-ui'
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
  let status = err.response.status
  let message = '未知错误'
  switch (status) {
    case 400:
      message = '请求参数错误'
      break
    case 403:
      message = '403 refresh_token未携带或已过期'
      break
    case 507:
      message = '服务器数据异常'
      break
    case 401:
      message = 'token过期'
      router.push('/login')
      break
    case 404:
      message = '手机号码不正确'
      break
    default:
      break
  }
  Message({ message })
  return new Promise(function () {})// 返回一个空的，是为了里面的then和catch都不执行
})
export default {
  install (abc) {
    abc.prototype.$http = axios
  }
}
