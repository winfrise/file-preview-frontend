<template>
  <el-form>
    <el-form-item label="修改日期">
      {{ itemData.file_time }}
    </el-form-item>

    <el-form-item label="文件大小">
      {{itemData.file_size}}KB
    </el-form-item>

    <el-form-item label="文件格式">
      {{itemData.file_suffix}}
    </el-form-item>

    <el-form-item label="文件路径">
      <div style="word-break:break-all;">{{ itemData.file_path }}</div>
    </el-form-item>

    <el-form-item label="完整路径">
      <div style="word-break:break-all;">
        {{ itemData.full_path }}
        <el-button plain style="margin-left: 10px;" size="mini" type="info" @click="handleCopy(itemData.full_path)">复制路径</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script setup>
import useClipboard from 'vue-clipboard3'
const { toClipboard } = useClipboard()

const props = defineProps({
  itemData: {
    type: Object,
    default: () => ({})
  }
})

// 复制
const handleCopy = (text) => {
  toClipboard(text)
    .then(() => {
      ElMessage({type: 'success', message: '复制成功'})
    })
}
</script>

<style lang="scss" scoped>
::v-deep {
  .el-form-item {
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
