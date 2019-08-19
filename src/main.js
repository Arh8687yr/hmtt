import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui' // 引入Element-UI
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import './assets/style/index.less'

Vue.config.productionTip = false

Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
