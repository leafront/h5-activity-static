import request from '@/widget/request'

export const getAwardDeatil = (pid, data) => request(`/ouser-center/activity/award/${pid}.do`, data)

export const getAwards = (data) => request('/ouser-center/activity/awards.do', data)

// export const getAwardDeatil = (data) => request('/ouser-center/activity/award/'+data.pid+'.do', data)



