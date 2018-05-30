import request from '@/widget/request'

export const getRedPackDetail = (data) => request('/activity-static/api/social/read/redEnvelop/getDetail.js',data)

export const openRedPack = (data) => request('/activity-static/api/social/write/redEnvelop/open.js',data)

export const getDownloadLink = (data) => request('/api/dolphin/list',data)



