<template>
	<view class="content">
		<view id="default_index" v-if="city">
			<image class="logo" src="/static/logo.png"></image>
			<view class="text-area">
				<text class="title">{{ title }}</text>
			</view>
		</view>
		<city v-else></city>
	</view>
</template>

<script>
import city from '../city/city.vue';
export default {
	data() {
		return {
			title: 'Hello',
			city: false
		};
	},
	onLoad() {},
	methods: {},
	components: { city },
	created() {
		// 判断当前是否已经获取到了城市
		// if (!this.$store.getters.getCity) {
		// 	uni.navigateTo({
		// 		url: '../city/city'
		// 	});
		// }
	}
};
</script>

<style lang="scss" scoped>
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.logo {
	height: 200rpx;
	width: 200rpx;
	margin-top: 200rpx;
	margin-left: auto;
	margin-right: auto;
	margin-bottom: 50rpx;
}

.text-area {
	display: flex;
	justify-content: center;
}

.title {
	font-size: 36rpx;
	color: #8f8f94;
}

city {
	width: 100%;
}
</style>
