<template>
  <el-form
    ref="loginForm"
    :model="form"
    :rules="rules"
    label-width="0"
    size="large"
    @keyup.enter="login"
  >
    <el-form-item prop="user">
      <el-input
        v-model="form.username"
        :prefix-icon="User"
        clearable
        placeholder="请输入账号"
      >
      </el-input>
    </el-form-item>

    <el-form-item prop="password">
      <el-input
        v-model="form.password"
        :prefix-icon="Lock"
        clearable
        show-password
        placeholder="请输入密码"
      ></el-input>
    </el-form-item>

    <!--验证码-->
    <el-form-item>
      <div class="boxCode">
        <el-input
          v-model="form.captcha"
          :prefix-icon="CircleCheck"
          clearable
          placeholder="请输入验证码"
          class="plinpnt"
        ></el-input>
        <el-image :src="captcha.url" @click="getCodeApi" class="code"></el-image>
      </div>
    </el-form-item>

    <el-form-item style="margin-bottom: 10px">
      <el-col :span="12">
        <el-checkbox v-model="checkPassword">记住密码</el-checkbox>
      </el-col>
      <el-col :span="12" class="login-forgot">
        <router-link to="/reset_password">忘记密码？</router-link>
      </el-col>
    </el-form-item>

    <!-- 记住密码 -->
    <el-form-item>
      <el-button type="primary" style="width: 100%" round @click="login">
        登录
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, reactive, onBeforeMount, } from "vue"
import { captchaImg, loginByJson } from '@api/login'
//aes
import { Encrypt } from "@utils/aes"
//hooks
import useLogin from "@hooks/useLogin"
//图标
import { User,Lock,CircleCheck } from '@element-plus/icons-vue'

//表单数据
const form = reactive({
    username:'',
    password:'',
    captcha:''
})

// 表单验证规则
const rules = reactive({

})

// 记住密码
const checkPassword = ref(false)

// 生命周期
onBeforeMount(()=>{
    getCodeApi()
})

// 验证码图片
const captcha = reactive({
    url:'',
    key:''
})

// 生成验证码
const getCodeApi = async ()=>{
    const key = new Date().getTime().toString()
    captcha.key = key
    const res = await captchaImg({
        key,
    })
    let blob = new Blob([res], {type:'application/vnd.ms-excel'})
    let imgUrl = URL.createObjectURL(blob)
    captcha.url = imgUrl
} 


// 登录
const login = async ()=>{
    let res = await loginByJson({
        username:Encrypt(form.username),
        password:Encrypt(form.password),
        key:captcha.key,
        captcha:form.captcha
    })
    // console.log(res);
    if(res.code == '200'){
        // 调用hooks
        useLogin(res.data)//token
    }
}
</script>

<style scoped>
.boxCode{
  display: flex;
  align-items: center;
  width: 100%;
}
.code{
  margin-left: 10px;
  height: 40px;
  cursor: pointer;
}
</style>
