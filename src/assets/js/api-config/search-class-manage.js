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
  getClassDetail: service.service + '/marketing/marketClass/getClassDetail/',
  /**
   * @author Leo
   * @name  获取车型信息
   * @api  /teaching/eduTeachingCar/getCarTypeListMes
   * @method POST
   **/
  getCarTypeListMes: service.service + '/teaching/eduTeachingCar/getCarTypeListMes'
}
export {searchClassManage}
