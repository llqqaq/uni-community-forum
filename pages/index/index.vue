<template>
	<view class="index">
		<u-navbar
			v-if="fixShow"
			:safeAreaInsetTop="false"
			:autoBack="false"
		>
			<view class="nav-bar-center" slot="center">
				<text :class="['test', {'active': currentIndex === 0}]" @tap="currentIndex = 0">推荐</text>
				<text :class="{ 'active': currentIndex === 1 }" @tap="currentIndex = 1">资讯</text>
			</view>
		</u-navbar>
		<!-- 顶部轮播图 -->
		<top-banner ref="topbanner"></top-banner>
		<!-- 跳转至精彩动态/个人中心 -->
		<view class="other-page-btn">
			<view class="btn" @tap="goTap('/pages/feeds/feeds')">
				<image class="icon" src="@/static/icon/icon10.png" mode="widthFix"></image>
				精彩动态
			</view>
			<view class="btn" @tap="goTap('/pages/me/me')">
				<image class="icon" src="@/static/icon/dongtai.png" mode="widthFix"></image>
				个人中心
			</view>
		</view>
		<!-- 切换 -->
		<view class="toggle-box">
			<text :class="['test', {'active': currentIndex === 0}]" @tap="currentIndex = 0">推荐</text>
			<text :class="{ 'active': currentIndex === 1 }" @tap="currentIndex = 1">资讯</text>
		</view>
		<!-- 推荐/资讯 -->
		<bottom-swiper
			ref="bottomSwiper"
			:currentIndex="currentIndex"
			@swiperItemChange="swiperItemChange"></bottom-swiper>
		<add />
	</view>
</template>

<script>
import TopBanner from './components/topBanner.vue'
import BottomSwiper from './components/bottomSwiper.vue'
export default {
	data() {
		return {
			currentIndex: 0,
			scrollTop: 0,
			toggleBoxTop: 0,
			fixShow: false
		}
	},
	components: {
		TopBanner,
		BottomSwiper
	},
	onReady() {
		this.recordToggleBoxTop()
	},
	methods: {
		recordToggleBoxTop () {
			const query = uni.createSelectorQuery().in(this);
			query.select('.toggle-box').boundingClientRect(data => {
				this.toggleBoxTop = data.top
			}).exec();
		},
		goTap (url) { 
			uni.switchTab({
				url
			})
		},
		swiperItemChange (index) {
			this.currentIndex = index
		},
		back () {
			
		}
	},
	onPageScroll (e) {
		let scrollTop = e.scrollTop
		if (scrollTop >= this.toggleBoxTop) {
			this.fixShow = true
		} else {
			this.fixShow = false
		}
	},
	onPullDownRefresh () {
		this.$refs.bottomSwiper.reset()
	},
	onReachBottom() {
		this.$refs.bottomSwiper.getFeeds()
	}
}
</script>

<style lang="scss" scoped>
	.index {
		background-color: rgba(239,239,239, .5);
		min-height: 100vh;
	}
	/deep/ .u-icon__icon {
		display: none !important; 
	}
	.nav-bar-center {
		text {
			font-size: 35rpx;
			font-weight: 600;
			color: #dcc9c9;
			&:nth-of-type(1) {
				margin-right: 40rpx;
			}
			&.active {
				color: #4063BC;
			}
		}
	}
	.other-page-btn {
		padding: 0 20rpx;
		display: flex;
		justify-content: space-around;
		// background-color: rgba(239,239,239, .5);
		transform: translateY(-40rpx);
		.btn {
			width: 43%;
			height: 80rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: #FFFFFE;
			border-radius: 50rpx;
			font-size: 30rpx;
			font-weight: 600;
			.icon {
				width: 50rpx;
				margin-right: 10rpx;
			}
		}
	}
	.toggle-box {
		text-align: center;
		margin-top: -20rpx;
		text {
			font-size: 30rpx;
			color: #dcc9c9;
			&:nth-of-type(1) {
				margin-right: 30rpx;
			}
			&.active {
				color: #4063BC;
			}
		}
	}
</style>
