/**
 * author Leo
 * discribe 插件，插件后面需要按插件用途来拆分。
 * date 2018/01/20
 * */
import contentTitle from '@/components/public/title.vue'
var myPlugin = {}
myPlugin.config = {}

myPlugin.install = (Vue) => {
  // 1. 添加全局方法或属性
  Vue.myGlobalMethod = function () {
    // 逻辑...
  }

  // 2. 添加全局资源
  Vue.directive('test-directive', {
    bind (el, binding, vnode, oldVnode) {
      // 逻辑...
    }
  })

  // 3. 注入组件
  Vue.mixin({
    components: {
      contentTitle
    },
    methods: {
      getTypeName (name, value) {
        if (this.getTypeNameData.data && this.getTypeNameData.data[name]) {
          return this.getTypeNameData.data[name][value]
        } else {
          return ''
        }
      },
      formatFnItem (val) {
        if (val || val === 0) {
          return ('0' + (val + 1)).slice(-2)
        } else {
          return '00'
        }
      },
      // 接收时间戳，转成日期格式，根据项目需求拓展此方法
      formatFn (val, format) {
        if (!val) {
          return ''
        }
        let date = new Date(val)
        let rtStr
        if (!format) {
          rtStr = `${date.getFullYear()}/${this.formatFnItem(date.getMonth())}/${('0' + date.getDate()).slice(-2)}`
        } else {
          let formatLc = format
          rtStr = formatLc.replace(/yyyy/g, date.getFullYear()).replace(/MM/g, this.formatFnItem(date.getMonth())).replace(/dd/g, this.formatFnItem(date.getDate()))
                          .replace(/hh/g, this.formatFnItem(date.getHours())).replace(/mm/g, this.formatFnItem(date.getMinutes())).replace('ss', this.formatFnItem(date.getMilliseconds()))
        }
        return rtStr
      }
    }
  })

  // 4. 添加实例方法
  Vue.prototype.$myMethod = function (methodOptions) {
    // 逻辑...
  }
}
export {myPlugin}
