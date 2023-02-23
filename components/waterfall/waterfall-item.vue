<template>
	<view class="waterfall-item-container">
		<view class="waterfall-item" @tap="onTap">
			<image class="cover" :src="params.cover" mode="widthFix" @load="emitHeight" @error="emitHeight"></image>
			<view class="content">
				<text class="recommend-item-desc">{{ params.feed_content }}</text>
				<view class="recommend-item-bottom">
					<u--image width='50rpx' height='50rpx' :src="params.avatar" shape="circle" mode="widthFix">
					</u--image>
					<text class="username">{{ params.name }}</text>
					<image @tap="onTapLike" class="like-icon" src="@/static/icon/aixin.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "helangWaterfallItem",
		options: {
			virtualHost: true
		},
		props: {
			params: {
				type: Object,
				default () {
					return {}
				}
			},
			tag: {
				type: String | Number,
				default: ''
			},
			index: {
				type: Number,
				default: -1
			}
		},
		data() {
			return {

			};
		},
		methods: {
			// 发出组件高度信息，在此处可以区分正确和错误的加载，给予错误的提示图片
			emitHeight(e) {
				const query = uni.createSelectorQuery().in(this);
				query.select('.waterfall-item-container').boundingClientRect(data => {
					let height = Math.floor(data.height);
					this.$emit("height", height, this.$props.tag);
				}).exec();
			},
			onTap() {
				this.$emit("click", this.$props.index, this.$props.tag);
			},
			onTapLike() {
				this.$emit("clickLike", this.$props.index, this.$props.tag);
			}
		}
	}
</script>

<style lang="scss" scoped>


	.waterfall-item {
		background-color: #fff;
		border-radius: 4px;
		font-size: 28rpx;
		color: #666;
		padding-bottom: 10rpx;
		overflow: hidden;
		.cover {
			display: block;
			width: 100%;
			// 默认设置一个图片的大约值
			// height: 350rpx;
		}
	.recommend-item-desc {
		display: block;
		color: #030303;
		margin: 10rpx 0;
		font-size: 25rpx;
	}

	.recommend-item-bottom {
		display: flex;
		align-items: center;
		position: relative;

		.username {
			color: #eeede7;
			font-size: 25rpx;
			margin-left: 5rpx;
		}

		.like-icon {
			position: absolute;
			right: 15rpx;
			top: calc(50% - 30rpx);
			width: 50rpx;
		}
	}
	}
</style>
