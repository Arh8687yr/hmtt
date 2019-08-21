import Vue from 'vue'
import App from './App.vue'
import router from './premission'
import ElementUI from 'element-ui' // 引入Element-UI
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import './assets/style/index.less' // 引入less样式文件
import axios from './util/axios.config' // 引入自定义axios文件
import Component from './components' // 引入自定义全局组件

Vue.prototype.$axios = axios // 将axios给Vue原型

Vue.use(Component) // 使用自定义全局组件

Vue.config.productionTip = false

Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
