<template>
<div class="preview-file">
  <PreviewPicture v-if="pictureSuffixs.includes(itemData.file_suffix)" :src="itemData.full_path" />
  <PreviewVideo v-else-if="videoSuffixs.includes(itemData.file_suffix)" :src="itemData.full_path" />
  <div v-else>不支持预览<br>{{ itemData.full_path }}</div>
</div>
</template>

<script setup>
import PreviewPicture from './PreviewPicture.vue';
import PreviewVideo from './PreviewVideo.vue';

const pictureSuffixs = ['jpg', 'gif', 'jpg', 'jpeg']
const videoSuffixs = ['mp4', 'mov', 'avi']

const props = defineProps({
  itemData: {
    type: Object,
    default: () => ({})
  }
})
</script>

<style lang="scss" scoped>
.preview-file {
  width: 100vw;
  height: 100vh;
}
</style>
