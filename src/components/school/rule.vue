<template>
  <div>
    <div class="ui-mask" :class="{'active': isPopup}"></div>
    <div class="school-rule" :style="{'height': ruleHeight, 'marginTop': ruleTop}" :class="{'active': isPopup}">
      <span class="school-close-btn" @click="togglePopup(false)"></span>
      <h4>活动规则</h4>
      <div class="school-rule-tag">
        <span class="font">优惠券使用规则：</span>
      </div>
      <p>1.本活动仅限APP新用户参与，非新人用户无法享受优惠，优惠券只限APP使用</p>
      <p>2."点击领取"-"输入手机号+验证码"即可获得88元新人大礼包;</p>
      <p>3.领券完成即视为注册完成;</p>
      <p>4.同一ID，同一手机号，同一设备视为同一用户，每位用户限各领一份优惠券;</p>
      <p>5.优惠券效期及使用范围参照优惠券说明。</p>
      <div class="school-rule-tag">
        <span class="font">优惠券使用方法：</span>
      </div>
      <p>下载来伊份APP-进入“我的”-点击“优惠券”，即可查看优惠券，在APP使用；</p>
      <p>如有问题，可洽询APP客服;</p>
      <p>如有用户刷券等恶意行为，来伊份将取消其活动权益;</p>
      <strong>活动最终解释权归来伊份所有。</strong>
    </div>
  </div>
</template>

<script type="text/javascript">

  import utils from '@/widget/utils'

  export default {
    props: {
      isPopup: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        ruleHeight: '1200px',
        ruleTop: '400px'
      }
    },
    methods: {
      togglePopup (val) {
        this.$emit('togglePopup', val)
      }
    },
    created () {
      const docEle = document.documentElement
      const relativeWidth = docEle.clientWidth * .8
      const ruleHeight = Math.ceil(relativeWidth * 1.723)
      this.ruleHeight = ruleHeight + 'px'
      const headerHeight = utils.weixin() ? 0 : (0.44 * parseInt(docEle.style.fontSize))
      const ruleTop = Math.ceil(-(ruleHeight * .5) + headerHeight)
      this.ruleTop = ruleTop + 'px'
    }
  }
</script>

<style lang="scss">
  .school-close-btn{
    width: .64rem;
    height: .64rem;
    background: #0591d9;
    position: absolute;
    border-radius: 50%;
    top: .14rem;
    right: .14rem;
    display: block;
    &:before{
      content: '';
      display: block;
      position: absolute;
      left:50%;
      top:50%;
      width: .32rem;
      height: .02rem;
      background: #fff;
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
      background: #fff;
      transform: translateX(-50%) rotate(-45deg);
    }
  }
  .school-rule-tag{
    margin-top: .25rem;
    width: 2.7rem;
    height: .54rem;
    text-align: center;
    line-height: .54rem;
    background: url(./images/school_rule_btn.png) no-repeat;
    background-size: 2.7rem auto;
    span{
      text-align: center;
      color: #b1313d;
    }
  }
  .school-rule{
    position: fixed;
    left: 10%;
    top: 50%;
    width: 80%;
    margin-top: .44rem;
    height: 10.34rem;
    overflow-scrolling: touch;
    -webkit-overflow-scrolling: touch;
    background: url(./images/school_rule_bg.jpg) #fff no-repeat;
    background-size: 100% auto;
    z-index: -10;
    padding: 0 .3rem;
    border-radius: .15rem;
    visibility: hidden;
    &.active {
      animation: scaleIn .4s;
      visibility: visible;
      z-index: 999;
    }
    h4{
      text-align: center;
      margin-top: .35rem;
      color: #783522;
      font-size: .38rem;
      text-decoration: underline;
    }
    p{
      margin-top: .14rem;
      line-height: .4rem;
      color: #783522;
    }
    strong{
      padding-top: .1rem;
      color: #b1313d;
      display: block;
    }
  }
</style>
