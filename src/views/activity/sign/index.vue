<template>
  <div class="pageView">
    <AppHeader :title="title"></AppHeader>

    <div class="scroll-view-wrapper" :class="{'visibility': pageView}">
      <!--背景-->
      <img v-if="showPopSeven" class="img-background" src="https://static3.laiyifen.com/files/h5-mall-static/image/1541749068675_2598.jpg">
      <div v-if="showPopSeven" class="layer" :style="{marginTop: this.showHeader() ? '0': '-.88rem'}">
        <!--底部文字-->
        <div class="annotation">{{annotation}}</div>
        <!--签到提醒-->
        <vswitch @changeSwitch = 'changeSwitch' :value ='switchValue' text="关闭提醒|开启提醒"></vswitch>
        <!--&lt;!&ndash;标题&ndash;&gt;-->
        <!--<div class="title">{{userInfo.currentTitle}}</div>-->
        <!--礼物图标-->
        <div class="gift"><img src="./images/sign_gift.png"></div>
        <!--第三天礼物图标-->
        <div v-if="currentDay == 3" class="gift-three"><img src="./images/sign_gift.png"></div>
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
          <img v-show="userInfo.currentStatus == 2" @click="signIn" class="btn-sign" src="./images/sign_shared_draw.png" />
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

      <img v-if="!showPopSeven" class="img-background" src="https://static3.laiyifen.com/files/h5-mall-static/image/sign_bg2.jpg" />
      <div v-if="!showPopSeven" class="layer" :style="{marginTop: this.showHeader() ? '0': '-.88rem'}">
        <!--红包雨-->
        <div class="ser_home">
          <ul class="red_packet" id="red_packet">
            <template v-for="(item, index) in liParams">
              <li :style="{ left: item.left, animationDuration: item.durTime, webkitAnimationDuration: item.durTime}"
                  :class="item.cls" :data-index="index" @webkitAnimationEnd="removeDom">
                <a href='javascript:;'>
                  <i :style="{ transform: item.transforms, webkitTransform: item.transforms}"></i>
                  <i class="i2" :style="{ transform: item.transforms, webkitTransform: item.transforms}"></i>
                  <i class="i3" :style="{ transform: item.transforms, webkitTransform: item.transforms}"></i>
                </a>
              </li>
            </template>
          </ul>
        </div>
        <!--底部文字-->
        <div class="annotation">{{annotation}}</div>
        <!--签到提醒-->
        <vswitch @changeSwitch = 'changeSwitch' :value ='switchValue' text="关闭提醒|开启提醒"></vswitch>
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
          <img v-show="userInfo.currentStatus == 0" id="btnClick" @click="signIn" class="btn-sign" src="./images/sign_click_seven.png" />
          <img v-show="userInfo.currentStatus == 1" @click="shareInfo" class="btn-sign" src="./images/sign_share.png" />
          <img v-show="userInfo.currentStatus == 2" @click="signIn" class="btn-sign" src="./images/sign_shared_draw.png" />
          <img v-show="userInfo.currentStatus == 3" class="btn-sign" src="./images/sign_drawed.png" />

          <img class="btn-rules" @click="showRule = true" src="./images/sign_rule_seven.png" />
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
    </div>

    <!--弹窗、活动规则-->
    <div class="rule" v-show="showRule">
      <div v-show="currentDay != 6" class="rule-content">
        <span class="btn-close" @click="showRule = false"><img src="./images/sign_close.png"></span>
        <div class="rule-body">
          {{initInfo.rule}}
        </div>
      </div>
      <div v-show="currentDay == 6" class="rule-content" :style="{'backgroundImage' : 'none', 'background': 'linear-gradient(180deg,rgba(184,10,62,1) 0%,rgba(146,26,146,1) 100%)'}">
        <span class="btn-close" @click="showRule = false"><img src="./images/sign_close.png"></span>
        <div class="rule-body" style="color: #FFFFFF;">
          {{initInfo.rule}}
        </div>
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
        <div :style="{marginTop: signInfo.isAwarded ? '0' : '.5rem'}" class="button" @click="showPop = false">
          <img src="./images/sign_iknow.png" />
        </div>
        <div v-if="signInfo.isAwarded" class="my-award" @click="openAward">
          <span>查看我的礼物></span>
        </div>

        <div class="btn-close" @click="showPop = false">
          <img src="./images/sign_close.png">
        </div>
      </div>
    </div>


    <!--弹窗第三天-->
    <div class="pop-up" v-show="showPopThree">
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
          <img src="./images/sign_close.png">
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
          <p>很遗憾未中奖</p>
          <p class="sub-title">再接再厉！明天再来吧~</p>
        </div>
        <div class="coupon">
          <img v-if="signInfo.isAwarded" :src="signInfo.imgSquare" />
          <img v-else src="./images/sign_mascot_seven.png" />
        </div>
        <div class="button" @click="showPopSeven = false">
          <span>明天提醒我</span>
        </div>
        <div v-if="signInfo.isAwarded" class="button" @click="openAward">
          <span>查看我的礼物</span>
        </div>

        <div class="btn-close" @click="showPopSeven = false">
          <img src="./images/sign_close.png">
        </div>
      </div>
    </div>

    <!--第七天首次进入加载-->
    <div id="sign-disappear" v-show="showPopSeven">
    <div class="rule-wrapper" >
    <div class="form-con">
      <div class="sendsms-con" style="top: 5rem;" v-cloak>
        <div class="form-conimg" id="form-conimg">
          <img width="100%" src="./images/sign_giftbox_bg.png">
        </div>
        <div id='seven-words' style="position: absolute; top: 3.6rem; text-align: center; width: 100%; color: #ffffff;">
          <p>哇塞~签到第7天，真棒！</p>
          <p>神秘礼物已经填充完毕，快去抽奖吧！</p>
        </div>

        <div style="position: absolute; top: 1rem; text-align: center; width: 100%; z-index: 100">
          <img id='sign_box' style="width: 50%; z-index: 100" src="./images/sign_box.png" />
        </div>

        <div id="close-win" @click="closeWin" style="position: absolute; top: 4.8rem; text-align: center; width: 100%">
          <img style="width: 45%" src="./images/sign_iknow_bg.png" />
        </div>

        <!--<span id="close-btn" style="position: absolute; margin-top: 10%; width: 100%; text-align: center">-->
          <!--<img style="width: 20px" src="./images/sign_close.png">-->
        <!--</span>-->
      </div>
    </div>
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
        checkedValue: ['10', '30'],
        switchValue: false,
        currentDay: 0,
        showPopThree: false,
        showPopSeven: false,
        liParams: [],
        timer: null,
        duration: 5000 // 定义时间
      }
    },
    components: {UITimePicker, AppHeader, vswitch},
    created () {
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
      //红包雨
      this.startRedPacket()
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
      getUserInfo (val) {
        Model.getUserInfo({
          type: 'GET'
        }).then((result) => {
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
            console.log(this.currentDay)
            // 第三天弹窗
            this.currentDay == 3 &&  this.userInfo.currentStatus == 0 ? this.showPopThree = true : this.showPopThree = false


            // 进度条
            this.progressBar = require(`./images/sign_progress${this.userInfo.currentCount}.png`);
            // 抽奖池
            this.temSquareList = data.awards;
            for (let i in result.data.awards){
              this.imgSquareList.push(result.data.awards[i].imgSquare);
            }

            // 创造游戏
            if (val == 1) {
              this.createGame();
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
            for (let i in this.initInfo.broadCardList) {
              this.broadWinners = this.broadWinners + this.initInfo.broadCardList[i];
            }
            this.awardsList = this.initInfo.awards;
          }
        })
      },

      // 开始签到
      signIn () {
        Model.signIn({
          type: 'POST'
        }).then((result) => {
          const data = result.data
          if (result.code == 0) {
            this.signInfo = data
            console.log('signInfo', this.signInfo)
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


            // 游戏开始
            this.luckGame();
            // 拉霸动效、区分第七天
            if (this.showPopSeven) {
              document.getElementById('rockImg').src = require('./images/sign_rock_seven.gif');
            } else {
              document.getElementById('rockImg').src = require('./images/sign_rock.gif');
            }
          }
        })
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
          console.log('this.selectValue', this.selectValue);
        }
      },
      togglePicker (val) {
        this.isPicker = val
      },
      // 日期选择确定
      confirm (val) {
        this.checkedValue = val.split('-');
        this.queryDate = val;
        this.queryDate = this.checkedValue[0] + this.checkedValue[1];
        this.remindSign()
        console.log('this.queryDate', this.queryDate);
      },
      // 日期选择取消
      cancel () {
        this.switchValue = false;
        console.log('switchValue', this.switchValue);
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
            this.$toast('提醒成功')
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
            this.$toast('关闭提醒')
            // this.getUserInfo(1);
            // this.awards = data.awards;
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
             this.switchValue = true;
            // this.getUserInfo(1);
            // this.awards = data.awards;
          }
        })
      },
      // switch开关
      changeSwitch(checked){
        console.log('index', checked)
        if (checked) {
          this.selectDate();
        } else {
          this.closeSign();
        }
      },
      // 关闭第七天的效果图
      closeWin () {
        // document.getElementsByClassName("sign-disappear")
        document.getElementById("seven-words").style.display = 'none';
        document.getElementById("form-conimg").style.display = 'none';
        document.getElementById("close-win").style.display = 'none';
        // document.getElementById("close-btn").style.display = 'none';

        let box = document.getElementById("sign-disappear");
        box.classList.add('change-size');

        setTimeout(function () {
          document.getElementById("sign-disappear").style.display = "none";
        }, 2000);

      },

      /**
       * 开启动画
       */
      startRedPacket() {
        let win = document.documentElement.clientWidth || document.body.clientWidth
        let left = parseInt(Math.random() * (win - 50) + 0);

        let rotate = (parseInt(Math.random() * (45 - (-45)) - 45)) + "deg"; // 旋转角度
        // let scales = (Math.random() * (12 - 8 + 1) + 8) * 0.1; // 图片尺寸
        let scales = 2
        console.log('scales', scales);
        let durTime = (Math.random() * (2.5 - 1.2 + 1) + 1.2) + 's'; // 时间 1.2和1.2这个数值保持一样
        console.log(durTime)
        this.liParams.push({left: left+'px', cls: 'move_1', transforms: 'rotate('+ rotate +') scale('+ scales +')', durTime: durTime})


        setTimeout( () => {  // 多少时间结束
          clearTimeout(this.timer)
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
      }


    }
  }
