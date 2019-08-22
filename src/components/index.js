import homeAside from './home/home-aside' // 引入左侧导航栏模板
import homeHead from './home/home-head' // 引入右侧头部模板
import breadCrumb from './common/bread-crumb' // 引入面包屑模板

export default {
  install (Vue) {
    Vue.component('home-aside', homeAside)
    Vue.component('home-head', homeHead)
    Vue.component('bread-crumb', breadCrumb) // 注册全局面包屑
  }
}
