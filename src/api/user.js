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

export const userList = data => {
  return request({
    method: 'POST',
    url: '/user/list',
    data
  })
}

export const roleList = data => {
  return request({
    method: 'GET',
    url: '/user/roles',
    data
  })
}

export const authUser = data => {
  return request({
    method: 'POST',
    url: '/user/auth',
    data
  })
}
