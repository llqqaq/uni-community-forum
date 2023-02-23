<template>
	<view class="feeds">
		<div class="one-feeds-box" v-for="(list, i1) in showList" :key="i1">
			<view class="one-feed"
				:class="i1 % 2 === 0 ? ( i2 === 0 ? 'feed-big-left' : '' ) : (i2 === 1 ? 'feed-big-right' : '')" 
				v-for="(item, i2) in list"
				:key="item.id">
				<navigator :url="'/subpages/feedinfo?id=' + item.id">
					<image :src="item.cover" mode="aspectFill"></image>
				</navigator>
			</view>
		</div>
	</view>
</template>

<script>
	import { getFeeds } from '@/config/api.js'
	export default {
		data() {
			return {
				feedList: [],
				showList: []
			}
		}, 
		onReady () {
			this.getFeeds()
		},
		methods: {
			async getFeeds(isFir) {
				const result = await getFeeds()
				console.log(1)
				console.log('result', result)
				let feedList = result.feeds.map(feed => {
					return {
						id: feed.id,
						// 因为图片大小不一致 所以这里直接用静态的图片显示
						cover: feed.images[0] ? this.BaseFileURL + feed.images[0].file : 'http://ts.lagou.uieee.com/api/v2/files/1609'
					}
				})
				console.log('feedList', feedList)
				if (isFir) {
					this.feedList = []
					// 关闭下拉
					uni.stopPullDownRefresh();
				}
				this.feedList = [
					...this.feedList,
					...feedList
				]
				console.log(this.feedList)
				// 处理成二位数组 方便渲染
				let temp = []
				
				// let count = 0
				// let times = Math.ceil(this.feedList.length / 6)
				// for(let i = 0 ; i < times; i++) {
				// 	temp.push(this.feedList.slice(count, count+6))
				// 	count += 6
				// }
				
				this.feedList.forEach((item, index) => {
					if ((index % 6 === 0 && !!this.feedList[index + 5]) || (index % 6 === 0 && !this.feedList[index + 5])) {
						temp.push(this.feedList.slice(index, index+6))
					}
				})
				this.showList = temp
			}
		}
	}
</script>

<style lang="scss">
.one-feeds-box {
	width: 704rpx;
	margin: 0 auto;
	display: grid; // 栅格布局
	grid-template-columns: 232rpx 232rpx 232rpx; // 定义每一列的宽度
	grid-template-rows: 232rpx 232rpx 232rpx; // 定义每一行的高度
	grid-row-gap: 4rpx; // 行间距
	grid-column-gap: 4rpx; // 列间距
	margin-bottom: 10rpx;
	.one-feed {
		position: relative;
		
		image {
			width: 232rpx;
			height: 232rpx;
			border-radius: 3rpx;
		}
		&.feed-big-left {
			grid-column-start: 1;
			grid-column-end: 3;
			grid-row-start: 1;
			grid-row-end: 3;
			image {
				width: 466rpx;
				height: 466rpx;
			}
		}
		&.feed-big-right {
			grid-column-start: 2;
			grid-column-end: 4;
			grid-row-start: 1;
			grid-row-end: 3;
			image {
				width: 466rpx;
				height: 466rpx;
			}
		}
	}
}
</style>
