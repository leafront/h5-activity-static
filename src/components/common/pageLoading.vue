<template>
  <div class="pageLoading" v-show="showLoading">
    <div class="ui-showLoading-gif"></div>
  </div>

</template>

<script type="text/javascript">

  export default {
    props: {
      showLoading: {
        type: Boolean,
        default: false
      }
    }
  }

</script>

<style lang="scss">

  .pageLoading {
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: .2rem;
    .ui-showLoading-gif{
      background:url('/activity-static/images/loading.png') no-repeat;
      width: 2.5rem;
      height: 1.13rem;
      background-size: 2.5rem auto;
    }
  }
</style>
