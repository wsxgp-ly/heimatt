// 用来封装所有与文章相关的网络请求

// 导入http
import http from '../utils/http'

// 封装一个得到频道下文章的方法
export function apiGetArticle (channelid) {
  return http({
    // 由于 这个路径的url 与 BaseURL 不一样  这里需要输入完整的地址
    url: `http://ttapi.research.itcast.cn/app/v1_1/articles?channel_id=${channelid}&timestamp=${Date.now()}&with_top=0`,
    method: 'GET'
  })
}

// 封装一个不喜欢的文章的方法
export function apiDisLike (artid) {
  return http({
    url: '/article/dislikes',
    method: 'POST',
    data: {
      target: artid
    }
  })
}

// 封装一个举报文章的方法
export function apiReport ({ artid, type }) {
  return http({
    url: '/article/reports',
    method: 'POST',
    data: {
      target: artid,
      type: type,
      remark: ''
    }
  })
}

// 封装一个搜索的方法

export function apiGetSearch ({ page, perpage, key }) {
  return http({
    url: `/search?page=${page}&per_page${perpage}&q=${key}`,
    method: 'GET'
  })
}
