import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import ElementPlus from 'element-plus'
import * as ElIcons from '@element-plus/icons-vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'virtual:svg-icons-register'
import './permission.js'
import '@/styles/custom-element-ui.scss'
import '@/styles/global.css'

let app = createApp(App)

import { createPinia } from 'pinia'
const pinia = createPinia()

import VueVirtualScroller from 'vue-virtual-scroller'
app.use(VueVirtualScroller)

// 遍历icon
for (let key in ElIcons) {
  app.component(key, ElIcons[key])
}

app
  .use(router)
  .use(pinia)
  .use(ElementPlus, {
    locale: zhCn
  })
  .mount('#app')
