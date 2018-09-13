import request from '../widget/request'

export const receiveCoupon = (data) => request('/api/social/coupon/receive.do',data)
