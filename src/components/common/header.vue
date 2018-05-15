<template>
  <div class="ui-header" :class="{'ui-header-border':isBorder}">
    <div class="ui-header-back" @click="backAction">
      <span class="ui-header-back_btn"></span>
    </div>
    <h4 class="ui-header-title">{{title}}</h4>
    <slot></slot>
  </div>
</template>

<script type="text/javascript">

  import app from '@/widget/app'

  import utils from '@/widget/utils'

  export default {
    props:['backFn','title','isBorder'],
    data () {
      return {
        isApp: utils.isApp(),
        isWeixin: utils.isWeixin()
      }
    },
    created () {

    },
    methods: {
      backAction () {

        if (typeof this.backFn == 'function') {
          this.backFn()
        } else {
          if (utils.isApp()) {
            app.back()
          } else {
            this.$router.back()
          }
        }

      }
    }
  }

</script>

<style lang="scss">
  .ui-header-right{
    height: .88rem;
    display: flex;
    align-items: center;
    padding: 0 .3rem;
    position:absolute;
    right:0;
    top:0;
    span{
      font-size: .3rem;
      color: #333;
    }
  }

  .ui-header {
    height: .88rem;
    background: #fff;
    display: flex;
    align-items: center;
    position: relative;
    z-index:999;
    &.ui-header-border{
      border-bottom: .01rem solid #ddd;
    }
    .ui-header-back{
      height: .88rem;
      padding: 0 .3rem;
      display: flex;
      align-items: center;
    }
    .ui-header-back_btn{
      width:0.21rem;
      height:0.4rem;
      display: block;
      background:url(../../images/svip_sprite.png) no-repeat -0.11rem -0.11rem;
      background-size: 5rem auto;
    }
    .ui-header-title{
      height:.88rem;
      display: flex;
      align-items: center;
      position: absolute;
      left:50%;
      top:0;
      transform: translateX(-50%);
      font-size: .36rem;
      color:#333;
      text-align: center;
    }
  }

</style>
