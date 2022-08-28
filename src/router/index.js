import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/',
    redirect: '/index.html'
  },
  {
    path: '/index.html',
    component: () => import('@/views/index/index'),
    hidden: true
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/reg',
    component: () => import('@/views/reg/index'),
    hidden: true
  },
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/index',
    children: [{
      path: 'index',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {
        title: '控制台',
        icon: 'dashboard'
      }
    }]
  },
  {
    path: '/statistic',
    component: Layout,
    redirect: '/statistic/pool',
    name: '数据分析',
    meta: {
      title: '数据分析',
      icon: 'el-icon-s-help'
    },
    children: [{
      path: 'pool',
      name: '卡池分析',
      component: () => import('@/views/statistic/pool/index'),
      meta: {
        title: '卡池分析',
        icon: 'el-icon-pie-chart'
      }
    }, {
      path: 'allpool',
      name: '全站卡池统计',
      component: () => import('@/views/statistic/allpool/index'),
      meta: {
        title: '全站卡池统计',
        icon: 'el-icon-data-line'
      }
    }, {
      path: 'export',
      name: '抽卡记录导出',
      component: () => import('@/views/statistic/export/index'),
      meta: {
        title: '抽卡记录导出',
        icon: 'el-icon-folder-opened'
      }
    }, {
      path: 'count',
      name: '抽卡计算器',
      component: () => import('@/views/count/index'),
      meta: {
        title: '抽卡计算器',
        icon: 'el-icon-s-platform'
      }
    }
    ]
  },
  {
    path: '/import',
    component: Layout,
    redirect: '/import/hypergryph',
    name: '数据导入',
    meta: {
      title: '数据导入',
      icon: 'el-icon-upload'
    },
    children: [{
      path: 'hypergryph',
      name: '官服导入',
      component: () => import('@/views/import/import'),
      meta: {
        title: '官服导入',
        icon: 'form'
      }
    }, {
      path: 'bilibili',
      name: 'B服导入',
      component: () => import('@/views/import/bilibili/index'),
      meta: {
        title: 'B服导入',
        icon: 'form'
      }
    }]
  },
  {
    path: '/other',
    component: Layout,
    redirect: '/other/ranking',
    name: '其他功能',
    meta: {
      title: '其他功能',
      icon: 'el-icon-postcard'
    },
    children: [{
      path: 'ranking',
      name: '非酋排行榜',
      component: () => import('@/views/ranking/ranking'),
      meta: {
        title: '非酋排行榜',
        icon: 'el-icon-notebook-1'
      }
    }, {
      path: 'pool',
      name: '卡池信息',
      component: () => import('@/views/wiki/pool'),
      meta: {
        title: '卡池信息',
        icon: 'el-icon-edit-outline'
      }
    }, {
      path: 'sign',
      name: '签到',
      component: () => import('@/views/user/signin/index'),
      meta: {
        title: '签到',
        icon: 'el-icon-date'
      }
    }]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/updata',
    name: '个人中心',
    meta: {
      title: '个人中心',
      icon: 'el-icon-user'
    },
    children: [{
      path: 'updata',
      name: '修改密码',
      component: () => import('@/views/user/updata'),
      meta: {
        title: '修改密码',
        icon: 'el-icon-notebook-1'
      }
    }, {
      path: 'cancellation',
      name: '注销账户',
      component: () => import('@/views/user/cancellation'),
      meta: {
        title: '注销账户',
        icon: 'el-icon-document-delete'
      }
    }]
  },
  {
    path: '/about',
    component: Layout,
    redirect: '/about',
    children: [{
      path: 'about',
      name: '反馈',
      component: () => import('@/views/about/index'),
      meta: {
        title: '反馈',
        icon: 'el-icon-question'
      }
    }]
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404'),
    hidden: true
  }

]

/**
 * 动态路由
 */
export const asyncRoutes = [{
  path: '/admin',
  component: Layout,
  redirect: '/admin/index',
  name: '管理中心',
  meta: {
    title: '管理中心',
    icon: 'el-icon-s-help',
    roles: ['admin']
  },
  children: [{
    path: 'index',
    name: '管理控制台',
    component: () => import('@/views/admin/index'),
    meta: {
      title: '管理控制台',
      icon: 'dashboard'
    }
  }, {
    path: 'user',
    name: '用户管理',
    component: () => import('@/views/admin/user/index'),
    meta: {
      title: '用户管理',
      icon: 'tree'
    }
  }, {
    path: 'notice',
    name: '发布公告',
    component: () => import('@/views/admin/notice/index'),
    meta: {
      title: '发布公告',
      icon: 'el-icon-chat-dot-square'
    }
  }, {
    path: 'gacha',
    name: '寻访管理管理',
    component: () => import('@/views/admin/gacha/index'),
    meta: {
      title: '寻访管理',
      icon: 'tree'
    }
  }]
},
// 404 page must be placed at the end !!!
{
  path: '*',
  redirect: '/404',
  hidden: true
}]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
