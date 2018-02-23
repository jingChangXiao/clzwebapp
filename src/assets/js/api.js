/**
 * Created by Leo on 17-12-19.
 * discribe 程序中公共入口
 */
import Vue from 'vue'
import resource from 'vue-resource'
Vue.use(resource)
/**
 * 1.log
 * */
let consoleLog = {
  logFlag: true,
  log () {
    this.logFlag && console.log(arguments)
  }
}
// 原生接口是否准备就绪
let isPlusReady = false
let app = {}

function plusReady () {
  isPlusReady = true
  app = window.plus
}
if (window.plus) {
  plusReady()
} else {
  document.addEventListener('plusready', plusReady, false)
}

/**
 * 2.代理请求
 * @name 代理ajax请求
 * @author Leo
 * @describe 代理所有的ajax请求，统一入口
 * @param option: 入参
 * {
 *  url: 地址
 *  param: 参数
 *  method: 请求类型
 *  success: 成功回调
 *  error: 失败回调
 * }
 * @return data: 出参
 * {
 *  status: true // 请求状态 true/处理成功 ，false/处理失败
 *  data: {test: '1'} // 返回结果内容
 * }
 * @example 调用示例: api.initAjax(
 *  {
 *    url: 'xxx.xxx',
 *    param: {name: '1'},
 *    method: 'POST',
 *    success: function (data) {console.log(data)}
 *    error: function (data) {console.log(data)}
 *  }
 * )
 */
function initAjax (option, loginFlag) {
  return new Promise((resolve, reject) => {
    option.method = option.method || 'post'
    // 针对前后端分离后 带上这个标示如果会话过期  code200 返回参数来判断是否登录失效
    option.param = option.param ? option.param : {}
    option.param.__FLAG__ = true
    option.param.grant_type = 'password'
    if (!loginFlag) {
      option.headers = {
        Authorization: `bearer${window.localStorage.getItem('__ACCESS_TOKEN')}`
      }
    } else {
      option.headers = {
        Authorization: 'Basic ' + btoa('clientapp' + ':' + '123456')
      }
    }
    option.headers = {
      ...option.headers,
      'X-Requested-With': 'XMLHttpRequest'
    }
    // loading.show('努力加载中...');
    // Leo 匹配  GET POST x-www-form 类型请求
    let vuePostData = {
      headers: option.headers || {},
      url: option.url,
      method: option.method
    }
    if (option.method.toLocaleLowerCase() === 'get') {
      vuePostData.params = option.param
    } else {
      vuePostData.body = option.param
      if (loginFlag) {
        vuePostData.emulateJSON = true
      }
    }
    consoleLog.log('请求参数--->', vuePostData)
    Vue.http(vuePostData).then(function (retData) {
      let retDataObj = retData.data || retData.bodyText
      if (typeof retDataObj === 'string') {
        try {
          retDataObj = JSON.parse(retDataObj)
          if (typeof retDataObj === 'number') {
            retDataObj = {text: retDataObj}
          }
        } catch (e) {
          retDataObj = {text: retDataObj}
        }
      }
      resolve(retDataObj)
      if (!retDataObj.status && retDataObj.data && retDataObj.error_code === -1) {
        window.location.href = retDataObj.login_url + '?backUrl=' + encodeURIComponent(window.location.href)
      } else {
        option.success && option.success(retDataObj)
      }
    }, function (retData) {
      if (retData.status !== 200) {
        resolve({status: false, message: '后台服务异常，请稍后再试'})
      } else {
        reject(retData)
      }
      option.error && option.error(retData)
    })
  })
}

/**
 *  @param xiaoJingChang
 *  @param 2018/1/31
 *  @param option对象有4个属性
 *  resultType 接收的图片信息只需要路径还是对象 默认只需路径
 *  save 是否保存图片 默认不需要
 *  success 图片保存成功的回调函数
 *  error 图片保存失败的回调函数
 *  @param 传入回调函数，接收result对象，msgCode为1时正常返回数据，否则返回错误信息
 */
function camera (callBack, option = {}) {
  if (!isPlusReady) return mui.alert('相机未准备就绪')
  try {
    let result = {
      resultCode: 1,
      data: {}
    }
    let resultType = option.resultType || 'path'
    let save = option.save || false
    let cmr = app.camera.getCamera()
    cmr.captureImage(function (path) {
      // 是否保存图片
      save && app.gallery.save(path, function () {
        consoleLog.log('图片保存成功')
        option.success && option.success()
      }, function () {
        consoleLog.log('图片保存失败')
        option.error && option.error()
      })
      if (resultType === 'path') {
        result.data = path
        callBack && callBack(result)
      } else {
        app.io.resolveLocalFileSystemURL(path, function (entry) {
          entry.filePath = path
          result.data = entry
          callBack && callBack(result)
        }, function (e) {
          result.resultCode = 0
          result.data = e
          callBack && callBack(result)
          mui.alert('读取拍照文件错误：' + e.message)
        })
      }
    }, function (e) {
      // 退出拍照
      consoleLog.log('退出拍照')
    }, {})
  } catch (e) {
    mui.alert('调用相机失败')
  }
}

