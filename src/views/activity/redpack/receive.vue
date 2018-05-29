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
      <div class="redpack-bg" :style="{'backgroundImage': 'url('+redpackImage+')'}"></div>
      <div class="redpack-content">
        <div class="receive-tips">
          <span class="c3">您的好友有一个来伊份红包需要您帮助拆开</span>
          <p class="c3">还有<strong>{{showCountTime}}</strong>即将失效</p>
        </div>
        <div class="receive-form">
          <div class="receive-form-item">
            <input type="tel" class="receive-form-input font" maxlength="11" v-model.trim="params.mobile" placeholder="请输入手机号"/>
            <button class="receive-form-btn" :disabled="!isClickCode" @click="openImageValidate">{{codeText}}</button>
          </div>
          <div class="receive-form-item">
            <input type="tel" class="receive-form-input font" maxlength="6" v-model.trim="params.smsCode" placeholder="请输入验证码"/>
          </div>
          <div class="receive-form-submit redpack-share-btn" @click="openRedPack">
            <span>领取红包</span>
          </div>
        </div>
      </div>
      <RedPackRule></RedPackRule>
      <div class="redpack-view-bg1"></div>
      <div class="redpack-view-bg2"></div>
      <div class="redpack-view-bg3"></div>
      <UIShare :config="shareConfig"></UIShare>
      <ImageValidate  @startCountTime="startCountTime"
                      :mobile="params.mobile">
      </ImageValidate>
    </div>
  </div>
</template>

