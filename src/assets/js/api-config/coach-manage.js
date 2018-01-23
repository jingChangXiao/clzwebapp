/**
 * @file 接口说明配置文件
 * @author Leo
 * @date 2017/12/21
 */
import {service} from '../service'

let coachManage = {
  /**
   * @author Leo
   * @name 获取教练信息管理
   * @api   /teaching/eduCoach/getCoachList
   * @method POST
   **/
  getCoachList: service.service + '/teaching/eduCoach/getCoachList',
  getEduCoachDetail: service.service + '/teaching/eduCoach/getEduCoachDetail/',
  /**
   * @author Leo
   * @name 获取关联门店
   * @api   /system/sysOrg/findAreaAndStoreNamesCascade
   * @method POST
   **/
  findAreaAndStoreNamesCascade: service.service + '/system/sysOrg/findAreaAndStoreNamesCascade'
}
export {coachManage}
