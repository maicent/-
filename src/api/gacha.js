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

// B服导入
export function importDatafromB(data) {
  return request({
    url: '/importbyB',
    method: 'post',
    data
  })
}

// 获取卡池名称
export function getPoolName(params) {
  return request({
    url: '/gacha/getPoolName',
    method: 'get',
    params
  })
}

// 根据卡池名称获取数据
export function getPoolbyName(data) {
  return request({
    url: '/gacha/getPoolbyName',
    method: 'post',
    data
  })
}

// 获取个人卡池数据
export function getSelfPool(data) {
  return request({
    url: '/gacha/getSelfPoolDate',
    method: 'post',
    data
  })
}

// 获取每日卡池概率
export function getPoolbyDay(data) {
  return request({
    url: '/gacha/getPoolbyDay',
    method: 'post',
    data
  })
}
