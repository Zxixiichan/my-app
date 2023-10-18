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
    // 进入后台管理系统首页  hooks => userLogin.ts：router.push('/')
    try {
        const userStore = useUserStore()
        const menuStore = useMenuStore()
        // 动态路由的方法，在这里调用
        initRouter(menuStore.menuList)
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
        // console.log(e);
        // 如果没有做持久化存储，store中的数据为空，会走catch，这里让它跳转到登录页
        next('/login')
        
    }
    
    next()

    
}
// 动态路由
const initRouter = (menuList:any[])=>{
    // 把原始数组克隆一份
    const newMenus = menuList || [];
    let menu = [...newMenus]
    console.log(menu);
    
    // 路由数组的数据重构的方法，在这里调用
    let menuRouter = filterAsyncRouter(menu)
    console.log('重构后数据',menuRouter);
    

    
}
// 路由菜单数据的重构
const filterAsyncRouter = (routerMap:any[])=>{ //routerMap里的数据是将原始数据复制之后得到的
    
    const accessdRouters:object[] = []
    routerMap.forEach(item=>{
        let route ={
            path:item.path,//字符串
            name:item.name,//字符串
            meta:item.meta,//Proxy(Object)
            children:item.children?filterAsyncRouter(item.children) : null,//Array
            component: loadComponent(item.component) //()=>import("src/views/system/role/index.vue")
            //item.component
                //system/user/index
                //......
                //system/role/index
        }
        accessdRouters.push(route)
    })
    return accessdRouters
}

//检索文件
const modulesPath = import.meta.glob('@renderer/views/**/*.vue') 
const modulesMap = {}//用于简化文件路径
//Object.keys返回一个由对象的键组成的数组
Object.keys(modulesPath).forEach(key=>{
    //key是每个文件的路径，把它们重构成和routerMap的item.component一样的结构
    const componentName = key.replace('/src/views/','').replace('.vue','')
    // 将重构之后的路径当做modulesMap对象的属性，将原来的路径当做属性值
    modulesMap[componentName] = modulesPath[key]
    // console.log(modulesMap); 
        //login/Login：()=>import("src/views/login/login.vue")
        //login/module/User
        //system/role/index:()=>import("src/views/system/role/index.vue")
}) 
console.log(modulesMap); 

// 包装动态路由组件路径
const loadComponent = (component)=>{
    //如果后端返回的item.children[i].component(字符串)存在
    if(component){
        return modulesMap[component] //system/role/index: 
    }
}













// 全局后置导航守卫
export const afterEach = ()=>{

}

