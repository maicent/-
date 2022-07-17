import request from '@/utils/request'

export function userList(params) {
  return request({
    url: '/admin/userList',
    method: 'get',
    params
  })
}

export function allGachaList(params) {
  return request({
    url: '/admin/gachaList',
    method: 'get',
    params
  })
}

export function getNotice(params) {
  return request({
    url: '/admin/notice',
    method: 'get',
    params
  })
}

export function updataNotice(data) {
  return request({
    url: '/admin/upNotice',
    method: 'post',
    data
  })
}

// 删除公告
export function deleteNotice(params) {
  return request({
    url: '/admin/deNotice',
    method: 'get',
    params
  })
}
