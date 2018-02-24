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
 * 3.调用像机
 * @name 调用摄像机
 * @author Xjc
 * @describe 调用摄像机进行拍照
 * @param option: 入参
 * {
 *  resultType: 照片数据返回类型 //path时返回路径 否则返回图片对象
 *  save: 拍照后是否保存照片到手机
 *  success: 保存照片的成功回调
 *  error: 保存照片的失败回调
 * }
 * @param callBack: 回调函数
 * @return result: 出参
 * {
 *  resultCode: 1 // 执行状态：1/处理成功 ，0/处理失败
 *  data: 'Library/Pandora/apps/HBuilder/doc/a.png' // 返回图片路径或者文件对象
 * }
 * @example 调用示例: api.camera(
 *  {
 *    resultType: 'pic',
 *    save: true,
 *    success: function (data) {console.log(data)}
 *    error: function (data) {console.log(data)}
 *  },
 *  (result) => {console.log(data)}
 * )
 */
function camera (callBack, option = {}) {
  if (!isPlusReady) return mui.alert('相机未准备就绪')
  try {
    let result = {
      resultCode: 1,
      data: {}
    }
    let resultType = option.resultType || 'path'
    let save = !!option.save
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
      // 判断返回图片数据类型
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
 * 4.调用手机相册
 * @name 调用手机相册
 * @author Xjc
 * @describe 调用手机相册获取手机照片
 * @param option: 入参
 * {
 *  multiple: 是否多选
 *  system: 是否使用系统自带相册选择控件 //true/使用系统控件, false／使用h5+控件
 *  maximum: 选择图片最大数量
 *  onmaxed：超过最多选择图片数量触发事件
 * }
 * @param callBack: 回调函数
 * @return result: 出参
 * {
 *  resultCode: 1 // 执行状态：1/处理成功 ，0/处理失败
 *  data: 'Library/Pandora/apps/HBuilder/doc/a.png' // 返回图片路径或者包裹files数组的对象
 * }
 * @example 调用示例: api.gallery(
 *  {
 *    multiple: true, //false：只选取一张，true：多选
 *    system: true,
 *    maximum: 5
 *    onmaxed: function () {}
 *  },
 *  (result) => {console.log(result)}
 * )
 */
function gallery (callBack, option = {}) {
  if (!isPlusReady) return mui.alert('系统未准备就绪')
  if (!callBack || typeof callBack !== 'function') return
  let result = {
    resultCode: 1,
    data: {}
  }
  // 设置参数
  let packageObj = {
    filter: 'image',
    multiple: !!option.multiple,
    system: !!option.system
  }
  if (packageObj.multiple) {
    // 默认最多可选数量为3
    packageObj.maximum = option.maximum || 3
    option.onmaxed && (packageObj.onmaxed = option.onmaxed)
  }
  // 从相册中选择图片
  app.gallery.pick(function (path) {
    result.resultCode = 1
    // path: 选择一张时是路径，多张时为包裹files数组的对象
    result.data = packageObj.maximum ? path.files : path
    callBack && callBack(result)
  }, function (e) {
    // 取消选择
    consoleLog.log('取消选取', e)
    result.resultCode = 0
    result.data = e
    callBack && callBack(result)
  }, packageObj)
}

/**
 * 5.拨打电话
 * @name 拨打电话
 * @author Xjc
 * @describe 拨打电话
 * @param tel: 电话号码
 * @return 无返回值
 * @example 调用示例: api.tel(13677778888)
 */
function tel (tel) {
  if (!/^(\d)+$/.test(tel)) return mui.toast('输入有误')
  messageFun(tel, 'tel')
}
/**
 * 6.发短信
 * @name 发短信
 * @author Xjc
 * @describe 发短信
 * @param tel: 电话号码
 * @return 无返回值
 * @example 调用示例: api.sms(13677778888)
 */
function sms (tel) {
  if (!/^(\d)+$/.test(tel)) return mui.toast('输入有误')
  messageFun(tel, 'sms')
}
/**
 * 7.发邮件
 * @name 发邮件
 * @author Xjc
 * @describe 发邮件
 * @param email: 电话号码
 * @return 无返回值
 * @example 调用示例: api.email('xjc@163.com')
 */
function email (email) {
  if (!/^([0-9A-Za-z\-_]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g.test(email)) return mui.toast('输入有误')
  messageFun(email, 'mailto')
}

function messageFun (data, msgType) {
  let formEl = messageFun.formEl || document.createElement('form')
  formEl.style.display = 'none'
  formEl.innerHTML = `<li><a id="defineMessageSend${msgType}" style="text-decoration:none;" href="${msgType}:${data}">拨打电话</a></li>`
  document.querySelector('body').appendChild(formEl)
  messageFun.formEl = formEl
  let a = document.querySelector('#defineMessageSend' + msgType)
  a && a.click()
}

/**
 * 8.上传文件
 * @name 上传文件及数据
 * @author Xjc
 * @describe 上传各类文件及数据
 * @param serverUrl：上传的地址
 * callBack：上传结束的回调函数
 * watchEvent：上传的监听事件
 * @return res: 上传结束后台返回的数据
 * status: 上传结束返回的状态码
 * @example 调用示例: let upload = new api.Uploader()
 * upload.addFiles([{
 *  name: 文件名
 *  path：文件路径
 * }])
 * upload.addDatas([{
 *  name：数据名
 *  value：数据值
 * }])
 * upload.upload('http://xxxxx.uoload', (res, status) => {console.log(res, status)}, (stateEvent, status) => {stateEvent, status})
 */
const Uploader = class {
  constructor () {
    this.files = []
    this.datas = []
    this.task = ''
  }
  upload (serverUrl, callBack, watchEvent) {
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
          callBack && callBack(res, status)
          mui.toast('上传成功')
          self.clear()
        } else {
          consoleLog.log('上传失败')
          console.debug(res, status)
          callBack && callBack(res, status)
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
    watchEvent && task.addEventListener('statechanged', function onStateChanged (stateEvent, status) {
      watchEvent(stateEvent, status)
    }, false)
    task.start()
    consoleLog.log('task: ', task)
    this.task = task
  }
  addFiles (fileObj) {
    if (!fileObj || typeof fileObj !== 'object') return
    if (Array.isArray(fileObj)) {
      let l = fileObj.length
      for (let i = 0; i < l; i++) {
        let item = fileObj[i]
        this.files.push({name: item.name, path: item.path})
      }
    } else {
      this.files.push({name: fileObj.name, path: fileObj.path})
    }
  }
  deleteFile (index = undefined) {
    if (index === undefined) return
    this.files.splice(index, 1)
  }
  addDatas (obj) {
    if (!obj || typeof obj !== 'object') return
    if (Array.isArray(obj)) {
      let l = obj.length
      for (let i = 0; i < l; i++) {
        this.datas.push(obj[i])
      }
    } else {
      this.datas.push(obj)
    }
  }
  deleteData (index = undefined) {
    if (index === undefined) return
    this.datas.splice(index, 1)
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
    this.datas = []
    this.files = []
    app.uploader.clear(this.task.state)
    this.task = ''
  }
}

/**
 * 9.微信QQ分享
 * @name 微信QQ分享
 * @author Xjc
 * @describe 微信QQ分享文件及链接
 * @param option：入参
 * {
 *   content: 分享消息的文字内容
 *   pictures: 分享消息的图片路径（单个字符串或者字符串数组），仅支持本地路径
 *   thumbs: 分享消息的缩略图路径，支持本地路径及网络路径(图片有大小限制，推荐图片小于20Kb)
 *   href: 分享独立的链接，仅支持网络地址（以http://或https://开头）
 *   title: 分享消息的标题，仅微信分享独立链接消息时支持
 *   geo: 分享消息中包含的用户地理信息数据
 *     {
 *     latitude: (Number 类型 )用户位置的纬度坐标信息
 *     longitude: (Number 类型 )用户位置的经度坐标信息
 *     }
 *   scene: 分享消息扩展参数(String 类型 )微信分享场景，仅微信分享平台有效 //"WXSceneSession"分享到“我的好友”；"WXSceneTimeline"分享到“朋友圈”；"WXSceneFavorite"分享到“我的收藏”
 *  }
 * @return 出参
 * msg：分享的信息
 * share：分享服务对象
 * e: 分享失败的返回值
 * @example 调用示例: let share = new api.Share()
 * share.wxShare(
 *  {
 *  content: '明天放假啦'
 *  pictures：['../image/a.png', '../image/b.png']
 *  thumbs：['../image/c.png', '../image/d.png']
 *  href：'https://www.baidu.com'
 *  title：'今日头条'
 *  geo: {
 *   latitude: 114.06667
 *   longitude: 22.61667
 *  }
 *  scene：'WXSceneSession'
 *  },
 *  (msg. share) => {console.log(msg, share)},
 *  (e, msg, share) => {console.log(e, msg, share)}
 * )
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
      consoleLog.log('获取分享服务列表失败：', e)
      mui.alert('获取分享服务列表失败')
    })
  }
  // 微信分享
  wxShare (option, successCallback, errorCallback) {
    if (!isPlusReady) mui.alert('系统未准备就绪')
    let wxShare = this.shares.weixin
    if (!wxShare) return mui.alert('找不到微信')
    this.activeShare(option, wxShare, successCallback, errorCallback)
  }
  // QQ分享
  QQShare (option, successCallback, errorCallback) {
    if (!isPlusReady) mui.alert('系统未准备就绪')
    let qqShare = this.shares.qq
    if (!qqShare) return mui.alert('找不到QQ')
    this.activeShare(option, qqShare, successCallback, errorCallback)
  }
  // 使用系统组件发送分享
  sendWithSystem (option, successCallback, errorCallback) {
    if (!isPlusReady) mui.alert('系统未准备就绪')
    let msg = this.getOption(option)
    app.share.sendWithSystem(msg, () => {
      successCallback && successCallback()
    }, (e) => {
      errorCallback && errorCallback(e)
    })
  }
  activeShare (option, share, successCallback, errorCallback) {
    let msg = this.getOption(option)
    // 发送分享
    if (share.authenticated) {
      sendMessage()
    } else {
      share.authorize(function () {
        sendMessage()
      }, function (e) {
        consoleLog.log('认证授权失败：' + e.code + ' - ' + e.message)
        consoleLog.log(e)
        mui.alert('认证授权失败')
      })
    }
    // 发送分享信息
    function sendMessage () {
      share.send(msg, () => {
        successCallback && successCallback(msg, share)
      }, (e) => {
        errorCallback && errorCallback(e, msg, share)
      })
    }
  }
  getOption (option) {
    let msg = {}
    'pictures' in option && (msg.pictures = Array.isArray(option.pictures) ? option.pictures : [option.pictures])
    'content' in option && (msg.content = option.content)
    'thumbs' in option && (msg.thumbs = Array.isArray(option.thumbs) ? option.thumbs : [option.thumbs])
    'title' in option && (msg.title = option.title)
    'scene' in option && (msg.extra = {}) && (msg.extra.scene = option.scene)
    'href' in option && (msg.href = option.href)
    'geo' in option && (msg.geo = option.geo)
    return msg
  }
}

/**
 * 10.手机支付
 * @name 手机支付
 * @author Xjc
 * @describe 手机支付控件，支持微信和支付宝
 * @param option：入参
 * {
 *  id：支付id //支付宝:alipay，微信:wxpay
 *  url：支付链接
 *  total：支付金额
 * }
 * @return result:出参
 * {
 *  channel: 支付通道对象
 *  tradeno: 交易编号信息
 *  description: 交易描述信息
 *  url: 查找支付交易信息地址
 *  signature: 支付操作指纹信息
 *  rawdata: 支付平台返回的原始数据
 * }
 * @example 调用示例: let payment = new api.Payment()
 * payment.pay({
 *  id: 'alipay'
 *  url: 'http://xxx.net.cn/payment/?payid='
 *  total: 10
 * },
 * (result) => {console.log(result)},
 * (e) => {console.log(e)})
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
        error && error(e)
      })
    }, (e) => {
      consoleLog.log('请求失败：[' + e.code + ']：' + e.message)
      error && error(e)
    })
  }
}

/**
 * 11.识别二维码
 * @name 识别二维码
 * @author Xjc
 * @describe 调用手机摄像机扫描识别二维码
 * @param option：入参
 * {
 *  filters：要识别的条码类型过滤器，为条码类型常量数组
 *  barcodeStyles：条码扫描控件样式
 *    {
 *    frameColor: 扫描框颜色
 *    scanbarColor: 扫描条颜色
 *    background: 条码识别控件背景颜色
 *    }
 * }
 * id：条码识别控件在Webview窗口的DOM节点的id值
 * startOption：{
  *  conserve: (Boolean 类型 )是否保存成功扫描到的条码数据时的截图
  *  filename: (String 类型 )保存成功扫描到的条码数据时的图片路径
  *  vibrate: (Boolean 类型 )成功扫描到条码数据时是否需要震动提醒
  *  sound: (String 类型 )成功扫描到条码数据时播放的提示音类型 //"none" - 不播放提示音； "default" - 播放默认提示音（5+引擎内置）
  *  }
 * @return 出参
 *  type: 识别到的条码类型
 *  code: 识别到的条码数据
 *  file: 识别到的条码图片文件路径
 * @example 调用示例:
 * let bar = new api.Barcode('codeEl', {
 *    filters: ['QR', 'EAN8', 'EAN13']
 *    barcodeStyles: {
 *        frameColor: blue
 *        scanbarColor: blue
 *        background: black
 *     }
 *   }
 * )
 * bar.start()
 * bar.cancelScan()
 * bar.close()
 */
let Barcode = class {
  constructor (id, options) {
    this.scan = {}
    this.id = id
    this.options = options || {}
  }
  start (startOption) {
    if (!isPlusReady) return mui.alert('系统未准备就绪')
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
      // 二维码识别成功
      scan.onmarked = function (type, code, file) {
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
        code = code.replace(/\n/g, '')
        resolve(type, code, file)
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
    if (!isPlusReady) return
    this.scan.cancel()
  }
  // 关闭条码识别控件
  close () {
    if (!isPlusReady) return
    this.scan.close()
  }
  // 是否开启闪光灯
  setFlash (boolean) {
    if (!isPlusReady) return
    this.scan.setFlash(!!boolean)
  }
}

let api = {
  initAjax: initAjax,
  camera: camera,
  gallery: gallery,
  tel: tel,
  sms: sms,
  email: email,
  Uploader: Uploader,
  Share: Share,
  Payment: Payment,
  Barcode: Barcode
}
export {api}
