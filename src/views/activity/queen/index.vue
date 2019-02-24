<template>
  <div class="pageView">
    <AppHeader :title="title"></AppHeader>
    <div class="scroll-view-wrapper" :class="{'visibility': pageView,'scroll_view_hidden': isPopup}">
      <div class="koi__banner">
        <img class="koi__banner--pic" src="./images/koi_bg.jpg"/>
        <h4 class="koi__banner--tit font-xb">女王节锦鲤券获取攻略</h4>
        <p class="koi__banner--txt">种子券收集时间: 2月25日-3月17日</p>
        <div class="koi__banner--rule" @click="routerAction(shareStrategyUrl)">
          <i>!</i>
          <span class="font">10秒玩转锦鲤券</span>
        </div>
      </div>
      <div class="koi-nav">
        <div class="koi-nav__item">
          <p>种子券收集</p>
          <span>2月25日-3月17日</span>
          <i class="koi-nav__item--circle"></i>
        </div>
        <div class="koi-nav__item">
          <p>翻倍锦鲤券使用</p>
          <span>3月5日-3月17日</span>
          <i class="koi-nav__item--circle"></i>
        </div>
        <div class="koi-nav__line"></div>
      </div>
      <div class="koi-des">
        <div class="koi-des__title">
          <span>锦</span>
          <span>鲤</span>
          <span>大</span>
          <span>礼</span>
          <span>包</span>
        </div>
      </div>
      <div class="queen-slider">
        <Banner :bannerList="bannerList"></Banner>
      </div>  
      <div class="quuen-banner-line">
      </div>  
      <div class="koi-strategy">
        <div class="koi-strategy__tit">
          <span>种</span>
          <span>子</span>
          <span>券</span>
          <span>收</span>
          <span>集</span>
          <span>攻</span>
          <span>略</span>
        </div>
        <div class="koi-strategy__list">
          <div class="koi-strategy__item">
            <strong class="koi-strategy__tag">攻略1</strong>
            <div class="koi-strategy__discount">
              <h5><i>¥</i>20<span>种子券</span></h5>
              <p>首次分享可获20张¥1种子券</p>
            </div>
            <div class="koi-strategy__action">
              <span class="font-b" v-if="firstStrategyButtonStatus == 0" @click="shareAction">去分享</span>
              <span class="font-b" v-else-if="firstStrategyButtonStatus == 1" @click="shareAction">已分享</span>
              <span class="disabled font-b" v-else-if="firstStrategyButtonStatus == 2" @click="shareAction">分享</span>
            </div>
          </div>
          <div class="koi-strategy__item">
            <strong class="koi-strategy__tag">攻略2</strong>
            <div class="koi-strategy__discount">
              <h5><i>¥</i>1<span>种子券</span></h5>
              <p>签到返¥1种子券 每日限一次</p>
            </div>
            <div class="koi-strategy__action">
              <span class="font-b" v-if="secondStrategyButtonStatus == 0" @click="pageAction(signUrl)">去签到</span>
              <span class="disabled font-b" v-else-if="secondStrategyButtonStatus == 1">今日已签到</span>
            </div>
          </div>
          <div class="koi-strategy__item">
            <strong class="koi-strategy__tag">攻略3</strong>
            <div class="koi-strategy__discount">
              <h5><i>¥</i>3<span>种子券</span></h5>
              <p>3积分兑¥3种子券 每日限一次</p>
            </div>
            <div class="koi-strategy__des">
              <p>今日剩余 {{thirdStrategyRemainCount}} 张</p>
              <p>已有积分 {{points}}</p>
            </div>  
            <div class="koi-strategy__action noPadding">
              <span class="font-xb" v-if="thirdStrategyButtonStatus == 0" @click="submitCouponExchange">去兑换</span>
              <span class="disabled font-xb" v-else-if="thirdStrategyButtonStatus == 1">去兑换</span>
              <span class="disabled font-xb" v-else-if="thirdStrategyButtonStatus == 2">今日已兑换</span>
            </div>
          </div>
          <div class="koi-strategy__item">
            <strong class="koi-strategy__tag">攻略4</strong>
            <div class="koi-strategy__discount">
              <h5><i>¥</i>10<span>种子券</span></h5>
              <p>下单支付成功即返¥10种子券</p>
            </div>
            <div class="koi-strategy__des">
              <p>团购 ,外卖订单除外</p>
            </div> 
            <div class="koi-strategy__action noPadding">
              <span class="font-b"  @click="routerAction(forthStrategyUrl)">去购物</span>
            </div>
          </div>
        </div>
      </div>
      <div class="koi-seed_action_bg" :class="{'active': mergeButtonStatus == 0}">
        <div class="koi-seed__action">
          <span v-if="mergeButtonStatus == 0" @click="pageAction('/activity/queen/merge')">立即合成</span>
          <span v-else>3月5日 10:00 开始合成，敬请期待……</span>
        </div>
      </div> 
      <div class="koi-seed">
        <div class="koi-seed__title">
          <span>我</span>
          <span>的</span>
          <span>种</span>
          <span>子</span>
          <span>券</span>
        </div>
        <div class="koi-seed__pic">
          <div class="koi-seed__item" v-for="(item,index) in couponList">
            <img :src="couponPic[index]"/>
            <span>{{item}}</span>
          </div>
        </div>
        <div class="koi-seed__des">
          <span>目前拥有种子券 {{couponNum}} 张</span>
          <strong>共计 {{couponSum}} 元</strong>
        </div>
      </div>
      <UIShare></UIShare>
    </div>
    <KoiPopup :isPopup="isPopup" @togglePopup="togglePopup"></KoiPopup>
  </div>
