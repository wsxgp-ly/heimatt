// 封装所有与评论有关的操作
// 导入 http
import http from '../utils/http'

// 封装一盒获取文章评论的方法
export function apiGetArticleComment ({ artid, offset }) {
  return http({
    url: '/comments',
    method: 'GET',
    // 传入参数
    params: {
      type: 'a',
      source: artid,
      offset: offset,
      limit: 10
    }
  })
}

// 封装一个提交文章评论的方法
export function apiAddArticleComment ({ artid, content }) {
  return http({
    url: '/comments',
    method: 'POST',
    data: {
      target: artid,
      content: content
    }
  })
}

// 封装一个得到评论回复的方法
export function apiGetReply ({ comid, offset }) {
  return http({
    url: '/comments',
    method: 'GET',
    params: {
      type: 'c',
      source: comid,
      offset: offset,
      limit: 10
    }
  })
}

// 封装一个方法来添加评论的回复
export function apiAddCommentReply ({ commid, content, artid }) {
  return http({
    url: '/comments',
    method: 'POST',
    data: {
      target: commid,
      content: content,
      art_id: artid
    }
  })
}