/**
 *  @param xiaoJingChang
 *  @param 2018/2/1
 *  @param 传入回调函数（必传）和参数对象(非必传)option，type分为1和2，1时只选取一张，2时可选取多张，
 *  maximum 可设置选择图片最大数量，
 *  maxHandle 超过最多选择图片数量事件
 *  @param 回调函数接收result对象，msgCode为1时正常返回数据，否则返回错误信息
 */
function galleryImg (callback, option = {}) {
  if (!isPlusReady) return mui.alert('系统未准备就绪')
  if (!callback || typeof callback !== 'function') return
  let result = {
    resultCode: 1,
    data: {}
  }
  let type = option.type || 1// 默认只选一张图片
  // 设置参数
  let packageObj = type === 1 ? {
    filter: 'image'
  } : {
    filter: 'image',
    multiple: true,
    system: false
  }
  if (type !== 1 && option.maximum) {
    packageObj.maximum = option.maximum
    packageObj.onmaxed = option.maxHandle || function () {}
  }
  // 从相册中选择图片
  app.gallery.pick(function (path) {
    // path: 选择一张时是路径，多张时为包裹files数组的对象
    result.resultCode = 1
    result.data = packageObj.maximum ? path.files : path
    callback && callback(result)
  }, function (e) {
    // 取消选择
    consoleLog.log('取消选取', e)
    result.resultCode = 0
    result.data = e
    callback && callback(result)
  }, packageObj)
}

/**
 * @param xiaoJingChang
 * @param 2018/2/1
 * @param tel为打电话，sms是发短信，email是发邮箱，只需传入电话号码和邮箱地址就可以，会校验入参
 * messageFun 为这三个方法的公共方法
 * */
