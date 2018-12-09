<template>
<div class="pageView">
  <AppHeader :title="title">
  </AppHeader>
  <div class="scroll-view-wrapper" :class="{'visibility': pageView}">
   <Banner :bannerList="peopleGroups_banner"></Banner>
   <div class="detail_description">
     <div class="detail_des_text1">
       2019年新年礼盒-神来气旺礼盒1217g
     </div>
     <div class="detail_des_text2">
       好吃坚果大放送好吃坚果大放送
     </div>
     <div class="detail_des_prize">
       <div class="dd_prize_style">
         团
       </div>
       <div class="dd_prize_name">
         团购价
       </div>
       <div class="dd_prize_number">
         ¥206/盒
       </div>

     </div>

   </div>
   <div class="number_description">
     <div class="n_d_number">
       数量：200盒
     </div>
     <div class="n_d_prize">
       总价：¥41200
     </div>
   </div>
   <div class="buy_now">
     ¥41200 立即购买

   </div>

  </div>
</div>
</template>

<script type="text/javascript">
import AppHeader from '@/components/common/header'

import * as Model from '@/model/peopleGroups'

import utils from '@/widget/utils'

import config from '@/config/index'

import Banner from '@/components/peopleGroups/banner.vue'
let woqu = [
  {
    imageUrl:"http://images.laiyifen.com/trailbreaker/product/20160929/1482cfad-07db-44df-9c54-b4bb5234bf86_l.jpg?v=1.0",
    linkUrl:""
  },
  {
    imageUrl:"http://images.laiyifen.com/trailbreaker/product/20160929/fc5d9543-31c4-437f-a5d3-4ba032dc94ac_l.jpg?v=1.0",
    linkUrl:"",
  }
]


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

    }
  },
  components: {
    AppHeader,
    Banner,
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
  },
  created() {

    setTimeout(() => {
        this.peopleGroups_banner = woqu
    },3000)

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

.number_description{
  font-family: PingFangSC;
  padding: .2rem;
  border-bottom: solid 5px #FAFAFA;
}
.n_d_number,.n_d_prize{
  color: #333333;
  font-size: .3rem;
}
.buy_now{
  text-align: center;
  width: 90%;
  height:.6rem;
  line-height: .6rem;
  margin: .2rem auto;
  font-size: .32rem;
  color: #fff;
  background: linear-gradient(to right , #FF8E0C,#FF8E0C,#FF761A,#FF5E28);
  border-radius: .3rem;
}


</style>
