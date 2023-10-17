import { defineStore } from 'pinia'
import { getRouters } from '@api/login'
import { useUserStore } from '@store/useUserStore'
export const useMenuStore = defineStore('menuId', {
  state: () => {
    return {
        menuMap:null, //用户路由数据,
        menuList:[],//用户菜单数据,
        menuIsCollapse:false//二级菜单开关
    }
  },
  getters: {},
  actions: {

    async getMenu() {
      let res = await getRouters(useUserStore().rolePerm)
      console.log(res) // res是一个数组，每一项是一个对象，包含id，name，path，redirect
      if(res.code=='200'){
        // const menu = normalizeMenu(res.data)
        // this.menuMap = menu.authMenuMap
        this.menuList = res.data //是一个Proxy响应式数据
      }
    },
    // 折叠二级菜单
    toggle_nextMenu(){
      this.menuIsCollapse = !this.menuIsCollapse
    }
  },
  //开启数据缓存（持久化存储）==》可以让res.data里的数据变成响应式数据
  persist: {
    enabled: true, //开启数据缓存
    strategies: [
      {
        storage: localStorage, //如果不写，默认是sessionStorage
        path: ['menuMap','menuList'] //配置哪些数据是需要持久化存储的，如果不写，默认都需要
      }
    ]
  }
})
/*function normalizeMenu(routes){
  
  // 该用户对应的路由表
  let userRoutes = [
    // {
    //   path:'/',
    //   name:'首页'
    // },
  
    ...routes
    // {
    //   id:'1', 
    //   path:'/process',
    //   name:'办理',
    //   children:[{},{},{}],
    //   meta:{title:'办理',icon:''}
    // },
  ]
  // 通常，"auth" 作为前缀用于命名与身份验证相关的变量、函数或模块
  // 身份验证用于确认用户的身份
  const authMenuMap = normalizeMenuItem(userRoutes,new Map())
  return {
    userRoutes,
    authMenuMap
  }

}
function normalizeMenuItem(routes,map){
  routes.forEach(item => {
    map.set(item.path, item) 
    if(item.children){
      return normalizeMenuItem(item.children, map)
    }
  });
  return map
}*/