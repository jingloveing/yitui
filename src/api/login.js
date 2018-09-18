import request from '@/utils/request'

export function login(tel, password) {
  return request({
    url: '/user/login',
    method: 'post',
    params: {
      tel,
      password
    }
  })
}

export function getInfo(id) {
  return request({
    url: '/com/Enterprise/findByEnterPrise',
    method: 'post',
    params: {
      id
    }
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
