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
      <div class="redpack-bg" v-if="redpackImage" :style="{'backgroundImage': 'url('+redpackImage+')'}"></div>
      <div class="redpack-content">
        <div class="start-tips">
          <h4 class="c3">还有<strong>{{showCountTime}}</strong>即将失效</h4>
          <p class="c3" v-for="(item) in friendCouponList"><b>{{item.hideMobile}}</b>已帮您拆红包</p>
          <p class="c3">还需{{needHelpCount}}位好友</p>
        </div>
        <div class="redpack-share-btn start-share-btn" @click="weixinShare">
          <span>立即分享</span>
        </div>
      </div>
      <inviteRule></inviteRule>
      <div class="redpack-view-bg1"></div>
      <div class="redpack-view-bg2"></div>
      <div class="redpack-view-bg3"></div>
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

  import config from '@/config/index'

  import app from '@/widget/app'

  import * as Model from '@/model/redpack'

  import {mapGetters, mapActions} from 'vuex'

  import weixin_share from '@/common/weixin_share'

  import { getSystemTimes, countTime, redpackShareConfig, linkInfo } from './common'

  const shareConfig = redpackShareConfig()

  export default {
    data () {
      return {
        title: '拆红包',
        isBorder: true,
        shareConfig,
        redpackImage: config.staticPath + '/activity-static/images/redpack_invite_bg.jpg?v=' + config.getTime,
        friendCouponList: [],
        overTime: '',
        showCountTime: '',
        countTimer:  null,
        needHelpCount: 0,
        from: this.$route.query.from
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

      Promise.all([
        this.getRedPackDetail(),
        this.getSystemTimes()
      ]).then((result) => {
        this.$hideLoading()
        this.updatePageView(true)
        const activityTimes = result[0]
        const serverTimes = result[1]
        this.startShowCountTime(activityTimes,serverTimes)
      })

    },
    methods: {
      ...mapActions([
        'updatePageView',
        'updateHeaderMenu',
        'updateShareMenu'
      ]),
      backAction () {
        const from = this.from
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
      /**
       * 显示倒计时时间
       */
      startShowCountTime (activityTimes,serverTimes) {
        const showCountTime = countTime(activityTimes,serverTimes)
        this.showCountTime = showCountTime

        if (countTime(activityTimes,serverTimes) <= 0) {
          clearInterval(this.countTimer)
          this.showCountTime = '00:00:00'
          this.pageAction('/activity/redpack/invalid')
        }

        this.countTimer = setInterval(() => {
          serverTimes -= 1000 * 1
          const showCountTimeStr =  countTime(activityTimes,serverTimes)
          this.showCountTime = showCountTimeStr == -1 ? '00:00:00' : showCountTimeStr
        },1000)
      },
      toggleHeaderMenu () {
        if (this.headerMenu) {
          this.updateHeaderMenu(false)
        } else {
          this.updateHeaderMenu(true)
        }
      },
      getSystemTimes () {
        return getSystemTimes.call(this)
      },
      getRedPackDetail () {
        const {redpackCode} = this.$route.query
        return Model.getRedPackDetail({
          type: 'GET',
          data: {
            shareCode: redpackCode
          }
        }).then((result) => {

          const data = result.data
          if (result.code == 0 && data) {
            const {
              activityStatus,
              overTime,
              needHelpCount,
              friendCouponList
            } = data

            this.needHelpCount = needHelpCount
            this.overTime = overTime
            this.friendCouponList = friendCouponList

            if (activityStatus == 0) {  //进行中

              this.pageAction('/activity/redpack/start')

            }else if (activityStatus == 2) {
              this.pageAction('/activity/redpack/finished')
            } else if (activityStatus == 3) {
              this.pageAction('/activity/redpack/success')
            } else if (activityStatus == 4) {
              this.pageAction('/activity/redpack/stop')
            } else if (activityStatus == 5) {
              this.pageAction('/activity/redpack/invalid')
            }

          } else {
            this.$toast(result.message)
          }
          return data.overTime
        })
      },
      pageAction (url) {
        this.$router.push(url)
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
    beforeDestroy () {
      if (this.countTimer) {
        clearInterval(this.countTimer)
      }
    }
  }
</script>

<style lang="scss">
  @import './styles/common.scss';
  .start-content{
    margin: -.24rem .28rem 0;
    padding: 0 .48rem .6rem;
    background: #fff;
  }

  .start-share-btn{
    margin-top: .3rem;
  }
  .start-tips{
    font-size: .36rem;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    p{
      font-size: .28rem;
      b{
        font-weight: bold;
      }
    }
    h4{
      padding-bottom: .45rem;
      strong{
        color:#d20505;
        padding: 0 .15rem;
      }
    }
  }


</style>
