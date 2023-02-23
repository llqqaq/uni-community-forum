<template>
	<swiper
		class="swiper"
		:style="{height: swiperHeight}"
		circular
		:autoplay="autoplay"
		:interval="interval"
		:duration="duration">
		<swiper-item v-for="ad in adList" :key="ad.id">
			<navigator class="navigator" open-type='navigate' :url="'/pages/webview/webview?url='+ ad.data.link">
				<view class="swiper-item" :style="{backgroundImage: 'url('+ ad.data.image +')'}"></view>
			</navigator>
		</swiper-item>
	</swiper>
</template>

<script>
import { getAdvertising } from '@/config/api.js'
export default {
	data () {
		return {
			autoplay: true,
			interval: 2000,
			duration: 500,
			swiperHeight: '400rpx',
			adList: []
		}
	},
	mounted () {
		this.getAds()
	},
	methods: {
		// 获取广告轮播图
		async getAds () {
			const result = await getAdvertising()
			this.adList = result
		}
	}
}
</script>

<style lang="scss" scoped>
.swiper {
	.navigator {
		height: 100%;
		.swiper-item {
			height: 100%;
			background-repeat: no-repeat;
			background-size: auto 100%; 
			background-position: center 0;
		}
	}
}
</style>