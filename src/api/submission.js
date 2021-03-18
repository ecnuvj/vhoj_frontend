import request from '@/utils/request.js'

export const submissionList = data => {
  return request({
    method: 'POST',
    url: '/status/list',
    data
  })
}
