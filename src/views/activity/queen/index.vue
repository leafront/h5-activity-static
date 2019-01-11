<template>
	<div class="pageView">
		<AppHeader :title="title"></AppHeader>
		<div class="scroll-view-wrapper" :class="{'visibility': pageView}">
			<div class="queen_index_header">
				<div class="queen-nav">
					<div class="queen-nav__item">
          	<p>收集津贴</p>
          	<span>10.22-11.13</span>
          	<i class="queen-nav__item--circle"></i>
        	</div>
       	  <div class="queen-nav__item">
            <p>合成食运券</p>
            <span>11.7-11.13</span>
            <i class="queen-nav__item--circle"></i>
          </div>
          <div class="queen-nav__item">
            <p>使用食运券</p>
            <span>11.7-11.13</span>
            <i class="queen-nav__item--circle"></i>
          </div>
          <div class="queen-nav__line"></div>
			  </div>	
			</div>	
			<div class="queen_cont">
				<div class="queen_active_item">
					<div class="queen_item_pic">
						<img src="./images/queen_goods.png"/>
					</div>
					<div class="queen_item_txt">
						<div class="queen_item_info">
							<p>戴森吹风机</p>
							<strong>(食运券)</strong>
						</div>	
						<div class="queen_item_button">
							<p>津贴￥120以上可合成</p>
						</div>
						<div class="queen_item_number">
							<p>仅限1张，兑完即止</p>
						</div>				
					</div>
				</div>		
				<div class="queen-active-times">
					<p>1.22早上10点开始兑换</p>
				</div>
				<div class="queen_active_item">
					<div class="queen_item_coupon">
						<div class="queen_item_coupon_txt">
							<strong>￥</strong>
							<p>200</p>
						</div>	
						<span class="font">食运券</span>
					</div>
					<div class="queen_item_txt">
						<div class="queen_item_info">
							<p>满￥299立减</p>
						</div>	
						<div class="queen_item_button">
							<p>津贴￥100以上可合成</p>
						</div>
						<div class="queen_item_number">
							<p>每日限量，兑完即止</p>
						</div>				
					</div>
				</div>
				<div class="queen_coupon_list">
					<div class="queen_coupon_item">
						<div class="queen_coupon_item_txt">
							<div class="queen_coupon_item_amount">
								<strong>￥</strong>
								<p>100</p>
							</div>
							<div class="queen_coupon_item_name">
								<span>(食运券)</span>
								<p>满￥199立减</p>
								<span>每日限量，兑完即止</span>
							</div>		
						</div>
						<div class="queen_coupon_button">	
							<p>津贴￥50以上可合成</p>
						</div>	
					</div>	
					<div class="queen_coupon_item">
						<div class="queen_coupon_item_txt">
							<div class="queen_coupon_item_amount">
								<strong>￥</strong>
								<p>70</p>
							</div>
							<div class="queen_coupon_item_name">
								<span>(食运券)</span>
								<p>满￥199立减</p>
								<span>每日限量，兑完即止</span>
							</div>		
						</div>	
						<div class="queen_coupon_button">	
							<p>津贴￥35以上可合成</p>
						</div>	
					</div>
					<div class="queen_coupon_item">
						<div class="queen_coupon_item_txt">
							<div class="queen_coupon_item_amount">
								<strong>￥</strong>
								<p>50</p>
							</div>
							<div class="queen_coupon_item_name">
								<span>(食运券)</span>
								<p>满￥149立减</p>
								<span>每日限量，兑完即止</span>
							</div>		
						</div>
						<div class="queen_coupon_button">	
							<p>津贴￥25以上可合成</p>
						</div>		
					</div>
					<div class="queen_coupon_item">
						<div class="queen_coupon_item_txt">
							<div class="queen_coupon_item_amount">
								<strong>￥</strong>
								<p>30</p>
							</div>
							<div class="queen_coupon_item_name">
								<span>(食运券)</span>
								<p>满￥99立减</p>
								<span>每日限量，兑完即止</span>
							</div>		
						</div>
						<div class="queen_coupon_button">	
							<p>津贴￥15以上可合成</p>
						</div>	
					</div>
				</div>
				<div class="queen_news_txt1">
					<img src="./images/queen_news_txt_01.png"/>
				</div>
				<div class="queen_coupon_way">
					<div class="queen_coupon_way_item">
						<img src="./images/queen_coupon_pic_01.png"/>
						<div class="queen_coupon_way_info">
							<span>去签到</span>
						</div>	
					</div>	
				</div>	
			</div>
		</div>	
	</div>	
</template>	

