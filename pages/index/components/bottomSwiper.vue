<template>
	<view class="footer-swiper">
		<swiper
			class="swiper"
			:style="{height: swiperHeight}"
			circular 
			:current="currentIndex"
			@change="swiperItemChange">
			<swiper-item>
				<view class="swiper-item swiper-item111">
					<helang-waterfall-list
						:status="waterfall.status"
						:list="feedList"
						:reset="waterfall.reset"
						@done="onDone"
						@click="onClick"
						@clickLike="clickLike"
					>
						<template>
							<view v-if="waterfall.status == 'await'">
								<view class="load-txt">上拉加载更多</view>
							</view>
							<view v-else-if="waterfall.status == 'loading'">
								<u-loading-icon text="加载中" textSize="18"></u-loading-icon>
							</view>
							<view v-else-if="waterfall.status == 'success'">
								<u-loading-icon text="加载中" textSize="18"></u-loading-icon>
							</view>
							<view v-else-if="waterfall.status == 'finish'">
								<view class="load-txt">没有更多了</view>
							</view>
							<view v-else-if="waterfall.status == 'fail'">
								<view class="load-txt">出错了，请刷新重试</view>
							</view>
							<view v-else-if="waterfall.status == 'empty'">
								
								<view class="load-txt">暂无数据</view>
							</view>
							<view v-else><!-- 别问我为什么要写一个 v-else 的空 view,不写H5平台就会有CSS生效的离谱BUG --></view>
						</template>
					</helang-waterfall-list>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<view class="news-item"
						v-for="newItem in newList"
						:key="newItem.id"
						@tap="toNewInfo(newItem.id)">
						<view class="item-left">
							<view class="title">{{ newItem.title }}</view>
							<view class="des">
								<text>{{ newItem.author }}</text>	
								<text>{{ newItem.created_at }}</text>
							</view>
						</view>
						<image class="cover" :src="newItem.cover" mode="aspectFit"></image>
					</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
import { getFeeds, getNews } from '@/config/api.js'
import helangWaterfallList from "@/uni_modules/helang-waterfall/components/waterfall/waterfall-list"

// 列表接口模拟数据
import mockData from '@/uni_modules/helang-waterfall/mock-data/waterfall-list.js'
import { mapState } from 'vuex'
import likeMixin from '@/mixins/likeMixin.js'
export default {
	data () {
		return {
			swiperHeight: '400px',
			interval: 2000,
			feedList: [],
			newList: [],
			// 瀑布流组件相关
			waterfall:{
				requiring: false,
				status:"",
				reset:false
			},
			preHeight: 0 // 切换前瀑布流的高度
		}
	},
	mixins: [likeMixin],
	props: {
		currentIndex: {
			type: Number,
			default: 0
		},
		scrollTop: {
			type: Number,
			default: 0
		}
	},
	computed: {
		...mapState(['token']) 
	},
	components: {
		"helang-waterfall-list": helangWaterfallList
	},
	mounted () {
		this.getFeeds()
		this.getNews()
		this.watchLogin()
	},
	methods: {
		async getFeeds (isFir) {
			if (this.currentIndex === 1) return
			if (this.waterfall.requiring) return
			this.waterfall.requiring = true
			// 设置状态为加载中
			this.waterfall.status = 'loading'
			const result = await getFeeds()
			let feedList = result.feeds.map(feed => {
				return {
					...feed,
					cover: feed.images[0] ? this.BaseFileURL + feed.images[0].file : 'http://ts.lagou.uieee.com/api/v2/files/1609',
					avatar: feed.user.avatar ? feed.user.avatar : '/static/icon/touxiang-kong.png',
					name: feed.user.name
				}
			})
			if (isFir){ 
				this.feedList = []
				// 关闭下拉
				uni.stopPullDownRefresh();
			}
			this.feedList = [
				...this.feedList,
				...feedList
			]
			// 设置组件为 加载成功 状态，此时瀑布流组件开始计算当前数据的布局
			this.waterfall.status = 'success'
			
		},
		async getNews () {
			const result = await getNews()
			
			this.newList = result.map(newItem => {
				return {
					...newItem,
					cover: this.BaseFileURL + newItem.image.id
				}
			})
		},
		// 瀑布流组件渲染完成
		onDone(height){
			this.$nextTick(() => {
				const query = uni.createSelectorQuery().in(this);
				query.select('.swiper-item111').boundingClientRect(data => {
				  this.waterfall.requiring = false
				  this.preHeight = `${data.height}px`
				  this.swiperHeight = `${data.height}px`
				  // 设置组件为 非重置，这行代码保留不删即可
				  this.waterfall.reset = false
				  // 设置组件状态为 等待加载
				  this.waterfall.status = 'await'
				}).exec();
			})
		}, 
		reset () {
			console.log('reset')
			if (this.currentIndex === 0) {
				this.waterfall.requiring = false
				this.waterfall.reset = true
				this.preHeight = 0
				this.getFeeds(true)
			} else {
				this.getNews()
			}
		},
		swiperItemChange (e) {
			const index = e.detail.current
			this.$emit('swiperItemChange', index)
		},
		toNewInfo (id) {
			uni.navigateTo({
				url: '/subpages/newinfo?id=' + id
			})
		},
		onClick (e) {
			uni.navigateTo({
				url: '/subpages/feedinfo?id=' + e.id
			})
		},
		// async clickLike (e) {
		// 	// 判断是否登录
		// 	if (!this.token) {
		// 		uni.showToast({
		// 			icon: 'error',
		// 			title: '未登录，清先登录',
		// 			duration: 1000
		// 		})
		// 		const result = await this.$showLogin(this)
		// 		return
		// 	}
		// 	e.has_like = !e.has_like
		// },
		watchLogin () {
			uni.$on('login', () => {
				this.reset()
			})
		}
	},
	watch: {
		currentIndex (newVal, oldVal) {
			if (newVal === oldVal) return
			let height = 0
			if (newVal === 1) {
				const query = uni.createSelectorQuery().in(this);
				query.select('.news-item').boundingClientRect(data => {
					this.swiperHeight = `${data.height * this.newList.length}px`
				}).exec();
			} else {
				this.swiperHeight = this.preHeight
			}
		},
		scrollTop (scrollY) {
			console.log(scrollY) 
		}
	}
}
</script>

<style lang="scss" scoped>
.swiper {
	padding-bottom: 30rpx;
	margin-top: 20rpx;
	background-color: #fff;
	.swiper-item {
		.recommend-item {
			display: flex;
			flex-direction: column;
			margin-left: 8rpx;
			margin-top: 10rpx;
			width: 48%;
			padding: 0 0 25rpx 5rpx;
			background-color: #fff;
			border-radius: 15rpx;
			overflow: hidden;
			.cover {
				width: 100%;
				border-radius: 10rpx;
			}
			.recommend-item-desc {
				color: #030303;
				margin: 15rpx 0;
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
		.news-item {
			display: flex;
			border-bottom: 1px solid #f6f6f6;
			padding: 25rpx 30rpx;
			.item-left {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.title {
					color: #191C23;
					font-size: 30rpx;
					font-weight: 600;
				}
				.des {
					font-size: 20rpx;
					color: #989898;
					display: flex;
					justify-content: space-between;
				}
			}
			.cover {
				border-radius: 5rpx;
				width: 100rpx;
				height: 100rpx;
				margin-left: 30rpx;
			}
		}
	}
}
</style>