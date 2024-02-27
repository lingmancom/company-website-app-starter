import { toLogin } from './utils'

Object.assign(cfg.request, {
  getApiRoot: () => {
    return window.__BASE_API
  },
  getHttpHeader: () => ({
    token: localGet('token') || '',
  }),
  makeLogout: () => {
    // 清除token
    const accountStore = useAccountStore()
    accountStore.clearToken()
    toLogin()
  },
  showErrorToast: (msg: string) => ElMessage.error(msg),
  showInfoToast: (msg: string) => ElMessage.info(msg),
})
