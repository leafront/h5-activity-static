
import config from '@/config/index'

import * as Model from '@/model/common'

const checkTime = (i)=> {
  if (i<10) {
    i = "0" + i
  }
  return i
}

export const countTime = (activityTimes,self) => {
    const leftTimes = new Date(activityTimes) - new Date()//计算剩余的毫秒数
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

export const redpackShareConfig = () => {
  const shareConfig = {
    link: config.hostPath + '/activity/redpack/receive',
    url: config.hostPath + '/activity/redpack/receive',
    title:'速来！来伊份618狂欢，瓜分1亿红包',
    desc: '我刚领到一个大红包，快帮我拆一下！拆者有份，你也有红包拿哦~',
    description: '我刚领到一个大红包，快帮我拆一下！拆者有份，你也有红包拿哦~',
    imgUrl: config.hostPath + '/images/redpack_icon.png',
    pic: config.hostPath + '/images/redpack_icon.png'
  }
  return shareConfig
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


