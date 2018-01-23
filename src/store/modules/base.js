import {api} from '@/assets/js/api'
import {APIS} from '@/assets/js/config'
import * as types from '../mutation-types'
const state = {
  appName: '喱喱驾校',
  loading: {
    isClose: true,
    flag: false
  },
  menu: {
    selectHomeMenu: '/home/message'
  },
  dictCacheData: {
    data: {}
  },
  loadOrgCache: {
    data: {}
  },
  // 解析字典数据
  searchSelectData: {
    // 门店管理 教练管理 片区选择
    area: [],
    // 门店管理 营业状态
    store_operating_status: [],
    // 班别管理 学车形式
    market_class_study_type: [],
    // 班别管理 是否高端班
    market_class_high_flag: [],
    // 班别管理 外地班属性
    market_class_local_flag: [],
    // 商品管理 商品属性
    market_goods_attribute: [],
    // 商品管理 状态
    disable: [{text: '全部', value: ''}, {text: '上架', value: false}, {text: '下架', value: true}],
    // 商品管理 描述性商品
    describeGoods: [{text: '全部', value: ''}, {text: '无', value: false}, {text: '有', value: true}],
    // 商品管理 核销方式
    market_check_way: [],
    // 商品管理 退费规则
    refund: [{text: '全部', value: ''}, {text: '不可退费', value: false}, {text: '可退费', value: true}],
    // 教练管理 带教状态
    teaching_status: []
  },
  searchSelectCacheName: [
    'store_operating_status',
    'market_class_study_type',
    'market_class_high_flag',
    'market_class_local_flag',
    'market_goods_attribute',
    'market_check_way',
    'teaching_status'
  ],
  // 缓存全局需要通过 ajax 的字典数据
  ajaxCacheData: {
    findAreaAndStoreNamesCascade: {
      flag: false,
      url: APIS.coachManage.findAreaAndStoreNamesCascade,
      data: [],
      param: {}
    }
  }
}
function handleCacheSelectData (data) {
  let list = []
  Object.keys(data).forEach(item => {
    list.push({value: item, text: data[item]})
  })
  list.unshift({value: '', text: '全部'})
  return list
}
function getChildren (data) {
  return data.map(item => {
    return {value: item.areaId, text: item.areaName}
  })
}
const getters = {
}
const mutations = {
  [types.SET_LOADING_FLAG] (state, data) {
    state.loading.flag = data
  },
  [types.SET_HOME_MENU_FLAG] (state, data) {
    state.menu.selectHomeMenu = data
  },
  [types.SET_LOAD_DICT_CACHE] (state, data) {
    state.dictCacheData.data = data
  },
  [types.SET_LOAD_ORG_CACHE] (state, data) {
    state.loadOrgCache.data = data
  },
  [types.SET_SEARCH_SELECT_DATA] (state, data) {
    if (data) {
      let areaList = []
      data.areaList.forEach((item) => {
        areaList.push({value: item.areaId, text: item.areaName})
      })
      areaList.unshift({value: '', text: '全部'})
      state.searchSelectData.area = areaList
    }
  },
  [types.SET_SEARCH_SELECT_CACHE_DATA] (state, data) {
    if (data) {
      state.searchSelectCacheName.forEach(item => {
        state.searchSelectData[item] = handleCacheSelectData(data[item])
      })
    }
  }
}
const actions = {
  [types.ACTION_GET_LOAD_DICT_CACHE] ({commit, state}, param) {
    return new Promise((resolve, reject) => {
      let loadDictCache = {url: APIS.loadDictCache, method: 'get', param}
      api.initAjax(loadDictCache).then((rtData) => {
        if (rtData.status) {
          commit(types.SET_LOAD_DICT_CACHE, rtData.data)
          commit(types.SET_SEARCH_SELECT_CACHE_DATA, rtData.data)
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
          commit(types.SET_SEARCH_SELECT_DATA, rtData.data)
          resolve(rtData)
        } else {
          reject(rtData.message)
        }
      }, (rtData) => {
        reject(rtData.message)
      })
    })
  },
  [types.ACTION_FIND_AREA_STORE_NAMES] ({commit, state}) {
    return new Promise((resolve, reject) => {
      let findAreaAndStoreNamesCascade = {url: state.ajaxCacheData.findAreaAndStoreNamesCascade.url, method: 'POST'}
      api.initAjax(findAreaAndStoreNamesCascade).then((rtData) => {
        if (rtData.status) {
          console.log('ACTION_FIND_AREA_STORE_NAMES', rtData.data)
          let list = []
          list = rtData.data.map(item => {
            return {value: item.areaId, text: item.areaName, children: getChildren(item.childrenStore)}
          })
          console.log(list)
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
