import axios from 'axios'
import { Message } from 'element-ui'
import JSONBig from 'json-bigint'

axios.defaults.transformResponse = [function (data) {
  return data ? JSONBig.parse(data) : {}
}]

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 将后台接口的地址给axios的baseURL

axios.interceptors.request.use(config => {
  // 2. 从localStronage中取出用户登录信息(包含token)
  let userInfo = window.localStorage.getItem('user-info')
  // 3. 如果存在 则取出token不存在则为null
  let token = userInfo ? JSON.parse(userInfo).token : null
  // 4. 将headers中赋值 后端需要的token身份信息，也就是携带令牌
  config.headers.Authorization = `Bearer ${token}`

  // 在发起请求时做的业务处理
  return config
}, (error) => {
  // 对请求失败做处理
  return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做处理
  return response.data ? response.data : {}
}, function (error) {
  // 对响应错误做处理
  let code = error.response ? error.response.status : '' // 获取错误的状态码
  let message = ''
  switch (code) {
    case 400:
      message = '请求参数错误'
      break
    case 403:
      message = '用户非实名认证用户'
      break
    case 507:
      message = '服务器数据库异常'
      break
    case 404:
      message = '手机号码不正确'
      break
    case 401:
      // 针对token过期或者失效的特殊处理
      message = 'token过期或未传'
      window.localStorage.clear() // 只清除本项目的缓存
      window.location.hash = '#/login' // 跳转到登录页
      break
    default:
      message = '未知错误!'
      break
  }
  Message({ message, type: 'warning' })
  return new Promise(function () {})
  // 如果不return 就会抛出异常 控制台会看到错误
  // 返回一个新的promise对象，就意味着一个新的没有错误的promise返回了   之前的错误被终止了
})
export default axios