<style lang="scss">
	.queen_coupon_way{
		display: flex;
		justify-content: space-between;
	}
	.queen_coupon_way_item{
		position: relative;
		img{
			width: 3.33rem;
			height: 1.71rem;
		}
	}
	.queen_coupon_way_info{
		position: absolute;
		bottom: .26rem;
		right: .7rem;
		height: .3rem;
		border-radius: .3rem;
		background: #f9c578;
		padding: 0 .15rem;
		line-height: .3rem;
		span{
			height: .3rem;
			color: #d00619;
			display: block;
			&:after{
				content: '';
				display: inline-block;
				width: 0;
    		height: 0;
    		margin-left: .05rem;
    		border-top: .06rem solid transparent;
    		border-left: .08rem solid #d00619;
    		border-bottom: .06rem solid transparent;
			}
		}
	}
	.queen_news_txt1{
		padding-top: .13rem;
		padding-bottom: .3rem;
		width: 5.32rem;
		margin: 0 auto;
		img{
			width: 5.32rem;
			height: .66rem;
		}
	}
	.queen_coupon_button{
		display: flex;
		justify-content: center;
		padding-top: .1rem;
		p{
			width: 2.58rem;
			height: .52rem;
			color: #fff;
			background: url(./images/queen_coupon_button_bg.png) no-repeat;
			background-size: 2.58rem auto;
			text-align: center;
			line-height: .52rem;
		}
	}
	.queen_coupon_item_txt{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: #b40007;
		width: 3.18rem;
		height: 1.82rem;
		background: url(./images/queen_coupon_item_bg.png) no-repeat;
		background-size: 100% auto;
	}
	.queen_coupon_item_amount{
		display: flex;
		align-items: flex-end;
		margin-top: -.1rem;
		strong{
			font-size: .4rem;
			font-weight: bold;
		}
		p{
			font-size: .55rem;
			font-weight: bold;
		}
	}
	.queen_coupon_item_name{
		display: flex;
		flex-direction: column;
		position: relative;
		align-items: center;
		p{
			font-size: .34rem;
			font-weight: bold;
			margin-top: -.1rem;
		}
		span{
			font-weight: bold;
			margin-top: -.1rem;
		}
	}
	.queen_index_header{
		height: 14.18rem;
		background: url(./images/queen_bg.png) no-repeat;
		background-size: 100% auto;
		margin-bottom: .21rem;
		position: relative;
	}
	.queen_coupon_list{
		padding-top: .45rem;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.queen-nav{
		width: 6.78rem;
		height: 1.16rem;
		background: url(./images/queen_header_news.png) no-repeat;
		background-size: 100% auto;
		position: absolute;
		top: 11.14rem;
		left: 50%;
		margin-left: -3.39rem;
		display: flex;
		&__item{
      flex: 1;
      height: 100%;
      padding: .15rem 0;
      color: #ffbb7e;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      position: relative;
      &--circle{
        width: .2rem;
        height: .2rem;
        background: #ffed50;
        border-radius:50%;
        position: absolute;
        left: 50%;
        top:50%;
        transform: translate(-50%,-50%);
        z-index: 20;
      }
    }
    &__line{
      width: 92%;
      height: .03rem;
      position: absolute;
      background: #fbb930;
      left: 4%;
      top: 50%;
      transform: translateY(-.01rem);
      z-index: 10;
    }
	}
	.queen_cont{
		padding: 0 .16rem;
	}
	.queen_active_item{
		width: 7.18rem;
		height: 3.04rem;
		background: url(./images/queen_item_bg.png) no-repeat;
		background-size: 7.18rem auto;
		padding-top: .4rem;
		display: flex;
		position: relative;
		z-index: 10;
	}
	.queen_item_pic{
		padding-left: .52rem;
		padding-top: .16rem;
		width: 2.5rem;
		height: 2.34rem;
		background: url(./images/queen_item_line_bg.png) right top no-repeat;
		background-size: .02rem auto;
		img{
			width: 1.52rem;
			height: 2.05rem;
		}
	}
	.queen_item_coupon{
		padding-top: .16rem;
		width: 2.5rem;
		height: 2.34rem;
		background: url(./images/queen_item_line_bg.png) right top no-repeat;
		background-size: .02rem auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		span{
			color: #b40007;
			font-weight: bold;
			margin-top: -.1rem;
		}
	}
	.queen_item_txt{
		padding-top: .26rem;
		padding-left: .2rem;
	}
	.queen_item_info{
		color: #b40007;
		display: flex;
		align-items: flex-end;
		font-weight: bold;
		p{
			font-size: .6rem;
		}
		strong{
			padding-bottom: .1rem;
			padding-left: .1rem;
		}
	}
	.queen_item_button{
		margin-top: .05rem;
		width: 3.88rem;
		height: .8rem;
		background: url(./images/queen_button_bg.png) no-repeat;
		background-size: 3.88rem auto;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-left: .08rem;
		p{
			color: #fff;
			font-size: .32rem;
		}
	}
	.queen_item_number{
		margin-top: .05rem;
		display: flex;
		justify-content: center;
		p{
			color: #b40007;
		}
	}
	.queen-active-times{
		height: .6rem;
		display: flex;
    justify-content: center;
    position: relative;
    margin-top: -.25rem;
    margin-bottom: .1rem;
    p{
    	padding: .2rem .22rem 0;
    	height: 100%;
			border-radius: .3rem;
			border: .02rem solid #f9c77b;
			color: #f9c77b;
    }
	}
	.queen_item_coupon_txt{
		display: flex;
		color: #b40007;
		display: flex;
		align-items: flex-end;
		strong{
			font-weight: bold;
			font-size: .4rem;
		}
		p{
			font-size: .8rem;
			font-weight: bold;
		}
	}
	.queen_coupon_item{
		padding: .08rem .08rem .1rem;
		background: #d00619;
		margin-bottom: .48rem;
	}
</style>

<script type="text/javascript">
	import AppHeader from '@/components/common/header'

	export default {
		data () {
			return {
				pageView: true,
				title: '女王节'
			}
		},
		components: {
			AppHeader
		}
	}
</script>	