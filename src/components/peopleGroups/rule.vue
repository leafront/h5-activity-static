<template>
<div>
  <div class="ui-mask" id="invite-rule-mask" :class="{'active': ruleText}"></div>
  <div class="ui-invite-rule" id="invite-rule" :class="{'active': ruleText}">
    <div class="rule_child">
      <div class="pg_form_title">
        我发起的团购
      </div>
      <div class="pg_form">
        <form class="" id="groupsForm">
          <div class="pg_form_description">
            <div class="pg-register-input" >
              <div class="item_a_name">
                数量
              </div>
              <input type="tel" autocomplete="off" autofocus v-model="formDate.number" class="item_a" placeholder="0" />
              <div class="item_a_unit">
                盒
              </div>
            </div>

            <div class="pg-register-input">
              <div class="item_a_name">
                原价
              </div>
              <!-- <input type="number" autocomplete="off" v-model="formDate.prize" class="item_a" placeholder="0" /> -->
              <div class="item_a_unit">
                {{grouponPrice}} 元/盒
              </div>
            </div>

            <div class="pg-register-input" >
              <div class="item_a_name">
                折扣
              </div>
              <div class="field_reduce" @click="rebateRe">

              </div>
              <div class="item_a field_f">
                <input type="number" autocomplete="off" maxlength="3" v-model="formDate.rebate" class="field_c" placeholder="0" />
                <div class="field_text">
                  折
                </div>
              </div>
              <!-- <input type="tel" autocomplete="off" autofocus v-model="formDate.number" class="item_a field_a" placeholder="0" /> -->
              <div class="field_plus" @click="rebateAdd">

              </div>
            </div>

            <div class="pg-register-input">
              <div class="item_a_name">
                合计
              </div>
              <div class="">
                {{(formDate.number*grouponPrice*formDate.rebate/10).toFixed(2)}}元
              </div>
            </div>
            <div class="pg-register-input">
              <div class="item_a_name item_a_name1">
                预计奖励
              </div>
              <div class="item_a_name1">
                {{(formDate.number*mpPrice).toFixed(2)}}元
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="pg_form_bt" @click="sendGroup">
        发起团购

      </div>
    </div>
    <span class="ui-invite-close" :class="{'active': ruleText}" @click="closeRuleText"></span>
  </div>

</div>
</template>

<style lang="scss">
.field_plus,
.field_reduce {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-size: 100%;
    background-repeat: no-repeat;
}
.field_reduce {
    margin-right: 0.2rem;
    background-image: url("./img/fieldReduce.png");
}
.field_plus {
    background-image: url("./img/fieldPlus.png");

}

.pg_form_title {
    color: #000000;
    font-size: 0.36rem;
    width: max-content;
    margin: auto auto 0.3rem;

}
.pg_form {
    display: flex;
    align-items: center;
    justify-content: center;
}
.pg-register-input {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 0.32rem;
    margin-bottom: 0.3rem;
}
.item_a_name {
    width: 1.28rem;
    font-size: 0.32rem;
    margin-right: 0.5rem;
    letter-spacing: 0.2rem;
}
.item_a {
    width: 2rem;
    border: solid 2px #EAEAEA;
    height: 0.7rem;
    border-radius: 0.1rem;
    margin-right: 0.2rem;
    font-size: 0.3rem;
    padding-left: 0.1rem;
    padding-right: 0.1rem;
}
.item_a_name1 {
    color: #FF4D00;
    letter-spacing: normal;
}
.field_f {
    display: flex;
    justify-content: space-between;
    align-items: center;

}
.field_c {
    width: 1.2rem;
    height: 0.7rem;
    flex: 1 1 auto;

}

