import request from '@/utils/request'

export function login(tel, password) {
  return request({
    url: '/admin/adminLogin',
    method: 'post',
    params: {
      tel,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout(sessionid) {
  return request({
    url: '/user/bossLogOut',
    method: 'post',
    data:{
      sessionid
    }
  })
}
