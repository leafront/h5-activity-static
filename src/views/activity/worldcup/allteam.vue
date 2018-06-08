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
          <button>我的球队</button>
          <i class="worldcup_ball_pic"></i>
        </div>
        <div class="worldcup-team">
          <div class="worldcup-team-border">
            <div class="worldcup-team-not">
              <div class="worldcup-team-item" v-for="item in not_use_list">
                <img :src="wcImgUrl[item.teamCode]"/>
                <p>{{item.teamName}}</p>
                <span class="has-prize">可兑换</span>
              </div>
            </div>
            <div class="worldcup-team-has">
              <div class="worldcup-team-item" v-for="item in has_use_list">
                <img :src="wcImgUrl[item.teamCode]"/>
                <p>{{item.teamName}}</p>
                <span class="not-prize">已兑换</span>
              </div>
            </div>
          </div>
        </div>
        <div class="worldcup-team-prize">
          <div class="worldcup-team-prize-item" v-for="item in cupList">
            <span>{{channelList[item.channel]}}获得{{item.teamName}}球队卡一张</span>
            <strong>{{item.orderTime | dateFormat("yyyy-MM-dd hh:mm")}}</strong>
          </div>
          <div class="worldcup-more-prize" @click="pageAction('/activity/worldcup/prize')">
            <span class="font">查看我的奖品>></span>
          </div>
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
        prizeList: [],
        not_use_list: [],
        has_use_list: [],
        cupList: [],
        channelList:{ //0 首次打开 1 首次分享 2 APP消费 3 门店消费 4客服发卡
          "0": "首次打开",
          "1": "首次分享",
          "2": "APP消费",
          "3": "门店消费",
          "4": "客服发卡"
        },
        wcImgUrl: {
          1: 'http://images3.laiyifen.com/imagespace/2018060517/2cba2d04-6cce-424b-89c2-c02d12a7b362.png',
          2: 'http://images2.laiyifen.com/imagespace/2018060517/4c367e5b-40d8-4c90-88be-21541c9e6c81.png',
          3: 'http://images.laiyifen.com/imagespace/2018060517/88d5107a-ca85-4cf2-ba7e-c024e76ec0ca.png',
          4: 'http://images4.laiyifen.com/imagespace/2018060517/1f9e04be-14ab-47ff-90d1-627333388551.png',
          5: 'http://images.laiyifen.com/imagespace/2018060517/dadb153c-b44f-4cde-bea9-e8e7ca5a865c.png',
          6: 'http://images.laiyifen.com/imagespace/2018060517/bd33ad77-1a8a-44f2-9946-063f364503e8.png',
          7: 'http://images1.laiyifen.com/imagespace/2018060517/3d1a41a7-4066-4a09-ac0a-f43193622730.png',
          8: 'http://images4.laiyifen.com/imagespace/2018060517/84deb5fe-7186-4c73-8fc2-5781ef8a4f08.png',
          9: 'http://images1.laiyifen.com/imagespace/2018060518/8a9a8320-55e8-485e-b5b5-9a87f8e09d0b.png',
          10: 'http://images2.laiyifen.com/imagespace/2018060518/bd66d171-8ffa-4269-995b-2f426c70e7bd.png',
          11: 'http://images3.laiyifen.com/imagespace/2018060518/f1f0c4ff-306d-47a8-90ae-f0b79e8a53bc.png',
          12: ' http://images1.laiyifen.com/imagespace/2018060518/d3e86945-b1ec-463d-b8d5-2ab64ef1f884.png',
          13: 'http://images1.laiyifen.com/imagespace/2018060518/6eac8331-a635-4430-9c3d-4ace5dc9c56e.png',
          14: 'http://images.laiyifen.com/imagespace/2018060518/a8425430-6d6f-48ca-9297-e71ca081c2a8.png',
          15: 'http://images2.laiyifen.com/imagespace/2018060518/ba259835-a9ad-4c09-83c4-d7a9b8d1a162.png',
          16: 'http://images4.laiyifen.com/imagespace/2018060518/45d190fd-133c-424c-9318-bbacd98e82ff.png',
          17: 'http://images4.laiyifen.com/imagespace/2018060518/01a5d8d5-5c18-43b4-a1cc-1d766dad32f3.png',
          18: 'http://images.laiyifen.com/imagespace/2018060518/4bd95e29-6cba-4c99-a273-7bbe2c55ef80.png',
          19: 'http://images2.laiyifen.com/imagespace/2018060518/b84ef9ab-d080-415c-984a-3cddd786bfed.png',
          20: 'http://images3.laiyifen.com/imagespace/2018060518/2edc43f7-429a-4ef0-b5c7-c4e1e6da6ed1.png',
          21: 'http://images2.laiyifen.com/imagespace/2018060518/78ac338d-2d48-4728-98d9-434965c05bf2.png',
          22: 'http://images2.laiyifen.com/imagespace/2018060518/0d2332b2-0416-47ee-b330-240990883b95.png',
          23: 'http://images4.laiyifen.com/imagespace/2018060518/672b599a-c7fc-4b77-b9a9-8ee8d10abcd4.png',
          24: 'http://images3.laiyifen.com/imagespace/2018060518/cfaa8e2e-9dbb-428b-a0aa-bb7ff30fce64.png',
          25: 'http://images1.laiyifen.com/imagespace/2018060518/5863e9a8-948e-45c9-b2cf-a72d4efa443f.png',
          26: 'http://images4.laiyifen.com/imagespace/2018060518/636119fa-6bb8-401f-aba8-469a43dcf04f.png',
          27: 'http://images1.laiyifen.com/imagespace/2018060518/685f079c-a072-41da-9209-00481ee7f36e.png',
          28: 'http://images2.laiyifen.com/imagespace/2018060518/f270fe77-da0d-4640-9ef0-3d6e66721f5a.png',
          29: 'http://images3.laiyifen.com/imagespace/2018060518/a0f4075b-2d3e-4ad2-b68f-4d023e7e56eb.png',
          30: 'http://images3.laiyifen.com/imagespace/2018060518/a5e1ae9c-7497-47ee-adf2-4015378955cd.png',
          31: 'http://images4.laiyifen.com/imagespace/2018060518/3462eaf4-9136-4658-aedb-5d55c4d0ce4d.png',
          32: 'http://images3.laiyifen.com/imagespace/2018060518/cfd36d5a-72ed-45f2-a73d-5409db340973.png'
        }
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
      pageAction (url) {
        this.$router.push(url)
      },
      /**
       * 切换规则弹层信息
       * params {Boolean} val
       */
      toggleRulePopup (val) {
        this.rulePopup = val
        utils.appViewFixed()
      },
      /**
       * 获取滚动奖品文字内容
       */
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
      },
      /**
       * 获取球队兑奖列表
       */
      getQueryTeamCard () {
        Model.getQueryTeamCard({
          type: 'GET'
        }).then((result) => {
          const data = result.data

          if (result.code == 0 && data) {
            this.$hideLoading()
            this.updatePageView(true)
            let not_use_list  = data.not_use_list || []
            let has_use_list = data.has_use_list || []

            not_use_list = not_use_list.filter((item) => {
              return item.teamCode <= 32
            })

            has_use_list = has_use_list.filter((item) => {
              return item.teamCode <= 32
            })
            this.not_use_list = not_use_list
            this.has_use_list = has_use_list
            this.cupList = not_use_list.concat(has_use_list)

          } else {
            this.$toast(result.message)
          }
        })
      }
    },
    created () {
      this.showLoading()
      this.updatePageView(false)
      this.getQueryRollModel()
      this.getQueryTeamCard()
    }
  }
