<template>
	<!-- 未登录时内容区域显示模块 -->
	<view class="login-no-container">
		<view 
		class="logged-out flex-direction align-center justify-center text-grey">
			<image 
			class="logged-img"
			src="//fuss10.elemecdn.com/d/60/70008646170d1f654e926a2aaa3afpng.png" mode="aspectFit"></image>
			<h3 class="margin-bottom-sm">没有结果</h3>
			<text class="margin-bottom-sm text-xs">登录后查看更多商家</text>
			<navigator 
			url="/pages/login/login"
			class="logged-btn cu-btn lg">登录</navigator>
		</view>
	</view>
</template>

<script>
	/**
	 * @module 未登录时内容区域显示模块
	 */
	export default {
		name:'login-no',
		data() {
			return {}
		},
	}
</script>

<style lang="scss" scoped>
	.logged-img{
		width: 426rpx;
		height: 426rpx;
	}
	.logged-btn{
		width: 256rpx;
		border-radius: 6rpx;
		background-color: #56d176;
		color: #fff;
	}
</style>
