<template>
<div class="pageView">
  <AppHeader :title="title">
  </AppHeader>
  <div class="scroll-view-wrapper" :class="{'visibility': pageView}">
    <!-- 第一部分 -->
    <div class="cg_first_section">
      <div class="fc_detail">
        <p class="detail_information detail_1">0.00</p>
        <p class="detail_information detail_2">累计收益</p>
        <p class="detail_information detail_3">收益金明细</p>
      </div>
    </div>
    <!-- 第一部分结束 -->

    <!-- 导航条开始 -->
    <div class="cg_navigation">
      <div class="navigation_left" @click="pickItem(1)">
        <div class="na_left_text" :class="{'na_text': pick}">
          团购商品
        </div>
        <div class="na_left_style" :class="{'na_tyle': pick}">
        </div>
      </div>
      <div class="navigation_right" @click="pickItem(2)">
        <div class="na_right_text" :class="{'na_text': !pick}">
          我的团购
        </div>
        <div class="na_right_style" :class="{'na_tyle': !pick}">
        </div>
      </div>
    </div>
    <!-- 导航条结束 -->
    <!--  商品部分开始-->
    <div class="cg_second_section">
      <div class="cg_second_section_bg">

      </div>

      <div class="cg_second_section_body" v-show="firstSection">
        <div class="cg_ss_body_title">
          <span class="cg_ss_title1">团购商品</span>
          <span class="cg_ss_title2">分享越多收益越多</span>
        </div>
        <!-- 骨架部分 -->
        <div class="cg_structure_body" v-show ="skeleton">
          <div class="cg_structure">
            <div class="structure_content">
              <div class="stru_content_left">
              </div>
              <div class="stru_content_right">
                <div class="structure_right_top">
                  <div class="structure_right1">
                  </div>
                  <div class="structure_right2">
                  </div>
                  <div class="structure_right3">
                  </div>
                </div>

                <div class="structure_right_bottom">
                  <div class="structure_right4_left">
                  </div>
                  <div class="structure_right4_right">
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        <!-- 骨架部分结束 -->

        <div class="cg_second_body_description">
          <div class="s_body_des">
            <div class="s_body_des_detail">
              <div class="s_body_detail_left">

              </div>
              <div class="s_body_detail_right">
                <div class="s_body_detail_right_top">
                  <div class="s_body_detail_right1">
                    2019年新年礼盒A2019年新年礼盒A2019年新年礼盒A
                  </div>
                  <div class="s_body_detail_right2">
                    零售价 ¥168
                  </div>
                  <div class="s_body_detail_right3">
                    团购时间 12/04-12/05
                  </div>
                </div>
                <div class="s_body_detail_right_bottom">
                  <div class="s_body_detail_right4_left">
                    <span class="prize prize_des">奖</span><span class="prize prize_num">10元</span>1/每盒
                  </div>
                  <div class="s_body_detail_right4_right">
                    去赚钱
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="s_body_des">
            <div class="s_body_des_detail">
              <div class="s_body_detail_left">

              </div>
              <div class="s_body_detail_right">
                <div class="s_body_detail_right_top">
                  <div class="s_body_detail_right1">
                    2019年新年礼盒A2019年新年礼盒A2019年新年礼盒A
                  </div>
                  <div class="s_body_detail_right2">
                    零售价 ¥168
                  </div>
                  <div class="s_body_detail_right3">
                    团购时间 12/04-12/05
                  </div>
                </div>
                <div class="s_body_detail_right_bottom">
                  <div class="s_body_detail_right4_left">
                    <span class="prize prize_des">奖</span><span class="prize prize_num">10元</span>1/每盒
                  </div>
                  <div class="s_body_detail_right4_right">
                    去赚钱
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 导航的第一部门内容结束 -->
      <!-- 导航第二部分内容开始 -->

      <div class="cg_another_body" v-show = "secondSection">

        <div class="cg_anby_circle">

          <!-- 骨架部分 -->
          <div class="cg_structure_body" v-show ="skeleton1">
            <div class="cg_structure">
              <div class="structure_content">
                <div class="stru_content_left">
                </div>
                <div class="stru_content_right">
                  <div class="structure_right_top">
                    <div class="structure_right1">
                    </div>
                    <div class="structure_right2">
                    </div>
                    <div class="structure_right3">
                    </div>
                  </div>

                  <div class="structure_right_bottom">
                    <div class="structure_right4_left">
                    </div>
                    <div class="structure_right4_right">
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <!-- 骨架部分结束 -->


          <div class="cg_ss_body_title" v-show="!(determineTitle == 2)">
            <span class="cg_ss_title1">团购商品</span>
            <span class="cg_ss_title2">分享越多收益越多</span>
          </div>
          <div class="s_body_des">
            <div class="s_body_des_detail">
              <div class="s_body_detail_left">

              </div>
              <div class="s_body_detail_right">
                <div class="s_body_detail_right_top">
                  <div class="s_body_detail_right1">
                    2019年新年礼盒A2019年新年礼盒A2019年新年礼盒A
                  </div>
                  <div class="s_body_detail_right2">
                    零售价 ¥168
                  </div>
                  <div class="s_body_detail_right3">
                    团购时间 12/04-12/05
                  </div>
                </div>
                <div class="s_body_detail_right_bottom">
                  <div class="s_body_detail_right4_left">
                    <span class="prize prize_des">奖</span><span class="prize prize_num">10元</span>1/每盒
                  </div>
                  <div class="s_body_detail_right4_right">
                    去赚钱
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="cg_another_child">
            <div class="child_description">
              <div class="child_description_left">
                <p class="child_lf_text">团1</p>
                <p class="child_lf_prize">¥41200/200盒，¥206/盒¥41200/200盒，¥206/盒</p>
              </div>
              <div class="child_description_right">
                <div class="child_share">
                  分享
                </div class="child_delete">
                删除
              </div>
            </div>

            <div class="child_description">
              <div class="child_description_left">
                <p class="child_lf_text">团1</p>
                <p class="child_lf_prize">¥41200/200盒，¥206/盒¥41200/200盒，¥206/盒</p>
              </div>
              <div class="child_description_right">
                <div class="child_share">
                  分享
                </div class="child_delete">
                删除
              </div>
            </div>
            <div class="choose_botton">
              展开
            </div>
            <div class="choose_botton" v-show="!choose_botton">
              收起
            </div>
          </div>

        </div>

        <div class="cg_anby_circle">
          <div class="cg_ss_body_title" v-show="!(determineTitle == 2)">
            <span class="cg_ss_title1">团购商品</span>
            <span class="cg_ss_title2">分享越多收益越多</span>
          </div>
          <div class="s_body_des">
            <div class="s_body_des_detail">
              <div class="s_body_detail_left">

              </div>
              <div class="s_body_detail_right">
                <div class="s_body_detail_right_top">
                  <div class="s_body_detail_right1">
                    2019年新年礼盒A2019年新年礼盒A2019年新年礼盒A
                  </div>
                  <div class="s_body_detail_right2">
                    零售价 ¥168
                  </div>
                  <div class="s_body_detail_right3">
                    团购时间 12/04-12/05
                  </div>
                </div>
                <div class="s_body_detail_right_bottom">
                  <div class="s_body_detail_right4_left">
                    <span class="prize prize_des">奖</span><span class="prize prize_num">10元</span>1/每盒
                  </div>
                  <div class="s_body_detail_right4_right">
                    去赚钱
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="cg_another_child">
            <div class="child_description">
              <div class="child_description_left">
                <p class="child_lf_text">团1</p>
                <p class="child_lf_prize">¥41200/200盒，¥206/盒¥41200/200盒，¥206/盒</p>
              </div>
              <div class="child_description_right">
                <div class="child_share">
                  分享
                </div class="child_delete">
                删除
              </div>
            </div>

            <div class="child_description">
              <div class="child_description_left">
                <p class="child_lf_text">团1</p>
                <p class="child_lf_prize">¥41200/200盒，¥206/盒¥41200/200盒，¥206/盒</p>
              </div>
              <div class="child_description_right">
                <div class="child_share">
                  分享
                </div class="child_delete">
                删除
              </div>
            </div>
            <div class="choose_botton">
              展开
            </div>
            <div class="choose_botton" v-show="!choose_botton">
              收起
            </div>
          </div>

        </div>


      </div>




    </div>


    <!--  商品部分结束-->

    <ShareImg :rulePopup="rulePopup" @toggleRulePopup="toggleRulePopup" ></ShareImg>
    <Rule :ruleText="ruleText" @toggleRuleText="toggleRuleText"></Rule>
    <Sure :sureChoose="sureChoose" @toggleSureChoose="toggleSureChoose" @qrcodeShare="qrcodeShare" @shareAction="shareAction"></Sure>


  </div>
