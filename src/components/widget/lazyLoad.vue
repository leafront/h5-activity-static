<template>
  <div class="lazyLoad">
    <slot></slot>
  </div>
</template>

<script>

  import utils from '@/widget/utils'

  export default {
    props: ['options','list'],
    data () {
      return {
        appView: null,
        ticking: false,
        timer: null,
        default: {
          scrollEle: 'appView',
          ele:'pic-lazyLoad',
          complete: true, //页面内所有数据图片加载完成后，是否自己销毁程序，true默认销毁，false不销毁
          position: { // 只要其中一个位置符合条件，都会触发加载机制
            top: 0, // 元素距离顶部
            right: 0, // 元素距离右边
            bottom: 0, // 元素距离下面
            left: 0 // 元素距离左边
          }
        }
      }
    },
    created () {
      Object.assign(this.default, this.options)
    },
    mounted () {
      this.appView = document.getElementById(this.default.scrollEle)
    },
    watch: {
      list () {
        setTimeout(() => {
          this.startLoad()
        },0)
      }
    },
    methods: {
      /**
       * @param {Object} el
       * @param {Object} options
       * @returns {Boolean}
       *
       */
      getClientRect (el,options) {

        const bcr = el.getBoundingClientRect() //取得元素在可视区的位置
        const mw = el.offsetWidth //元素自身宽度
        const mh = el.offsetHeight //元素自身的高度
        const w = window.innerWidth //视窗的宽度
        const h = window.innerHeight //视窗的高度
        const boolX = (!((bcr.right - options.left) <= 0 && ((bcr.left + mw) - options.left) <= 0) && !((bcr.left + options.right) >= w && (bcr.right + options.right) >= (mw + w))) //上下符合条件
        const boolY = (!((bcr.bottom - options.top) <= 0 && ((bcr.top + mh) - options.top) <= 0) && !((bcr.top + options.bottom) >= h && (bcr.bottom + options.bottom) >= (mh + h))) //上下符合条件
        return el.width != 0 && el.height != 0 && boolX && boolY
      },
      /**
       * 滚动加载图片显示替换默认图片
       *
       */
      scrollLoad () {
        const list = Array.prototype.slice.apply(this.appView.querySelectorAll('.' + this.default.ele + '[data-src]'))
        if (!list.length && this.default.complete) {
          cancelAnimationFrame(this.timer)
          window.removeEventListener('scroll',this.scrollImg,utils.isPassive() ? {passive: true} : false)
        } else {
          this.ticking = false
          list.forEach((el) => {
            if (!el.dataset.LazyLoadImgState && this.getClientRect(el, this.default.position)) {
              this.loadImg(el)
            }
          })
        }
      },
      scrollImg () {
        if(!this.ticking) {
          this.ticking = true
          this.timer = requestAnimationFrame(this.realFunc)
        }
      },
      realFunc () {
        this.scrollLoad()
      },
      startLoad (){
        this.scrollLoad()
        window.addEventListener('scroll',this.scrollImg,utils.isPassive() ? {passive: true} : false)
      },
      /**
       * @param {Object} el
       *
       *
       */
      loadImg(el) { //加载图片

        el.dataset.LazyLoadImgState = 'start'
        const imgUrl = el.dataset.src
        if (imgUrl) {
          const img = new Image()
          img.src = imgUrl
          img.addEventListener('load', () => {
            el.style.backgroundImage = 'url('+imgUrl+')'
            el.style.backgroundSize = '100% auto'
            delete el.dataset.src
            el.dataset.LazyLoadImgState = 'success'
            el.classList.add('successImg')
          }, false)

          img.addEventListener('error', () => {
            delete el.dataset.src
            el.dataset.LazyLoadImgState = 'error'
          }, false)
        } else {
          delete el.dataset.src
        }
      }
    },
    beforeDestroy () {
      cancelAnimationFrame(this.timer)
      window.removeEventListener('scroll',this.scrollImg, utils.isPassive() ? {passive: true} : false)
    }
  }
</script>
