/**
 * @file 配置文件
 * @author Leo
 * @date 2017/05/23
 */

let serviceList = [
  {
    loginService: 'http://192.168.0.100:10019',
    service: 'http://192.168.0.100:10020',
    description: ''
  },
  {
    loginService: 'http://192.168.87.211:10019',
    service: 'http://192.168.87.211:10020',
    description: '测试环境'
  },
  {
    loginService: 'http://192.168.185.223:10019',
    service: 'http://192.168.185.223:10020',
    description: '吴帧威'
  }
]
let serviceIndex = 1
let service = serviceList[serviceIndex]

export {service}
