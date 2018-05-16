<template>
  <div class="ui-header-nav" :class="{'active': headerMenu}">
    <i class="ui-header-arrow"></i>
    <ul class="ui-header-nav-list">
      <li>
        <i class="ui-header-nav-home-icon"></i>
        <span class="font">首页</span>
      </li>
      <li @click="showShareMenu">
        <i class="ui-header-nav-share-icon"></i>
        <span class="font">分享</span>
      </li>
      <li>
        <i class="ui-header-nav-my-icon"></i>
        <span class="font">我&nbsp;&nbsp;</span>
      </li>
    </ul>
  </div>
</template>


<style lang="scss">

  .ui-header-nav{
    position: fixed;
    width: 1.6rem;
    height: 2.4rem;
    right: .2rem;
    top: .88rem;
    background: #3d3d3d;
    opacity: .8;
    z-index:1000;
    transform: translateX(120%);
    transition: all .5s cubic-bezier(0.4, 0.01, 0.165, 0.99);
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
        background: url(../../images/svip_sprite.png) no-repeat;
        background-size: 5rem auto;
        width: .34rem;
        height: .34rem;
        &.ui-header-nav-home-icon{
          background-position: -1.01rem 0;
        }
        &.ui-header-nav-share-icon{
          width: .3rem;
          background-position: -1.38rem .01rem;
        }
        &.ui-header-nav-my-icon{
          height: .38rem;
          background-position: -1.7rem .01rem;
        }
      }
    }
  }
</style>

<script type="text/javascript">

  import {mapGetters, mapActions} from 'vuex'

  export default {
    data () {
      return {

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
      pageAction (url){
        location.href = ''
      },
      showShareMenu () {
       this.$emit('weixinShare')
      }
    }
  }
</script>
