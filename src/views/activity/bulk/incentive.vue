<template>
  <div class="incentive">
    <!--月份选择器-->
    <UIMonthPicker
      :start="start"
      :end="end"
      :selectValue="checkedValue"
      :isPicker="isPicker"
      @togglePicker="togglePicker"
      @confirm="confirm">
    </UIMonthPicker>

    <div class="title">
      <div class="box">
        <div>
          <p>100.00</p>
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
          <li>点击数 <span>￥10000</span></li>
          <li>支付笔数 <span>￥10000</span></li>
          <li>收入 <span>￥10000</span></li>
        </div>
      </ul>
      <p @click="selectDate">📅</p>
    </div>

    <div class="list">
      <ul>
        <li>2019年新年礼盒A-神来气旺礼盒1…2019年新年礼盒A-神来气旺礼盒1…</li>
        <li>[¥1400000]</li>
        <li class="order-number">订单号：10343434343434333</li>
      </ul>
      <p>
        +5
      </p>
    </div>
  </div>
</template>

<script>
   import UIMonthPicker from '../../../components/incentive/ui-month-picker.vue'

    export default {
        name: "incentive",
        components: {UIMonthPicker},
        mounted () {
          // this.getList()
        },
        data() {
          return{
            isPicker: false,
            start: 2018,
            checkedValue: ['2018','12'],
            end:  new Date().getFullYear(),
            active: [true, false, false],//统一管理状态;
            tab: [{
              "content": "已结算",　　　　//tab-span
              "func": "com1",           //仅仅用来存放组件;
              "value": 60,
            }, {
              "content": "未结算",
              "func": "com2",
              "value": 40,
            }, {
              "content": "预收入",
              "func": "com3",
              "value": 10,
            }],
            who: "com1",
          }
        },
        methods: {
          selectDate () {
            this.isPicker = true;
            console.log('isPicker', this.isPicker);
            var alarmTime = '10-12';
            if (alarmTime) {
              alarmTime = alarmTime.split('-');
              this.selectvalue = alarmTime;
              console.log('this.selectvalue', this.selectvalue);
            }
          },
          togglePicker (val) {
            this.isPicker = val
            // let birthday = this.userInfo.birthdayStr
            //
            // if (birthday && val) {
            //   birthday =  birthday.split('-')
            //   this.checkedValue = birthday
            // }
          },
          confirm (val) {
            console.log('val', val);
            this.checkedValue = val.split('-')
          },
          change:function(x){

            for(var i=0;i<this.active.length;i++){
              this.active[i]=false;
              this.active[x]=true;
              this.who=this.tab[x].func;
            }
            console.log(this.active);
            // console.log(x);
            this.$set(this.active, 3, 0);
          }
      }
    }
</script>

<style lang="scss" scoped>
  .title {
    height: 4.3rem;
    background: -webkit-linear-gradient(left, #FF7F1B , #FF4301); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #FF7F1B, #FF4301); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #FF7F1B, #FF4301); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #FF7F1B , #FF4301); /* 标准的语法（必须放在最后） */
  }
  .box {
    height: 3rem;
    display: flex;
    justify-content:center;
    align-items:center;
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
    /*background: #fff;*/
  }
  .sub-title {
    display: flex;
    padding: 10px 30px 10px 30px;
  }
  .sub-title .time {
    font-size: .35rem;
  }
  .sub-title .sub-time {
    display: flex;
    justify-content: space-between;
    font-size: .25rem;
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
    margin-top: .4rem;
    color: #FF6900;
    font-size: .4rem;
  }


</style>
