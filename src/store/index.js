import Vue from 'vue'
import Vuex from 'vuex'
import userInfo from './modules/user-info'
import workList from './modules/work-list'
import process from './modules/process'
import base from './modules/base.js'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    userInfo,
    base,
    workList,
    process
  }
})
