<template>
  <video :src="src" ref="videoRef" class="video" preload="metadata" controls loading="lazy"></video>
</template>

<script setup>
const videoRef = ref(null)

const props = defineProps({
  src: {
    type: String,
    default: ''
  }
})

const pause = () => {
  videoRef.value.pause()
}
defineExpose({pause})
</script>

<style lang="scss" scoped>
.video {
  display: block;
  width: 100%;
  height: 100%;
  background: #000;
}
</style>
