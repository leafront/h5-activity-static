import request from '@/widget/request'

export const recommendUser = (data) => request('/agent-fx-web/api/recommendUserInfo.do', data)

export const getShareCode = (data) => request('/api/seller/distributor/currDistributor', data)
