
import request from '@/widget/request'

export const getKoiCouponNum = (data) => request('/activity-static/dragonball/coupons.json', data)

export const submitCouponExchange = (data) => request('/activity-static/dragonball/getCoupon.json',data)

export const getCouponExchange = (data) => request('/activity-static/dragonball/getCoupon.json',data)

export const getKoiInfo = (data) => request('/activity-static/dragonball/main.json',data)

export const getSystemTime = (data) => request('/api/realTime/getTimestamp',data)
