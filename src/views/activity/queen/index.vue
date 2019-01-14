<template>
	<div class="pageView">
		<AppHeader :title="title"></AppHeader>
		<div class="scroll-view-wrapper" :class="{'visibility': pageView,'scroll_view_hidden': isPopup}">
			<div class="queen_index_header">
				<div class="queen__banner--rule" @click="ruleAction">
          <i>!</i>
          <span class="font">规则</span>
        </div>
				<div class="queen-nav">
					<div class="queen-nav__item">
          	<p>收集津贴</p>
          	<span>01.02 ~ 01.28</span>
          	<i class="queen-nav__item--circle"></i>
        	</div>
       	  <div class="queen-nav__item">
            <p>合成食运券</p>
            <span>01.18 ~ 01.28</span>
            <i class="queen-nav__item--circle"></i>
          </div>
          <div class="queen-nav__item">
            <p>使用食运券</p>
            <span>01.18 ~ 01.28</span>
            <i class="queen-nav__item--circle"></i>
          </div>
          <div class="queen-nav__line"></div>
			  </div>	
			</div>	
			<div class="queen_cont">
				<div class="queen_active_item">
					<div class="queen_item_pic">
						<img src="./images/queen_goods.png"/>
					</div>
					<div class="queen_item_txt">
						<div class="queen_item_info">
							<p>戴森吹风机</p>
							<strong>(食运券)</strong>
						</div>	
						<div class="queen_item_button">
							<p>津贴￥120以上可合成</p>
						</div>
						<div class="queen_item_number">
							<p>仅限1张，兑完即止</p>
						</div>				
					</div>
				</div>		
				<div class="queen-active-times">
					<p>1月20、21、22早上10点开始兑换</p>
				</div>
				<div class="queen_active_item">
					<div class="queen_item_coupon">
						<div class="queen_item_coupon_txt">
							<strong>￥</strong>
							<p>200</p>
						</div>	
						<span class="font">食运券</span>
					</div>
					<div class="queen_item_txt">
						<div class="queen_item_info">
							<p>满￥299立减</p>
						</div>	
						<div class="queen_item_button">
							<p>津贴￥100以上可合成</p>
						</div>
						<div class="queen_item_number">
							<p>每日限量，兑完即止</p>
						</div>				
					</div>
				</div>
				<div class="queen_coupon_list">
					<div class="queen_coupon_item">
						<div class="queen_coupon_item_txt">
							<div class="queen_coupon_item_amount">
								<strong>￥</strong>
								<p>100</p>
							</div>
							<div class="queen_coupon_item_name">
								<span>(食运券)</span>
								<p>满￥199立减</p>
								<span>每日限量，兑完即止</span>
							</div>		
						</div>
						<div class="queen_coupon_button">	
							<p>津贴￥50以上可合成</p>
						</div>	
					</div>	
					<div class="queen_coupon_item">
						<div class="queen_coupon_item_txt">
							<div class="queen_coupon_item_amount">
								<strong>￥</strong>
								<p>70</p>
							</div>
							<div class="queen_coupon_item_name">
								<span>(食运券)</span>
								<p>满￥199立减</p>
								<span>每日限量，兑完即止</span>
							</div>		
						</div>	
						<div class="queen_coupon_button">	
							<p>津贴￥35以上可合成</p>
						</div>	
					</div>
					<div class="queen_coupon_item">
						<div class="queen_coupon_item_txt">
							<div class="queen_coupon_item_amount">
								<strong>￥</strong>
								<p>50</p>
							</div>
							<div class="queen_coupon_item_name">
								<span>(食运券)</span>
								<p>满￥149立减</p>
								<span>每日限量，兑完即止</span>
							</div>		
						</div>
						<div class="queen_coupon_button">	
							<p>津贴￥25以上可合成</p>
						</div>		
					</div>
					<div class="queen_coupon_item">
						<div class="queen_coupon_item_txt">
							<div class="queen_coupon_item_amount">
								<strong>￥</strong>
								<p>30</p>
							</div>
							<div class="queen_coupon_item_name">
								<span>(食运券)</span>
								<p>满￥99立减</p>
								<span>每日限量，兑完即止</span>
							</div>		
						</div>
						<div class="queen_coupon_button">	
							<p>津贴￥15以上可合成</p>
						</div>	
					</div>
				</div>
				<div class="queen_news_txt1">
					<img src="./images/queen_news_txt_01.png"/>
				</div>
				<div class="queen_coupon_way">
					<div class="queen_coupon_way_item">
						<img src="./images/queen_coupon_pic_01.png"/>
						<div class="queen_coupon_way_info" @click="pageAction(signUrl)" :class="{'active': secondStrategyButtonStatus == 1}">
							<span v-if="secondStrategyButtonStatus == 0">去签到</span>
              <span v-else-if="secondStrategyButtonStatus == 1">今日已签到</span>
						</div>	
					</div>	
					<div class="queen_coupon_way_item">
						<img src="./images/queen_coupon_pic_02.png"/>
						<div class="queen_coupon_way_info" :class="{'active': firstStrategyButtonStatus == 1 || firstStrategyButtonStatus == 2}" @click="shareAction"> 
							<span v-if="firstStrategyButtonStatus == 0">去分享</span>
							<span v-else-if="firstStrategyButtonStatus == 1">已分享</span>
							<span v-else-if="firstStrategyButtonStatus == 2">分享</span>
						</div>	
					</div>	
					<div class="queen_coupon_way_item">
						<img src="./images/queen_coupon_pic_03.png"/>
						<div class="queen_coupon_way_info queen_coupon_way_info1" :class="{'active': thirdStrategyButtonStatus == 1 || thirdStrategyButtonStatus == 2}">
							<span v-if="thirdStrategyButtonStatus == 0" @click="submitCouponExchange">兑换</span>
            	<span v-else-if="thirdStrategyButtonStatus == 1">兑换</span>
            	<span v-else-if="thirdStrategyButtonStatus == 2">今日已兑换</span>
						</div>	
					</div>
					<div class="queen_coupon_way_item">
						<img src="./images/queen_coupon_pic_04.png"/>
						<div class="queen_coupon_way_info queen_coupon_way_info1" @click="routerAction(forthStrategyUrl)">
							<span>去购物</span>
						</div>	
					</div>
				</div>
				<div class="queen_news_txt2">
					<img src="./images/queen_news_txt_02.png"/>
				</div>
				<div class="queen_coupon_price">
					<img src="./images/queen_price_01.png"/>
					<img src="./images/queen_price_02.png"/>
					<img src="./images/queen_price_03.png"/>
				</div>
				<div class="queen-seed__des">
          <span class="font">我已拥有 ¥ {{couponSum}} 过年津贴</span>
        </div>
        <div class="queen_active_merge" @click="pageAction('/activity/queen/merge')" v-if="mergeButtonStatus == 0">
        	<span></span>
        </div>
        <div class="queen_active_merge_open" v-else>
        	<span></span>
        </div>	
        <div class="queen_intro" id="queen_rule">
        	<span class="queen_intro_bg"></span>
        	<div class="queen_intro_info">
        		<h4 class="font-b">活动说明</h4>
        		<div class="queen_intro_item">
        			<i class="queen_intro_circle">1</i>
        			<div class="queen_intro_txt">
        				<p>活动时间:2019年1月2日00:00 - 1月28日24:00</p>
        			</div>	
        		</div>	
        		<div class="queen_intro_item">
        			<i class="queen_intro_circle">2</i>
        			<div class="queen_intro_txt">
        				<p>活动进程:1月02日 - 1月28日收集过年津贴，
        				<p>1月18日10点 - 1月28日24点期间可以合成食运劵并使用</p>
        			</div>	
        		</div>
        		<div class="queen_intro_item">
        			<i class="queen_intro_circle">3</i>
        			<div class="queen_intro_txt">
        				<p>津贴收集方式</p>
        				<p>1、首次登录状态下浏览食运券活动页可获得 ¥ 30 津贴，满99可用，同一用户ID活动期间仅可获得1次;</p>
								<p>2、首次点击食运劵活动页面“去分享”按钮分享活动，可以获得 ¥ 20 个1元个津贴，并且同一用户ID活动期间仅限首次分享可获得;</p>
								<p>3、同一用户ID，每天签到1次，可获得¥1 津贴，仅限一次;</p>
								<p>4、同一用户ID，每天可使用3积分兑换¥3 津贴，同一用户每天上限兑换1次;</p>
								<p>5、活动期间，每支付完成1笔订单(外卖、团购订单除外)， 可以获得¥10元无门槛津贴，同一用户每天限3单</p>
								<p>6、活动期间津贴可作为优惠券正常下单使用， 津贴使用过后即不可再用于合成食运劵;</p>
								<p>7、所谓同一用户是指同一用户ID、同一手机号、 同一支付账号都视为同一用户;</p>
								<p></p>
        			</div>	
        		</div>
        		<div class="queen_intro_item">
        			<i class="queen_intro_circle">4</i>
        			<div class="queen_intro_txt">
        				<p>食运劵合成规则</p>
        				<p>1、戴森吹风机兑换券，津贴 ¥ 120 及以上可兑换，仅限1张， 限1月20、21、22日10点开始兑换，错过则无</p>
        				<p>2、满299-200元券，津贴 ¥ 100元及以上可兑换，每日限量，兑完即止</p>
        				<p>3、满199-100元券，津贴 ¥ 50元及以上可兑换，每日限量，兑完即止;</p>
        				<p>4、满199-70元券，津贴 ¥ 35元及以上可兑换，每日限量，兑完即止;</p>
        				<p>5、满149-50元券，津贴 ¥ 25元及以上可兑换，不限量;</p>
        				<p>6、满99-30元券，津贴 ¥ 15元及以上可兑换，不限量;</p>
        			</div>	
        		</div>	
        		<div class="queen_intro_item">
        			<i class="queen_intro_circle">5</i>
        			<div class="queen_intro_txt">
        				<p>合成某一食运券时，津贴金额合计不低于该食运券的最低金额要求， 高出部分不予退还;(例如:津贴累计¥55，兑换199-100元劵，兑换完成，5元不退回)</p>
        			</div>	
        		</div>
        		<div class="queen_intro_item">
        			<i class="queen_intro_circle">6</i>
        			<div class="queen_intro_txt">
        				<p>根据用户现有津贴种类和数量，以及限量食运券的存量情况为客户提供两种合成方案:</p>
        				<p>“面额最大抵更多”当前津贴总额可合成的最大面额食运劵，高出部分不 予退还。选择"精打细算不浪费”，充分利用津贴数量和种类精确合成， 不会超出食运劵的最低合成额度; (例如小余有1张¥30津贴，2张¥10津贴，17张¥3津贴，共计101元。如 选择“面额最大抵更多”，可合成299减200食运劵，多出的1元额度不退 回账户;如选择"精打细算不浪费”，可合成1张199减100食运劵和3张99减 30食运劵，剩余2张¥3津贴仍保留在个人账户等待下次合成;)</p>
        			</div>	
        		</div>
        		<div class="queen_intro_item">
        			<i class="queen_intro_circle">7</i>
        			<div class="queen_intro_txt">
        				<p>戴森吹风机实物兑换劵为满0.1减0优惠券， 获得兑换劵的用户等待客服联系，需用劵后才可兑换实物; 工作人员会在20个工作日内联系，食运券生鲜、酒饮类商品不可用， 具体使用规则，参见个人中心[我的钱包-优惠券];</p>
        			</div>	
        		</div>
        		<div class="queen_intro_item">
        			<i class="queen_intro_circle">8</i>
        			<div class="queen_intro_txt">
        				<p>每日限量的食运券，每天10点、19点更新，把握时间点，不要错过;</p>
        			</div>	
        		</div>
        		<div class="queen_intro_item">
        			<i class="queen_intro_circle">9</i>
        			<div class="queen_intro_txt">
        				<p>来伊份保留法律范围内允许的对活动的解释权。</p>
        			</div>	
        		</div>
        	</div>	
        </div>	
			</div>
			<div class="queen_bottom_bg"></div>	
		</div>	
		<QueenPopup :isPopup="isPopup" @togglePopup="togglePopup"></QueenPopup>
	</div>	
