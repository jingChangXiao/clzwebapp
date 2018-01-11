import {api} from '@/assets/js/api'
import {APIS} from '@/assets/js/config'
import * as types from '../mutation-types'
const state = {
  // 登录时拿到的userInfo 信息不全
  userInfo: {
    url: APIS.login,
    param: {
      username: '',
      password: ''
    },
    data: {},
    type: 'POST'
  },
  // 通过接口拿到详细的用户信息
  userDetail: {
    url: APIS.userInfo,
    data: {},
    type: 'GET'
  }
}
const getters = {
}
const mutations = {
  [types.SET_USER_INFO] (state, data) {
    state.userInfo.data = data
  },
  [types.SET_USER_DETAIL] (state, data) {
    state.userDetail.data = data
  }
}
const actions = {
  [types.ACTION_LOGIN] ({commit, state}, param) {
    return new Promise((resolve, reject) => {
      let loginInfo = {url: state.userInfo.url, method: state.userInfo.type, param}
      api.initAjax(loginInfo, true).then((rtData) => {
        if (rtData.status || rtData.access_token) {
          commit(types.SET_USER_INFO, rtData)
          resolve(rtData)
        } else {
          reject(rtData.message)
        }
      }, (rtData) => {
        reject(rtData.message)
      })
    })
  },
  [types.ACTION_GET_USER_DETAIL] ({commit, state}) {
    return new Promise((resolve, reject) => {
      let userDetail = {url: state.userDetail.url, method: state.userDetail.type}
      api.initAjax(userDetail).then((rtData) => {
        if (rtData.status || rtData.access_token) {
          commit(types.SET_USER_DETAIL, rtData.data)
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
