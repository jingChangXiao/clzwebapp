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
  log: function () {
    this.logFlag && console.log(arguments)
  }
}

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
      // Vue.$router.push('/login')
      option.param.access_token = window.localStorage.getItem('__ACCESS_TOKEN')
      // if (option.url.indexOf('?') >= 0) {
      //   option.url += '&access_token=' + window.localStorage.getItem('__ACCESS_TOKEN')
      // } else {
      //   option.url += '?access_token=' + window.localStorage.getItem('__ACCESS_TOKEN')
      // }
    }
    option.headers = {
      // 'Content-Type': 'application/x-www-form-urlencoded',
      'X-Requested-With': 'XMLHttpRequest',
      Authorization: 'Basic ' + btoa('clientapp' + ':' + '123456')
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
      option.error && option.error(retData)
      reject(retData)
    })
  })
}
let api = {
  initAjax: initAjax
}
export {api}
