<template>
<div class="pageView">
  <AppHeader :title="title">
  </AppHeader>
  <div class="scroll-view-wrapper" :class="{'visibility': pageView}">
   <Banner :bannerList="dgDescription.pics"></Banner>
   <div class="detail_description">
     <div class="detail_des_text1">
       {{dgDescription.name}}
     </div>
     <div class="detail_des_text2">
       {{dgDescription.subtitle}}
     </div>
     <div class="detail_des_prize">
       <div class="dd_prize_style">
         团
       </div>
       <div class="dd_prize_name">
         团购价
       </div>
       <div class="dd_prize_number">
         ¥{{dgDescription.salePrice}}/盒
       </div>
       <div class="dd_prize_rebate">

         {{dgDescription.saleDiscount}}折
       </div>
       <div class="dd_prize_rebate">

         付款后7天内发货
       </div>

     </div>

   </div>
   <div class="number_description">
     <div class="n_d_number">
       数量：{{dgDescription.productNum}}盒
     </div>
     <div class="n_d_prize">
       总价：{{dgDescription.totalAmount}}元
     </div>


   </div>
   <div class="tipText">
     更多团购更多折扣，详情联系客服400-8819-777
   </div>
   <div class="buy_now" @click= "initiateOrder" v-if = "dgDescription.grouponStatus == 1">
     ¥{{dgDescription.totalAmount}} 立即购买

   </div>

   <div class="buy_now nobuy_now" v-if = "dgDescription.grouponStatus == 2" >
     商品已售罄

   </div><div class="buy_now nobuy_now" v-if = "dgDescription.grouponStatus == 3">
    暂不销售

   </div>
   <CircleLoad :loadedshow="loadedshow"></CircleLoad>

  </div>
</div>
</template>

<script type="text/javascript">
import AppHeader from '@/components/common/header'

import * as Model from '@/model/peopleGroups'

import utils from '@/widget/utils'

import config from '@/config/index'

import Banner from '@/components/peopleGroups/banner.vue'

import app from '@/widget/app'

import CircleLoad from '@/components/peopleGroups/circleLoad'


import {
  mapGetters,
  mapActions
} from 'vuex'

import common from '@/widget/common'

export default {
  data() {
    return {
      title: "商品详情",
      pageView: true,
      pick: true,
      firstSection:false,
      determineTitle:1,
      choose_botton:true,
      peopleGroups_banner:[],
      dgUrlOj:{},
      dgDescription:{},
      loadedshow:false


    }
  },
  components: {
    AppHeader,
    Banner,
    CircleLoad,
  },
  computed: {
    ...mapGetters({
      'headerMenu': 'getHeaderMenu'
    })
  },
  methods: {
    ...mapActions([
      'updateHeaderMenu',
      'updateShareMenu'
    ]),

    /**
     *  查询字符串方法
     */
    paramsFormat(url) {
        var qInd = url.indexOf('?');
        var sharpInd = url.indexOf('#'); //路由
        var search = "";
        var paramsList = [];
        var paramsObj = {};

        if (qInd >= 0) {
          if (sharpInd > 0) {
            search = url.substring(qInd + 1, sharpInd);
          } else {
            search = url.substring(qInd + 1);
          }
          paramsList = search.split('&');
          for (var ind in paramsList) {
            var param = paramsList[ind];
            if(param) {
              var pind = param.indexOf("=");
              if (pind >= 0) {
                paramsObj[param.substring(0, pind)] = param.substr(pind + 1);
              } else {
                paramsObj[param] = "";
              }
            }

          }
        }
        return paramsObj;
      },

      /**
       *  获取shareCode
       */
   markCode(){
      let dgUrl = window.location .href

      this.dgUrlOj = this.paramsFormat(dgUrl)

   },

   /**
    *  初始化请求
    */
   detailGroup(){
     this.loadedshow = true
       Model.detailGroup({
         type: 'POST',
         data: {
           shareCode:this.dgUrlOj.shareCode,
         }
       }).then((result) => {
             const data = result.data
         if (result.code == 0) {
           this.loadedshow = false
           this.peopleGroups_banner = data.pics
           this.dgDescription = data
         } else if (result.code == -1) {

         }
       })

   },

   /**
   *立即购买
    */
   initiateOrder(){

       app.loginAction()
       this.loadedshow= true
       Model.initiateOrder({
         type: 'POST',
         data: {
           shareCode:this.dgUrlOj.shareCode,
           businessType:8,
         }
       }).then((result) => {
             const data = result.data
         if (result.code == 0) {
           this.loadedshow= false
           console.log("gui");
           location.href = "/pay/pay.html" + "?" +"signCode="+ this.dgUrlOj.shareCode
         } else if (result.code == -1) {

         }
       })

   },




  },
  created() {
    this.markCode()
    this.detailGroup()

  }
}
</script>

<style lang="scss">
@import './styles/common.scss';
.detail_description{
  font-family: PingFangSC;
  margin-top: .2rem;
  font-weight:normal;
  padding: .2rem;
  border-bottom: solid .16rem #FAFAFA;
}
.detail_des_text1{
  color: #333333;
  font-size: .32rem;
  font-weight: bold;
}
.detail_des_text2{
  color: #B2B2B2;
  font-size: .24rem;

}
.detail_des_prize{
  display:flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: .3rem;
  padding-bottom: .2rem;
}
.dd_prize_style{
  padding-left: .03rem;
  padding-right: .03rem;
  border-radius: .05rem;
  color: #FFFFFF;
  font-size: .2rem;
  background: #FF6900;
  flex: 0 0 auto;
}
.dd_prize_name{
  color: #333333;
  font-size: .28rem;
  margin-left: .1rem;
  flex: 0 0 auto;
}
.dd_prize_number{
  color:  #FF6900;
  font-size: .3rem;
  margin-left: .1rem;
  flex: 0 0 auto;
}
.dd_prize_rebate{
  color:  #FF6900;
  font-size: .3rem;
  margin-left: .1rem;
  flex: 0 0 auto;
}

.number_description{
  font-family: PingFangSC;
  padding: .2rem;
  border-bottom: solid 5px #FAFAFA;
}
.n_d_number,.n_d_prize{
  display: inline-block;
  color: #333333;
  font-size: .3rem;
}
.n_d_prize{
  margin-left: .3rem;
}
.tipText{
  padding: .1rem .2rem;

  font-family: PingFangSC;
  color: #333333;
  font-size: .28rem;
  background: #FCF7D6;

}
.buy_now{
  text-align: center;
  width: 90%;
  height:.6rem;
  line-height: .6rem;
  margin: .1rem auto .2rem;
  font-size: .32rem;
  color: #fff;
  background: linear-gradient(to right , #FF8E0C,#FF8E0C,#FF761A,#FF5E28);
  border-radius: .3rem;
}
.nobuy_now{
  background: #B2B2B2;
}


</style>
