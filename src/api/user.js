import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login2',
    method: 'post',
    data
  })
}

export function getInfo(data) {
  return request({
    url: '/userinfo',
    method: 'post',
    data
  })
}

export function reg(data) {
  return request({
    url: '/reg',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
