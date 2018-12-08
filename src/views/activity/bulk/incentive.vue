<template>
  <div class="incentive">
    <!--筛选时间选择-->
    <time-picker
      :selectvalue="selectvalue"
      :ispicker="ispicker"
      @confirm="confirm">
    </time-picker>
    <div class="title">
      <div class="box">
        <div>
          <p>100.00</p>
          <p>累计收益</p>
        </div>
      </div>
      <div class="navigation">
        <span class="select">
          <div>60</div>
          <div>已结算</div>
          <p class="navigation-btn"></p>
        </span>
        <span>
          <div>40</div>
          <div>未结算</div>
        </span>
        <span>
          <div>10</div>
          <div>预收入</div>
        </span>
      </div>
    </div>
    <div class="sub-title">
      <div class="time">2018年12月</div>
      <div class="sub-time">
        <li>点击数 <span>￥10000</span></li>
        <li>支付笔数 <span>￥10000</span></li>
        <li>收入 <span>￥10000</span></li>
        <li @click="selectDate">📅</li>
        <button @click="selectDate">日期选择</button>
      </div>
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
   import timePicker from '../../../components/incentive/timePicker.vue'
   // import datePicker from '../../../components/incentive/datePicker.vue'

    export default {
        name: "incentive",
        components: {timePicker},
        mounted () {
          // this.getList()
        },
        data() {
          return{
            ispicker: false,
            selectvalue: ['2018', '12'],
          }
        },
        methods: {
          selectDate () {
            this.ispicker = true;
            console.log('ispicker', this.ispicker);
            var alarmTime = '10-12';
            if (alarmTime) {
              alarmTime = alarmTime.split('-');
              this.selectvalue = alarmTime;
              console.log('this.selectvalue', this.selectvalue);
            }
          }
      }
    }
</script>

<style lang="scss" scoped>
  .title {
    height: 5rem;
    background: -webkit-linear-gradient(left, #FF7F1B , #FF4301); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #FF7F1B, #FF4301); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #FF7F1B, #FF4301); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #FF7F1B , #FF4301); /* 标准的语法（必须放在最后） */
  }
  .box {
    height: 3.7rem;
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
  .navigation .navigation-btn {
    height: .1rem;
    width: .5rem;
    background: #FFEB14;
  }
  .incentive {
    /*background: #fff;*/
  }
  .sub-title {
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
