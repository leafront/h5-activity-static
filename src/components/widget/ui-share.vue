<template>
  <div>
    <div class="ui-mask" :class="{'active': shareMenu}" @click="updateShareMenu(false)"></div>
    <div class="ui-share-cont" :class="{'active':shareMenu}">
      <ul class="ui-share-list" id="shares">
        <li><i class="ui-share-weixin-icon -mob-share-weixin"></i><span class="c3">微信</span></li>
        <li><i class="ui-share-qq-icon -mob-share-qq"></i><span class="c3">QQ</span></li>
        <li><i class="ui-share-qzone-icon -mob-share-qzone"></i><span class="c3">QQ空间</span></li>
        <li><i class="ui-share-weibo-icon -mob-share-weibo"></i><span class="c3">新浪微博</span></li>
      </ul>
      <button class="ui-cancel-button" @click="updateShareMenu(false)">取消分享</button>
    </div>
  </div>
</template>

<script type="text/javascript">

  import config from '@/config/index'

  import {mapGetters, mapActions} from 'vuex'

  require('@/libs/mob-share')

  export default {
    data () {
      return {
        tipsImg: config.staticPath + '/activity-static/images/weixin_tips.png'
      }
    },
    computed: {
      ...mapGetters({
        'shareMenu': 'getShareMenu'
      })
    },
    props:['config'],
    watch: {
      shareMenu (val,oldVal) {
        if (val) {
          this.updateShareMenu(true)
          this.initConfig()
        } else {
          this.updateShareMenu(false)
        }
      }
    },
    methods: {
      ...mapActions([
        'updateShareMenu'
      ]),
      //初始化配置
      initConfig () {
        const {
          url,
          title,
          description,
          pic,
          reason
        } = this.config

        mobShare.config({
          debug: false, // 开启调试，将在浏览器的控制台输出调试信息
          appkey: "9ca572cc88e6", // appkey
          params: {
            url, // 分享链接
            title, // 分享标题
            description, // 分享内容
            pic, // 分享图片，使用逗号,隔开
            reason //只应用与QZone与朋友网
          },
          /**
           * 分享时触发的回调函数
           * 分享是否成功，目前第三方平台并没有相关接口，因此无法知道分享结果
           * 所以此函数只会提供分享时的相关信息
           *
           * @param {String} plat 平台名称
           * @param {Object} params 实际分享的参数 { url: 链接, title: 标题, description: 内容, pic: 图片连接 }
           */
          callback: (plat, params) => {
            if(typeof this.callback == 'function') {
              this.callback(plat, params)
            }
          }
        })
      }
    }
  }

</script>

<style lang="scss" scoped>
  .ui-cancel-button{
    width:100%;
    background:#fff;
    height: 1rem;
    font-size: .36rem;
    color:#000;
    line-height: 1rem;
    border-top: .01rem solid #e0e0e0;
  }
  .ui-share-cont{
    width:100%;
    height: 3.1rem;
    position: fixed;
    left:0;
    bottom:0;
    background: #fff;
    transform: translateY(100%);
    z-index:999;
    transition: all .3s cubic-bezier(0.4, 0.01, 0.165, 0.99);
    &.active{
      transform: translateY(0);
    }
  }
  .ui-share-list{
    display: flex;
    padding: .3rem 0;
    li{
      height: 1.5rem;
      flex:1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-direction: column;
    }
  }
  .ui-share-icon {
    width: 1rem;
    height: 1rem;
  }
  .ui-share-weixin-icon{
    background:url(../../images/ui-share-weixin-icon.png) no-repeat;
    background-size: 1rem auto;
    width: 1rem;
    height: 1rem;
  }
  .ui-share-qq-icon{
    background:url(../../images/ui-share-qq-icon.png) no-repeat;
    background-size: 1rem auto;
    width: 1rem;
    height: 1rem;
  }
  .ui-share-qzone-icon{
    background:url(../../images/ui-share-qzone-icon.png) no-repeat;
    background-size: 1rem auto;
    width: 1rem;
    height: 1rem;
  }
  .ui-share-weibo-icon{
    background:url(../../images/ui-share-weibo-icon.png) no-repeat;
    background-size: 1rem auto;
    width: 1rem;
    height: 1rem;
  }
</style>
