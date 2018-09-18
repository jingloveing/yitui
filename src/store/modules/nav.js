const app = {
  state: {
    fullNavList: [
      { key: '1', name: '首页', icon: 'menu', path: '/dashboard', roles: [ 'ADMIN', 'BRAND' ] },
      {
        key: '2',
        name: '内容管理',
        icon: 'goods',
        children: [
          { key: '2.1', name: '商品管理', path: '/goods', roles: [ 'ADMIN', 'BRAND' ] },
          { key: '2.2', name: '活动管理', path: '/activity', roles: [ 'ADMIN' ] },
          { key: '2.3', name: '品牌管理', path: '/brand', roles: [ 'ADMIN' ] }
        ],
        roles: [ 'ADMIN', 'BRAND' ]
      },
      {
        key: '3',
        name: '用户管理',
        icon: 'share',
        children: [
          { key: '3.1', name: '用户管理', path: '/user' }
        ],
        roles: [ 'ADMIN' ]
      },
      {
        key: '4',
        name: '系统管理',
        icon: 'setting',
        children: [
          { key: '4.1', name: '轮播图管理', path: '/banner' }
        ],
        roles: [ 'ADMIN' ]
      }],
    navList: []
  },
  getters: {
    navList: () => app.state.navList
  },
  mutations: {
    FILTER_NAV_LIST: (state, user) => {
      state.navList = state.fullNavList.filter(value => {
        if (!user) {
          return false
        }
        if (value.roles && value.roles.indexOf(user.role) < 0) {
          return false
        }
        if (value.children) {
          value.children = value.children.filter(value => !value.roles || value.roles.indexOf(user.role) >= 0)
        }
        if (value.children && value.children.length === 0) {
          delete value.children
        }

        return true
      })
    }
  },
  actions: {
    FilterNavList: ({ commit }) => {
      commit('FILTER_NAV_LIST')
    }
  }
}

export default app
