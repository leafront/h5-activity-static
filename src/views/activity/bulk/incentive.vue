<template>
  <div class="incentive">
    <!--title-->
    <AppHeader :title="title" :backFn="backAction">
    </AppHeader>
    <!--月份选择器-->
    <UIMonthPicker
      :start="start"
      :end="end"
      :selectValue="checkedValue"
      :isPicker="isPicker"
      @togglePicker="togglePicker"
      @confirm="confirm">
    </UIMonthPicker>
    <div class="loading_circles" :class="{'show-loading': showLoading}"><img src="./loading_circles.png"></div>

  <div class="scroll-view-wrapper" :class="{'visibility': true}">
      <div class="title" :style="{'marginTop': showHead ? '0.6rem' : '0'}">
        <div class="box">
          <div>
            <p class="totalAmount">{{wholeSaleAward.totalAmount}}<span class="rule" :style="{'top': showHead ? '1.5rem' : '0.6rem'}">收入说明</span></p>
            <p>累计收益</p>
          </div>
        </div>

        <div class="navigation">
          <span :class="{select: active[index]}"   v-for="(item, index) in tab" @click="change(index)">
            <div>{{item.value}}</div>
            <div>{{item.content}}</div>
            <p v-show="active[index]" :class="{line: active[index]}"></p>
          </span>
        </div>
      </div>

      <div class="sub-title">
        <ul>
          <li class="time">{{checkedValue[0]}}年{{checkedValue[1]}}月</li>
          <div class="sub-time">
            <!--<li>点击数 <span>￥10000</span></li>-->
            <li>支付笔数 <span>{{wholeSaleDetail.payNum}}</span></li>
            <li>收入 <span>￥{{wholeSaleDetail.income}}</span></li>
          </div>
        </ul>
        <p @click="selectDate">📅</p>
      </div>

      <div class="list" v-if="wholeSaleDetail.list.listObj" v-for="item in wholeSaleDetail.list.listObj">
        <ul>
          <li>{{item.mpName}}</li>
          <li>[¥{{item.orderAmount}}]</li>
          <li class="order-number">订单号：{{item.orderCode}}</li>
        </ul>
        <p>
          +{{item.awardAmount}}
        </p>
      </div>
  </div>
    <!--<div class="list">-->
      <!--<ul>-->
        <!--<li>{{483748738}}</li>-->
        <!--<li>[¥{{1212}}]</li>-->
        <!--<li class="order-number">订单号：{{12212}}</li>-->
      <!--</ul>-->
      <!--<p>-->
        <!--+{{3232}}-->
      <!--</p>-->
    <!--</div>-->
    <!--<div class="list">-->
      <!--<ul>-->
        <!--<li>{{483748738}}</li>-->
        <!--<li>[¥{{1212}}]</li>-->
        <!--<li class="order-number">订单号：{{12212}}</li>-->
      <!--</ul>-->
      <!--<p>-->
        <!--+{{3232}}-->
      <!--</p>-->
    <!--</div>-->
    <!--<div class="list">-->
      <!--<ul>-->
        <!--<li>{{483748738}}</li>-->
        <!--<li>[¥{{1212}}]</li>-->
        <!--<li class="order-number">订单号：{{12212}}</li>-->
      <!--</ul>-->
      <!--<p>-->
        <!--+{{3232}}-->
      <!--</p>-->
    <!--</div>-->
    <!--<div class="list">-->
      <!--<ul>-->
        <!--<li>{{483748738}}</li>-->
        <!--<li>[¥{{1212}}]</li>-->
        <!--<li class="order-number">订单号：{{12212}}</li>-->
      <!--</ul>-->
      <!--<p>-->
        <!--+{{3232}}-->
      <!--</p>-->
    <!--</div>-->


  </div>
</template>

