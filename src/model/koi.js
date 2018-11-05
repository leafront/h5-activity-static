
import request from '@/widget/request'

export const getKoiMerge = (data) => request('/api/promotion/dragonball/unionInfo', data)

export const union = (data) => request('/api/promotion/dragonball/union', data)

export const submitCouponExchange = (data) => request('/api/promotion/dragonball/getCoupon', data)

export const getCouponExchange = (data) => request('/api/promotion/dragonball/getCoupon', data)

export const getKoiInfo = (data) => request('/api/promotion/dragonball/main', data)

export const getCouponList = (data) => request('/api/promotion/dragonball/coupons', data)

export const unUseJump = (data) => request('/api/promotion/dragonball/getLinkUrl', data)
