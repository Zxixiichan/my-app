<template>
  <el-form
    ref="loginForm"
    :model="form"
    :rules="rules"
    label-width="0"
    size="large"
    @keyup.enter="login"
  >
    <el-form-item prop="mobile">
      <el-input v-model="form.mobile" :prefix-icon="Iphone" clearable placeholder="请输入手机号">
        <template #prepend>+86</template>
      </el-input>
    </el-form-item>
    <el-form-item prop="captcha" style="margin-bottom: 35px">
      <div class="login-msg-yzm">
        <el-input
          v-model="form.captcha"
          :prefix-icon="Unlock"
          placeholder="请输入验证码"
        ></el-input>
        <el-button @click="getCode" :disabled="disabled">
          发送验证码
          <span v-if="disabled"> ({{ time }}) </span>
        </el-button>
      </div>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" style="width: 100%" :loading="islogin" round @click="login">
        登录
      </el-button>
    </el-form-item>
    <!-- <div class="login-reg">
      {{ $t('login.noAccount') }}
      <router-link to="/user_register">{{ $t('login.createAccount') }}</router-link>
    </div> -->
  </el-form>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { Unlock, Iphone } from '@element-plus/icons-vue'
import { sendCaptcha,loginByMobile } from '@api/login'
import { Encrypt } from '@utils/aes'
//hooks
import useLogin from "@hooks/useLogin"
import { ElMessage } from 'element-plus'

// 表单
const form = reactive({
  mobile: '',
  captcha: ''
})

const rules = reactive({})

// 发送验证码按钮的状态
const disabled = ref(false)
// 倒计时
const time = ref(10)
// 点击发送验证码按钮
const getCode = async () => {
  let res = await sendCaptcha({ mobile: Encrypt(form.mobile) })
  if (res.code != '200') {
    return ElMessage({
      message: '发送失败',
      type: 'error'
    })
  }
  ElMessage({
    message: '发送成功',
    type: 'success'
  })
  disabled.value = true
  time.value = 10
  let t = setInterval(() => {
    time.value -= 1
    if (time.value < 1) {
      clearInterval(t)
      disabled.value = false
      time.value = 0
    }
  }, 1000)
}
// 登录
const login = async () => {
  let res = await loginByMobile({
    mobile:Encrypt(form.mobile),
    captcha: Encrypt(form.captcha)
  })
  console.log(res)
  if (res.code == '200') {
    // 调用hooks
    useLogin(res.data)
  }
}
</script>

<style></style>
