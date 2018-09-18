import axios from 'axios'

export default {
  getAuth () {
    return axios.get('/admin/get_auth_info')
  },

  login (data) {
    return axios.post('/admin/login', data)
  },

  logout () {
    return axios.post('/admin/logout')
  }
}
