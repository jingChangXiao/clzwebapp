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
document.addEventListener('plusready', plusReady, false)

/**
 * 2.代理请求  支持传入回调参数，也返回了promise对象
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
      let retDataObj = {}
      retDataObj = retData.data || retData.bodyText
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
 *  添加文件活着数据后，调用upload方法，传入上传路径（必须），回调函数（非必需）
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

let api = {
  initAjax: initAjax,
  camera: camera,
  galleryImg: galleryImg,
  tel: tel,
  sms: sms,
  email: email,
  Uploader: Uploader
}
export {api}
