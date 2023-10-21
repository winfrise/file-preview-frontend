<template>
<div class="menu-list">
  <div class="menu-item" v-for="(item, index) in menuList" :key="index">
    <el-icon style="font-size: 30px;"><Reading /></el-icon>
    <router-link :to="item.path">{{ item.label }}</router-link>
  </div>
</div>
</template>

<script setup>
  const menuList = [
    {label: '文件列表', path: '/file-list' },
    {label: 'Swiper列表', path: '/swiper-list' },
  ]
</script>

<style lang="scss" scoped>
.menu-list {
  display: flex;
  margin: 10px;
}
.menu-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100px;
  border: 1px solid #ccc;
  margin: 10px;
  border-radius: 4px;
  &:hover {
    border-color: #666;
    background: #eee;
  }
}
</style>
