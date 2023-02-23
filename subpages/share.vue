<template>
	<view class="share">
		<u--textarea border='surround' :height=120 v-model="value1" placeholderClass placeholder="添加描述"></u--textarea>
		<!-- <view class="photo-container">
			<view class="phpto-item" v-for="(item, index) in imageList" :key="index" @click="previewImage(index)">
				<image src="@/static/icon/close.png" mode="widthFix" class="close" @tap="removeImage(index)"></image>
				<image class="photo" :src="item" mode="heightFix"></image>
			</view>
			<view class="phpto-item" @tap="chooseImage" v-if="imageList.length < 9">
				<text class="add">+</text>
				<text class="tips">选择照片</text>
			</view>
		</view> -->
		<u-upload
			:fileList="fileList1"
			@afterRead="afterRead"
			@delete="deletePic"
			name="1"
			multiple
			:maxCount="9"
		></u-upload>

		<button @tap="submit" style="margin-top: 50rpx;">发布</button>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>
 
<script>
	import { uploadFile, postOneFeed } from '@/config/api.js'
	export default {
		data() {
			return {
				value1: '',
				imageList: [],
				fileList1: [],
			}
		},
		methods: {
			chooseImage () {
				let count = 9 - this.imageList.length
				uni.chooseImage({
					count, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: (res) => {
						this.imageList = [
							...this.imageList,
							...res.tempFilePaths
						]
					}
				})
			},
			removeImage (index) {
				this.imageList.splice(index, 1)
			},
			previewImage (index) {
				// 预览图片
				uni.previewImage({
					current: index,
					urls: this.imageList,
					indicator: 'default',
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg)
						}
					}
				})
			},
			async submit () {
				if (!this.value1 || !this.imageList.length) {
					this.$refs.uToast.show({
						message: '内容/图片不能为空！'
					})
					return
				} 
				let upStatusArr = []  // 存储上传的异步函数
				let imgList = [] // 存储img的id
				this.imageList.map(image => {
					upStatusArr.push(uploadFile(image))
				})
				const result = await Promise.all(upStatusArr)
				result.map(item => {
					imgList.push({
						id: item.id
					})
				})
				const res = await postOneFeed({
					feed_content: this.value1,
					feed_from: 5,
					feed_mark: Date.now(),
					images: imgList
				})
				uni.showToast({
					title: '发布成功'
				})
				// 这里继续做uni的on/emit 做其他页面的更新  懒的搞
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				let uploadAsync = []
				
				for (let i = 0; i < lists.length; i++) {
					uploadAsync.push(this.uploadFilePromise(lists[i].url))
					// const result = await this.uploadFilePromise(lists[i].url)
					// let item = this[`fileList${event.name}`][fileListLen]
					// this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
					// 	status: 'success',
					// 	message: '',
					// 	id: result
					// }))
					// fileListLen++
				}
				const imagesId = await Promise.all(uploadAsync)
				// 上传完成，改变展示列表的状态
				this[`fileList${event.name}`].map(item => {
					item.status = 'success'
					item.message = ''
				})
			},
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: 'http://ts.lagou.uieee.com/api/v2/files', // 仅为示例，非真实的接口地址
						header: {
							Authorization: `Bearer ${uni.getStorageSync('token')}`
						},
						filePath: url,
						name: 'file',
						success: (res) => {
							resolve(JSON.parse(res.data).id)
						}
					});
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.share {
		min-height: 100vh;
		padding: 20rpx 40rpx 30rpx;
		/deep/ textarea {
			font-size: 25rpx;
		}
		/deep/ .input-placeholder {
			font-size: 25rpx;
		}
		.photo-container {
			display: flex;
			flex-wrap: wrap;
			padding-top: 40rpx;
			.phpto-item {
				position: relative;
				margin-right: 10rpx;
				overflow: hidden;
				border-radius: 10rpx;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				width: 210rpx;
				height: 210rpx;
				background-color: rgb(234, 234, 234);
				color: rgb(162, 162, 162);
				margin-bottom: 10rpx;
				&:nth-of-type(3n) {
					margin-right: 0;
				}
				.add {
					display: inline-block;
					line-height: 90rpx;
					font-size: 85rpx;
				}
				.tips {
					font-size: 28rpx;
				}
				.photo {
					width: 100%;
				}
				.close {
					position: absolute;
					top: 0;
					right: 0;
					width: 64rpx;
				}
			}
		}
	}
</style>
