import request from '@/widget/request'

export const getRedPackDetail = (data) => request('/api/social/read/redEnvelop/getDetail',data)

export const openRedPack = (data) => request('/api/social/write/redEnvelop/open',data)

export const getDownloadLink = (data) => request('/api/dolphin/list',data)



