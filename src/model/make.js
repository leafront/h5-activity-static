import request from '@/widget/request'

export const getUserInfo = (data) => request('/api/my/user/info', data)

export const getHeadLineList = (data) => request('/cms/view/h5/headlinesList', data)

export const getUserBroadcast = (data) => request('/agent-fx-web/api/queryCommissionInfo.do', data)
