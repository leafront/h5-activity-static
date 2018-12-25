<template>
  <div>
    <div class="ui-mask" id="invite-rule-mask" :class="{'active': sureChoose}"></div>
    <!-- <span class="ui-invite-close" :class="{'active': ruleText}" @click="toggleSureChoose"></span> -->
    <div class="ui-invite-sure" id="invite-rule" :class="{'active': sureChoose}">
      <div class="pg_component">
        <div class="component_share">
          <div class="pg_cs_title">
              分享到
          </div>
          <div class="pg_cs_content">
            <div class="pg_con_left"@click = "shareAction">
              <div class="pgcs_lf_img">

              </div>
              <div class="pgcs_lf_text">
                 微信好友
              </div>

            </div>

            <div class="pg_con_right" @click="qrcodeShare">
              <div class="pgcs_rt_img">
              </div>
              <div class="pgcs_rt_text">
                 二维码
              </div>
            </div>
          </div>
        </div>
        <div class="component_share_close" @click="toggleSureChoose">
          取消
        </div>

      </div>
      <!-- <img v-for = "(item, index) in addList" :src="item.imageUrl" alt=""> -->
      <!-- <span class="ui-invite-close" :class="{'active': sureChoose}" @click="closeRuleText"></span> -->
    </div>

  </div>
</template>

<style lang="scss">
.component_share{
  background: #fff;
  border-radius: .2rem;
  padding: .3rem ;
}

.pg_cs_title{
  width: max-content;
  margin: .2rem auto;
  color: #333333;
  font-size: .3rem;
}
.pg_cs_content{
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.pg_con_left,.pg_con_right{
  text-align: center;
}
.pgcs_lf_img,.pgcs_rt_img{
  width: 1rem;
  height: 1rem;
  background-size: 100%;
   background-repeat: no-repeat;
  border-radius: 50%;
  margin-bottom: .15rem;
}
.pgcs_lf_img{
    background-image: url(./img/weixin-icon.png);
}

.pgcs_rt_img{
    background-image: url(./img/qrcode-icon.png);
}
.component_share_close{
  background: #fff;
  padding: .3rem;
  text-align: center;
  margin-top: .3rem;
  border-radius: .2rem;
  font-size: .34rem;
  color: #333333;
}

// .ui-invite-close {
//     position: absolute;
//     right: 2px;
//     top: 0px;
//     margin: .2rem auto 0;
//     width: 0.4rem;
//     height: 0.4rem;
//     background-color:  #fff0;
//     border: solid 2px #fff;
//     border-radius: 50%;
//     z-index: 10000;
//     display: none;
//     &.active {
//         display: block;
//     }
//     &:before {
//         content: '';
//         display: block;
//         position: absolute;
//         left: 50%;
//         top: 50%;
//         width: 0.25rem;
//         height: 0.02rem;
//         background: #333333;
//         transform: translateX(-50%) rotate(45deg);
//     }
//     &:after {
//         content: '';
//         display: block;
//         position: absolute;
//         left: 50%;
//         top: 50%;
//         width: 0.25rem;
//         height: 0.02rem;
//         background: #333333;
//         transform: translateX(-50%) rotate(-45deg);
//     }
// }
  .ui-invite-sure{
    margin: .44rem auto 0;
    position: fixed;
    // top:50%;
    // left:50%;
    // transform: translate(-50%,-50%);
    bottom: 0px;
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

  .pg_component{
    background:rgba(0, 0, 0, 0);
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
      sureChoose: {
        type: Boolean,
        default: false
      },

    },

    watch: {
      sureChoose () {

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

      toggleSureChoose () {
        this.$emit('toggleSureChoose',false)
      },
      qrcodeShare(){
        this.$emit('qrcodeShare',true)
        this.toggleSureChoose()
      },
      shareAction(){
        this.$emit('shareAction')

      },
    }
  }

</script>
