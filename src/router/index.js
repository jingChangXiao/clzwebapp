import Vue from 'vue'
import Router from 'vue-router'
import login from '../pages/login/index'
import test from '../pages/test'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '*',
      redirect: '/login'
    }
  ]
})
