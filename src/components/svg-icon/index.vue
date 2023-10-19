<template>
  <svg class="icons" aria-hidden="true" :width="props.size || width" :height="props.size || height">
    <use :xlink:href="symbolId" rel="external nofollow" :fill="color" />
  </svg>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  size: {
    type: String
  },
  width: {
    type: [String, Number],
    default: '1em'
  },
  height: {
    type: String,
    default: '1em'
  },
  color: {
    type: String,
    default: 'currentColor'
  },
  prefix: {
    type: String,
    default: 'icon'
  }
})
const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>

<style lang="less">
.icons {
  vertical-align: middle;
}
</style>
