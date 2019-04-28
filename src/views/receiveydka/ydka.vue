<template>
  <div class="pageView">
    <AppHeader :title="title" :isBorder="isBorder" :backFn="backAction">
    </AppHeader>
    <div class="scroll-view-wrapper" :class="{'visibility': pageView, 'scroll_view_hidden': imageValidate || isPopup}">
      <div class="ydka-wrapper" id="ydkaWrapper">
        <div class="ydka-pic ydka-pic2">
        </div>
        <div class="ydka-write ydka-pic4">
          <div class="ydka-register-input">
            <input type="tel" maxlength="13" autocomplete="off" v-model="mobile" class="font-b" placeholder="输入手机号"/>
          </div>
          <div class="ydka-register-input">
            <input type="tel" maxlength="4" autocomplete="off" v-model.trim="params.smsCode" class="font school-register-msg" placeholder="请输入验证码"/>
            <button class="font" :disabled="!isClickCode" @click="openImageValidate">{{codeText}}</button>
          </div>
          <div class="ydka-register-input">
            <input type="tel" maxlength="6" autocomplete="off" v-model="params.randomCode" class="font-b school-register-msg" placeholder="请输入随机码"/>
          </div>
          <div class="ydka-register-button" @click="submitAction">
           <p>我要来伊份</p>
          </div>

          <div class="ydka-register-rule" >
              <div class="rule-title">
                <span class="heng-line"></span><span class="rule-title-content">领取说明</span><span class="heng-line"></span>
              </div>
              <p>1.领取到的伊点卡可以在“来伊份APP/我的钱包/伊点卡”中查看使用</p>
              <p>2.非会员领取优惠券时设置的手机号即为登录账户</p>
          </div>

        </div>
      </div>
      <ImageValidate
        @startCountTime="startCountTime"
        :captchasType="captchasType"
        :mobile="params.mobile">
      </ImageValidate>
      <!-- <SchoolRule
        @togglePopup="togglePopup"
        :isPopup="isPopup">
      </SchoolRule> -->
      <YdkaLayer
      :isPopup="isPopup"
      :downloadLink = "downloadLink">
    </YdkaLayer>
    </div>
  </div>
</template>

<script type="text/javascript">

  import {mapGetters, mapActions} from 'vuex'

  import AppHeader from '@/components/common/header'

  import app from '@/widget/app'

  import utils from '@/widget/utils'

  import ImageValidate from '@/components/common/imageValidate'

  import validate from '@/widget/validate'

  import * as Model from '@/model/activity'

  import config from '@/config/index'

  import SchoolRule from '@/components/school/rule'

  import YdkaLayer from '@/components/receiveydka/layer'


  export default {
    data() {
      return {
        title: '',
        isBorder: true,
        pageView: true,
        isClickCode: true,
        codeText: '验证码',
        params: {
          mobile: '',
          smsCode: '',
          randomCode:'',
        },
        isPopup: false,
        captchasType: 7,
        downloadLink: ''
      }
    },
    computed: {
      ...mapGetters({
        'imageValidate': 'getImageValidate'
      }),
      mobile: {
        get () {
          return this.params.mobile
        },
        set (val) {
          const newVal = utils.trim(val)
          return this.params.mobile = utils.replaceMobile(newVal)
        }
      }
    },
    components: {
      AppHeader,
      ImageValidate,
      SchoolRule,
      YdkaLayer
    },
    methods: {
      ...mapActions([
        'updateImageValidate'
      ]),
      /**
       * 显示活动说明
       */
      // togglePopup (val) {
      //   utils.appViewFixed()
      //   this.isPopup = val
      // },
      backAction () {
        if (utils.isApp()) {
          app.back()
        } else {
          location.href = '/index.html'
        }
      },
      startCountTime () {
        if (!this.isClickCode) {
          return
        }
        this.isClickCode = false

        let times = 60

        this.codeText = times + 's'
        const countTimeTimer = setInterval(() => {
          times--
          this.codeText = times + 's'

          if(times == 0) {
            this.isClickCode = true
            this.codeText = '验证码'
            clearInterval(countTimeTimer)
          }
        },1000)

        this.updateImageValidate(false)

        this.countTimeTimer = countTimeTimer
      },
      openImageValidate () {
        const {
          mobile
        } = this.params

        const mobileStr = utils.trim(mobile)

        if (!mobileStr) {
          this.$toast('请输入手机号码')
          return
        }

        if (!validate.isMobile(mobileStr)) {
          this.$toast('请输入正确的手机号码')
          return
        }

        this.updateImageValidate(true)

      },
      submitAction () {
        const {
          mobile,
          smsCode,
          randomCode,
        } = this.params
       console.log(randomCode);
        const mobileStr = utils.trim(mobile)
        const smsCodeStr = utils.trim(smsCode)
        const randomCodeStr = utils.trim(randomCode)

        if (!mobileStr) {
          this.$toast('请输入手机号码')
          return
        }
        if (!randomCodeStr) {
          this.$toast('请输入随机码')
          return
        }

        if (!validate.isMobile(mobileStr)) {
          this.$toast('请输入正确的手机号码')
          return
        }
        if (!smsCodeStr) {
          this.$toast('请输入短信验证码')
          return
        }

        if (!validate.isMessageCode(smsCodeStr)) {
          this.$toast('请输入正确的短信验证码')
          return
        }
        this.receiveYidianka()
      },
      /**
       * 获取活动优惠券
       */
      receiveYidianka () {
        const {
          mobile,
          smsCode,
          randomCode
        } = this.params
        const phone = utils.trim(mobile)
        this.$showPageLoading()
        Model.receiveYidianka({
          type: 'POST',
          data: {
            mobile:phone,
            kaptchCode: smsCode,
            password:randomCode,

            // id: config.schoolId,
            // source: config.source
          }
        }).then((result) => {
          this.$hidePageLoading()
          if (result.code == 0) {
            this.isPopup = true
          }else if (result.code == -1) {
              this.$toast(result.msg)
          }
        })
      },
      /**
       * 获取下载app链接
       */
      getDownloadLink () {
        Model.getDownloadLink({
          type: 'GET',
          cache: true,
          expires: 60 * 60 * 1000,
          data: {
            id: config.schoolId
          }
        }).then((result) => {
          const data = result.data

          if (result.code ==  0 && data) {
            this.downloadLink = data.download_url
          }
        })
      }

    },
    created () {
      this.getDownloadLink()

    }
  }

