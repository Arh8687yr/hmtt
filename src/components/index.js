import homeAside from './home/home-aside'
import homeHead from './home/home-head'

export default {
  install (Vue) {
    Vue.component('home-aside', homeAside)
    Vue.component('home-head', homeHead)
  }
}
