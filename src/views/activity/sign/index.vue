<template>
  <div class="pageView">
    <AppHeader :title="title"></AppHeader>
    <div class="scroll-view-wrapper" :class="{'visibility': pageView}">
      <!--背景-->
      <img class="img-background" :src="imgBg">
      <div class="layer" :style="{marginTop: this.showHeader() ? '0': '-.88rem'}">
        <!--标题-->
        <div class="title">{{userInfo.currentTitle}}</div>
        <!--礼物图标-->
        <div class="gift"><img src="./images/sign_gift.png"></div>
        <!--进度条-->
        <div class="progress-bar"><img :src="progressBar"></div>
        <!--交替灯光上-->
        <div class="img-wrap">
          <img src="./images/sign_light2.png"/>
          <img src="./images/sign_light.png"/>
        </div>
        <!--中奖轮播-->
        <div class="broadcast">
          <img src="./images/sign_horn.png">
        </div>
        <div class="broad-box">
          <p class="wordsLoop">
            {{broadWinners}}
          </p>
        </div>
        <!--红色气球-->
        <div class="red-ball"><img src="./images/sign_ball.png"></div>
        <!--拉杆-->
        <div class="img-rock">
          <img id='rockImg' src="./images/sign_rock1.png"/>
        </div>
        <!--抽奖列表-->
        <div class="game-goods-wrap">
          <div class="game-goods-list">
            <div class="game-goods" style="background: #ffffff;">
              <div class="game-goods-box" id="game1">
                <ul class="game-goods-ul">

                </ul>
              </div>
            </div>
            <div class="game-goods" style="background: #ffffff;">
              <div class="game-goods-box" id="game2">
                <ul class="game-goods-ul">

                </ul>
              </div>
            </div>
            <div class="game-goods" style="background: #ffffff;">
              <div class="game-goods-box" id="game3">
                <ul class="game-goods-ul">

                </ul>
              </div>
            </div>
          </div>
        </div>
        <!--交替灯光下-->
        <div class="img-wrap" style="top: 10.4rem">
          <img src="./images/sign_light.png"/>
          <img src="./images/sign_light2.png"/>
        </div>
        <!--经验值-->
        <div v-show="showGrowth" class="experience">
          <transition name="growthIn"><span v-if="showGrowth">+成长值{{initInfo.growth}}</span></transition>
        </div>
        <!--签到button-->
        <div class="buttons">
          <img @click="openAward" class="btn-awards"  src="./images/sign_award.png" />
          <img @click="signIn" class="btn-sign" src="./images/sign_click.gif" />
          <img @click="showRule = true" src="./images/sign_rule.png" />
        </div>
        <!--滑动区域-->
        <div class="slide">
          <ul class="category-head">
            <li v-for="item in awardsList" @click="openDeatil(item.id)">
              <img v-bind:src=item.imgBigSquare />
            </li>
          </ul>
        </div>

      </div>
    </div>

    <!--弹窗、活动规则-->
    <div class="rule" v-show="showRule">
      <div class="rule-content">
        <span class="btn-close" @click="showRule = false"><img src="./images/sign_close.png"></span>
        <div class="rule-body">
          {{initInfo.rule}}
        </div>
      </div>
    </div>

    <!--弹窗、是否中奖-->
    <div class="pop-up" v-show="showPop" v-cloak>
      <div class="content">
        <div class="title" v-if="signInfo.isAwarded">
          <p>恭喜您获得</p>
          <p>{{signInfo.name}}</p>
        </div>
        <div class="title" v-else>
          <p>很遗憾未中奖</p>
          <p>再接再厉，明天再来</p>
        </div>
        <div class="coupon">
          <img v-if="signInfo.isAwarded" :src="signInfo.imgSquare" />
          <img v-else src="./images/sign_mascot.png" />
        </div>
        <div :style="{marginTop: signInfo.isAwarded ? '0' : '.5rem'}" class="button" @click="showPop = false">
          <img src="./images/sign_iknow.png" />
        </div>
        <div v-if="signInfo.isAwarded" class="my-award" @click="openAward">
          <span>查看我的礼物></span>
        </div>

        <div class="btn-close" @click="showPop = false">
          <img src="./images/sign_close.png">
        </div>
      </div>
    </div>


  </div>
