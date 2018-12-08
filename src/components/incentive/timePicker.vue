<template>
  <div>
    <div class="weui-picker" :class="{'active':ispicker}">
      <div class = "weui-picker__hd">
        <span class="weui-picker__action" @click="cancel">取消</span>
        <span class="weui-picker__action" @click="confirm">确定</span>
      </div>
      <div class="sub-title">设置提醒时间</div>
      <div class = "weui-picker__bd">
        <div class="weui-picker__group">
          <ul class="weui-picker__content">
            <li v-for="num in 3"></li>
            <li class="weui-picker__item" :class="{'weui-picker_item_active': checkedDate[0]== $index}" v-for="($index,item) in Hours">{{item}}</li>
            <li v-for="num in 3"></li>
          </ul>
          <div class="weui-picker__mask"></div>
          <div class="weui-picker__indicator"></div>
        </div>
        <div class="weui-picker__group">
          <ul class="weui-picker__content">
            <li v-for="num in 3"></li>
            <li class="weui-picker__item" :class="{'weui-picker_item_active': checkedDate[1]== $index}" v-for="($index,item) in Minutes">{{item}}</li>
            <li v-for="num in 3"></li>
          </ul>
          <div class="weui-picker__mask"></div>
          <div class="weui-picker__indicator"></div>
        </div>
      </div>
    </div>
    <div class="weui-mask" :class="{'active':ispicker}" @click="cancel"></div>
  </div>
</template>

<script>

  import IScroll from './iScroll'
  export default {
    props: {
      selectvalue: {
        default: ['10', '30'],
        type: Array
      },
      ispicker: {
        default: false,
        type: Boolean
      },
      selectpicker: {
        default: '',
        type: String
      }
    },
    data () {
      return {
        scroll: [],
        checkedDate: ['10时', '30分'],
        Hours: [],
        Minutes: []
      }
    },
    computed: {
      selectHour () {
        return this.selectvalue[0]
      },
      selectMinute () {
        return this.selectvalue[1]
      },
    },
    created () {
      this.initData()
    },
    watch: {
      'ispicker': {
        handler: function () {
          setTimeout(() => {
            this.scrollList()
          },0)

        }
      }
    },
    methods: {
      initData () {

        for (let i = 0; i < 24; i++) {
          let j;
          j = i + '时';
          this.Hours.push(j);
        }

        for (let i = 0; i < 60; i++) {
          let j;
          j = i + '分';
          this.Minutes.push(j);
        }

      },
      scrollList () {

        var self = this
        this.scroll = []
        this.checkedDate =  [this.selectHour, this.selectMinute]

        var itemHeight = document.querySelector('.weui-picker__item').offsetHeight
        var itemEle = document.querySelectorAll('.weui-picker__item')
        var groupEle = document.querySelectorAll('.weui-picker__group')
        var len = groupEle.length

        Array.from(groupEle).forEach((item,idx) => {
          var iscroll = new IScroll(item, {
            scrollX: false
          })

          self.scroll.push(iscroll)

          iscroll.on('scrollEnd', function () {

            var itemLen = item.querySelectorAll('.weui-picker__content li').length - 7

            var result = ( -this.y / itemHeight)

            if (result > itemLen) {
              result = itemLen
            }

            var index = parseInt(result, 10)

            var diff = result - index

            if (diff > 0.5) {
              index++;
            }

            self.checkedDate.splice(idx,1,index)

            self.scroll[len-1].refresh()

          })
          this.scroll[idx].scrollTo(0, -self.checkedDate[idx] * itemHeight)
        })
      },
      cancel () {
        this.ispicker = false
      },
      confirm () {

        console.log('this.checkedDate', this.checkedDate);

        let value = this.checkedDate[0] + '-' + this.checkedDate[1];


        this.ispicker = false
        this.$emit('confirm', value)
      }
    }
  }

</script>

<style scoped>
  .sub-title {
    text-align: center;
    font-size: 20px;
  }
  .weui-mask {
    position: fixed;
    z-index: 1000;
    top: 0px;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .6);

    display: none;
  }

  .weui-mask.active{

    display: block;

  }
  .weui-picker {
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    z-index: 5000;
    transform: translateY(100%) translate3d(0, 0, 0);

    transition: transform 0.5s cubic-bezier(0.4, 0.01, 0.165, 0.99);
    background: #fff;
  }

  .weui-picker.active {
    transform: translateY(0)
  }
  .weui-picker__hd {
    display: flex;
    background-color: #fff;
    position: relative;
    text-align: center;

  }
  .weui-picker__hd:after {
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid #d7d7dc;
    color: #d7d7dc;
    transform-origin: 0 100%;
    transform: scaleY(0.5);
  }
  .weui-picker__action {
    display: block;
    flex: 1;
    color: #1aad19;
    padding: 10px 15px;
    font-size: 16px;
  }
  .weui-picker__action:first-child {
    text-align: left;
    color:#888;
  }
  .weui-picker__action:last-child {
    text-align: right;
  }
  .weui-picker__bd {
    display: flex;
    position: relative;
    background-color: #fff;
    height: 238px;
    overflow: hidden;
  }
  .weui-picker__group {
    flex: 1;
    position: relative;
    height: 100%;
  }
  .weui-picker__mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    z-index: 3;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6)), linear-gradient(0deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6));
    background-position: top, bottom;
    background-size: 100% 102px;
    background-repeat: no-repeat;
    transform: translateZ(0);
  }
  .weui-picker__indicator {
    width: 100%;
    height: 34px;
    position: absolute;
    left: 0;
    top: 102px;
    z-index: 3;
  }
  .weui-picker__indicator:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #d7d7dc;
    color: #d7d7dc;
    transform-origin: 0 0;
    transform: scaleY(0.5);
  }
  .weui-picker__indicator:after {
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid #d7d7dc;
    color: #d7d7dc;
    transform-origin: 0 100%;
    transform: scaleY(0.5);
  }
  .weui-picker__content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
  .weui-picker__content li{
    line-height: 34px;
    height:34px;
    text-align: center;
    color: #999;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-size:16px;
  }

  .weui-picker__content li.weui-picker_item_active{
    color: #333;
    font-size: 18px;
  }
</style>