</template>	

<script type="text/javascript">

  import AppHeader from '@/components/common/header'
  import QueenPopup from '@/components/queen/popup'
  import app from '@/widget/app'
  import utils from '@/widget/utils'
  import * as Model from '@/model/queen'
  import config from '@/config/index'
  import UIShare from '@/components/widget/ui-share'
  import { mapActions } from 'vuex'

  export default {
    data () {
      return {
        title: '食运券',
        pageView: true,
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
      QueenPopup,
      UIShare
    },
    methods: {
      ...mapActions([
        'updateShareMenu'
      ]),
      ruleAction () {
      	const offsetTop = document.getElementById('queen_rule').getBoundingClientRect().top
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        const docRem = parseFloat(document.documentElement.style.fontSize)
        const headerHeight = (utils.isApp() || utils.weixin()) ? 0 : .88 * docRem
        document.documentElement.scrollTop = document.body.scrollTop = offsetTop + scrollTop - headerHeight - .8 * docRem
      },
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
          title: '食来运转巨福气',
          description: '来伊份匠心年货节，集津贴换食运券，让你猪年巨有福~',
          imgUrl: config.staticPath + '/activity-static/images/queen_share_icon.png',
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
                this.$toast(result.message)
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
	.queen_coupon_way{
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.queen_bottom_bg{
		margin-top: .4rem;
		width: 7.5rem;
		height: 1.72rem;
		background: url(./images/queen_bottom_bg.png) no-repeat;
		background-size: 100% auto;
	}
	.queen_intro_info{
		padding: .64rem .2rem 0;
		h4{
			text-align: center;
			color: #e7925a;
			font-weight: bold;
		}
	}
	.queen__banner--rule{
	  position: absolute;
    right: .2rem;
    top: .5rem;
    padding: 0 .2rem;
    height: .5rem;
    border-radius: .3rem;
    background: #ca221a;
    display: flex;
    align-items: center;
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
	.queen_intro_item{
		display: flex;
		margin-top: .4rem;
		.queen_intro_circle{
			width: .3rem;
			height: .3rem;
			border-radius: 50%;
			background: #f9c77b;
			line-height: .3rem;
			text-align: center;
			color: #b40000;
			margin-top: .1rem;
		}
	}
	.queen_intro_txt{
		display: flex;
		flex-direction: column;
		flex:1;
		p{
			padding-left: .12rem;
			font-size: .26rem;
			color: #f9c77b;
			line-height: .5rem;
		}
	}
	.queen_intro{
		border-radius: .2rem;
		border: .03rem solid #ffbb82;
		background: #b40000;
		margin-top: 1.15rem;
		position: relative;
		padding-bottom: .35rem;
		.queen_intro_bg{
			width: 5.28rem;
			height: .77rem;
			background: url(./images/queen_intro_bg.png) no-repeat;
			background-size: 100% auto;
			position: absolute;
			left: 50%;
			top: 0;
			transform: translate(-50%, -50%);
		}
	}
	.queen_active_merge{
		margin-top: .32rem;
		height: .53rem;
		display: flex;
		justify-content: center;
		span{
			width: 3.05rem;
			height: .53rem;
			background: url(./images/queen_merge_btn_bg.png) no-repeat;
			background-size: 100% auto;
		}
	}
	.queen_active_merge_open{
		margin-top: .32rem;
		height: .53rem;
		display: flex;
		justify-content: center;
		span{
			width: 4.39rem;
			height: .53rem;
			background: url(./images/queen_merge_btn_bg1.png) no-repeat;
			background-size: 100% auto;
		}
	}
	.queen_coupon_way_item{
		position: relative;
		margin-bottom: .48rem;
		img{
			width: 3.33rem;
			height: 1.71rem;
		}
	}
	.queen_news_txt2{
		display: flex;
		height: .62rem;
		justify-content: center;
		img{
			width: 3.21rem;
			height: .62rem;
		}
	}
	.queen_coupon_way_info{
		position: absolute;
		bottom: .26rem;
		right: .65rem;
		height: .3rem;
		border-radius: .2rem;
		background: #f9c578;
		padding: 0 .15rem;
		line-height: .3rem;
		&.active{
			background: #dd8862;
			span{
				color: #fff;
				&:after{
					border-left: .08rem solid #fff;
				}
			}
		}
		span{
			height: .3rem;
			color: #d00619;
			display: block;
			font-size: .22rem;
			&:after{
				content: '';
				display: inline-block;
				position: relative;
				top: -.02rem;
				width: 0;
    		height: 0;
    		margin-left: .05rem;
    		border-top: .06rem solid transparent;
    		border-left: .08rem solid #d00619;
    		border-bottom: .06rem solid transparent;
			}
		}
	}
	.queen_coupon_way_info1{
		span{
			color: #fdb767;
			&:after{
				border-left: .08rem solid #fdb767;
			}
		}
	}
	.queen_coupon_way_info1{
		background: #d00619;
	}
	.queen_news_txt1{
		padding-top: .13rem;
		padding-bottom: .3rem;
		width: 5.32rem;
		margin: 0 auto;
		img{
			width: 5.32rem;
			height: .66rem;
		}
	}
	.queen_coupon_button{
		display: flex;
		justify-content: center;
		padding-top: .1rem;
		p{
			width: 2.58rem;
			height: .52rem;
			color: #fff;
			background: url(./images/queen_coupon_button_bg.png) no-repeat;
			background-size: 2.58rem auto;
			text-align: center;
			line-height: .52rem;
		}
	}
	.queen_coupon_item_txt{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: #b40007;
		width: 3.18rem;
		height: 1.82rem;
		background: url(./images/queen_coupon_item_bg.png) no-repeat;
		background-size: 100% auto;
	}
	.queen_coupon_item_amount{
		display: flex;
		align-items: flex-end;
		margin-top: -.1rem;
		strong{
			font-size: .4rem;
			font-weight: bold;
		}
		p{
			font-size: .55rem;
			font-weight: bold;
		}
	}
	.queen_coupon_item_name{
		display: flex;
		flex-direction: column;
		position: relative;
		align-items: center;
		p{
			font-size: .34rem;
			font-weight: bold;
			margin-top: -.1rem;
		}
		span{
			font-weight: bold;
			margin-top: -.1rem;
		}
	}
	.queen_index_header{
		height: 14.18rem;
		background: url(./images/queen_bg.png) no-repeat;
		background-size: 100% auto;
		margin-bottom: .21rem;
		position: relative;
	}
	.queen_coupon_list{
		padding-top: .45rem;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.queen-nav{
		width: 6.78rem;
		height: 1.16rem;
		background: url(./images/queen_header_news.png) no-repeat;
		background-size: 100% auto;
		position: absolute;
		top: 11.14rem;
		left: 50%;
		margin-left: -3.39rem;
		display: flex;
		justify-content: space-between;
		&__item{
			flex:1;
      height: 100%;
      padding: .15rem 0;
      color: #ffbb7e;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      position: relative;
      &--circle{
        width: .2rem;
        height: .2rem;
        background: #ffed50;
        border-radius:50%;
        position: absolute;
        left: 50%;
        top:50%;
        transform: translate(-50%,-50%);
        z-index: 20;
      }
    }
    &__line{
      width: 92%;
      height: .03rem;
      position: absolute;
      background: #fbb930;
      left: 4%;
      top: 50%;
      transform: translateY(-.01rem);
      z-index: 10;
    }
	}
	.queen_cont{
		padding: 0 .16rem;
	}
	.queen_active_item{
		width: 7.18rem;
		height: 3.04rem;
		background: url(./images/queen_item_bg.png) no-repeat;
		background-size: 7.18rem auto;
		padding-top: .4rem;
		display: flex;
		position: relative;
		z-index: 10;
	}
	.queen_item_pic{
		padding-left: .52rem;
		padding-top: .16rem;
		width: 2.5rem;
		height: 2.34rem;
		background: url(./images/queen_item_line_bg.png) right top no-repeat;
		background-size: .02rem auto;
		img{
			width: 1.52rem;
			height: 2.05rem;
		}
	}
	.queen_item_coupon{
		padding-top: .16rem;
		width: 2.5rem;
		height: 2.34rem;
		background: url(./images/queen_item_line_bg.png) right top no-repeat;
		background-size: .02rem auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		span{
			color: #b40007;
			font-weight: bold;
			margin-top: -.1rem;
		}
	}
	.queen_item_txt{
		padding-top: .26rem;
		padding-left: .2rem;
	}
	.queen_item_info{
		color: #b40007;
		display: flex;
		align-items: flex-end;
		font-weight: bold;
		p{
			font-size: .6rem;
		}
		strong{
			padding-bottom: .1rem;
			padding-left: .1rem;
		}
	}
	.queen_item_button{
		margin-top: .05rem;
		width: 3.88rem;
		height: .8rem;
		background: url(./images/queen_button_bg.png) no-repeat;
		background-size: 3.88rem auto;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-left: .08rem;
		p{
			color: #fff;
			font-size: .32rem;
		}
	}
	.queen_item_number{
		margin-top: .05rem;
		display: flex;
		justify-content: center;
		p{
			color: #b40007;
		}
	}
	.queen-active-times{
		height: .6rem;
		display: flex;
    justify-content: center;
    position: relative;
    margin-top: -.25rem;
    margin-bottom: .1rem;
    p{
    	padding: .2rem .22rem 0;
    	height: 100%;
			border-radius: .3rem;
			border: .02rem solid #f9c77b;
			color: #f9c77b;
    }
	}
	.queen_item_coupon_txt{
		display: flex;
		color: #b40007;
		display: flex;
		align-items: flex-end;
		strong{
			font-weight: bold;
			font-size: .4rem;
		}
		p{
			font-size: .8rem;
			font-weight: bold;
		}
	}
	.queen_coupon_item{
		padding: .08rem .08rem .1rem;
		background: #d00619;
		margin-bottom: .48rem;
	}
	.queen_coupon_price{
		margin-top: .28rem;
		display: flex;
		justify-content: space-between;
		height: 2.12rem;
		img{
			width: 2.12rem;
			height: 2.12rem;
		}
	}
	 .queen-seed__des{
    margin-top: .6rem;
    width: 100%;
    display: flex;
    justify-content: center;
    position: relative;
    span{
    	color: #f8cb80;
    	border: .02rem solid #ecaa6c;
    	border-radius: .25rem;
    	padding: 0 .45rem;
    	height: .46rem;
    	line-height: .46rem;
    }
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
      border-bottom-color: #b61716;
      border-width: .2rem;
      margin-left: -.2rem;
      bottom: 95%;
    }
    &:before{
      border-bottom-color: #e0936c;
      border-width: .2rem;
      margin-left: -.2rem;
    }
  }
</style>