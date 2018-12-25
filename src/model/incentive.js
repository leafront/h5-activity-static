import request from '../widget/request'

// 查询全民团购奖金汇总数据
export const getWholeSaleAward = (data) => request('/api/my/groupon/getWholeSaleAward', data)

// 查询个人团购明细
export const queryWholeSaleDetailPage = (data) => request('/api/my/groupon/queryWholeSaleDetailPage',data)

// 跳转收入说明页面
export const goPageDeclare = (data) => request('/api/dolphin/list', data)
