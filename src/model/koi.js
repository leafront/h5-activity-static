
import request from '@/widget/request'

export const getKoiIndex = (data) => request('/api/my/user/info', data)
