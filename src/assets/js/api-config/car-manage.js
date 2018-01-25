/**
 * @file 接口说明配置文件
 * @author Leo
 * @date 2017/12/21
 */
import {service} from '../service'

let carManage = {
  /**
   * @author Leo
   * @name 获取车辆信息管理
   * @api   /car/carInfo/list
   * @method POST
   **/
  carInfoList: service.service + '/car/carInfo/list',
  /**
   * @author Leo
   * @name 获取车辆详情
   * @api  /teaching/eduCoach/getEduCoachDetail/
   * @method POST
   **/
  carInfoDetail: service.service + '/car/carInfo/detail',
  /**
   * @author Leo
   * @name 使用性质
   * @api /car/useProperties/selectList
   * @method GET
   **/
  selectList: service.service + '/car/useProperties/selectList'
}
export {carManage}
