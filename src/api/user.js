// 封装所有用户相关的网络请求

// 导入自己封装好的aixos
import http from '../utils/http'

// 封装一个登录的方法
export function apiLogin ({ mobile, code }) {
  return http({
    url: '/authorizations ',
    method: 'POST',
    data: {
      mobile: mobile,
      code: code
    }
  })
}
// 封装一个联想的方法
export function apiThink (key) {
  return http({
    url: `/suggestion?q=${key}`,
    method: 'GET'
  })
}

// 封装一个关注用户的接口
export function apiFollowUser (autid) {
  return http({
    url: '/user/followings',
    method: 'POST',
    data: {
      target: autid
    }
  })
}

// 封装一个取消关注用户的接口
export function apiDisFollowUser (autid) {
  return http({
    url: `/user/followings/${autid}`,
    method: 'DELETE'
  })
}