</template>

<script type="text/javascript">

  import AppHeader from '@/components/common/header'
  import KoiPopup from '@/components/koi/popup'
  import app from '@/widget/app'
  import utils from '@/widget/utils'
  import * as Model from '@/model/koi'
  import config from '@/config/index'
  import UIShare from '@/components/widget/ui-share'
  import Banner from '@/components/queen/banner'
  import {mapActions} from 'vuex'

  export default {
    data () {
      return {
        title: '翻倍锦鲤券',
        pageView: true,
        couponPic: [
          config.staticPath + '/activity-static/images/koi_discount_amount_01.png',
          config.staticPath + '/activity-static/images/koi_discount_amount_02.png',
          config.staticPath + '/activity-static/images/koi_discount_amount_03.png',
          config.staticPath + '/activity-static/images/koi_discount_amount_04.png',
        ],
        bannerList: [],
        isPopup: false,
        couponSum: 0,                      //累计无门槛优惠券总额
        couponNum: 0,                      //累计无门槛优惠券数量
        firstStrategyButtonStatus: 0,      //攻略1按钮状态   0 可点击  1 灰显 (今日已分享)
        secondStrategyButtonStatus: 0,      //攻略2按钮状态    0 可点击  1 灰显 (今日已签到)
        thirdStrategyButtonStatus: 0,       //攻略3按钮状态    0 可点击  1 灰显 (积分兑换)
        mergeButtonStatus: 1,               //合成龙珠券按钮状态 0 可点击  1 灰显
        forthStrategyUrl: '',               //攻略4跳转营销页链接
        thirdStrategyRemainCount: 0,       //攻略3剩余优惠券数量
        couponList: [0,0,0,0],
        points: 0,
        shareStrategyUrl: '',             //分享规则链接
        couponTimer: null,
        signUrl: ''
      }
    },
    components: {
      AppHeader,
      KoiPopup,
      Banner,
      UIShare
    },
    methods: {
      ...mapActions([
        'updateShareMenu'
      ]),
      /**
       * @param {Boolean} val
       */
      togglePopup (val) {
        this.isPopup = val
        utils.appViewFixed()
      },
      /**
       * page location
       * @param {String} url
       */
      pageAction (url) {
        app.loggedInAction(url)
      },
      /**
       * @param {String} url
       */
      routerAction (url) {
        if (url) {
          location.href = url
        }
      },
      /**
       * share operation
       */
      shareAction () {
        if (!(utils.isApp() || utils.weixin())) {
          this.$toast('请在APP或微信中打开分享')
          return
        }
        const shareConfig = {
          link: this.shareStrategyUrl,
          title: '这可能是你离锦鲤最近的一次',
          description: '小种子换大能量，超值免单券等你来抢。',
          imgUrl: config.staticPath + '/activity-static/images/koi_share_icon.png',
          platforms: [
           "WechatMoments",
           "Wechat",
           "QQ",
           "QZone"
          ]
        }
        if (utils.loggedIn()) {
          app.shareAction.call(this, shareConfig, () => {
            Model.submitCouponExchange({
              type: 'POST',
              data: {
                type: 1    //0 首次访问页面  1 分享  3 积分
              }
            }).then((result) => {
              if (result.code == 0) {
                if (utils.ios()) {
                  this.$toast(result.message)
                }
                this.getKoiInfo()
                this.getCouponList()
              } else if (result.code == -1) {
                this.$toast(result.message)
              }
            })
          })
        } else {
					app.loginAction()
        }
      },
      /**
       * 获取鲤券活动状态
       */
      getKoiStatus () {
        Model.getKoiStatus({
          type: 'GET',
          ignoreLogin: true
        }).then((result) => {
          const data = result.data
          if (data && data.activityStatus == 3) {
            this.$router.replace('/activity/queen/end')
          }
        })
      },
      /**
       * exchange coupon
       * 
       */
      submitCouponExchange () {
        if (utils.loggedIn()) {
          this.$showPageLoading()
          Model.submitCouponExchange({
            type: 'POST',
            data: {
              type: 3    //0 首次访问页面  1 分享  3 积分
            }
          }).then((result) => {
            const data = result.data
            this.$hidePageLoading()
            if (result.code == 0) {
              this.$toast(result.message)
              const {
                points,
                thirdStrategyButtonStatus,
                thirdStrategyRemainCount
              } = data
              this.points = points
              this.thirdStrategyButtonStatus = thirdStrategyButtonStatus
              this.thirdStrategyRemainCount = thirdStrategyRemainCount
              this.getCouponList()
            } else if (result.code == -1) {
              this.$toast(result.message)
              this.getKoiInfo()
              this.getCouponList()
            } else if (result.code == -5) {
              this.$toast(result.message)
              this.getKoiInfo()
              this.getCouponList()
            }
          })
        } else {
          app.loginAction()
        }
      },
      /**
       * get coupon info
       */
      getCouponExchange () {
        Model.getCouponExchange({
          type: 'GET',
          ignoreLogin: true,
          data: {
            type: 0  //0 首次访问页面  1 分享  3 积分
          }
        }).then((result) => {
          const code = result.code
          if (code == 0) {
            this.isPopup = true
            utils.appViewFixed()
            this.getCouponList()
          } else if (code == -1) {
            this.$toast(result.message)
          }
        })
      },
      /**
       * get koi info status and data
       */
      getKoiInfo () {
        Model.getKoiInfo({
          type: 'GET',
          ignoreLogin: true
        }).then((result) => {
          const data = result.data
          const code = result.code
          if (code == 99) {
            this.isPopup = true
            utils.appViewFixed()
          }
          if ((code == 0 || code == 99) && data) {
            const {
              firstStrategyButtonStatus,
              secondStrategyButtonStatus,
              thirdStrategyButtonStatus,
              mergeButtonStatus,
              forthStrategyUrl,
              thirdStrategyRemainCount,
              shareStrategyUrl,
              points,
              signUrl
            } = data
            this.firstStrategyButtonStatus = firstStrategyButtonStatus
            this.secondStrategyButtonStatus = secondStrategyButtonStatus
            this.thirdStrategyButtonStatus = thirdStrategyButtonStatus
            this.mergeButtonStatus = mergeButtonStatus
            this.forthStrategyUrl = forthStrategyUrl
            this.thirdStrategyRemainCount = thirdStrategyRemainCount
            this.points = points
            this.shareStrategyUrl = shareStrategyUrl
            this.signUrl = signUrl
          }
          return result
        }).then((info) => {
          if (info.code == 0) {
            this.getCouponExchange()
          }
        })
      },
      /**
       * get couponList
       */
      getCouponList () {
        Model.getCouponList({
          type: 'GET'
        }).then((result) => {
          const data = result.data

          if (result.code == 0 && data) {
            const {
              couponList,
              couponNum,
              couponSum
            } = data
            this.couponNum = couponNum
            this.couponSum = couponSum
            if (couponList && couponList.length) {
              this.couponList = couponList
            }
          }
        })
      }
    },
    created () {
      this.getKoiStatus()
      this.getKoiInfo()
      this.getCouponList()
      setTimeout(() => {
        this.bannerList = [{
          imageUrl: require('./images/slider_queen_01.png')
        },{
          imageUrl: require('./images/slider_queen_02.png')
        },{
          imageUrl: require('./images/slider_queen_03.png')
        }]
      }, 100)
      const query = utils.query()
      const {
        refresh,
        time
      } = query
      if (refresh == 1 && time > 0) {
        this.couponTimer = setTimeout(() => {
          this.getCouponList()
        }, time)
      }
    },
    beforeDestroy () {
      const couponTimer = this.couponTimer
      if (couponTimer) {
        clearTimeout(couponTimer)
      }
    }
  }
