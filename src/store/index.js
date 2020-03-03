import Vue from 'vue'
import Vuex from 'vuex'
import { getLocal } from '../utils/mylocal'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用来保存用户的登录信息
    // 当打开页面时,如果localstorage 中有数据,应该将数据中的内容读取出来 赋值给user
    // user: JSON.parse(window.localStorage.getItem('userInfo')) || {}
    user: getLocal('userInfo') || {}
  },
  mutations: {
    // 用来操作  state 中的数据
    // 定义一个操作 user 的方法
    setUser: function (state, payloade) {
      // 将得到的用户的  token & refresh_token  进行接收,接收到Payload中
      state.user = payloade
    }
  },
  actions: {
  }
})
