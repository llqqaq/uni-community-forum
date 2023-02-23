import { likeThisFeed, unlikeThisFeed } from '@/config/api.js'

const likeMixin = {
	methods: {
		async clickLike (e) {
			// 判断是否登录
			if (!this.token) {
				uni.showToast({
					icon: 'error',
					title: '未登录，清先登录',
					duration: 1000
				})
				const result = await this.$showLogin(this)
				return
			}
			// 已登录
			if (e.has_like) {
				// 取消点赞
				try {
					await unlikeThisFeed({
						id: e.id
					})
				} catch (error) {
					return uni.showToast({
						title: '请重试',
						icon: 'error'
					})
				}
			} else {
				// 取消点赞
				try {
					await likeThisFeed({
						id: e.id
					})
				} catch (error) {
					return uni.showToast({
						title: '请重试',
						icon: 'error'
					})
				}
			}
			uni.showToast({
				title: e.has_like ? '取消成功' : '点赞成功',
				icon: 'success'
			})
			e.has_like = !e.has_like
		},
	}
}
export default likeMixin