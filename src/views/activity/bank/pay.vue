<template>
  <div class="pageView">
    <AppHeader :title="title" :isBorder="isBorder"></AppHeader>
    <div class="scroll-view-wrapper" :class="{'visibility': pageView}">
      <div class="bank-pay-money">
        <span class="font-b">应付金额</span>
        <strong class="font-b">¥{{money | price}}</strong>
      </div>
      <div class="bank-pay-list">
        <div class="bank-pay-tit">
          <p class="font c3">支付方式</p>
        </div>
        <div class="bank-pay-item" @click="payAction">
          <i class="bank_pay_icon"></i>
          <div class="bank-pay-info">
            <p class="c3 font">中国建设银行</p>
            <span>中国建设银行快捷支付</span>
          </div>
          <div class="ui-right-bottom"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">

  import AppHeader from '@/components/common/header'

  import store from '@/widget/store'

  export default {
    data () {
      return {
        title: '收银台',
        isBorder: true,
        pageView: true,
        orderUrl: '',
        money: ''
      }
    },
    components: {
      AppHeader
    },
    methods: {
      payAction () {
        const orderUrl = store.get('BANK_RECHARGE_INFO', 'session')
        location.href = 'https://ibsbjstar.ccb.com.cn/CCBIS/ccbMain?' + orderUrl
      }
    },
    created () {
      const money = store.get('BANK_RECHARGE_MONEY', 'session')
      this.money = money
    }
  }

</script>

<style lang="scss">
  .bank-pay-item{
    display: flex;
    height: 1.1rem;
    align-items: center;
    .bank_pay_icon{
      width: .6rem;
      height: .6rem;
      background: url(./images/bank_pay_icon.png) no-repeat;
      background-size: .6rem auto;
    }
  }
  .bank-pay-info{
    display: flex;
    flex-direction: column;
    flex: 1;
    padding-left: .2rem;
    span{
      color: #808080;
    }
  }
  .bank-pay-list{
    padding: 0 .3rem;
    margin-top: .18rem;
    background: #fff;
  }
  .bank-pay-tit{
    display: flex;
    align-items: center;
    height: .84rem;
    border-bottom: .01rem solid #F0F0F0;
  }
  .bank-pay-money{
    margin-top: .24rem;
    height: .8rem;
    display: flex;
    align-items: center;
    padding: 0 .3rem;
    background: #fff;
    span{
      color: #808080;
    }
    strong{
      margin-left: .7rem;
      color: #FF6900;
    }
  }
</style>