let formEl
function messageFun (data, msgType) {
  if (!isPlusReady) return mui.alert('系统未准备就绪')
  formEl = formEl || document.createElement('form')
  formEl.style.display = 'none'
  formEl.setAttribute('id', 'cheliziDefinedMessage')
  let telEl = `<li style="display: none;"><a id="cheliziDefinedMessage${msgType}" style="text-decoration:none;" href="${msgType}:${data}">拨打电话</a></li>`
  formEl.innerHTML = telEl
  document.querySelector('body').appendChild(formEl)
  let a = document.querySelector('#cheliziDefinedMessage' + msgType)
  a && a.click()
}
// 打电话
function tel (tel) {
  if (!/^(\d)+$/.test(tel)) return mui.toast('输入有误')
  messageFun(tel, 'tel')
}
// 发短信
function sms (tel) {
  if (!/^(\d)+$/.test(tel)) return mui.toast('输入有误')
  messageFun(tel, 'sms')
}
// 发邮件
function email (email) {
  if (!/^([0-9A-Za-z\-_]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g.test(email)) return mui.toast('输入有误')
  messageFun(email, 'mailto')
}

/**
 *  @param xiaoJingChang
 *  @param 2018/2/1
 *  @param Uploader为构造函数, 调用方式 let uploader = new api.Uploader()
 *  添加文件时 调用appendFile方法，接受file对象（必须）
 *  添加数据时 调用appendData方法，接受｛name：＊＊, value：＊＊｝（非必需）
 *  添加文件或者数据后，调用upload方法，传入上传路径（必须），回调函数（非必需）
 */
const Uploader = class {
  constructor () {
    this.files = []
    this.datas = []
    this.task = ''
    this.event = ''
    this.index = 0
  }
  upload (serverUrl, callback) {
    if (!isPlusReady) return mui.alert('系统未准备就绪')
    if (!serverUrl) return
    let files = this.files
    let datas = this.datas
    if (!files.length) {
      mui.alert('没有添加上传文件！')
      return
    }
    let self = this
    let task = app.uploader.createUpload(serverUrl, {method: 'POST'},
      function (res, status) {
        // 上传完成
        if (status === 200) {
          callback && callback(res, status)
          mui.toast('上传成功')
          self.clear()
        } else {
          consoleLog.log('上传失败')
          console.debug(res, status)
          mui.toast('上传失败')
        }
      }
    )
    for (let t = 0; t < datas.length; t++) {
      let d = datas[t]
      task.addData(d.name, d.value)
    }
    for (let i = 0; i < files.length; i++) {
      let f = files[i]
      task.addFile(f.path, {key: f.name})
    }
    this.event && task.addEventListener('statechanged', function onStateChanged (event, status) {
      this.event(event, status)
    }, false)
    task.start()
    console.log('task: ', task)
    this.task = task
  }
  appendFile (fileObj) {
    if (!fileObj || typeof fileObj !== 'object') return
    this.index++
    this.files.push({name: fileObj.name, path: fileObj.path})
  }
  deleteFile (index = undefined) {
    if (index === undefined) return
    this.files.splice(index, 1)
  }
  appendData (obj) {
    if (!obj || typeof obj !== 'object') return
    this.index++
    this.datas.push(obj)
  }
  deleteData (index = undefined) {
    if (index === undefined) return
    this.datas.splice(index, 1)
  }
  // 添加上传监听事件，需在开始调用之前添加
  addStateChange (callback) {
    if (typeof callback !== 'function') return
    this.event = callback
  }
  // 暂停上传任务
  pause () {
    this.task.pause()
  }
  // 恢复暂停的上传任务
  resume () {
    this.task.resume()
  }
  // 取消上传任务
  abort () {
    this.task.abort()
    this.clear()
  }
  // 开始所有上传任务
  startAll () {
    app.uploader.startAll()
  }
  clear () {
    this.index = 0
    this.datas = []
    this.files = []
    this.event = ''
    app.uploader.clear(this.task.state)
    this.task = ''
  }
}

/**
 *  @param xiaoJingChang
 *  @param 2018/2/3
 *  @param Share, 调用方式 let share = new api.Share()
 *  添加文件时 调用wxShare或者QQShare方法，接受option对象（必须）及成功和失败的回调函数
 *  option对象更具不同情况添加参数，详情参考http://www.html5plus.org/doc/zh_cn/share.html
 */
let Share = class {
  constructor () {
    this.shares = {}
    this.init()
  }
  init () {
    // 获取分享列表
    app.share.getServices(function (s) {
      let shares = {}
      for (let i in s) {
        let t = s[i]
        shares[t.id] = t
      }
      this.shares = shares
    }, function (e) {
      consoleLog.log('获取分享服务列表失败：' + e)
      mui.alert('获取分享服务列表失败')
    })
  }
  /**
   * 微信分享场景
   * @param option 分享的数据
   * @param scene ，仅微信分享平台有效
   * 可取值： "WXSceneSession"分享到微信的“我的好友”； "WXSceneTimeline"分享到微信的“朋友圈”中； "WXSceneFavorite"分享到微信的“我的收藏”中。 默认值为"WXSceneSession"。
   */
  wxShare (option, successCallback, errorCallback) {
    if (!isPlusReady) mui.alert('系统未准备就绪')
    let wxShare = this.shares.weixin
    if (!wxShare) return mui.alert('找不到微信')
    this.activeShare(option, wxShare, successCallback, errorCallback)
  }
  QQShare (option, successCallback, errorCallback) {
    if (!isPlusReady) mui.alert('系统未准备就绪')
    let qqShare = this.shares.qq
    if (!qqShare) return mui.alert('找不到QQ')
    this.activeShare(option, qqShare, successCallback, errorCallback)
  }
  activeShare (option, share, successCallback, errorCallback) {
    let msg = {}
    'pictures' in option && (msg.pictures = Array.isArray(option.pictures) ? option.pictures : [option.pictures])
    'content' in option && (msg.content = option.content)
    'thumbs' in option && (msg.thumbs = Array.isArray(option.thumbs) ? option.thumbs : [option.thumbs])
    'title' in option && (msg.title = option.title)
    'scene' in option && (msg.extra = {}) && (msg.extra.scene = option.scene)
    'href' in option && (msg.href = option.href)
    'geo' in option && (msg.geo = option.geo)
    // 发送分享
    if (share.authenticated) {
      this.sendMessage(msg, share, successCallback, errorCallback)
    } else {
      share.authorize(function () {
        this.sendMessage(msg, share, successCallback, errorCallback)
      }, function (e) {
        consoleLog.log('认证授权失败：' + e.code + ' - ' + e.message)
        consoleLog.log(e)
        mui.alert('认证授权失败')
      })
    }
  }
  sendMessage (msg, share, successCallback, errorCallback) {
    share.send(msg, () => {
      successCallback && successCallback(msg, share)
    }, (e) => {
      errorCallback && errorCallback(e, msg, share)
    })
  }
}
/**
 *  @param xiaoJingChang
 *  @param 2018/2/5
 *  @param Share, 调用方式 let payment = new api.Payment()
 *  支付时调用pay方法，接受option对象（必须）及成功和失败的回调函数
 *  option对象包含id，url，total三个属性，下方有详细说明
 */
let Payment = class {
  constructor () {
    this.channels = {}
    this.init()
  }
  init () {
    // 获取支付通道
    app.payment.getChannels(function (channels) {
      let pays = {}
      for (let i in channels) {
        let channel = channels[i]
        // 过滤掉不支持的支付通道：暂不支持360相关支付
        if (channel.id === 'qhpay' || channel.id === 'qihoo') {
          continue
        }
        pays[channel.id] = channel
        checkServices(channel)
      }
      this.channels = pays
    }, function (e) {
      consoleLog.log('获取支付通道失败：' + e.message)
      consoleLog.log(e)
    })
    // 检测系统支付支持程度
    function checkServices (c) {
      if (!c.serviceReady) {
        var txt = null
        switch (c.id) {
          case 'alipay':
            txt = '检测到系统未安装“支付宝快捷支付服务”，无法完成支付操作，是否立即安装？'
            break
          default:
            txt = '系统未安装“' + c.description + '”服务，无法完成支付，是否立即安装？'
            break
        }
        app.nativeUI.confirm(txt, function (e) {
          if (e.index === 0) {
            c.installService()
          }
        }, c.description)
      }
    }
  }
  /**
   * total 支付金额
   * url格式 'http://demo.dcloud.net.cn/payment/?payid='
   * id: alipay为支付宝，wxpay是微信支付
   **/
  pay (option, success, error) {
    if (!isPlusReady) return mui.alert('系统未准备就绪')
    let id = option.id || ''
    let url = option.url || ''
    let total = option.total || 0
    if (!id || !url) return mui.alert('支付参数不完整')
    if (id === 'alipay' || id === 'wxpay') {
      url += id
    } else {
      mui.alert('当前环境不支持此支付通道！')
      return
    }
    let appid = app.runtime.appid
    if (navigator.userAgent.indexOf('StreamApp') >= 0) {
      appid = 'Stream'
    }
    url += '&appid=' + appid + '&total=' + total
    // 请求支付订单
    this.paySend(url, id, success, error)
  }
  paySend (url, id, success, error) {
    // 请求支付订单
    initAjax({
      url: url,
      method: 'get'
    }).then((res) => {
      app.payment.request(this.channels[id], res.data, function (result) {
        success && success(result)
      }, function (e) {
        consoleLog.log('支付失败：[' + e.code + ']：' + e.message)
        consoleLog.log(e)
        error && error(e)
      })
    }, (e) => {
      consoleLog.log('请求失败：[' + e.code + ']：' + e.message)
      consoleLog.log(e)
      error && error(e)
    })
  }
}
/**
 *  @param xiaoJingChang
 *  @param 2018/2/5
 *  @param S
 */
let Barcode = class {
  constructor (id, options) {
    this.scan = {}
    this.id = id
    this.options = options || {}
  }
  start (startOption) {
    return new Promise((resolve, reject) => {
      let id = this.id
      let options = this.options
      if (typeof id !== 'string') return
      let barcode = app.barcode
      let QR = barcode.QR
      let EAN8 = barcode.EAN8
      let EAN13 = barcode.EAN13
      id = id.replace(/^#/, '')
      // 设置条码类型过滤器
      let filters = options.filters || [QR, EAN8, EAN13]
      // 设置条码样式
      let barcodeStyles = options.barcodeStyles || {}
      let scan = new barcode.Barcode(id, filters, barcodeStyles)
      // 二维码扫描成功
      scan.onmarked = function (type, result, file) {
        switch (type) {
          case QR :
            type = 'QR'
            break
          case EAN13 :
            type = 'EAN13'
            break
          case EAN8 :
            type = 'EAN8'
            break
          default :
            type = '其它' + type
            break
        }
        result = result.replace(/\n/g, '')
        resolve(type, result, file)
      }
      // 二维码扫描失败
      scan.onerror = function (e) {
        reject(e)
      }
      let obj = {}
      if (startOption) {
        obj = startOption
      }
      scan.start(obj)
      this.scan = scan
    })
  }
  // 暂停条码识别
  cancelScan () {
    this.scan.cancel()
  }
  // 关闭条码识别控件
  close () {
    this.scan.close()
  }
  // 是否开启闪光灯
  setFlash (boolean) {
    this.scan.setFlash(!!boolean)
  }
}
let api = {
  initAjax: initAjax,
  camera: camera,
  galleryImg: galleryImg,
  tel: tel,
  sms: sms,
  email: email,
  Uploader: Uploader,
  Share: Share,
  Payment: Payment,
  Barcode: Barcode
}
export {api}
