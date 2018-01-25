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
    // 门店管理 教练管理 车辆管理 片区选择
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
    teaching_status: [],
    // 车辆管理 使用状态
    vehicle_status: [],
    // 车辆管理 车龄
    vehicle_age: [],
    // 车辆管理 是否备案
    isFile: [{text: '全部', value: ''}, {text: '是', value: '1'}, {text: '否', value: '0'}],
    // 学员管理 学车进度
    learn_driver_progress: [],
    // 学员管理 学员状态
    student_status: []
  },
  searchSelectCacheName: [
    'store_operating_status',
    'market_class_study_type',
    'market_class_high_flag',
    'market_class_local_flag',
    'market_goods_attribute',
    'market_check_way',
    'teaching_status',
    'vehicle_status',
    'vehicle_age',
    'learn_driver_progress',
    'student_status'
  ],
  // 缓存全局需要通过 ajax 的字典数据
  ajaxCacheData: {
    // 教练管理 所属门店
    findAreaAndStoreNamesCascade: {
      flag: false,
      url: APIS.coachManage.findAreaAndStoreNamesCascade,
      data: [],
      param: {}
    },
    // 教练管理 带教职位
    getTeachingTypeListMes: {
      flag: false,
      url: APIS.coachManage.getTeachingTypeListMes,
      data: [],
      param: {}
    },
    // 教练管理 带教班别
    getClassList: {
      flag: false,
      url: APIS.coachManage.getClassList,
      data: [],
      param: {}
    },
    // 车辆管理 使用性质
    selectList: {
      flag: false,
      url: APIS.carManage.selectList,
      data: [],
      param: {}
    }
  }
}
function handleCacheSelectData (data) {
  return [{value: '', text: '全部'}, ...Object.keys(data).map(
    item => ({value: item, text: data[item]})
  )]
}
function getChildren (data) {
  return data.map(item => ({value: item.areaId, text: item.areaName}))
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
      state.searchSelectData.area = [{value: '', text: '全部'}, ...data.areaList.map(item => ({value: item.areaId, text: item.areaName}))]
    }
  },
  [types.SET_SEARCH_SELECT_CACHE_DATA] (state, data) {
    if (data) {
      state.searchSelectCacheName.forEach(item => {
        state.searchSelectData[item] = handleCacheSelectData(data[item])
      })
    }
  },
  [types.SET_AJAX_CACHE_SELECT] (state, data) {
    if (data) {
      state.ajaxCacheData[data.key].data = data.data
      state.ajaxCacheData[data.key].flag = true
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
  [types.ACTION_AJAX_CACHE_SELECT] ({commit, state}, data) {
    return new Promise((resolve, reject) => {
      let dataStr = `,${data.join(',')},`
      let findAreaAndStoreNamesCascade = 'findAreaAndStoreNamesCascade'
      if (dataStr.indexOf(`,${findAreaAndStoreNamesCascade},`) >= 0 && !state.ajaxCacheData[findAreaAndStoreNamesCascade].flag) {
        api.initAjax({url: state.ajaxCacheData[findAreaAndStoreNamesCascade].url, method: 'POST'}).then((rtData) => {
          if (rtData.status) {
            let list = rtData.data.map(item => ({value: item.areaId, text: item.areaName, children: getChildren(item.childrenStore)}))
            commit(types.SET_AJAX_CACHE_SELECT, {key: findAreaAndStoreNamesCascade, data: [{value: '', text: '全部', children: []}, ...list]})
            resolve(rtData)
          } else {
            reject(rtData.message)
          }
        }, (rtData) => {
          reject(rtData.message)
        })
      }
      let getTeachingTypeListMes = 'getTeachingTypeListMes'
      if (dataStr.indexOf(`,${getTeachingTypeListMes},`) >= 0 && !state.ajaxCacheData[getTeachingTypeListMes].flag) {
        api.initAjax({url: state.ajaxCacheData[getTeachingTypeListMes].url, method: 'POST'}).then((rtData) => {
          if (rtData.status) {
            let list = rtData.data.map(item => ({value: item.id, text: item.dutyName}))
            commit(types.SET_AJAX_CACHE_SELECT, {key: getTeachingTypeListMes, data: [{value: '', text: '全部'}, ...list]})
            resolve(rtData)
          } else {
            reject(rtData.message)
          }
        }, (rtData) => {
          reject(rtData.message)
        })
      }
      let getClassList = 'getClassList'
      if (dataStr.indexOf(`,${getClassList},`) >= 0 && !state.ajaxCacheData[getClassList].flag) {
        api.initAjax({url: state.ajaxCacheData[getClassList].url, method: 'GET'}).then((rtData) => {
          if (rtData.status) {
            let list = rtData.data.map(item => ({value: item.id, text: item.name}))
            commit(types.SET_AJAX_CACHE_SELECT, {key: getClassList, data: [{value: '', text: '全部'}, ...list]})
            resolve(rtData)
          } else {
            reject(rtData.message)
          }
        }, (rtData) => {
          reject(rtData.message)
        })
      }
      let selectList = 'selectList'
      if (dataStr.indexOf(`,${selectList},`) >= 0 && !state.ajaxCacheData[selectList].flag) {
        api.initAjax({url: state.ajaxCacheData[selectList].url, method: 'GET'}).then((rtData) => {
          if (rtData.status) {
            let list = []
            if (rtData.data.options) {
              list = rtData.data.options.map(item => ({value: item.value, text: item.label}))
            }
            commit(types.SET_AJAX_CACHE_SELECT, {key: selectList, data: [{value: '', text: '全部'}, ...list]})
            resolve(rtData)
          } else {
            reject(rtData.message)
          }
        }, (rtData) => {
          reject(rtData.message)
        })
      }
    })
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
