<template>
	<view 
	class="order-box flex-direction bg-grey-f5"
	:style="{height : $system_info.containerHeight + 'px'}"
	>
		<!-- 未登录 S -->
		<view class="login-no flex-sub flex-direction align-center">
			<image 
			class="logged-img"
			:src="$img_url.login_no" mode="widthFix"></image>
			<text 
			class="margin-bottom-sm text-xl login-text"
			>{{$common_text.login.order.login_tips}}</text>
			<navigator 
			url="/pages/login/login"
			class="logged-btn cu-btn lg">立即登录</navigator>
		</view>
		<!-- 未登录 E -->
		
		
		<!-- 已登录 S -->
		
		<!-- 已登录 S -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				key: 1
			}
		},
		onShow() {
			// console.log(this.$img_url);
			// console.log(this.$system_info);
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #F5F5F5;
	}
	.login-no{
		padding-top: 200rpx;
	}
	.logged-btn{
		width: 256rpx;
		border-radius: 6rpx;
		background-color: #56d176;
		color: #fff;
	}
	.logged-img{
		width: 400rpx;
		height: 400rpx;
	}
	.login-text{
		color: #6a6a6a;
	}
</style>
