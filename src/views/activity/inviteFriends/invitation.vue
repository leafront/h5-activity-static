<template>
  <div class="pageView">
    <AppHeader :title="title">
    </AppHeader>
    <div class="scroll-view-wrapper" :class="{'visibility': pageView}">
      <div class="invitation_c">
        <div class="head_img">
          <img src="./images/1.png" alt="">
        </div>
        <!-- 活动规则 -->
        <div class="activity_rule" @click="toggleRuleText(true)">
          <button>活动规则></button>
        </div>

        <div class="section_f">
          <div class="f_h">
            <img src="./images/2.png" alt="">
            <p class="header_t">邀请赢豪礼</p>

          </div>
          <div class="f_b">
            <p class="b_text1 "></p>
            <ProgressBar :dynamicProgress="dynamicProgress" :dynamicReward="dynamicReward" ></ProgressBar>
            <p class="b_text2" v-show = "completionThree">再邀请 {{invationToC}} 人，可额外获得 {{dynamicReward.ladderThreeRewardAmount}}元优惠券</p>
            <p class="b_text2" v-show = "completion">恭喜完成！继续邀请冲击榜单赢取大礼~</p>
            <p class="b_text2" v-show = "completionTwo">再邀请 {{invationToSecond}} 人，可额外获得 {{dynamicReward.ladderTwoRewardAmount}}元优惠券</p>
            <p class="b_text2" v-show = "completionOne">再邀请 {{invationToFirst}} 人，可额外获得 {{dynamicReward.ladderOneRewardAmount}}元优惠券</p>
            <p class="b_text2" v-show = "completionZero">您还没有邀请好友，快去邀请好友吧~</p>

            <p class="b_text3 first_t" @click="weixinShare" >立即邀请</p>
            <p style="display: flex; padding-left: .4rem; padding-right: .4rem;">
              <span style="padding-left: .6rem; padding-right: .6rem; font-size: .32rem; font-weight:400;" @click="ajaxShareCode(1)" class="b_text4 first_t">专属海报</span>
              <span style="padding-left: .6rem; padding-right: .6rem; font-size: .32rem; font-weight:400;" @click="ajaxShareCode2(1)" class="b_text4 first_t">面对面扫码</span>
            </p>
          </div>
        </div>
        <!-- 第二部分 -->
        <div class="section_f">
          <div class="f_h">
            <img src="./images/2.png" alt="">
            <p class="header_t">当月战绩</p>
          </div>
          <div class="f_b f_ele">
            <div class="l_cont">
              <p class="text_p color_p">{{tatalMon}}元</p>
              <p class="text_p">优惠券收益</p>
            </div>
            <div class="l_cont r_cont">
              <p class="  text_p color_p">{{personNu}}人</p>
              <p class="text_p">成功邀请</p>
            </div>
          </div>
        </div>

        <!-- 第三部分 -->
        <div class="section_f">
          <div class="f_h">
            <img src="./images/2.png" alt="">
            <p class="header_t">当月邀请TOP榜</p>
          </div>

          <div class="f_b third_b">
            <div class="f_b_img" @click = "toggleImgLayer(true)">
              <img src="./images/3.png" alt="">
            </div>
            <div class="winner_title">
              <div class="l_title">
                用户账号
              </div>
              <div class="l_title r_title">
                活动月邀请
              </div>

            </div>
            <div class="winner_c" v-for = "(item, index) in rankThird">
              <div class="wc_l">
                <div class="l_wc_img">
                  <img :src= "thirdImgSrc[index]" alt="">
                </div>
                <div class="winner_ih">
                  {{item.username}}
                </div>
              </div>

              <div class="join_nu">
                {{item.invitationNum}}人
              </div>
            </div>

            <!-- <div class="winner_c">
              <div class="wc_l">
                <div class="l_wc_img">
                  <img src="./images/5.png" alt="">
                </div>
                <div class="winner_ih">
                  1111111111111
                </div>
              </div>

              <div class="join_nu">
                188人
              </div>
            </div> -->

            <!-- 数字 -->
            <div class="winner_c" v-for = "(item, index) in rankOther">
              <div class="wc_l">
                <div class="l_wc_num">
                  {{index + 4}}
                </div>
                <div class="winner_ih">
                  {{item.username}}
                </div>
              </div>

              <div class="join_nu">
                {{item.invitationNum}}人
              </div>
            </div>

            <!-- <div class="winner_c">
              <div class="wc_l">
                <div class="l_wc_num">
                 2
                </div>
                <div class="winner_ih">
                  1111111111111
                </div>
              </div>

              <div class="join_nu">
                188人
              </div>
            </div> -->

          </div>

        </div>
        <div class="bottom_li">
          — Hi ! 你碰到我的底线了 —

        </div>

      </div>
      <ShareImg :rulePopup="rulePopup"  :invitationShareC = "invitationShareC" @toggleRulePopup="toggleRulePopup" :adWinImg="adWinImg" ></ShareImg>
      <face-code :rulePopup2="rulePopup2"  :invitationShareC2 = "invitationShareC2" @toggleRulePopup2="toggleRulePopup2"></face-code>
      <UIShare></UIShare>
      <Rule :ruleText="ruleText"  @toggleRuleText="toggleRuleText"></Rule>
      <Imglayer :imgLayer="imgLayer" @toggleImgLayer="toggleImgLayer"></Imglayer>
    </div>
  </div>
