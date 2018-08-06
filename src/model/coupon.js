import request from '@/widget/request'

export const getBannerList = (data) => request('/api/dolphin/list', data)

export const getCouponList = (data) => request('/api/promotion/coupon/couponThemeList', data)

export const receiveCoupon = (data) => request('/api/promotion/coupon/receiveCoupon', data)

export const getDolphinList = (data) => request('/api/dolphin/list', data)
