import Vue from 'vue'
import Router from 'vue-router'
import {home} from './home/index'
import error from '../components/error/index.vue'
import login from '../components/login/index.vue'
import userDetail from '../components/home/user-detail.vue'
import version from '../components/home/version.vue'
import editPassword from '../components/home/edit-password.vue'
// 门店管理
import storeManageList from '../components/store-Manage/index.vue'
import storeManageListSearch from '../components/store-Manage/search.vue'
import storeManageDetail from '../components/store-Manage/detail.vue'
// 教练管理
import coachManageList from '../components/coach-manage/index.vue'
import coachManageListSearch from '../components/coach-manage/search.vue'
import coachManageDetail from '../components/coach-manage/detail.vue'
// 车辆管理
import carManageList from '../components/car-manage/index.vue'
import carManageListSearch from '../components/car-manage/search.vue'
import carManageDetail from '../components/car-manage/detail.vue'

// 学员管理
import classManageList from '../components/class-manage/index.vue'
import classManageListSearch from '../components/class-manage/search.vue'
import classManageDetail from '../components/class-manage/detail.vue'
// 班别管理
import searchClassManageList from '../components/search-class-manage/index.vue'
import searchClassManageListSearch from '../components/search-class-manage/search.vue'
import searchClassManageDetail from '../components/search-class-manage/detail.vue'
// 流程详情
//  学员信息变更
import CertChStuInfoProcess from '../components/process-mange/detail/CertChStuInfoProcess.vue'
// 转店申请
import CertChStoreProcess from '../components/process-mange/detail/CertChStoreProcess.vue'
// 上课变更
import CertChCourseProcess from '../components/process-mange/detail/CertChCourseProcess.vue'
// 考试批复
import CertExamAprvProcess from '../components/process-mange/detail/CertExamAprvProcess.vue'
// 考试成绩
import CertChScoreProcess from '../components/process-mange/detail/CertChScoreProcess.vue'
// 交易作废未完成
import CertTradeCancelApply from '../components/process-mange/detail/CertTradeCancelApply.vue'
// 减免申请中
import CertDiscountProcess from '../components/process-mange/detail/CertDiscountProcess.vue'
// 支出申请  商品详情接口POST GET有问题
import CertExpenditureApply from '../components/process-mange/detail/CertExpenditureApply.vue'
// 退费申请未完成
import CertRefundApply from '../components/process-mange/detail/CertRefundApply.vue'
// 变更教练
import CertChCoachProcess from '../components/process-mange/detail/CertChCoachProcess.vue'
// 暂停学车
import EduTemporarySubmit from '../components/process-mange/detail/EduTemporarySubmit.vue'
// 恢复学车
import EduRecoverSubmit from '../components/process-mange/detail/EduRecoverSubmit.vue'
// 车辆调动
import CarTransferProcess from '../components/process-mange/detail/CarTransferProcess.vue'
// 车辆停车点
import CarParkingChange from '../components/process-mange/detail/CarParkingChange.vue'
// 停车点变更
import ParkingChangeProcess from '../components/process-mange/detail/ParkingChangeProcess.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/error',
      name: 'error',
      component: error
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/userDetail',
      name: 'userDetail',
      component: userDetail
    },
    {
      path: '/version',
      name: 'version',
      component: version
    },
    {
      path: '/editPassword',
      name: 'editPassword',
      component: editPassword
    },
    {
      path: '/storeManageList',
      component: storeManageList
    },
    {
      path: '/storeManageDetail/:id',
      component: storeManageDetail
    },
    {
      path: '/storeManageListSearch',
      component: storeManageListSearch
    },
    {
      path: '/coachManageList',
      component: coachManageList
    },
    {
      path: '/coachManageListSearch',
      component: coachManageListSearch
    },
    {
      path: '/coachManageDetail/:id',
      component: coachManageDetail
    },
    {
      path: '/carManageList',
      component: carManageList
    },
    {
      path: '/carManageListSearch',
      component: carManageListSearch
    },
    {
      path: '/carManageDetail/:id',
      component: carManageDetail
    },
    {
      path: '/classManageList',
      component: classManageList
    },
    {
      path: '/classManageListSearch',
      component: classManageListSearch
    },
    {
      path: '/classManageDetail/:id',
      component: classManageDetail
    },
    {
      path: '/searchClassManageList',
      component: searchClassManageList
    },
    {
      path: '/searchClassManageListSearch',
      component: searchClassManageListSearch
    },
    {
      path: '/searchClassManageDetail/:id',
      component: searchClassManageDetail
    },
    {
      path: '/home',
      component: home.menu,
      children: [
        {
          path: 'message',
          component: home.message
        },
        {
          path: 'work',
          component: home.work
        },
        {
          path: 'process',
          component: home.process
        },
        {
          path: 'user',
          component: home.user
        }
      ]
    },
    {
      path: '/CertChStuInfoProcess/:id/:processInstanceId/:taskId',
      component: CertChStuInfoProcess
    },
    {
      path: '/CertChStoreProcess/:id/:processInstanceId/:taskId',
      component: CertChStoreProcess
    },
    {
      path: '/CertChCourseProcess/:id/:processInstanceId/:taskId',
      component: CertChCourseProcess
    },
    {
      path: '/CertExamAprvProcess/:id/:processInstanceId/:taskId',
      component: CertExamAprvProcess
    },
    {
      path: '/CertChScoreProcess/:id/:processInstanceId/:taskId',
      component: CertChScoreProcess
    },
    {
      path: '/CertDiscountProcess/:id/:processInstanceId/:taskId',
      component: CertDiscountProcess
    },
    {
      path: '/CertExpenditureApply/:id/:processInstanceId/:taskId',
      component: CertExpenditureApply
    },
    {
      path: '/CertChCoachProcess/:id/:processInstanceId/:taskId',
      component: CertChCoachProcess
    },
    {
      path: '/EduTemporarySubmit/:id/:processInstanceId/:taskId',
      component: EduTemporarySubmit
    },
    {
      path: '/EduRecoverSubmit/:id/:processInstanceId/:taskId',
      component: EduRecoverSubmit
    },
    {
      path: '/CarTransferProcess/:id/:processInstanceId/:taskId',
      component: CarTransferProcess
    },
    {
      path: '/CarParkingChange/:id/:processInstanceId/:taskId',
      component: CarParkingChange
    },
    {
      path: '/ParkingChangeProcess/:id/:processInstanceId/:taskId',
      component: ParkingChangeProcess
    },
    {
      path: '/CertTradeCancelApply/:id/:processInstanceId/:taskId',
      component: CertTradeCancelApply
    },
    {
      path: '/CertRefundApply/:id/:processInstanceId/:taskId',
      component: CertRefundApply
    },
    // 错误路径重定向到首页
    {
      path: '*',
      redirect: '/login'
    }
  ]
})
