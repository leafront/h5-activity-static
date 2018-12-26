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

        <!--签到button-->
        <div style="position: absolute; top: 11rem; left: 3rem;">
          <button @click="signIn">签到</button>
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
        temSquareList: []
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
            console.log('result', result.data);
            this.luckGame();
          }
        })
      },

      // 创造游戏
      createGame (startGame) {
        const defaults = {
          'gameLen': 3,
          'game_pagesize': 16, //生成多少圈同样的东西
          'zj_arr': { //中奖数组，第一个表示是否中奖，第二个中奖号码
            'is_win': 2,
            'number': 1
          }
        };



        this.getHeight();
        this.setLi(defaults);
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
        if (true) {
          // 抽奖中
          this.signing = true;
          this.gameDefaults.zj_arr.is_win = this.isAwarded ? 1 : 2;
          let vm = this;
          // ms控制一共时间、y来控制速度
          //如果中奖
          if (this.gameDefaults.zj_arr.is_win == 1) {
            // 第几个中奖
            // this.gameDefaults.zj_arr.number = vm.awardNumber;
            this.gameDefaults.zj_arr.number = 2;

            let gameList = document.getElementsByClassName('game-goods-ul')
            for (let i =0, j = gameList.length; i<j; i+=1) {
              let y = 6 * 1.5 * vm.temSquareList.length + 1.2 - 1.5 + (2 * 1.5)
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
        } else {
          console.log('游戏未开始');
        }
      },
      // 得到不中奖时候的随机数
      randNum (settings) {
        var a = Math.floor(Math.random() * settings.gameLen);
        var b = Math.floor(Math.random() * settings.gameLen);
        var c = Math.floor(Math.random() * settings.gameLen);
        var arr = [];
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

</style>
