import authApi from '@/api/auth'
import enterpriseApi from '@/api/enterprise'

const state = {
  token: '',
  user: null,
  enterprise: null,
  redirectUrl: '/'
}

const getters = {
  token () {
    if (state.token === '') {
      const authToken = sessionStorage.getItem('auth-token')
      state.token = JSON.parse(authToken)

      console.log('load token', state.token)
    }

    return state.token
  },
  user () {
    if (state.user === null) {
      state.user = JSON.parse(sessionStorage.getItem('auth-user'))

      console.log('load user', state.user)
    }
    return state.user
  },
  enterprise () {
    if (state.enterprise === null) {
      state.enterprise = JSON.parse(sessionStorage.getItem('auth-enterprise'))

      console.log('load enterprise', state.enterprise)
    }
    return state.enterprise
  },
  redirectUrl () {
    return state.redirectUrl
  }
}

const mutations = {
  SET_TOKEN (state, token) {
    state.token = token
    sessionStorage.setItem('auth-token', JSON.stringify(token))

    console.log('SET_TOKEN', token)
  },
  SET_USER (state, user) {
    state.user = user
    sessionStorage.setItem('auth-user', JSON.stringify(user))

    console.log('SET_USER', user)
  },
  SET_ENTERPRISE (state, enterprise) {
    state.enterprise = enterprise
    sessionStorage.setItem('auth-enterprise', JSON.stringify(enterprise))

    console.log('SET_ENTERPRISE', enterprise)
  },
  SET_REDIRECT_URL (state, redirectUrl) {
    state.redirectUrl = redirectUrl

    console.log('SET_REDIRECT_URL', redirectUrl)
  }
}

const actions = {
  Login ({commit}, loginInfo) {
    return authApi.login(loginInfo).then(res => {
      commit('SET_USER', res.data)
      commit('FILTER_NAV_LIST', res.data)

      return res.data
    })
  },
  LogOut ({commit}) {
    return authApi.logout().then(() => {
      commit('SET_TOKEN', '')
      commit('SET_USER', [])
      commit('FILTER_NAV_LIST')
    }, () => {
      commit('SET_TOKEN', '')
      commit('SET_USER', [])
      commit('FILTER_NAV_LIST')
    })
  },
  GetUser ({ commit }) {
    return authApi.getAuth().then(res => {
      commit('SET_USER', res.data)
      commit('FILTER_NAV_LIST', res.data)

      return res.data
    }).then(user => {
      return enterpriseApi.get((user.profile || {}).enterpriseId).then(res => {
        commit('SET_ENTERPRISE', res.data)

        return user
      })
    })
  }

}

export default {
  state,
  getters,
  mutations,
  actions
}
