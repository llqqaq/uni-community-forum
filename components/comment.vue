<template>
	<view class="comment">
		<text class="tips">最新评论</text>
		<text class="not-comment" v-if="!commentItems.length">暂无评论</text>
		<view class="comment-items" v-else>
			<view class="comment-item" v-for="item in commentItems" :key="item.id">
				<image :src="item.user.avatar? item.user.avatar : '/static/icon/touxiang-kong.png' " class="avatar" mode="widthFix"></image>
				<view class="comment-item-r">
					<text class="username">{{ item.user.name }}</text>
					<text class="comment-content">{{ item.body }}</text>
					<text class="date">{{ item.created_at | filterDate }}</text>
				</view>
			</view>
		</view>
		<view class="footer-fixed">
			<view class="input" @click="showExpressCommentBox = !showExpressCommentBox">
				说点什么吧
			</view>
			<view class="like-box">
				<image @tap="toggleLike" :src="!hasLike ? '/static/icon/like.png' : '/static/icon/likefill.png'" mode="widthFix"></image>
				<text>{{ likeCount || 0 }}</text>
			</view>
			<view class="comment-icon" @click="scrollToComment">
				<image src="@/static/icon/comments.png" mode="widthFix"></image>
				<text>评论</text>
			</view>
		
			<button class="share-btn" open-type="share">
				<view class="share">
					<image src="@/static/icon/share.png" mode="widthFix"></image>
					<text>分享</text>
				</view>
			</button>
		</view>
		<!-- 发表评论 -->
		<view class="express-comment-box" v-if="showExpressCommentBox">
			<view class="express-comment-top">
				<text>发表评论</text>
				<image @click="showExpressCommentBox = !showExpressCommentBox" src="@/static/icon/xiala.png" mode="widthFix"></image>
			</view>
			<textarea :value="textareaValue" @input="getInput" maxlength=-1 auto-focus cursor-spacing=100></textarea>
			<view class="btn-box">
				<button class="put" @tap="putComment">发布</button>
				<button class="cancel" @click="showExpressCommentBox = !showExpressCommentBox">取消</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			commentItems: {
				type: Array,
				default: () => []
			},
			hasLike: {
				type: Boolean,
				default: false
			},
			likeCount: {
				type: Number,
				default: 0
			}
		},
		data () {
			return {
				textareaValue: 'weqe',
				showExpressCommentBox: false
			}
		},
		methods: {
			getInput (e) {
				this.textareaValue = e.detail.value
			},
			scrollToComment () {
				const query = uni.createSelectorQuery().in(this);
				query.select('.tips').boundingClientRect(data => {
				  uni.pageScrollTo({
				  	scrollTop: data.top,
				  	duration: 200
				  })
				}).exec()
			},
			shareHandle () {
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 1,
					summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
					success: function (res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function (err) {
						console.log("fail:" + JSON.stringify(err));
					}
				})
			},
			putComment () {
				if (!this.textareaValue) return
				
			},
			toggleLike () {
				this.$emit('toggleLike')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.comment {
		background-color: #fff;
		padding-bottom: 100rpx;
		.tips {
			font-weight: 600;
			color: #222;
			font-size: 35rpx;
			display: block;
			padding: 20rpx 0 20rpx 15rpx;
		}
		.not-comment {
			display: flex;
			justify-content: center;
			font-size: 30rpx;
			color: #6F6F6F;
			min-height: 400rpx;
			padding-top: 100rpx;
			box-sizing: border-box;
		}
		.comment-items {
			.comment-item {
				display: flex;
				.avatar {
					width: 75rpx;
					margin-right: 20rpx;
				}
				.comment-item-r {
					flex: 1;
					display: flex;
					flex-direction: column;
					padding-top: 20rpx;
					padding-bottom: 10rpx;
					border-bottom: 1px solid #ecebeb91;
					.username {
						color: #222;
						font-size: 25rpx;
						font-weight: 600;
					}
					.comment-content {
						font-size: 30rpx;
						margin: 20rpx 0 10rpx;
						color: #ACACAC;
					}
					.date {
						font-size: 25rpx;
						color: #9D9D9D;
					}
				}
				&:last-of-type {
					.comment-item-r {
						border-bottom: none;
					}
				}
			}
		}
		.footer-fixed {
			background-color: #fff;
			width: 100%;
			position: fixed;
			bottom: 0;
			left: 0;
			border-top: 1px solid #f9f5f5;
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 100rpx;
			box-sizing: border-box;
			padding-left: 20rpx;
			padding-right: 50rpx;
			.input {
				width: 300rpx;
				background-color: #EAEAEA;
				height: 60rpx;
				line-height: 60rpx;
				padding-left: 20rpx;
				color: #A8A8A8;
				font-size: 25rpx;
				border-radius: 30rpx;
			}
			.share-btn {
				background-color: #fff;
				margin: 0;
				padding: 0;
				width: auto;
				border: none;
				&::after {
					display: none;
				}
			}
			view {
				display: flex;
				align-items: center;
				font-size: 28rpx;
				image {
					width: 50rpx;
				}
			}
		}
		.express-comment-box {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			background-color: #F1F1F1;
			padding: 0 45rpx 45rpx 45rpx;
			box-sizing: border-box;
			.express-comment-top {
				display: flex;
				align-items: center;
				justify-content: space-between;
				height: 100rpx;
				text {
					font-size: 28rpx;
					color: #8F8F8F;
				}
				image {
					width: 35rpx;
				}
			}
			textarea {
				width: 100%;
				height: 200rpx;
				border-radius: 30rpx;
				border: 1px solid #EBEBEB;
				background-color: #fff;
				font-size: 30rpx;
				color: #8F8F8F;
				box-sizing: border-box;
				padding: 10rpx 20rpx;
			}
			.btn-box {
				text-align: right;
				margin-top: 20rpx;
				button {
					display: inline-block;
					width: 120rpx;
					margin-right: 20rpx;
					box-sizing: border-box;
					font-size: 25rpx;
					&.put {
						background-color: #93D491;
						color: #fff;
					}
				}
			}
		}
	}
</style>