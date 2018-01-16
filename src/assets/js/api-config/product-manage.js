/**
 * @file 接口说明配置文件
 * @author Leo
 * @date 2017/12/21
 */
import {service} from '../service'

let productManage = {
  /**
   * @author Leo
   * @name 获取商品
   * @api   /marketing/goods/searchGoodsList
   * @method POST
   **/
  searchGoodsList: service.service + '/marketing/goods/searchGoodsList',
  /**
   * @author Leo
   * @name 获取商品详情
   * @api  /marketing/goods/getGoodsDetail
   * @method GET
   **/
  getGoodsDetail: service.service + '/marketing/goods/getGoodsDetail'
}
export {productManage}
