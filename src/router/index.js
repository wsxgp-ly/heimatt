import Vue from 'vue'
// 导入路由
import Router from 'vue-router'
import UseVant from '../views/usevant.vue'
// 导入login 页面
import Login from '../views/login/index.vue'
// 导入home 首页
import Home from '../views/home/home.vue'
// 导入 layout
import Layout from '../views/layout'
// 导入 我的 my 页面
import My from '../views/my'
// 导入 Search 页面
import Search from '../views/search'
// 导入 searchResult
import SearchResult from '../views/searchResult'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/usevant',
      component: UseVant
    },
    // 登录路由
    {
      path: '/login',
      component: Login
    },
    // 父路由  layout
    {
      path: '/layout',
      component: Layout, // 其他在tabBar中的页面都是它的子路由
      children: [
        // 添加首页
        {
          path: '/home',
          component: Home
        },
        // 添加  my 页面
        {
          path: '/my',
          component: My
        },
        // 添加搜索页面
        {
          path: '/search',
          component: Search
        }
      ]
    },
    // 添加一个 searchResult 路由
    {
      path: '/searchResult/:key',
      component: SearchResult
    }
  ]
})

export default router
