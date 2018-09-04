<template>
<div class="pageView">
  <AppHeader :title="title">
  </AppHeader>
  <div class="scroll-view-wrapper" :class="{'visibility': pageView}">
    <div class="invitation_c">
      <div class="head_img">
        <img src="./images/1.png" alt="">
      </div>
      <div class="section_f">
        <div class="f_h">
          <img src="./images/2.png" alt="">
          <p class="header_t">新人专享88元优惠</p>

        </div>
        <div class="f_b">
          <p class="b_text1 ">每邀请1人 获赠一张{{registerRewardAmount}}元优惠券</p>
          <ProgressBar :dynamicProgress="dynamicProgress" :dynamicReward="dynamicReward" ></ProgressBar>
          <p class="b_text2" v-show = "completionThree">再邀请 {{invationToC}} 人，可额外获得 {{dynamicReward.ladderThreeRewardAmount}}元优惠券</p>
          <p class="b_text2" v-show = "completion">恭喜完成！继续邀请冲击榜单赢取大礼~</p>
          <p class="b_text2" v-show = "completionTwo">再邀请 {{invationToSecond}} 人，可额外获得 {{dynamicReward.ladderTwoRewardAmount}}元优惠券</p>
          <p class="b_text2" v-show = "completionOne">再邀请 {{invationToFirst}} 人，可额外获得 {{dynamicReward.ladderOneRewardAmount}}元优惠券</p>
          <p class="b_text2" v-show = "completionZero">您还没有邀请好友，快去邀请好友吧~</p>

          <p class="b_text3 first_t">立即邀请</p>
          <p @click="showPoster" class="b_text4 first_t">生成我的邀请码</p>
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
          <div class="f_b_img">
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
  <ShareImg :rulePopup="rulePopup" @toggleRulePopup="toggleRulePopup"></ShareImg>
  </div>
</div>
</template>

<script type="text/javascript">
import AppHeader from '@/components/common/header'
import ProgressBar from '@/components/invitation/progress'
import ShareImg from '@/components/invitation/shareImg'
import * as Model from '@/model/invitation'
import utils from '@/widget/utils'
import config from '@/config/index'
import weixin_share from '@/common/weixin_share'
let img1 = config.hostPath + '/activity-static/images/invitationimg1.png'
let img2 = config.hostPath + '/activity-static/images/invitationimg1.png'
let img3 = config.hostPath + '/activity-static/images/invitationimg1.png'
export default {
  data() {
    return {
      title: "邀请好友",
      rulePopup: false,
      dynamicProgress: {},
      dynamicReward: {},
      registerRewardAmount: null,
      pageView: true,
      thirdImgSrc:[img1,img2,img3],
      rankThird:[],
      rankOther:[],
      pageView: false,
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



    }
  },
  components: {
    AppHeader,
    ProgressBar,
    ShareImg
  },
  methods: {
    /**
     * 获取个人获得的奖品列表
     */

     /**
      * 切换规则弹层信息
      * params {Boolean} val
      */
     toggleRulePopup (val) {
       this.rulePopup = val
       utils.appViewFixed()
     },
    /**
     * 获取滚动奖品文字内容
     */

  showPoster(){
    this.rulePopup = true
  },
  ajaxShareCode(){
     Model.getShareCode({
       type: 'GET'
     }).then((result) => {
       const data = result.data
       if (result.code == 0 ) {
         this.invitationShareC = data.shareCode
       }
})
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
         this.$hideLoading()
         this.pageView = true

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
          if (rank.length > 3) {
            this.rankThird = rank.splice(0,3)
            this.rankOther = rank

          }else {
            this.rankThird = rank
          }

          this.calculationCoupon()

       } else {
         this.$toast(result.message)
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
          this.invationToFirst = firstNumber - invationToSecond


        }else if (activityNumber == 0) {
          this.completionZero = true

        }


   }


  },
  created() {
    this.$showLoading()
    this.ajaxRecommend()
    this.ajaxShareCode()

  }
}
</script>

<style lang="scss">
@import './styles/common.scss';
.invitation_c {
    background: #FF6D00;
    padding-bottom: .45rem;

}
.section_f{
  margin-bottom: .35rem;
}

.f_b {

    background: #FFFFFF;
    width: 90%;
    margin: auto;
    border-radius: 0.3rem;
    padding-bottom: 0.5rem;
}
.f_ele , .winner_title , .winner_c{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: .8rem;
}
.winner_c{
  padding-top: .1rem;
  padding-bottom: .1rem;
}
 .text_p{
  width: max-content;
  font-size: .3rem;
  margin: 0   auto .3rem;
  line-height: 1.5;
}
.color_p{
  color: #FF7C00;
  font-size: .4rem;
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
    margin: 1rem auto auto;
}
.b_text3 {

    color: white;

    background: linear-gradient(to right , #FCBF2D,#FCB72C,#FCA129,#FC7E24,#FC7923);
    border-radius: 0.5rem;
    margin-top: 0.5rem;
}

.b_text4 {
    color: #FF7C00;
    border: solid 2px #FF7C00;
    padding: 0.1rem 1rem;

}
.third_b{
  padding-top: .7rem;
}
.f_b_img{
  width: 90%;
  margin: auto;
}
</style>