</template>

<script type="text/javascript">
  import AppHeader from '@/components/common/header'
  import utils from '@/widget/utils'
  import * as Model from '@/model/sign'


  export default {
    name: "index",
    data() {
      return {
        title: '每日签到',
        pageView: false,
        imgBg: '',
        userInfo: {},
        initInfo: {},
        progressBar: require('./images/sign_progress0.png'), // 签到进度条
        broadWinners: ' ',
        imgSquareList: [],
        gameArr: [],
        gameDefaults: {
          'gameLen': 3,
          'game_pagesize': 16,//生成多少圈同样的东西
          'zj_arr': { //中奖数组，第一个表示是否中奖，第二个中奖号码
            'is_win': 2,
            'number': 1
          }
        },
        temSquareList: [],
        awardsList: [], //滑动大图
        rules: '',
        showRule: false,
        awardNum: '',
        showGrowth: false,
        signInfo: {},
        showPop: false //中奖弹窗
      }
    },
    components: {AppHeader},
    created () {
      // console.log(location.href);
    },
    mounted () {
      // 判断是否是ios还是安卓手机用来加载背景
      if (utils.ios()) {
        this.imgBg = require('./images/sign_background_iphone.jpg');
      } else if (utils.android()) {
        this.imgBg = require('./images/sign_background_android.jpg');
      }
      this.getInit();
      this.getUserInfo();
    },
    methods: {
      // 如果是app就往下移
      showHeader () {
        if (utils.isApp()) {
          if (utils.query('hideHead') == 0 && utils.getVersion() < 5320) {
            return true
          } else {
            return false
          }
        } else if (utils.weixin() || utils.nativeQQ()) {
          return false
        } else {
          return true
        }
      },
      getUserInfo () {
        Model.getUserInfo({
          type: 'GET'
        }).then((result) => {
          this.pageView = true;
          const data = result.data
          if (result.code == 0 ) {
            this.userInfo = data;
            // 进度条
            this.progressBar = require(`./images/sign_progress${this.userInfo.currentCount}.png`);
            // 抽奖池
            this.temSquareList = data.awards;
            for (let i in result.data.awards){
              this.imgSquareList.push(result.data.awards[i].imgSquare);
            }

            // 创造游戏
            this.createGame();
          }
        })
      },
      getInit () {
        Model.getInit({
          type: 'GET'
        }).then((result) => {
          this.pageView = true;
          const data = result.data
          if (result.code == 0 ) {
            this.initInfo = data;

            // 广播
            for (let i in this.initInfo.broadCardList) {
              this.broadWinners = this.broadWinners + this.initInfo.broadCardList[i];
            }
            this.awardsList = this.initInfo.awards;
          }
        })
      },

      // 开始签到
      signIn () {
        Model.signIn({
          type: 'POST'
        }).then((result) => {
          const data = result.data
          if (result.code == 0) {
            this.signInfo = data
            console.log('signInfo', this.signInfo)
            // 是否中奖
            this.gameDefaults.zj_arr.is_win = data.isAwarded ? 1 : 2;

            // 中奖number
            for (let i = 0, j = this.temSquareList.length; i < j; i++){
              if (result.data.id == this.temSquareList[i].id) {
                this.awardNum = i;
              };
            }
            // 显示成长值
            this.showGrowth = true,
            setTimeout(() => {
              this.showGrowth = false
            }, 4500)

            setTimeout(() => {
              this.showPop = true
            }, 5000)


            // 游戏开始
            this.luckGame();
            // 拉霸动效
            document.getElementById('rockImg').src = require('./images/sign_rock.gif');
          }
        })
      },
      // 去详情页
      openDeatil (id) {
        location.href = `/activity/sign/detail?id=${id}`
      },
      // 去奖品页面
      openAward () {
        location.href = `/activity/sign/award`
      },

      // 创造游戏
      createGame () {
        this.getHeight();
        this.setLi(this.gameDefaults);
        this.pushLi(this.gameArr);
      },

      // 获取高度
      getHeight () {
        var w_config = {
          'w': document.body.clientWidth,
          'h': document.body.clientHeight
        }
        this.game_list_item_h = (w_config.w * 320 / 750 * 0.4 * 0.9).toFixed(2);
      },

      // 设置奖品
      setLi (settings) {
        for (var j = 1; j <= settings.game_pagesize; j++) {
          for (var i = 1; i <= this.imgSquareList.length; i++) {
            this.gameArr.push({'type': j, 'index': i, 'src': this.imgSquareList[i-1]});
          }
        }
      },

      //写入，初始化奖品的滚动
      pushLi (arr) {
        let vm = this;
        var html_str = '';
        for (let i = 0; i < arr.length; i++) {
          html_str += '<li style="height:' + 1.5 + 'rem; position: relative; width:100%; text-align: center" data-index="' + arr[i]['index'] + '" data-type="' + arr[i]['type'] + '"><img style="width:' + 1.3 + 'rem" src="' + arr[i]['src'] + '"></li>';
        }
          var gameList = document.getElementsByClassName('game-goods-ul')
          var len = gameList.length
          for (var i = 0; i<len; i+=1) {
            gameList[i].innerHTML = html_str
            gameList[i].style.transform = 'translate(0px, -' + 1.2 + 'rem) translateZ(0px)'
            gameList[i].style.transitionDuration = '0ms'
          }
      },

      // 开始游戏
      luckGame () {
        let vm = this;
        // ms控制一共时间、y来控制速度
        //如果中奖
        if (this.gameDefaults.zj_arr.is_win == 1) {

          let gameList = document.getElementsByClassName('game-goods-ul')
          for (let i =0, j = gameList.length; i<j; i+=1) {
            let y = 6 * 1.5 * vm.temSquareList.length + 1.2 - 1.5 + (this.awardNum * 1.5)
            setTimeout(function () {
                gameList[i].style.transitionDuration = '4000ms'
                gameList[i].style.transform = 'translate(0px, -' + y + 'rem) translateZ(0px)'

            }, i * 300);
          }
        } else {
          let numRand = this.randNum(this.gameDefaults);
          let gameList = document.getElementsByClassName('game-goods-ul')
          for (let i =0, j = gameList.length; i<j; i+=1) {
            let y0 = (numRand[0] * 1.5) + 1.5 * (this.gameDefaults.gameLen + 0.38) * 10;
            let y1 = (numRand[1] * 1.5) + 1.5 * (this.gameDefaults.gameLen + 0.38) * 10;
            let y2 = (numRand[2] * 1.5) + 1.5 * (this.gameDefaults.gameLen + 0.38) * 10;

            setTimeout(function () {
                gameList[i].style.transitionDuration = '4000ms'
                if (i == 0) {
                  gameList[i].style.transform = 'translate(0px, -' + y0 + 'rem) translateZ(0px)'
                }
                if (i == 1) {
                  gameList[i].style.transform = 'translate(0px, -' + y1 + 'rem) translateZ(0px)'
                }
                if (i == 2) {
                  gameList[i].style.transform = 'translate(0px, -' + y2 + 'rem) translateZ(0px)'
                }
              }, i * 300);
          }
        }
      },
      // 得到不中奖时候的随机数
      randNum (settings) {
        let a = Math.floor(Math.random() * settings.gameLen);
        let b = Math.floor(Math.random() * settings.gameLen);
        let c = Math.floor(Math.random() * settings.gameLen);
        let arr = [];
        if (a == b || a == 0 || b == 0 || c == 0) {
          return this.randNum(settings);
        } else {
          return arr = [a, b, c];
        }
      },






    }
  }
