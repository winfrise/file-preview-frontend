import router from '@/router/index.js'
import { useUserStore } from '@/stores/user'


const whiteList = ['/login'] // 白名单

router.beforeEach(async (to, _, next) => {
  const userStore = useUserStore()
  if (userStore.token) {
    return next()
  }
  if (whiteList.includes(to.path)) {
    return next()
  } else {
    return next('/login')
  }
})
