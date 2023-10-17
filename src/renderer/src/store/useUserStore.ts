import { defineStore } from 'pinia'
import { getInfo } from '@api/login'

export const useUserStore = defineStore('userId', {
  state: () => {
    return {
      rolePerm: '', //路由权限编码
      permissions: '' //用户权限信息
    }
  },
  getters: {},
  actions: {
    async getUserInfo() {
      let res = await getInfo()
      console.log(res)
      // res里面有permissions（用户权限）、roles[0].rolePerm（路由权限编码）、units、userInfo、wechat
      this.rolePerm = res.data.roles[0].rolePerm
      this.permissions = res.data.permissions[0]
    }
  },
  //开启数据缓存（持久化存储）
  persist: {
    enabled: true, //开启数据缓存
    strategies: [
      {
        storage: localStorage, //如果不写，默认是sessionStorage
        path: ['rolePerm', 'permissions'] //配置哪些数据是需要持久化存储的，如果不写，默认都需要
      }
    ]
  }
})
