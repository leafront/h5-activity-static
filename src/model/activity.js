import request from '../widget/request'

export const receiveCoupon = (data) => request('/api/social/coupon/receive.do',data)

export const getDownloadLink = (data) => request('/api/dolphin/list', data)
