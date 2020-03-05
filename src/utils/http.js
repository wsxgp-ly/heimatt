// 封装axios
// 导入axios
import axios from 'axios'
// 导入 store
import store from '../store'
// 导入 json-bigint
import jsonbig from 'json-bigint'

const instance = axios.create({
  // 设置基准地址
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0',
  // 处理接收到的服务器响应信息
  transformResponse: [function (data) {
    try {
      // 优先由这个函数来处理
    // data: 就是从服务器中响应回来的数据
      return jsonbig.parse(data)
    } catch (err) {
      return data
    }
  }]
})

// 设置拦截器
instance.interceptors.request.use(function (config) {
  // 判断store 中是否存在 token
  // 得到store 下user中的 token
  const token = store.state.user.token
  // 判断 token是否存在
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
instance.interceptors.response.use(function (response) {
  return response
}, function (error) {
  return Promise.reject(error)
})

// 暴露出去
export default instance
