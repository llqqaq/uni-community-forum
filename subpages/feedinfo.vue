<template>
	<view class="feed-info-container" v-if="feedInfo">
		<div class="top-box">
			<view class="author-info">
				<image class="user-avatar" :src="feedInfo.avatar" mode="widthFix"></image>
				<text class="user-name">{{ feedInfo.name }}</text>
			</view>
			<view class="content">
				<view class="info-text">
					{{ feedInfo.feed_content }}
				</view>
				<view class="info-images">
					<image v-for="item in feedInfo.images" :key="item" :src="item" mode="widthFix"></image>
				</view>
			</view>
			<view class="info-des">
				<text>{{ feedInfo.created_at | filterDate }} 发布</text>
				<text>{{ feedInfo.hot }} 阅读 {{ feedInfo.like_count }} 点赞</text>
			</view>
		</div>
		<comment @toggleLike='toggleLike' :test="test" :commentItems="commentItems" :hasLike="hasLike" :likeCount="likeCount"></comment>
	</view>
</template>

<script>
	import { getFeedInfo, getFeedComments } from '@/config/api.js'
	import Comment from '@/components/comment.vue'
	export default {
		data() {
			return {
				test: 1,
				feedInfo: null,
				hasLike: false,
				likeCount: 0,
				commentItems: []
			}
		},
		components: {
			Comment
		},
		onLoad (options) {
			this.getFeedInfo(options.id)
			this.getFeedComments(options.id)
		},
		methods: {
			async getFeedInfo (id) {
				const result = await getFeedInfo(id)
				console.log("result", result)
				const images = result.images.map(one => this.BaseFileURL + one.file)
				this.feedInfo = {
					...result,
					name: result.user.name,
					avatar: result.user.avatar ? result.user.avatar : '/static/icon/touxiang-kong.png',
					images
				}
				this.hasLike = this.feedInfo.has_like
				this.likeCount = this.feedInfo.like_count
				console.log(this.feedInfo)
			},
			async getFeedComments (id) {
				const result = await getFeedComments(id)
				console.log('result.comments ', result.comments )
				this.commentItems = result.comments 
			},
			toggleLike () {
				uni.showToast({
					title: this.hasLike ? '取消成功' : '点赞成功'
				})
				this.hasLike = !this.hasLike
			}
		}
	}
</script>

<style lang="scss" scoped>
.feed-info-container {
	min-height: 100vh;
	background-color: #F1F1F1;
	
	.top-box {
		padding: 20rpx 20rpx 30rpx;
		background-color: #fff;
		.author-info {
			display: flex;
			align-items: center;
			.user-avatar {
				width: 80rpx;
				margin-right: 10rpx;
				border-radius: 50%			}
			.user-name {
				font-size: 30rpx;
				color: #222;
				font-weight: 600;
			}
		}
		.content {
			padding-bottom: 10rpx;
			.info-text {
				color: #7d7a7a;
				padding: 20rpx 0;
				font-size: 35rpx;
				line-height: 40rpx;
			}
			.info-images {
				padding-bottom: 10rpx;
				image {
					width: 100%;
					margin-bottom: 10rpx;
					border-radius: 5rpx;
				}
			}
			
		}
		.info-des {
			display: flex;
			justify-content: space-between;
			font-size: 26rpx;
			color: #9c9b9b
		}
	}
}
</style>
