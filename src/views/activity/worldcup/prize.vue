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
		  this.showLoading()
			this.updatePageView(false)
      this.getQueryRollModel()
      this.getWorldCupPrize()
		}
	}
</script>

<style lang="scss">
  .worldcup-view{
    background: #002655;
  }
  .worldcup-bg{
    width: 100%;
    height: 11.62rem;
    background:url(http://images2.laiyifen.com/imagespace/2018060710/289f0260-7286-4da4-920b-72099156db73.jpg) #002655 no-repeat;
    background-size: 100% auto;
  }
  .worldcup-scroll-text{
    position: absolute;
    left:.24rem;
    top:.6rem;
    z-index:99;
    width: 4.5rem;
    height: .54rem;
  }
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
  .worldcup-prize-wrapper{
    position: absolute;
    width:100%;
    top:6.22rem;
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
  .worldcup-rule {
    position: absolute;
    right: .7rem;
    top: .7rem;
    button{
      border-radius: .1rem;
      width: 1.44rem;
      height: .42rem;
      background:#ffb605;
      color:#640208;
      font-size: .27rem;
      box-shadow:  .03rem .06rem 0 0 #fe7716;
    }
  }
  .worldcup-btn{
    display: flex;
    justify-content: center;
    position: relative;
    .worldcup_ball_pic{
      width: .81rem;
      height: .73rem;
      background: url(./images/worldcup_ball_pic.png) no-repeat;
      background-size: .81rem auto;
      display:block;
      position: absolute;
      margin-left: -1.2rem;
      left: 50%;
      top: -.24rem;
    }
    button{
      padding-left: 1.1rem;
      padding-right: .35rem;
      border-radius: .3rem;
      height: .6rem;
      font-size: .4rem;
      color:#c3040f;
      background: linear-gradient(top,#fff3cb,#d99400);
      background: -webkit-linear-gradient(top,#fff3cb,#d99400);
      box-shadow: 0 .03rem .03rem 0 #650006;
    }
  }
</style>
