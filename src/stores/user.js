import { defineStore } from 'pinia'
import Cookies from 'js-cookie'
import { login, logout } from '@/api/user'
import router from '@/router'

export const useUserStore = defineStore('counter', {
  state: () => {
    return {
      token: Cookies.get('token') || ''
    }
  },
  actions: {
    async login(params) {
      const [err, res] = await login(params)
      if (!err) {
        const token = res.data.token
        Cookies.set('token', token)
        this.token = token
      }

      return [err, res]
    },
    async logout() {
      const [err, res] = await logout()

      Cookies.remove('token')
      this.token = null
      router.push({path: '/login'})
      return [err, res]
    }
  }
})
