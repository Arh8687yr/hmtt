import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui' // 引入Element-UI
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import './assets/style/index.less' // 引入less样式文件
import axios from 'axios' // 引入axios文件
import Component from './components' // 引入自定义全局组件

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 将后台接口的地址给axios的baseURL

Vue.prototype.$axios = axios // 将axios给Vue原型
Vue.use(Component)
Vue.config.productionTip = false

Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
