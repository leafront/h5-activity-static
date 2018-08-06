<template>
  <div class="user-broadcast">
    <div class="user-broadcast-list" id="user-broadcast-list">
      <div class="user-broadcast-item" v-for="item in list">
        <img :src="item.headPicUrl || headImg"/>
        <p>{{item.nickName || item.mobile}}赚到了{{item.money}}元鼓励金</p>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">

  import config from '@/config/index'

  export default {
    data () {
      return {
        index: 0,
        iNow: 0,
        timer: null,
        headImg: config.staticPath + '/webapp-static/images/logo-laiyifen.png'
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
        const el = document.getElementById('user-broadcast-list')
        const liEl = el.querySelectorAll('.user-broadcast-item')
        const firstChildEle = el.firstElementChild.cloneNode(true)
        el.appendChild(firstChildEle)
        this.eleLen = liEl.length
        this.timer = setInterval(() => {
          this.autoScroll()
        },this.autoTime)
      },
      autoScroll () {
        const el = document.getElementById('user-broadcast-list')
        const liEl = el.querySelectorAll('.user-broadcast-item')
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
  .user-broadcast{
    height: .68rem;
    overflow: hidden;
    position: absolute;
    top: .2rem;
    left: .3rem;
  }
  .user-broadcast-item{
    display: flex;
    img {
      width:.68rem;
      height:.68rem;
      border-radius: 50%;
    }
    p{
      margin-left:.15rem;
      background: rgba(0,0,0,.5);
      color: #fff;
      padding: .16rem .12rem;
      border-radius: .16rem;
    }
  }
</style>
