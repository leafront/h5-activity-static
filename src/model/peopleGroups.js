import request from '@/widget/request'

export const groupsInt = (data) => request('/api/my/groupon/queryGrouponProductList', data)

export const groupsList = (data) => request('/api/my/groupon/list', data)

export const initiateGroup = (data) => request('/api/my/groupon/createGrouponActivity', data)

export const detailGroup = (data) => request('/api/my/groupon/productInfo', data)

export const initiateOrder = (data) => request('/api/checkout/initOrder', data)

export const deleteGroupon = (data) => request('/api/my/groupon/deleteGrouponActivity', data)

export const getWholeSaleAward = (data) => request('/api/my/groupon/getWholeSaleAward', data)

export const getGrouponRuleList = (data) => request('/api/my/groupon/getGrouponRuleList', data)
