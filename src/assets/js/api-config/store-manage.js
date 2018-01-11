/**
 * @file 接口说明配置文件
 * @author Leo
 * @date 2017/12/21
 */
import {service} from '../service'

let storeManage = {
  /**
   * @author Leo
   * @name 获取门店信息管理
   * @api   /marketing/mStore/searchMStoreByCondition
   * @method GET
   **/
  searchMStoreByCondition: service.service + '/marketing/mStore/searchMStoreByCondition',
  /**
   * @author Leo
   * @name 获取门店详情
   * @api  /marketing/mStore/mstoreDetail
   * @param id
   * @method GET
   **/
  mstoreDetail: service.service + '/marketing/mStore/mstoreDetail'
}
export {storeManage}