</template>

<script type="text/javascript">
  import AppHeader from '@/components/common/header'

  import ProgressBar from '@/components/invitation/progress'

  import ShareImg from '@/components/invitation/shareImg'

  import faceCode from '@/components/invitation/faceCode'

  import Rule from '@/components/invitation/rule'

  import Imglayer from '@/components/invitation/imglayer'

  import * as Model from '@/model/invitation'

  import utils from '@/widget/utils'

  import config from '@/config/index'

  import wx_share from './weixin_share'

  import {mapGetters, mapActions} from 'vuex'

  import common from '@/widget/common'

  import UIShare from '@/components/widget/ui-share'

  let img1 = config.staticPath + '/activity-static/images/invitationimg1.png'
  let img2 = config.staticPath + '/activity-static/images/invitationimg2.png'
  let img3 = config.staticPath + '/activity-static/images/invitationimg3.png'
  export default {
    data() {
      return {
        title: "邀请好友",
        imgLayer:false,
        ruleText: false,
        rulePopup: false,
        rulePopup2: false,
        dynamicProgress: {},
        dynamicReward: {},
        registerRewardAmount: null,
        pageView: true,
        thirdImgSrc:[img1,img2,img3],
        rankThird:[],
        rankOther:[],

        personNu:null,
        tatalMon:null,
        completion:false,
        invationToC:null,
        completionThree:false,
        completionTwo:false,
        completionOne:false,
        completionZero:false,
        invationToSecond:null,
        invationToFirst:null,
        invitationShareC:"",//获取sharecode
        invitationShareC2:"",//获取sharecode
        shareConfig: {},
        adWinImg: '',// ad广告位配置的图片背景

      }
    },
    components: {
      AppHeader,
      ProgressBar,
      ShareImg,
      faceCode,
      UIShare,
      Rule,
      Imglayer
    },
    computed: {
      ...mapGetters({
        'headerMenu': 'getHeaderMenu'
      })
    },
    mounted () {
      this.getAdImg();
    },
    methods: {
      ...mapActions([
        'updateHeaderMenu',
        'updateShareMenu'
      ]),

      /*
      *获取广告位
      */

      getAdImg () {
        return Model.getAdImg({
          type: 'GET',
          data: {
            pageCode: 'H5_INVITE_FRIEND_PAGE',
            adCode: 'own_poster',
          }
        }).then((result) => {
          const data = result.data
          if (result.code == 0 && data) {
            this.adWinImg = result.data.own_poster[0].imageUrl.replace(/^https/,"http");
            console.log('result.code', result.data.own_poster[0].imageUrl);
          } else {
            this.$toast(result.message)
          }
          return result
        })
      },
      /**
       * 获取个人获得的奖品列表
       */
      /**
       * 奖品弹层
       */
      toggleImgLayer(val){
        this.imgLayer = val
        utils.appViewFixed()
      },

      /**
       * 活动规则
       */
      toggleRuleText(val){
        this.ruleText = val
        utils.appViewFixed()
      },

      /**
       * 切换规则弹层信息
       * params {Boolean} val
       */
      toggleRulePopup (val) {
        this.rulePopup = val

      },
      toggleRulePopup2 (val) {
        this.rulePopup2 = val

      },
      ajaxShareCode(type){
        console.log('this.adWinImg', this.adWinImg);

        if (type == 1 && this.invitationShareC) {
          if (!this.adWinImg) {
            this.$toast("网络繁忙，请稍后再试!");
            return;
          }
              this.rulePopup = true
              return;


        }
        Model.getShareCode({
          type: 'GET'
        }).then((result) => {
          const data = result.data
          if (result.code == 0 ) {
            this.invitationShareC = data.shareCode

            if (type == 1 && this.invitationShareC){
              this.rulePopup = true

            } else if (type == 2 && this.invitationShareC) {
              this.shareConfig = wx_share.shareConfig.call(this)
              wx_share.weixinShare.call(this)

            } else if (type == 1 || type == 2) {
              this.$toast("网络繁忙，请稍后再试!")
            }
          }
        })
      },
      ajaxShareCode2(type){
        if (type == 1 && this.invitationShareC2) {
          this.rulePopup2 = true
          return;
        }
        Model.getShareCode({
          type: 'GET'
        }).then((result) => {
          const data = result.data
          if (result.code == 0 ) {
            this.invitationShareC2 = data.shareCode

            if (type == 1 && this.invitationShareC2){
              this.rulePopup2 = true

            } else if (type == 2 && this.invitationShareC2) {
              this.shareConfig = wx_share.shareConfig.call(this)
              wx_share.weixinShare.call(this)

            } else if (type == 1 || type == 2) {
              this.$toast("网络繁忙，请稍后再试!")
            }
          }
        })
      },
      /*
      *分享
      */
      weixinShare () {
        if(this.invitationShareC){

          this.shareConfig = wx_share.shareConfig.call(this)
          wx_share.weixinShare.call(this)
        }else {

          this.ajaxShareCode(2)
        }


      },

      /*
      *好友页面请求
      */
      ajaxRecommend(){
        Model.recommendUser({
          type: 'POST'
        }).then((result) => {
          const data = result.data
          if (result.code == 0 ) {
            const {
              ladderOneNum,
              ladderTwoNum,
              ladderThreeNum,
              myInvitationNum
            } = data
            this.dynamicProgress = {
              firstNumber: ladderOneNum,
              secondNumber: ladderTwoNum,
              totaNumber: ladderThreeNum,
              activityNumber: myInvitationNum,
            }
            this.dynamicReward = {
              ladderOneRewardAmount: data.ladderOneRewardAmount,
              ladderTwoRewardAmount: data.ladderTwoRewardAmount,
              ladderThreeRewardAmount: data.ladderThreeRewardAmount
            }
            this.registerRewardAmount = data.registerRewardAmount
            this.personNu = data.myInvitationNum
            this.tatalMon = data.couponTotal
            let rank = data.rank
            if(!data.rank)return;
            if (rank.length > 3) {
              this.rankThird = rank.splice(0,3)
              this.rankOther = rank

            }else {
              this.rankThird = rank
            }

            this.calculationCoupon()

          } else {
            // this.$toast(result.message)
          }
        })

      },
      /*
      *计算数据
      */
      calculationCoupon(){
        let dataSet = this.dynamicProgress
        let activityNumber = dataSet.activityNumber,
          totaNumber = dataSet.totaNumber,
          firstNumber = dataSet.firstNumber,
          secondNumber = dataSet.secondNumber
        if (activityNumber > totaNumber) {
          this.completion = true

        } else if (activityNumber == totaNumber) {
          this.completion = true

        } else if (secondNumber <= activityNumber && activityNumber < totaNumber) {
          this.completionThree = true
          this.invationToC = totaNumber - activityNumber

        }else if (firstNumber <= activityNumber && activityNumber < secondNumber) {
          this.completionTwo = true
          this.invationToSecond = secondNumber - activityNumber
        } else if (activityNumber < firstNumber && activityNumber != 0) {

          this.completionOne = true
          this.invationToFirst = firstNumber - activityNumber


        }else if (activityNumber == 0) {
          this.completionZero = true

        }


      }


    },
    created() {
      // this.getAdImg()
      this.ajaxRecommend()
      this.ajaxShareCode()
      this.ajaxShareCode2()


    }
  }
