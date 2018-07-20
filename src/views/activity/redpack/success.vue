<template>
  <div class="pageView">
    <AppHeader :title="title" :isBorder="isBorder" :backFn="backAction">
    </AppHeader>
    <div class="scroll-view-wrapper redpack-view" :class="{'visibility': pageView}">
      <div class="redpack-bg" :style="{'backgroundImage': 'url('+redpackImage+')'}"></div>
      <div class="redpack-content">
        <div class="redpack-success">
          <p class="c3" v-if="couponMoney">恭喜您！</p>
          <p class="c3" v-if="couponMoney">成功帮好友获得一张<b>{{couponMoney}}</b>元优惠券</p>
          <h4 v-if="couponAmount">奖励您一张</h4>
        </div>
        <div class="invite-title" v-if="couponAmount">
          <div class="invite-left-tit-bg">
          </div>
          <div class="invite-success-txt">
            <div class="redpack-success-money">
              <p><i>¥</i>{{couponAmount}}</p>
            </div>
            <div class="redpack-success-discount">
              <p>{{couponName}}</p>
              <span>{{startTime}}-{{endTime}}可用</span>
            </div>
          </div>
          <div class="invite-right-tit-bg">
          </div>
        </div>
        <div class="redpack-share-btn redpack-success-btn" @click="linkAction(downloadLink)">
          <span>前往APP查看</span>
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

  import common from '@/widget/common'

  import app from '@/widget/app'

  import {mapGetters, mapActions} from 'vuex'

  import * as Model from '@/model/redpack'

  import config from '@/config/index'

  export default {
    data () {
      return {
        title: '拆红包',
        isBorder: true,
        redpackImage: config.staticPath + '/activity-static/images/redpack_finished_bg.jpg?v=' + config.getTime,
        downloadLink: '',
        couponMoney: '',
        couponAmount: '',
        couponName: '',
        startTime: '',
        endTime: '',
        pageView: false
      }
    },
    components: {
      AppHeader,
      inviteRule
    },
    computed: {
      ...mapGetters({
        'headerMenu': 'getHeaderMenu'
      })
    },
    created () {
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
          location.href = '/my/coupons-list.html'
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

          const data = result.data
          if (result.code == 0 && data) {

            const {
              userCouponList,
              activityStatus,
              friendCouponList,
              userId,
              role
            } = data

            if (role == 0 || role == 1) {
              if (userCouponList.length) {
                this.couponMoney = userCouponList[0].couponMoney
              }
            }

            let couponAmount = ''
            friendCouponList.some((item) => {
              if (userId == item.userId) {
                couponAmount = item.couponMoney
                this.startTime = item.startTime.slice(0,-9).replace(/\-/ig,'/')
                this.endTime = item.endTime.slice(0,-9).replace(/\-/ig,'/')
                this.couponName = item.couponName
                return true
              } else {
                return false
              }
            })

            this.couponAmount = couponAmount
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
              } else if (activityStatus == 4) {
                this.pageAction('/activity/redpack/stop' + searchPrams)
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
  .redpack-success{
    display: flex;
    flex-direction: column;
    align-items: center;
    p{
      font-size: .3rem;
      b{
        color:#d20505;
      }
    }
    h4{
      padding: .25rem 0;
      color:#d20505;
      font-size: .36rem;
    }
  }
  .invite-title{
    display: flex;
    height: .96rem;
    width: 5rem;
    margin: 0 auto;
  }
  .invite-success-txt{
    flex:1;
    background: #fd3331;
    display: flex;
    align-items: center;
    padding: .12rem 0;
    height: .96rem;
  }

  .redpack-success-money {
    width: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 1px dashed #fde284;
    height: .72rem;
    p{
      color: #fde284;
      font-size: .8rem;
      i{
        font-size: .32rem;
        position: relative;
        top: -.3rem;
      }
    }
  }
  .redpack-success-discount{
    height: .96rem;
    flex:1;
    display: flex;
    align-items: center;
    flex-direction: column;
    color:#fde284;
    p{
      font-size: .44rem;
      line-height: .6rem;

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
  .redpack-success-btn{
    margin-top: .5rem;
  }

</style>
