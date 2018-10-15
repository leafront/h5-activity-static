<template>
  <div class="pageView">
    <AppHeader :title="title" :isBorder="isBorder" :backFn="backAction">
    </AppHeader>
    <div class="scroll-view-wrapper" :class="{'visibility': pageView}">
      <div class="koi">
        <div class="koi-banner__top">
          <div class="koi-banner__top--color"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .koi-banner {
    &__top {
      background: green;
      &--color{
        color: red;
      }
    }
  }
</style>

<script type="text/javascript">

  import AppHeader from '@/components/common/header'

  import app from '@/widget/app'

  import utils from '@/widget/utils'

  import * as Model from '@/model/koi'

  export default {
    data () {
      return {
        title: '锦鲤券',
        pageView: true,
        isBorder: true
      }
    },
    components: {
      AppHeader
    },
    methods: {
      backAction () {
        if (utils.isApp()) {
          app.back()
        } else {
          location.href = '/index.html'
        }
      },
      getKoiIndex () {
        Model.getKoiIndex({
          type: 'GET'
        }).then((result) => {
          const data = result.data

          if (result.code == 0 && data) {

          } else {

          }
        })
      }
    },
    created () {

    }
  }

</script>
