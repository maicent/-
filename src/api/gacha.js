import request from '@/utils/request'

export function selfGacha(params) {
  return request({
    url: '/selfGacha',
    method: 'get',
    params
  })
}

export function gachaList(params) {
  return request({
    url: '/gacha/gachaList',
    method: 'get',
    params
  })
}

export function getPieData(params) {
  return request({
    url: '/gacha/pieData',
    method: 'get',
    params
  })
}

// 欧皇鉴定
export function appraisal(params) {
  return request({
    url: '/gacha/appraisal',
    method: 'get',
    params
  })
}

// 卡池分析
export function pool(params) {
  return request({
    url: '/gacha/pool',
    method: 'get',
    params
  })
}

// 导入
export function importData(data) {
  return request({
    url: '/import',
    method: 'post',
    data
  })
}
