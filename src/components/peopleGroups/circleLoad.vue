<template>
  <div>
    <div class="ui-mask " id="circle-load-component" :class="{'active': loadedshow}"></div>
    <div class="ui-circle-load" id="invite-rule" :class="{'active': loadedshow}">
      <div class="f_section_loading" >
        <div class="circle_load_img">
        </div>
      </div>
      </div>
    </div>

  </div>
</template>

<style lang="scss">

#circle-load-component{
  background: rgba(0, 0, 0, 0);
}
@keyframes mycycle {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
.circle_load_img {
    width: 0.6rem;
    height: 0.6rem;
    margin: 0.6rem auto;
    background-image: url("/activity-static/images/ciecleLoad.png");
    background-size: 100%;
    background-repeat: no-repeat;
    transform: rotate(360deg);
    animation: mycycle 2s linear infinite;
}
.ui-circle-load {
    background: rgba(0, 0, 0, 0);
    margin: 0.44rem auto 0;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-52%);
    z-index: 999;

    border-radius: 0.2rem;
    color: #fff;
    overflow-scrolling: touch;
    -webkit-overflow-scrolling: touch;
    overflow: scroll;
    display: none;
    h4 {
        text-align: center;
        font-size: 0.32rem;
        line-height: 0.8rem;
    }
    &.active {
        display: block;
    }
}

  .pg_component{
    background:rgba(0, 0, 0, 0);
    padding: .2rem .3rem;
    overflow-y: scroll;
    color: #000000;
    width: 100%;
    border-radius: .2rem;

  }

</style>

<script type="text/javascript">

  import utils from '@/widget/utils'

  import * as Model from '@/model/invitation'

  export default {


    props: {
      loadedshow: {
        type: Boolean,
        default: false
      },

    },
    watch: {
    },
    methods: {


    }
  }

</script>
