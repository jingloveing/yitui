import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import auth from './modules/auth'
import nav from './modules/nav'
import user from './modules/user'
import home from './modules/homeData'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    auth,
    nav,
    user,
    home
  },
  getters
})

export default store
