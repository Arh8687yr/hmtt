import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/login' // 引入login组件(一级路由)
import Home from './views/home' // 引入home组件(一级路由)
import Main from './views/home/main.vue' // 引入首页视图组件

Vue.use(Router)

export default new Router({
  routes: [
    {
      // 设置路由重定向
      path: '/',
      redirect: { name: 'login' }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path: '',
          component: Main
        },
        {
          path: '/home/comment',
          component: () => import('./views/comment')
        }, {
          path: '/home/articles', // 内容列表
          component: () => import('./views/articles') // 按需加载的写法
        }
      ]
      // path: '/about',
      // name: 'about',
      // // route level code-splitting
      // // this generates a separate chunk (about.[hash].js) for this route
      // // which is lazy-loaded when the route is visited.
      // component: () =>
      //             import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
