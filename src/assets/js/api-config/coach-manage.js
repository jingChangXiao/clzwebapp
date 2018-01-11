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
  getEduCoachDetail: service.service + '/teaching/eduCoach/getEduCoachDetail/'
}
export {coachManage}
