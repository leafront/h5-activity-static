import weixin_share from '@/common/weixin_share'

import utils from '@/widget/utils'

const wx_share = {
  weixinShare (type = 'ready') {
    const config = this.shareConfig

    if (utils.isApp()) {
      app.postMessage('share',{
        url: config.url,
        title: config.title,
        description: config.description,
        url160x160: config.pic,
        pic: config.pic
      },() => {
        this.updateHeaderMenu(false)
      })
    } else {

      if (utils.weixin()) {
        weixin_share.weixinShare(this.shareConfig)
      }

      if (type == 'click') {
        this.updateShareMenu(true)
        this.updateHeaderMenu(false)
      }
    }
  }
}

export default wx_share
