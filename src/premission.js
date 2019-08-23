import router from './router'

// 全局前置导航守卫
router.beforeEach((to, from, next) => {
  // to : router 对象  要去哪
  // from : router 对象 从哪里来
  // next() 函数 表示放行 next(要去的路由地址)
  if (to.path.startsWith('/home')) {
    // 登录时存放的用户信息表
    let user = window.localStorage.getItem('user-info')
    if (user) {
      // 如果用户信息表存在，就转为JSON对象
      let userInfo = JSON.parse(user)
      // 如果取出的token存在，说明用户有登录信息
      if (userInfo && userInfo.token) {
        next()
      } else {
        next('/login')
      }
    } else {
      next('/login')
    }
  } else {
    next() // 放行
  }
})

export default router
