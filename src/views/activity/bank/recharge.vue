<template>
  <div class="pageView">
    <AppHeader :title="title" :isBorder="isBorder">
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
        <div class="bank-recharge-des" @click="toggleBankPopup(true)">
          <div class="bank-recharge-tit">
            <h3>充值特惠悠点卡</h3>
            <i class="icon_question"></i>
          </div>
          <p>自2018年6月20日起，充值累计3次以上且单词充值金额大于100元，送
            满200减10元优惠券3张</p>
        </div>
        <div class="bank-recharge-list clearfix">
          <div class="bank-recharge-item" @click="checkedRecharge(item,index)" :class="{'active': rechargeIndex == index}" v-for="(item,index) in rechargeList">
            <p>{{item.rechargeAmount}}<small>元</small></p>
            <span>{{item.activityContent}}</span>
          </div>
        </div>
      </div>
      <div class="bank-recharge-input">
        <div class="bank-recharge-input-wrapper">
          <span>金额</span>
          <input type="tel" v-model.trim="money" placeholder="请输入充值金额"/>
        </div>
        <div class="bank-recharge-close" @click="deleteRecharge">
          <svg class="icon" aria-hidden="true" v-show="money">
            <use xlink:href="#icon-close"></use>
          </svg>
        </div>
      </div>
      <div class="bank-recharge-submit" @click="submitAction">
        <div class="ui-submit">
          <span>充值</span>
        </div>
      </div>
    </div>
    <div class="bank-popup ui-mask" :class="{'active': isBankPopup}">
      <div class="bank-popup-cont">
        <h3>悠点卡说明</h3>
        <p class="font">悠点卡内金额无有效期，只可在消费
          时使用，不提现，不透支。</p>
        <p class="font">悠点卡内金额无有效期，只可在消费
          时使用，不提现，不透支。</p>
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

  import validate from '@/widget/validate'

  export default {
    data () {
      return {
        title: '悠点卡',
        isBorder: true,
        pageView: true,
        yCardBalance: 0,
        money: '',
        rechargeList:  [{
          "rechargeAmount": "100",
          "activityContent": "送满50减10优惠券1张"
        }, {
          "rechargeAmount": "200",
          "activityContent": "送满100减20优惠券1张"
        },{
          "rechargeAmount": "300",
          "activityContent": "送满250减10优惠券1张"
        }, {
          "rechargeAmount": "500",
          "activityContent": "送满500减20优惠券1张"
        }],
        rechargeIndex: 0,
        isBankPopup: false
      }
    },
    components: {
      AppHeader
    },
    methods: {
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
          type: 'GET'
        }).then((result) => {
          const data = result.data
          //this.$hideLoading()
          if (result.code == 0 && data) {
            //this.pageView = true
            this.rechargeList = data || []
          } else {
            this.$toast(result.message)
          }
        })
        this.money = this.rechargeList[0].rechargeAmount
      },
      submitAction () {
        const {
          money
        } = this

        if (!money) {
          this.$toast('请输入充值金额')
          return
        }

        if (!validate.isNumber(money)) {
          this.$toast('请输入正确的充值金额')
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

        const ut = app.getUserToken()

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
      //this.$showLoading()
      this.getWalletInfo()
      this.getRechargeList()
    }
  }

</script>

<style lang="scss">
  .bank-popup{
    align-items: center;
    justify-content: center;
    display: none;
    &.active{
      display: flex;
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
  .bank-popup-cont{
    width: 5.62rem;
    border-radius: .1rem;
    background: #fff;
    position: absolute;
    padding: 0 .5rem;
    animation: scaleIn .4s;
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
    input {
      padding-left: .42rem;
      color: #333;
      font-size: .34rem;
      height: .45rem;
      flex: 1;
      &::-webkit-input-placeholder{
        color: #DEDEDE;
        font-size: .3rem;
      }
    }
  }
  .bank-recharge-close{
    height: 1rem;
    padding: 0 .3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 0;
    top:0;
    .icon{
      font-size: .4rem;
      color: #999;
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
