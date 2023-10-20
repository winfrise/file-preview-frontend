<template>
  <div class="video-details">
    <el-image class="img" :src="filePath" fit="contain"></el-image>
  </div>
</template>

<script setup>
  import { useRoute, useRouter } from 'vue-router'

  const route = useRoute()
  const filePath = ref()
  filePath.value = route.query.file_path
</script>

<style lang="scss" scoped>
.video-details {
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 1);
}
.img {
  display: block;
  width: 100%;
  height: 100%;
}

</style>
