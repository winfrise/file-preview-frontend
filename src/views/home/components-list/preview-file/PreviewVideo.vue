<template>
  <video :src="src" ref="videoRef" class="video" preload="metadata" controls loading="lazy"
          :autoplay="autoPlay"
  ></video>
</template>

<script setup>
const videoRef = ref(null)

const props = defineProps({
  src: {
    type: String,
    default: ''
  },
  autoPlay: {
    type: Boolean,
    default: false
  }
})

const pause = () => {
  videoRef.value.pause()
}
const play = () => {
  videoRef.value.play()
}
defineExpose({pause, play})
</script>

<style lang="scss" scoped>
.video {
  display: block;
  width: 100%;
  height: 100%;
  background: #000;
}
</style>