<script>
  import utils from '@/widget/utils'
  import AppHeader from '@/components/common/header'
  import UIMonthPicker from '../../../components/incentive/ui-month-picker.vue'
  import * as Model from '@/model/incentive'

    export default {
        name: "incentive",
        components: {UIMonthPicker, AppHeader},
        create () {

        },
        mounted () {
          this.showHeader();
          // 查询全民团购奖金汇总数据
          this.getWholeSaleAward();
          // 查询个人团购明细
          this.queryWholeSaleDetailPage();
        },
        data() {
          return{
            title: '奖励金',
            isBorder: true,
            isPicker: false,
            start: 2018,
            checkedValue: ['2018','12'],
            end:  new Date().getFullYear(),
            active: [true, false, false],//统一管理状态;
            tab: [{
              "content": "已结算",　　　　//tab-span
              "func": 3,           //仅仅用来存放组件;
              "value": 0,
            }, {
              "content": "未结算",
              "func": 1,
              "value": 0,
            }, {
              "content": "预收入",
              "func": 0,
              "value": 0,
            }],
            salesType: 3,
            showHead: false,
            wholeSaleAward: {
              estimateAmount: 0,//预估金额
              settledAmount: 0, //已结算金额
              totalAmount: 0, //累计收益
              unsettleAmount: 0, //未结算金额
            },
            wholeSaleDetail: {
              list:{
                listObj: []
              }
            },
            queryDate: new Date().getFullYear() + '-' + (new Date().getMonth() + 1),
            showLoading: true,
          }
        },
        methods: {
          // 查询全民团购奖金汇总数据
          getWholeSaleAward () {
            this.showLoading = true;
            Model.getWholeSaleAward({
              type: 'POST',
              data: {
                ut: '5eed8355c988ee16e14017a096c8fa3343',
              }
            }).then((result) => {
              const data = result.data

              if (result.code == 0 && data) {
                this.showLoading = false;
                this.wholeSaleAward = data;
                // 塞入数据
                this.tab[0].value = this.wholeSaleAward.settledAmount;
                this.tab[1].value = this.wholeSaleAward.unsettleAmount;
                this.tab[2].value = this.wholeSaleAward.estimateAmount;


                this.currentPage = 1
                // this.getCouponList()
                // this.$toast('领取成功')
              } else {
                this.$toast(result.message)
              }
            })
          },
          // 查询个人团购明细
          queryWholeSaleDetailPage () {
            this.showLoading = true;
            Model.queryWholeSaleDetailPage({
              type: 'POST',
              data: {
                ut: '5eed8355c988ee16e14017a096c8fa3343',
                settlementStatus: this.salesType,
                date: this.queryDate,
                itemsPerPage: 100,
                currentPage: 1
              }
            }).then((result) => {
              const data = result.data

              if (result.code == 0 && data) {
                this.showLoading = false;
                this.wholeSaleDetail = data;
                this.currentPage = 1
                // this.getCouponList()
                // this.$toast('领取成功')
              } else {
                this.$toast(result.message)
              }
            })
          },
          selectDate () {
            this.isPicker = true;
            var alarmTime = '10-12';
            if (alarmTime) {
              alarmTime = alarmTime.split('-');
              this.selectvalue = alarmTime;
              console.log('this.selectvalue', this.selectvalue);
            }
          },
          togglePicker (val) {
            this.isPicker = val
          },
          confirm (val) {
            console.log('val', val);
            this.checkedValue = val.split('-');
            this.queryDate = val;
            console.log(this.checkedValue);
            this.queryWholeSaleDetailPage();
          },
          change:function(x){

            for(var i=0;i<this.active.length;i++){
              this.active[i]=false;
              this.active[x]=true;
              this.salesType=this.tab[x].func;
            }
            console.log('this.salesType', this.salesType);
            console.log(this.active);
            // console.log(x);
            this.$set(this.active, 3, 0);
            this.queryWholeSaleDetailPage();
          },
          showHeader () {
            if (utils.isApp()) {
              if (utils.query('hideHead') == 0 && utils.getVersion() < 5320) {
                return this.showHead = true;
              } else {
                return this.showHead = false;
              }
            } else if (utils.weixin() || utils.nativeQQ()) {
              return this.showHead = false;
            } else {
              return this.showHead = true;
            }
          }
      },
      computed: {

      },
  }
