<template>
  <div class="pageView">
    <AppHeader :title="title" :isBorder="isBorder" :backFn="backAction">
    </AppHeader>
    <div class="scroll-view-wrapper " :class="{'visibility': pageView}">
      <div class="school-pic school-pic1">
        <img class="school-pic-bg1" src="./images/school_bg1.jpg"/>
        <h4 class="font-b">活动说明</h4>
      </div>
      <div class="school-pic">
        <img class="school-pic-bg2" src="./images/school_bg2.jpg"/>
      </div>
      <div class="school-pic">
        <img class="school-pic-bg3" src="./images/school_bg3.jpg"/>
      </div>
      <div class="school-pic school-pic4">
        <div class="school-register-input">
          <input type="tel" class="font-b" placeholder="输入手机号"/>
        </div>
        <div class="school-register-input">
          <input type="tel" maxlength="4" minlength="4" class="font school-register-msg" placeholder="输入验证码"/>
          <button class="font">获取验证码</button>
        </div>
      </div>
      <div class="school-pic school-pic5">
        <span></span>
      </div>
      <div class="school-pic">
        <img class="school-pic-bg6" src="./images/school_bg6.jpg"/>
      </div>
      <div class="school-pic">
        <img class="school-pic-bg7" src="./images/school_bg7.jpg"/>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .school-pic{
    img {
      width: 100%;
      background: #f5f5f5;
    }
  }
  .school-pic1 {
    position: relative;
    h4 {
      position: absolute;
      top: .6rem;
      right: .3rem;
      text-decoration: underline;
      color: #5c6e55;
    }
  }
  .school-pic4{
    padding: .16rem .9rem 0;
    background: url(./images/school_bg4.jpg) no-repeat;
    background-size: 100% auto;
    height: 2.59rem;
  }
  .school-register-input{
    height: .98rem;
    border-radius: .15rem;
    border: .05rem solid #3aa7a2;
    padding: .2rem .27rem;
    display: flex;
    align-items: center;
    background: #fff;
    justify-content: space-between;
    button{
      width: 2rem;
      height: .56rem;
      line-height: .56rem;
      background: #b1313d;
      border-radius: .1rem;
      color: #fff;
    }
    &:last-child{
      margin-top: .36rem;
    }
    input{
      width: 100%;
      &::-webkit-input-placeholder{
        color: #afafaf;
        letter-spacing: 0;
      }
    }
    .school-register-msg{
      width: 2rem;
      letter-spacing: .05rem;
    }
  }
  .school-pic5{
    padding-top: .27rem;
    background: url(./images/school_bg5.jpg) no-repeat;
    background-size: 100% auto;
    display: flex;
    justify-content: center;
    height: 3.65rem;
    span{
      width: 4.54rem;
      height: .9rem;
      background: url(./images/school_btn.png) no-repeat;
      background-size: 100% auto;
    }
  }

</style>

<script type="text/javascript">

  import AppHeader from '@/components/common/header'

  import app from '@/widget/app'

  import utils from '@/widget/utils'

  export default {
    data() {
      return {
        title: '开学季',
        isBorder: true,
        pageView: true
      }
    },
    components: {
      AppHeader
    },
    methods: {
      backAction () {
        if (utils.isApp()) {
          app.back()
        } else {
          location.href = '/index.html'
        }
      }
    },
    created () {

    }
  }

</script>
