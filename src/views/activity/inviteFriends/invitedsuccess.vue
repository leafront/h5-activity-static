<template>
<div class="pageView">
  <AppHeader :title="title">
  </AppHeader>
  <div class="scroll-view-wrapper" :class="{'visibility': pageView}">
    <div>
      <div class="section_include">
        <div class="old_user_first">
          您已注册来伊份会员，推荐好友获得奖励
        </div>

        <div class="old_user_seconde">
          <span class="c_f" @click="weixinShare" v-if = "!jugementQQ">立即邀请</span>
          <span class="c_t" @click="jump">前往APP</span>
        </div>
      </div>
      <div class="section_f">
        <img  src=" /activity-static/images/invitedAdPosition.png" alt="">
      </div>
    </div>
    <UIShare></UIShare>
  </div>
</div>
</template>

<script type="text/javascript">
import AppHeader from '@/components/common/header'

import RedPackRule from '@/components/redpack/rule'

import utils from '@/widget/utils'

import common from '@/widget/common'

import app from '@/widget/app'

import * as Model from '@/model/invitation'

import config from '@/config/index'

import wx_share from './weixin_share'

import {mapGetters, mapActions} from 'vuex'

import UIShare from '@/components/widget/ui-share'

export default {
  data() {
    return {
      title: "邀请好友",
      pageView: true,
      invitationShareC:"",
      jugementQQ:!utils.weixin()
    }
  },
  components: {
    AppHeader,
      UIShare,
  },
  computed: {
    ...mapGetters({
      'headerMenu': 'getHeaderMenu'
    })
  },
  created() {
    // this.$showLoading()
    this.ajaxShareCode()




  },
  methods: {
    ...mapActions([
      'updateHeaderMenu',
      'updateShareMenu'
    ]),
    /*
    * 跳转
    */

    jump(){

      location.href = "https://lnk0.com/easylink/ELMhYZpk"
    },

/*
* 获取sharecode
*/
    ajaxShareCode(type){
       let self = this
      Model.getShareCode({
        type: 'GET',
        ut : app.getUserToken()
      }).then((result) => {
        const data = result.data
        if (result.code == 0 ) {
          this.invitationShareC = data.shareCode
         if (type===2 && this.invitationShareC) {
            this.shareConfig = wx_share.shareConfig.call(self)
              wx_share.weixinShare.call(self)


          }else if (type===2) {
            this.$toast("网络繁忙，请稍后再试!")
          }
        }
 })
   },

    /*
    *分享
    */
    weixinShare () {

      if(this.invitationShareC){

      this.shareConfig = wx_share.shareConfig.call(this)
        wx_share.weixinShare.call(this)
      }else {

        this.ajaxShareCode(2)
      }
    },
    /*
    *获取广告位
    */

    // getAdImg () {
    //   return Model.getAdImg({
    //     type: 'GET',
    //     data: {
    //       pageCode: 'H5_COUPON_ZONE_PAGE',
    //       adCode: 'coupons_banner',
    //       areaCode: common.getAreaCode().areaCode
    //     }
    //   }).then((result) => {
    //     const data = result.data
    //     if (result.code == 0 && data) {
    //       const coupons_banner = data.coupons_banner
    //       coupons_banner.forEach((item) => {
    //         item.imageUrl = utils.imgScale(item.imageUrl,85)
    //       })
    //       this.bannerList = coupons_banner
    //     } else {
    //       this.$toast(result.message)
    //     }
    //     return result
    //   })
    // },


  }
}
</script>

<style lang="scss">
.section_include{
  border-top: solid 1px #666666;
  background: white;
  margin-bottom: .2rem;
}
.old_user_first {
    padding-top: 0.3rem;
    text-align: center;
    font-size: 0.3rem;

    line-height: 1.5;

}
.old_user_seconde {
    margin-top: 0.3rem;
    padding-bottom: 0.3rem;
    text-align: center;
    font-size: 0.3rem;
    line-height: 2;
}
.old_user_seconde span {
    display: inline-block;
    padding: 0.1rem 0.6rem;
    border-radius: 1rem;

}
.old_user_seconde .c_f {
    background: linear-gradient(to right,#FCBF2D,#FCB72C,#FCA129,#FC7923);
    color: white;

}
.old_user_seconde .c_t {
    border: solid 1px #979797;
    margin-left: 0.3rem;
    color: #999999;
}
.section_f img {
    display: block;
    width: 100%;
}
</style>
