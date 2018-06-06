<template>
	<div class="pageView">
		<AppHeader :title="title" :isBorder="isBorder">
		</AppHeader>
		<div class="scroll-view-wrapper worldcup-view" :class="{'visibility': !pageView}">
			<div class="worldcup-rule">
				<button>活动规则</button>
			</div>
			<div class="worldcup-btn">
				<button>我的奖品</button>
				<i class="worldcup_ball_pic"></i>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
	.worldcup-view{
		background:url(http://images4.laiyifen.com/imagespace/2018052310/dc4e10b9-a79e-48f0-a4c5-6285461d1504.png) #002655 no-repeat;
		background-size: 7.5rem auto;
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
		margin-top: 6.22rem;
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

<script type="text/javascript">
	
	import AppHeader from '@/components/common/header'

	import {mapGetters, mapActions} from 'vuex'
	
	export default {
		data () {
			return {
				isBorder: true,
				title: '我的奖品'
			}
		},
		components: {
			AppHeader
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
			])
		},
		created () {
			this.updatePageView(true)
		}
	}
</script>