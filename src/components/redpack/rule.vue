<template>
  <div class="redpack-rule">
    <div class="redpack-rule-title">
      <h4 class="font-s">拆红包活动细则</h4>
    </div>
    <p>1. 拆红包活动时间：2018年8月1日-2018年8月31日。</p>
    <p>2. 订单支付成功后，您将获得一次拆红包的机会，订单取消则红包将失效；每位用户每天至多可以领取5个红包。</p>
    <p>3. 每个红包需在分享成功后8小时内，邀请2位好友点击拆红包，否则拆红包失败。</p>
    <p>4. 红包仅限来伊份APP使用，每张订单仅限使用一张红包，红包不找零。</p>
    <p>5. 红包具有使用有效期，请在有效期内使用。</p>
    <p>6. 好友输入手机号帮忙拆红包，若好友非来伊份app注册会员，则将自动注册成为注册会员。</p>
    <p>7. 来伊份保留法律范围内允许的对活动的解释权。</p>
  </div>
</template>

<style lang="scss">
  .redpack-rule{
    padding: 0 .16rem .2rem;
    margin: -.01rem 0 .3rem;
    background: #fff;
    position: relative;
    z-index:10;
    p{
      line-height: .4rem;
    }
  }
  .redpack-rule-title{
    height: .6rem;
    line-height: .6rem;
    h4{
      text-align: center;
      position: relative;
      &:before{
        content: '';
        display:block;
        height:.01rem;
        position: absolute;
        background:#a0a0a0;
        width: 2rem;
        left: .12rem;
        top: 48%;
      }
      &:after{
        content: '';
        display:block;
        height:.01rem;
        position: absolute;
        background:#a0a0a0;
        width: 2rem;
        right: .12rem;
        top: 48%;
      }
    }
  }
</style>