</script>

<style lang="scss">
  @import './styles/common.scss';
  .worldcup-team{
    margin: -.32rem auto 0;
    width: 6.8rem;
    padding: .64rem .28rem .25rem;
    background: #8f0109;
    border-radius: .08rem;
  }
  .worldcup-team-border{
    border: .01rem solid #5e000e;
    padding: 0 .2rem .5rem;
    border-radius: .12rem;
  }
  .worldcup-team-not{
    overflow: hidden;
  }
  .worldcup-team-has{
    overflow: hidden;
    text-align: center;
  }
  .worldcup-team-item{
    margin-top: .36rem;
    width: 33.33%;
    display: inline-block;
    position: relative;
    span{
      position: absolute;
      width: .65rem;
      height: .3rem;
      display: block;
      text-align: center;
      line-height: .3rem;
      font-size: .16rem;
      top: .14rem;
      right: .14rem;
      border-radius: .08rem;
      border: .01rem solid #fff;
      color: #fff;
      &.has-prize{
        background: #9e1017;
      }
      &.not-prize{
        background: #6c6c6c;
      }
    }
    img{
      width: 1.32rem;
      height: 1.32rem;
      margin: 0 auto;
      display: block;
    }
    p{
      margin-top: .2rem;
      color:#fff;
      text-align:center;
    }
  }
  .worldcup-team-prize{
    margin: .38rem auto 0;
    width: 6.8rem;
    padding: 0 .45rem .64rem;
  }
  .worldcup-team-prize-item{
    height: .44rem;
    line-height: .44rem;
    color:#fff;
    display: flex;
    span{
      width: 3.8rem;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      flex:1;
    }
  }
  .worldcup-more-prize{
    text-align: center;
    padding-top: .38rem;
    span{
      text-decoration: underline;
      color:#fff;
    }
  }
</style>
