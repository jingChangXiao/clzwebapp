/**
 * @file 接口说明配置文件
 * @author Leo
 * @date 2017/12/21
 */
import {service} from '../service'

let findCertServiceInfoPageList = {
  /**
   * @author Leo
   * @name 获取学员信息管理
   * @api   /cert/certServiceInfo/findCertServiceInfoPageList
   * @method POST
   **/
  findCertServiceInfoPageList: service.service + '/cert/certServiceInfo/findCertServiceInfoPageList',
  /**
   * @author Leo
   * @name 获取学员信息
   * @api   /cert/certServiceInfo/getServiceInfo
   * @method GET
   **/
  getServiceInfo: service.service + '/cert/certServiceInfo/getServiceInfo',
  /**
   * @author Leo
   * @name 订单记录
   * @api   /cert/certServiceInfo/getServiceInfo
   * @method post userId-->userId
   **/
  searchMarketOrderList: service.service + '/marketing/marketOrder/searchMarketOrderList',
  /**
   * @author Leo
   * @name 办证记录
   * @api  /cert/certStudentAllProjectDetail/list
   * @method post serviceId-->id
   **/
  certStudentAllProjectDetail: service.service + '/cert/certStudentAllProjectDetail/list',
  /**
   * @author Leo
   * @name 商品及核销记录
   * @api  /cert/certServiceDetail/list
   * @method post serviceId-->id
   **/
  certServiceDetail: service.service + '/cert/certServiceDetail/list'
}
export {findCertServiceInfoPageList}
