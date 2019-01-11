<template>
  <div>
    <div class="ui-mask" id="queen-rule-mask" :class="{'active': isPopup}"></div>
    <div class="queen__popup" :class="{'active': isPopup}">
      <img src="./images/popup.png"/>
      <div class="queen__popup--action" @click="submitCouponExchange"></div>
      <div class="queen__popup--close" @click="togglePopup">
        <span class="queen__popup--btn"></span>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">

  import * as Model from '@/model/koi'

  import utils from '@/widget/utils'

  import app from '@/widget/app'

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
          document.getElementById('queen-rule-mask').addEventListener('touchmove',(event) => {
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
      submitCouponExchange () {
        if (utils.getUserToken()) {
          this.$emit('togglePopup', false)
        } else {
          app.loginAction()
        }
      }
    }
  }
</script>

<style lang="scss">
  .queen__popup{
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
      left: 1.9rem;
      top: 4.2rem;
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
      height: 6.67rem;
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
