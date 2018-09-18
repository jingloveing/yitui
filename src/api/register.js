import request from '@/utils/request'

export function register(loginName,tel,department,address,openCard) {
  return request({
    url: '/billcard/user/addAccount',
    method: 'post',
    params: {
      loginName,
      tel,
      department,
      address,
      openCard
    }
  })
}

