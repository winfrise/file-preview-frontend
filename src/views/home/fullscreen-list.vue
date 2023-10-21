<template>
  <div class="swiper">
    <!-- Additional required wrapper -->
    <div class="swiper-wrapper">
      <!-- Slides -->
      <div class="swiper-slide">Slide 1</div>
      <div class="swiper-slide">Slide 2</div>
      <div class="swiper-slide">Slide 3</div>
    </div>

    <div class="swiper-pagination"></div>

  </div>

</template>

<script setup>
import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import { onMounted } from 'vue';

onMounted(() => {
  const swiper = new Swiper('.swiper', {
    modules: [ Pagination],
    direction: 'vertical',
    loop: true,

    pagination: {
      el: '.swiper-pagination',
      type: "fraction",
    },
  });
})


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
