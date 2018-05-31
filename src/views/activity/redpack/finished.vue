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
    <div class="scroll-view-wrapper redpack-view" :class="{'visibility':!pageView}">
      <div class="redpack-bg" :style="{'backgroundImage': 'url('+redpackImage+')'}"></div>
      <div class="redpack-content">
        <div class="invite-title">
          <div class="invite-left-tit-bg">
          </div>
          <div class="invite-title-txt">
            <p>恭喜获得一张{{couponMoney}}元优惠券</p>
          </div>
          <div class="invite-right-tit-bg">
          </div>
        </div>
        <div class="finish-list">
          <p class="c3 font" v-for="item in friendCouponList"><b>{{item.hideMobile}}</b>已帮您拆红包</p>
        </div>
        <div class="redpack-share-btn" @click="linkAction(downloadLink)">
          <span>前往APP查看</span>
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

  import common from '@/widget/common'

  import utils from '@/widget/utils'

  import app from '@/widget/app'

  import config from '@/config/index'

  import * as Model from '@/model/redpack'

  import {mapGetters, mapActions} from 'vuex'

  import { redpackShareConfig } from './common'

  import wx_share from './weixin_share'

  const shareConfig = redpackShareConfig()

  export default {
    data () {
      return {
        title: '拆红包',
        isBorder: true,
        shareConfig,
        redpackImage: config.staticPath + '/activity-static/images/redpack_finished_bg.jpg?v=' + config.getTime,
        downloadLink: '',
        couponMoney: "",
        friendCouponList: []
      }
    },
    components: {
      AppHeader,
      HeaderNav,
      UIShare,
      inviteRule
    },
    mixin: ['loading'],
    computed: {
      ...mapGetters({
        'pageView': 'getPageView',
        'headerMenu': 'getHeaderMenu'
      })
    },
    created () {

      this.updatePageView(false)
      this.showLoading()
      this.getDownloadLink()
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
      linkAction (url) {

        if (url) {
          location.href = url
        }
      },
      pageAction (url) {
        this.$router.push(url)
      },
      toggleHeaderMenu () {
        if (this.headerMenu) {
          this.updateHeaderMenu(false)
        } else {
          this.updateHeaderMenu(true)
        }
      },
      getDownloadLink () {
        const areaCode = common.getAreaCode().areaCode
        Model.getDownloadLink({
          type: 'GET',
          data: {
            platform: config.platform,
            adCode: 'float_tail',
            companyId: config.companyId,
            areaCode,
            pageCode: 'H5_HOME',
            platformId: config.platformId
          }
        }).then((result) => {
          const data = result.data

          if (result.code ==  0 && data) {
            this.downloadLink = data.float_tail[0].linkUrl
          }
        })
      },
      getRedPackDetail () {
        const {redpackCode} = this.$route.query
        Model.getRedPackDetail({
          type: 'POST',
          data: {
            shareCode: redpackCode
          }
        }).then((result) => {

          const data = result.data
          this.$hideLoading()
          if (result.code == 0 && data) {
            this.updatePageView(true)
            const {
              activityStatus,
              friendCouponList,
              userCouponList,
              role
            } = data

            if (role == 0 || role == 1) {
              this.friendCouponList = friendCouponList
              this.couponMoney = userCouponList[0].couponMoney
            }

            const searchPrams = location.search

            if (role == 2) {
              this.pageAction('/activity/redpack/receive' + searchPrams)

            } else if(activityStatus == 0) {  //进行中
              this.pageAction('/activity/redpack/start' + searchPrams)
            } else if (activityStatus == 2) {

            } else if (activityStatus == 3) {
              this.pageAction('/activity/redpack/success' + searchPrams)
            } else if (activityStatus == 4) {
              this.pageAction('/activity/redpack/stop' + searchPrams)
            } else if (activityStatus == 5) {
              this.pageAction('/activity/redpack/invalid' + searchPrams)
            }

          } else {
            this.$toast(result.message)
          }
        })
      },
      weixinShare (type) {
        wx_share.weixinShare.call(this, type)
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
      font-size: .36rem;
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
  .finish-list{
    padding: .3rem 0;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    p{
      b{
        font-weight: bold;
      }
    }
  }

</style>
