import request from '@/utils/request'

export const problemList = data => {
  return request({
    method: 'POST',
    url: '/problem/search',
    data
  })
}

export const problemShow = data => {
  return request({
    method: 'GET',
    url: `/problem/show?problem_id=${data.problem_id}`,
  })
}

export const problemSubmit = data => {
  return request({
    method: 'POST',
    url: '/problem/submit',
    data
  })
}

export const problemRand = () => {
  return request({
    method: 'GET',
    url: '/problem/rand',
  })
}
