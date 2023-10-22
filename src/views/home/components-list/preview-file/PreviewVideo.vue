<template>
  <video :src="src" class="video" preload="metadata" controls loading="lazy"></video>
</template>

<script setup>
const props = defineProps({
  src: {
    type: Object,
    default: () => ({})
  }
})
</script>

<style lang="scss" scoped>
.video {
  display: block;
  width: 100%;
  height: 100%;
  background: #000;
}
</style>
