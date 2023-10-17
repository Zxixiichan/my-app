export const AppRouters = [
    {
        path:'/',
        redirect:'/dashboard',
        //重定向后，component不会生效，需要单独写一个path，然后再引入组件
        // component:()=>import('@layout/index.vue')
    },
    {
        path:'/dashboard',
        name:'首页',
        component:()=>import('@layout/index.vue')
    },
    {
        path:'/login',
        component:()=>import('@views/login/Login.vue')
    }
]