</script>

<style scoped lang="scss">
  @import './styles/luckyGame.scss';
  .img-background {
    width: 100%;
    z-index: 1
  }
  .layer {
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
  .title {
    position: relative;
    top: 4.8rem;
    width: 100%;
    text-align: center;
    font-size: 0.3rem;
    font-weight: 600;
    color: rgba(255,255,255,1);
    line-height: 0.42rem;
    text-shadow: 0px 0px 0px rgba(159,159,159,0.5);
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
  }
  .gift-three {
    position: absolute;
    top: 4.4rem;
    left: 5.71rem;
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
    position: relative;
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
    display: inline-block;
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
    position: absolute;
    top: 11rem;
    left: 3.4rem;
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
    .lyf-close {
      margin: 25% 0 10px 83%;
      position: relative;
      width: 32px;
      height: 32px;
      border: 1px solid #4e4d4d;
      border-radius: 50%;
      background-color: #ffffff;
      &::before {
        content: '';
        display: block;
        position: absolute;
        left: 50%;
        top: 50%;
        width: 16px;
        height: 1px;
        background: #4e4d4d;
        transform: translateX(-50%) rotate(45deg);
        -webkit-transform: translateX(-50%) rotate(45deg);
      }
      &::after {
        content: '';
        display: block;
        position: absolute;
        left: 50%;
        top: 50%;
        width: 16px;
        height: 1px;
        background: #4e4d4d;
        transform: translateX(-50%) rotate(-45deg);
        -webkit-transform: translateX(-50%) rotate(-45deg);
      }
    }
    .lyf-rule-con {
      margin: 0 auto;
      width: 73%;
      max-width: 630px;
    }
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
    display: flex;
    justify-content: center;
  }
  .pop-up .content .title {
    position: absolute;
    color: #000000;
    font-size: 0.27rem;
    top: 3.7rem;
  }
  .pop-up .content .coupon {
    position: absolute;
    width:1.9rem;
    top: 4.7rem;
  }
  .pop-up .content .coupon img {
    width:1.9rem;
  }
  .pop-up .content .button {
    position: absolute;
    width: 2.7rem;
    top: 6.8rem;
  }
  .pop-up .content .my-award {
    position: absolute;
    width: 1.6rem;
    height: 0.34rem;
    font-size: 0.24rem;
    top: 7.8rem;
    font-weight:400;
    line-height:0.34rem;
    color: #000000;
    border-bottom: 2px solid #000000;
  }
  .pop-up .content .btn-close {
    position: absolute;
    top: 9rem;
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
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: .5s linear;
    -webkit-transition: .5s linear;
    .lyf-close {
      margin: 25% 0 10px 83%;
      position: relative;
      width: 32px;
      height: 32px;
      border: 1px solid #4e4d4d;
      border-radius: 50%;
      background-color: #ffffff;
      &::before {
        content: '';
        display: block;
        position: absolute;
        left: 50%;
        top: 50%;
        width: 16px;
        height: 1px;
        background: #4e4d4d;
        transform: translateX(-50%) rotate(45deg);
        -webkit-transform: translateX(-50%) rotate(45deg);
      }
      &::after {
        content: '';
        display: block;
        position: absolute;
        left: 50%;
        top: 50%;
        width: 16px;
        height: 1px;
        background: #4e4d4d;
        transform: translateX(-50%) rotate(-45deg);
        -webkit-transform: translateX(-50%) rotate(-45deg);
      }
    }
    .lyf-rule-con {
      margin: 0 auto;
      width: 73%;
      max-width: 630px;
    }
  }
  .pop-up-seven .sing_ribbon {
    display: flex;
    -webkit-animation-name:'ripple';/*动画属性名，也就是我们前面keyframes定义的动画名*/
    -webkit-animation-duration: 1s;/*动画持续时间*/
    -webkit-animation-timing-function: ease; /*动画频率，和transition-timing-function是一样的*/
    -webkit-animation-delay: 0s;/*动画延迟时间*/
    -webkit-animation-iteration-count: 1;/*定义循环资料，infinite为无限次*/
    -webkit-animation-direction: alternate;/*定义动画方式*/
  }

  @keyframes ripple {
    from {-webkit-transform: scale(0.5);
      transform: scale(0.5);}
    to{-webkit-transform: scale(1);
      transform: scale(1);}
  }
  .pop-up-seven .content-seven {
    position: absolute;
    background-size:100% 100%;
    background-image: url('./images/sign_popu_seven.png');
    width:5.3rem;
    height:7.7rem;
    -webkit-animation-name: slideIn;
    -webkit-animation-duration: 0.4s;
    animation-name: slideIn;
    animation-duration: 0.4s;
    border-radius: .2rem;
    display: flex;
    justify-content: center;
  }
  .pop-up-seven .content-seven .title {
    position: absolute;
    color: #000000;
    font-size: 0.28rem;
    top: 3.7rem;
    font-weight:500;
    color:rgba(147,26,45,1);
    line-height:0.4rem;
  }
  .pop-up-seven .content-seven .sub-title {
    position: absolute;
    width: 100%;
    top: 1.7rem;
    font-size:0.24rem;
    font-weight:400;
    color:rgba(147,26,45,1);
    line-height:0.34rem;
  }
  .pop-up-seven .content-seven .coupon {
    position: absolute;
    width:1.9rem;
    top: 4.7rem;
  }
  .pop-up-seven .content-seven .coupon img {
    width:1.9rem;
  }
  .pop-up-seven .content-seven .button {
    position: absolute;
    top: 6.8rem;
    width:2.16rem;
    height:0.5rem;
    font-size:0.36rem;
    font-weight:400;
    color:rgba(147,26,45,1);
    line-height:0.5rem;
  }
  .pop-up-seven .content-seven .my-award {
    position: absolute;
    width: 1.6rem;
    height: 0.34rem;
    font-size: 0.24rem;
    top: 7.8rem;
    font-weight:400;
    line-height:0.34rem;
    color: #000000;
    border-bottom: 2px solid #000000;
  }
  .pop-up-seven .content-seven .btn-close {
    position: absolute;
    top: 9rem;
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
    display: flex;
    justify-content: center;
  }
  .pop-up .content-three .title {
    position: absolute;
    top: 4.5rem;
    font-size:0.32rem;
    font-weight:500;
    color:rgba(91,49,0,1);
    line-height:0.44rem;
  }
  .pop-up .content-three .sub-title {
    position: absolute;
    color: #5B3100;
    font-size: 0.24rem;
    top: 9.5rem;
  }
  .pop-up .content-three .coupon {
    position: absolute;
    top: 5.5rem;
  }
  .pop-up .content-three .coupon img {
    width: 2.7rem;
  }
  .pop-up .content-three .button {
    position: absolute;
    top: 8.5rem;
  }
  .pop-up .content-three .button img{
    width: 2.36rem;
  }
  .pop-up .content-three .btn-close {
    position: absolute;
    top: 11rem;
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
    top: 15.1rem;
    width: 100%;
    text-align: center;
    font-size: .2rem;
    color: #5D0059;
  }


  .rule-wrapper {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .5);
    z-index: 66;
    transition: .5s linear;
    -webkit-transition: .5s linear;
    .lyf-close {
      margin: 25% 0 10px 83%;
      position: relative;
      width: 32px;
      height: 32px;
      border: 1px solid #4e4d4d;
      border-radius: 50%;
      background-color: #ffffff;
      &::before {
        content: '';
        display: block;
        position: absolute;
        left: 50%;
        top: 50%;
        width: 16px;
        height: 1px;
        background: #4e4d4d;
        transform: translateX(-50%) rotate(45deg);
        -webkit-transform: translateX(-50%) rotate(45deg);
      }
      &::after {
        content: '';
        display: block;
        position: absolute;
        left: 50%;
        top: 50%;
        width: 16px;
        height: 1px;
        background: #4e4d4d;
        transform: translateX(-50%) rotate(-45deg);
        -webkit-transform: translateX(-50%) rotate(-45deg);
      }
    }
    .lyf-rule-con {
      margin: 0 auto;
      width: 73%;
      max-width: 630px;
    }
  }


  .form-con {
    position: relative;
    background: #e95022;
    .sendsms-con {
      position: absolute;
      width: 70%;
      left: 1.1rem;
      top: 2rem;
      z-index: 66;

      -webkit-animation-name:'ripple';/*动画属性名，也就是我们前面keyframes定义的动画名*/
      -webkit-animation-duration: 1s;/*动画持续时间*/
      -webkit-animation-timing-function: ease; /*动画频率，和transition-timing-function是一样的*/
      -webkit-animation-delay: 0s;/*动画延迟时间*/
      -webkit-animation-iteration-count: 1;/*定义循环资料，infinite为无限次*/
      -webkit-animation-direction: alternate;/*定义动画方式*/

      from {-webkit-transform: scale(0.5);
        transform: scale(0.5);}
      to{-webkit-transform: scale(1);
        transform: scale(1);}
    }

    #sign_box {
      -webkit-animation-name:'ripple3';/*动画属性名，也就是我们前面keyframes定义的动画名*/
      -webkit-animation-duration: 1s;/*动画持续时间*/
      -webkit-animation-timing-function: ease; /*动画频率，和transition-timing-function是一样的*/
      -webkit-animation-delay: 0s;/*动画延迟时间*/
      -webkit-animation-iteration-count: 1;/*定义循环资料，infinite为无限次*/
      -webkit-animation-direction: alternate;/*定义动画方式*/
    }
    @keyframes ripple3 {
      0% {
        -webkit-transform: scale(0.5);
        transform: scale(0.5);
      }
      50% {
        -webkit-transform: scale(1);
        transform: scale(1);
      }
      75% {
        -webkit-transform: scale(0.8);
        transform: scale(0.8);
      }
      100% {
        -webkit-transform: scale(1);
        transform: scale(1);
      }
    }


    .form-inp {
      overflow: hidden;
      padding: 0 20px;
      box-sizing: border-box;
      -webkit-box-sizing: border-box;
      background: #fff;
      .coupon-btn {
        margin: 20px 0 10px 0;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 18px;
        color: #fff;
        border-radius: 5px;
        background: #ff6900;
      }
    }
    .get-step {
      margin-top: 15px;
      text-align: center;
      color: #f7f7f7;
      font-size: 11px;
      line-height: 22px;
      opacity: .9;
    }



  .form-conimg {
    -webkit-animation: form-conimg 4s linear infinite;
    animation: form-conimg 4s linear infinite;
    img {
        border-radius: 4px 4px 0 0;
      }
    }
  @keyframes form-conimg {
    from {
      transform:rotate(0deg);
    }
    to {
      transform:rotate(360deg);
    }
  }

  }

  .change-size {
    -webkit-animation-name: 'ripple2';/*动画属性名，也就是我们前面keyframes定义的动画名*/
    -webkit-animation-duration: 2s;/*动画持续时间*/
    -webkit-animation-timing-function: ease; /*动画频率，和transition-timing-function是一样的*/
    -webkit-animation-delay: 0s;/*动画延迟时间*/
    -webkit-animation-iteration-count: 1;/*定义循环资料，infinite为无限次*/
    -webkit-animation-direction: alternate;/*定义动画方式*/

    animation-name: 'ripple2';/*动画属性名，也就是我们前面keyframes定义的动画名*/
    animation-duration: 2s;/*动画持续时间*/
    animation-timing-function: ease; /*动画频率，和transition-timing-function是一样的*/
    animation-delay: 0s;/*动画延迟时间*/
    animation-iteration-count: 1;/*定义循环资料，infinite为无限次*/
    animation-direction: alternate;/*定义动画方式*/

    @-webkit-keyframes ripple2 {
      from {
        -webkit-transform: scale(1);
        transform: scale(1);
      }
      to{
        -webkit-transform: scale(0.4) translate(2rem, 4rem);
        transform: scale(0.4) translate(2rem, 4rem);
      }
    }
    @keyframes ripple2 {
      from {
        -webkit-transform: scale(1);
        transform: scale(1);
      }
      to{
        -webkit-transform: scale(0.4) translate(2rem, 4rem);
        transform: scale(0.4) translate(2rem, 4rem);
      }
    }
  }


  .ser_home {
    width: 100%;
    height: 100%;
  }
  .red_packet {
    display: block;
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
    i1 {
      width: 48px;
      height: 69px;
      display: block;
      background: url('./images/petal1.png') no-repeat;
    }
    .i2 {
      width: 38px;
      height: 59px;
      display: block;
      background: url('./images/petal2.png') no-repeat;
    }
    .i3 {
      width: 28px;
      height: 49px;
      display: block;
      background: url('./images/petal3.png') no-repeat;
    }
    li {
      position: absolute;
      animation: all 3s linear;
      top:-100px;
      z-index: 10;
      &.move_1 {
        -webkit-animation: aim_move 3s linear 1 forwards;
        animation: aim_move 3s linear 1 forwards;
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
