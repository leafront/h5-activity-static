
import * as Model from '@/model/common'

import utils from '@/widget/utils'

const checkTime = (i)=> {
  if (i < 10) {
    i = "0" + i
  }
  return i
}

export const countTime = (activityTimes,serverTimes) => {
    const leftTimes = new Date(activityTimes) - new Date(serverTimes)//计算剩余的毫秒数
    if (leftTimes <= 0) {
      return -1
    }
    const days = parseInt(String(leftTimes / (1000 * 60 * 60 * 24)),10)    //计算剩余的天数
    const hours = parseInt(String((leftTimes / (1000 * 60 * 60)) % 24),10)   //计算剩余的小时
    const minutes = parseInt(String((leftTimes / (1000 * 60)) % 60),10)   //计算剩余的分钟
    const seconds = parseInt(String((leftTimes / 1000) % 60),10)    //计算剩余的秒数

    const daysStr = checkTime(days)
    const hoursStr = checkTime(hours)
    const minutesStr = checkTime(minutes)
    const secondsStr = checkTime(seconds)
    return hoursStr + ":" + minutesStr + ":" + secondsStr
}


export const getSystemTimes = () => {
  return Model.getSystemTime({
    type: 'GET'
  }).then((result) => {
    const data = result.data

    if (result.code == 0) {
      return data.timestamp
    } else {
      this.$toast(result.message)
    }
  })
}


