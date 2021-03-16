import request from '@/utils/request'

export const login = data => {
  return request({
    method: 'POST',
    url: '/user/login',
    data
  })
}

export const register = data => {
  return request({
    method: 'POST',
    url: '/user/register',
    data
  })
}

export const userInfo = data => {
  return request({
    method: 'POST',
    url: '/user/info',
    data
  })
}

export const updateUserInfo = data => {
  return request({
    method: 'POST',
    url: '/user/update',
    data
  })
}
