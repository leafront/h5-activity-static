<template>
	<swiper :list="bannerList" :index="index" :preventDefault="true" @toggleIndex="toggleIndex" :itemWidth="wrapperWidth" :style="{'height':itemHeight}">
		<ul slot="banner" class="slideshow-item">
			<li v-for="item in bannerList":style="{'width':itemWidth}" @click="pageAction(item.linkUrl)">
				<img :src="item.url300x300" :style="{'width':itemWidth, 'height':itemHeight}">
			</li>
		</ul>
    <ul slot="dot" class="slideshow-dots">
      <li v-for="(item,$index) in bannerList" :class="{'active':$index == index-1}"></li>
    </ul>
	</swiper>
</template>
<script>

	import swiper from '@/components/widget/swiper.vue'

  const docWidth = document.documentElement.clientWidth

	export default {
    data () {
      return {
        index: 1,
        wrapperWidth: docWidth,
        itemWidth: docWidth + 'px',
        itemHeight: docWidth  + 'px',
      }
    },
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
		methods: {
			pageAction (url) {
				if (url) {
					location.href = url
				}
			},
      toggleIndex (val) {
        this.index = val
      }
		}
	}
</script>
