import request from '@/utils/request'

export function homeData(id,n) {
  return request({
    url: '/com/Enterprise/findById',
    method: 'post',
    params: {
      id,
      n
    }
  })
}
export function dataOverView(enterpriseId,day) {
  return request({
    url: '/com/Enterprise/findByOneDayAndId',
    method: 'post',
    params: {
      enterpriseId,
      day
    }
  })
}
