<template>
<div class="pageView">
  <AppHeader :title="title" :isBorder="isBorder">
  </AppHeader>
  <div class="scroll-view-wrapper koi_bg" :class="{'visibility': pageView}">
    <div class="region_header">
      <div class="region_rule" @click="jumpRule">
        <span class="rule_style r_style1">!</span >
        <span class="rule_style r_style2">规则</span>
        <span class="rule_style r_style3"></span>
      </div>
    </div>
    <div class="region_first koi_common">
      <div class="region_first_header com_fst">
        <span>翻</span>
        <span>倍</span>
        <span>合</span>
        <span>成</span>
        <span>推</span>
        <span>荐</span>
      </div>

      <div class="f_section_loading" v-show="loadValue">

        <div class="loading_img">

        </div>

        <p class="loading_des">方案计算中请稍等...</p>
      </div>

      <div class="f_section" v-show="!loadValue">

        <!-- 第一部分 -->
        <div class="region_first_body1" v-show="regionFst">
          <div class="fst_bd_description">
            <p>您的种子券还不够合成锦鲤券哦~ </p>
            <p>快去做任务收集吧！</p>
          </div>
          <div class="fst_bd_botton" @click="jumpKoi">
            收集种子券
          </div>
        </div>
        <!-- 第一部分结束 -->

        <!-- 第二部分 -->
        <div class="region_first_other" v-show="!regionFst">
          <div class="region_first_body2" v-show="bdOther">
            <div class="fst_bd2_content ">
              <p class="bd2_cont_title">面额最大抵更多</p>
              <!-- 前两个 -->

              <div class="bd2_cont_body" v-for="(item, index) in unionMaxList">
                <div class="list_circle">
                </div>
                <div class="list_text">
                  <p>{{item.title}}*{{item.couponNum}}张 </p>
                  <p v-if="item.couponValue === 120">今日剩余<span class="text_style">{{limitNum120}}</span>张</p>
                  <p v-else-if="item.couponValue === 100">今日剩余<span class="text_style">{{limitNum100}}</span>张</p>
                  <p v-else-if="item.couponValue === 50">今日剩余<span class="text_style">{{limitNum50}}</span>张</p>


                </div>
              </div>
              <!-- 前两个结束 -->

              <!-- 后面内容 -->

              <div class="bd2_cont_body" v-for="(item, index) in unionMaxList1" v-show="otherArr">
                <div class="list_circle">
                </div>
                <div class="list_text">
                  <p>{{item.title}}*{{item.couponNum}}张 </p>
                  <p v-if="item.couponValue === 120">今日剩余<span class="text_style">{{limitNum120}}</span>张</p>
                  <p v-else-if="item.couponValue === 100">今日剩余<span class="text_style">{{limitNum100}}</span>张</p>
                  <p v-else-if="item.couponValue === 50">今日剩余<span class="text_style">{{limitNum50}}</span>张</p>

                </div>
              </div>
              <!-- 后面内容结束 -->

              <div class="bd2_cont_point" v-show="prompt" @click="promptClick(1)">
                <div class="point_arrow point_pt">展开</div>
              </div>
              <div class="bd2_cont_point" v-show="promptI" @click="promptClick()">
                <div class="point_arrow point_ptI">收起</div>
              </div>
            </div>

            <div class="fst_bd2_btn" @click="selectWh(1)">
              <div class="inner_circle" v-show="innerCle">

              </div>
            </div>
          </div>
          <!-- 第二部分 -->
          <div class="region_first_body2" v-show="bdOther1">
            <div class="fst_bd2_content ">
              <p class="bd2_cont_title">精打细算不浪费</p>
              <!-- 前两个 -->

              <div class="bd2_cont_body" v-for="(item, index) in unionFullList">
                <div class="list_circle">
                </div>
                <div class="list_text">
                  <p>{{item.title}}*{{item.couponNum}}张 </p>
                  <p v-if="item.couponValue === 120">今日剩余<span class="text_style">{{limitNum120}}</span>张</p>
                  <p v-else-if="item.couponValue === 100">今日剩余<span class="text_style">{{limitNum100}}</span>张</p>
                  <p v-else-if="item.couponValue === 50">今日剩余<span class="text_style">{{limitNum50}}</span>张</p>

                </div>
              </div>

              <!-- 前两个结束 -->

              <!-- 后面内容 -->
              <div class="bd2_cont_body" v-for="(item, index) in unionFullList1" v-show="otherArr1">
                <div class="list_circle">
                </div>
                <div class="list_text">
                  <p>{{item.title}}*{{item.couponNum}}张 </p>
                  <p v-if="item.couponValue === 120">今日剩余<span class="text_style">{{limitNum120}}</span>张</p>
                  <p v-else-if="item.couponValue === 100">今日剩余<span class="text_style">{{limitNum100}}</span>张</p>
                  <p v-else-if="item.couponValue === 50">今日剩余<span class="text_style">{{limitNum50}}</span>张</p>
                </div>
              </div>

              <!-- 后面内容结束 -->



              <div class="bd2_cont_point" v-show="prompt1" @click="promptClick1(1)">
                <div class="point_arrow point_pt">展开</div>
              </div>
              <div class="bd2_cont_point" v-show="prompt1I" @click="promptClick1()">
                <div class="point_arrow point_ptI">收起</div>
              </div>

            </div>
            <div class="fst_bd2_btn" @click="selectWh(2)">
              <div class="inner_circle" v-show="innerCle1">
              </div>
            </div>
          </div>
          <div class="fst_bd_botton" @click="union()">
            立即合成
          </div>
        </div>
        <!-- 第二部分结束 -->
      </div>


    </div>

    <div class="region_second koi_common">
      <div class="regionSec_header com_fst">
        <span>我</span>
        <span>的</span>
        <span>锦</span>
        <span>鲤</span>
        <span>券</span>
      </div>

      <div class="regionSec_body1" v-show="myCouponList.length <= 0">
        <div class="by1_image">

        </div>
        <p class="by1_description">您还未合成锦鲤券，快去合成吧！</p>
      </div>

      <div class="regionSec_body" v-for="(item, index) in myCouponList" v-show="myCouponList.length > 0">
        <div class="b_left">
          ￥<span class="lf_text">{{item.couponValue}}</span>

        </div>
        <div class="b_center">
          <p class="ct_text1">{{item.title}}</p>
          <p class="ct_text2">{{item.desc}} </p>
          <p class="ct_text2">有效期:{{item.effectiveEndTimeStr}}</p>

        </div>
        <div class="b_right b_right1" v-show="item.type == 2">
          已使用
        </div>
        <div class="b_right  " v-show="item.type == 1">
          未使用
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script type="text/javascript">
import AppHeader from '@/components/common/header'

