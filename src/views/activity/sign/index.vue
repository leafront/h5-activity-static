<template>
  <div class="pageView">
    <AppHeader :title="title"></AppHeader>

    <div class="scroll-view-wrapper" :class="{'visibility': pageView}">
      <!--背景-->
      <img v-if="currentDay != 6" class="img-background" src="./images/sign_bg.jpg">
      <div v-if="currentDay != 6" class="layer" :style="{marginTop: this.showHeader() ? '0': '-.88rem'}">
        <!--底部文字-->
        <div class="annotation">{{annotation}}</div>
        <!--签到提醒-->
        <vswitch
                @changeSwitch = 'changeSwitch'
                :initSwitch="initSwitch"
                :isCancel = "isCancel"
                text="关闭提醒|开启提醒">
        </vswitch>
        <!--&lt;!&ndash;标题&ndash;&gt;-->
        <!--<div class="title">{{userInfo.currentTitle}}</div>-->
        <!--礼物图标-->
        <div class="gift"><img src="./images/sign_gift.png"></div>
        <!--第三天礼物图标-->
        <div v-if="currentDay == 2" class="gift-three"><img src="./images/sign_gift.png"></div>
        <!--进度条-->
        <div class="progress-bar"><img :src="progressBar"></div>
        <!--交替灯光上-->
        <div class="img-wrap">
          <img src="./images/sign_light2.png"/>
          <img src="./images/sign_light.png"/>
        </div>
        <!--中奖轮播-->
        <div class="broadcast">
          <img src="./images/sign_horn.png">
        </div>
        <div class="broad-box">
          <p class="wordsLoop">
            {{broadWinners}}
          </p>
        </div>
        <!--红色气球-->
        <div class="red-ball"><img src="./images/sign_ball.png"></div>
        <!--拉杆-->
        <div class="img-rock">
          <img id='rockImg' src="./images/sign_rock1.png"/>
        </div>
        <!--抽奖列表-->
        <div class="game-goods-wrap">
          <div class="game-goods-list">
            <div class="game-goods" style="background: #ffffff;">
              <div class="game-goods-box" id="game1">
                <ul class="game-goods-ul">

                </ul>
              </div>
            </div>
            <div class="game-goods" style="background: #ffffff;">
              <div class="game-goods-box" id="game2">
                <ul class="game-goods-ul">

                </ul>
              </div>
            </div>
            <div class="game-goods" style="background: #ffffff;">
              <div class="game-goods-box" id="game3">
                <ul class="game-goods-ul">

                </ul>
              </div>
            </div>
          </div>
        </div>
        <!--交替灯光下-->
        <div class="img-wrap" style="top: 9.9rem">
          <img src="./images/sign_light.png"/>
          <img src="./images/sign_light2.png"/>
        </div>
        <!--经验值-->
        <div v-show="showGrowth" class="experience">
          <transition name="growthIn"><span v-if="showGrowth">+成长值{{initInfo.growth}}</span></transition>
        </div>
        <!--签到button-->
        <div class="buttons">
          <img @click="openAward" class="btn-awards"  src="./images/sign_award.png" />
          <!--0 未签到、未分享  1 已签到、未分享  2 已签到、已分享、未抽奖 3 已签到、已分享、已抽奖-->
          <img v-show="userInfo.currentStatus == 0" id="btnClick" @click="signIn" class="btn-sign" src="./images/sign_click.gif" />
          <img v-show="userInfo.currentStatus == 1" @click="shareInfo" class="btn-sign" src="./images/sign_share.png" />
          <img v-show="userInfo.currentStatus == 2" id="btnClickAga" @click="signDraw" class="btn-sign" src="./images/sign_shared_draw.png" />
          <img v-show="userInfo.currentStatus == 3" class="btn-sign" src="./images/sign_drawed.png" />

          <img class="btn-rules" @click="showRule = true" src="./images/sign_rule.png" />
        </div>
        <!--滑动区域-->
        <div class="slide">
          <ul class="category-head">
            <li v-for="item in awardsList" @click="openDeatil(item.id)">
              <img v-bind:src=item.imgBigSquare />
            </li>
          </ul>
        </div>

      </div>

      <img v-if="currentDay == 6" class="img-background" src="./images/sign_bg_seven.jpg" />
      <div v-if="currentDay == 6" class="layer" :style="{marginTop: this.showHeader() ? '0': '-.88rem'}">
        <!--红包雨-->
        <div class="ser_home" id="ser_home">
          <ul class="red_packet" id="red_packet">
            <template v-for="(item, index) in liParams">
              <li :style="{ left: item.left1, animationDuration: item.durTime, webkitAnimationDuration: item.durTime}"
                  :class="item.cls" :data-index="index" @webkitAnimationEnd="removeDom">
                <a href='javascript:;'>
                  <i class="i1" :style="{ transform: item.transforms, webkitTransform: item.transforms}"></i>
                </a>
              </li>
              <li :style="{ left: item.left2, animationDuration: item.durTime, webkitAnimationDuration: item.durTime}"
                  :class="item.cls" :data-index="index" @webkitAnimationEnd="removeDom">
                <a href='javascript:;'>
                  <i class="i2" :style="{ transform: item.transforms, webkitTransform: item.transforms}"></i>
                </a>
              </li>
              <li :style="{ left: item.left3, animationDuration: item.durTime, webkitAnimationDuration: item.durTime}"
                  :class="item.cls" :data-index="index" @webkitAnimationEnd="removeDom">
                <a href='javascript:;'>
                  <i class="i3" :style="{ transform: item.transforms, webkitTransform: item.transforms}"></i>
                </a>
              </li>
              <li :style="{ left: item.left4, animationDuration: item.durTime, webkitAnimationDuration: item.durTime}"
                  :class="item.cls" :data-index="index" @webkitAnimationEnd="removeDom">
                <a href='javascript:;'>
                  <i class="i4" :style="{ transform: item.transforms, webkitTransform: item.transforms}"></i>
                </a>
              </li>
              <li :style="{ left: item.left5, animationDuration: item.durTime, webkitAnimationDuration: item.durTime}"
                  :class="item.cls" :data-index="index" @webkitAnimationEnd="removeDom">
                <a href='javascript:;'>
                  <i class="i5" :style="{ transform: item.transforms, webkitTransform: item.transforms}"></i>
                </a>
              </li>

            </template>
          </ul>
        </div>
        <!--底部文字-->
        <div class="annotation">{{annotation}}</div>
        <!--签到提醒-->
        <vswitch
                @changeSwitch = 'changeSwitch'
                :initSwitch="initSwitch"
                :isCancel = "isCancel"
                text="关闭提醒|开启提醒">
        </vswitch>
        <!--四个红包-->
        <div class="redbag1">
          <img src="./images/sign_redbag1.png">
        </div>
        <div class="redbag2">
          <img src="./images/sign_redbag3.png">
        </div>
        <div class="redbag3">
          <img src="./images/sign_redbag1.png">
        </div>
        <div class="redbag4">
          <img src="./images/sign_redbag4.png">
        </div>

        <!--礼物图标-->
        <div class="gift_seven"><img src="./images/sign_gift_seven.png"></div>
        <!--进度条-->
        <div class="progress-bar"><img :src="progressBar"></div>
        <!--交替灯光上-->
        <div class="img-wrap">
          <img src="./images/sign_light_seven2.png"/>
          <img src="./images/sign_light_seven.png"/>
        </div>
        <!--中奖轮播-->
        <div class="broadcast" style="background: #71091B">
          <img src="./images/sign_horn.png">
        </div>
        <div class="broad-box" style="background: #71091B">
          <p class="wordsLoop">
            {{broadWinners}}
          </p>
        </div>
        <!--红色气球-->
        <div class="red-ball"><img src="./images/sign_ball_seven.png"></div>
        <!--拉杆-->
        <div class="img-rock">
          <img id='rockImg' src="./images/sign_rock2.png"/>
        </div>
        <!--抽奖列表-->
        <div class="game-goods-wrap">
          <div class="game-goods-list">
            <div class="game-goods" style="background: #ffffff;">
              <div class="game-goods-box" id="game1">
                <ul class="game-goods-ul">

                </ul>
              </div>
            </div>
            <div class="game-goods" style="background: #ffffff;">
              <div class="game-goods-box" id="game2">
                <ul class="game-goods-ul">

                </ul>
              </div>
            </div>
            <div class="game-goods" style="background: #ffffff;">
              <div class="game-goods-box" id="game3">
                <ul class="game-goods-ul">

                </ul>
              </div>
            </div>
          </div>
        </div>
        <!--交替灯光下-->
        <div class="img-wrap" style="top: 9.9rem">
          <img src="./images/sign_light_seven.png"/>
          <img src="./images/sign_light_seven2.png"/>
        </div>
        <!--经验值-->
        <div v-show="showGrowth" class="experience-seven">
          <transition name="growthIn"><span v-if="showGrowth">+成长值{{initInfo.growth}}</span></transition>
        </div>
        <!--签到button-->
        <div class="buttons">
          <img @click="openAward" class="btn-awards"  src="./images/sign_award_seven.png" />
          <!--0 未签到、未分享  1 已签到、未分享  2 已签到、已分享、未抽奖 3 已签到、已分享、已抽奖-->
          <img v-show="userInfo.currentStatus == 0" id="btnClick" @click="signIn" class="btn-sign" src="./images/sign_click_seven.gif" />
          <img v-show="userInfo.currentStatus == 1" @click="shareInfo" class="btn-sign" src="./images/sign_share_seven.png" />
          <img v-show="userInfo.currentStatus == 2" id="btnClickAga" @click="signDraw" class="btn-sign" src="./images/sign_shared_draw.png" />
          <img v-show="userInfo.currentStatus == 3" class="btn-sign" src="./images/sign_drawed.png" />

          <img class="btn-rules" @click="showRule = true" src="./images/sign_rule_seven.png" />
        </div>
        <!--滑动区域-->
        <div class="slide">
          <ul class="category-head" style="box-shadow: 0px 0px 5px 1px rgb(217, 83, 125) inset">
            <li v-for="item in awardsList" @click="openDeatil(item.id)">
              <img v-bind:src=item.imgBigSquare />
            </li>
          </ul>
        </div>

      </div>
    </div>

    <!--蒙层-->
    <div id="mask" @click="openAPP"></div>
    <!--弹窗、活动规则-->
    <div class="rule" v-show="showRule">
      <div v-show="currentDay != 6" class="rule-content">
        <div class="rule-body">
          {{initInfo.rule}}
        </div>
        <div class="btn-close" @click="showRule = false"><img src="./images/sign_close.jpg"></div>
      </div>
      <div v-show="currentDay == 6" class="rule-content" :style="{'backgroundImage' : 'none', 'background': 'linear-gradient(180deg,rgba(184,10,62,1) 0%,rgba(146,26,146,1) 100%)'}">
        <div class="rule-body" style="color: #FFFFFF;">
          {{initInfo.rule}}
        </div>
        <div class="btn-close" @click="showRule = false"><img src="./images/sign_close.jpg"></div>
      </div>
    </div>

    <!--弹窗、是否中奖-->
    <div class="pop-up" v-show="showPop" v-cloak>
      <div class="content">
        <div class="title" v-if="signInfo.isAwarded">
          <p>恭喜您获得</p>
          <p>{{signInfo.name}}</p>
        </div>
        <div class="title" v-else>
          <p>很遗憾未中奖</p>
          <p>再接再厉，明天再来</p>
        </div>
        <div class="coupon">
          <img v-if="signInfo.isAwarded" :src="signInfo.imgSquare" />
          <img v-else src="./images/sign_mascot.png" />
        </div>
        <div class="button" @click="showPop = false">
          <img src="./images/sign_iknow.png" />
        </div>
        <div v-if="signInfo.isAwarded" class="my-award" @click="openAward">
          <span>查看我的礼物></span>
        </div>

        <div class="btn-close" @click="showPop = false">
          <img src="./images/sign_close.jpg">
        </div>
      </div>
    </div>

    <!--弹窗第三天-->
    <div class="pop-up" v-show="showPopThree" v-cloak>
      <div class="content-three">
        <div class="title">
          <p>勤劳的吃货今天签到有惊喜哦！</p>
        </div>
        <div class="coupon">
          <img src="./images/sign_box.png" />
        </div>
        <div class="button" @click="showPopThree = false">
          <img src="./images/sign_iknow_three.png" />
        </div>
        <div class="sub-title" >
          <span>海量奖品记得每日签到哟~></span>
        </div>

        <div class="btn-close" @click="showPopThree = false">
          <img src="./images/sign_close.jpg">
        </div>
      </div>
    </div>

    <!--弹窗第七天-->
    <div class="pop-up-seven" v-show="showPopSeven" v-cloak>
      <div class="sing_ribbon">
        <img src="./images/sing_ribbon_left.png">
        <img src="./images/sing_ribbon_right.png">
      </div>
      <div class="content-seven">
        <div class="title" v-if="signInfo.isAwarded">
          <p>恭喜您获得</p>
          <p>{{signInfo.name}}</p>
        </div>
        <div class="title" v-else>
          很遗憾未中奖
        </div>
        <div class="coupon">
          <img v-if="signInfo.isAwarded" :src="signInfo.imgSquare" />
          <img v-else src="./images/sign_mascot_seven.png" />
        </div>
        <div class="sub-title" v-if="!signInfo.isAwarded">
          再接再厉！明天再来吧~
        </div>
        <div v-if="signInfo.isAwarded" style="margin-top: .9rem" class="button" @click="openAward">
          <span>查看我的礼物</span>
        </div>
        <div v-else class="button" @click="showPopSeven = false">
          <span>朕知道了</span>
        </div>

        <div class="btn-close" @click="showPopSeven = false">
          <img src="./images/sign_close.jpg">
        </div>
      </div>
    </div>

    <!--第七天首次进入加载-->
    <div id="cool-effect" class="cool-effect" v-show="firstSeven">
        <div class="frame" id="frame">
          <div id="cool-bg" class="bg-rotation">
            <img src="./images/sign_giftbox_bg.png">
          </div>
          <div id="cool-box" class="gift-box">
            <img src="./images/sign_box.png" />
          </div>

          <div id="cool-desc" class="desc">
            <p>哇塞~签到第7天，真棒！</p>
            <p>神秘礼物已经填充完毕，快去抽奖吧！</p>
          </div>

          <div id="cool-button" class="button" @click="closeWin">
            <img src="./images/sign_iknow_bg.png" />
          </div>
          <div style="margin-top: .5rem;" class="cool-close" id="cool-close" @click="closeWin"><img src="./images/sign_close.jpg"></div>
        </div>
    </div>


    <!--时间选择器-->
    <UITimePicker
      :selectValue="checkedValue"
      :isPicker="isPicker"
      @togglePicker="togglePicker"
      @confirm="confirm"
      @cancel="cancel">
    </UITimePicker>


  </div>
