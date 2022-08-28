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
