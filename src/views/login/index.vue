<template>
  <div class="login-page">
    <div class="login-container">
      <p class="title">登录</p>
      <el-form ref="formRef" :model="formdata" :rules="rules">
        <el-form-item prop="username">
          <el-input
            size="large"
            v-model.trim="formdata.username"
            clearable
            placeholder="请输入用户名"
          >
            <template #prefix>
              <svg-icon name="login-phone" width="18px" height="20px" />
            </template>
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            size="large"
            type="password"
            v-model.trim="formdata.password"
            maxlength="20"
            clearable
            show-password
            placeholder="请输入密码"
          >
            <template #prefix>
              <svg-icon name="login-password" width="16px" height="20px" />
            </template>
          </el-input>
        </el-form-item>

        <el-button type="primary" size="large" style="width: 100%" :disabled="loginLoading" :loading="loginLoading" @click="submit">
          {{ loginLoading ? '正在登录...' : '登录' }}
        </el-button>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const router = useRouter()

const formRef = ref()

const loginLoading = ref(false)
const codeUrl = ref('')
// 7天内自动登录
const checked = ref(false)

const formdata = reactive({
  username: 'admin',
  password: '123456'
})


const rules = reactive({
  username: { required: true, message: '请输入用户名', trigger: 'blur' },
  password: { required: true, message: '请输入密码', trigger: 'blur' }
})


const submit = () => {
  if (loginLoading.value) return
  loginLoading.value = true
  formRef.value?.validate(async valid => {
    if (!valid) return
    const [err, res] = await userStore.login(formdata)
    loginLoading.value = false
    if (err) return
    router.push({path: '/'})
  })
}


</script>

<style lang="scss" scoped>
:deep() {
  .el-form-item {
    margin-bottom: 30px;
  }
}
.login-page {
  width: 100vw;
  height: 100vh;
  background: #4d7ff9;
  position: relative;

  .login-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 440px;
    background: #fff;
    box-shadow: 0 10px 30px 0 rgba(0, 39, 134, 0.102);
    border-radius: 6px;
    padding: 40px 40px;
    box-sizing: border-box;
    .title {
      color: #333;
      font-size: 32px;
      text-align: center;
      letter-spacing: 4px;
      line-height: 1;
    }
  }
}
</style>
