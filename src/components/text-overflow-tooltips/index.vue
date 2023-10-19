<template>
  <div
    ref="textOverFlowTooltipsRef"
    class="text-overflow-tooltips"
  >
    <slot v-if="!isOverflow"></slot>

    <el-popover v-else
                placement="top"
                trigger="hover"
                :width="offsetWidth - 40"
                :content="content"
    >
      <template #reference>
        <slot></slot>
      </template>
    </el-popover>
  </div>
</template>
<script setup>
import { onMounted } from 'vue'

const props = defineProps({
  content: [String, Number, Boolean],
  width: {
    type: String
  }
})

const isOverflow = ref(false)
const textOverFlowTooltipsRef = ref()
const offsetWidth = ref(0)

onMounted(() => {
  offsetWidth.value = textOverFlowTooltipsRef.value.offsetWidth
  const checkOvwerflow = () => {
    const el = textOverFlowTooltipsRef.value
    const elComputed = document.defaultView.getComputedStyle(el, '')
    const padding =
      parseInt(elComputed.paddingLeft.replace('px', '')) +
      parseInt(elComputed.paddingRight.replace('px', ''))
    const range = document.createRange()
    range.setStart(el, 0)
    range.setEnd(el, el.childNodes.length)
    const rangeWidth = range.getBoundingClientRect().width
    if (
      rangeWidth + padding > el.offsetWidth ||
      el.scrollWidth > el.offsetWidth
    ) {
      isOverflow.value = true
    }
  }
  checkOvwerflow()
})

</script>
<style scoped>
.text-overflow-tooltips {
  display: inline-block;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 1;
  vertical-align: middle;
}
.popover-text {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
