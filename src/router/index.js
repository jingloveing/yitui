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
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/home/home'),
        meta: { title: '主页', icon: 'home',showBreadcrumb:true, }
      }
    ]
  },

  {
    path: '/company',
    component: Layout,
    meta: {
      title: '企业管理',
      icon: 'company'
    },
    children: [
      {
        path: 'register',
        name:'Register',
        component: () => import('@/views/company/register'),
        meta: { title: '企业开户' }
      },
      {
        path: 'company',
        name:'Company',
        component: () => import('@/views/company/company'),
        meta: { title: '企业管理' }
      },
    ]
  },
  {
    path: '/user',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'User',
        component: () => import('@/views/user/user'),
        meta: { title: '用户', icon: 'user' }
      }
    ]
  },

  {
    path: '/email',
    component: Layout,
    meta: {
      title: '邮箱',
      icon: 'email'
    },
    children: [
      {
        path: 'readEmail',
        name:'ReadEmail',
        component: () => import('@/views/email/readEmail'),
        meta: { title: '已读邮件' }
      },
      {
        path: 'notReadEmail',
        name:'NotReadEmail',
        component: () => import('@/views/email/notReadEmail'),
        meta: { title: '未读邮件' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
