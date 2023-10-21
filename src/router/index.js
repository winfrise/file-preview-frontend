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
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '文件菜单'
        }
      },
      {
        name: 'FileList',
        path: 'file-list',
        component: () => import('@/views/home/list.vue'),
        meta: {
          title: '文件列表'
        }
      },
      {
        name: 'SwiperList',
        path: 'swiper-list',
        component: () => import('@/views/home/swiper-list.vue'),
        meta: {
          title: 'Swiper列表'
        }
      },
      {
        name: 'FileDetails',
        path: 'file-details',
        component: () => import('@/views/home/details.vue'),
        meta: {
          title: '视频播放器'
        }
      },
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
