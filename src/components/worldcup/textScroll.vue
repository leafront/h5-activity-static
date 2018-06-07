<template>
  <div class="ui-textScroll">
    <ul class="ui-textScroll-list" id="ui-textScroll-list">
      <li v-for="item in list">{{item}}</li>
    </ul>
  </div>
</template>

<script type="text/javascript">

  export default {
    data () {
      return {
        index: 0,
        iNow: 0
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
      showText () {
        const el = document.getElementById('ui-textScroll-list')
        const liEl = el.getElementsByTagName('li')
        const firstChildEle = el.firstElementChild.cloneNode(true)
        el.appendChild(firstChildEle)
        this.eleLen = liEl.length
        setInterval(() => {
          this.autoScroll()
        },this.autoTime)
      },
      autoScroll () {
        const el = document.getElementById('ui-textScroll-list')
        const liEl = el.getElementsByTagName('li')
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
    }
  }

</script>

<style lang="scss">

  .ui-textScroll{
    width: 100%;
    height:100%;
    padding: 0 .25rem;
    line-height: .54rem;
    overflow:hidden;
    background:rgba(0,0,0,.6);
    color:#fff;
    border-radius: .1rem;
  }
  .ui-textScroll-list{
    li{
      text-align: center;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;

    }
  }
</style>
