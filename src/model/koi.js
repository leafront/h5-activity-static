
import request from '@/widget/request'

export const submitCouponExchange = (data) => request('/api/promotion/dragonball/getCoupon', data)

export const getCouponExchange = (data) => request('/api/promotion/dragonball/getCoupon', data)

export const getKoiInfo = (data) => request('/api/promotion/dragonball/main', data)

export const getCouponList = (data) => request('/api/promotion/dragonball/coupons', data)

export const getKoiStatus = (data) => request('/api/promotion/dragonball/status', data)


