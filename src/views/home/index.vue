<template>
  <div class="page-container">
    <div class="page-action-box">
      <el-button type="primary"  :icon="ArrowLeft" :disabled="breadList.length <= 1" @click="handleOpenDir(getBreadFullPath(breadList.length - 2))">返回上一级</el-button>

      <div class="location-box">
        当前位置：
        <el-breadcrumb separator="/">
          <el-breadcrumb-item v-for="(item, index) in breadList" :key="index" @click.enter="handleOpenDir(getBreadFullPath(index))">
            <span class="pointer">{{item}}</span>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>

    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="expand" width="20px">
        <template #default="scope">
          <el-form label-width="80px">
            <el-form-item label="修改日期">
              {{ scope.row.file_time }}
            </el-form-item>

            <el-form-item label="文件大小">
              {{scope.row.file_size}}KB
            </el-form-item>

            <el-form-item label="文件路径">
              <div style="word-break:break-all;">{{ scope.row.file_path }}</div>
            </el-form-item>

            <el-form-item label="完整路径">
              <div style="word-break:break-all;">{{ scope.row.full_path }}</div>
               <el-button size="mini" type="info" @click="handleCopy(scope.row.full_path)">复制路径</el-button>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

      <el-table-column prop="file_name" label="名称" min-width="100px" show-overflow-tooltip  />

      <el-table-column prop="icon" label="格式" width="60px">
        <template #default="scope">
          <span>{{scope.row.file_suffix || '目录'}}</span>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="100px">
        <template #default="scope">
          <div v-if="scope.row.type === 'file'">
            <el-button size="mini" type="primary" @click="handleJumpDetails(scope.row)">查看详情</el-button>
          </div>
          <div v-else-if="scope.row.type === 'dir'">
            <el-button size="mini" type="primary" @click="handleOpenDir(scope.row.file_path)">打开目录</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { getFileList } from '@/api/home.js'
import { ArrowLeft } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import useClipboard from 'vue-clipboard3'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()
const { toClipboard } = useClipboard()

// 当前文件夹路径
const currentPath = ref()
currentPath.value = route.query.path

// 面包屑列表
const breadList = computed(() => {
  return (currentPath.value || '').split('/').filter(item => !['.', '/'].includes(item))
})

const tableData = ref([])

// 请求获取数据
const fetchFileList = async (path) => {
  const [err, res] = await getFileList({path: path || currentPath.value })
  if (err) return
  const fileList = (res.data?.file || []).map(item => ({...item, type: 'file'}))
  const dirList = (res.data?.dir || []).map(item => ({...item, type: 'dir'}))
  tableData.value = [...dirList, ...fileList]
}
fetchFileList()

// 获取面包屑完整链接
const getBreadFullPath = (breadIndex) => {
  return './' + breadList.value.slice(0, breadIndex + 1).join('/')
}

// 复制
const handleCopy = (text) => {
  toClipboard(text)
    .then(() => {
      ElMessage({type: 'success', message: '复制成功'})
    })
}

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

// 文件夹切换
const handleOpenDir = (path) => {
  currentPath.value = path
  fetchFileList(path)

  router.replace({
    query: {
      path: path
    }
  })
}

</script>

<style lang="scss" scoped>
::v-deep {
  .el-form-item {
    margin-bottom: 10px;
  }
}
.page-container {
  padding: 20px;
}
.page-action-box {
  display: flex;
}
.location-box {
  margin-left: 20px;
  display: flex;
  align-items: center;
}
.pointer {
  cursor: pointer;
}
</style>
