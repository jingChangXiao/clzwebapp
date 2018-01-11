/**
 * Created by LEO
 * time 2017/12/19.
 * discribe 一些工具类
 */
class IsMobile {
  constructor () {
    let u = navigator.userAgent
    let browser = {
      versions: { // 移动终端浏览器版本信息
        trident: u.indexOf('Trident') > -1, // IE内核
        presto: u.indexOf('Presto') > -1, // opera内核
        webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, // 火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或者uc浏览器
        iPhone: u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1, // 是否iPad
        webApp: u.indexOf('Safari') === -1 // 是否web应该程序，没有头部与底部
      },
      language: (navigator.browserLanguage || navigator.language).toLowerCase()
    }

    if (browser.versions.mobile || browser.versions.ios || browser.versions.android ||
      browser.versions.iPhone || browser.versions.iPad) {
      this.isMobile = true
    } else {
      this.isMobile = false
    }
  }
}
/**
 * 处理树型数据
 * */
class HandleData {
  constructor (treeData, rootKey, categoryList) {
    this.categoryList = categoryList
    this.rootKey = rootKey
    this.treeData = treeData
    this.groups = {}
    this.iItem = 0
    this.categoryObj = {}
  }
  handleTree () {
    this.handleCategoryList()
    this.handleTreeReList()
    let rtList = this.groups[this.rootKey] ? this.handleTreeRe(this.groups[this.rootKey]) : []
    return rtList
  }
  handleCategoryList () {
    this.categoryList.forEach((item) => {
      let obj = {}
      Object.keys(item).forEach((itemKey) => {
        obj[itemKey] = item[itemKey]
      })
      obj.id = obj.key
      if (this.categoryObj[obj.category_id]) {
        this.categoryObj[obj.category_id].push(obj)
      } else {
        this.categoryObj[obj.category_id] = [obj]
      }
    })
  }
  handleTreeReList () {
    for (let i = 0; i < this.treeData.length; i++) {
      let parentId = this.treeData[i].parent_id ? this.treeData[i].parent_id : this.rootKey
      if (this.groups[parentId]) {
        this.groups[parentId].push(this.treeData[i])
      } else {
        this.groups[parentId] = [this.treeData[i]]
      }
    }
  }
  handleTreeRe (data) {
    let obj = []
    for (let i = 0; i < data.length; i++) {
      let itemObj = data[i]
      if (itemObj.category_name) {
        itemObj.label = itemObj.key
      } else {
        itemObj.label = itemObj.name
      }
      if (this.groups[data[i].id] && this.categoryObj[data[i].id]) {
        let itemList = this.handleTreeRe([...this.groups[data[i].id], ...this.categoryObj[data[i].id]])
        itemObj.children = itemList
      } else if (this.groups[data[i].id] && !this.categoryObj[data[i].id]) {
        let itemList = this.handleTreeRe(this.groups[data[i].id])
        itemObj.children = itemList
      } else if (!this.groups[data[i].id] && this.categoryObj[data[i].id]) {
        let itemList = this.handleTreeRe(this.categoryObj[data[i].id])
        itemObj.children = itemList
      }
      obj.push(itemObj)
    }
    return obj
  }
}
const
  comm = {IsMobile, HandleData}
export {
  comm
}
