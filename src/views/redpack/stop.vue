<template>
  <div class="pageView">
    <AppHeader :title="title" :isBorder="isBorder" :backFn="backAction">
    </AppHeader>
    <div class="scroll-view-wrapper" :class="{'visibility': pageView}">
      <div class="redpack-bg" :style="{'backgroundImage': 'url('+redpackImage+')'}"></div>
      <div class="redpack-view">
        <div class="redpack-content">
          <div class="stop-tips">
            <h4 class="c3">来晚一步~您的好友红包已拆成功</h4>
            <p class="c3" v-for="item in friendCouponList"><b>{{item.hideMobile}}</b>帮忙拆红包获得一张{{item.couponMoney}}优惠券</p>
          </div>
          <div class="redpack-share-btn start-share-btn" @click="linkAction(downloadLink)">
            <span>前往APP下单，您也可以得红包</span>
          </div>
        </div>
        <RedPackRule></RedPackRule>
        <div class="redpack-view-bg1"></div>
        <div class="redpack-view-bg2">
          <span></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">

  import AppHeader from '@/components/common/header'
  import RedPackRule from '@/components/redpack/rule'
  import utils from '@/widget/utils'
  import config from '@/config/index'
  import common from '@/widget/common'
  import * as Model from '@/model/redpack'
  import app from '@/widget/app'
  import {mapGetters, mapActions} from 'vuex'

  export default {
    data () {
      return {
        title: '拆红包',
        isBorder: true,
        redpackImage: config.staticPath + '/activity-static/images/redpack_stop_bg.jpg?v=' + config.getTime,
        downloadLink: '',
        couponMoney: '',
        friendCouponList: [],
        pageView: false
      }
    },
    components: {
      AppHeader,
      RedPackRule
    },
    computed: {
      ...mapGetters({
        'headerMenu': 'getHeaderMenu'
      })
    },
    created () {
      this.$showLoading()
      this.getDownloadLink()
      this.getRedPackDetail()
    },
    methods: {
      ...mapActions([
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

        if (utils.isApp()) {
          location.href = 'lyf://home'
        } else {
          if (url) {
            location.href = url
          }
        }
      },
      pageAction (url) {
        this.$router.replace(url)
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

            if (role == 2) {
              this.pageAction('/activity/redpack/receive'+ searchPrams)
            } else {
              if (activityStatus == 0) {
								this.pageAction('/activity/redpack/start'+ searchPrams)
              } else if (activityStatus == 1) {
                this.pageAction('/activity/redpack/invalid' + searchPrams)
              } else if (activityStatus == 2) {
                this.pageAction('/activity/redpack/finished' + searchPrams)
              } else if (activityStatus == 3) {
                this.pageAction('/activity/redpack/success' + searchPrams)
              } else if (activityStatus == 5) {
                this.pageAction('/activity/redpack/invalid' + searchPrams)
              }
            }

            this.pageView = true

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
            adCode: 'float_tail',
            areaCode,
            pageCode: 'H5_HOME'
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
