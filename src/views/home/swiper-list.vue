<template>
  <div class="swiper">
    <!-- Additional required wrapper -->
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

import PreviewFile from './components-list/preview-file/index.vue'

import { getFileList } from '@/api/home.js'

const route = useRoute()
const router = useRouter()

const listData = ref([])

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

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
