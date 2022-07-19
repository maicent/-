import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login2?verifyCodeActual=' + data.verifyCodeActual,
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

// 修改密码
export function upPwd(data) {
  return request({
    url: '/user/upPwd',
    method: 'post',
    data
  })
}

export function reg(data) {
  return request({
    url: '/reg?verifyCodeActual=' + data.verifyCodeActual,
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

// 获取验证码
export function getKaptcha(params) {
  return request({
    url: '/kaptcha',
    method: 'get',
    params
  })
}
