<template>
  <div class="layer-box" ref="layerBoxRef" :style="{transform: `translateX(${layerBoxTranslateX})`}">
    <div class="location-box">
        当前位置：
        <el-breadcrumb separator="/">
          <el-breadcrumb-item v-for="(item, index) in breadList" :key="index" @click.enter="handleChangeCurrentPath(getBreadFullPath(index))">
            <span class="pointer">{{item}}</span>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    <div v-for="(item, index) in dirList" :key="index">
      <DirItem :itemData="item" @changeCurrentPath="handleChangeCurrentPath" />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import DirItem from '../item/index.vue'

import { usePointerMove } from '../../hooks/usePointerMove.js';

const emits = defineEmits(['changeCurrentPath'])

const props = defineProps({
  dirList: {
    type: Array,
    default: () => ([])
  },
  currentPath: {
    type: String,
    required: true
  }
})

const layerBoxTranslateX = ref('100%')
const layerBoxRef = ref()
defineExpose({
  layerBoxTranslateX
})

const breadList = computed(() => {
  return (props.currentPath || '').split('/').filter(item => !['.', '/'].includes(item))
})

const getBreadFullPath = (breadIndex) => {
  return './' + breadList.value.slice(0, breadIndex + 1).join('/')
}

const handleChangeCurrentPath = (path) => {
  emits('changeCurrentPath', path)
}

usePointerMove({
  el: layerBoxRef,
  on: {
    touchEnd: ({distX, distY, directionX, directionY}) => {
      if (directionX === 'right' && distX > distY) {
        layerBoxTranslateX.value = '100%'
      }
    }
  }
})

</script>

<style lang="scss" scoped>
::v-deep {
  .el-breadcrumb__inner {
    color: #fff!important;
  }
}
.layer-box {
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  transform: translateX(90%);
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  transition: transform ease .2s;
  color: #fff;
}

.location-box {
  margin: 20px;
  display: flex;
  align-items: center;
}
</style>
