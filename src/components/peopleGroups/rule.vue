<template>
  <div>
    <div class="ui-mask" id="invite-rule-mask" :class="{'active': ruleText}"></div>
    <!-- <span class="ui-invite-close" :class="{'active': ruleText}" @click="closeRuleText"></span> -->
    <div class="ui-invite-rule" id="invite-rule" :class="{'active': ruleText}">
      <div class="rule_child">
        <div class="pg_form_title">
          我发起的团购
        </div>
        <div class="pg_form">
          <div class="pg_form_description">
          <div class="pg-register-input">
              <div class="item_a_name">
                数量
              </div>
              <input type="tel" maxlength="13" autocomplete="off" v-model="formDate.number" class="item_a" placeholder="0"/>
              <div class="item_a_unit">
                盒
              </div>
          </div>
          <div class="pg-register-input">
              <div class="item_a_name">
                单价
              </div>
              <input type="tel" maxlength="13" autocomplete="off" v-model="formDate.prize" class="item_a" placeholder="0"/>
              <div class="item_a_unit">
                >={{grouponPrice}}/盒
              </div>
          </div>
          <div class="pg-register-input">
              <div class="item_a_name">
                合计
              </div>
               <div class="">
                 {{formDate.number*formDate.prize}}元
               </div>
          </div>
          <div class="pg-register-input">
              <div class="item_a_name item_a_name1">
                预计奖励
              </div>
               <div class="item_a_name1">
                 {{formDate.number*mpPrice}}元
               </div>
          </div>

        </div>

        </div>
        <div class="pg_form_bt" @click = "sendGroup">
          发起团购

        </div>
      </div>
      <!-- <img v-for = "(item, index) in addList" :src="item.imageUrl" alt=""> -->
      <span class="ui-invite-close" :class="{'active': ruleText}" @click="closeRuleText"></span>
    </div>

  </div>
</template>

<style lang="scss">
.pg_form_title{
  color: #000000;
  font-size: .36rem;
  width: max-content;
  margin: auto;
  margin-bottom: .3rem;

}
.pg_form{
  display: flex;
  align-items: center;
  justify-content: center;
}
  .pg-register-input{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: .32rem;
    margin-bottom: .3rem;
  }
  .item_a_name{
    width: 1.28rem;
    font-size: .32rem;
    margin-right: .5rem;
    letter-spacing:.2rem;
  }
  .item_a{
    width: 2rem;
    border: solid 2px #EAEAEA;
    height: .7rem;
    border-radius: .1rem;
    margin-right: .2rem;
    font-size: .3rem;
    padding-left: .1rem;
    padding-right: .1rem;
  }
.item_a_name1{
  color: #FF4D00;
  letter-spacing:normal;
}
.pg_form_bt{
  width: 90%;
  margin: .3rem auto;
  background: linear-gradient(to right,#FF8E0C,#FF8E0C,#FF761A,#FF5E28);
  border-radius: .4rem;
  text-align: center;
  color: #fff;
  font-size: .36rem;
  padding: .2rem ;
}
.ui-invite-close {
    position: absolute;
    right: 2px;
    top: 0px;
    margin: .2rem auto 0;
    width: 0.4rem;
    height: 0.4rem;
    background-color:  #fff0;
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
  .ui-invite-rule{
    margin: .44rem auto 0;
    position: fixed;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    width: 100%;
    max-height: 80%;
    z-index:999;
    // padding: 0 .4rem .3rem;
    border-radius: .2rem;
    color:#fff;
    overflow-scrolling: touch;
    -webkit-overflow-scrolling: touch;
    overflow: scroll;
    display: none;
    h4{
      text-align: center;
      font-size: .32rem;
      line-height: .8rem;
    }
    &.active{
      display: block;
    }
  }

  .rule_child{
    background:#fff;
    padding: .2rem .3rem;
    overflow-y: scroll;
    color: #000000;
    width: 100%;
    border-radius: .2rem;

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

    },
    data() {
      return {
         formDate:{
           number:"",
           prize:"",

         },

      }
    },

    watch: {
      ruleText () {

        /**
         *
         * 阻止弹层外的元素滚动
         */
        document.getElementById('invite-rule-mask').addEventListener('touchmove',(event) => {

          event.preventDefault()

          event.stopPropagation()

        },false)

        document.getElementById('invite-rule').addEventListener('touchmove',(event) => {

          event.stopPropagation()
        },utils.isPassive() ? {passive: true} : false)
        document.getElementById('invite-rule').addEventListener('scroll',(event) => {

          event.stopPropagation()
        },utils.isPassive() ? {passive: true} : false)
      }
    },
    methods: {

      closeRuleText () {
        this.$emit('toggleRuleText',false)
      },
      sendGroup(){
        if(!this.formDate.number){
        this.$toast('请输入盒数')
        return
        }
        if(!this.formDate.prize){
        this.$toast('请输入价格')
        return
      }else if (this.formDate.prize < this.grouponPrice) {
        this.$toast('价格必须大于商品价格')
        return
      }
        this.$emit('sendGroup',this.formDate)
        this.closeRuleText()
      }
    }
  }

</script>
