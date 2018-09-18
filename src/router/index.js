import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  {path: '/login', name: 'Login', component: () => import('@/views/login/index'), hidden: true},
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/home/home'),
        meta: {title: '首页', icon: 'home', roles: ['ADMIN', 'ENTERPRISE_ADMIN']}
      }
    ]
  },

  {
    path: '/smallRoutine',
    component: Layout,
    name: 'SmallRoutine',
    meta: {
      title: '小程序管理',
      icon: 'smallRoutine',
      roles: ['ENTERPRISE_ADMIN']
    },
    children: [
      {
        path: 'editWindow',
        name: 'EditWindow',
        component: () => import('@/views/smallRoutine/editWindow'),
        meta: {title: '官网编辑',}
      },
      {
        path: 'dynamics',
        name: 'dynamics',
        component: () => import('@/views/smallRoutine/dynamics'),
        meta: {title: '企业动态'}
      },
    ]
  },
  {
    path: '/company',
    component: Layout,
    name: 'Company',
    meta: {
      title: '企业号管理',
      icon: 'company'
    },
    alwaysShow: true,
    children: [
      {
        path: 'structure',
        name: 'Structure',
        component: () => import('@/views/company/structure'),
        meta: {title: '组织架构', roles: ['ENTERPRISE_ADMIN']}
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/company/register'),
        meta: {title: '开户', roles: ['ADMIN', 'AGENCY']}
      }
    ]
  },
  {
    path: '/mall',
    component: Layout,
    name: 'Mall',
    meta: {title: '商城管理', icon: 'mall', roles: ['ENTERPRISE_ADMIN']},
    children: [
      {
        path: 'mallManage',
        name: 'MallManage',
        component: () => import('@/views/mall/mallManage'),
        meta: {title: '商城管理'},
      },
      {
        path: 'orderManage',
        name: 'OrderManage',
        component: () => import('@/views/mall/orderManage'),
        meta: {title: '订单管理'}
      },
      {
        path: 'addGoods',
        name: 'AddGoods',
        hidden: true,
        component: () => import('@/views/mall/addGoods'),
        meta: {title: '添加商品'}
      }
    ]
  },

  {
    path: '/accredit',
    component: Layout,
    alwaysShow: true,
    name: 'Accredit',
    meta: {title: '授权管理', icon: 'accredit', roles: ['ENTERPRISE_ADMIN']},
    children: [
      {
        path: 'accredit',
        name: 'Accredit',
        component: () => import('@/views/accredit/accredit'),
        meta: {title: '企业微信授权'}
      },
    ]
  },
  {
    path: '/user',
    component: Layout,
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/user/user'),
        meta: { title: '账号中心', icon: 'user' }
      }
    ]
  },
  {
    path: '/setting',
    component: Layout,
    hidden: true,
    name: 'Setting',
    meta: {
      title: '设置',
    },
    children: [
      {
        path: 'changePassword',
        name: 'ChangePassword',
        component: () => import('@/views/setting/changePassword'),
        meta: {title: '修改密码'}
      },
      {
        path: 'myInfo',
        name: 'myInfo',
        component: () => import('@/views/setting/myInfo'),
        meta: {title: '我的资料'}
      }

    ]
  },
  {path: '*', redirect: '/login', hidden: true}
]

export default new Router({
  mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})
