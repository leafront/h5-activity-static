<template>
  <div class="ui-header-nav" :class="{'active': headerMenu}">
    <i class="ui-header-arrow"></i>
    <ul class="ui-header-nav-list">
      <li @click="linkAction('/index.html')">
        <i class="home-icon"></i>
        <span class="font">首页</span>
      </li>
      <li @click="showShareMenu" v-if="isApp && isWeixin">
        <i class="share-icon"></i>
        <span class="font">分享</span>
      </li>
      <li @click="linkAction('/my/home.html')">
        <i class="my-icon"></i>
        <span class="font">我&nbsp;&nbsp;</span>
      </li>
    </ul>
  </div>
</template>


<script type="text/javascript">

  import {mapGetters, mapActions} from 'vuex'

  import utils from '@/widget/utils'

  export default {
    data () {
      return {
        isApp: utils.isApp(),
        isWeixin: utils.weixin()
      }
    },
    computed: {
      ...mapGetters({
        'headerMenu': 'getHeaderMenu'
      })
    },
    methods: {
      ...mapActions([
        'updateHeaderMenu',
        'updateShareMenu'
      ]),
      linkAction (url) {
        location.href = url
      },
      showShareMenu () {
        this.$emit('shareAction')
      }
    }
  }
</script>

<style lang="scss">

  .ui-header-nav{
    position: fixed;
    width: 1.6rem;
    right: .2rem;
    top: .88rem;
    background: #3d3d3d;
    opacity: .8;
    z-index:1000;
    transform: translateX(120%);
    transition: all .3s cubic-bezier(0.4, 0.01, 0.165, 0.99);
    &.active{
      transform: translateY(0);
    }
    .ui-header-arrow{
      position: absolute;
      top: -.1rem;
      right: .2rem;
      border-left: .1rem solid transparent;
      border-right: .1rem solid transparent;
      border-bottom: .1rem solid #3d3d3d;
    }
  }
  .ui-header-nav-list{
    li{
      display: flex;
      align-items: center;
      justify-content: center;
      height: .8rem;
      border-bottom: .01rem solid #fff;
      box-sizing: border-box;
      &:last-child{
        border-bottom: 0;
      }
      span{
        color: #fff;
        padding-left: .15rem;
      }
      i{
        background: url(../../images/header_sprite.png) no-repeat;
        background-size: 1.65rem auto;
        width: .34rem;
        height: .34rem;
        &.home-icon{
          background-position: -.53rem 0;
        }
        &.share-icon{
          width: .3rem;
          background-position: -.9rem .01rem;
        }
        &.my-icon{
          height: .38rem;
          background-position: -1.22rem .01rem;
        }
      }
    }
  }
</style>
