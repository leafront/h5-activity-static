<template>
  <div class="pageView">
    <AppHeader :title="title" :isBorder="isBorder" :backFn="backAction">
    </AppHeader>
    <div class="scroll-view-wrapper" :class="{'visibility': pageView, 'scroll_view_hidden': imageValidate || isPopup}">
      <div class="school-wrapper" id="schoolWrapper">
        <div class="school-pic school-pic1">
          <h4 class="font-b" @click="togglePopup(true)">活动说明</h4>
        </div>
        <div class="school-pic school-pic2"></div>
        <div class="school-pic school-pic3"></div>
        <div class="school-pic school-pic4">
          <div class="school-register-input">
            <input type="tel" maxlength="13" autocomplete="off" v-model="mobile" class="font-b" placeholder="输入手机号"/>
          </div>
          <div class="school-register-input">
            <input type="tel" maxlength="4" autocomplete="off" v-model.trim="params.smsCode" class="font school-register-msg" placeholder="验证码"/>
            <button class="font" :disabled="!isClickCode" @click="openImageValidate">{{codeText}}</button>
          </div>
        </div>
        <div class="school-pic school-pic5">
          <span @click="submitAction"></span>
        </div>
        <div class="school-pic">
          <img class="school-pic-bg6" src="./images/school_bg6.jpg"/>
        </div>
        <div class="school-pic">
          <img class="school-pic-bg7" src="./images/school_bg7.jpg"/>
        </div>
      </div>
      <ImageValidate
        @startCountTime="startCountTime"
        :captchasType="captchasType"
        :mobile="params.mobile">
      </ImageValidate>
      <SchoolRule
        @togglePopup="togglePopup"
        :isPopup="isPopup">
      </SchoolRule>
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

  export default {
    data() {
      return {
        title: '开学季',
        isBorder: true,
        pageView: false,
        isClickCode: true,
        codeText: '验证码',
        params: {
          mobile: '',
          smsCode: '',
        },
        isPopup: false,
        captchasType: 1,
        downloadLink: ''
      }
    },
    computed: {
      ...mapGetters({
        'headerMenu': 'getHeaderMenu',
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
      SchoolRule
    },
    methods: {
      ...mapActions([
        'updateImageValidate'
      ]),
      /**
       * 显示活动说明
       */
      togglePopup (val) {
        utils.appViewFixed()
        this.isPopup = val
      },
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
          smsCode
        } = this.params

        const mobileStr = utils.trim(mobile)
        const smsCodeStr = utils.trim(smsCode)

        if (!mobileStr) {
          this.$toast('请输入手机号码')
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
        this.receiveCoupon()
      },
      /**
       * 获取活动优惠券
       */
      receiveCoupon () {
        const {
          mobile,
          smsCode
        } = this.params
        const phone = utils.trim(mobile)
        this.$showPageLoading()
        Model.receiveCoupon({
          type: 'POST',
          data: {
            phone,
            code: smsCode,
            id: config.schoolId,
            source: config.source
          }
        }).then((result) => {
          const data = result.data
          this.$toast(result.message)
          const downloadLink = this.downloadLink
          this.$hidePageLoading()
          if (result.code == 0) {
            setTimeout(() => {
              if (downloadLink) {
                location.href = downloadLink
              }
            },2000)
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
      this.$showLoading()
      this.getDownloadLink()
      setTimeout(() => {
        this.$hideLoading()
        this.pageView = true
      },400)
    },
    mounted () {
      utils.scrollInput('schoolWrapper')
    }
  }

</script>

<style lang="scss">
  .school-wrapper{
    background: #b1d5cb;
  }
  .school-pic{
    img {
      width: 100%;
    }
  }
  .school-pic1 {
    position: relative;
    height: 3.15rem;
    background: url(./images/school_bg1.jpg) no-repeat;
    background-size: cover;
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
    background-size: cover;
    height: 2.59rem;
  }
  .school-register-input{
    height: .98rem;
    border-radius: .15rem;
    border: .05rem solid #3aa7a2;
    display: flex;
    align-items: center;
    background: #fff;
    justify-content: space-between;
    padding: 0 .27rem;
    button{
      width: 1.4rem;
      height: .56rem;
      line-height: .56rem;
      background: #b1313d;
      border-radius: .1rem;
      color: #fff;
      &:disabled{
        background: #888888;
      }
    }
    &:last-child{
      margin-top: .36rem;
    }
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
  .school-pic2{
    height: 2.48rem;
    background: url(./images/school_bg2.jpg) no-repeat;
    background-size: cover;
  }
  .school-pic3{
    margin-top: -1px;
    height: 3.54rem;
    background: url(./images/school_bg3.jpg) no-repeat;
    background-size: cover;
  }
  .school-pic5{
    padding-top: .27rem;
    background: url(./images/school_bg5.jpg) no-repeat;
    background-size: cover;
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