</script>

<style scoped lang="scss">
  @import './styles/luckyGame.scss';
  .img-background {
    width: 100%;
    z-index: 1
  }
  .layer {
    position: absolute;
    z-index: 99;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
  .title {
    position: relative;
    top: 4.8rem;
    width: 100%;
    text-align: center;
    font-size: 0.3rem;
    font-weight: 600;
    color: rgba(255,255,255,1);
    line-height: 0.42rem;
    text-shadow: 0px 0px 0px rgba(159,159,159,0.5);
  }
  .progress-bar {
    position: absolute;
    top: 5.3rem;
    left: 1.2rem;
    text-align: center;
  }
  .progress-bar img {
    width: 5rem;
  }
  .gift {
    position: absolute;
    top: 4.65rem;
    left: 5.7rem;
  }

  .img-wrap {
    position: absolute;
    top: 6.1rem;
  }
  .img-wrap img {
    width: 7.5rem;
    position: absolute;
  }
  .img-wrap img:first-child {
    animation: img_wrap 2s linear 0s infinite;
    -webkit-animation: img_wrap 2s linear 0s infinite; // 自定义动画名为h1,8s完成该动画，匀速执行该动画，立即执行，循环执行动画
  }

  .img-wrap img:nth-child(2) {
    animation: img_wrap 2s linear 1s infinite;
    -webkit-animation: img_wrap 2s linear 1s infinite;
  }

  @keyframes img_wrap {
    0% {
      opacity: 1;
    }
    25% {
      opacity: 1;
    }
    50% {
      opacity: 1;
    }
    75% {
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  }
  .broad-box {
    top: 6.3rem;
    position: relative;
    background: #E4A100;
    border-top-right-radius: .2rem;
    border-bottom-right-radius: .2rem;
    width: 4.56rem;
    left: 1.82rem;
    overflow: hidden;
  }
  .broad-box img {
    height: .3rem;
    margin-left: .05rem;
  }
  /*文字滚动动画*/
  .wordsLoop {
    position: relative;
    height:0.36rem;
    font-size:0.24rem;
    font-weight:400;
    line-height:0.34rem;
    color: #fff;
    display: inline-block;
    /*overflow: hidden;*/
    /*text-overflow: ellipsis;*/
    white-space: nowrap;
    animation: 60s wordsLoop linear infinite normal;
  }

  @keyframes wordsLoop {
    0% {
      transform: translateX(220px);
      -webkit-transform: translateX(220px);
    }
    100% {
      transform: translateX(-100%);
      -webkit-transform: translateX(-100%);
    }
  }

  @-webkit-keyframes wordsLoop {
    0% {
      transform: translateX(220px);
      -webkit-transform: translateX(220px);
    }
    100% {
      transform: translateX(-100%);
      -webkit-transform: translateX(-100%);
    }
  }
  .broadcast {
    position: absolute;
    padding-left: .15rem;
    height: .36rem;
    top: 6.718rem;
    width: .8rem;
    left: 1.1rem;
    background: #E4A100;
    border-top-left-radius: .2rem;
    border-bottom-left-radius: .2rem;
  }
  .broadcast img{
    margin-top: .04rem;
    width: .4rem;
    left: 1.1rem;
  }

  .game-goods-ul li {
    height: 1.2rem;
    //margin-top: 0.15rem;
    top: -0.1rem;
    position: relative;
    width: 100%;
  }
  .game-goods-ul li img {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    height: 1.2rem;
    width: auto;
  }
  .red-ball {
    position: absolute;
    left: 5.9rem;
    top: 6.6rem;
    z-index: 99;
  }
  .buttons {
    position: absolute;
    display: flex;
    top: 11.2rem;
    width: 5.5rem;
    left: .95rem;
    align-items: center;
    justify-content: space-between;
  }
  .buttons .btn-sign {
    width: 3rem;
  }
  .buttons .btn-awards {
    width: 1rem;
  }

  .slide {
    position: absolute;
    top: 13rem
  }
  .slide .category-head {
    display: inline;
    white-space: nowrap;
    overflow-x: scroll;
    float: left;
    overflow-y: hidden;
    height: 1.9rem;
    width: 6rem;
    margin-left: 0.7rem;
    padding-top: 0.15rem;
    border-radius: 15px;
    box-shadow: 0px 0px 5px 1px #F0AA00 inset

  }
  .slide .category-head li {
    display: inline-block;
    padding-left: 10px;
    width: 1.5rem
  }
  .slide .category-head li img {
    width: 1.5rem;
  }

  /* 弹窗 */
  .rule {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.4);
    -webkit-animation-name: fadeIn;
    -webkit-animation-duration: 0.4s;
    animation-name: fadeIn;
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* 弹窗内容 */
  .rule .rule-content {
    background-size:100% 100%;
    background-image: url('./images/sign_popu.png');
    margin-top: 1rem;
    width: 6.2rem;
    height: 8rem;
    background-color: #fefefe;
    -webkit-animation-name: slideIn;
    -webkit-animation-duration: 0.4s;
    animation-name: slideIn;
    animation-duration: 0.4s;
    border-radius: .2rem;
  }
  .rule .rule-content .btn-close {
    position: absolute;
    top: 12rem;
    left: 3.4rem;
  }
  .rule .rule-content .rule-body {
    font-size: .3rem;
    padding: 0.3rem 0.5rem;
    height: 8rem;
    overflow: scroll;
    white-space: pre-line;
  }

  .rule .rule-content .rule-body::-webkit-scrollbar {display:none}

  @-webkit-keyframes fadeIn {
    from {
      opacity: 0
    }
    to {
      opacity: 1
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0
    }
    to {
      opacity: 1
    }
  }
  .img-rock {
    position: absolute;
    top: 7.6rem;
    left: 6.57rem;
  }
  .img-rock img {
    width: 1rem;
  }
  .experience {
    position: absolute;
    top: 10.6rem;
    color: red;
    z-index: 98;
    justify-content: center;
    display: flex;
    width: 100%;
    font-size: .3rem;
  }
  /*成长值动效*/
  .growthIn-enter-active, .growthIn-leave-active {
    transition: opacity .8s;
  }
  .growthIn-enter, .growthIn-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  /*弹窗*/
  .pop-up {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .5);
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: .5s linear;
    -webkit-transition: .5s linear;
    .lyf-close {
      margin: 25% 0 10px 83%;
      position: relative;
      width: 32px;
      height: 32px;
      border: 1px solid #4e4d4d;
      border-radius: 50%;
      background-color: #ffffff;
      &::before {
        content: '';
        display: block;
        position: absolute;
        left: 50%;
        top: 50%;
        width: 16px;
        height: 1px;
        background: #4e4d4d;
        transform: translateX(-50%) rotate(45deg);
        -webkit-transform: translateX(-50%) rotate(45deg);
      }
      &::after {
        content: '';
        display: block;
        position: absolute;
        left: 50%;
        top: 50%;
        width: 16px;
        height: 1px;
        background: #4e4d4d;
        transform: translateX(-50%) rotate(-45deg);
        -webkit-transform: translateX(-50%) rotate(-45deg);
      }
    }
    .lyf-rule-con {
      margin: 0 auto;
      width: 73%;
      max-width: 630px;
    }
  }
  .pop-up .content {
    background-size:100% 100%;
    background-image: url('./images/sign_popu.png');
    width:4.48rem;
    height:5.14rem;
    background-color: #fefefe;
    -webkit-animation-name: slideIn;
    -webkit-animation-duration: 0.4s;
    animation-name: slideIn;
    animation-duration: 0.4s;
    border-radius: .2rem;
    display: flex;
    justify-content: center;
  }
  .pop-up .content .title {
    position: absolute;
    color: #000000;
    font-size: 0.27rem;
    top: 4.5rem
  }
  .pop-up .content .coupon {
    position: absolute;
    width:1.9rem;
    top: 5.5rem;
  }
  .pop-up .content .coupon img {
    width:1.9rem;
  }
  .pop-up .content .button {
    position: absolute;
    width: 2.7rem;
    top: 7.5rem;
  }
  .pop-up .content .my-award {
    position: absolute;
    width: 1.6rem;
    height: 0.34rem;
    font-size: 0.24rem;
    top: 8.5rem;
    font-weight:400;
    line-height:0.34rem;
    color: #000000;
    border-bottom: 2px solid #000000;
  }
  .pop-up .content .btn-close {
    position: absolute;
    top: 10rem;
  }
  .pop-up .content .btn-close img {
    width:0.5rem;
    height:0.5rem;
  }

</style>
