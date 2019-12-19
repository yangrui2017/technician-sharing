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
      component: () => import('@/views/total-sharing'),
      meta: {
        title: '个人中心'
      }
    },
    {
      path: '/my',
      name: 'my',
      component: () => import('@/views/my'),
      meta: {
        title: '个人中心'
      }
    },
    {
      path: '/share-page',
      name: 'share-page',
      component: () => import('@/views/share-page'),
      meta: {
        title: '分享成功'
      }
    },
    {
      path: '/technicians',
      name: 'technicians',
      component: () => import('@/views/technicians'),
      meta: {
        title: '招募技师'
      }
    },
    {
      path: '/worker-welcome',
      name: 'worker-welcome',
      component: () => import('@/views/worker-welcome'),
      meta: {
        title: '新用户'
      }
    },
    {
      path: '/map',
      name: 'map',
      component: () => import('@/views/map'),
      meta: {
        title: '区域地图'
      }
    },
    {
      path: '/ww-activity',
      name: 'ww-activity',
      component: () => import('@/views/ww-activity'),
      meta: {
        title: '推荐技师'
      }
    },
    {
      path: '/wm-activity',
      name: 'wm-activity',
      component: () => import('@/views/wm-activity'),
      meta: {
        title: '我的推广'
      }
    },
    {
      path: '/news-information',
      name: 'news-information',
      component: () => import('@/views/news-information'),
      meta: {
        title: '新闻文章'
      }
    },
    {
      path: '/agency-rules',
      name: 'agency-rules',
      component: () => import('@/views/agency-rules'),
      meta: {
        title: '代理规则'
      }
    },
    {
      path: '/agent-application',
      name: 'agent-application',
      component: () => import('@/views/agent-application'),
      meta: {
        title: '申请代理'
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
})
export default router
