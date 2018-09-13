<template>
  <div>
    <div class="ui-mask" id="worldcup-rule-mask" :class="{'active': ruleText}"></div>
    <!-- <span class="ui-invite-close" :class="{'active': ruleText}" @click="closeRuleText"></span> -->
    <div class="ui-invite-rule" id="worldcup-rule" :class="{'active': ruleText}">
      <div class="rule_child">
        <img v-for = "(item, index) in addList" :src="item.imageUrl" alt="">
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
    max-height: 70%;
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
  .rule_child{
    background:linear-gradient(to bottom,#FC8B3A,#FC8337,#FC7933,#FB6D2E,#FB5123);
    padding: .2rem .3rem;
   image{
     display: block;
   }
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
      addList:{
        type: Array,
        default: []
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

      closeRuleText () {
        this.$emit('toggleRuleText',false)
      }
    }
  }

</script>
