<template>
	<view class="content">
		<view class="ciyt-body">
			<image src="/static/image/city_cover.gif" mode="aspectFill"></image>
			<h3>输入地址后才能订餐哦！</h3>
		<navigator url="/pages/address/address" class="add-box font-34 font-w700">
			<button type="primary">手动选择地址</button>
		</navigator>
		</view>
	</view>
</template>

<script>
import { uniSearchBar } from '@dcloudio/uni-ui';
export default {
	data() {
		return {
			city: this.$store.getters.getCity,
			candidates: []
		};
	},
	onLoad() {},
	methods: {},
	components: { uniSearchBar }
};
</script>

<style lang="scss" scoped>
	page{
		background-color: #fff;
	}
/* 首页定位及位置搜索 */
.city-head {
	background-image: linear-gradient(90deg, #0af, #0085ff);
	width: 100%;
	padding: 15px 15px 10px;
}
.city-position {
	color: #fff;
	font-size: 17px;
	font-weight: 700;
	margin-bottom: 15px;
}

.city-text {
	margin: 0 2px;
}
	
.city-head_search {
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

.ciyt-body{
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	
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
