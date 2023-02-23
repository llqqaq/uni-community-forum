<template>
	<view class="newinfo-container" v-if="newInfo">
		<view class="blur-box">
			<helang-blur :params="{
				width:'100%',
				height:'400rpx',
				image: newInfo.cover,
				blur:'xs'
			}"></helang-blur>
			<view class="blur-fix-bottom">
				<view class="title">{{ newInfo.cutTitle }}</view>
				<view class="new-info">{{ newInfo.author }} {{ newInfo.views_count }} 阅读</view>
			</view>
		</view>
		<view class="content">
			<u-parse :content="newInfo.content"></u-parse>
		</view>
		<comment :commentItems="commentItems"></comment>
	</view>
</template>

<script>
	import { getNewInfo, getNewsComments } from '@/config/api.js'
	import helangBlur from "@/components/helang-blur/helang-blur.vue"
	import Comment from '@/components/comment.vue'
	export default {
		data () {
			return {
				newInfo: null,
				commentItems: []
			}
		},
		components: {
			helangBlur,
			Comment
	    },
		onLoad (options) {
			this.getNewInfo(options.id)
			this.getNewsComments(options.id)
		},
		methods: {
			async getNewInfo (id) {
				const result = await getNewInfo(id)
				let content = result.content
												.replace(/@!\[.*\]\((\d*)\)/g, "<img src='" + this.BaseFileURL + '$1' +"'/>") // 处理图片
												.replace(/\s\D\s/g, '<p></p>') // 处理换行
				this.newInfo = {
					...result,
					cutTitle: result.title.length > 11 ? result.title.substring(0, 11) + '...' : result.title,
					cover: this.BaseFileURL + result.image.id,
					content,
					views_count: result.hits
				}
			},
			async getNewsComments (id) {
				const result = await getNewsComments(id)
				console.log(result)
				this.commentItems = result.comments
			}
		}
	}
</script>

<style lang="scss" scoped>
	// @import url("@/components/u-parse/u-parse.css");
	.newinfo-container {
		background-color: #F1F1F1;
		.blur-box {
			position: relative;
			.blur-fix-bottom {
				z-index: 999;
				position: absolute;
				bottom: 0;
				padding-left: 15rpx;
				padding-bottom: 20rpx;
				color: #fff;
				.title {
					font-size: 35rpx;
					margin-bottom: 10rpx;
				}
				.new-info {
					font-size: 20rpx;
				}
			}
		}
		.content {
			background-color: #fff;
			width: 100%;
			padding: 40rpx 30rpx 20rpx 40rpx; 
			box-sizing: border-box;
			margin-bottom: 30rpx;
			::v-deep image {
				max-width: 100%;
				border-radius: 10rpx;
			}
		}
	}
</style>