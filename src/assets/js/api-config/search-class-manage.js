/**
 * @file 接口说明配置文件
 * @author Leo
 * @date 2017/12/26
 */
import {service} from '../service'

let searchClassManage = {
  /**
   * @author Leo
   * @name 班别管理
   * @api   /marketing/marketClass/searchClassList
   * @method GET
   **/
  searchClassList: service.service + '/marketing/marketClass/searchClassList',
  /**
   * @author Leo
   * @name 班别管理详情
   * @api  /marketing/marketClass/getClassDetail/
   * @method GET
   **/
  getClassDetail: service.service + '/marketing/marketClass/getClassDetail/'
}
export {searchClassManage}
