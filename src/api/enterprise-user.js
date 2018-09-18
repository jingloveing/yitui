import axios from 'axios'

export default {
  query (params) {
    return axios.get('/admin/enterprise_user/list', {
      params: params
    })
  },

  get (userId) {
    return axios.get('/admin/enterprise_user/get', {
      params: { userId: userId }
    })
  },

  create (params) {
    return axios.post('/admin/enterprise_user/create', params)
  },

  update (params) {
    return axios.post('/admin/enterprise_user/update', params)
  },

  delete (userId) {
    return axios.get('/admin/enterprise_user/delete', {
      params: { userId: userId }
    })
  },

  enableFeature (params) {
    return axios.post('/admin/enterprise_user/enable/feature', params)
  },

  disableFeature (params) {
    return axios.post('/admin/enterprise_user/disable/feature', params)
  }
}
