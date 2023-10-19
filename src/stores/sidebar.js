import { defineStore } from 'pinia'

export const useSidebarStore = defineStore('counter', {
  state: () => {
    return { isCollapse: false }
  },
  // 也可以这样定义
  // state: () => ({ count: 0 })
  actions: {
    increment() {
      this.count++
    },
  },
})