</script>

<style lang="scss">
  .ydka-wrapper{
    background: #FF9800;
  }
  .ydka-pic{

    img {
      width: 100%;
    }
  }
  .ydka-write{
      padding: .16rem .9rem .2rem;
  }
  .ydka-pic2{
    height: 3.4rem;
    background: url(./images/yidianka.jpg) no-repeat;
    background-size: cover;
  }

  // .ydka-pic4{
  //   padding: .16rem .9rem 0;
  //   background: url(./images/school_bg4.jpg) no-repeat;
  //   background-size: cover;
  //   height: 2.59rem;
  // }
  .ydka-register-input{
    height: .98rem;
    border-radius: .15rem;
    // border: .05rem solid #3aa7a2;
    display: flex;
    align-items: center;
    background: #fff;
    justify-content: space-between;
    padding: 0 .27rem;
    margin-top: .2rem;
    button{
      width: 1.4rem;
      height: .56rem;
      line-height: .56rem;
      background: #FFE119;
      border-radius: .1rem;
      color: #6B3E19;
      &:disabled{
        background: #888888;
      }
    }

    // &:last-child{
    //   margin-top: .36rem;
    // }
    input{
      width: 100%;
      padding: .16rem 0 .2rem 0;
      height: 100%;
      &::-webkit-input-placeholder{
        color: #afafaf;
        letter-spacing: 0;
      }
    }
    .school-register-msg{
      flex:1;
      letter-spacing: .05rem;
    }
  }

  .ydka-register-button{
    height: .98rem;
    border-radius: .15rem;
    // border: .05rem solid #3aa7a2;
    display: flex;
    align-items: center;
    background: #FFE400;
    justify-content: center;
    padding: 0 .27rem;
    margin-top: .2rem;
    color: #89611A;
    font-size: .36rem;
    font-family: HYQiHei-GZS;
  }
  .ydka-register-rule{

    color: #fff;

    margin-top: .8rem;
    .rule-title{
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: .5rem;
    }
    .rule-title-content{
      font-size: .3rem;
      color: #fff;
      margin: auto .2rem;
    }
    .heng-line{
      display: block;
      height: .01rem;
      flex: 1 1 auto;
      background: #c46b00;
    }
    p{
      margin-bottom: .2rem;
    }
  }


  .school-pic2{
    height: 2.48rem;
    // background: url(./images/school_bg2.jpg) no-repeat;
    background-size: cover;
  }
  .school-pic3{
    margin-top: -1px;
    height: 3.54rem;
    // background: url(./images/school_bg3.jpg) no-repeat;
    background-size: cover;
  }
  .school-pic5{
    padding-top: .27rem;
    // background: url(./images/school_bg5.jpg) no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    height: 3.65rem;
    span{
      width: 4.54rem;
      height: .9rem;
      // background: url(./images/school_btn.png) no-repeat;
      background-size: 100% auto;
    }
  }

</style>
