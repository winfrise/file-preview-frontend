<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!route.meta.keepAlive" />
  </div>
</template>

<script setup>
const route = useRoute()
</script>

<style lang="scss" scoped>
#app {
  font-family: 'Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
