<template>
<div>
  <div class="ui-mask" id="worldcup-rule-mask" :class="{'active': rulePopup}"></div>

  <div class="ui-shareimg-content" id="worldcup-rule" :class="{'active': rulePopup}">
    <div class="wechat_img">
    </div>
    <div class="qrCode_img">

    </div>
    <div class="code_description">
      {{goodsName}}
    </div>
    <div class="code_des_prize">
      <div class="cd_prize_style">
        团
      </div>
      <div class="cd_prize_name">
        团购价
      </div>
      <div class="cd_prize_number">
        ¥{{$salePrice}}/盒
      </div>

    </div>

    <div class="cd_number_description">
      <div class="cd_nd_one">
        数量：{{$totalAmt}}盒
      </div>
      <div class="cd_nd_number">
        总价：¥{{(this.$salePrice * this.$totalAmt).toFixed(2)}}元
      </div>
    </div>
    <span class="ui-shareimg-close" :class="{'active': rulePopup}" @click="closeRulePopup"></span>

  </div>
  <div id="qrcode"></div>

</div>
</template>

<style lang="scss">
#worldcup-rule-mask{
  background: linear-gradient(to right,#FF4200,#FF801B);
}
.wechat_img{
  width: 80%;
  margin: .2rem auto;
  background-image: url(./img/wechat.png);
  background-size: 100%;
  background-repeat: no-repeat;
  height: 1.3rem;
}
.qrCode_img{
  width: 4rem;
  height: 4rem;
  margin: .2rem auto;
  background: red;

}
.code_description{
  width: max-content;
  margin: .4rem auto;
  color: #333333;
  font-size: .32rem;
}
.code_des_prize{
  width: max-content;
  margin: .4rem auto;
  color: #333333;
  display:flex;
  justify-content: flex-start;
  align-items: center;
}
.cd_prize_style{
  color: #FFFFFF;
  font-size: .2rem;
  background: #FF6900;
  flex: 0 0 auto;
  padding: 0 .05rem;
}
.cd_prize_name{
  color: #333333;
  font-size: .28rem;
  margin-left: .1rem;
  flex: 0 0 auto;
}
.cd_prize_number{
  color:  #FF6900;
  font-size: .3rem;
  margin-left: .1rem;
  flex: 0 0 auto;
}
.cd_number_description{
  width: max-content;
  margin: .4rem auto;
  color: #333333;
  font-size: .3rem;
}




.ui-shareimg-close {

  margin: .2rem auto .2rem;
    width: 0.4rem;
    height: 0.4rem;
    background-color: #333333;
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

   width: 95%;
    background-color: #fff;
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

#qrcode{
  display: none;
}
</style>

<script type="text/javascript">
import utils from '@/widget/utils'

import app from '@/widget/app'

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
    cgShareC:{
      type: String,
      default: ""
    },
    $salePrice:{
      type: Number,
      default: 0
    },
    $totalAmt:{
      type: Number,
      default: 0
    },
    goodsName:{
      type: String,
      goodsName: ""
    },
  },
  data() {
    return {
    scalePx:parseInt(document.documentElement.style.fontSize),
    // clientWidth: document.documentElement.clientWidth,
    // clientHeight:document.documentElement.clientHeight,
    // scaleWH: 0.65,
    // canvas:{},
    totalMoney:""


    }
  },
  watch: {

      cgShareC (newVal, oldVal) {
        console.log(this.cgShareC);
        this.qrcode()
        this.setBgImg()

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
         let url =  config.hostPath + "/activity/peopleGroups/detailGroups" +"?shareCode="+ this.cgShareC
         console.log(url,"what");
         new QRCode('qrcode', {
          width: this.scalePx * 4, // 设置宽度
          height: this.scalePx * 4, // 设置高度
          text: url
        })

    },

    setBgImg(){
      new Promise(function(resolve,reject){
        let qrEle = document.getElementById('qrcode')

      let qrChild = qrEle.querySelector('img')
          resolve(qrEle.querySelector('img'))
      }).then(function fulfilled(response){
        response.onload = () =>{
          let codeImg = document.querySelector(".qrCode_img")
               codeImg.style.backgroundImage = 'url('+response.src+')'
               let qrEle = document.getElementById('qrcode')
             let qrChild = qrEle.querySelector('img')
             qrEle.removeChild(qrChild)
        }
      })
    },

    closeRulePopup() {
      this.$emit('toggleRulePopup', false)
    }
  },
  created() {

     // setTimeout(() => {
     //   this.qrcode()
     //   this.setBgImg()
     // }, 0)
  }
}
</script>
