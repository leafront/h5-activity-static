<template>
<div>
  <div class="ui-mask" id="worldcup-rule-mask" :class="{'active': rulePopup}"></div>
  <!-- <span class="ui-shareimg-close" :class="{'active': rulePopup}" @click="closeRulePopup"></span> -->

  <div class="ui-shareimg-content" id="worldcup-rule" :class="{'active': rulePopup}">
    <canvas class="cas" id="canvas"></canvas>
    <div class="img_bottom">
      保存图片
    </div>
    <span class="ui-shareimg-close" :class="{'active': rulePopup}" @click="closeRulePopup"></span>

  </div>
  <div id="qrcode"></div>

</div>
</template>

<style lang="scss">
.ui-shareimg-close {

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
.ui-shareimg-content {
    background-color: #fff0;
    margin: 0.44rem auto 0;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-52%);
    z-index: 999;

    border-radius: 0.2rem;
    color: #fff;
    overflow-scrolling: touch;
    -webkit-overflow-scrolling: touch;
    overflow: scroll;
    display: none;
    h4 {
        text-align: center;
        font-size: 0.32rem;
        line-height: 0.8rem;
    }
    &.active {
        display: block;
    }
}
.img_bottom{
  width: 90%;
  font-size:  .35rem;
  line-height: 3;
  text-align: center;
  margin: .35rem auto 0;
  background: linear-gradient(to right,#FCBF2D,#FCB72C ,#FCA129 ,#FC7E24);
  border-radius: .5rem;
}
.cas {
    display: block;
    background: #fff;
    border-radius: 0.2rem;

}
#qrcode{
  display: none;
}
</style>

<script type="text/javascript">
import utils from '@/widget/utils'

import config from '@/config/index'
import QRCode from 'qrcodejs2'
// import {QRCode} from '@/widget/qrcode'
//
// new QRCode(document.getElementById("qrcode"),"http://m.laiyifen.com");

export default {

  props: {
    rulePopup: {
      type: Boolean,
      default: false
    },
    invitationShareC:{
      type: String,
      default: ""
    }
  },
  data() {
    return {
    scalePx:parseInt(document.documentElement.style.fontSize),
    clientWidth: document.documentElement.clientWidth,
    clientHeight:document.documentElement.clientHeight,
    scaleWH: 0.65,

    }
  },
  watch: {

      invitationShareC (newVal, oldVal) {
        console.log(oldVal)
        this.qrcode()
        this.drawingCanvas()
      },


    rulePopup() {

      /**
       *
       * 阻止弹层外的元素滚动
       */

      document.getElementById('worldcup-rule-mask').addEventListener('touchmove', (event) => {


        if (!utils.isPassive()) {

          event.preventDefault()

        }
      })

      document.getElementById('worldcup-rule').addEventListener('touchmove', (event) => {

        event.stopPropagation()

      }, utils.isPassive() ? {
        passive: true
      } : false)

      document.getElementById('worldcup-rule').addEventListener('scroll', (event) => {

        event.stopPropagation()
      }, utils.isPassive() ? {
        passive: true
      } : false)
    }
  },
  methods: {
    /**
     * 二维码生成
     */
    qrcode() {
         let url = "http://m.lyf.edu.laiyifen.com/actives/online/invitationfriends/index.html" + "?" + "shareCode" + "=" + this.invitationShareC
         new QRCode('qrcode', {
          width: this.scalePx * 1.4, // 设置宽度
          height: this.scalePx * 1.4, // 设置高度
          text: url
        })

    },
    drawingCanvas() {

      /**
       * canvas绘图
       */
       const self = this
      let canvas = document.getElementById("canvas")
      let ctx = canvas.getContext("2d")
      let img = new Image()
      img.src = config.hostPath + '/activity-static/images/invite_qrcode.png'

      // const scalePx = parseInt(document.documentElement.style.fontSize)


      // const clientWidth = document.documentElement.clientWidth
      // const clientHeight = document.documentElement.clientHeight
      // console.log(clientWidth);
      //
      // console.log(clientHeight);
      canvas.width = this.clientWidth * .8
      canvas.height = canvas.width / self.scaleWH
      img.onload = () => {
        const imgScale = img.height / img.width

        ctx.drawImage(img, 0, 0, self.clientWidth * .8, self.clientWidth * .8 * imgScale);
      }


      setTimeout(() =>{
          let qrEle = document.getElementById('qrcode')
        let qrChild = qrEle.querySelector('img')
        qrChild.onload = () =>{
          let qrSrc = qrChild.src
          if(qrSrc){
            let qrImg = new Image()
            qrImg.src = qrSrc
            qrImg.onload = () => {
              ctx.drawImage(qrImg , self.clientWidth * .8/2-(this.scalePx * 1.4)/2 , self.clientWidth * .8*1.05 )
            }
        }
        }

    },0)
    //第三张图
    let imgLogo = new Image()
    imgLogo.src = config.hostPath + '/activity-static/images/qrcodelogo.png'
    imgLogo.onload = () => {
      const logoScale = imgLogo.height / imgLogo.width
      let l_positionx = self.clientWidth * .8/2 - (self.scalePx * 2.5)/2
      let l_positionY = self.clientWidth * .8*1.1 + this.scalePx * 1.4
      let l_sizeW = self.scalePx * 2.5
      let l_sizeH = self.scalePx * 2.5 * logoScale

      ctx.drawImage(imgLogo, l_positionx, l_positionY, l_sizeW, l_sizeH);
    }


    },
    closeRulePopup() {
      this.$emit('toggleRulePopup', false)
    }
  },
  created() {

    setTimeout(() => {
      this.qrcode()
      this.drawingCanvas()
    }, 0)
  }
}
</script>
