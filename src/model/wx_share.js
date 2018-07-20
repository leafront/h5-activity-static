import request from '@/widget/request'

export const getSign = (data) => request('/api/weixin/getSign', data)

export const getWeixin = (data) => request('/activity-static/weixin-js-sdk/index.js', data)

export const getCurrDistributor = (data) => request('/api/seller/distributor/currDistributor', data)
