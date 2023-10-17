import request from "@utils/request";

// 获取图形验证码
export function captchaImg( params ){
    return request({
        url:'/captcha/image',
        params,
        responseType:'arraybuffer'
    })
}
// 用户登录
export function loginByJson( data ){
    return request({
        url:'/u/loginByJson',
        method:'post',
        data,
        
    })
}

// 获取个人信息
export function getInfo(){
    return request({
        url:'/personal/getInfo',
    })
}

// 获取路由
export function getRouters(rolePerm){
    return request({
        url:`/personal/getRouters/${rolePerm}`,
    })
}

// 登录动态验证码
export function sendCaptcha(params){
    return request({
        url:'/captcha/sendRegisterOrLoginCaptcha',
        params
    })
}

// 手机验证码登录
export function loginByMobile(data){
    return request({
        url:'/u/loginByMobile',
        method:'post',
        data
    })
}