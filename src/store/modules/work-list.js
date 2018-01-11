import {APIS} from '@/assets/js/config'
const state = {
  // 门店管理
  searchMStoreByCondition: {
    data: [],
    searchObject: {
      p: 1,
      s: 10,
      areaId: '',
      areaIdName: ''
    },
    url: APIS.storeManage.searchMStoreByCondition,
    isEmpty: false,
    hasmore: true,
    scroll: {},
    type: 'POST'
  },
  // 教练管理
  getCoachList: {
    data: [],
    searchObject: {
      p: 1,
      s: 10,
      areaId: '',
      areaIdName: ''
    },
    url: APIS.coachManage.getCoachList,
    isEmpty: false,
    hasmore: true,
    scroll: {},
    type: 'POST'
  },
  // 车辆管理
  carInfoList: {
    data: [],
    searchObject: {
      p: 1,
      s: 10,
      areaId: '',
      areaIdName: ''
    },
    url: APIS.carManage.carInfoList,
    isEmpty: false,
    hasmore: true,
    scroll: {},
    type: 'POST'
  },
  // 学员管理
  classList: {
    data: [],
    searchObject: {
      p: 1,
      s: 10,
      areaId: '',
      areaIdName: ''
    },
    url: APIS.findCertServiceInfoPageList.findCertServiceInfoPageList,
    isEmpty: false,
    hasmore: true,
    scroll: {},
    type: 'POST'
  },
  // 班别管理
  searchClassList: {
    data: [],
    searchObject: {
      p: 1,
      s: 10,
      areaId: '',
      areaIdName: ''
    },
    url: APIS.searchClassManage.searchClassList,
    isEmpty: false,
    hasmore: true,
    scroll: {},
    type: 'POST'
  }
}
const getters = {}
const mutations = {}
const actions = {}
export default {
  state,
  getters,
  actions,
  mutations
}
