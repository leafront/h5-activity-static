import request from '@/widget/request'

export const getAwardDeatil = (pid, data) => request(`/ouser-center/activity/award/${pid}.do`, data)

export const getAwards = (data) => request('/ouser-center/activity/awards.do', data)

export const getUserInfo = (data) => request('/ouser-center/activity/user.do', data)

export const getInit = (data) => request('/ouser-center/activity/init.do', data)




