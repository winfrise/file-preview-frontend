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

import { createPinia } from 'pinia'
const pinia = createPinia()

let app = createApp(App)

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
