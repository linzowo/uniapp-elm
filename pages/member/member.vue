<template>
	<view class="member-container flex-direction">
		<!-- 顶部banner S -->
		<view class="member-banner">
			<image 
			class="member-banner-bgimg"
			src="https://cube.elemecdn.com/2/ba/a823f6fee0ea47583ed5254103ac9png.png?x-oss-process=image/quality,q_90/format,webp" 
			mode="widthFix"></image>
			<view class="member-banner-content flex-direction align-center justify-center padding-sm">
				<text class="text-lg">开通超级会员</text>
				<view class="banner-title text-bold align-center">
					<text>每月领</text>
					<text class="text-color-price">￥20</text>
					<text>专属红包</text>
				</view>
				<text class="text-color-banner margin-bottom">再享4大会员专属特权</text>
				<button class="head-open-vip-btn round cu-btn lg" type="default">超低价格开通会员</button>
			</view>
		</view>
		<!-- 顶部banner E -->
		
		<!-- 特权列表 S -->
		<view class="card-list">
			
			<!-- 内容盒子 S -->
			<view class="card-box">
				
			</view>
			<!-- 内容盒子 E -->	
		
		</view>
		<!-- 特权列表 E -->
		
		<!-- 底部固定按钮 S -->
		<view class="fixed-btn-box">
			<text>超低价格开通会员</text>
		</view>
		<!-- 底部固定按钮 E -->
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
	}
</script>

<style lang="scss" scoped>
	.member-banner{
		position: relative;
	}
	.member-banner-bgimg{
		position: absolute;
		width: 750rpx;
		z-index: 0;
	}
	.member-banner-content{
		position: relative;
		width: 750rpx;
		z-index: 9;
		color: #f2d499;
	}
	.head-open-vip-btn{
		background-color: #f2d499;
		background-image: linear-gradient(135deg,#f7e8c9,#f2d499);
		width: 500rpx;
		color: rgba(64,33,10,.8);
		font-size: 32rpx;
	}
	.banner-title{
		font-size: 60rpx;
	}
	.text-color-banner{
		color: #8a7a5c;
	}
</style>
