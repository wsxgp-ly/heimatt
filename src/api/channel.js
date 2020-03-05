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
// 封装一个得到所有频道的数据接口
export function apiGetAllchannel () {
  return http({
    url: '/channels',
    method: 'GET'
  })
}
// 封装 一个修改频道数据的方法
export function apiResetChannel (channels) {
  return http({
    url: '/user/channels',
    method: 'PUT',
    data: {
      channels: channels
    }
  })
}