</script>

<style lang="scss">
  @import './styles/common.scss';
  .invitation_c {
    position: relative;
    background: #FF6D00;
    padding-bottom: .45rem;

  }
  .activity_rule{

    top:.8rem;
    right:.2rem;
    position: absolute;
    font-size: .2rem;
    button{
      padding: .05rem .25rem;
      color: white;
      border-radius: .5rem;
      background: linear-gradient(to right,#FCBF2D,#FCB72C,#FCA129,#FC7E24,#FC7923)

    }

  }
  .section_f{
    margin-bottom: .35rem;
  }

  .f_b {

    background: #FFFFFF;
    width: 90%;
    margin: auto;
    border-radius: 0.3rem;
    padding-bottom: 0.3rem;
  }
  .f_ele , .winner_title , .winner_c{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: .5rem;
  }
  .f_ele {
    padding-top: .7rem;
    padding-bottom: .3rem;
  }
  .winner_title{
    padding-top: .2rem;
    padding-bottom: .1rem;
  }
  .winner_c{
    padding-top: 0rem;
    padding-bottom: 0rem;
  }
  .text_p{
    width: max-content;
    font-size: .25rem;
    margin: 0   auto 0;
    line-height: 1.5;
    font-weight: 500;
  }
  .color_p{
    color: #FF7C00;
    font-size: .35rem;
  }
  .r_cont{
    border-left: solid 2px #EAEAEA;
  }
  .l_cont , .l_title , .wc_l  , .join_nu{
    flex: 1 1 auto;
  }

  .b_text1 {
    width: max-content;
    font-size: 0.25rem;
    margin: auto;
    padding-top: 0.7rem;
    color: #FF6D00;
  }
  .b_text2 {

    width: max-content;
    font-size: 0.25rem;
    margin: .8rem auto auto;
  }
  .b_text3 {

    color: white;

    background: linear-gradient(to right , #FCBF2D,#FCB72C,#FCA129,#FC7E24,#FC7923);
    border-radius: 0.5rem;
    margin-top: 0.8rem;
    font-weight: 500;
    letter-spacing: 2px;
  }

  .b_text4 {
    color: #FF7C00;
    border: solid 2px #FF7C00;
    padding: 0.1rem 1.35rem;
    letter-spacing: 2px;
    font-weight: 500;

  }
  .third_b{
    padding-top: .7rem;
  }
  .f_b_img{
    width: 90%;
    margin: auto;
  }
</style>
