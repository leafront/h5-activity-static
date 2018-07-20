<template>
  <div class="make-text-scroll-list">
    <div class="make-text-scroll" id="make-textScroll-list">
      <div class="make-text-scroll-item-wrapper" v-if="list.length" v-for="item in list" @click="pageAction(categoryLink)">
        <div class="make-text-scroll-item" v-for="child in item">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-speaker"></use>
          </svg>
          <p>{{child.displayTitle}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">

  export default {
    data () {
      return {
        index: 0,
        iNow: 0,
        timer: null
      }
    },
    props: {
      list: {
        type: Array,
        default: []
      },
      autoTime: {
        type: Number,
        default: 3000
      },
      categoryLink: {
        type: String,
        default: ''
      }
    },
    watch: {
      list() {
        setTimeout(() => {
          this.showText()
        },0)
      }
    },
    methods: {
      pageAction (url) {
        if (url) {
          location.href = url
        }
      },
      showText () {
        const el = document.getElementById('make-textScroll-list')
        const liEl = el.querySelectorAll('.make-text-scroll-item-wrapper')
        const firstChildEle = el.firstElementChild.cloneNode(true)
        el.appendChild(firstChildEle)
        this.eleLen = liEl.length
        this.timer = setInterval(() => {
          this.autoScroll()
        },this.autoTime)
      },
      autoScroll () {
        const el = document.getElementById('make-textScroll-list')
        const liEl = el.querySelectorAll('.make-text-scroll-item-wrapper')
        const eleLen = liEl.length
        if (eleLen < 2) {
          return
        }
        this.index ++
        el.style.transition = 'transform .3s ease-in'
        el.style.transform = 'translateY(' + (-liEl[0].offsetHeight * this.index) + 'px)'
        setTimeout(() => {
          if (this.index == this.eleLen - 1) {
            el.style.transition = 'none'
            el.style.transform = 'translateY(0)'
            this.index = 0
          }
        },310)

      }
    },
    beforeDestroy () {
      clearInterval(this.timer)
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
