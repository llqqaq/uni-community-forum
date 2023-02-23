<template>
	<view class="login" v-if='loginShow'>
		<view class="content">
			<image @tap="cancel" class="close-icon" src="@/static/icon/close.png" mode="widthFix"></image>
			<view v-if="showGetUserInfoBtn">
				<view class="tips">前端交流学习中心欢迎你</view>
				<button class="login-btn" open-type="getUserInfo" @getuserinfo="getUserInfo">
					<image class="wc-icon" src="@/static/icon/wechat.png" mode="widthFix"></image>
					<text>一键获取微信信息</text>
				</button>
			</view>
			<!-- form表单 -->
			<login-form v-else @cancel="cancel" @loginSuccess="loginSuccess"></login-form>
			<view class="warning-tips">
				点击登录/注册前端论坛，即表示已阅读并同意
			</view>
		</view>
	</view>
</template>

<script>
	import LoginForm from './components/login-form.vue'
	export default {
		name:"login",
		data() {
			return {
				showGetUserInfoBtn: false,
				loginShow: false,
				options: {}
			}
		},
		components: {
			LoginForm
		},
		mounted() {
			wx.getSetting({
			  success(res) {
				  console.log(res)
					if (res.authSetting['scope.userInfo']) {
					  console.log('授权过了，直接调用获取')
					}
			  }
			})
		},
		methods: {
			getUserInfo (e) {
				this.showGetUserInfoBtn = false
			},
			showLogin (options) {
				return new Promise((resolve, reject) => {
					const defaultOptions = {
						success: null, // 成功后的回调
						fail: null // 失败后的回调
					}
					this.options = Object.assign({}, defaultOptions, options)
					this.loginShow = true
					this.options.success = this.options.success || function successResolve () {
						resolve(true)
					}
					this.options.fail = this.options.fail || function failResolve () {
						reject(new Error('登录失败'))
					}
				})
			},
			cancel () {
				this.loginShow = false
			},
			loginSuccess () {
				const confirmHandler = this.options.success
				if (confirmHandler && typeof confirmHandler === 'function') {
					uni.showToast({
						title: '登录成功',
						duration: 1000
					})
					this.loginShow = false
					confirmHandler()
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.login {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.2);
	.content {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		border-top-left-radius: 22rpx;
		border-top-right-radius: 22rpx;
		background-color: #fff;
		padding-top: 50rpx;
		padding-bottom: 50rpx;
		.close-icon {
			position: absolute;
			top: 20rpx;
			right: 20rpx;
			width: 55rpx;
		}
		.tips {
			text-align: center;
			font-size: 32rpx;
			color: #2C2C2C;
		}
		.login-btn {
			box-sizing: border-box;
			width: 80%;
			margin: 38rpx auto;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: #043CF3;
			border-radius: 40rpx;
			.wc-icon {
				width: 44rpx;
				margin-right: 20rpx;
			}
			text {
				font-size: 27rpx;
				color: #fff;
			}
		}
		.warning-tips {
			text-align: center;
			font-size: 20rpx;
			color: #373737;
		}
	}
}
</style>