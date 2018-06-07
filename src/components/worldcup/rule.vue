<template>
  <div>
    <div class="ui-mask" :class="{'active': rulePopup}"></div>
    <span class="ui-worldcup-close" :class="{'active': rulePopup}" @click="closeRulePopup"></span>
    <div class="ui-worldcup-rule" :class="{'active': rulePopup}">
      <h4>活动规则</h4>
      <p>a)	活动对象：来伊份会员；</p>
      <p>b)	参与渠道：用户可通过首页banner、专区入口进入活动专区页面；</p>
      <p>c)	参与方式：活动期间，会员用户进入活动专区页面参与活动，收集世界杯球队卡，以球队卡兑换形式获得奖品，分别设置7种不同奖品。</p>
      <p>d)	用户获卡方式：</p>
      <p>i.	首次登陆，获得任意一张	球队卡（活动期间仅限首次1张）；</p>
      <p>ii. 下单购买（线上app满68元）/线下下单任意金额，获得任意一张球队卡（活动期间每日首单即可获得1张）；</p>
      <p>iii. 首次分享，获得任意一张球队卡（活动期间仅限首次1张）；</p>
      <p>备注：线上发卡均为实时发卡，线下发卡为T+1个工作日，扫码消费即获得球队卡，发卡成功后系统自动发送短信至用户手机，用户可在活动专区查询已获球队卡。</p>
      <p>e)	用户兑奖方式：</p>
      <p>i.	首次兑换：用户集齐（登陆、下单、分享）三张球队卡即可至活动专区页面参与兑换（二至七等奖，含实物奖），用户需完善手机号、身份信息等；</p>
      <p>ii. 每日兑换：用户继续下单满68元/线下每日首次消费任意金额可再获得一次兑换机会，至活动专区页面参与兑换（二至七等奖，含实物奖）；</p>
      <p>iii. 一等奖兑换：一等奖资格仅限活动期间消费满100元以上用户中进行兑换，兑换资格球卡会在7月15日中发放到用户账户中，并统一在7月16日上午10点兑换，并实时公布。</p>
      <p>f)	奖品发放规则</p>
      <p>i.	一等奖1个，价值2000元神秘大奖一个，7月16日兑换，实时公布，并发送短信给予客户，提醒客户主动联系客服，后续再由客服联系中奖用户确认信息后发送（实物奖品）；</p>
      <p>ii. 二等奖5个，价值320元的YSL唇膏；</p>
      <p>iii. 三等奖7个，价值140元的小米手环；</p>
      <p>iv.  四等奖500个， 7折优惠券 （满68-20元券）（送完即止）；</p>
      <p>v.	五等奖5000个，7.5折优惠券 （满88-28元券）（送完即止）；</p>
      <p>vi. 六等奖10000个（实物奖），炫彩足球杯（券） ：线上发券，线下所有门店领取（送完即止）</p>
      <p>vii. 七等奖500000个，8折优惠券（满138-30元券）（送完即止）；</p>
      <p>备注：线下领取杯子，需在6/30-7/15期间领取，若遇门店杯子发放完毕，可联系客服，另去就近其他门店领取，或耐心等待调货随后继续领取。</p>
      <p>viii. 1)	7月15日，集中赠送所有参与的用户一张“一等奖卡”，召集用户集中使用此卡于7月16日参与兑换一等奖，并实时公布中奖名单；（未抽中一等奖的用户，额外赠送一张8折券：满138-30元）;</p>
      <h4>兑奖时间及方式</h4>
      <p>a)	积分及虚拟奖品，将于72小时内到账，用户可通过登录app商城，在个人中心-兑换记录中查询奖品详情。</p>
      <p>b)	实物奖品，将根据用户预留的联系地址送出（配送区域仅限中国境内除港澳台以外的地区），于5-7个工作日内送达。此期间，请用户保持手机畅通。若用户提供的联系方式和地址有误，将影响配送时间或配送失败，此后果由用户自行承担责任；若因不可抗力因素造成配送延迟，请用户耐心等待，给您带来不便，尽情谅解。</p>
      <p>c)线下门店消费获卡原则，会员在线下门店使用app会员码扫码消费，系统实时发放球队卡至用户账户，发放成功后以短信形式通知用户，用户可在活动专区查询。</p>
      <p>d)本活动最终解释权归来伊份所有，如存在恶意或违规操作，来伊份有权取消用户参与活动资格，谢谢。</p>
    </div>
  </div>
</template>

<style lang="scss">
  .ui-worldcup-close{
    width: .64rem;
    height: .64rem;
    border: .01rem solid #4e4d4d;
    background: #fff;
    position: absolute;
    border-radius: 50%;
    right:12%;
    top: .8rem;
    z-index:10000;
    display: none;
    &.active{
      display: block;
    }
    &:before{
      content: '';
      display: block;
      position: absolute;
      left:50%;
      top:50%;
      width: .32rem;
      height: .02rem;
      background: #4e4d4d;
      transform: translateX(-50%) rotate(45deg);
    }
    &:after{
      content: '';
      display: block;
      position: absolute;
      left:50%;
      top:50%;
      width: .32rem;
      height: .02rem;
      background: #4e4d4d;
      transform: translateX(-50%) rotate(-45deg);
    }
  }
  .ui-worldcup-rule{
    background:#9f0817;
    margin: .44rem auto 0;
    position: fixed;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    width: 80%;
    height: 70%;
    z-index:999;
    padding: 0 .4rem .3rem;
    border-radius: .2rem;
    color:#fff;
    overflow-scrolling: touch;
    -webkit-overflow-scrolling: touch;
    overflow: scroll;
    display: none;
    h4{
      text-align: center;
      font-size: .32rem;
      line-height: .8rem;
    }
    &.active{
      display: block;
    }
  }

</style>

<script type="text/javascript">

  import utils from '@/widget/utils'

  export default {

    props: {
      rulePopup: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      closeRulePopup () {
        utils.removeAppViewFixed()
        this.$emit('toggleRulePopup',false)
      }
    }
  }

</script>
