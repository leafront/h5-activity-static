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
        broadWinners: ' '
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
            console.log('this.userInfo.currentCount', this.userInfo.currentCount);
            this.progressBar = require(`./images/sign_progress${this.userInfo.currentCount}.png`);
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
            console.info('initInfo', this.initInfo);
            // 广播
            for (let i in this.initInfo.broadCardList) {
              this.broadWinners = this.broadWinners + this.initInfo.broadCardList[i];
            }
          }
        })
      },

    }
  }
</script>

<style scoped lang="scss">
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

</style>
