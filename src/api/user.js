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
