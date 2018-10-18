<template>
  <div>
    <div class="ui-mask" id="koi-rule-mask" :class="{'active': isPopup}"></div>
    <div class="koi__popup" :class="{'active': isPopup}">
      <img src="./images/popup.png"/>
      <div class="koi__popup--action" @click="getCouponExchange"></div>
      <div class="koi__popup--close" @click="togglePopup">
        <span class="koi__popup--btn"></span>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">

  import * as Model from '@/model/koi'

  import utils from '@/widget/utils'

  export default {
    props: {
      isPopup: {
        type: Boolean,
        value: false
      }
    },
    watch: {
      isPopup (newVal,oldVal) {
        if (newVal) {
          document.getElementById('koi-rule-mask').addEventListener('touchmove',(event) => {
            console.log(newVal)
            if (!utils.isPassive()) {
              event.preventDefault()
            }
            event.stopPropagation()
          })
        }
      }
    },
    methods: {
      togglePopup () {
        this.$emit('togglePopup', false)
      },
      /**
       * exchange coupon
       */
      getCouponExchange () {
        this.$showPageLoading()
        Model.getCouponExchange({
          type: 'GET',
          data: {
            type: 0    //0 首次访问页面  1 分享  3 积分
          }
        }).then((result) => {
          const data = result.data
          this.$hidePageLoading()
          if (result.code == 0 && data) {
            this.$toast('兑换成功')
            this.thirdStrategyRemainCount = data.thirdStrategyRemainCount
            this.$emit('togglePopup', false)
          } else {
            this.$toast(result.message)
          }
        })
      },
    }
  }

</script>

<style lang="scss">
  .koi__popup{
    position: fixed;
    width: 100%;
    top: 50%;
    margin-top: -2.8rem;
    left: 0;
    height: 5rem;
    opacity: 0;
    z-index: -10;
    &--action{
      width: 3.2rem;
      height: 1rem;
      position: absolute;
      left: 2.2rem;
      top: 3.2rem;
    }
    &--close{
      padding: .12rem .3rem;
      display: flex;
      justify-content: center;
    }
    &--btn{
      width: .44rem;
      height: .44rem;
      border: .02rem solid #fff;
      position: relative;
      border-radius: 50%;
      display: block;
      &:before{
        content: '';
        display: block;
        position: absolute;
        left:50%;
        top:50%;
        width: .2rem;
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
        width: .2rem;
        height: .02rem;
        background: #fff;
        transform: translateX(-50%) rotate(-45deg);
      }
    }
    img{
      width: 6.89rem;
      height: 5.03rem;
      margin: 0 auto;
      display: block;
    }
    &.active {
      animation: scaleIn .4s;
      opacity: 1;
      z-index: 999;
    }
  }
</style>
