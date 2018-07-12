<template>
  <div>
    <div class="ui-mask" id="worldcup-rule-mask" :class="{'active': rulePopup}"></div>
    <span class="ui-worldcup-close" :class="{'active': rulePopup}" @click="closeRulePopup"></span>
    <div class="ui-worldcup-rule" id="worldcup-rule" :class="{'active': rulePopup}">
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
    top: 6%;
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
        })

        document.getElementById('worldcup-rule').addEventListener('touchmove',(event) => {

          event.stopPropagation()
        },utils.isPassive() ? {passive: true} : false)

        document.getElementById('worldcup-rule').addEventListener('scroll',(event) => {

          event.stopPropagation()
        },utils.isPassive() ? {passive: true} : false)
      }
    },
    methods: {
      closeRulePopup () {
        this.$emit('toggleRulePopup',false)
      }
    }
  }

</script>