<script type="text/javascript">

  import HeaderNav from '@/components/common/header_nav'

  import AppHeader from '@/components/common/header'

  import UIShare from '@/components/widget/ui-share'

  import RedPackRule from '@/components/redpack/rule'

  import ImageValidate from '@/components/common/imageValidate'

  import validate from '@/widget/validate'

  import utils from '@/widget/utils'

  import app from '@/widget/app'

  import config from '@/config/index'

  import {mapGetters, mapActions} from 'vuex'

  import { countTime, getSystemTimes, redpackShareConfig } from './common'

  import weixin_share from '@/common/weixin_share'

  import * as Model from '@/model/redpack'

  const shareConfig = redpackShareConfig()

  export default {
    data () {
      return {
        title: '拆红包',
        isBorder: true,
        isClickCode: true,
        codeText: '验证码',
        countTimeTimer: null,
        params: {
          mobile: '',
          smsCode: '',
          shareCode: this.$route.query.shareCode
        },
        showCountTime: '',
        shareConfig,
        redpackImage: config.staticPath + '/activity-static/images/redpack_invite_bg.jpg'
      }
    },
    computed: {
      ...mapGetters({
        'pageView': 'getPageView',
        'headerMenu': 'getHeaderMenu'
      })
    },
    components: {
      AppHeader,
      HeaderNav,
      UIShare,
      RedPackRule,
      ImageValidate
    },
    created () {

      this.updatePageView(false)
      this.$showLoading()
      this.getRedPackDetail().then(((result) => {
        this.$hideLoading()
        this.updatePageView(true)
        this.startShowCountTime(result)
      }))

    },
    methods: {
      ...mapActions([
        'updatePageView',
        'updateHeaderMenu',
        'updateShareMenu',
        'updateImageValidate'
      ]),
      toggleHeaderMenu() {
        if (this.headerMenu) {
          this.updateHeaderMenu(false)
        } else {
          this.updateHeaderMenu(true)
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
      getRedPackDetail () {
        const shareCode = this.$route.query
        return Model.getRedPackDetail({
          type: 'GET',
          data: {
            shareCode
          }
        }).then((result) => {

          const data = result.data
          if (result.code == 0 && data) {
            const activityStatus = data.activityStatus

            this.receivedList = data.receivedList
            this.overTime = data.overTime

          } else {
            this.$toast(result.message)
          }
          return data.overTime
        })
      },
      /**
       * 获取当期服务器时间
       */
      getSystemTimes () {
        return getSystemTimes.call(this)
      },
      startCountTime () {
        if (!this.isClickCode) {
          return
        }
        this.isClickCode = false

        let times = 60

        this.codeText = times + 's'
        const countTimeTimer = setInterval(() => {
          times--
          this.codeText = times+'s'

          if(times == 0) {
            this.isClickCode = true
            this.codeText = '验证码'
            clearInterval(countTimeTimer)
          }
        },1000)

        this.updateImageValidate(false)

        this.countTimeTimer = countTimeTimer
      },
      openImageValidate () {
        const {
          mobile
        } = this.params

        const mobileStr = utils.trim(mobile)

        if (!mobileStr) {
          this.$toast('请输入手机号码')
          return
        }

        if (!validate.isMobile(mobileStr)) {
          this.$toast('请输入正确的手机号码')
          return
        }

        this.updateImageValidate(true)

      },
      weixinShare() {
        const config = this.shareConfig

        if (utils.isApp()) {
          app.postMessage('share', {
            url: config.url,
            title: config.title,
            description: config.description,
            url160x160: config.pic,
            pic: config.pic
          }, () => {
            this.updateHeaderMenu(false)
          })
        } else {

          if (utils.weixin()) {
            weixin_share.weixinShare(this.shareConfig)
          }

          this.updateShareMenu(true)
          this.updateHeaderMenu(false)
        }
      },
      pageAction (url) {
        this.$router.push(url)
      },
      /**
       * 拆开启红包
       */
      openRedPack () {
        const data = this.params
        const {
          mobile,
          smsCode
        } = this.params

        const mobileStr = utils.trim(mobile)
        const smsCodeStr = utils.trim(smsCode)

        if (!mobileStr) {
          this.$toast('请输入手机号码')
          return
        }

        if (!validate.isMobile(mobileStr)) {
          this.$toast('请输入正确的手机号码')
          return
        }
        if (!smsCodeStr) {
          this.$toast('请输入短信验证码')
          return
        }

        if (!validate.isMessageCode(smsCodeStr)) {
          this.$toast('请输入正确的短信验证码')
        }
        Model.openRedPack({
          type: 'POST',
          data
        }).then((result) => {
          const data = result.data
          if (result.code == 0 && data) {

            const activityStatus = data.activityStatus

            if (activityStatus == 0) {  //进行中

              this.pageAction('/activity/redpack/start')

            }else if (activityStatus == 2) {
              this.pageAction('/activity/redpack/finish')
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
        })
      }
    },
    beforeDestroy () {
      if (this.countTimeTimer) {
        clearInterval(this.countTimeTimer)
      }
    }
  }
</script>

<style lang="scss">

  @import './styles/common.scss';
  .receive-tips{
    text-align: center;
    padding-top: .1rem;
    span{
      font-size: .3rem;
    }
    p{
      padding-top: .15rem;
      padding-bottom: .25rem;
      font-size: .36rem;
      strong{
        padding: 0 .15rem;
        color:#d20505;
      }
    }
  }
  .receive-form-item{
    padding: .12rem 0;
    background: #eee;
    height: .7rem;
    border-radius: .3rem;
    display:flex;
    overflow:hidden;
    &:nth-child(2){
      margin-top: .18rem;
    }
    .receive-form-input{
      padding-left:.3rem;
      line-height: .46rem;
      color:#333;
      flex:1;
      &::-webkit-input-placeholder{
        color:#b0b0b0;
      }
    }
    .receive-form-btn{
      font-size: .34rem;
      color:#d20505;
      width: 1.7rem;
      height: .46rem;
      background: #eee;
      border-left: .01rem solid #dddad6;
      &:disabled{
        color:#b0b0b0;
      }
    }
  }
  .receive-form-submit{
    margin-top: .32rem;
  }
</style>
