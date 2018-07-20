import request from '@/widget/request'

export const getShopList = (data) => request('/api/getShop/list', data)

export const getSuperVipInfo = (data) => request('/ouser-center/superVipRead/purchase/saved', data)

export const getMemberInfo = (data) => request('/ouser-center/superVipRead/memberInfo', data)
