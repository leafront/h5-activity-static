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
        <div class="cg_structure_body" v-show="skeleton">
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


        <div class="cg_structure_body" v-show="skeleton">
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

        <div class="cg_structure_body" v-show="skeleton">
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




        <div class="cg_structure_body" v-show="skeleton">
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

        <div class="cg_structure_body" v-show="skeleton">
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

        <div class="cg_second_body_description" id="createGroups-scroll">
          <LazyLoad :list="createGroupsInt" :options="{ele:'pic-lazyLoad',scrollEle: 'createGroups-scroll'}">

            <div class="s_body_des" v-for="(item, index) in createGroupsInt">
              <div class="s_body_des_detail">
                <!-- <div class="s_body_detail_left pic-lazyLoad" :data-src="item.pics[0].imageUrl"> -->
                  <div class="s_body_detail_left pic-lazyLoad" >

                </div>
                <div class="s_body_detail_right">
                  <div class="s_body_detail_right_top">
                    <div class="s_body_detail_right1">
                      {{item.name}}
                    </div>
                    <div class="s_body_detail_right2">
                      零售价 ¥{{item.mpPrice}}
                    </div>
                    <div class="s_body_detail_right3">
                      团购时间 {{item.grouponStartTime}}
                    </div>
                  </div>
                  <div class="s_body_detail_right_bottom">
                    <div class="s_body_detail_right4_left">
                      <span class="prize prize_des">奖</span><span class="prize prize_num">{{item.grouponPrice}}元</span>1/每盒
                    </div>
                    <div class="s_body_detail_right4_right" @click="showRule(item)">
                      去赚钱
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </LazyLoad>
        </div>
      </div>

      <!-- 导航的第一部门内容结束 -->
      <!-- 导航第二部分内容开始 -->

      <div class="cg_another_body" v-show="secondSection">

        <div class="cg_anby_circle" v-for="(item, index) in createGroupsList">
          <div class="cg_ss_body_title" v-show="(determineTitle == index)">
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
                    {{item.name}}
                  </div>
                  <div class="s_body_detail_right2">
                    零售价 ¥{{item.mpPrice}}
                  </div>
                  <div class="s_body_detail_right3">
                    团购时间 {{item.grouponStartTime}}
                  </div>
                </div>
                <div class="s_body_detail_right_bottom">
                  <div class="s_body_detail_right4_left">
                    <span class="prize prize_des">奖</span><span class="prize prize_num">{{item.reward}}元</span>1/每盒
                  </div>
                  <div class="s_body_detail_right4_right" @click="showRule(item)">
                    去赚钱
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="cg_another_child">
            <div class="child_description" v-for="($item, $index) in pointerList[index]">
              <div class="child_description_left">
                <p class="child_lf_text">团{{$index + 1}}</p>
                <p class="child_lf_prize">¥{{$item.totalAmt}}盒，{{$item.salePrice}}盒，¥206/盒</p>
              </div>
              <div class="child_description_right">
                <div class="child_share" @click="showShareComponent($item)">
                  分享
                </div>
                <div class="child_delete" @click="deleteGroupon(index,$item,$index)">
                  删除
                </div>
              </div>
            </div>
            <div class="choose_botton" v-show="choose_botton[index] == index" @click="chooseBotton(2,index)">
              展开
            </div>
            <div class="choose_botton" v-show="!(choose_botton[index] == index)" @click="chooseBotton(1,index)">
              收起
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--  商品部分结束-->

    <ShareImg :rulePopup="rulePopup" :cgShareC="cgShareC" @toggleRulePopup="toggleRulePopup"></ShareImg>
    <Rule :ruleText="ruleText" :grouponPrice="grouponPrice" :mpPrice="mpPrice" @toggleRuleText="toggleRuleText" @sendGroup="initiateGroup"></Rule>
    <Sure :sureChoose="sureChoose" @toggleSureChoose="toggleSureChoose" @qrcodeShare="qrcodeShare" @shareAction="shareAction"></Sure>
    <UIShare></UIShare>
    <CircleLoad :loadedshow="loadedshow"></CircleLoad>



  </div>
</div>
</template>

<script type="text/javascript">
import AppHeader from '@/components/common/header'

import LazyLoad from '@/components/widget/lazyLoad'

import * as Model from '@/model/peopleGroups'

import app from '@/widget/app'

import utils from '@/widget/utils'

import config from '@/config/index'

import ShareImg from '@/components/peopleGroups/shareImg'

import Rule from '@/components/peopleGroups/rule'

import Sure from '@/components/peopleGroups/sure'

import UIShare from '@/components/widget/ui-share'

