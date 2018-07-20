import request from '@/widget/request'

export const getWorldCupPrize = (data) => request('/customer/worldcup/queryPrize.do', data)

export const getQueryRollModel = (data) => request('/customer/worldcup/queryRollModel.do', data)

export const getQueryTeamCard = (data) => request('/customer/worldcup/queryTeamCard.do', data)