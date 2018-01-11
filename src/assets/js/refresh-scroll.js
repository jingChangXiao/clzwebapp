/**
 * @file
 * @author 刘勇
 * @date 2017/12/22
 */
import {api} from '@/assets/js/api'
export default {
  /**
   * 分页列表查询
   * @param list 列表数据
   * @param option 操作选项 'loadMore'：加载下一页,'refresh':刷新
   */
  listReq: function (list, option, callback) {
    let postData = {
      url: list.url,
      param: list.searchObject,
      method: list.type || 'POST'
    }
    api.initAjax(postData).then((response) => {
      if (response.status) {
        if (response.data) {
          list.hasmore = response.data.length === list.searchObject.s
          if (option === 'loadMore') {
            list.data = list.data.concat(response.data)
          } else if (option === 'refresh') {
            list.data = response.data
            callback && callback(response.data)
          } else {
            if (response.data.length === 0 || !list.hasmore) {
              list.scroll.disablePullupToRefresh()
            } else {
              list.scroll.enablePullupToRefresh()
              list.scroll.refresh(true)
            }
            list.data = response.data
            list.scroll.scrollTo(0, 0, 100)
            callback && callback(response.data)
          }
          list.isEmpty = list.data.length === 0
        } else {
          mui.toast('未找到数据')
        }
      } else {
        mui.toast('网络请求失败')
      }
      if (option === 'loadMore') {
        list.scroll.endPullupToRefresh(!list.hasmore)
      } else if (option === 'refresh') {
        list.scroll.endPulldownToRefresh()
        list.scroll.refresh(true)
      }
    })
  },
  /**
   * 设置列表滚动对象
   */
  setListScroll: function (list, scroll) {
    list.scroll = scroll
  },
  /**
   * 列表刷新
   */
  listRefresh: function (list) {
    list.searchObject.p = 1
    this.listReq(list, 'refresh')
  },
  /**
   * 列表加载下一页
   */
  listLoadMore: function (list) {
    list.searchObject.p++
    this.listReq(list, 'loadMore')
  },
  /**
   * 通过url加载js库
   * @param url
   * @returns {Promise} 返回一个promiss
   */
  load: function (url) {
    return new Promise(function (resolve, reject) {
      var script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = url
      script.onload = resolve
      script.onerror = reject
      document.body.appendChild(script)
    })
  }
}
