<template>
	<swiper :list="bannerList" :style="{'height':itemHeight}">
		<ul class="slideshow-item">
			<li v-for="item in bannerList":style="{'width':itemWidth}" @click="pageAction(item.linkUrl)">
				<img :src="item.imageUrl" :style="{'width':itemWidth, 'height':itemHeight}">
			</li>
		</ul>
	</swiper>
</template>

<script>

	import swiper from '@/components/widget/swiper.vue'

	export default {
		props: {
			bannerList: {
				type: Array,
				default () {
					return []
				}
			}
		},
		components:{
			swiper
		},
		data () {
			return {
				itemWidth: document.documentElement.clientWidth + 'px',
				itemHeight: document.documentElement.clientWidth * 0.4 + 'px',
			}
		},
		methods: {

			pageAction (url) {

				if (url) {

					location.href = url

				}

			}
		}
	}
</script>



