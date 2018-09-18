import axios from 'axios/index'
import store from '@/store'

export default {
  install () {
    axios.defaults.baseURL = process.env.BASE_URL
    axios.defaults.timeout = 60000
    axios.defaults.headers.common['Content-Type'] = 'application/json'
    axios.defaults.headers.common['Accept'] = 'application/json'

    axios.interceptors.request.use(config => {
      const token = store.getters.token
      if (token) {
        config.headers['authorization'] = 'Bearer ' + token
      }
      return config
    }, error => {
      return Promise.reject(error)
    })

    axios.interceptors.response.use(res => {
      const authHeader = res.headers['authorization']
      if (authHeader && authHeader.length > 7) {
        const authToken = authHeader.substring(7)
        store.commit('SET_TOKEN', authToken)
      }

      return res
    }, error => {
      if (error.response && error.response.status === 401) {
        router.push('/401')
      }

      return Promise.reject(error)
    })
  }
}
