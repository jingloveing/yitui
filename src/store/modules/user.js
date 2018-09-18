import { login, logout, getInfo } from '@/api/login'
import { register} from '@/api/register'
import { getSessionId, setSessionId, removeSessionId,getUsername, setUsername, removeUsername,getAvatar, setAvatar, removeAvatar} from '@/utils/auth'

const user = {
  state: {
    sessionId: getSessionId(),
    name: getUsername(),
    avatar:getAvatar(),
  },
  mutations: {
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_SESSIONID: (state, sessionId) => {
      state.sessionId = sessionId
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
  },
  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response.data.data
          setSessionId(response.sessionId)
          if(data.realname==null){
            setUsername('admin')
            commit('SET_NAME', 'admin')
          }else{
            setUsername(data.realname)
            commit('SET_NAME', data.realname)
          }
          setAvatar(data.photo)
          commit('SET_SESSIONID', response.sessionId)
          commit('SET_AVATAR', data.photo)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.sessionId).then(() => {
          commit('SET_SESSIONID', '')
          commit('SET_AVATAR','')
          commit('SET_NAME','')
          removeSessionId()
          removeUsername()
          removeAvatar()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_SESSIONID', '')
        commit('SET_AVATAR','')
        commit('SET_NAME','')
        removeSessionId()
        removeUsername()
        removeAvatar()
        resolve()
      })
    },
    //  开户接口
    Register({ commit }, data) {
      return new Promise((resolve, reject) => {
        register(data.loginName,data.tel,data.department,data.address,data.openCard).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
  },

}

export default user
