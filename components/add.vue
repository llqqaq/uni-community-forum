<template>
	<view class="add-icon" v-if="token">
		<image src="@/static/icon/photograph.png" mode="widthFix" @tap="toShare"></image>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		name:"add",
		data() {
			return {
				
			}
		},
		computed: {
			...mapState(['token'])
		},
		methods: {
			toShare () {
				uni.navigateTo({
					url:'/subpages/share'
				})
			}
		}
	}
</script>

<style lang='scss' scoped>
	.add-icon {
		position: fixed;
		bottom: 100rpx;
		right: 30rpx;
		width: 90rpx;
		height: 90rpx;
		display: flex;
		border-radius: 50%;
		align-items: center;
		justify-content: center;
		background-color: #34377D;
		image {
			width: 50rpx;
		}
	}

</style>