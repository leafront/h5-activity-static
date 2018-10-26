
import request from '@/widget/request'

export const getKoiIndex = (data) => request('/api/my/user/info', data)

export const getKoiMerge = (data) => request('/api/promotion/dragonball/unionInfo', data)

export const submitCouponExchange = (data) => request('/api/promotion/dragonball/getCoupon', data)

export const getCouponExchange = (data) => request('/api/promotion/dragonball/getCoupon', data)

export const getKoiInfo = (data) => request('/api/promotion/dragonball/main', data)

export const getCouponList = (data) => request('/api/promotion/dragonball/coupons', data)
