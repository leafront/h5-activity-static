<template>
  <div>
    <div class="ui-mask" id="school-rule-mask" :class="{'active': isPopup}"></div>
    <div class="school-rule" :style="{'height': ruleHeight, 'marginTop': ruleTop}" :class="{'active': isPopup}">
      <div class="ydka-layer-image" @click = "jumpLink()">
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">

  import utils from '@/widget/utils'

  export default {
    props: {
      isPopup: {
        type: Boolean,
        default: false
      },
      downloadLink: {
        type: String,
        default: ""
      }
    },
    watch: {
      isPopup (newVal,oldVal) {
        if (newVal) {
          document.getElementById('school-rule-mask').addEventListener('touchmove',(event) => {
            if (!utils.isPassive()) {

              event.preventDefault()

            }
            event.stopPropagation()
          }, utils.isPassive() ? {passive: true} : false)
        }
      }
    },
    data () {
      return {
        ruleHeight: '1200px',
        ruleTop: '400px'
      }
    },
    methods: {
        jumpLink(){
            location.href = this.downloadLink
        }
    },
    created () {
      const docEle = document.documentElement
      const relativeWidth = docEle.clientWidth * .8
      const ruleHeight = Math.ceil(relativeWidth * 1.62)
      this.ruleHeight = ruleHeight + 'px'
      const headerHeight = utils.weixin() || utils.isApp() ? 0 : (0.44 * parseInt(docEle.style.fontSize))
      const ruleTop = Math.ceil(-(ruleHeight * .5) + headerHeight)
      this.ruleTop = ruleTop + 'px'
    }
  }
</script>

<style lang="scss">
.ydka-layer-image{
  width: 4.8rem;
  height: 4.8rem;
  border-radius: .3rem;
  background:  url(./images/layer.jpg) no-repeat;
  background-size: cover;
  margin: 2.5rem auto;
}
  .school-close{
    position: absolute;
    top: 0;
    right: 0;
    padding: .25rem .25rem .3rem .3rem;
  }
  .school-close-btn{
    width: .4rem;
    height: .4rem;
    background: #00ac9b;
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
  .school-rule-tag{
    margin-top: .25rem;
    width: 2.7rem;
    height: .54rem;
    text-align: center;
    line-height: .54rem;
    // background: url(./images/school_rule_btn.png) no-repeat;
    background-size: 2.7rem auto;
    span{
      text-align: center;
      color: #b1313d;
    }
  }
  .school-rule{
    position: fixed;
    left: 10%;
    top: 50%;
    width: 80%;
    margin-top: .44rem;
    height: 10.34rem;
    overflow-scrolling: touch;
    -webkit-overflow-scrolling: touch;
    // background: url(./images/school_rule_bg.jpg) no-repeat;
    background-size: 100% auto;
    z-index: -10;
    padding: 0 .3rem;
    border-radius: .15rem;
    visibility: hidden;
    &.active {
      animation: scaleIn .4s;
      visibility: visible;
      z-index: 999;
    }
    h4{
      text-align: center;
      margin-top: .35rem;
      color: #783522;
      font-size: .38rem;
      text-decoration: underline;
    }
    p{
      margin-top: .14rem;
      line-height: .4rem;
      color: #783522;
    }
    strong{
      padding-top: .1rem;
      color: #b1313d;
      display: block;
    }
  }
</style>
