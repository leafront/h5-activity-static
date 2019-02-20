<template>
  <div class="activity-queen-banner">
    <swiper :list="list" :index="index" :picLazyLoad="picLazyLoad" :itemWidth="wrapperWidth" @toggleIndex="toggleIndex" :style="{'height':itemHeight}">
      <ul slot="banner" class="slideshow-item" :style="{'height':itemHeight}">
        <li v-for="item in list" :style="{'width':itemWidth,'height': itemHeight}">
          <img :src="item.imageUrl" :style="{'width':itemWidth, 'height': itemHeight}">
        </li>
      </ul>
      <ul slot="dot" class="slideshow-queen-dots">
        <li v-for="(item,$index) in bannerList" :class="{'active':$index == index-1}"></li>
      </ul>
    </swiper>
  </div>
</template>
<style lang="scss">
  .activity-queen-banner{
    margin: 0 .38rem;
    padding-top: .24rem;
    padding-bottom: .4rem;
    overflow: hidden;
    background: #d24133;
  }
  .slideshow-queen-dots{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 0;
    bottom: -.4rem;
    height: .4rem;
    background: #d24133;
    li {
      width: .1rem;
      height: .1rem;
      border-radius: 50%;
      background-color: #edaea2;
      margin-right:.16rem;
      &.active {
        background-color: #fdf5ea;
      }
    }
  }
</style>
<script>
  import swiper from '@/components/widget/swiper.vue'
  const itemWidth = document.documentElement.clientWidth
  export default {
    data () {
      return {
        index: 1,
        wrapperWidth: itemWidth * .8986,
        itemWidth: itemWidth * .8986 + 'px',
        itemHeight: itemWidth * .1786 + 'px',
        picLazyLoad: false
      }
    },
    props: {
      bannerList: {
        type: Array,
        default () {
          return []
        }
      }
    },
    components:{
      swiper
    },
    computed: {
      list () {
        const list = Object.assign([],this.bannerList)
        if (list && list.length) {
          const len = list.length
          const firstEl = list[len - 1]
          const lastEl = list[0]
          list.unshift(lastEl)
          list.push(firstEl)
        }
        return list
      }
    },
    methods: {
      pageAction (url) {
        if (url) {
          location.href = url
        }
      },
      toggleIndex (val) {
        this.index = val
      }
    }
  }
</script>
