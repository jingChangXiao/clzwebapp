import Vue from 'vue'
import Router from 'vue-router'
import {home} from './home/index'
import error from '../components/error/index.vue'
import login from '../components/login/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/error',
      name: 'error',
      component: error
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      component: home.menu,
      children: [
        {
          path: 'message',
          component: home.message
        },
        {
          path: 'work',
          component: home.work
        },
        {
          path: 'process',
          component: home.process
        },
        {
          path: 'user',
          component: home.user
        }
      ]
    },
    // 错误路径重定向到首页
    {
      path: '*',
      redirect: '/login'
    }
  ]
})