</div>
</template>

<script type="text/javascript">
import AppHeader from '@/components/common/header'

import * as Model from '@/model/peopleGroups'

import app from '@/widget/app'

import utils from '@/widget/utils'

import config from '@/config/index'

import ShareImg from '@/components/peopleGroups/shareImg'

import Rule from '@/components/peopleGroups/rule'

import Sure from '@/components/peopleGroups/sure'

import {
  mapGetters,
  mapActions
} from 'vuex'

import common from '@/widget/common'

export default {
  data() {
    return {
      title: "全民团购",
      pageView: true,
      pick: true,
      firstSection: true,
      secondSection:false,
      determineTitle: 1,
      choose_botton: true,
      rulePopup: false,
      ruleText: false,
      sureChoose: true,
      skeleton:false,
      skeleton1:false,
    }
  },
  components: {
    AppHeader,
    ShareImg,
    Rule,
    Sure

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
    toggleRulePopup(val) {
      this.rulePopup = val

    },
    toggleRuleText(val){
      this.ruleText = val
    },
    toggleSureChoose(val){
      this.sureChoose = val
    },
    qrcodeShare(val){
      console.log("啥111");
    this.rulePopup = val
    },
    /**
     * share operation
     */
    shareAction () {
      if (!(utils.isApp() || utils.weixin())) {
        this.$toast('请在APP或微信中打开分享')
        return
      }
      const shareConfig = {
        link: this.shareStrategyUrl,
        title: '官宣 锦鲤和双十一更配哦',
        description: '多张小劵合成翻倍大额劵，一笔订单减更多，免单劵、¥200劵、等各种超值劵等你来合',
        imgUrl: config.staticPath + '/activity-static/images/koi_share_icon.png',
        platforms: [
         "WechatMoments",
         "Wechat",
         "QQ",
         "QZone"
        ]
      }
      if (utils.loggedIn()) {
        app.shareAction.call(this, shareConfig, () => {

        })
      } else {
        app.loginAction()
      }
    },


    pickItem(val) {
      if (val == 1) {
        this.pick = true
        this.firstSection = true
        this.secondSection = false
      } else if (val == 2) {
        this.pick = false
        this.firstSection = false
        this.secondSection = true
      }
    },

  },
  created() {

  }
}
</script>

<style lang="scss">
@import './styles/common.scss';
</style>
