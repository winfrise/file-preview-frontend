<template>
  <el-image class="img" :src="src" fit="contain" loading="lazy"></el-image>
</template>

<script setup>
const props = defineProps({
  src: {
    type: String,
    default: ''
  },
})
</script>

<style lang="scss" scoped>
.img {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
