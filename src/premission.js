// 权限
import router from './router'
// 全局前置守卫
router.beforeEach(function (to, from, next) {
  if (to.path.startsWith('/home')) {
    let token = localStorage.getItem('user-token')
    // 如果token存在，放行
    if (token) {
      next()
    } else {
      // token不存在，跳到登录页面
      next('/login')
    }
  } else {
    next()
  }
})
// 导出路由
export default router
