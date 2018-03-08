import vue from 'vue'
import Vuex from 'vuex'
import base from './module/base'
vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    base
  }
})
