<template>
  <div class="item">
    <div class="item-index">{{itemData.id}}.</div>
    <div class="file-name" @click="() => { itemData.type === 'dir' ? emits('changeCurrentPath', itemData.file_path) : handleJumpDetails(itemData) }">{{itemData.file_name}}</div>
  </div>
</template>

<script setup>
import useClipboard from 'vue-clipboard3'
import { useRoute, useRouter } from 'vue-router'

const { toClipboard } = useClipboard()
const router = useRouter()

const props = defineProps({
  itemData: {
    type: Object,
    default: () => ({})
  }
})

const emits = defineEmits(['changeCurrentPath'])

// 跳转到文件详情页
const handleJumpDetails = (row) => {
  const fileSuffix = row.file_suffix
  if (['mp4', 'mov', 'avi'].includes(fileSuffix)) {
    router.push({
      name: 'VideoDetails',
      query: {
        file_path: row.full_path
      }
    })
  } else if (['jpg', 'gif', 'jpg', 'jpeg'].includes(fileSuffix)) {
    router.push({
      name: 'PictureDetails',
      query: {
        file_path: row.full_path
      }
    })
  } else {
    ElMessage({type: 'error', message: '暂不支持'})
  }
}

// 复制
const handleCopy = (text) => {
  toClipboard(text)
    .then(() => {
      ElMessage({type: 'success', message: '复制成功'})
    })
}
</script>

<style lang="scss" scoped>
.item {
  position: relative;
  display: flex;
  padding: 10px 20px;
  border-bottom: 1px solid #ccc;
  &:hover {
    color: red;
    text-decoration: underline;
  }
  .item-index {
    position: absolute;
    left: -6px;
    transform: translateX(-100%);
  }
  .file-name {
    flex: 1;
    font-weight: bold;
    word-break:break-all;
  }
  .file-suffix {
    width: 60px;
  }
}
</style>
