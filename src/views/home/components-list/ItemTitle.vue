<template>
  <div class="item-title">
    <div class="item-index">{{itemData.id}}.</div>
    <div class="file-name">{{itemData.file_name}}</div>
    <div class="file-suffix">{{itemData.file_suffix || '目录'}}</div>
    <div class="row-controls">
      <div v-if="itemData.type === 'file'">
        <el-button size="mini" type="primary" @click="handleJumpDetails(itemData)">查看详情</el-button>
      </div>
      <div v-else-if="itemData.type === 'dir'">
        <el-button size="mini" plain type="primary" @click="handleOpenDir(itemData.file_path)">打开目录</el-button>
      </div>
    </div>
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

// 打开目录
const handleOpenDir = (path) => {
  emits('changeCurrentPath', path)
}
</script>

<style lang="scss" scoped>
.item-title {
  position: relative;
  display: flex;
  .item-index {
    position: absolute;
    left: -6px;
    transform: translateX(-100%);
  }
  .file-name {
    flex: 1;
    font-weight: bold;
  }
  .file-suffix {
    width: 60px;
  }
  .row-controls {
    width: 100px;
  }
}
</style>
