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
        }
      ]
    }
  ]
})

export default router
