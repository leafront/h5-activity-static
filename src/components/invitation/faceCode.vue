<template>
    <div>
        <div class="ui-mask" id="worldcup-rule-mask" :class="{'active': rulePopup2}"></div>
        <!-- <span class="ui-shareimg-close" :class="{'active': rulePopup}" @click="closeRulePopup"></span> -->

        <div class="ui-shareimg-content" id="worldcup-rule" :class="{'active': rulePopup2}">
            <canvas class="cas" id="canvas2"></canvas>
            <div class="img_bottom" @click="generateImg" style="display: none">
                保存图片
            </div>
            <span class="ui-shareimg-close" :class="{'active': rulePopup2}" @click="closeRulePopup2"></span>

        </div>
        <div id="qrcode2"></div>

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
        // background: #fff;
        border-radius: 0.2rem;

    }
    #qrcode2{
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
            rulePopup2: {
                type: Boolean,
                default: false
            },
            invitationShareC2:{
                type: String,
                default: ""
            }
        },
        data() {
            return {
                scalePx2:parseInt(document.documentElement.style.fontSize),
                clientWidth2: document.documentElement.clientWidth,
                clientHeight2:document.documentElement.clientHeight,
                scaleWH2: 0.65,
                canvas:{},

            }
        },
        watch: {

            invitationShareC2 (newVal, oldVal) {
                this.qrcode()
                this.drawingCanvas()
            },


            rulePopup2() {

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
             * 生出图片
             */
            generateImg(){
                let imgUrl = this.canvas.toDataURL("image/png")
                if (utils.isApp()) {

                    app.postMessage('storgeQRcode',{
                        imgUrl,
                    },() => {
                        this.$toast("保存成功")
                    })
                }
            },

            /**
             * 二维码生成
             */
            qrcode() {
                console.log('hhhhh', this.invitationShareC2)
                let url =  config.hostPath + "/actives/online/invitationfriends/index.html" + "?" + "originCode" + "=" + this.invitationShareC2
                new QRCode('qrcode2', {
                    width: this.scalePx2 * 3.8, // 设置宽度
                    height: this.scalePx2 * 3.8, // 设置高度
                    text: url
                })

            },
            drawingCanvas() {
                /**
                 * canvas绘图
                 */
                const self = this
                let canvas = document.getElementById("canvas2")
                canvas.width = this.clientWidth2 * .8
                canvas.height = canvas.width / self.scaleWH2
                this.canvas = canvas
                let ctx = canvas.getContext("2d")
                ctx.fillStyle = "#fff"
                ctx.fillRect(0,0,canvas.width,canvas.height)

                const qrCodePromise = () => {
                    return new Promise((resolve,reject) => {
                        let img = new Image()
                        img.src = config.hostPath + '/activity-static/images/invate-window.png'

                        img.onload = () => {
                            console.log(1)
                            const imgScale = img.height / img.width
                            ctx.drawImage(img, 0, 0, self.clientWidth2 * .8, self.clientWidth2 * .8 * imgScale)
                            ctx.fillRect(self.clientWidth2 * .8/2-(this.scalePx2 * 2.3)/2 , self.clientWidth2 * .8*.673 ,this.scalePx2 * 2.3,this.scalePx2 * 2.3)
                            resolve(true)
                            console.log(2)
                        }
                    })
                }
                qrCodePromise().then(() => {
                    let qrEle = document.getElementById('qrcode2')
                    let qrChild = qrEle.querySelector('img')
                    console.log(qrChild);
                    let qrSrc = qrChild.src
                    if(!qrSrc){
                        qrChild.onload = () =>{
                            console.log(3)
                            qrSrc = qrChild.src
                            let qrImg = new Image()
                            qrImg.src = qrSrc
                            qrImg.onload = () => {
                                ctx.drawImage(qrImg , self.clientWidth2 * .8/2-(this.scalePx2 * 3.8)/2 , self.clientWidth2 * .8*.5 )
                            }
                            console.log(4)
                        }
                    }else if (qrSrc){
                        console.log(5)
                        let qrImg = new Image()
                        qrImg.src = qrSrc
                        qrImg.onload = () => {
                            ctx.drawImage(qrImg , self.clientWidth2 * .8/2-(this.scalePx2 * 3.8)/2 , self.clientWidth2 * .8*.5 )
                        }
                        console.log(6)
                    }

                })
                // img.onload = () => {
                //   const imgScale = img.height / img.width
                //
                //   ctx.drawImage(img, 0, 0, self.clientWidth2 * .6, self.clientWidth2 * .6 * imgScale);
                // }


                //   setTimeout(() =>{
                //       let qrEle = document.getElementById('qrcode')
                //     let qrChild = qrEle.querySelector('img')
                //     qrChild.onload = () =>{
                //       let qrSrc = qrChild.src
                //       console.log(qrSrc);
                //       if(qrSrc){
                //         let qrImg = new Image()
                //         qrImg.src = qrSrc
                //         qrImg.onload = () => {
                //           ctx.drawImage(qrImg , self.clientWidth2 * .8/2-(this.scalePx2 * 1.4)/2 , self.clientWidth2 * .8*1.05 )
                //         }
                //     }
                //     }
                // },0)
                //第三张图
                // let imgLogo = new Image()
                // imgLogo.src = config.hostPath + '/activity-static/images/qrcodelogo.png'
                // imgLogo.onload = () => {
                //   const logoScale = imgLogo.height / imgLogo.width
                //   let l_positionx = self.clientWidth2 * .8/2 - (self.scalePx2 * 2.5)/2
                //   let l_positionY = self.clientWidth2 * .8*1.1 + this.scalePx2 * 1.4
                //   let l_sizeW = self.scalePx2 * 2.5
                //   let l_sizeH = self.scalePx2 * 2.5 * logoScale
                //
                //   ctx.drawImage(imgLogo, l_positionx, l_positionY, l_sizeW, l_sizeH);
                // }
                //

            },
            closeRulePopup2() {
                this.$emit('toggleRulePopup2', false)
            }
        },
        created() {

            // setTimeout(() => {
            //   this.qrcode()
            //   this.drawingCanvas()
            // }, 0)
        }
    }
</script>
