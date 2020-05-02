<template>
	<view class="content vs-column">
		<!-- 当前位置信息 S -->
		<navigator url="/pages/address/address" class="add-box font-34 font-w700">
			<svg class="icon-svg" aria-hidden="true"><use xlink:href="#icon-Locationpinmarker"></use></svg>
			<text class="add-content">{{city?city:'未能获取地址'}}</text>
			<svg class="icon-svg" aria-hidden="true"><use xlink:href="#icon-sanjiao"></use></svg>
		</navigator>
		<!-- 当前位置信息 E -->
		
		<!-- 搜索框 S -->
		<navigator url="/pages/search/search" class="search flex vs-space-center vs-align-center font-30 color-black9">
			<svg class="icon-svg" aria-hidden="true"><use xlink:href="#icon-fangdajing"></use></svg>
			<text class="search-text color-black9">搜索饿了么商家、商品名称</text>
		</navigator>
		<!-- 搜索框 E -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				key: 'value'
			}
		},
		props:['city']
	}
</script>

<style lang="scss" scoped>
	.content{
		background-image: linear-gradient(90deg, #0af, #0085ff);
		padding: 15rpx 30rpx 0;
		position: sticky;
		top: -56rpx;
		z-index: 999;
	}
	.add-box{
		color: #fff;
		margin-bottom: 10rpx;
		height: 30rpx;
	}
	.add-content{
		margin: 0 10rpx;
	}
	.search{
		background-color: #fff;
		padding: 20rpx 0;
		margin: 20rpx 0;
		
		&-text{
			margin-left: 20rpx;
		}
	}
	
</style>
