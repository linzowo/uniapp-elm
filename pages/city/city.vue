<template>
	<view class="content">
		<view class="city_head">
			<view class="city_position">
				<svg class="icon_svg" aria-hidden="true"><use xlink:href="#icon-location"></use></svg>
				<text class="city_text">未能获取地址</text>
				<svg class="icon_svg" aria-hidden="true"><use xlink:href="#icon-sanjiao"></use></svg>
			</view>
			<uni-search-bar
				bgColor="#fff"
				placeholder="搜索饿了么商家、商品名称"
				radius="2"
				@confirm="search"
				@input="input"
				cancelButton="none"
				class="city_head_search"
			></uni-search-bar>
		</view>
		<view class="ciyt_body">
			<image src="../../static/city_cover.gif" mode="aspectFill"></image>
			<h3>输入地址后才能订餐哦！</h3>
			<button type="primary">手动选择地址</button>
		</view>
	</view>
</template>

<script>
import { uniSearchBar } from '@dcloudio/uni-ui';
export default {
	data() {
		return {
			city: '',
			candidates: []
		};
	},
	onLoad() {},
	methods: {},
	components: { uniSearchBar }
};
</script>

<style lang="scss" scoped>
/* 首页定位及位置搜索 */
.city_head {
	background-image: linear-gradient(90deg, #0af, #0085ff);
	padding: 15px 15px 10px;

	.city_position {
		color: #fff;
		font-size: 17px;
		font-weight: 700;
		margin-bottom: 15px;

		.city_text {
			margin: 0 2px;
		}
	}
}
.city_head_search {
	background-color: transparent;
	padding: 0;
	::v-deep .uni-searchbar__box{
		padding: 0;
		height: 40px;
	}
	::v-deep span {
		color: #999;
	}
}

.ciyt_body{
	display: flex;
	flex-direction: column;
	align-items: center;
	
	image{
		width: 400rpx;
		height: 400rpx;
		margin: 0 auto;
	}
	
	h3{
		margin: 25rpx 0 20rpx;
		color: #6a6a6a;
		font-size: 34rpx;
	}
	
	button{
		background-color: #56d176;
		width: 240rpx;
		height: 78rpx;
		line-height: 78rpx;
		min-height: 78rpx;
		min-width: 240rpx;
		font-size: 29rpx;
		border-radius: 5rpx;
		// padding: 10rpx;
	}
}
</style>
