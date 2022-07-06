import request from '@/utils/request'

export function userList(params) {
  return request({
    url: '/admin/userList',
    method: 'get',
    params
  })
}
