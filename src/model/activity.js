import request from '../widget/request'

export const receiveCoupon = (data) => request('/api/social/coupon/receive.do',data)

export const getDownloadLink = (data) => request('/api/social/coupon/init.do', data)

export const receiveYidianka = (data) => request('/ouser-center/ecard/receive.do',data)
