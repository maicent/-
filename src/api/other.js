import request from '@/utils/request'

export function partakeRanking(data) {
  return request({
    url: '/other/partakeRanking',
    method: 'post',
    data
  })
}

// 获取排位中卡池
export function allRankingPool(params) {
  return request({
    url: '/other/allRankingPool',
    method: 'get',
    params
  })
}

// 获取排位表格数据
export function rankingDate(data) {
  return request({
    url: '/other/rankingDate',
    method: 'post',
    data
  })
}

// 获取所有卡池列表
export function poolList(params) {
  return request({
    url: '/other/poolList',
    method: 'get',
    params
  })
}

// 编辑卡池列表
export function editPool(data) {
  return request({
    url: '/other/editPool',
    method: 'post',
    data
  })
}

// 获取卡池类型
export function poolType(data) {
  return request({
    url: '/other/poolType',
    method: 'post',
    data
  })
}

// 更新卡池（管理员）
export function updataPool(data) {
  return request({
    url: '/other/updataPool',
    method: 'post',
    data
  })
}

