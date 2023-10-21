import {createRouter, createWebHistory, createWebHashHistory} from 'vue-router'
const routes = [
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    redirect: '/index',
    meta: {keepAlive: true},
    children: [
      {
        path: 'index',
        component: () => import('@/views/home/list.vue'),
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
      },
      {
        name: 'PictureDetails',
        path: 'picture-details',
        component: () => import('@/views/home/details-picture.vue'),
        meta: {
          title: '图片详情'
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
  history: createWebHashHistory(),
  routes
})

export default Router
