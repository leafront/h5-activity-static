<template>
	<div class="pageView">
		<AppHeader :title="title"></AppHeader>
		<div class="scroll-view-wrapper koi-view" :class="{'visibility': pageView}">
		</div>	
	</div>	
</template>	

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