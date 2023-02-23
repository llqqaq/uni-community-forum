<template>
	<view class="login-form">
		<!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
		<u--form :model="formValue" :rules="rules" labelWidth="120rpx" ref="form">
			<u-form-item label="账号" required prop="login" borderBottom v-if="curNow === 0">
				<u--input v-model="formValue.login" placeholder="输入手机号/邮箱/昵称" border="none" />
			</u-form-item>
			<u-form-item label="昵称" required prop="name" borderBottom v-if="curNow === 2 || curNow === 3">
				<u--input v-model="formValue.name" maxlength=10 placeholder="2-10个字符" border="none" />
			</u-form-item>
			<u-form-item label="电话" required prop="phone" borderBottom v-if="curNow === 1 || curNow === 2">
				<u--input v-model="formValue.phone" placeholder="输入11位手机号码" border="none" />
			</u-form-item>
			<u-form-item label="邮箱" required prop="email" borderBottom v-if="curNow === 3">
				<u--input v-model="formValue.email" placeholder="输入邮箱" border="none" />
			</u-form-item>
			<u-form-item label="验证码" required prop="code" borderBottom
				v-if="curNow === 1 || curNow === 2 || curNow === 3">
				<u-input v-model="formValue.code" placeholder="请输入四位验证码" border="none">
					<template slot="suffix">
						<u-code @change="codeChange" ref="uCode" :seconds="seconds" changeText="X秒重新获取"></u-code>
						<u-button @tap="getCode" :text="tips" type="success" size="mini"></u-button>
					</template>
				</u-input>
			</u-form-item>
			<u-form-item label="密码" required prop="password" borderBottom
				v-if="curNow === 0 || curNow === 2 || curNow === 3">
				<u--input v-model="formValue.password" type="password" maxlength=20 placeholder="限4-20个字符,区分大小写"
					border="none" />
			</u-form-item>
			<u-form-item label="重复密码" required prop="repassword" borderBottom v-if="curNow === 2 || curNow === 3">
				<u--input v-model="formValue.repassword" placeholder="再次输入密码" border="none" />
			</u-form-item>
			<view class="btn-box">
				<button plain size="mini" @tap="summit">提交</button>
				<button plain size="mini" @tap="cancel">取消</button>
			</view>
			<view class="type">
				<u-subsection activeColor='#43829B' fontSize='20rpx' :bold='false' bgColor='rgba(0, 0, 0, 0)'
					:list="list" :current="curNow" @change="sectionChange"></u-subsection>
			</view>
		</u--form>
	</view>
</template>

<script>
	import { getLoginCode, userLogin, getUserMsg } from '@/config/api.js'
	import { mapActions } from 'vuex'
	export default {
		data() {
			return {
				tips: '',
				seconds: 60, // 倒计时的时间
				list: ['密码登录', '验证码登录', '手机注册', '邮箱注册'],
				curNow: 0, // 0 密码登陆 1验证码登录 2手机注册 3邮箱注册
				formValue: {
					login: '大大怪叔叔',
					name: '',
					phone: '',
					email: '',
					password: '123456',
					repassword: ''
				},
				rules: {
					'login': {
						validator: (rule, value, callback) => {
							// 为密码登录再进行校验
							if (this.curNow === 0) {
								return !this.$u.test.isEmpty(value)
							}
							return true
						},
						required: true,
						message: '不能为空',
						trigger: ['blur', 'change']
					},
					'name': {
						validator: (rule, value, callback) => {
							if (value.length < 2) callback(new Error('昵称长度在2-10字符'))
							callback()
						},
						required: true,
						trigger: ['blur']
					},
					'password': {
						validator: (rule, value, callback) => {
							if (this.$u.test.isEmpty(value)) callback(new Error('密码不能为空'))
							if (value.length < 4) callback(new Error('密码长度在4-20字符'))
							callback()
						},
						required: true,
						trigger: ['blur', 'change']
					},
					'phone': [{
							required: true,
							message: '请输入手机号',
							trigger: ['change', 'blur'],
						},
						{
							// 自定义验证函数，见上说明
							validator: (rule, value, callback) => {
								return uni.$u.test.mobile(value)
							},
							message: '手机号码不正确',
						}
					]
				},
			};
		},
		mounted() {
			//如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
			this.$refs.form.setRules(this.rules)
		},
		methods: {
			...mapActions(['setToken', 'setUserInfo']),
			sectionChange(index) {
				this.$refs.uCode && this.$refs.uCode.reset()
				this.curNow = index;
			},
			async summit() {
				uni.showLoading({
					title: '登录中'
				})
				let result = null
				try {
					result = await userLogin({
						login: this.formValue.login,
						password: this.formValue.password
					})
					console.log(result)
				} catch (error) {
					uni.showToast({
						icon: 'error',
						title: err,
						duration: 1000
					})
					return
				}
				// 登錄成功后的操作
				this.loginAfter(result.access_token)
			},
			codeChange(text) {
				this.tips = text;   
			},
			async getCode() {
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码'
					})
					const result = await getLoginCode({
						phone: 15992271223
					})
					console.log(result)
					setTimeout(() => {
						uni.hideLoading()
						// 这里此提示会被this.start()方法中的提示覆盖
						uni.$u.toast('验证码已发送')
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start()
					}, 2000)
				} else {
					uni.$u.toast('倒计时结束后再发送')
				}
			},
			cancel () {
				this.$emit('cancel')
			},
			async loginAfter (token) {
				uni.hideLoading()
				this.setToken({
					token: token
				})
				// 獲取用戶信息
				const res = await getUserMsg()
				this.setUserInfo({
					userInfo: {
						name: '大大怪叔叔',
						avatar: 'https://h.4399.com/images/2022/default_hd.png',
						liked: res.user.liked,
						commented: res.user.commented
					}
				})
				console.log('star loginHandle')
				uni.$emit('login')
				this.$emit('loginSuccess')
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login-form {
		width: 65%;
		margin: 0 auto;

		.btn-box {
			display: flex;
			justify-content: center;
			margin-top: 20rpx;

			button {
				width: 120rpx;
				font-size: 24rpx;
				margin: 0;
				border: 1px solid #35353540;
				color: #353535de;

				&:nth-of-type(1) {
					margin-right: 20rpx;
				}
			}
		}
	}
</style>