</template>

<script type="text/javascript">
  import AppHeader from '@/components/common/header'
  import utils from '@/widget/utils'
  import * as Model from '@/model/sign'
  import app from '@/widget/app'
  import UITimePicker from '../../../components/incentive/ui-time-picker.vue'
  import vswitch from './component/vswitch'
  import config from '@/config/index'


  export default {
    name: "index",
    data() {
      return {
        title: '每日签到',
        pageView: false,
        annotation: '',
        userInfo: {},
        initInfo: {},
        progressBar: require('./images/sign_progress0.png'), // 签到进度条
        broadWinners: ' ',
        imgSquareList: [],
        gameArr: [],
        gameDefaults: {
          'gameLen': 3,
          'game_pagesize': 16,//生成多少圈同样的东西
          'zj_arr': { //中奖数组，第一个表示是否中奖，第二个中奖号码
            'is_win': 2,
            'number': 1
          }
        },
        temSquareList: [],
        awardsList: [], //滑动大图
        rules: '',
        showRule: false,
        awardNum: '',
        showGrowth: false,
        signInfo: {},
        showPop: false, //中奖弹窗
        shareConfig: {
          link: location.href,
          url: location.href,
          title: '来伊份签到7天赢豪礼',
          desc: '来伊份签到7天赢豪礼',
          description: '集齐七日份的好运，即可召唤神秘惊喜好礼',
          imgUrl: 'https://static2.laiyifen.com/files/H5-mall-static/image/sign_share_icon.jpg',
          pic: 'https://static2.laiyifen.com/files/H5-mall-static/image/sign_share_icon.jpg',
        },
        isPicker: false, //时间选择器
        checkedValue: ['10', '31'],
        initSwitch: false, // 首次判断是否有进行过签到提醒
        isCancel: false, // 取消签到提醒
        currentDay: 0,
        showPopThree: false,
        showPopSeven: false,
        liParams: [],
        timer: null,
        duration: 2000, // 定义时间
        isDisable: false,
        firstSeven: false, //用于判断第七天首次进入是时候的弹窗
      }
    },
    components: {UITimePicker, AppHeader, vswitch},
    created () {
      // 禁用下拉刷新
      this.refreshenable(0);
      // console.log(location.href);
    },
    mounted () {
      // 判断是否是ios还是安卓手机用来加载背景
      if (utils.ios()) {
        this.annotation = '*兑换项与活动和设备生产商Apple Inc.公司无关';
      } else if (utils.android()) {
        this.annotation = '';
      }
      this.getInit();
      this.getUserInfo(1);
      this.querySign();

      // 引流
      this.goApp();
    },
    methods: {
      // 如果是app就往下移
      showHeader () {
        if (utils.isApp()) {
          if (utils.query('hideHead') == 0 && utils.getVersion() < 5320) {
            return true
          } else {
            return false
          }
        } else if (utils.weixin() || utils.nativeQQ()) {
          return false
        } else {
          return true
        }
      },
      goApp () {
        if (utils.isApp()) {
          document.getElementById('mask').style.display = 'none';
        } else {

        }

      },
      openAPP () {
        window.location.href = 'https://sj.qq.com/myapp/detail.htm?apkName=com.umaman.laiyifen'
      },
      getUserInfo (val) {
        Model.getUserInfo({
          type: 'GET'
        }).then((result) => {
          let vm = this;
          this.pageView = true;
          const data = result.data
          if (result.code == 0 ) {
            this.userInfo = data;

            // 先根据是否签到、分享判断
            if (this.userInfo.currentStatus == 0) {
              this.currentDay = this.userInfo.currentCount;
            } else {
              this.currentDay = this.userInfo.currentCount - 1;
            }
            console.log(this.currentDay);
            // 第三天弹窗
            this.currentDay == 2 && this.userInfo.currentStatus == 0 ? this.showPopThree = true : this.showPopThree = false;

            this.currentDay == 6 && this.userInfo.currentStatus == 0 ? this.firstSeven = true : this.firstSeven = false;


            // 进度条
            if (this.currentDay == 5 && this.userInfo.currentStatus != 0) {
              this.progressBar = require(`./images/sign_progress6_1.png`);
            } else {
              this.progressBar = require(`./images/sign_progress${this.userInfo.currentCount}.png`);
            }
            // 抽奖池
            this.temSquareList = data.awards;
            for (let i in result.data.awards){
              this.imgSquareList.push(result.data.awards[i].imgSquare);
            }

            // 创造游戏
            if (val == 1) {
              setTimeout(function(){
                vm.createGame();
              },0 );
            }
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

            // 广播
            for (let i = 0; i < this.initInfo.broadCardList.length; i++) {
              this.broadWinners = this.broadWinners + this.initInfo.broadCardList[i];
            }
            this.awardsList = this.initInfo.awards;
          }
        })
      },

      // 开始签到
      signIn () {
        if (!this.isDisable){
          this.isDisable = true;
          Model.signIn({
            type: 'POST'
          }).then((result) => {
            const data = result.data;
            setTimeout(() => {
              this.isDisable = false;
            }, 2000)
            if (result.code == 0) {
              this.signInfo = data
              // 是否中奖
              this.gameDefaults.zj_arr.is_win = data.isAwarded ? 1 : 2;

              // 中奖number
              for (let i = 0, j = this.temSquareList.length; i < j; i++){
                if (result.data.id == this.temSquareList[i].id) {
                  this.awardNum = i;
                };
              }
              // 显示成长值
              this.showGrowth = true,

              // button 变成抽奖中
              document.getElementById('btnClick').src = require('./images/sign_clicked.png');

              setTimeout(() => {
                this.showGrowth = false;
                // 再去获取一次数据 0不用刷新数据、1需要刷新数据
                this.getUserInfo(0);
              }, 4500)

              setTimeout(() => {
                this.currentDay == 6 ? this.showPopSeven = true : this.showPop = true;
              }, 5000)


              //红包雨
              if (this.currentDay == 6 && this.userInfo.currentStatus == 0) {
                document.getElementById('ser_home').style.display = 'block';
                this.startRedPacket();
                setTimeout(() => {
                  document.getElementById('red_packet').style.display = 'none';
                }, 3500)
              }

              // 游戏开始
              this.luckGame();
              // 拉霸动效、区分第七天
              if (this.currentDay == 6) {
                document.getElementById('rockImg').src = require('./images/sign_rock_seven.gif');
              } else {
                document.getElementById('rockImg').src = require('./images/sign_rock.gif');
              }
            } else {
              this.$toast(result.msg);
            }
          })
        }
      },
      // 分享后抽奖
      signDraw () {
        if (!this.isDisable){
          Model.signDraw({
            type: 'POST'
          }).then((result) => {
            const data = result.data;
            setTimeout(() => {
              this.isDisable = false;
            }, 2000)
            if (result.code == 0) {
              this.signInfo = data
              // 是否中奖
              this.gameDefaults.zj_arr.is_win = data.isAwarded ? 1 : 2;

              // 中奖number
              for (let i = 0, j = this.temSquareList.length; i < j; i++){
                if (result.data.id == this.temSquareList[i].id) {
                  this.awardNum = i;
                };
              }
              // 显示成长值
              this.showGrowth = true;
              // 游戏开始
              this.luckGame();

              // button 变成抽奖中
              document.getElementById('btnClickAga').src = require('./images/sign_clicked.png');

              setTimeout(() => {
                this.showGrowth = false;
                // 再去获取一次数据 0不用刷新数据、1需要刷新数据
                this.getUserInfo(0);
              }, 4500)

              setTimeout(() => {
                this.currentDay == 6 ? this.showPopSeven = true : this.showPop = true;
              }, 5000)


              // 拉霸动效、区分第七天
              if (this.currentDay == 6) {
                document.getElementById('rockImg').src = require('./images/sign_rock_seven.gif');
              } else {
                document.getElementById('rockImg').src = require('./images/sign_rock.gif');
              }
            } else {
              this.$toast(result.msg);
            }
          })
        }
      },
      // 去详情页
      openDeatil (id) {
        location.href = `/activity/sign/detail?id=${id}`
      },
      // 去奖品页面
      openAward () {
        location.href = `/activity/sign/award`
      },

      // 创造游戏
      createGame () {
        this.getHeight();
        this.setLi(this.gameDefaults);
        this.pushLi(this.gameArr);
      },

      // 获取高度
      getHeight () {
        var w_config = {
          'w': document.body.clientWidth,
          'h': document.body.clientHeight
        }
        this.game_list_item_h = (w_config.w * 320 / 750 * 0.4 * 0.9).toFixed(2);
      },

      // 设置奖品
      setLi (settings) {
        for (var j = 1; j <= settings.game_pagesize; j++) {
          for (var i = 1; i <= this.imgSquareList.length; i++) {
            this.gameArr.push({'type': j, 'index': i, 'src': this.imgSquareList[i-1]});
          }
        }
      },

      //写入，初始化奖品的滚动
      pushLi (arr) {
        let vm = this;
        var html_str = '';
        for (let i = 0; i < arr.length; i++) {
          html_str += '<li style="height:' + 1.5 + 'rem; position: relative; width:100%; text-align: center" data-index="' + arr[i]['index'] + '" data-type="' + arr[i]['type'] + '"><img style="width:' + 1.3 + 'rem" src="' + arr[i]['src'] + '"></li>';
        }
          var gameList = document.getElementsByClassName('game-goods-ul')
          var len = gameList.length
          for (var i = 0; i<len; i+=1) {
            gameList[i].innerHTML = html_str
            gameList[i].style.transform = 'translate(0px, -' + 1.2 + 'rem) translateZ(0px)'
            gameList[i].style.transitionDuration = '0ms'
          }
      },

      // 开始游戏
      luckGame () {
        let vm = this;
        // ms控制一共时间、y来控制速度
        //如果中奖
        if (this.gameDefaults.zj_arr.is_win == 1) {

          let gameList = document.getElementsByClassName('game-goods-ul')
          for (let i =0, j = gameList.length; i<j; i+=1) {
            let y = 6 * 1.5 * vm.temSquareList.length + 1.2 - 1.5 + (this.awardNum * 1.5)
            setTimeout(function () {
                gameList[i].style.transitionDuration = '4000ms'
                gameList[i].style.transform = 'translate(0px, -' + y + 'rem) translateZ(0px)'

            }, i * 300);
          }
        } else {
          let numRand = this.randNum(this.gameDefaults);
          let gameList = document.getElementsByClassName('game-goods-ul')
          for (let i =0, j = gameList.length; i<j; i+=1) {
            let y0 = (numRand[0] * 1.5) + 1.5 * (this.gameDefaults.gameLen + 0.38) * 10;
            let y1 = (numRand[1] * 1.5) + 1.5 * (this.gameDefaults.gameLen + 0.38) * 10;
            let y2 = (numRand[2] * 1.5) + 1.5 * (this.gameDefaults.gameLen + 0.38) * 10;

            setTimeout(function () {
                gameList[i].style.transitionDuration = '4000ms'
                if (i == 0) {
                  gameList[i].style.transform = 'translate(0px, -' + y0 + 'rem) translateZ(0px)'
                }
                if (i == 1) {
                  gameList[i].style.transform = 'translate(0px, -' + y1 + 'rem) translateZ(0px)'
                }
                if (i == 2) {
                  gameList[i].style.transform = 'translate(0px, -' + y2 + 'rem) translateZ(0px)'
                }
              }, i * 300);
          }
        }
      },
      // 得到不中奖时候的随机数
      randNum (settings) {
        let a = Math.floor(Math.random() * settings.gameLen);
        let b = Math.floor(Math.random() * settings.gameLen);
        let c = Math.floor(Math.random() * settings.gameLen);
        let arr = [];
        if (a == b || a == 0 || b == 0 || c == 0) {
          return this.randNum(settings);
        } else {
          return arr = [a, b, c];
        }
      },
      shareInfo () {
        const config = this.shareConfig;
        let vm = this;
        if (utils.isApp()) {
          app.postMessage('share', {
            url: config.url,
            title: config.title,
            description: config.description,
            url160x160: config.pic,
            pic: config.pic
          }, (cb) => {
            // this.showShare = false;
            if (cb == 1) {
              vm.postShare();
              // this.postIsShare();
            } else {
              // alert('分享失败');
            }
          })
        }
      },
      // 给后台发送分享成功
      postShare() {
        Model.postShare({
          type: 'POST'
        }).then((result) => {
          const data = result.data
          if (result.code == 0 ) {
            this.getUserInfo(1);
            // this.awards = data.awards;
          }
        })
      },
      // 日期选择器
      selectDate () {
        this.isPicker = true;
        let alarmTime = '10-12';
        if (alarmTime) {
          alarmTime = alarmTime.split('-');
          this.selectValue = alarmTime;
        }
      },
      togglePicker (val) {
        this.isPicker = val
      },
      // 日期选择确定
      confirm (val) {
        console.log('val', val);
        this.checkedValue = val.split('-');
        this.queryDate = val;
        this.queryDate = this.checkedValue[0] + this.checkedValue[1];
        this.remindSign()
      },
      // 日期选择取消
      cancel () {
        let vm = this;
        this.isCancel = true;
        setTimeout(() => {
          vm.isCancel = false;
        },50)
        // this.switchValue = false;
      },
      // 开启签到窗口
      remindSign () {
        Model.remindSign({
          type: 'POST',
          data: {
            notifyTime: this.queryDate
          },
        }).then((result) => {
          const data = result.data;
          if (result.code == 0 && data) {
            this.$toast('已成功开启提醒')
          }
        })
      },
      // 关闭签到提醒
      closeSign () {
        Model.closeSign({
          type: 'POST',
        }).then((result) => {
          const data = result.data;
          if (result.code == 0 && data) {
            this.$toast('已成功关闭提醒')
          }
        })
      },
      // 查询签到窗口
      querySign () {
        Model.querySign({
          type: 'GET'
        }).then((result) => {
          const data = result.data
          if (result.code == 0 && data) {
             this.initSwitch = true;
          }
        })
      },
      // switch开关
      changeSwitch(checked){
        if (checked) {
          this.selectDate();
        } else {
          this.closeSign();
        }
      },
      // 关闭第七天的效果图
      closeWin () {
        document.getElementById("cool-effect").style.background = 'rgba(0, 0, 0, 0)';
        document.getElementById("cool-bg").style.display = 'none';
        document.getElementById("cool-button").style.display = 'none';
        document.getElementById("cool-desc").style.display = 'none';
        document.getElementById("cool-close").style.display = 'none';

        let box = document.getElementById("cool-box");
        box.classList.add('change-size');

        setTimeout(function () {
          document.getElementById("frame").style.display = 'none';
          document.getElementById("cool-effect").style.display = 'none';
          document.getElementById("cool-box").style.display = "none";
        }, 1550);

      },

      /**
       * 开启动画
       */
      startRedPacket() {
        let win = document.documentElement.clientWidth || document.body.clientWidth
        let left1 = parseInt(Math.random() * (win - 50) + 0);
        let left2 = parseInt(Math.random() * (win - 50) + 0);
        let left3 = parseInt(Math.random() * (win - 50) + 0);
        let left4 = parseInt(Math.random() * (win - 50) + 0);
        let left5 = parseInt(Math.random() * (win - 50) + 0);
        let rotate = (parseInt(Math.random() * (45 - (-45)) - 45)) + "deg"; // 旋转角度
        // let scales = (Math.random() * (12 - 8 + 1) + 8) * 0.1; // 图片尺寸
        let scales = 2
        let durTime = (Math.random() * (2.5 - 1.2 + 1) + 1.2) + 's'; // 时间 1.2和1.2这个数值保持一样
        this.liParams.push({left1: left1+'px', left2: left2+'px', left3: left3+'px', left4: left4+'px', left5: left5+'px', cls: 'move_1', transforms: 'rotate('+ rotate +') scale('+ scales +')', durTime: durTime})


        setTimeout( () => {  // 多少时间结束
          clearTimeout(this.timer);
          return;
        }, this.duration)


        this.timer = setTimeout( () => {
          this.startRedPacket()
        },100)
      },
      /**
       * 回收dom节点
       */
      removeDom (e) {
        let target = e.currentTarget;
        document.querySelector('#red_packet').removeChild(target)
      },

      // 禁用下拉刷新
      refreshenable(a) {
        if (utils.isApp()) {
          app.postMessage('refreshenable', {
            enable: a,
          }, (cb) => {
            if (cb == 1) {
              console.log(cb);
            }
            else {
              console.log(cb);
            }

          })
        } else {
          console.log('请使用app');
        }
      },


    }
  }
