import { login,getInfo, logout} from '@/api/login'
import { register} from '@/api/register'
import { getSessionId, setSessionId, removeSessionId,getUsername, setUsername, removeUsername,getAvatar, setAvatar, removeAvatar, setEnterpriseId, getEnterpriseId,removeEnterpriseId,setUserId,getUserId,removeUserId,getPhoto,setPhoto,removePhoto} from '@/utils/auth'
import Cookies from "js-cookie";

const user = {
  state: {
    userId:getUserId(),
    enterpriseId:getEnterpriseId(),
    sessionId: getSessionId(),
    name: getUsername(),
    avatar:getAvatar(),
    photo:getPhoto(),
  },
  mutations: {
    SET_USERID:(state, userId) => {
      state.userId = userId
    },
    SET_ENTERPRISEID:(state, enterpriseId) => {
      state.enterpriseId = enterpriseId
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_SESSIONID: (state, sessionId) => {
      state.sessionId = sessionId
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_PHOTO: (state, photo) => {
      state.photo = photo
    },
  },
  actions: {
    // 登录
    // Login({ commit }, userInfo) {
    //   const username = userInfo.username.trim()
    //   return new Promise((resolve, reject) => {
    //     login(username, userInfo.password).then(response => {
    //       const data = response.data.data
    //       if(data!==null){
    //         setSessionId(response.sessionId)
    //         setEnterpriseId(data.enterpriseId)
    //         setPhoto(data.photo)
    //         commit('SET_SESSIONID', response.sessionId)
    //         commit('SET_ENTERPRISEID', data.enterpriseId)
    //         commit('SET_PHOTO', data.photo)
    //       }
    //       resolve(response.data)
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },
    // 获取企业信息
    GetInfo({ commit,state}) {
      return new Promise((resolve, reject) => {
        getInfo(state.enterpriseId).then(response => {
          const data = response.data
          if(data.name==null){
            setUsername('admin')
            commit('SET_NAME', 'admin')
          }else{
            setUsername(data.name)
            commit('SET_NAME', data.name)
          }
          setAvatar(data.photo)
          setUserId(data.id)
          commit('SET_USERID', data.id)
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
          commit('SET_ENTERPRISEID','')
          commit('SET_USERID','')
          commit('SET_AVATAR','')
          commit('SET_NAME','')
          commit('SET_PHOTO','')
          removeSessionId()
          removeEnterpriseId()
          removeUserId()
          removeUsername()
          removeAvatar()
          removePhoto()
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
        commit('SET_ENTERPRISEID','')
        commit('SET_USERID','')
        commit('SET_AVATAR','')
        commit('SET_NAME','')
        commit('SET_PHOTO','')
        removeSessionId()
        removeEnterpriseId()
        removeUserId()
        removeUsername()
        removeAvatar()
        removePhoto()
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
