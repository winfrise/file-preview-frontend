<template>
  <div id="app">
    <!--
    <keep-alive>
      <router-view v-if="route.meta.keepAlive" />
    </keep-alive>

    <router-view v-if="!route.meta.keepAlive" />
    -->

    <router-view v-slot="{ Component }">
      <keep-alive v-if="route.meta.keepAlive">
        <component :is="Component" />
      </keep-alive>
      <component v-else :is="Component" />
    </router-view>
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
