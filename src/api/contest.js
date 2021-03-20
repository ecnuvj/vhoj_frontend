import request from '@/utils/request'

export const contestList = data => {
  return request({
    method: 'POST',
    url: '/contest/search',
    data
  })
}

export const contestShow = data => {
  return request({
    method: 'GET',
    url: '/contest/show?contest_id=' + data['contest_id']
  })
}
