<template>
  <div class="swiper" ref="swiperRef">
    <div class="layer-box" ref="layerBoxRef" :style="{transform: `translateX(${layerBoxTranslateX})`}">
      control box
    </div>
    <div class="swiper-wrapper">
      <div class="swiper-slide">1</div>
      <div class="swiper-slide" v-for="(item, index) in listData" :key="index">
        <PreviewFile :itemData="item" />
      </div>
      <div class="swiper-slide">2</div>
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
import { nextTick, onMounted } from 'vue';
import { useEventListener } from '@vueuse/core'

import PreviewFile from './components-list/preview-file/index.vue'

import { getFileList } from '@/api/home.js'

const route = useRoute()
const router = useRouter()

const listData = ref([])
const swiperRef = ref()
const layerBoxRef = ref()

const layerBoxTranslateX = ref('100%')

// 当前文件夹路径
const currentPath = ref()
currentPath.value = route.query.path || './uploads'
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


  ;(() => {
    let startPoint = [null, null]
    useEventListener(swiperRef, 'touchstart', (e) => {
      startPoint = [e.touches[0].pageX, e.touches[0].pageY]

      const cleanTouchmove = useEventListener(swiperRef, 'touchmove', (e) => {
        let movePoint = [e.changedTouches[0].pageX, e.changedTouches[0].pageY]
        const horizontalDist = movePoint[0] - startPoint[0]
        if (horizontalDist < 0 && layerBoxTranslateX.value !== '0px') {// 向左滑动
          layerBoxTranslateX.value = `calc(100% - ${Math.abs(horizontalDist)}px)`
        }
      })
      const cleanTouchEnd = useEventListener(swiperRef, 'touchend', (e) => {
        let endPoint = [e.changedTouches[0].pageX, e.changedTouches[0].pageY]
        const horizontalDist = endPoint[0] - startPoint[0]
        if (horizontalDist < 0 && layerBoxTranslateX.value !== '0px') {
          layerBoxTranslateX.value = '0px'
        }

        cleanTouchmove()
        cleanTouchEnd()
      })
    })

  })()

  ;(() => {
    let startPoint = [null, null]
    useEventListener(layerBoxRef, 'touchstart', (e) => {
      startPoint = [e.touches[0].pageX, e.touches[0].pageY]
    })
    useEventListener(swiperRef, 'touchmove', (e) => {
      let movePoint = [e.changedTouches[0].pageX, e.changedTouches[0].pageY]
      const horizontalDist = movePoint[0] - startPoint[0]
      if (horizontalDist > 0 && layerBoxTranslateX.value !== '100%') {// 向右滑动
        layerBoxTranslateX.value = `calc(${Math.abs(horizontalDist)}px)`
      }
    })
    useEventListener(swiperRef, 'touchend', (e) => {
      let endPoint = [e.changedTouches[0].pageX, e.changedTouches[0].pageY]
      const horizontalDist = endPoint[0] - startPoint[0]
      if (horizontalDist > 0 && layerBoxTranslateX.value !== '100%') {
        layerBoxTranslateX.value = '100%'
      }
    })
  })()


})

// 请求获取数据
const fetchFileList = async (path) => {
  const [err, res] = await getFileList({path: path || currentPath.value })
  if (err) return
  const fileList = (res.data?.file || []).map(item => ({...item, type: 'file'}))
  const dirList = (res.data?.dir || []).map(item => ({...item, type: 'dir'}))
  listData.value = ([...dirList, ...fileList]).map((item, index) => ({...item, id: (index + 1), height: 40}))
  nextTick(() => {
    swiper.update()
  })
}
fetchFileList()


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
