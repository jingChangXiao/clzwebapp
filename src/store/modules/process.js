import {APIS} from '@/assets/js/config'
const state = {
  // 门店管理
  processData: {
    data: [],
    searchObject: {
      p: 1,
      s: 10,
      flag: '1',
      areaIdName: '',
      areaId: '',
      status: '',
      statusName: ''
    },
    url: APIS.processCenter.findApplyListByState,
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
