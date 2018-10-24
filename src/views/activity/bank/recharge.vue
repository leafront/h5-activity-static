<template>
  <div class="pageView">
    <AppHeader :title="title" :isBorder="isBorder" :backFn="backAction">
      <!--<div class="ui-header-right">-->
        <!--<span>充值记录</span>-->
      <!--</div>-->
    </AppHeader>
    <div class="scroll-view-wrapper" :class="{'visibility': pageView}">
      <div class="bank-recharge">
        <i class="bank_icon"></i>
        <div class="bank-recharge-money">
          <span>悠点卡当前余额</span>
          <p>{{yCardBalance}}<small>元</small></p>
        </div>
      </div>
      <div class="bank-recharge-discount">
        <div class="bank-recharge-des">
          <div class="bank-recharge-tit" @click="toggleBankPopup(true)">
            <h3>充值特惠悠点卡</h3>
            <i class="icon_question"></i>
          </div>
        </div>
        <div class="bank-recharge-list clearfix">
          <div class="bank-recharge-item" @click="checkedRecharge(item,index)" :class="{'active': rechargeIndex == index}" v-for="(item,index) in rechargeList">
            <p>{{item.rechargeAmount}}<small>元</small></p>
            <span>{{item.activityContent}}</span>
          </div>
        </div>
      </div>
      <div class="bank-recharge-input" >
        <div class="bank-recharge-input-wrapper" @click="scrollInput($event)">
          <span>金额</span>
          <p>{{money}}</p>
        </div>
      </div>
      <div class="bank-recharge-submit" @click="submitAction">
        <div class="ui-submit">
          <span>充值</span>
        </div>
      </div>
      <div class="bank-rule">
        <p>活动规则：</p>
        <p>1、活动时间：2018年9月10日-2018年12月31日。</p>
        <p>2、优惠券细则：</p>
        <p>①在悠点卡中充值规定金额，即可获得相应的优惠券或优惠券包。</p>
        <p>②充30送10元无门槛优惠券、充100送100元券包（10元无门槛、118-30、299-60）、充200送200元券包（10元无门槛、118-30、168-40、199-50、299-70）、充300送300元券包（10元无门槛、118-30、168-40、199-50、299-70、399-100）。</p>
        <p>③有效期：自发券之日有效期15天。</p>
        <p>④使用方式：在来伊份APP下单时即可选择符合规则的优惠券。</p>
        <p>⑤使用范围：除生鲜、社会及部分特惠特价商品。</p>
        <p>⑥优惠券不可叠加使用。</p>
        <p>3、悠点卡一经充值，不接受退款。充值金额可在来伊份APP或来伊份全国门店使用。</p>
        <p>4、在法律许可的范围内，来伊份保留调整、暂停和终止本活动的权利，并经公告后生效。</p>
        <p>5、客户参与活动即视为理解并同意本活动细则，对于活动规则如有任何疑问可咨询来伊份APP客服。</p>
      </div>
    </div>
    <div class="bank-popup ui-mask" :class="{'active': isBankPopup}">
      <div class="bank-popup-cont">
        <div class="bank-popup-des">
          <h3>悠点卡说明</h3>
          <p class="font">"悠点卡"内金额无有效期，只可在消费时使用，不提现，不透支。</p>
          <p class="font">卡内所存金额可在全国来伊份门店或来伊份APP购物使用。</p>
        </div>
        <div class="bank-popup-button" @click="toggleBankPopup(false)">
          <span>我知道了</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">

  import AppHeader from '@/components/common/header'

  import config from '@/config/index'

  import app from '@/widget/app'

  import utils from '@/widget/utils'

  import store from '@/widget/store'

  import * as Model from '@/model/bank'

  export default {
    data () {
      return {
        title: '悠点卡',
        isBorder: true,
        pageView: false,
        yCardBalance: 0,
        money: '',
        rechargeList:  [],
        rechargeIndex: 0,
        isBankPopup: false
      }
    },
    components: {
      AppHeader
    },
    methods: {
      scrollInput (event) {
        if (utils.android()) {
          setTimeout(() => {
            event.target.scrollIntoViewIfNeeded()
          },400)
        }
      },
      backAction () {
        if (utils.isApp()) {
          app.back()
        } else {
          location.href = '/index.html'
        }
      },
      /**
       * 获取悠点卡金额
       */
      getWalletInfo () {
        Model.getWalletInfo({
          type: 'GET'
        }).then((result) => {

          const data = result.data
          if (result.code == 0 && data) {
            this.yCardBalance = data.yCardBalance || 0
          } else {
            this.$toast(result.message)
          }
        })
      },
      checkedRecharge (item,index) {
        this.money = item.rechargeAmount
        this.rechargeIndex = index
      },
      getRechargeList () {
        Model.getRechargeList({
          type: 'GET',
          data: {
            paymentConfigId: 1024026000000006
          }
        }).then((result) => {
          const data = result.data
          this.$hideLoading()
          if (result.code == 0 && data) {
            this.pageView = true
            this.rechargeList = data || []
            this.money = this.rechargeList[0].rechargeAmount
          } else {
            this.$toast(result.message)
          }
        })
      },
      submitAction () {
        const {
          money
        } = this

        if (!money) {
          this.$toast('请输入充值金额')
          return
        }
        this.createPay()
      },
      deleteRecharge () {
        this.money = ''
      },
      /**
       * 创建支付悠点卡支付
       */
      createPay () {

        const {
          money
        } = this

        const sessionId = utils.getSessionId()

        this.$showPageLoading()

        const ut = utils.getUserToken()

        Model.createPay({
          type: 'POST',
          data: {
            money,
            orderType: 1,
            paymentConfigId: 1024026000000006,
            returnUrl: config.hostPath + '/activity/bank/success',
            sessionId: ut
          }
        }).then((result) => {

          const data = result.data
          this.$hidePageLoading()

          if (result.code == 0 && data) {
            store.set('BANK_RECHARGE_INFO',data.orderUrl,'session')
            store.set('BANK_RECHARGE_MONEY',money,'session')
            this.pageAction('/activity/bank/pay')
          } else {
            this.$toast(result.message)
          }
        })
      },
      pageAction (url) {
        this.$router.push(url)
      },
      toggleBankPopup (val) {
        this.isBankPopup = val
      }
    },
    created () {
      this.$showLoading()
      this.getWalletInfo()
      this.getRechargeList()
    }
  }

