import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const router = new Router({
  mode:"history",
  base:"/worker/",
  routes: [
    {
      path: '/',
      name: 'total-sharing',
      component: () => import('@/views/total-sharing')
    },
    {
      path: '/activity-list',
      name: 'activity-list',
      component: () => import('@/views/activity-list')
    },
    {
      path: '/tech-content',
      name: 'tech-content',
      component: () => import('@/views/tech-content')
    },
    {
      path: '/my',
      name: 'my',
      component: () => import('@/views/my')
    },
    {
      path: '/share-page',
      name: 'share-page',
      component: () => import('@/views/share-page')
    },
    {
      path: '/qr-code',
      name: 'qr-code',
      component: () => import('@/views/qr-code')
    },
    {
      path: '/technicians',
      name: 'technicians',
      component: () => import('@/views/technicians')
    },
    {
      path: '/worker-member',
      name: 'worker-member',
      component: () => import('@/views/worker-member')
    },
    {
      path: '/worker-worker',
      name: 'worker-worker',
      component: () => import('@/views/worker-worker')
    },
    {
      path: '/worker-welcome',
      name: 'worker-welcome',
      component: () => import('@/views/worker-welcome')
    },
    {
      path: '/map',
      name: 'map',
      component: () => import('@/views/map')
    }
  ]
})
router.afterEach((to, from) => { // 跳转后，不需要 next
//路由每次走

})
export default router
