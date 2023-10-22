<template>
  <div class="item">
    <el-icon class="item-icon"><Folder /></el-icon>
    <div class="file-name" @click="() => { itemData.type === 'dir' ? emits('changeCurrentPath', itemData.file_path) : handleJumpDetails() }">{{itemData.file_name}}</div>
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
const handleJumpDetails = () => {
  router.push({
    name: 'Details',
    query: {
      item_data: encodeURIComponent(JSON.stringify(props.itemData))
    }
  })
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
  align-items: center;
  cursor: pointer;
  &:hover {
    color: red;
    text-decoration: underline;
  }
  .item-icon {
    font-size: 18x;
  }
  .file-name {
    flex: 1;
    font-weight: bold;
    word-break:break-all;
    margin-left: 6px;
  }
  .file-suffix {
    width: 60px;
  }
}
</style>
