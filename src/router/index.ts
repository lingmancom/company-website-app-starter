import { createRouter, createWebHashHistory } from 'vue-router'
import { localGet } from 'lingman-web'
import redirect from './modules/redirect'
import error from './modules/error'
import login from './modules/login'
import home from './modules/home'
import { toLogin } from '@/utils'

/* 菜单栏的路由 */
// 固定菜单
export const fixedRoutes: AppRouterRaw[] = [...home]
// 动态菜单
export const asyncRoutes: AppRouterRaw[] = []

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    ...redirect,
    ...login,
    ...fixedRoutes,
    ...asyncRoutes,
    ...error,
  ] as any[],
  // scrollBehavior: () => ({ left: 0, top: 0 }),
})

function getPageTitle(title) {
  const appStore = useAppStore()
  const appTitle = appStore.title
  if (title)
    return `${title} - ${appTitle}`
  return appTitle
}

// 白名单，里面是路由对象的name
const WhiteList = ['login']

// vue-router4的路由守卫不再是通过next放行，而是通过return返回true或false或者一个路由地址
router.beforeEach(async (to) => {
  document.title = getPageTitle(!!to.meta && to.meta.title)

  if (WhiteList.includes(to.name as string))
    return true

  if (!localGet(TOKEN)) {
    toLogin()
    return false
  }
  else {
    const accountStore = useAccountStore()
    // 获取用户角色信息，根据角色判断权限
    let userinfo = accountStore.userinfo
    if (!userinfo) {
      try {
        // 获取用户信息
        userinfo = await accountStore.getUserinfo()
      }
      catch (err) {
        return false
      }
    }
    // return to.fullPath
  }
})

export default router
