import axios from 'axios'

export default {
  query (params) {
    return axios.get('/admin/enterprise/list', {
      params: params
    })
  },

  get (enterpriseId) {
    return axios.get('/admin/enterprise/get', {
      params: { enterpriseId: enterpriseId }
    })
  },

  create (params) {
    return axios.post('/admin/enterprise/create', params)
  },

  update (params) {
    return axios.post('/admin/enterprise/update', params)
  },

  delete (enterpriseId) {
    return axios.get('/admin/enterprise/delete', {
      params: { enterpriseId: enterpriseId }
    })
  }
}
