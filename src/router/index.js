import {createRouter, createWebHistory} from 'vue-router'
const routes = [
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    redirect: '/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页'
        }
      },
      {
        name: 'VideoDetails',
        path: 'video-details',
        component: () => import('@/views/home/details-video.vue'),
        meta: {
          title: '视频播放器'
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  }
]

const Router = createRouter({
  history: createWebHistory(),
  routes
})

export default Router
