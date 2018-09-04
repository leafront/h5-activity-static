import request from '@/widget/request'

export const recommendUser = (data) => request('/agent-fx-web/api/recommendUserInfo.do', data)
