import { defineStore } from 'pinia'
import {useUserStore} from '@store/useUserStore'
import {useMenuStore} from '@store/useMenuStore'
export const useStore = defineStore('storeId', {
    state: () => {
        return {
            user:useUserStore(),//用户个人信息仓库
            menu:useMenuStore(),//获取路由菜单仓库
        }
    },
    getters:{},
    actions:{},
})