import weixin_share from '@/common/weixin_share'

import utils from '@/widget/utils'

import app from '@/widget/app'

import config from '@/config/index'

const wx_share = {
  shareConfig  () {
    const searchPath = location.search
    // const redpackCode = this.redpackCode || utils.query('redpackCode')
    let link = config.hostPath + `/actives/online/invitationfriends/index.html` + "?" + "originCode" + "=" + this.invitationShareC
    // if (redpackCode) {
    //   if ((searchPath.indexOf('redpackCode') > -1)) {
    //     link = config.hostPath + `/activity/redpack/receive${searchPath}`
    //   } else {
    //     link = config.hostPath + `/activity/redpack/receive${searchPath}&redpackCode=${redpackCode}`
    //   }
    // }
    const shareConfig = {
      link: link,
      url: link,
      title:'【来伊份】送你88元大礼包！',
      desc: '全球优质美食，分享给同样爱生活的你，88元红包让你买的更开心！',
      description: '全球优质美食，分享给同样爱生活的你，88元红包让你买的更开心！',
      imgUrl: config.staticPath + '/activity-static/images/invitation_icon.png?v=' + config.getTime,
      pic: config.staticPath + '/activity-static/images/invitation_icon.png?v=' + config.getTime
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
      })
    } else {
      if (utils.weixin()) {
        this.updateShareMenu(true)
        weixin_share.weixinShare(shareConfig)
      }
    }
  }
}

export default wx_share