</script>

<style scoped lang="scss">
  @import './styles/luckyGame.scss';
  .img-background {
    width: 100%;
    z-index: 1
  }
  #mask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    z-index: 110;
  }
  .layer {
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
  .progress-bar {
    position: absolute;
    top: 5rem;
    left: 1.2rem;
    text-align: center;
  }
  .progress-bar img {
    width: 5rem;
  }
  .gift {
    position: absolute;
    top: 4.35rem;
    left: 5.7rem;
    img {
      width: .6rem;
    }
  }
  .gift-three {
    position: absolute;
    top: 4.45rem;
    left: 2.71rem;
    img {
      width: .5rem;
    }
  }
  .gift_seven {
    position: absolute;
    top: 4.4rem;
    left: 5.71rem;
    img {
      width: .55rem;
    }
  }

  .img-wrap {
    position: absolute;
    top: 5.8rem;
  }
  .img-wrap img {
    width: 7.5rem;
    position: absolute;
  }
  .img-wrap img:first-child {
    animation: img_wrap 2s linear 0s infinite;
    -webkit-animation: img_wrap 2s linear 0s infinite; // 自定义动画名为h1,8s完成该动画，匀速执行该动画，立即执行，循环执行动画
  }

  .img-wrap img:nth-child(2) {
    animation: img_wrap 2s linear 1s infinite;
    -webkit-animation: img_wrap 2s linear 1s infinite;
  }

  @keyframes img_wrap {
    0% {
      opacity: 1;
    }
    25% {
      opacity: 1;
    }
    50% {
      opacity: 1;
    }
    75% {
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  }
  .broad-box {
    top: 6.5rem;
    position: absolute;
    background: #E4A100;
    border-top-right-radius: .2rem;
    border-bottom-right-radius: .2rem;
    width: 4.56rem;
    left: 1.82rem;
    overflow: hidden;
  }
  .broad-box img {
    height: .3rem;
    margin-left: .05rem;
  }
  /*文字滚动动画*/
  .wordsLoop {
    position: relative;
    height:0.36rem;
    font-size:0.24rem;
    font-weight:400;
    line-height:0.34rem;
    color: #fff;
    display: inline-flex;
    /*overflow: hidden;*/
    /*text-overflow: ellipsis;*/
    white-space: nowrap;
    animation: 30s wordsLoop linear infinite normal;
  }

  @keyframes wordsLoop {
    0% {
      transform: translateX(1rem);
      -webkit-transform: translateX(1rem);
    }
    100% {
      transform: translateX(-100%);
      -webkit-transform: translateX(-100%);
    }
  }

  @-webkit-keyframes wordsLoop {
    0% {
      transform: translateX(1rem);
      -webkit-transform: translateX(1rem);
    }
    100% {
      transform: translateX(-100%);
      -webkit-transform: translateX(-100%);
    }
  }
  .broadcast {
    position: absolute;
    padding-left: .15rem;
    height: .36rem;
    top: 6.5rem;
    width: .8rem;
    left: 1.1rem;
    background: #E4A100;
    border-top-left-radius: .2rem;
    border-bottom-left-radius: .2rem;
  }
  .broadcast img{
    margin-top: .04rem;
    width: .4rem;
    left: 1.1rem;
  }

  .game-goods-ul li {
    height: 1.2rem;
    //margin-top: 0.15rem;
    top: -0.1rem;
    position: relative;
    width: 100%;
  }
  .game-goods-ul li img {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    height: 1.2rem;
    width: auto;
  }
  .red-ball {
    position: absolute;
    left: 5.9rem;
    top: 6.1rem;
    z-index: 99;
    img {
      width: 1.2rem;
    }
  }
  .buttons {
    position: absolute;
    display: flex;
    top: 10.65rem;
    width: 5.5rem;
    left: .95rem;
    align-items: center;
    justify-content: space-between;
  }
  .buttons .btn-sign {
    width: 3rem;
  }
  .buttons .btn-awards {
    width: 1rem;
  }
  .buttons .btn-rules {
    width: 1rem;
  }

  .slide {
    position: absolute;
    top: 12.5rem
  }
  .slide .category-head {
    display: inline;
    white-space: nowrap;
    overflow-x: scroll;
    float: left;
    overflow-y: hidden;
    height: 1.9rem;
    width: 6rem;
    margin-left: 0.7rem;
    padding-top: 0.15rem;
    border-radius: 15px;
    box-shadow: 0px 0px 5px 1px #F0AA00 inset

  }
  .slide .category-head li {
    display: inline-block;
    padding-left: 10px;
    width: 1.5rem
  }
  .slide .category-head li img {
    width: 1.5rem;
  }

  /* 弹窗 */
  .rule {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.4);
    -webkit-animation-name: fadeIn;
    -webkit-animation-duration: 0.4s;
    animation-name: fadeIn;
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* 弹窗内容 */
  .rule .rule-content {
    background-size:100% 100%;
    background-image: url('./images/sign_popu.png');
    width: 6.2rem;
    height: 8rem;
    background-color: #fefefe;
    -webkit-animation-name: slideIn;
    -webkit-animation-duration: 0.4s;
    animation-name: slideIn;
    animation-duration: 0.4s;
    border-radius: .2rem;
  }
  .rule .rule-content .btn-close {
    margin-top: .5rem;
    left: 3.4rem;
    text-align: center;
  }
  .rule .rule-content .btn-close img {
    width: .5rem;
  }
  .rule .rule-content .rule-body {
    font-size: .3rem;
    padding: 0.3rem 0.5rem;
    height: 8rem;
    overflow: scroll;
    white-space: pre-line;
  }

  .rule .rule-content .rule-body::-webkit-scrollbar {display:none}

  @-webkit-keyframes fadeIn {
    from {
      opacity: 0
    }
    to {
      opacity: 1
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0
    }
    to {
      opacity: 1
    }
  }
  .img-rock {
    position: absolute;
    top: 7.1rem;
    left: 6.88rem;
  }
  .img-rock img {
    width: .4rem;
  }
  .experience {
    position: absolute;
    top: 10rem;
    color: red;
    z-index: 98;
    justify-content: center;
    display: flex;
    width: 100%;
    font-size: .3rem;
  }
  .experience-seven {
    position: absolute;
    top: 10rem;
    color: red;
    z-index: 98;
    justify-content: center;
    display: flex;
    width: 100%;
    font-size: .3rem;
    color:rgba(253,244,0,1);
    text-shadow:0px 0px 0px rgba(93,3,17,1);
  }
  /*成长值动效*/
  .growthIn-enter-active, .growthIn-leave-active {
    transition: opacity .8s;
  }
  .growthIn-enter, .growthIn-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  /*弹窗*/
  .pop-up {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .5);
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: .5s linear;
    -webkit-transition: .5s linear;
  }
  .pop-up .content {
    background-size:100% 100%;
    background-image: url('./images/sign_popu.png');
    width:4.48rem;
    height:5.14rem;
    background-color: #fefefe;
    -webkit-animation-name: slideIn;
    -webkit-animation-duration: 0.4s;
    animation-name: slideIn;
    animation-duration: 0.4s;
    border-radius: .2rem;
    text-align: center;
  }
  .pop-up .content .title {
    margin-top: .32rem;
    color: #000000;
    font-size: 0.27rem;
    font-weight:500;
    color:rgba(0,0,0,1);
    line-height:0.38rem;
  }
  .pop-up .content .coupon {
    margin-top: .36rem;
  }
  .pop-up .content .coupon img {
    width:1.9rem;
  }
  .pop-up .content .button {
    margin-top: .45rem;
  }
  .pop-up .content .button img{
    width: 2.48rem;
  }
  .pop-up .content .my-award {
    height: 0.34rem;
    font-size: 0.24rem;
    font-weight:400;
    line-height:0.34rem;
    color: #000000;
    margin-top: .2rem;
  }
  .pop-up .content .my-award span{
    border-bottom: 2px solid #000000;
  }
  .pop-up .content .btn-close {
    margin-top: 1rem;
  }
  .pop-up .content .btn-close img {
    width:0.5rem;
    height:0.5rem;
  }
  /*弹窗第七天*/
  .pop-up-seven {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .5);
    z-index: 101;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: .5s linear;
    -webkit-transition: .5s linear;
  }
  .pop-up-seven .sing_ribbon {
    width: 100%;
    display: flex;
    -webkit-animation-name:'ripple';/*动画属性名，也就是我们前面keyframes定义的动画名*/
    -webkit-animation-duration: 1s;/*动画持续时间*/
    -webkit-animation-timing-function: ease; /*动画频率，和transition-timing-function是一样的*/
    -webkit-animation-delay: 0s;/*动画延迟时间*/
    -webkit-animation-iteration-count: 1;/*定义循环资料，infinite为无限次*/
    -webkit-animation-direction: alternate;/*定义动画方式*/
  }
  .pop-up-seven .sing_ribbon img {
    width: 50%;
    height: 3rem;
  }
  @keyframes ripple {
    from {
      -webkit-transform: scale(0.5);
      transform: scale(0.5);
    }
    to{
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }

  .pop-up-seven .content-seven {
    background-size:100% 100%;
    background-image: url('./images/sign_popu_seven.png');
    width: 5.3rem;
    height: 7.7rem;
    -webkit-animation-name: slideIn;
    -webkit-animation-duration: 0.4s;
    animation-name: slideIn;
    animation-duration: 0.4s;
    border-radius: .2rem;
    text-align: center;
    position: absolute;
  }
  .pop-up-seven .content-seven .title {
    margin-top: 2.52rem;
    font-size:0.28rem;
    font-weight:500;
    color:rgba(147,26,45,1);
    line-height:0.4rem;
  }
  .pop-up-seven .content-seven .sub-title {
    font-size:0.24rem;
    font-weight:400;
    color:rgba(147,26,45,1);
    line-height:0.34rem;
  }
  .pop-up-seven .content-seven .coupon {
    margin-top: .36rem;
  }
  .pop-up-seven .content-seven .coupon img {
    width:1.9rem;
  }
  .pop-up-seven .content-seven .button {
    margin-top: 1rem;
    font-size:0.38rem;
    font-weight:400;
    color:rgba(147,26,45,1);
    line-height:0.52rem;
  }
  .pop-up-seven .content-seven .my-award {
    height: 0.34rem;
    font-size: 0.24rem;
    font-weight:400;
    line-height:0.34rem;
    color: #000000;
    margin-top: .2rem;
  }
  .pop-up-seven .content-seven .my-award span{
    border-bottom: 2px solid #000000;
  }
  .pop-up-seven .content-seven .btn-close {
    margin-top: 1rem;
  }
  .pop-up-seven .content-seven .btn-close img {
    width:0.5rem;
    height:0.5rem;
  }

  /*弹窗第三天*/
  .pop-up .content-three {
    background-size:100% 100%;
    background-image: url('./images/sign_popo_three.png');
    width:5.3rem;
    height:6.56rem;
    background-color: #fefefe;
    -webkit-animation-name: slideIn;
    -webkit-animation-duration: 0.4s;
    animation-name: slideIn;
    animation-duration: 0.4s;
    border-radius: .2rem;
    text-align: center;
  }
  .pop-up .content-three .title {
    margin-top: .32rem;
    font-weight:500;
    font-size:0.32rem;
    font-weight:500;
    color:rgba(91,49,0,1);
    line-height:0.44rem;
  }
  .pop-up .content-three .coupon {
    margin-top: .36rem;
  }
  .pop-up .content-three .coupon img {
    width: 2.76rem;
  }
  .pop-up .content-three .button {
    margin-top: .45rem;
  }
  .pop-up .content-three .button img{
    width: 2.36rem;
  }
  .pop-up .content-three .my-award {
    height: 0.34rem;
    font-size: 0.24rem;
    font-weight:400;
    line-height:0.34rem;
    color: #000000;
    margin-top: .2rem;
  }
  .pop-up .content-three .my-award span{
    border-bottom: 2px solid #000000;
  }
  .pop-up .content-three .sub-title {
    font-size:0.24rem;
    font-weight:400;
    color:rgba(91,49,0,1);
    line-height:0.34rem;
    margin-top: .5rem;
  }
  .pop-up .content-three .btn-close {
    margin-top: 1.2rem;
  }
  .pop-up .content-three .btn-close img {
    width:0.5rem;
    height:0.5rem;
  }

  .redbag1 {
    position: absolute;
    top: 2.4rem;
    left: .32rem;
  }
  .redbag2 {
    position: absolute;
    top: 10rem;
  }
  .redbag3 {
    position: absolute;
    top: 2rem;
    left: 6.5rem;
    img {
      width: .72rem;
    }
  }
  .redbag4 {
    position: absolute;
    top: 9.5rem;
    left: 6.4rem;
  }

  .annotation {
    position: absolute;
    top: 14.6rem;
    width: 100%;
    text-align: center;
    font-size: .2rem;
    color: #5D0059;
  }


  .cool-effect {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .5);
    z-index: 99;
    transition: .5s linear;
    -webkit-transition: .5s linear;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .cool-effect .frame {
    background-size:100% 100%;
    width: 6rem;
    height: 8rem;
    -webkit-animation-name: slideIn;
    -webkit-animation-duration: 0.4s;
    animation-name: slideIn;
    animation-duration: 0.4s;
    border-radius: .2rem;
    text-align: center;
    position: absolute;
  }
  .cool-effect .frame .bg-rotation {
    -webkit-animation: bg-rotation 4s linear infinite;
    animation: bg-rotation 4s linear infinite;
    img {
      border-radius: 4px 4px 0 0;
      width: 6rem;
    }
  }
  @keyframes bg-rotation {
    from {
      transform:rotate(0deg);
    }
    to {
      transform:rotate(360deg);
    }
  }
  .cool-effect .frame .gift-box{
    position: absolute;
    top: 2rem;
    text-align: center;
    width: 100%;
    z-index: 100
  }
  .cool-effect .frame .gift-box img{
    width: 2.64rem;
  }
  .cool-effect .frame .desc {
    font-size:0.28rem;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height:0.4rem;
    margin-top: -1rem;
  }
  .cool-effect .frame .button{
    margin-top: .5rem;
  }
  .cool-effect .frame .button img{
    width: 2.3rem;
  }

  .change-size {
    animation:mymove 1.6s 1;
    -webkit-animation:mymove 1.6s 1; /*Safari and Chrome*/
  }
  @keyframes mymove
  {
    from {
      left:0px;
      transform: scale(1);
    }
    to {
      left: 0rem;
      top: 50%;
      transform: scale(.1);
    }
  }

  @-webkit-keyframes mymove /*Safari and Chrome*/
  {
    from {
      left:0px;
      transform: scale(1);
    }
    to {
      left: 0rem;
      transform: scale(.1);
    }
  }



  .ser_home {
    display: none;
    width: 100%;
    height: 100%;
  }
  .red_packet {
    display: block;
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
    z-index: 101;
    .i1 {
      width: 25px;
      height: 25px;
      display: block;
      background: url('./images/petal1.png') no-repeat;
    }
    .i2 {
      left: 2rem;
      width: 25px;
      height: 25px;
      display: block;
      background: url('./images/petal2.png') no-repeat;
    }
    .i3 {
      left: 3rem;
      width: 25px;
      height: 25px;
      display: block;
      background: url('./images/petal3.png') no-repeat;
    }
    .i4 {
      left: 4rem;
      width: 25px;
      height: 25px;
      display: block;
      background: url('./images/petal4.png') no-repeat;
    }
    .i5 {
      width: 25px;
      height: 25px;
      display: block;
      background: url('./images/petal5.png') no-repeat;
    }
    li {
      position: absolute;
      animation: all 2s linear;
      top:-100px;
      z-index: 10;
      &.move_1 {
        -webkit-animation: aim_move 2s linear 1 forwards;
        animation: aim_move 2s linear 1 forwards;
      }
    }
    a {
      display: block;
    }
  }


  @keyframes aim_move {
    0% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
    100% {
      -webkit-transform: translateY(120vh);
      transform: translateY(120vh);
    }
  }






</style>