.pg_form_bt {
    width: 90%;
    margin: 0.3rem auto;
    background: linear-gradient(to right,#FF8E0C,#FF8E0C,#FF761A,#FF5E28);
    border-radius: 0.4rem;
    text-align: center;
    color: #fff;
    font-size: 0.36rem;
    padding: 0.2rem;
}
.ui-invite-close {
    position: absolute;
    right: 2px;
    top: 0;
    margin: 0.2rem auto 0;
    width: 0.4rem;
    height: 0.4rem;
    background-color: #fff0;
    border: solid 2px #fff;
    border-radius: 50%;
    z-index: 10000;
    display: none;
    &.active {
        display: block;
    }
    &:before {
        content: '';
        display: block;
        position: absolute;
        left: 50%;
        top: 50%;
        width: 0.25rem;
        height: 0.02rem;
        background: #333333;
        transform: translateX(-50%) rotate(45deg);
    }
    &:after {
        content: '';
        display: block;
        position: absolute;
        left: 50%;
        top: 50%;
        width: 0.25rem;
        height: 0.02rem;
        background: #333333;
        transform: translateX(-50%) rotate(-45deg);
    }
}
.ui-invite-rule {
    margin: 0.44rem auto 0;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    // bottom: 0;
    width: 100%;
    max-height: 80%;
    z-index: 999;
    // padding: 0 .4rem .3rem;
    border-radius: 0.2rem;
    color: #fff;
    overflow-scrolling: touch;
    -webkit-overflow-scrolling: touch;
    overflow: scroll;
    display: none;
    h4 {
        text-align: center;
        font-size: 0.32rem;
        line-height: 0.8rem;
    }
    &.active {
        display: block;
    }
}

.rule_child {
    background: #fff;
    padding: 0.2rem 0.3rem;
    overflow-y: scroll;
    color: #000000;
    width: 100%;
    border-radius: 0.2rem;

}
</style>

<script type="text/javascript">
import utils from '@/widget/utils'

import * as Model from '@/model/invitation'

export default {


  props: {
    ruleText: {
      type: Boolean,
      default: false
    },
    grouponPrice: {
      type: Number,
      default: 0
    },
    mpPrice: {
      type: Number,
      default: 0
    },
    rebateArr: {
      type: Array,
      default: []
    },

  },
  data() {
    return {
      formDate: {
        number: "",
        prize: "",
        rebate: "",

      },
      zhekouValue: "",

    }
  },

  watch: {
    ruleText() {

      /**
       *
       * 阻止弹层外的元素滚动
       */
      document.getElementById('invite-rule-mask').addEventListener('touchmove', (event) => {

        event.preventDefault()

        event.stopPropagation()

      }, false)

      document.getElementById('invite-rule').addEventListener('touchmove', (event) => {

        event.stopPropagation()
      }, utils.isPassive() ? {
        passive: true
      } : false)
      document.getElementById('invite-rule').addEventListener('scroll', (event) => {

        event.stopPropagation()
      }, utils.isPassive() ? {
        passive: true
      } : false)
    }
  },
  methods: {

    /*
     * 失去焦点后滚动为零
     */

    scrollInt(){
      const form = document.getElementById("groupsForm")
      const fieldOne = form.elements[0]
      const fieldTwo = form.elements[1]
      fieldOne.addEventListener("blur",()=>{
        fieldTwo.focus()
      },false)

      fieldTwo.addEventListener("blur",()=>{
        if(document.body.scrollTop){
          document.body.scrollTop = 0
          document.documentElement.scrollTop = 0

        }else {
          document.documentElement.scrollTop = 0

        }
      },false)
    },

    // addFocus(index){
    //   const form = document.getElementById("groupsForm")
    //   const field = form.elements[index]
    //   field.focus()
    // },

    rebateRe() {
      if (this.formDate.rebate <= 0.1) {
        this.$toast('已经是最小值')
        return
      }
      this.formDate.rebate = Number(this.formDate.rebate)
      this.formDate.rebate -= 0.1
      this.formDate.rebate = this.fomatFloat(this.formDate.rebate, 1)
    },

    rebateAdd() {
      if (this.formDate.rebate >= 10) {
        this.$toast('已经是最大值')
        return
      }
        this.formDate.rebate = Number(this.formDate.rebate)
      this.formDate.rebate += 0.1
      this.formDate.rebate = this.fomatFloat(this.formDate.rebate, 1)
    },

    fomatFloat(src, pos) {
      return Math.round(src * Math.pow(10, pos)) / Math.pow(10, pos);
    },

    /*
     * 遍历折扣数组数组
     */

    traversing() {
      let rebateArr = this.rebateArr
      for (var i = 0; i < rebateArr.length; i++) {
        if (i <= rebateArr.length - 2) {
          if (rebateArr[i].reachNum <= this.formDate.number && this.formDate.number < rebateArr[i + 1].reachNum) {
            this.zhekouValue = rebateArr[i].discountValue
              this.formDate.rebate = this.zhekouValue
            return
          } else if (this.formDate.number < rebateArr[i].reachNum) {
            this.zhekouValue = 10
              this.formDate.rebate = this.zhekouValue
              return
          }else {
            continue
          }
        } else if (i == rebateArr.length -1) {
          if (rebateArr[i].reachNum <= this.formDate.number) {
            this.zhekouValue = rebateArr[i].discountValue
              this.formDate.rebate = this.zhekouValue
            return
          }
        }
      }


    },

    /*
     * 取消焦点的监听
     */

     cancelFoc(){
       const form = document.getElementById("groupsForm")
       const fieldNum = form.elements[1]
       fieldNum.addEventListener("focus",()=>{
          this.traversing()
          // this.$toast('最低折扣'+ this.zhekouValue +'折' )
       },false)


     },

    /*
     * 输入三位后禁掉
     */
    maxLength() {
      const form = document.getElementById("groupsForm")
      const rebate = form.elements[1]
      console.log(rebate,"hahha");
      rebate.addEventListener("keyup", (e) => {
        let target = e.target
        if (target.value.length > target.maxLength) {
        this.$toast('已经超过最大位数')
        }
      }, false)

    },

    /*
     * 适配取carCode
     */

    getCharCode(e) {
      if (typeof e.charCode == "number") {
        return event.charCode
      } else {
        return event.keyCode
      }
    },
    observeNum() {
      const form = document.getElementById("groupsForm")
      const fieldNum = form.elements[0]
      fieldNum.addEventListener("keypress", (event) => {

        let charCode = this.getCharCode(event)
        if (!/\d/.test(String.fromCharCode(charCode)) && charCode > 9 && !event.ctrlKey) {
          event.preventDefault()
        }
      }, false)
    },

    closeRuleText() {
      this.$emit('toggleRuleText', false)
    },
    sendGroup() {
      if (!this.formDate.number) {
        this.$toast('请输入盒数')
        return
      }
      if (isNaN(this.formDate.number) ) {
        this.$toast('请输入数字')
        return
      }
      if (this.formDate.number <= 1) {
        this.$toast('盒数必须大于1')
        return
      }else if (!/^[1-9](\.\d{1})?$|^10$|^0(\.\d{1})$/.test(this.formDate.rebate)) {
        this.$toast('请输入正确的折扣格式')
        return
      }
       else if (this.formDate.rebate < this.zhekouValue) {
        this.$toast('折扣必须大于最低折扣')
        return
      }
      this.$emit('sendGroup', this.formDate)
      this.formDate.number = ""
      this.formDate.rebate = ""

      this.closeRuleText()
    }
  },
  created() {

    setTimeout(() => {
      this.observeNum()
      this.maxLength()
      this.cancelFoc()
      this.scrollInt()

    }, 0)

  }
}
</script>
