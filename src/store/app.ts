import { useAccountStore } from './account'

export const COLLAPSE = 'collapse'
export const TOKEN = 'token'
export const useAppStore = defineStore('app', {
  state() {
    return {
      title: '后台管理系统',
      device: 'desktop',
      token: '',
      sidebar: {
        collapse: localGet(COLLAPSE),
      },
    }
  },
  getters: {},

  actions: {
    clearToken() {
      // 清除token
      this.token = ''
      localRemove(TOKEN)
      // 清除用户信息
      const accountStore = useAccountStore()
      accountStore.userinfo = null
    },
    setCollapse(collapse) {
      this.sidebar.collapse = collapse
      localSet(COLLAPSE, collapse)
    },
    setToken(token) {
      this.token = token
      localSet(TOKEN, token)
    },
  },

})
