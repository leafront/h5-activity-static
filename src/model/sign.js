import request from '@/widget/request'

export const getAwardDeatil = (pid, data) => request(`/ouser-center/activity/award/${pid}.do`, data)

export const getAwards = (data) => request('/ouser-center/activity/awards.do', data)

export const getUserInfo = (data) => request('/ouser-center/activity/user.do', data)

export const getInit = (data) => request('/ouser-center/activity/init.do', data)

export const signIn = (data) => request('/ouser-center/activity/sign.do', data)

export const signDraw = (data) => request('/ouser-center/activity/draw.do', data)

export const postShare = (data) => request('/ouser-center/activity/receiveShare.do', data)

export const remindSign = (data) => request('/ouser-center/notify/open.do', data)

export const querySign = (data) => request('/ouser-center/notify/query.do', data)

export const closeSign = (data) => request('/ouser-center/notify/close.do', data)





