<template>
  <div class="pageView">
    <AppHeader :title="title"></AppHeader>
    <div class="scroll-view-wrapper" :class="{'visibility': pageView}">
      <!--背景-->
      <img class="img-background" :src="imgBg">
      <div class="layer">
        <!--标题-->
        <div class="title">{{userInfo.currentTitle}}</div>
        <!--进度条-->
        <div class="progress-bar"><img :src="progressBar"></div>
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
    z-index: 99;
  }
  .title {
    top: 4.8rem;
    width: 100%;
    text-align: center;
    position: absolute;
    font-size: 0.3rem;
    font-weight: 600;
    color: rgba(255,255,255,1);
    line-height: 0.42rem;
    text-shadow: 0px 0px 0px rgba(159,159,159,0.5);
  }
  .progress-bar {
    width: 100%;
    top: 5.3rem;
    position: absolute;
    text-align: center;
  }

</style>
