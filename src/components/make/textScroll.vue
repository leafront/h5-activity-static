<template>
  <div class="user-broadcast">
    <UiTextScroll 
      :list="list"
      :eleHeight="eleHeight">
      <div class="user-broadcast-list">
        <div class="user-broadcast-item" v-for="item in list">
          <img :src="item.headPicUrl || headImg"/>
          <p>{{item.nickName || item.mobile}}赚到了{{item.money}}元鼓励金</p>
        </div>
      </div>
    </UiTextScroll>
  </div>
</template>

<script type="text/javascript">

  import config from '@/config/index'
  import UiTextScroll from '@/components/widget/ui-text-scroll'

  export default {
    data () {
      return {
        headImg: config.staticPath + '/webapp-static/images/logo-laiyifen.png',
        eleHeight: '.68'
      }
    },
    props: {
      list: {
        type: Array,
        default: []
      },
      posY: {
        type: Number,
        default: 0
      }
    },
    components: {
      UiTextScroll
    },
    methods: {
      pageAction (url) {
        if (url) {
          location.href = url
        }
      }
    }
  }

</script>

<style lang="scss">
  .user-broadcast{
    height: .68rem;
    overflow: hidden;
    position: absolute;
    top: .2rem;
    left: .3rem;
  }
  .user-broadcast-item{
    display: flex;
    img {
      width:.68rem;
      height:.68rem;
      border-radius: 50%;
    }
    p{
      margin-left:.15rem;
      background: rgba(0,0,0,.5);
      color: #fff;
      padding: .16rem .12rem;
      border-radius: .16rem;
    }
  }
</style>
