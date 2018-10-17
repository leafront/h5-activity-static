<template>
  <div class="pageView">
    <AppHeader :title="title" :isBorder="isBorder" :backFn="backAction">
    </AppHeader>
    <div class="scroll-view-wrapper koi-end-view" :class="{'visibility': pageView}">
      <div class="koi-end">
        <h4>翻倍锦鲤券活动结束啦～</h4>
        <p class="font-b cfff">{{times}} 秒后自动跳转到首页</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .koi-end-view{
    background: #bd0004;
  }
  .koi-end{
    padding-top: .46rem;
    display: flex;
    flex-direction: column;
    align-items: center;
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

  export default {
    data () {
      return {
        title: '翻倍锦鲤券',
        pageView: true,
        isBorder: true,
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
          location.href = 'lyf://home'
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
            location.href = 'lyf://home'
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
