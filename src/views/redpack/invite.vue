<template>
  <div class="pageView">
    <AppHeader :title="title" :isBorder="isBorder" :backFn="backAction">
    </AppHeader>
    <div class="scroll-view-wrapper " :class="{'visibility': pageView}">
      <div class="redpack-bg" v-if="redpackImage" :style="{'backgroundImage': 'url('+redpackImage+')'}"></div>
      <div class="redpack-view">
        <div class="redpack-content">
          <div class="invite-title">
            <div class="invite-left-tit-bg">
            </div>
            <div class="invite-title-txt">
              <p>您有一个无门槛红包待拆</p>
            </div>
            <div class="invite-right-tit-bg">
            </div>
          </div>
          <div class="invite-help">
            <p>邀请2位好友帮忙拆5-15元随机红包</p>
          </div>
          <div class="redpack-share-btn invite-share-btn"
               v-clipboard:copy="shareConfig.url"
               v-clipboard:success="weixinShare"
               v-clipboard:error="onError">
            <span>立即分享</span>
          </div>
        </div>
        <RedPackRule></RedPackRule>
        <div class="redpack-view-bg1"></div>
        <div class="redpack-view-bg2">
          <span></span>
        </div>
      </div>
      <UIShare></UIShare>
    </div>
  </div>
</template>

<script type="text/javascript">

  import AppHeader from '@/components/common/header'
  import UIShare from '@/components/widget/ui-share'
  import RedPackRule from '@/components/redpack/rule'
  import utils from '@/widget/utils'
  import app from '@/widget/app'
  import config from '@/config/index'
  import * as Model from '@/model/redpack'
  import {mapGetters, mapActions} from 'vuex'
  import wx_share from './weixin_share'
  import Vue from 'vue'
  import VueClipboard from 'vue-clipboard2'
  Vue.use(VueClipboard)

  export default {
    data () {
      return {
        title: '拆红包',
        isBorder: true,
        redpackImage: config.staticPath + '/activity-static/images/redpack_invite_bg.jpg?v=' + config.getTime,
        couponMoney: "",
        redpackCode: '',
        shareConfig: {},
        pageView: false
      }
    },
    components: {
      AppHeader,
      UIShare,
      RedPackRule
    },
    computed: {
      ...mapGetters({
        'headerMenu': 'getHeaderMenu'
      })
    },
    created () {
      this.$showLoading()
      this.getRedPackInfo()
    },
    methods: {
      ...mapActions([
        'updateShareMenu'
      ]),
      getRedPackInfo () {
        const { redpackCode } = this.$route.query
        if (redpackCode) {
          this.redpackCode = redpackCode
          this.shareConfig = wx_share.shareConfig.call(this)
          this.getRedPackDetail()
        } else {
          this.$hideLoading()
          this.shareConfig = wx_share.shareConfig.call(this)
          this.pageView = true
        }
      },
      getRedPackCode () {
        const { orderCode } = this.$route.query
        return Model.getRedPackCode({
          type: 'POST',
          data: {
            orderCode
          }
        }).then((result) => {
          const data = result.data

          if (result.code == 0) {
            this.redpackCode = data.shareCode
            this.shareConfig = wx_share.shareConfig.call(this)
            return data
          } else {
            this.$toast(result.message)
          }

        })
      },
      getRedPackDetail () {

        Model.getRedPackDetail({
          type: 'POST',
          data: {
            shareCode: this.redpackCode
          }
        }).then((result) => {

          const data = result.data
          this.$hideLoading()
          if (result.code == 0 && data) {
            const {
              activityStatus,
              role
            } = data

            const searchPrams = location.search
            if (role == 2) {
              this.pageAction('/activity/redpack/receive' + searchPrams)

            } else if (activityStatus == 0) {  //进行中
							this.pageAction('/activity/redpack/start'+ searchPrams)
            } else if (activityStatus == 1) {
              this.pageAction('/activity/redpack/invalid' + searchPrams)
            } else if (activityStatus == 2) {
              this.pageAction('/activity/redpack/finished' + searchPrams)
            } else if (activityStatus == 3) {
              this.pageAction('/activity/redpack/success' + searchPrams)
            } else if (activityStatus == 4) {
              this.pageAction('/activity/redpack/stop' + searchPrams)
            } else if (activityStatus == 5) {
              this.pageAction('/activity/redpack/invalid' + searchPrams)
            }

            this.pageView = true

          } else {
            this.$toast(result.message)
          }
        })
      },
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
      pageAction (url) {
        this.$router.replace(url)
      },
      onError () {
        this.$toast('链接复制失败')
      },
      copyShare () {
        if (!utils.weixin() && !utils.isApp()) {
          this.$toast('链接已复制到粘贴板')
        }
      },
      weixinShare () {
        const {redpackCode, orderCode} = this.$route.query
        if (redpackCode) {
          wx_share.weixinShare.call(this)
          this.copyShare()
        } else {
          if (!orderCode) {
            this.$toast('获取分享失败订单号缺失')
            return
          }
          this.getRedPackCode().then((data) => {
            if (data) {
              wx_share.weixinShare.call(this)
              this.copyShare()
            }
          })
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
      font-size: .4rem;
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