</script>

<style lang="scss">
  .queen-slider{
    background: linear-gradient(to bottom, #bd0004,#d24133);
  }
  .quuen-banner-line{
    height: .07rem;
    background: #f26b5c;
  }
  .koi-strategy__des{
    background:#fcc67b;
    height: .8rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    p{
      color: #ae2418;
      font-size: .26rem;
    }
  }
  .koi-seed_action_bg{
    margin: .35rem .2rem 0;
    padding: .05rem;
    background: linear-gradient(to bottom,rgba(241,174,93,.61),rgba(245,199,134,.61));
    border-radius: .35rem;
    &.active{
      background: linear-gradient(to bottom,#F1AE5D,#F5C786);
      .koi-seed__action{
        span{
          color: #a30001;
        }
      }
    }
  }
  .koi-seed__action{
    display: flex;
    justify-content: center;
    border-radius: .3rem;
    border: .01rem solid #fbdaad;
    span{
      width: 100%;
      height: .65rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: .34rem;
      color: rgba(250,245,245,.58);
    }
  }
  .koi-seed__des{
    margin-top: .36rem;
    width: 100%;
    height: .58rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: .02rem solid #e0936c;
    border-radius: .1rem;
    position: relative;
    background: #960508;
    padding: 0 .14rem;
    color: #fbfaf9;
    &:before,&:after{
      bottom: 100%;
      left: 50%;
      border: solid transparent;
      content: " ";
      height: 0;
      width: 0;
      position: absolute;
    }
    &:after{
      border-color: rgba(150, 5, 8, 0);
      border-bottom-color: #960508;
      border-width: .2rem;
      margin-left: -.2rem;
      bottom: 99%;
    }
    &:before{
      border-color: rgba(224, 147, 108, 0);
      border-bottom-color: #e0936c;
      border-width: .22rem;
      margin-left: -.22rem;
    }
  }
  .koi-seed{
    margin: .65rem .2rem .6rem;
    padding: .72rem .26rem .26rem;
    background: #960508;
    border: .06rem solid #850002;
    border-radius: .1rem;
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    &__pic{
      width: 6.8rem;
      width: 90vw;
      display: flex;
      justify-content: space-around;
    }
    &__item{
      position: relative;
      img{
        width: 1.42rem;
        height: 1.42rem;
      }
      span{
        display: block;
        width: .4rem;
        height: .4rem;
        background: #ffd6a4;
        border-radius: 50%;
        position: absolute;
        transform: translate(35%,-40%);
        right: 0;
        top: 0;
        font-size: .25rem;
        color: #804922;
        text-align: center;
        line-height: .4rem;
      }
    }
    &__title{
      display: flex;
      justify-content: center;
      position: absolute;
      left: 50%;
      top: 0;
      transform: translate(-50%,-50%);
      span{
        width: .64rem;
        height: .64rem;
        font-size: .38rem;
        color: #b90a04;
        border-radius: 50%;
        box-shadow: .03rem .03rem .1rem .01rem rgb(96,30,23);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: .05rem;
        background:linear-gradient(to left,#FFAB7C,#FED99F);
      }
    }
  }
  .koi-strategy__discount{
    padding: 0 .1rem;
    background: #f11425;
    position: relative;
    h5{
      font-size: .78rem;
      color: #f3edbf;
      border-bottom: .02rem dashed #f3edbf;
      text-align: center;
      i{
        font-size: .34rem;
        padding-right: .08rem;
      }
      span{
        font-size: .3rem;
        padding-left: .08rem;
      }
    }
    p{
      text-align: center;
      color: #f3edbf;
      line-height: .48rem;
    }
  }
  .koi-strategy{
    margin: .68rem .2rem 0;
    padding: .54rem .12rem .18rem;
    border-radius: .2rem;
    border: .02rem solid #e5764a;
    position: relative;
    &__tag{
      position: absolute;
      left: .09rem;
      top: .06rem;
      transform: scale(.5);
      transform-origin: 0 0;
      font-size: .3rem;
      color: #faf0d2;
      width: 1rem;
      height: .44rem;
      background: #9e0307;
      border-radius: .2rem;
      z-index:10;
      text-align: center;
    }
    &__action{
      padding: .1rem .38rem;
      background: #fcc67b;
      text-align: center;
      &.noPadding{
        padding-top: 0;
      }
      span{
        display: block;
        width: 2.42rem;
        height: .62rem;
        line-height: .62rem;
        color: #fff;
        background: #c40000;
        border-radius: .3rem;
        &.disabled{
          background: #dd8862;
          &:after{
            display: none;
          }
        }
        &:after{
          content: '';
          display: inline-block;
          margin-left: .03rem;
          position: relative;
          top: .02rem;
          width: .15rem;
          height: .23rem;
          background: url(./images/queen_sprite.png) no-repeat -1.75rem -.08rem;
          background-size: 1.94rem auto;
        }
      }
    }
    &__list{
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }
    &__item{
      width: 49.5%;
      position: relative;
      border-radius: .1rem;
      overflow: hidden;
      margin-bottom: .12rem;
    }
    &__tit{
      display: flex;
      justify-content: center;
      position: absolute;
      left: 50%;
      top: 0;
      transform: translate(-50%,-50%);
      span{
        width: .64rem;
        height: .64rem;
        font-size: .38rem;
        color: #b90a04;
        border-radius: 50%;
        box-shadow: .03rem .03rem .1rem .01rem rgb(96,30,23);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: .05rem;
        background:linear-gradient(to left,#FFAB7C,#FED99F);
      }
    }

  }
  .koi-discount__price--des{
    padding-left: .08rem;
    border-left: 2px dashed #bd0004;
    position: relative;
    display: flex;
    height: .6rem;
    margin-left: -.02rem;
    padding-right: .08rem;
    span{
      color: #bd0004;
      display: block;
      width: 1.5rem;
      font-size: .26rem;
      margin-top: -.06rem;
    }
    p{
      width: 3.3rem;
      height: .6rem;
      background: linear-gradient(to top, #BA0000,#D50000);
      border-radius: .6rem;
      text-align: center;
      line-height: .6rem;
      font-size: .3rem;
      transform: scale(.5);
      color: #fff;
      position: absolute;
      left:.05rem;
      top:.32rem;
      transform-origin: 0 0;
    }
  }
  .koi-des{
    padding-top: .38rem;
    position: relative;
    &__title{
      display: flex;
      justify-content: center;
      position: relative;
      &:before,&:after{
        display:block;
        content: '';
        width: 1.67rem;
        height: .17rem;
        background:url(./images/queen_sprite.png) no-repeat;
        background-size: 1.94rem auto;
        position: absolute;
        top: 50%;
      }
      &:before{
        left: 3%;
        background-position: -.03rem -.03rem;
        transform: translateY(-50%);
      }
      &:after{
        right: 3%;
        background-position: -.03rem -.23rem;
        transform: translateY(-50%);
      }
      span{
        width: .64rem;
        height: .64rem;
        font-size: .38rem;
        color: #b90a04;
        border-radius: 50%;
        box-shadow: .03rem .03rem .1rem .01rem rgb(96,30,23);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: .05rem;
        background:linear-gradient(to left,#FFAB7C,#FED99F);
        &:last-child{
          margin-right:0;
        }
      }
    }
  }
  .koi-nav{
    margin: 0 .2rem;
    display: flex;
    border-radius: .1rem;
    position: relative;
    background: url(./images/queen_nav_bg.png) no-repeat;
    background-size: 100% auto;
    border: .02rem solid rgba(249,201,125,.45);
    &__item{
      flex: 1;
      height: 1.27rem;
      padding: .18rem .2rem;
      color: #F3EDBF;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      position: relative;
      &--circle{
        width: .23rem;
        height: .23rem;
        background: #feb964;
        border-radius:50%;
        position: absolute;
        left: 50%;
        top:50%;
        transform: translate(-50%,-50%);
        z-index: 20;
      }
    }
    &__line{
      width: 86%;
      height: .04rem;
      position: absolute;
      background: #feb964;
      left: .55rem;
      top: 50%;
      transform: translateY(-.01rem);
      z-index: 10;
    }
  }
  .koi__banner{
    width: 100%;
    position: relative;
    &--pic{
      width: 100%;
      height: 6.4rem;
    }
    &--tit{
      width:3.82rem;
      height:.68rem;
      line-height: .68rem;
      background:linear-gradient(to left,rgba(237,17,0,1),rgba(239,3,7,1));
      box-shadow:0 .02rem .1rem .02rem rgba(96,30,23,0.26);
      border-radius:.3rem;
      color: #F3EDBF;
      text-align: center;
      position: absolute;
      left: 50%;
      top: .07rem;
      transform: translateX(-50%);
    }
    &--txt{
      position: absolute;
      left: 50%;
      top: 3.8rem;
      width: 4.4rem;
      transform: translateX(-50%);
      color: #EBB282;
      text-align: center;
    }
    &--rule{
      position: absolute;
      right: .58rem;
      top: .84rem;
      width: 2.6rem;
      height: .5rem;
      border-radius: .1rem;
      background: #ca221a;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: scaleIn 1s infinite;
      i{
        width: .26rem;
        height: .26rem;
        border-radius: 50%;
        background: #faf0d2;
        color: #ca231b;
        line-height: .26rem;
        text-align: center;
        margin-right: .06rem;
      }
      span{
        color: #faefd2;
      }
    }
  }
</style>
