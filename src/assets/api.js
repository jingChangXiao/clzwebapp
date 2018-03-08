import {post, productUrl} from './index'
export default {
  login (param) {
    return post(productUrl() + '/xxx/xxx.do', param)
  }
}
