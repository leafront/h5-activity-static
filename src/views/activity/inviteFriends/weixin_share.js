import weixin_share from '@/common/weixin_share'

import utils from '@/widget/utils'

import app from '@/widget/app'

import config from '@/config/index'

const wx_share = {
  shareConfig  () {
    const searchPath = location.search
    // const redpackCode = this.redpackCode || utils.query('redpackCode')
    let link = config.hostPath + `/activity/inviteFriends/invitation`
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
      title:'来伊份会员狂欢福利，拿红包拼手气！戳！',
      desc: '我刚领到一个大红包，快帮我拆一下！拆者有份，你也有红包拿哦~',
      description: '我刚领到一个大红包，快帮我拆一下！拆者有份，你也有红包拿哦~',
      imgUrl: config.staticPath + '/activity-static/images/redpack_icon.png?v=' + config.getTime,
      pic: config.staticPath + '/activity-static/images/redpack_icon.png?v=' + config.getTime
    }
    return shareConfig
  },
  weixinShare () {
    console.log(222222);
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
