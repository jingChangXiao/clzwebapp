/**
 * @file 借口说明配置文件
 * @author Leo
 * @date 2017/12/19
 */
import {service} from './service'
import {storeManage} from './api-config/store-manage'
import {coachManage} from './api-config/coach-manage'
import {carManage} from './api-config/car-manage'
import {findCertServiceInfoPageList} from './api-config/class-manage'
import {searchClassManage} from './api-config/search-class-manage'
import {processCenter} from './api-config/process-center'
let APIS = {
  /**
   * @author Leo
   * @name 登录
   * @api  /sec/oauth/token
   * @method POST
   * @param {String} username : 账号
   * @param {String} password : 密码
   **/
  login: service.loginService + '/sec/oauth/token',
  userInfo: service.service + '/system/sysUser/getUserInfo',
  editPassword: service.service + '/system/sysUser/password/modify',
  loadDictCache: service.service + '/system/home/loadDictCache',
  loadOrgCache: service.service + '/system/home/loadOrgCache',
  /**
   * @author Leo
   * @name 门店功能的所有接口配置
   **/
  storeManage,
  /**
   * @author Leo
   * @name 教练功能的所有接口配置
   **/
  coachManage,
  /**
   * @author Leo
   * @name 车辆功能的所有接口配置
   **/
  carManage,
  /**
   * @author Leo
   * @name 学员功能的所有接口配置
   **/
  findCertServiceInfoPageList,
  /**
   * @author Leo
   * @name 班别功能的所有接口配置
   **/
  searchClassManage,
  /**
   * @author Leo
   * @name 流程中心接口
   **/
  processCenter
}
export {service, APIS}
