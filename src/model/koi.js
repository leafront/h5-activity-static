
import request from '@/widget/request'

export const getKoiCouponNum = (data) => request('/activity-static/dragonball/coupons.json', data)
