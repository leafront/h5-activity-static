<template>
  <div class="pageView">
    <AppHeader :title="title" :isBorder="isBorder">
      <div class="ui-header-right-icon" @click="toggleHeaderMenu">
        <i :class="{'active': headerMenu}"></i>
        <svg class="icon icon-gengduo" aria-hidden="true">
          <use xlink:href="#icon-gengduo"></use>
        </svg>
      </div>
    </AppHeader>
    <HeaderNav @weixinShare="weixinShare"></HeaderNav>
    <div class="scroll-view-wrapper redpack-view" :class="{'visibility': !pageView}">
      <div class="redpack-bg"  v-if="redpackImage" :style="{'backgroundImage': 'url('+redpackImage+')'}"></div>
      <div class="redpack-content">
        <div class="invite-title">
          <div class="invite-left-tit-bg">
          </div>
          <div class="invite-title-txt">
            <p>恭喜您获得50元红包</p>
          </div>
          <div class="invite-right-tit-bg">
          </div>
        </div>
        <div class="invite-help">
          <p>邀请2位好友帮忙拆红包</p>
        </div>
        <div class="redpack-share-btn" @click="weixinShare">
          <span>立即分享</span>
        </div>
      </div>
      <div class="redpack-view-bg1"></div>
      <div class="redpack-view-bg2"></div>
      <div class="redpack-view-bg3"></div>
      <inviteRule></inviteRule>
      <UIShare :config="shareConfig"></UIShare>
    </div>
  </div>
</template>

<script type="text/javascript">

  import HeaderNav from '@/components/common/header_nav'

  import AppHeader from '@/components/common/header'

  import UIShare from '@/components/widget/ui-share'

  import inviteRule from '@/components/redpack/rule'

  import utils from '@/widget/utils'

  import app from '@/widget/app'

  import config from '@/config/index'

  import {mapGetters, mapActions} from 'vuex'

  import weixin_share from '@/common/weixin_share'

  import { redpackShareConfig } from './common'

  const shareConfig = redpackShareConfig()

  export default {
    data () {
      return {
        title: '拆红包',
        isBorder: true,
        shareConfig,
        redpackImage: ''
      }
    },
    components: {
      AppHeader,
      HeaderNav,
      UIShare,
      inviteRule
    },
    computed: {
      ...mapGetters({
        'pageView': 'getPageView',
        'headerMenu': 'getHeaderMenu'
      })
    },
    created () {

      this.updatePageView(false)
      this.$showLoading()

      const img = new Image()
      img.src = config.staticPath + '/activity-static/images/redpack_invite_bg.jpg'
      img.addEventListener('load', () => {

        this.redpackImage = img.src
        this.$hideLoading()
        this.updatePageView(true)

      }, false)

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
    }
  }
</script>

<style lang="scss">

  @import './styles/common.scss';
  .invite-title{
    display: flex;
    height: .96rem;
    width: 5rem;
    margin: 0 auto;
  }
  .invite-title-txt{
    flex:1;
    background: #fd3331;
    display: flex;
    align-items: center;
    justify-content: center;
    p{
      color: #fde284;
      font-size: .48rem;
    }

  }
  .invite-left-tit-bg{
    width: .07rem;
    height: .96rem;
    background: url(./images/redpack_left_line_bg.png) repeat-y;
    background-size: .07rem auto;
    position: relative;
    left:1px;
  }
  .invite-right-tit-bg{
    width: .07rem;
    height: .96rem;
    background: url(./images/redpack_right_line_bg.png) repeat-y;
    background-size: .07rem auto;
    position: relative;
    right:1px;
  }
  .invite-help{
    padding-top: .25rem;
    padding-bottom: .55rem;
    text-align:center;
    p{
      font-size: .36rem;
      color: #333;
    }
  }

</style>
