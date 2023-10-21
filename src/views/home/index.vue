<template>
<div class="menu">
  <div class="menu-item" v-for="(item, index) in menuList" :key="index">
    <router-link :to="item.path">{{ item.label }}</router-link>
  </div>
</div>
</template>

<script setup>
  const menuList = [
    {label: '文件列表', path: '/file-list' },
    {label: '全屏列表', path: '/fullscreen-list' },
  ]
</script>

<style lang="scss" scoped>

</style>
