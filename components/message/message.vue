<template>
	<view class="echojoy-message">
		<text>服务器错误，请稍后重试</text>
	</view>
</template>

<script>
	export default {
		name: 'EchojoyMessage',
		created () {
			console.log('echojoy-message')
		},
		mounted () {
			setTimeout(() => {
				// 销毁实例
				this.$destroy(true)
				// 移除done
				this.$el.parentNode.removeChild(this.$el)
			}, 3000)
		}
	}
</script>

<style lang="scss" scoped>
.echojoy-message {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  color: #fff;
  z-index: 9999;
  background: transparent;
  > text {
    padding: 12px 22px;
    font-size: 18px;
    border-radius: 4px;
    background: rgba(17, 17, 17, 0.7);
   }
}
</style>