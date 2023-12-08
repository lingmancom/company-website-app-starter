import { toLogin } from './utils'

cfg.getApiRoot = () => {
  return localStorage.getItem('port') || window.__BASE_API
}
cfg.getHttpHeader = () => ({
  token: localGet('token') || '',
})
cfg.makeLogout = () => {
  // 清除token
  const accountStore = useAccountStore()
  accountStore.clearToken()
  toLogin()
}
cfg.showErrorToast = (msg: string) => ElMessage.error(msg)
cfg.showInfoToast = (msg: string) => ElMessage.info(msg)

service.interceptors.request.use((config) => {
  config.timeout = 30 * 1000
  return config
})
