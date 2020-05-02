<template>
	<view class="container vs-flex-item vs-column">
		<!-- 导航栏 S -->
		<navBar class="nav-bar"></navBar>
		<!-- 导航栏 S -->
		
		<!-- 主体内容部分 S -->
		<view class="content-body vs-flex-item">
			<!-- 获取到城市时显示 S -->
			<view v-if="city" class="vs-column vs-space-center vs-align-center">
				<image class="logo" src="/static/image/logo.png"></image>
				<view class="text-area">
					<text class="title">{{ title }}</text>
				</view>
			</view>
			<!-- 获取到城市时显示 E -->
			
			<!-- 未获取到城市时显示 S -->
			<city v-else class="city-page"></city>
			<!-- 未获取到城市时显示 E -->
		</view>
		<!-- 主体内容部分 E -->
		
	</view>
</template>

<script>
	
// 引入为获取到城市时的提示页面
import city from '@/pages/city/city.vue';
// 引入顶部导航栏模块
import navBar from '@/components/common/navBar.vue';
export default {
	data() {
		return {
			title: 'Hello',
			city: this.$store.getters.getCity
		};
	},
	onPageScroll(e) {
		// console.log(e);
	}
	,
	onLoad() {},
	methods: {},
	components: { city,navBar },
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
.container {
	// background-color: #FFFFFF;
	background-color: pink;
	height: 1800px;
}
.content-body{
	// display: flex;
}
// .nav-bar{
// 	display: sticky;
// 	top: 10px;
// }
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

.city-page {
	width: 100%;
}
</style>
