<template>
  <div class="pageView">
    <AppHeader :title="title" :isBorder="isBorder">
      <div class="ui-header-right-icon" @click="toggleHeaderMenu">
        <i :class="{'active': headerMenu}"></i>
      </div>
    </AppHeader>
    <HeaderNav @weixinShare="weixinShare"></HeaderNav>
    <div class="scroll-view-wrapper">
      <div>test页面</div>
      <UIShare :show="show" :config="shareConfig"></UIShare>
    </div>
  </div>
</template>

<script type="text/javascript">

  import HeaderNav from '@/components/common/header_nav'

  import AppHeader from '@/components/common/header'

  import UIShare from '@/components/widget/ui-share'

  import utils from '@/widget/utils'

  import config from '@/config/index'

  import app from '@/widget/app'

  import {mapGetters, mapActions} from 'vuex'

  import weixin_share from '@/common/weixin_share'

  export default {
    data () {
      return {
        title: '测试页面',
        isBorder: true,
        show: true,
        shareConfig: {
          link: location.href,
          url: location.href,
          title:'来伊份【超级会员】即将上线！',
          desc: '尊享七大权益，用足全年能省1220元~',
          description: '尊享七大权益，用足全年能省1220元~',
          imgUrl: config.hostPath + '/images/share_vip_ico.png',
          pic: config.hostPath + '/images/share_vip_ico.png'
        }
      }
    },
    computed: {
      ...mapGetters({
        'pageView': 'getPageView',
        'headerMenu': 'getHeaderMenu'
      })
    },
    methods: {
      ...mapActions([
        'updatePageView',
        'updateHeaderMenu',
        'updateShareMenu'
      ]),
      toggleHeaderMenu () {
        if (this.headerMenu) {
          this.updateHeaderMenu(false)
        } else {
          this.updateHeaderMenu(true)
        }
      },
      weixinShare () {
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

          this.updateShareMenu(true)
          this.updateHeaderMenu(false)
        }
      }
    },
    components: {
      AppHeader,
      HeaderNav,
      UIShare
    }
  }
</script>
