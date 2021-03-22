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

export const contestCreate = data => {
  return request({
    method: 'POST',
    url: '/contest/create',
    data
  })
}

export const contestUser = data => {
  return request({
    method: 'POST',
    url: '/contest/user',
    data
  })
}

export const contestUpdate = data => {
  return request({
    method: 'POST',
    url: '/contest/update',
    data
  })
}

export const contestProblemsUpdate = data => {
  return request({
    method: 'POST',
    url: '/contest/problems/update',
    data
  })
}

export const contestRank = data => {
  return request({
    method: 'POST',
    url: '/contest/rank',
    data
  })
}

export const contestJoin = data => {
  return request({
    method: 'POST',
    url: '/contest/join',
    data
  })
}
