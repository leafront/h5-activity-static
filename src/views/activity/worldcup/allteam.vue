<template>
  <div class="pageView">
    <AppHeader :title="title" :isBorder="isBorder">
    </AppHeader>
    <div class="scroll-view-wrapper worldcup-view" :class="{'visibility': !pageView,'scroll_view_hidden': rulePopup}">
      <div class="worldcup-bg"></div>
      <div class="worldcup-rule" @click="toggleRulePopup(true)">
        <button>活动规则</button>
      </div>
      <div class="worldcup-prize-wrapper">
        <div class="worldcup-btn">
          <button>我的奖品</button>
          <i class="worldcup_ball_pic"></i>
        </div>
      </div>
      <WorldCupRule :rulePopup="rulePopup" @toggleRulePopup="toggleRulePopup"></WorldCupRule>
      <div class="worldcup-scroll-text">
        <TextScroll :list="prizeList"></TextScroll>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">

  import AppHeader from '@/components/common/header'

  import WorldCupRule from '@/components/worldcup/rule'

  import TextScroll from '@/components/worldcup/textScroll'

  import * as Model from '@/model/worldcup'

  import {mapGetters, mapActions} from 'vuex'

  import utils from "@/widget/utils";

  export default {
    data () {
      return {
        isBorder: true,
        title: '我的球队',
        list: [],
        rulePopup: false,
        prizeList: []
      }
    },
    components: {
      AppHeader,
      WorldCupRule,
      TextScroll
    },
    computed: {
      ...mapGetters({
        'pageView': 'getPageView'
      })
    },
    mixin: ['loading'],
    methods: {
      ...mapActions([
        'updatePageView'
      ]),
      getWorldCupPrize () {
        Model.getWorldCupPrize({
          type: 'GET'
        })
        .then((result) => {
          const data = result.data
          if (result.code == 0 ) {
            this.$hideLoading()
            this.updatePageView(true)
            if (data.prizeList) {
              this.list = data.prizeList
            }
          } else {
            this.$toast(result.message)
          }
        })
      },
      toggleRulePopup (val) {
        this.rulePopup = val
        utils.appViewFixed()
      },
      getQueryRollModel () {
        Model.getQueryRollModel({
          type: 'GET'
        }).then((result) => {
          const data = result.data

          if (result.code == 0 && data) {
            this.prizeList = data.listObj
          } else {
            this.$toast(result.message)
          }
        })
      }
    },
    created () {
      //this.showLoading()
      this.updatePageView(true)
      this.getQueryRollModel()
      this.getWorldCupPrize()
    }
  }
</script>

<style lang="scss">
  @import './styles/common.scss';
</style>
