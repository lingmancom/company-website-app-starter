import { localRemove, localSet } from 'lingman-web'
import { Api } from '@/api'

export const CURRENT_PROJECT = 'CURRENT_PROJECT'
export const PROJECTS = 'PROJECTS'

export const useAccountStore = defineStore('account', {
  state() {
    return {
      userinfo: null as null | UserInfo,
      token: '',
    }
  },
  getters: {},

  actions: {
    // 获取用户信息
    async getUserinfo() {
      const res = await Api.getUserInfo()
      this.userinfo = res
      return Promise.resolve(res)
    },
    setToken(token) {
      this.token = token
      localSet('token', token)
    },
    clearToken() {
      // 清除token
      this.token = ''
      localRemove('token')
      // 清除用户信息
      this.userinfo = null
    },
  },

})
