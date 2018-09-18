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
  },

  update (data) {
    return axios.post('/admin/update_user_info', data)
  },

  changePassword (data) {
    return axios.post('/admin/change_password', data)
  }
}
