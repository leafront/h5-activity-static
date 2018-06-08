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
        <div class="worldcup-prize" v-if="list.length">
          <div class="worldcup-prize-item" v-for="item in list">
            <span>{{item.prizeName}}</span>
            <strong>{{item.createTime}}</strong>
          </div>
        </div>
        <div class="worldcup-prize-empty" v-else>
          <p>您还暂时没有礼品哦</p>
          <p>请速至专区参与举杯赢战的活动兑换奖品，谢谢</p>
        </div>
        <div class="worldcup-prize-times">
          <h4>兑奖时间及方式</h4>
          <p>	a)积分及虚拟奖品，将于72小时内到账，用户可通过登录app商城，在活动页面-我的奖品中查询。</p>
          <p>	b)实物奖品，将根据用户预留的联系地址送出（配送区域仅限中国境内除港澳台以外的地区），于5-7个工作日内送达。此期间，请用户保持手机畅通。若用户提供的联系方式和地址有误，将影响配送时间或配送失败，此后果由用户自行承担责任若因不可抗力因素造成配送延迟，请用户耐心等待，给您带来不便，尽情谅解</p>
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
				title: '我的奖品',
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
      /**
       * 获取个人获得的奖品列表
       */
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
      }
		},
		created () {
		  this.showLoading()
			this.updatePageView(false)
      this.getQueryRollModel()
      this.getWorldCupPrize()
		}
	}
</script>

<style lang="scss">
  @import './styles/common.scss';
  .worldcup-prize-times{
    background: #920916;
    border-radius: .25rem;
    padding: .35rem .4rem .35rem;
    width: 6.12rem;
    margin: .26rem auto .6rem;

    p{
      color:#fff;
      text-indent: 2em;
      line-height: .44rem;
    }

    h4{
      font-size: .28rem;
      padding-bottom: .15rem;
      color: #fff;
      text-align: center;
      position: relative;
      &:before{
        content: '';
        display:block;
        height:.02rem;
        position: absolute;
        background:#fff;
        width: .53rem;
        left: 1rem;
        top: 35%;
      }
      &:after{
        content: '';
        display:block;
        height:.02rem;
        position: absolute;
        background:#fff;
        width: .53rem;
        right: 1rem;
        top: 35%;
      }
    }
  }

  .worldcup-prize{
    margin: .46rem auto 0;
    width: 6.12rem;
    padding: .15rem .3rem;
    background: #920916;
    border-radius: .25rem;
  }
  .worldcup-prize-empty{
    margin: .46rem auto 0;
    width: 6.12rem;
    padding: .3rem;
    background: #920916;
    border-radius: .25rem;
    p{
      text-align: center;
      color:#fff;
      line-height: .44rem;
    }
  }
  .worldcup-prize-item{
    height: .44rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color:#fff;
  }


</style>
