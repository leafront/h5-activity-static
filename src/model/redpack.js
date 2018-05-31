import request from '@/widget/request'

export const getRedPackDetail = (data) => request('/api/social/read/redEnvelop/getDetail',data)

export const openRedPack = (data) => request('/api/social/write/redEnvelop/open',data)

export const redPackBasicInfo = (data) => request('/activity-static/api/social/write/redEnvelop/activityBasicData.js',data)

export const getDownloadLink = (data) => request('/api/dolphin/list',data)





