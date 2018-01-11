import {api} from '@/assets/js/api'
import {APIS} from '@/assets/js/config'
import * as types from '../mutation-types'
const state = {
  menu: {
    selectHomeMenu: '/home/message'
  },
  dictCacheData: {
    data: {}
  },
  loadOrgCache: {
    data: {}
  }
}
const getters = {
}
const mutations = {
  [types.SET_HOME_MENU_FLAG] (state, data) {
    state.menu.selectHomeMenu = data
  },
  [types.SET_LOAD_DICT_CACHE] (state, data) {
    state.dictCacheData.data = data
  },
  [types.SET_LOAD_ORG_CACHE] (state, data) {
    state.loadOrgCache.data = data
  }
}
const actions = {
  [types.ACTION_GET_LOAD_DICT_CACHE] ({commit, state}, param) {
    return new Promise((resolve, reject) => {
      let loadDictCache = {url: APIS.loadDictCache, method: 'get', param}
      api.initAjax(loadDictCache).then((rtData) => {
        if (rtData.status) {
          commit(types.SET_LOAD_DICT_CACHE, rtData.data)
          resolve(rtData)
        } else {
          reject(rtData.message)
        }
      }, (rtData) => {
        reject(rtData.message)
      })
    })
  },
  [types.ACTION_GET_LOAD_ORG_CACHE] ({commit, state}, param) {
    return new Promise((resolve, reject) => {
      let loadOrgCache = {url: APIS.loadOrgCache, method: 'get', param}
      api.initAjax(loadOrgCache).then((rtData) => {
        if (rtData.status) {
          commit(types.SET_LOAD_ORG_CACHE, rtData.data)
          resolve(rtData)
        } else {
          reject(rtData.message)
        }
      }, (rtData) => {
        reject(rtData.message)
      })
    })
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
