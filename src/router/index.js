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
export const constantRoutes = [{
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
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  children: [{
    path: 'dashboard',
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
      icon: 'table'
    }
  },
  {
    path: 'tree',
    name: '待开发',
    component: () => import('@/views/tree/index'),
    meta: {
      title: '待开发',
      icon: 'tree'
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
    icon: 'el-icon-s-help'
  },
  children: [{
    path: 'hypergryph',
    name: '官服导入',
    component: () => import('@/views/import/index'),
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
  path: '反馈',
  component: Layout,
  children: [{
    path: 'https://jq.qq.com/?_wv=1027&k=K5EBeaBg',
    meta: {
      title: '反馈',
      icon: 'link'
    }
  }]
}

  // 404 page must be placed at the end !!!
  // {
  //   path: '*',
  //   redirect: '/404',
  //   hidden: true
  // }
]

/**
 * 动态路由
 */
export const asyncRoutes = [{
  path: '/example',
  component: Layout,
  redirect: '/example/table',
  name: 'Example',
  meta: {
    title: 'Example',
    icon: 'el-icon-s-help',
    roles: ['editor']
  },
  children: [{
    path: 'tree',
    name: 'Tree',
    component: () => import('@/views/tree/index'),
    meta: {
      title: 'Tree',
      icon: 'tree'
    }
  }
  ]
}, {
  path: '/admin',
  component: Layout,
  redirect: '/admin/user',
  name: '管理中心',
  meta: {
    title: '管理中心',
    icon: 'el-icon-s-help',
    roles: ['admin']
  },
  children: [{
    path: 'user',
    name: '用户管理',
    component: () => import('@/views/admin/user/index'),
    meta: {
      title: '用户管理',
      icon: 'tree'
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
// 404 页面必须放置在最后一个页面
{
  path: '*',
  redirect: '/404',
  hidden: true
}
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
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