</script>

<style lang="scss">
  .bank-rule{
    padding: .27rem .3rem;
    p{
      font-size: .26rem;
      color: #666;
    }
  }
  .bank-popup{
    display: none;
    &.active{
      display: block;
    }
  }
  .bank-popup-button{
    border-top: .01rem solid #ddd;
    height: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    span{
      font-size: .32rem;
      color: #2CB2FF;
    }
  }
  .bank-popup-des{
    padding: 0 .3rem;
    display: flex;
    flex-direction: column;
    h3{
      padding: .44rem 0;
      color: #333;
      font-size: .36rem;
      text-align: center;
    }
    p{
      padding-bottom: .45rem;
    }
  }
  .bank-popup-cont{
    width: 5.62rem;
    border-radius: .1rem;
    background: #fff;
    animation: scaleIn .4s;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -2.81rem;
    margin-top: -2.44rem;
  }
  .bank-recharge-submit{
    padding: .48rem .3rem 0;
  }
  .bank-recharge-list{
    padding: 0 4%;
  }
  .bank-recharge-input-wrapper{
    height: 1rem;
    display: flex;
    align-items: center;
    border-top: .01rem solid #F0F0F0;
    span{
      font-size: .32rem;
    }
    p {
      padding-left: .42rem;
      color: #333;
      font-size: .34rem;
      height: .45rem;
      flex: 1;
    }
  }
  .bank-recharge-input{
    padding: 0 .3rem;
    background: #fff;
    position: relative;
  }
  .bank-recharge-item{
    float: left;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 46.3%;
    height: 1.5rem;
    margin-right: 7.2%;
    border: .01rem solid #ccc;
    border-radius:  .04rem;
    margin-bottom: .3rem;
    &.active{
      border: .03rem solid #FF6900;
    }
    p{
      color: #333;
      font-size: .38rem;
      padding-bottom: .1rem;
      small{
        padding-left: .03rem;
        font-size: .22rem;
      }
    }
    span{
      color: #FF6900;
    }
    &:nth-child(2n) {
      margin-right: 0;
    }
  }
  .bank-recharge-tit{
    display: flex;
    align-items: center;
    padding-top: .4rem;
    padding-bottom: .16rem;
    h3 {
      color: #333;
      font-size: .32rem;
      padding-right: .1rem;
    }
    .icon_question{
      width: .3rem;
      height: .3rem;
      background: url(./images/bank_question.png) no-repeat;
      background-size: .3rem auto;
    }
    p{
      color: #808080;
    }
  }
  .bank-recharge-des{
    padding: 0 4% .2rem;
  }
  .bank-recharge-discount{

    padding-bottom: .2rem;
    background: #fff;
  }
  .bank-recharge{
    padding: .45rem .54rem;
    background: #FF6900;
    display: flex;
    .bank_icon{
      background: url(./images/bank_icon.png) no-repeat;
      width: 1.1rem;
      height: 1.1rem;
      background-size: 1.1rem auto;
    }
  }
  .bank-recharge-money{
    padding-left: .56rem;
    display: flex;
    flex-direction: column;
    span{
      color: rgba(255,255,255,.8);
    }
    p{
      color: #fff;
      font-size: .65rem;
      small{
        padding-left: .1rem;
        font-size: .24rem;
      }
    }
  }
</style>
