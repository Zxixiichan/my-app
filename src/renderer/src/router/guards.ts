import { useUserStore } from "@store/useUserStore"
import { useMenuStore } from  "@store/useMenuStore"
import config from "@config"
import { ElMessage } from "element-plus"
import AppRouter from "./index"

// 全局前置导航守卫
export const beforeEach = (to,from,next)=>{
    // 判断是否已经在登录页面
    if(to.path == '/login'){
        next() // 如果已经在登录页面，直接调用next() 
        return
    }
    // 如果没有token，那么就跳转到登录页
    if(!localStorage.getItem('TOKEN')){
        next('/login')
        return
    }
    try {
        // 进入后台管理系统
        const userStore = useUserStore()
        const menuStore = useMenuStore()
        console.log(userStore.permissions);
        // 如果用户是最高权限("*:*:*")，直接通行
        if(userStore.permissions == config.PERMISSIONS){
            next()
        }
        // 如果没一个路由，不能进入某页面
        if(!menuStore.menuMap.has(to.path)){
            ElMessage.error('sorry~~您访问的页面不存在')
            AppRouter.replace('/dashboard')
            return
        }
        
    } catch (e) {
        console.log(e);
        // 如果没有做持久化存储，store中的数据为空，会走catch，这里让它跳转到登录页
        next('/login')
        
    }
    
    next()

    
}
// 全局后置导航守卫
export const afterEach = ()=>{

}