</script>

<style lang="scss" scoped>
  .title {
    height: 3.6rem;
    background: -webkit-linear-gradient(left, #FF7F1B , #FF4301); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #FF7F1B, #FF4301); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #FF7F1B, #FF4301); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #FF7F1B , #FF4301); /* 标准的语法（必须放在最后） */
  }
  .box {
    height: 2.4rem;
    display: flex;
    justify-content:center;
    align-items:center;
  }
  .box .rule {
    color: #fff;
    position: absolute;
    font-size: .3rem;
    right: 0;
    top: 1.5rem;
    background: #E54807;
    padding-top: .15rem;
    padding-bottom: .15rem;
    padding-left: .7rem;
    padding-right: .2rem;
    border-top-left-radius: .5rem;
    border-bottom-left-radius: .5rem;
    opacity:0.9;
  }
  .box div p {
    color: #fff;
    font-size: 1rem;
  }
  .box div p:nth-child(2)
  {
    text-align: center;
    font-size: .3rem;
  }
  .navigation {
    display: flex;
    color: #fff;
  }
  .navigation span {
    width: 33%;
    text-align: center;
    font-size: .4rem;
    opacity: 0.6;
  }
  .navigation .select {
    opacity: 1;
  }
  .navigation .line {
    background: #FFEB14;
    height: .1rem;
    width: .6rem;
    margin-left: 38%;
    border-radius: .1rem;
  }
  .navigation .navigation-btn {
    height: .1rem;
    width: .5rem;
    background: #FFEB14;
  }
  .incentive {
    width: 100%;
    overflow-x:hidden;
    background: #fff;
  }
  .sub-title {
    background: #F5F5F5;
    display: flex;
    padding: 10px 30px 10px 30px;
  }
  .sub-title .time {
    font-size: .35rem;
  }
  .sub-title .sub-time {
    display: flex;
    /*justify-content: space-between;*/
    font-size: .25rem;
  }
  .sub-title .sub-time li:nth-child(2){
    margin-left: .5rem;
  }
  .sub-title .sub-time li span{
    color: #FF6900;
  }
  .sub-title ul {
    width: 80%;
  }
  .sub-title p {
    width: 20%;
    text-align: right;
    margin-top: .4rem;
    color: #FF6900;
    font-size: .4rem;
    margin-top: .2rem;
  }
  .list {
    height: 1.6rem;
    background: #fff;
    padding: 10px 30px 10px 30px;
    display: flex;
    border-bottom: thick solid #EAEAEA;
  }
  .list ul{
    width: 80%;
    font-size: .25rem;
  }
  .list ul li:first-child{
    font-size: .35rem;
    color: #333333;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap !important;
    outline: 0 !important
  }
  .list .order-number {
    margin-top: .15rem;
    color: #B2B2B2;
  }
  .list p{
    width: 20%;
    text-align: right;
    color: #FF6900;
    font-size: .4rem;
    margin-top: .4rem;
  }
  .list .award-money {
    position: relative;
    left: 6rem;
    top: -0.8rem;
  }
  .totalAmount {
    text-align: center;
  }

  .loading_circles {
    position:absolute;
    top:50%;
    left:50%;
    margin:-100px 0 0 -150px;
    width:300px;
    height:200px;
    z-index:99;
    text-align: center;
    padding-top: 50px;
    visibility: hidden;
  }
  .loading_circles img{
    animation: rotateImg 2s linear 1s infinite;
    -webkit-animation:rotateImg 2s linear infinite;
  }

  @keyframes rotateImg {
    0% {transform : rotate(0deg);}
    100% {transform : rotate(360deg);}
  }

  @-webkit-keyframes rotateImg {
    0%{-webkit-transform : rotate(0deg);}
    100%{-webkit-transform : rotate(360deg);}
  }
  .show-loading {
    visibility: visible;
  }

</style>
