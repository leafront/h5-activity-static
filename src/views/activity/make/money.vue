<template>
  <div class="pageView">
    <AppHeader :title="title" :isBorder="isBorder" :backFn="backAction">
    </AppHeader>
    <div class="scroll-view-wrapper" :class="{'visibility': !pageView}">

    </div>
  </div>
</template>

<script type="text/javascript">

  import AppHeader from '@/components/common/header'

  export default {
    data () {

    },
    components: {
      AppHeader
    },
    methods: {

    }
  }

</script>
