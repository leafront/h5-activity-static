<template>
  <div class="pageView">
    <AppHeader :title="title"></AppHeader>
    <div class="scroll-view-wrapper" :class="{'visibility': pageView}">
      <!--背景-->
      <img class="img-background" :src="imgBg">
      <div class="layer" :style="{marginTop: this.showHeader() ? '0': '.88rem'}">
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
    position: relative;
    width: 100%;
    top: 4.2rem;
    text-align: center;
  }
  .gift {
    position: relative;
    top: 4.3rem;
    left: 5.6rem;
  }

  .img-wrap {
    position: relative;
    top: 4.4rem;
  }
  .img-wrap img {
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

</style>
