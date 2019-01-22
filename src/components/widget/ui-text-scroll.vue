<template>
  <div class="ui-text-scroll" :class="{'active': posY}" :style="{'transform':'translateY('+posY+'px)'}">
   <slot></slot>
  </div>  
</template>  

<script type="text/javascript">
  export default {
    data () {
      return {
        index: 0,
        timer: null,
        posY: 0
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
      eleHeight: {
        type: Number,
        default: .5
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
        this.timer = setInterval(() => {
          this.autoScroll()
        },this.autoTime)
      },
      autoScroll () {
       const liElHeight = parseFloat(document.documentElement.style.fontSize) * this.eleHeight
        const eleLen = this.list.length
        if (eleLen < 2) {
          return
        }
        this.index ++
        this.posY = -liElHeight * this.index
        setTimeout(() => {
          if (this.index >= this.list.length - 1) {
            this.index = 0
            this.posY = 0
          }
        }, 310)
      }
    },
    beforeDestroy () {
      clearInterval(this.timer)
    }
  }

</script>

<style lang="scss">
.ui-text-scroll{
  &.active{
    transition: transform .3s ease-in;
  }
}
</style>