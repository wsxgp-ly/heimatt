// 封装所有与频道相关的网络请求
// 1-导入 http
import http from '../utils/http.js'
// 封装一个方法来得到用户的频道数据
export function apiGetchannel () {
  return http({
    url: '/user/channels',
    method: 'GET'
  })
}
