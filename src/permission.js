import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
// import { getSessionId } from '@/utils/auth' // 验权

const whiteList = ['Login', 'NotFound', 'Forbidden'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()

  if (whiteList.indexOf(to.name) < 0) {
    checkLogin(from, to).then(user => {
      if (to.meta && to.meta.roles && to.meta.roles.indexOf(user.role) < 0) {
        Message.error('没有权限访问')
      } else {
        next()
        NProgress.done()
      }
    }).catch(res => {
      console.warn('登录失败', res)
      Message.error(res)

      router.push('/login')
      next()
      NProgress.done()
    })
  } else {
    next()
    NProgress.done()
  }
})

function checkLogin (from, to) {
  const isLoggedIn = !!store.getters.token
  if (!isLoggedIn) {
    store.commit('SET_REDIRECT_URL', to.path)
    return Promise.reject(new Error('未登录'))
  }

  if (store.getters.user === null || store.getters.enterprise === null || from.path === '/') {
    return store.dispatch('GetUser').catch(res => {
      store.commit('SET_REDIRECT_URL', to.path)
      return Promise.reject(res)
    })
  }

  return Promise.resolve(store.getters.user)
}

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
