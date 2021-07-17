import router from './router'
import store from './store'
import { getToken } from '@/utils/auth' // get token from cookie
// import getPageTitle from '@/utils/get-page-title'



router.beforeEach(async (to, from, next) => {
  //   document.title = getPageTitle(to.meta.title)
  const { auth = false } = to.meta

  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      const isLogin = store.getters.isLogin;
      if (isLogin) {
        next()
      } else {
        try {
          const info = await store.dispatch('getInfo')

          const accessRoutes = await store.dispatch('generateRoutes', ['0'])

          //  根据角色展示不同路由
          accessRoutes.forEach(e => {
            router.addRoute(e)
          })
          // 确保路由都加上了
          next({ ...to, replace: true })
        } catch (error) {
          // 报错重新登录
          await store.dispatch('resetToken')
          console.error(error || 'Has Error')
          next('/login')
        }
      }
    }
  } else {

    // 需要登录
    if (auth) {
      if (to.path === '/login') {
        next()
      } else
        // 没有token直接回到登录界面
        next('/login')
    } else {
      // 不需要登录界面直接展示
      next()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  // NProgress.done()
})
