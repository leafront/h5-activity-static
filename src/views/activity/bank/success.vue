<template>
  <div class="pageView">
    <AppHeader :title="title" :isBorder="isBorder">
      <div class="ui-header-right" @click="pageAction('/activity/bank/recharge')">
        <span class="bank-success-right-btn">完成</span>
      </div>
    </AppHeader>
    <div class="scroll-view-wrapper" :class="{'visibility': pageView}">
      <div class="bank-success">
        <div class="bank-success-info">
          <i class="icon"></i>
          <span class="font">支付成功</span>
          <p class="c3">¥100.00</p>
        </div>
        <div class="bank-success-des">
          <p>优惠券已发送，请至<b>来伊份APP</b></p>
          <p><b>"我的"-"优惠券"</b>查收</p>
        </div>
        <div class="bank-success-btn" @click="pageAction('/activity/bank/recharge')">
          <span>返回</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">

  import AppHeader from '@/components/common/header'

  export default {
    data () {
      return {
        title: '交易结果',
        isBorder: true,
        pageView: true
      }
    },
    components: {
      AppHeader
    },
    methods: {
      pageAction (url) {
        this.$router.replace(url)
      }
    }
  }

</script>

<style lang="scss">
  .bank-success-des{
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-bottom: .15rem;
    p{
      font-size: .32rem;
      color: #666;
      b{
        color:#333;
      }
    }
  }
  .bank-success-btn{
    height: .88rem;
    border-top: .01rem solid #F0F0F0;
    display: flex;
    justify-content: center;
    align-items: center;
    span{
      color: #2CB2FF;
      font-size: .34rem;
    }
  }
  .bank-success-info{
    display: flex;
  }
  .bank-success-info{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: .6rem;
    .icon{
      width: .6rem;
      height: .6rem;
      background:url(./images/bank_success_icon.png) no-repeat;
      background-size: .6rem auto;
    }
    span{
      padding-top: .13rem;
      color: #808080;
    }
    p{
      font-size: .7rem;
    }
  }
  .bank-success{
    margin-top: .24rem;
    background: #fff;
  }
  .ui-header-right{
    .bank-success-right-btn{
      color: #2CB2FF;
    }
  }
</style>
