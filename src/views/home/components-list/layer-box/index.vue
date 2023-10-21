<template>
  <div class="layer-box" ref="layerBoxRef" :style="{transform: `translateX(${layerBoxTranslateX})`}">
    <div v-for="(item, index) in dirList" :key="index">
      <DirItem :itemData="item" @changeCurrentPath="handleChangeCurrentPath" />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import DirItem from '../item/index.vue'

import { useEventListener } from '@vueuse/core'

const props = defineProps({
  dirList: {
    type: Array,
    default: () => ([])
  }
})

const layerBoxTranslateX = ref('100%')
const layerBoxRef = ref()
defineExpose({
  layerBoxTranslateX
})

onMounted(() => {
  ;(() => {
    let startPoint = [null, null]
    useEventListener(layerBoxRef, 'touchstart', (e) => {
      startPoint = [e.touches[0].pageX, e.touches[0].pageY]
    })
    useEventListener(layerBoxRef, 'touchmove', (e) => {
      let movePoint = [e.changedTouches[0].pageX, e.changedTouches[0].pageY]
      const horizontalDist = movePoint[0] - startPoint[0]
      if (horizontalDist > 0 && layerBoxTranslateX.value !== '100%') {// 向右滑动
        layerBoxTranslateX.value = `calc(${Math.abs(horizontalDist)}px)`
      }
    })
    useEventListener(layerBoxRef, 'touchend', (e) => {
      let endPoint = [e.changedTouches[0].pageX, e.changedTouches[0].pageY]
      const horizontalDist = endPoint[0] - startPoint[0]
      if (horizontalDist > 0 && layerBoxTranslateX.value !== '100%') {
        layerBoxTranslateX.value = '100%'
      }
    })
  })()


})

</script>

<style lang="scss" scoped>
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
}
</style>
