import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login'
import Layout from '@/views/layout'
import MyOrder from '@/views/myorder'
import Pay from '@/views/pay'
import Prodetail from '@/views/prodetail'
import Search from '@/views/search'
import SearchList from '@/views/search/list'

import Cart from '@/views/layout/cart'

import Home from '@/views/layout/home'

import Category from '@/views/layout/category'

import user from '@/views/layout/user'
import store from '@/store'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [
        { path: '/home', component: Home },
        { path: '/category', component: Cart },
        { path: '/cart', component: Category },
        { path: '/user', component: user }
      ]
    },
    { path: '/myorder', component: MyOrder },
    { path: '/pay', component: Pay },
    // 动态路由传参，确认将来是哪个商品，参数中携带
    { path: '/prodetail/:id', component: Prodetail },
    { path: '/search', component: Search },
    { path: '/searchlist', component: SearchList }
  ]
})
// 所有的路由在真正被访问到之前(解析渲染对应组件页面前),都会先经过全局前置守卫
// 全局前置导航守卫
// to:从哪里去,到哪里去的完整路由信息对象(路径，参数)
// from:'从哪里来，从哪里的路由信息对象（路径，参数)
// 3.next()是否放行
// 如果next()调用，就是放行,放行到to指定的路径
// next(路径）拦截到某个路径页面,拦截到next配置的路径

// 定义一个数组,存放所有需要权限的页面

const authUrls = ['/pay', '/myorder']
router.beforeEach((to, from, next) => {
  // console.log(to, from, next)
  // 看to.path是否出现在authUrls中

  if (!authUrls.includes(to.path)) {
    // 非权限页面,直接放行
    next()
    return
  }
  // 是权限页面,需要判断token
  const token = store.getters.token
  if (token) {
    next()
  } else {
    next('/login')
  }
})
export default router
