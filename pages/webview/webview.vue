<template>
	<view>
		111
		<web-view :src="src"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: ''
			}
		},
		onLoad(options) {
			console.log(options)
			this.src = encodeURI(options.url)
		}
	}
</script>

<style>

</style>
