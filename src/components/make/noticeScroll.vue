<template>
  <div class="make-text-scroll-list">
    <UiTextScroll 
      :list="list"
      :eleHeight="eleHeight">
      <div class="make-text-scroll">
        <div class="make-text-scroll-item-wrapper" v-if="list.length" v-for="item in list" @click="pageAction(categoryLink)">
          <div class="make-text-scroll-item" v-for="child in item">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-speaker"></use>
            </svg>
            <p>{{child.displayTitle}}</p>
          </div>
        </div>
      </div>
    </UiTextScroll>
  </div>
</template>

<script type="text/javascript">

  import UiTextScroll from '@/components/widget/ui-text-scroll'

  export default {
    data () {
      return {
        eleHeight: '.8'
      }
    },
    props: {
      list: {
        type: Array,
        default: []
      },
      categoryLink: {
        type: String,
        default: ''
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
  .make-text-scroll-list{
    height: .8rem;
    overflow: hidden;
  }
  .make-text-scroll{
    padding-left: .2rem;
  }
  .make-text-scroll-item-wrapper{
    height: .8rem;
  }
  .make-text-scroll-item{
    display: flex;
    margin-bottom: .1rem;
    &:last-child{
      margin-bottom:0;
    }
    .icon {
      width: .32rem;
      height: .32rem;
      color: rgb(217,104,26);
    }
    p{
      padding-left:.2rem;
      color: #000;
      width: 5.5rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
</style>
