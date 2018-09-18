<template>
  <div>
    <div class="ui-mask" id="worldcup-rule-mask" :class="{'active': imgLayer}"></div>
    <!-- <span class="ui-worldcup-close" :class="{'active': imgLayer}" @click="closeImgLayer"></span> -->
    <div class="ui-imgLayer-rule" id="worldcup-rule" :class="{'active': imgLayer}">
    <img src=" /activity-static/images/invite_imgLayer.png" alt="">
    <span class="ui-imgLayer-close" :class="{'active': imgLayer}" @click="closeImgLayer"></span>

    </div>
  </div>
</template>

<style lang="scss">
.ui-imgLayer-close {

  margin: .2rem auto 0;
    width: 0.4rem;
    height: 0.4rem;
    background-color:  #fff0;
    position: relative;
    // position: absolute;
    border: solid 2px #fff;
    border-radius: 50%;
    // right: 12%;
    // top: 6%;
    // z-index: 10000;
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
  .ui-imgLayer-rule{
    margin: .44rem auto 0;
    position: fixed;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    width: 80%;
    z-index:999;
    padding: 0 .4rem .3rem;
    border-radius: .2rem;
    color:#fff;
    overflow-scrolling: touch;
    -webkit-overflow-scrolling: touch;
    overflow: scroll;
    display: none;
    img {
      width: 100%;
      display: block;
    }
    &.active{
      display: block;
    }
  }

</style>

<script type="text/javascript">

  import utils from '@/widget/utils'

  import config from '@/config/index'

  export default {

    props: {
      imgLayer: {
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
      closeImgLayer () {
        this.$emit('toggleImgLayer',false)
      }
    }
  }

</script>
