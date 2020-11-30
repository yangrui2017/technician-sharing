import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const router = new Router({
  mode: 'history',
  base: '/worker/',
  routes: [{
      path: '/my',
      name: 'my',
      component: () => import('@/views/my'),
      meta: {
        title: '个人中心'
      }
    },
    {
      path: '/agent-account',
      name: 'agent-account',
      component: () => import('@/views/agent-account'),
      meta: {
        title: '代理账户'
      }
    },
    
    {
      path: '/technicians',
      name: 'technicians',
      component: resolve => require(['@/views/technicians'], resolve),
      meta: {
        title: '招募令'
      }
    }, {
      path: '/fund-details',
      name: 'fund-details',
      component: resolve => require(['@/views/fund-details'], resolve),
      meta: {
        title: '资金明细'
      }

    },
    {
      path: '/agent-examine',
      name: 'agent-examine',
      component: () => import('@/views/agent-examine'),
      meta: {
        title: '代理审核'
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
      path: '/ww-poster',
      name: 'ww-poster',
      component: () => import('@/views/ww-poster'),
      meta: {
        title: '推荐技师'
      }
    },
    {
      path: '/wm-poster',
      name: 'wm-poster',
      component: () => import('@/views/wm-poster'),
      meta: {
        title: '我的推广'
      }
    },
    {
      path: '/agent-agreement',
      name: 'agent-agreement',
      component: () => import('@/views/worker/agent-agreement'),
      meta: {
        title: '注册协议'
      }
    },

    {
      path: '/agent-application',
      name: 'agent-application',
      component: () => import('@/views/agent-application'),
      meta: {
        title: '申请代理'
      }
    },
    {
      path: '/agent-poster',
      name: 'agent-poster',
      component: () => import('@/views/agent-poster'),
      meta: {
        title: '代理海报'
      }
    },

    {
      path: '/withdrawal',
      name: 'withdrawal',
      component: () => import('@/views/withdrawal'),
      meta: {
        title: '资金提现'
      }
    },

    {
      path: '/worker-agreement',
      name: 'worker-agreement',
      component: () => import('@/views/worker/worker-agreement'),
      meta: {
        title: '注册协议'
      }
    },
    {
      path: '/worker-idcard',
      name: 'worker-idcard',
      component: () => import('@/views/worker/worker-idcard'),
      meta: {
        title: '身份证验证'
      }
    },
    {
      path: '/worker-regist',
      name: 'worker-regist',
      component: () => import('@/views/worker/worker-regist'),
      meta: {
        title: '技师注册'
      }
    },
    {
      path: '/worker-examine',
      name: 'worker-examine',
      component: () => import('@/views/worker/worker-examine'),
      meta: {
        title: '注册审核'
      }
    },
    {
      path: '/agent-idcard',
      name: 'agent-idcard',
      component: () => import('@/views/agent-idcard'),
      meta: {
        title: '代理身份证上传'
      }
    },
    {
      path: '/bank-card',
      name: 'bank-card',
      component: () => import('@/views/bank-card'),
      meta: {
        title: '银行卡'
      }
    },
    {
      path: '/add-bankcard',
      name: 'add-bankcard',
      component: () => import('@/views/add-bankcard'),
      meta: {
        title: '添加银行卡'
      }
    },
    {
      path: '/franchise-menu',
      name: 'franchise-menu',
      component: () => import('@/views/franchise-menu'),
      meta: {
        title: '加入E帮车服'
      }
    },
    {
      path: '/franchise-examine',
      name: 'franchise-examine',
      component: () => import('@/views/franchise/franchise-examine'),
      meta: {
        title: '加盟店审核'
      }
    },
    {
      path: '/franchise-agreement',
      name: 'franchise-agreement',
      component: () => import('@/views/franchise/franchise-agreement'),
      meta: {
        title: '加盟店协议'
      }
    },
    {
      path: '/franchise-application',
      name: 'franchise-application ',
      component: () => import('@/views/franchise/franchise-application'),
      meta: {
        title: '加盟店注册'
      }
    },
    {
      path: '/franchise-idcard',
      name: 'franchise-idcard',
      component: () => import('@/views/franchise/franchise-idcard'),
      meta: {
        title: '加盟店身份证验证'
      }
    },
    {
      path: '/add-franchise',
      name: 'add-franchise',
      component: () => import('@/views/franchise/add-franchise'),
      meta: {
        title: '添加加盟店'
      }
    },
    {
      path: '/franchise-list',
      name: 'franchise-list',
      component: () => import('@/views/franchise/franchise-list'),
      meta: {
        title: '加盟店列表'
      }
    },

    {
      path: '/franchise-partner',
      name: 'franchise-partner',
      component: () => import('@/views/franchise/franchise-partner'),
      meta: {
        title: '加盟店中心'
      }
    },
    {
      path: '/help-text',
      name: 'help-text',
      component: () => import('@/views/franchise/help-text'),
      meta: {
        title: '帮助'
      }
    },
    {
      path: '/franchise-worker',
      name: 'franchise-worker',
      component: () => import('@/views/franchise/franchise-worker'),
      meta: {
        title: '门店技师'
      }
    },
    {
      path: '/franchise-details',
      name: 'franchise-details',
      component: () => import('@/views/franchise/franchise-details'),
      meta: {
        title: '门店明细'
      }
    },
    {
      path: '/shopowner-regist',
      name: 'shopowner-regist',
      component: () => import('@/views/shopowner-regist'),
      meta: {
        title: '店长注册'
      }
    },
    {
      path: '/technician-audit',
      name: 'technician-audit',
      component: () => import('@/views/franchise/technician-audit'),
      meta: {
        title: '店长审核'
      }
    },
    {
      path: '/franchise-modify',
      name: 'franchise-modify',
      component: () => import('@/views/franchise/franchise-modify'),
      meta: {
        title: '个人信息修改'
      },
    },
      {
        path: '/franchise-store',
        name: 'franchise-store',
        component: () => import('@/views/franchise/franchise-store'),
        meta: {
          title: '门店信息修改'
        }
     
    }
    


  ]
})
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
export default router
