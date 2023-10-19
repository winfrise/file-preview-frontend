<template>
  <div class="video-details">
    <VideoPlayer :src="filePath"></VideoPlayer>
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
}

</style>
