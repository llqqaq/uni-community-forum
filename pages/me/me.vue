<template>
	<view class="mine">
		<u-navbar
			v-if="fixShow"
			:safeAreaInsetTop="false"
			:autoBack="false"
		>
			 <view
				class="u-nav-slot"
				slot="left"
				@tap="set"
			>
				<text class="set-icon iconfont icon-set"></text>
			</view>
		</u-navbar>
		<view class="top" style="background: url('/static/1676946269978.jpg') repeat;">
			<text class="set-icon iconfont icon-set"></text>
			<view class="mine-info-box">
				<image class="avatar" :src="userInfo.avatar || '/static/icon/touxiang-kong.png'" mode="widthFix"></image>
				<text class="name">{{ userInfo.name }}</text>
				<text class="des">这个人有点懒，什么都没留下</text>
				<view class="btn-box">
					<button  @tap="toMineSet">
						<text class="iconfont icon-set"></text>
						个人设置
					</button>
					<button>
						<view class="icon-box">
							<u-badge showZero v-if='token' absolute :offset="['6rpx', '-10rpx']" type="error" max="99" :value="userInfo.commented"></u-badge>
							<text class="iconfont icon-message"></text>
						</view>
						我的消息
					</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data () {
			return {
				fixShow: false
			}
		},
		computed: {
			...mapState(['userInfo', 'token'])
		},
		onLoad () {
			console.log('this.token', this.userInfo)
		},
		methods: {
			set () {
				console.log('set')
			},
			async toMineSet () {
				// 判断是否登录
				if (!this.token) {
					uni.showToast({
						icon: 'error',
						title: '未登录，清先登录',
						duration: 1000
					})
					const result = await this.$showLogin(this)
				}
			}
		},
		onPageScroll (e) {
			let scrollTop = e.scrollTop
			if (scrollTop >= 100) {
				this.fixShow = true
			} else {
				this.fixShow = false
			}
		},
	}
</script>
<style lang="scss" scoped>
	@import url(~@/static/fonts/iconfont.css);
	.mine {
		height: 2000rpx;
		/deep/ .u-icon__icon {
			display: none !important; 
		}
		.top {
			position: relative;
			padding-top: 120rpx;
			background-size: 100% auto;
			
			border-bottom-right-radius: 70rpx;
			border-bottom-left-radius: 70rpx;
			overflow: hidden;
			
			.set-icon {
				position: absolute;
				left: 40rpx;
				top: 40rpx;
				font-size: 35rpx;
				color: #675d5d;
			}
			.mine-info-box {
				display: flex;
				flex-direction: column;
				transform: translateY(40rpx);
				width: 80%;
				margin: 0 auto;
				background-color: #fff;
				border-radius: 20rpx;
				padding: 20rpx 25rpx 80rpx;
				.name {
					font-size: 30rpx;
					font-weight: 600;
					padding-left: 20rpx;
				}
				.avatar {
					width: 100rpx;
					display: block;
					padding-left: 20rpx;
				}
				.des {
					padding-left: 20rpx;
					font-size: 24rpx;
					color: #c1bbbb;
				}
				.btn-box {
					margin-top: 80rpx;
					display: flex;
					justify-content: space-between;
					button {
						display: flex;
						align-items: center;
						justify-content: space-between;
						width: 48%;
						padding: 7rpx 67rpx;
						margin: 0;
						background-color: #F2F4F1;
						font-size: 26rpx;
						color: #000;
						.icon-box {
							position: relative;
							/deep/ .u-badge {
								padding: 2px 2px;
							}
						}
						.iconfont {
							font-size: 33rpx;
							display: block;
							color: '#000';
						}
					}
				}
			}
		}
	}
</style>