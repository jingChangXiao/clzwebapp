import {APIS} from '@/assets/js/config'
const state = {
  // 门店管理
  searchMStoreByCondition: {
    data: [],
    searchObject: {
      p: 1,
      s: 10,
      areaId: '',
      areaIdName: '',
      name: '',
      code: ''
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
      name: '',
      areaId: '',
      areaIdName: '',
      teachingStatus: '',
      teachingStatusName: '',
      storeIdName: '',
      storeId: '',
      teachingDutyIdName: '',
      teachingDutyId: '',
      classId: '',
      classIdName: ''
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
      areaIdName: '',
      usePropertiesId: '',
      usePropertiesIdName: '',
      useStatus: '',
      useStatusName: '',
      plateNumber: '',
      userName: '',
      isFile: '',
      isFileName: '',
      coty: '',
      cotyNmae: ''
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
      learnDriverProgressName: '',
      learnDriverProgress: '',
      storeId: '',
      storeIdName: '',
      userName: '',
      areaId: '',
      areaIdName: '',
      modelCarId: '',
      modelCarIdName: '',
      studentStatus: '',
      studentStatusName: ''
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
      driveType: '',
      driveTypeName: '',
      studyType: '',
      studyTypeName: ''
    },
    url: APIS.searchClassManage.searchClassList,
    isEmpty: false,
    hasmore: true,
    scroll: {},
    type: 'POST'
  },
  // 商品管理
  productList: {
    data: [],
    searchObject: {
      p: 1,
      s: 10,
      goodsName: '',
      attribute: '',
      attributeName: '',
      disable: '',
      disableName: '',
      describeGoods: '',
      describeGoodsName: '',
      refund: '',
      refundName: '',
      checkWay: '',
      checkWayName: ''
    },
    url: APIS.productManage.searchGoodsList,
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