import app from '@/widget/app'

import utils from '@/widget/utils'

import * as Model from '@/model/koi'

export default {
  data() {
    return {
      title: '合成锦鲤券',
      loadValue: true,
      pageView: true,
      isBorder: true,
      regionFst: false,
      otherArr: false,
      otherArr1: false,
      prompt: false,
      promptI: false,
      prompt1: false,
      prompt1I: false,
      unionMaxList: [],
      unionMaxList1: [],
      unionFullList: [],
      unionFullList1: [],
      myCouponList: [],
      showUnionType: "",
      limitNum100: "",
      limitNum120: "",
      limitNum50:"",
      bdOther: false,
      bdOther1: false,
      selectNum: 1,
      innerCle: true,
      innerCle1: false,


    }
  },
  components: {
    AppHeader
  },
  methods: {


    jumpRule() {
      location.href = "http://m.laiyifen.com/view/h5/1003081001000067.html?1539920083525"
    },

    jumpKoi() {
      location.href = "/activity/koi/index"
    },
    /*
     * 选取合成方式
     */
    selectWh(n) {

      if (n == 1) {
        this.selectNum = 1
        this.innerCle = true
        this.innerCle1 = false
      } else if (n == 2) {
        this.selectNum = 2
        this.innerCle = false
        this.innerCle1 = true

      }

    },
    /*
     *提示点击事件
     */
    promptClick(i) {
      if (i === 1) {
        this.prompt = false
        this.otherArr = true
        this.promptI = true
      } else {
        this.prompt = true
        this.otherArr = false
        this.promptI = false
      }
    },

    promptClick1(i) {
      if (i === 1) {
        this.prompt1 = false
        this.otherArr1 = true
        this.prompt1I = true
      } else {
        this.prompt1 = true
        this.otherArr1 = false
        this.prompt1I = false
      }
    },



    /*
     * 数据处理函数
     */

    handleData(unionMaxList, unionFullList, myCouponList, showUnionType, limitNum120, limitNum100,limitNum50) {
      this.myCouponList = myCouponList
      this.limitNum100 = limitNum100
      this.limitNum120 = limitNum120
      this.limitNum50 = limitNum50
      this.decideShow(showUnionType)
      if (unionMaxList.length && unionMaxList.length > 2) {
        this.prompt = true
        this.unionMaxList = unionMaxList.splice(0, 2)
        this.unionMaxList1 = unionMaxList
      } else {
        this.unionMaxList = unionMaxList
      }
      if (unionFullList.length && unionFullList.length > 2) {
        this.prompt1 = true
        this.unionFullList = unionFullList.splice(0, 2)
        this.unionFullList1 = unionFullList
      } else {
        this.unionFullList = unionFullList
      }
    },


    getKoiMerge() {
      Model.getKoiMerge({
        type: 'GET',
        data: {
          userId: "10009561",
        }

      }).then((result) => {
        const data = result.data
        if (result.code == 0 && data) {
          this.loadValue = false
          let {
            unionMaxList,
            unionFullList,
            myCouponList,
            showUnionType,
            limitNum120,
            limitNum100,
            limitNum50
          } = data
          this.handleData(unionMaxList, unionFullList, myCouponList, showUnionType, limitNum120, limitNum100,limitNum50)
        } else if (result.code == -3 || result.code == -4) {
          if (utils.isApp()) {
            location.href = 'lyf://home'
          } else {
            location.href = '/index.html'
          }


        } else {
          this.loadValue = false
          this.$toast(result.message)
        }
      })
    },

    /*
     * 合成
     */
    union() {
      let self = this
      if (!this.selectNum) {
        this.$toast("请选择合成方式")
        return
      }
      this.loadValue = true
      Model.union({
        type: 'POST',
        data: {
          unionType: this.selectNum
        }
      }).then((result) => {
        const data = result.data
        if (result.code == 0 && data) {
          this.loadValue = false
          let {
            unionMaxList,
            unionFullList,
            myCouponList,
            showUnionType,
            limitNum120,
            limitNum100,
            limitNum50
          } = data
          this.handleData(unionMaxList, unionFullList, myCouponList, showUnionType, limitNum120, limitNum100,limitNum50)
          this.$toast(result.message)
        } else if (result.code == -3 || result.code == -4) {
          if (utils.isApp()) {
            location.href = 'lyf://home'
          } else {
            location.href = '/index.html'
          }

        } else {
          this.loadValue = false
          this.$toast(result.message)
        }
      })
    },



    /*
     * 判端合成内容的显示
     */

    decideShow(m) {
      switch (m) {
        case 0:
          this.regionFst = true
          break;
        case 1:
          this.regionFst = false
          this.bdOther = true
          this.bdOther1 = false
          break;
        case 2:
          this.regionFst = false
          this.bdOther = true
          this.bdOther1 = true
          break;

      }
    },

  },
  created() {
    this.getKoiMerge()
  }
}
</script>
<style lang="scss">
@keyframes mycycle {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
.loading_img {
    width: 0.5rem;
    height: 0.5rem;
    margin: 0.6rem auto;
    background-image: url("/activity-static/images/kol_loading.png");
    background-size: 100%;
    background-repeat: no-repeat;
    transform: rotate(360deg);
    animation: mycycle 2s linear infinite;
}
.loading_des {
    width: max-content;
    margin: 0.6rem auto;
    font-size: 0.25rem;
    color: #fff;
}
.region_header {
    display: flex;
    justify-content: flex-end;
}
.region_rule {
    margin: 0.3rem 0.2rem;
    border: 0.02rem solid #FAF0D2;
    border-radius: 0.2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: max-content;
    color: #FAF0D2;
    padding-left: 0.2rem;
    padding-right: 0.2rem;
    margin-left: 1rem;
    .rule_style {
        display: inline-block;
        height: 0.4rem;
        line-height: 0.4rem;

    }
    .r_style1 {
        width: 0.3rem;
        height: 0.3rem;
        line-height: 0.3rem;
        border-radius: 50%;
        font-size: 0.25rem;
        background: #fff;
        color: #CA231B;
        text-align: center;
    }
    .r_style2 {
        font-size: 0.3rem;
        margin: auto .05rem;
    }
    .r_style3 {
        height: 0.1rem;
        width: 0.1rem;
        border: 0.02rem solid #fff;
        transform: rotate(45deg);
        border-left: 0;
        border-bottom: 0;
    }
}

.koi_bg {
    position: relative;
    background: #BC0104;
    box-sizing: border-box;
}

.koi_common {
    width: 94%;
    margin: 0.2rem auto;
    border: solid 0.06rem #680001;
    border-radius: 0.13rem;
    background: #960508;
}
.com_fst {
    width: max-content;
    margin: -.3rem auto 0.5rem;
}
.com_fst span {
    display: inline-block;
    width: 0.6rem;
    height: 0.6rem;
    font-size: 0.36rem;
    line-height: 0.6rem;
    font-family: PingFangSC;
    color: #B90A04;
    border-radius: 50%;
    text-align: center;
    background: linear-gradient(to bottom , #FFAB7C,#FED99F);
}
.fst_bd_description {
    width: max-content;
    font-size: 0.3rem;
    color: #FFFFFF;
    margin: 0.5rem auto;
    text-align: center;
}
.fst_bd_botton {
    width: 6.26rem;
    height: 0.8rem;
    margin: 0.3rem auto;
    text-align: center;
    padding-right: 0.2rem;
    background: linear-gradient(to right,#FEAB4B,#FEC57B);
    color: #A30001;
    font-size: 0.37rem;
    line-height: 0.8rem;
    border-radius: 0.1rem;
}
.region_first_body2 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 88%;
    margin: 0.2rem auto;
    background: #C90C10;
    padding: 0.2rem;
    color: #fff;
    font-size: 0.26rem;
    border-radius: 0.1rem;

}
.fst_bd2_content {
    position: relative;
    flex: 1 1 auto;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
.bd2_cont_body {
    display: flex;
    align-items: baseline;
}

.bd2_cont_title {
    font-size: 0.32rem;
    color: #FEC275;
}
.list_circle {
    content: "";
    width: 0.12rem;
    height: 0.12rem;
    border-radius: 50%;
    background: #ffff;
    margin-right: 0.1rem;
}
.list_text P{
  margin-bottom: .1rem;
}
.text_style {
    color: #FEC275;
}
.fst_bd2_btn {
    width: 0.32rem;
    height: 0.32rem;
    border-radius: 50%;
    border: solid 0.02rem #fff;
    display: flex;
    align-items: center;
    justify-content: center;
}
.inner_circle {
    width: 0.16rem;
    height: 0.16rem;
    border-radius: 50%;
    background: #fff;
}
.bd2_cont_point {
    position: absolute;
    bottom: 0;
    right: 0;
}
.point_arrow {
    position: relative;
}
.point_arrow:before {
    content: "";
    width: 0.2rem;
    height: 0.2rem;
    // background-image: url("/activity-static/images/koidown.png");
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center;
    position: absolute;
    right: -.25rem;
    top: 50%;
    transform: translate(0,-50%);
}
.point_pt:before {
    background-image: url("/activity-static/images/koldown.png");
}
.point_ptI:before {
    background-image: url("/activity-static/images/kolup.png");
}

// .point_arrow1 {
//     display: inline-block;
//     border: solid #FEC275;
//     border-width: 0.02rem;
//     border-left: 0;
//     border-top: 0;
//     width: 0.1rem;
//     height: 0.1rem;
//     transform: rotate(45deg);
//     margin-bottom: 0.08rem;
//     margin-left: 0.08rem;
// }

.region_second {
    margin-top: 1rem;
    padding-bottom: 0.1rem;
}
.by1_image {
    width: 3rem;
    height: 3rem;
    margin: 0.5rem auto;

    background-image: url("/activity-static/images/kolliyu.png");
    background-size: 100%;
    background-repeat: no-repeat;
}
.by1_description {
    width: max-content;
    margin: 0 auto;
    font-size: 0.3rem;
    color: #FFFFFF;
    font-family: PingFangSC;
}

.regionSec_body {
    width: 6.26rem;
    height: 1.64rem;
    margin: 0.2rem auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #BD0004;
    font-family: PingFangSC;
    background-image: url("/activity-static/images/koibg.png");
    background-size: 100%;
    background-repeat: no-repeat;
    padding-left: 0.2rem;
    padding-right: 0.2rem;
}
.b_left,
.b_right {
    flex: 0 0 auto;
}
.b_left {
    width: 1.5rem;
    font-size: 0.28rem;
    .lf_text {
        font-size: 0.59rem;
    }

}
.b_center {
    border-left: dashed 1px #BA0000;
    padding-left: 0.2rem;
    flex: 1 1 auto;
    font-size: 0.23rem;
    .ct_text1 {
        font-size: 0.26rem;
        font-weight: bold;
    }
}
.b_right {
    padding: 0 0.15rem;
    font-size: 0.23rem;
    border-radius: 0.2rem;
    color: #FFFFFF;
    background: #BA0000;
}
.b_right1 {
    background: #A8A8A8;
}
</style>
