const checkTime = (i)=> {
  if (i<10) {
    i = "0" + i
  }
  return i
}

const countTime= (times) => {

  const leftTimes = new Date(times) - new Date()//计算剩余的毫秒数

  if (leftTimes < 0) {
    return
  }
  const days = parseInt(String(leftTimes / (1000 * 60 * 60 * 24)),10)    //计算剩余的天数
  const hours = parseInt(String((leftTimes / (1000 * 60 * 60)) % 24),10)   //计算剩余的小时
  const minutes = parseInt(String((leftTimes / (1000 * 60)) % 60),10)   //计算剩余的分钟
  const seconds = parseInt(String((leftTimes / 1000) % 60),10)    //计算剩余的秒数

  const daysStr = checkTime(days)
  const hoursStr = checkTime(hours)
  const minutesStr = checkTime(minutes)
  const secondsStr = checkTime(seconds)

  console.log(daysStr + "天" + hoursStr + "小时" + minutesStr + "分" + secondsStr + "秒")
  return daysStr + "天" + hoursStr + "小时" + minutesStr + "分" + secondsStr + "秒"
}

export default countTime

