// 封装一个插件  用来验证是否登录
// 导入 store
import store from '../store'
// 导入 router
import router from '../router'

// 创建一个对象
var MyPlugin = {}

// 添加一个 install 方法
MyPlugin.install = function (Vue) {
  // Vue 就是Vue.use 中的 Vue
  // 给 Vue 添加一个 $login 方法
  Vue.prototype.$login = function () {
    // 等到用户的登录信息
    var token = store.state.user.tokne
    // 判断是否登录
    if (!token) {
      // 进入这里说明没登录,那就跳转到登录页面
      router.push('/checkLogin')
      return false
    }
    return true
  }
}

// 导出  暴露出去
export default MyPlugin
