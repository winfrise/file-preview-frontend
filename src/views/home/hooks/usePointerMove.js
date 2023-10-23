
import { useEventListener } from '@vueuse/core'
import { computed } from 'vue'

export function usePointerMove (options = {}) {
  const elem = options.el

  options.on = options.on || {}

  const startPoint = ref([null, null])
  const lastPoint = ref([null, null])

  const getMoveInfo = (point1, point2) => {
    const distX = Math.abs(point2.value[0] - point1.value[0])

    const distY = Math.abs(point2.value[1] - point1.value[1])

    const directionX = point2.value[0] - point1.value[0] > 0 ? 'right' : 'left'

    const directionY = lastPoint.value[1] - startPoint.value[1] > 0 ? 'bottom' : 'top'

    return {distX, distY, directionX, directionY}
  }

  const pointStart = 'ontouchstart' in window ? 'touchstart' : 'mousedown'
  const pointMove = 'ontouchstart' in window ? 'touchmove' : 'mousemove'
  const pointEnd = 'ontouchstart' in window ? 'touchend' : 'mouseup'


  useEventListener(elem, pointStart, (e) => {
    const x = e.pageX || e.touches[0].pageX
    const y = e.pageY || e.touches[0].pageY
    startPoint.value = [x, y]

    options.on.touchStart && options.on.touchStart({startPoint})

    const cleanTouchmove = useEventListener(elem, pointMove, (e) => {
      const x = e.pageX || e.changedTouches[0].pageX
      const y = e.pageY || e.changedTouches[0].pageY
      lastPoint.value = [x, y]

      const {distX, distY, directionX, directionY} = getMoveInfo(startPoint, lastPoint)

      options.on.touchMove && options.on.touchMove({distX, distY, directionX, directionY})
    })
    const cleanTouchEnd = useEventListener(elem, pointEnd, (e) => {
      const x = e.pageX || e.changedTouches[0].pageX
      const y = e.pageY || e.changedTouches[0].pageY
      lastPoint.value = [x, y]

      const {distX, distY, directionX, directionY} = getMoveInfo(startPoint, lastPoint)
      options.on.touchEnd && options.on.touchEnd({distX, distY, directionX, directionY})

      cleanTouchmove()
      cleanTouchEnd()
    })
  })

}
