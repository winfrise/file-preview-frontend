<template>
  <div class="details">
    <PreviewFile :itemData="itemData" />
  </div>
</template>

<script setup>
  import PreviewFile from './components-list/preview-file/index.vue'

  import { useRoute, useRouter } from 'vue-router'
  const route = useRoute()

  const itemData = JSON.parse(decodeURIComponent(route.query.item_data))

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
