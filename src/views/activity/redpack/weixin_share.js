import weixin_share from '@/common/weixin_share'

import utils from '@/widget/utils'

import config from '@/config/index'


const wx_share = {
  shareConfig  () {
    const redpackCode = this.redpackCode || utils.query('redpackCode')
    const orderCode = utils.query('orderCode')
    let link = ''
    if (redpackCode) {
      link = config.hostPath + `/activity/redpack/receive?orderCode=${orderCode}&redpackCode=${redpackCode}`
    } else {
      link = config.hostPath + `/activity/redpack/receive?orderCode=${orderCode}`
    }
    const shareConfig = {
      link: link,
      url: link,
      title:'速来！来伊份618狂欢，瓜分1亿红包',
      desc: '我刚领到一个大红包，快帮我拆一下！拆者有份，你也有红包拿哦~',
      description: '我刚领到一个大红包，快帮我拆一下！拆者有份，你也有红包拿哦~',
      imgUrl: config.staticPath + '/images/redpack_icon.png?v=' + config.getTime,
      pic: config.staticPath + '/images/redpack_icon.png?v=' + config.getTime
    }
    return shareConfig
  },
  weixinShare () {

    const shareConfig = this.shareConfig

    if (utils.isApp()) {
      app.postMessage('share',{
        url: shareConfig.url,
        title: shareConfig.title,
        description: shareConfig.description,
        url160x160: shareConfig.pic,
        pic: shareConfig.pic
      },() => {
        this.updateHeaderMenu(false)
      })
    } else {

      if (utils.weixin()) {
        weixin_share.weixinShare(this.shareConfig)
      }

      this.updateShareMenu(true)
      this.updateHeaderMenu(false)
    }
  }
}

export default wx_share
