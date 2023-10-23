<template>
<div class="preview-file" ref="targetRef">
  <PreviewPicture v-if="pictureSuffixs.includes(itemData.file_suffix)" :src="itemData.full_path" />
  <PreviewVideo ref="videoRef" v-else-if="videoSuffixs.includes(itemData.file_suffix)"
                :src="itemData.full_path"
  />
  <div v-else class="no-support">
    <el-empty :image-size="120">
      <template #description>
        <p>该文件不支持预览</p>
        <p >{{ itemData.full_path }}</p>
      </template>
    </el-empty>
  </div>
</div>
</template>

<script setup>
import PreviewPicture from './PreviewPicture.vue';
import PreviewVideo from './PreviewVideo.vue';

import { useIntersectionObserver } from '@vueuse/core'

const pictureSuffixs = ['jpg', 'gif', 'jpg', 'jpeg']
const videoSuffixs = ['mp4', 'mov', 'avi', 'mkv', 'flv', '3gp']

const props = defineProps({
  itemData: {
    type: Object,
    default: () => ({})
  },
})



const targetRef = ref(null)
const videoRef = ref(null)
const { stop } = useIntersectionObserver(
  targetRef,
  ([{ isIntersecting }], observerElement) => {
    if (!isIntersecting) {
      videoRef.value && videoRef.value.pause()
    }
  },
)

defineExpose({
  videoRef
})
</script>

<style lang="scss" scoped>
.preview-file {
  width: 100vw;
  height: 100vh;
}
.no-support {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>