import CircleLoad from '@/components/peopleGroups/circleLoad'



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
      secondSection: false,
      determineTitle: 0,
      choose_botton: [],
      rulePopup: false,
      ruleText: false,
      sureChoose: false,
      skeleton: true,
      createGroupsInt: [],
      createGroupsList: [], //我的团父级数组
      childList: [],
      childList1: [],
      pointerList: [],
      grouponProductId: "",
      cgShareC: "",
      dtGroupsUrl: config.hostPath + "/activity/peopleGroups/detailGroups",
      loadedshow: false,
      grouponPrice: "",
      mpPrice: "",

    }
  },
  components: {
    AppHeader,
    ShareImg,
    Rule,
    Sure,
    LazyLoad,
    UIShare,
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
     * 固定导航条效果
     */

    fixedNa() {
      let scrollHeight = document.querySelector('.cg_first_section').clientHeight
      let navigatorBar = document.querySelector('.cg_navigation')
      window.addEventListener('scroll', () => {
        if (document.documentElement.scrollTop > scrollHeight) {
          navigatorBar.style.cssText = "position:fixed; width:100%;top:.88rem;z-index:999;"
        } else {
          navigatorBar.style.cssText = "position:static;"
        }
      }, false)
    },

    showShareComponent(val) {
      this.cgShareC = val.shareCode
      this.sureChoose = true
    },

    /**
     *  删除
     */

    deleteGroupon(num, val, index) {
      this.loadedshow = true
      Model.deleteGroupon({
        type: 'POST',
        data: {
          activityId: val.grouponActivityId
        }
      }).then((result) => {
        if (result.code == 0) {
          this.loadedshow = false
          this.$toast('删除成功')
          this.childList[num].splice(index, 1)
          if (index < 1) {
            this.childList1[num].splice(index, 1)
          }
        } else if (result.code == -1) {
        }
      })
    },

    toggleRulePopup(val) {
      this.rulePopup = val

    },
    showRule(item) {
      this.ruleText = true
      this.grouponProductId = item.grouponProductId
      this.grouponPrice = item.grouponPrice
      this.mpPrice = item.mpPrice
    },
    toggleRuleText(val) {
      this.ruleText = val
    },
    toggleSureChoose(val) {
      this.sureChoose = val
    },
    qrcodeShare(val) {
      this.rulePopup = val
    },

    chooseBotton(val,index) {
      if (val == 1) {
        this.choose_botton[index] = index
        this.pointerList = this.childList1
      } else if (val == 2) {
        this.choose_botton[index] = "a"
        this.pointerList = this.childList
      }

    },

    /**
     * share operation
     */
    shareAction() {

      if (!(utils.isApp() || utils.weixin())) {
        this.$toast('请在APP或微信中打开分享')
        return
      }
      this.dtGroupsUrl = this.dtGroupsUrl + "?shareCode=" + this.cgShareC
      const shareConfig = {
        link: this.dtGroupsUrl,
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

    /**
     *  初始化接口
     */

    groupsInt() {

      this.skeleton = true
      Model.groupsInt({
        type: 'POST',
        data: {
          ut: "f0240dc74259859cc983f642716bc56109",
        }
      }).then((result) => {
        if (result.code == 0) {
          this.skeleton = false
          console.log(this.skeleton);
          this.createGroupsInt = result.data.listObj

        } else if (result.code == -1) {

        }
      })

    },

    groupsList(val) {
      Model.groupsList({
        type: 'POST',
        data: {
          ut: "f0240dc74259859cc983f642716bc56109",
        }
      }).then((result) => {
        if (result.code == 0) {
          this.loadedshow = false
          if (val == 1) {
            this.$toast('添加成功')
          }
          let groupList = result.data.listObj
          this.createGroupsList = groupList

          for (var i = 0; i < groupList.length; i++) {
            let clist = groupList[i].activityVOList
            this.choose_botton.push(i)
            this.childList.push(clist)
            this.childList1.push(clist.slice(0, 2))

          }
          this.pointerList = this.childList1
        } else if (result.code == -1) {

        }
      })

    },

    /**
     *  发起团购接口
     */
    initiateGroup(val) {
      this.loadedshow = true

      Model.initiateGroup({
        type: 'POST',
        data: {
          ut: "f0240dc74259859cc983f642716bc56109",
          productNum: val.number,
          salePrice: val.prize,
          grouponProductId: this.grouponProductId

        }
      }).then((result) => {
        if (result.code == 0) {
        } else if (result.code == -1) {
        }
      }).then(() => {
        this.groupsList(1)
      })
    },
  },
  created() {
    this.groupsInt()
    this.groupsList()

    setTimeout(() => {
      this.fixedNa()
    }, 0)
  }
}
</script>

<style lang="scss">
@import './styles/common.scss';
</style>
