/**
 * @file 接口说明配置文件
 * @author Leo
 * @date 2017/12/21
 */
import {service} from '../service'

let processCenter = {
  /**
   * @author Leo
   * @name 流程信息管理
   * @api   /workflow/api/v1/taskQuery/findApplyListByState
   * @method POST
   **/
  findApplyListByState: service.service + '/workflow/api/v1/taskQuery/findApplyListByState',
  /**
   * @author Leo
   * @name 流程审批
   * @api   /workflow/api/v1/task/taskComplete
   * @method POST
   **/
  taskComplete: service.service + '/workflow/api/v1/task/taskComplete',
  /**
   * @author Leo
   * @name 获取流程记录
   * @api   /workflow/api/v1/taskQuery/findApprovelRecord
   * @method POST
   **/
  findApprovelRecord: service.service + '/workflow/api/v1/taskQuery/findApprovelRecord',
  /**
   * @author Leo
   * @name 获取是否有流程审核权限
   * @api   workflow/api/v1/taskQuery/findTaskByProcessInstanceId
   * @method POST
   **/
  findTaskByProcessInstanceId: service.service + '/workflow/api/v1/taskQuery/findTaskByProcessInstanceId',
  /**
   * @author Leo
   * @name 学员信息变更
   * @api   /cert/certStudentInfoChangeApply/detail
   * @method GET
   **/
  certStudentInfoChangeApply: service.service + '/cert/certStudentInfoChangeApply/detail',
  /**
   * @author Leo
   * @name 转店申请
   * @api   /cert/certStudentStoreChangeApply/detail
   * @method GET
   **/
  certStudentStoreChangeApply: service.service + '/cert/certStudentStoreChangeApply/detail',
  /**
   * @author Leo
   * @name 上课情况变更申请
   * @api   /cert/certStudentTheoryCourseChangeApply/detail
   * @method GET
   **/
  certStudentTheoryCourseChangeApply: service.service + '/cert/certStudentTheoryCourseChangeApply/detail',
  /**
   * @author Leo
   * @name 考试批复变更申请
   * @api   /cert/certStudentExamApprovalChangeApply/detail
   * @method GET
   **/
  certStudentExamApprovalChangeApply: service.service + '/cert/certStudentExamApprovalChangeApply/detail',
  /**
   * @author Leo
   * @name 考试成绩变更申请
   * @api   /cert/certStudentExamScoreChangeApply/detail
   * @method GET
   **/
  certStudentExamScoreChangeApply: service.service + '/cert/certStudentExamScoreChangeApply/detail',
  /**
   * @author Leo
   * @name 减免申请
   * @api   /cert/certStudentDiscountApply/detail
   * @method GET
   **/
  certStudentDiscountApply: service.service + '/cert/certStudentDiscountApply/detail',
  /**
   * @author Leo
   * @name 支出申请
   * @api   /cert/certStudentExpenditureApply/detail
   * @method GET
   **/
  certStudentExpenditureApply: service.service + '/cert/certStudentExpenditureApply/detail',
  /**
   * @author Leo
   * @name 变更教练
   * @api   /cert/certStudentCoachChangeApply/detail
   * @method GET
   **/
  certStudentCoachChangeApply: service.service + '/cert/certStudentCoachChangeApply/detail',
  /**
   * @author Leo
   * @name 交易作废
   * @api  /marketing/certTradeCancellationApply/detail
   * @method GET
   **/
  certTradeCancellationApply: service.service + '/marketing/certTradeCancellationApply/detail',
  /**
   * @author Leo
   * @name 交易作废的商品信息
   * @api  /marketing/certTradeCancellationApply/searchGoodsByOrderId
   * @method GET
   **/
  searchGoodsByOrderId: service.service + '/marketing/certTradeCancellationApply/searchGoodsByOrderId',
  /**
   * @author Leo
   * @name 退费申请
   * @api  /cert/certStudentRefundApply/detail
   * @method GET
   **/
  certStudentRefundApply: service.service + '/cert/certStudentRefundApply/detail',
  /**
   * @author Leo
   * @name 暂停学车
   * @api   /teaching/eduTemporarySubmit/getTemporaryDetail
   * @method GET
   **/
  getTemporaryDetail: service.service + '/teaching/eduTemporarySubmit/getTemporaryDetail',
  /**
   * @author Leo
   * @name 恢复学车
   * @api   /teaching/eduRecoverSubmit/getRecoverDetail
   * @method GET
   **/
  getRecoverDetail: service.service + '/teaching/eduRecoverSubmit/getRecoverDetail',
  /**
   * @author Leo
   * @name 车辆调动
   * @api   /car/carTransfer/detail
   * @method GET
   **/
  carTransfer: service.service + '/car/carTransfer/detail',
  /**
   * @author Leo
   * @name 车辆停车点变更
   * @api   /car/carParkingChange/detail
   * @method GET
   **/
  carParkingChange: service.service + '/car/carParkingChange/detail',
  /**
   * @author Leo
   * @name 停车点变更
   * @api   /car/parkingChange/detail
   * @method GET
   **/
  parkingChange: service.service + '/car/parkingChange/detail'
}
export {processCenter}
