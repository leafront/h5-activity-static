<template>
  <div class="pageView">
    <AppHeader :title="title" :backFn="backAction">
    </AppHeader>
    <div class="scroll-view-wrapper" :class="{'visibility': pageView}">
      <div class="queen-end">
        <img src="./images/queen_end.png"/>
        <h4>食运券活动结束啦~</h4>
        <p class="cfff">{{times}} 秒后自动跳转到首页</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .queen-end{
    padding-top: 1.2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    img{
      width: 5.54rem;
      height: 2.2rem;
    }
    h4{
      font-size: .36rem;
      color: #fff;
      padding-top: .32rem;
    }
  }

</style>

<script type="text/javascript">

  import AppHeader from '@/components/common/header'

  import utils from '@/widget/utils'

  import app from '@/widget/app'

  export default {
    data () {
      return {
        title: '女王节',
        pageView: true,
        times: 3,
        timer: null
      }
    },
    components: {
      AppHeader
    },
    methods: {
      backAction () {
        if (utils.isApp()) {
          app.back('refresh','forceBack')
        } else {
          location.href = '/index.html'
        }
      }
    },
    created () {
      let times = 3
      this.timer = setInterval(() => {
        times--
        if (times > 0) {
          this.times = times
        } else {
          if (utils.isApp()) {
            app.back('refresh','forceBack')
          } else {
            location.href = '/index.html'
          }
          clearInterval(this.timer)
        }
      },1000)
    },
    beforeDestroy () {
      if (this.timer) {
        clearInterval(this.timer)
      }
    }
  }

</script>
