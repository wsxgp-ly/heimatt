// 封装axios
// 导入axios
import axios from 'axios'
// 导入 store
import store from '../store'
// 导入 json-bigint
import jsonbig from 'json-bigint'
// 导入 操作 localStorage 的方法
import { setLocal } from './mylocal'

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

const instance2 = axios.create({
  // 设置基准地址
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0'
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
}, async function (error) {
  // 得到错误处理的状态
  const status = error.response.status
  // 判断是否是401
  if (status === 401) {
    // 说明token 有问题  那么就更新token
    // 得到当前用户的 refresh_token
    const refreshtoken = store.state.user.refresh_token
    // 将refresh_token 提交到服务器 得到新的token
    const res = await instance2({
      url: '/authorizations',
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${refreshtoken}`
      }
    })
    //  用心的token 将老 token 替换
    // 创建一个 新的token
    const newUser = {
      token: res.data.data.token,
      refresh_token: refreshtoken
    }
    // 保存到  vuex中
    store.commit('setUser', newUser)
    // 保存到本地
    setLocal('userInfo', newUser)
    // toke你 已经更新  需要再发生一条请求去完成之前未完成的请求
    // 未完成的配置信息在: error.config  中
    return instance(error.config)
  }
  return Promise.reject(error)
})

// 暴露出去
export default instance
