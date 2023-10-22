<template>
  <div class="swiper" ref="swiperRef">
    <LayerBox ref="layerBoxRef" :dirList="dirList" :currentPath="currentPath" @changeCurrentPath="handleChangeCurrentPath" />
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item, index) in fileList" :key="index">
        <PreviewFile :itemData="item" />
      </div>
    </div>

    <div class="swiper-pagination"></div>

  </div>

</template>

<script setup>
import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import { useRoute, useRouter } from 'vue-router'
import { nextTick, onMounted, watch } from 'vue';

import { usePointerMove } from './hooks/usePointerMove.js';

import PreviewFile from './components-list/preview-file/index.vue'
import LayerBox from './components-list/layer-box/index.vue'

import { getFileList } from '@/api/home.js'

const route = useRoute()
const router = useRouter()

const fileList = ref([])
const dirList = ref([])
const swiperRef = ref()
const layerBoxRef = ref()

// 当前文件夹路径
const currentPath = ref()
currentPath.value = route.query.path || './'
let swiper
onMounted(() => {
  swiper = new Swiper('.swiper', {
    modules: [ Pagination],
    direction: 'vertical',
    loop: true,
    observeSlideChildren: true,
    observeParents: false,
    observer: false,

    pagination: {
      el: '.swiper-pagination',
      type: "fraction",
    },
  });

  usePointerMove({
    el: swiperRef,
    on: {
      touchEnd: ({distX, distY, directionX, directionY}) => {
        if (directionX === 'left' && distX > distY) {
          layerBoxRef.value.layerBoxTranslateX = '0px'
        }
      }
    }
  })
})

// 请求获取数据
const fetchFileList = async (path) => {
  const [err, res] = await getFileList({path: path || currentPath.value })
  if (err) return
  fileList.value = (res.data?.file || []).map(item => ({...item, type: 'file'}))
  dirList.value = (res.data?.dir || []).map(item => ({...item, type: 'dir'}))
  nextTick(() => {
    swiper.update()
  })
}
fetchFileList()

const handleChangeCurrentPath = (path) => {
  currentPath.value = path
  // layerBoxRef.value.layerBoxTranslateX = '100%'

  fetchFileList(path)

  router.replace({
    query: {
      path: path
    }
  })
}

</script>

<style lang="scss" scoped>
.swiper {
  position: relative;
  width: 100vw;
  height: 100vh;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
