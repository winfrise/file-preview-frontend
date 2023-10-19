<template>
  <div class="nav-bar">
    <div></div>
    <div class="right">
      <el-button @click="logout">退出</el-button>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()

const logout = () => {
  userStore.logout()
}

</script>

<style lang="scss" scoped>
.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  padding: 0 20px;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
}
</style>
