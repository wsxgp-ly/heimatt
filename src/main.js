import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入 vant
// 导入 Lazyload 图片懒加载
import Vant, { Lazyload } from 'vant'
// 导入 vant 的样式
import 'vant/lib/index.css'
// 导入字体图标
import './style/index.css'
// 导入 dayjs
import dayjs from 'dayjs'
// 使用dayjs插件
import relativeTime from 'dayjs/plugin/relativeTime'
// 使用dayjs的语言包
import 'dayjs/locale/zh-cn'
// 导入 MyPlugin
import MyPlugin from './utils/myplugin'

// 使用vant
Vue.use(Vant)
// 使用Lazyload 图片懒加载
Vue.use(Lazyload)
// 使用 MyPlugin 验证是否登录
Vue.use(MyPlugin)

Vue.config.productionTip = false

// 使用dayjs
// 封装一个时间过滤器
// 扩展插件
dayjs.extend(relativeTime)
// 使用语言包
dayjs.locale('zh-cn')
Vue.filter('myrelativeTime', function (value) {
  // 这个value  就是使用这个锅炉器的字符串
  return dayjs().from(dayjs(value))
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
