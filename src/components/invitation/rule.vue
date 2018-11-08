<template>
  <div>
    <div class="ui-mask" id="worldcup-rule-mask" :class="{'active': ruleText}"></div>
    <!-- <span class="ui-invite-close" :class="{'active': ruleText}" @click="closeRuleText"></span> -->
    <div class="ui-invite-rule" id="worldcup-rule" :class="{'active': ruleText}">
      <div class="rule_child">
        <h4 class="">规则详情</h4>
    <h5>一、活动规则：</h5>
    <p>单个自然月内，老用户邀请新用户注册来伊份会员，即可享受对应奖励。</p>
    <h5>二、邀请规则</h5>
    <p>新用户通过老用户分享的链接，填写手机号及验证码后注册成为来伊份会员，即可确认本次邀请成功。同一手机号，同一终端设备号，同一登录账号均视为同一用户。

</p>
    <h5>二、奖励规则</h5>
    <p>1.新用户（受邀人）：获得88元新人礼包1份。</p>
    <p>2.老用户（邀请人）：</p>
    <h5>基本奖励：</h5>
    <p>①每邀请1人，邀请人获赠5元无门槛券；</p>
    <p>②受邀人首次消费下单，邀请人获赠满80减20元券；</p>
    <h5>累计奖励：</h5>

    <p>①累计邀请2人，邀请人额外获赠40减10优惠券</p>
    <p>②累计邀请5人，邀请人额外获赠满80减20优惠券；</p>
    <p>③累计邀请10人，邀请人额外获赠满199减100优惠券；</p>
    <p>④邀请人数达到月榜第1名，邀请人额外获赠价值200元以上热门零食礼盒</p>
    <h5>四、奖品领取规则：</h5>
    <p>①受邀人注册来伊份会员后，优惠券自动到账。</p>
    <p>②邀请人邀请人数达到对应奖励阶段，优惠券自动到账。</p>
    <p>③月榜第1名所得奖品，工作人员将在10个工作日内主动联系获奖者并发放奖品。</p>
    <p>提示：</p>
    <p>①如有疑问请联系平台客服人员：点击“我的”-点击“客服工具”。</p>
    <p>②优惠券不可叠加使用，商城部分活动与商品不可使用优惠券。</p>
    <p>③如有发现恶意刷单以非正规手段获得奖励者，官方运营组有权取消获奖资格</p>
    <p>此活动最终解释权归来伊份伊起赚所有</p>


      </div>
      <!-- <img v-for = "(item, index) in addList" :src="item.imageUrl" alt=""> -->
      <span class="ui-invite-close" :class="{'active': ruleText}" @click="closeRuleText"></span>
    </div>

  </div>
</template>

<style lang="scss">
.ui-invite-close {

  margin: .2rem auto 0;
    width: 0.4rem;
    height: 0.4rem;
    background-color:  #fff0;
    position: relative;
    border: solid 2px #fff;
    border-radius: 50%;
    z-index: 10000;
    display: none;
    &.active {
        display: block;
    }
    &:before {
        content: '';
        display: block;
        position: absolute;
        left: 50%;
        top: 50%;
        width: 0.25rem;
        height: 0.02rem;
        background: #fff;
        transform: translateX(-50%) rotate(45deg);
    }
    &:after {
        content: '';
        display: block;
        position: absolute;
        left: 50%;
        top: 50%;
        width: 0.25rem;
        height: 0.02rem;
        background: #fff;
        transform: translateX(-50%) rotate(-45deg);
    }
}
  .ui-invite-rule{
    margin: .44rem auto 0;
    position: fixed;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    width: 80%;
    max-height: 80%;
    z-index:999;
    // padding: 0 .4rem .3rem;
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
  .rule_child{
    background:linear-gradient(to bottom,#FC8B3A,#FC8337,#FC7933,#FB6D2E,#FB5123);
    padding: .2rem .3rem;
    overflow-y: scroll;
    color: white;
    width: 100%;
    height: 8rem;
    border-radius: .2rem;

  }

</style>

<script type="text/javascript">

  import utils from '@/widget/utils'

  import * as Model from '@/model/invitation'

  export default {


    props: {
      ruleText: {
        type: Boolean,
        default: false
      },

    },

    watch: {
      rulePopup () {

        /**
         *
         * 阻止弹层外的元素滚动
         */
        document.getElementById('worldcup-rule-mask').addEventListener('touchmove',(event) => {

          if (!utils.isPassive()) {
            event.preventDefault()
          }
        },utils.isPassive() ? {passive: true} : false)
      }
    },
    methods: {

      closeRuleText () {
        this.$emit('toggleRuleText',false)
      }
    }
  }

</script>
