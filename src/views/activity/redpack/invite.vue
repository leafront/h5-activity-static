<template>
  <div class="pageView">
    <AppHeader :title="title" :isBorder="isBorder" :backFn="backAction">
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
            <p>恭喜您获得{{couponMoney}}元红包</p>
          </div>
          <div class="invite-right-tit-bg">
          </div>
        </div>
        <div class="invite-help">
          <p>邀请{{needHelpCount}}位好友帮忙拆红包</p>
        </div>
        <div class="redpack-share-btn invite-share-btn" @click="weixinShare('click')">
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

  import * as Model from '@/model/redpack'

  import {mapGetters, mapActions} from 'vuex'

  import wx_share from './weixin_share'

  import { redpackShareConfig } from './common'

  const shareConfig = redpackShareConfig()

  export default {
    data () {
      return {
        title: '拆红包',
        isBorder: true,
        shareConfig,
        redpackImage: config.staticPath + '/activity-static/images/redpack_invite_bg.jpg?v=' + config.getTime,
        couponMoney: "",
        needHelpCount: 0
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
    mixin: ['loading'],
    created () {

      this.updatePageView(false)
      this.showLoading()
      this.getRedPackDetail()
      this.weixinShare()
    },
    methods: {
      ...mapActions([
        'updatePageView',
        'updateHeaderMenu',
        'updateShareMenu'
      ]),
      backAction () {
        const from = this.$route.query.from
        if (utils.isApp()) {
          app.back('refresh','forceBack')
        } else {
          if (from) {
            location.replace(from)
          } else {
            location.href = '/index.html'
          }
        }
      },
      toggleHeaderMenu () {
        if (this.headerMenu) {
          this.updateHeaderMenu(false)
        } else {
          this.updateHeaderMenu(true)
        }
      },
      getRedPackDetail () {
        const {redpackCode} = this.$route.query
        Model.getRedPackDetail({
          type: 'POST',
          data: {
            shareCode: redpackCode
          }
        }).then((result) => {
          this.$hideLoading()
          const data = result.data
          if (result.code == 0 && data) {
            this.updatePageView(true)
            const {
              activityStatus,
              userCouponList,
              needHelpCount,
              role
            } = data
            this.couponMoney = userCouponList[0].couponMoney
            this.needHelpCount = needHelpCount
            const searchPrams = location.search
            if (role == 2) {
              this.pageAction('/activity/redpack/receive' + searchPrams)

            } else if(activityStatus == 0) {  //进行中

              this.pageAction('/activity/redpack/start' + searchPrams)

            }else if (activityStatus == 2) {
              this.pageAction('/activity/redpack/finished' + searchPrams)
            } else if (activityStatus == 3) {
              this.pageAction('/activity/redpack/success' + searchPrams)
            } else if (activityStatus == 4) {
              this.pageAction('/activity/redpack/stop' +  searchPrams)
            } else if (activityStatus == 5) {
              this.pageAction('/activity/redpack/invalid' + searchPrams)
            }

          } else {
            this.$toast(result.message)
          }

        })
      },
      pageAction (url) {
        this.$router.push(url)
      },
      weixinShare (type) {
        wx_share.weixinShare.call(this,type)
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
    text-align:center;
    p{
      font-size: .36rem;
      color: #333;
    }
  }
  .invite-share-btn {
    margin-top: .55rem;
  }

</style>
