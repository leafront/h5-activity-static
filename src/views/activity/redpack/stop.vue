<template>
  <div class="pageView">
    <AppHeader :title="title" :isBorder="isBorder" :backFn="backAction">
    </AppHeader>
    <div class="scroll-view-wrapper invite-view" :class="{'visibility': !pageView}">
      <div class="redpack-bg" :style="{'backgroundImage': 'url('+redpackImage+')'}"></div>
      <div class="redpack-content">
        <div class="stop-tips">
          <h4 class="c3">您的好友已获得一张<strong>{{couponMoney}}</strong>元优惠券</h4>
          <p class="c3" v-for="item in friendCouponList"><b>{{item.hideMobile}}</b>帮忙拆红包获得一张{{item.couponMoney}}优惠券</p>
        </div>
        <div class="redpack-share-btn start-share-btn" @click="linkAction(downloadLink)">
          <span>前往APP下单，您也可以得红包</span>
        </div>
      </div>
      <inviteRule></inviteRule>
      <div class="redpack-view-bg1"></div>
      <div class="redpack-view-bg2"></div>
      <div class="redpack-view-bg3"></div>
    </div>
  </div>
</template>

<script type="text/javascript">

  import AppHeader from '@/components/common/header'

  import inviteRule from '@/components/redpack/rule'

  import utils from '@/widget/utils'

  import config from '@/config/index'

  import common from '@/widget/common'

  import * as Model from '@/model/redpack'

  import app from '@/widget/app'

  import {mapGetters, mapActions} from 'vuex'

  import { countTime } from './common'

  export default {
    data () {
      return {
        title: '拆红包',
        isBorder: true,
        shareConfig,
        redpackImage: config.staticPath + '/activity-static/images/redpack_stop_bg.jpg?v=' + config.getTime,
        downloadLink: '',
        couponMoney: '',
        friendCouponList: []
      }
    },
    components: {
      AppHeader,
      HeaderNav,
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

      this.$showLoading()

      this.getDownloadLink()
      this.getRedPackDetail()
    },
    methods: {
      ...mapActions([
        'updatePageView',
        'updateHeaderMenu',
        'updateShareMenu'
      ]),
      backAction () {
        const returnurl = this.$route.query.returnurl
        if (utils.isApp()) {
          app.back('refresh','forceBack')
        } else {
          if (returnurl) {
            location.replace(returnurl)
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
              friendCouponList,
              activityStatus,
              userCouponList,
              role
            } = data
            if (role == 0 || role == 1) {
              if (userCouponList.length) {
                this.couponMoney = userCouponList[0].couponMoney
              }

            }
            this.friendCouponList = friendCouponList
            const searchPrams = location.search

            if (role == 2 && activityStatus == 0) {
              this.pageAction('/activity/redpack/receive' + searchPrams)

            } else if (activityStatus == 0) {  //进行中

              this.pageAction('/activity/redpack/start' + searchPrams)

            } else if (activityStatus == 1) {
              this.$toast('活动已超时')
            } else if (activityStatus == 2) {
              this.pageAction('/activity/redpack/finished' + searchPrams)
            } else if (activityStatus == 3) {
              this.pageAction('/activity/redpack/success' + searchPrams)
            } else if (activityStatus == 5) {
              this.pageAction('/activity/redpack/invalid' + searchPrams)
            }

          } else {
            this.$toast(result.message)
          }
        })
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
      }
    }
  }
</script>

<style lang="scss">
  @import './styles/common.scss';

  .start-share-btn{
    margin-top: .3rem;
  }
  .stop-tips{
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
