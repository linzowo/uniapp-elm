<template>
	<view class="container vs-flex-item vs-column">
		<!-- 导航栏 S -->
		<navBar class="nav-bar" :address="address"></navBar>
		<!-- 导航栏 S -->
		
		<!-- 主体内容部分 S -->
		<view class="content-body vs-flex-item">
			<!-- 获取到城市时显示 S -->
			<view v-if="address" class="vs-column vs-space-center vs-align-center">
				<!-- 导航区 S -->
				<view class="nav vs-flex-item vs-column">
					<view class="bg-white vs-flex-item vs-column">
						<view class="grid margin-bottom text-center" :class="'col-5'">
							<navigator 
							url="/pages/categoryList/categoryList"
							class="padding flex vs-column vs-align-center" 
							:style="{width:'150rpx'}"
							v-for="(item,index) in navList.length*5" 
							:key="index">
									<image 
									:src="navList[item%2==0?1:0].img" 
									mode="aspectFill"
									class="nav-img"
									></image>
									<text class="nav-title">{{navList[item%2==0?1:0].title}}</text>
							</navigator>
						</view>
					</view>
				</view>
				<!-- 导航区 E -->
				
				<!-- 广告区 S -->
				<view class="banner vs-flex-item">
					banner
				</view>
				<!-- 广告区 E -->
				
				<!-- 会员区 S -->
				<view class="member vs-flex-item">
					member
				</view>
				<!-- 会员区 E -->
				
				<!-- 店铺列表区 S -->
				<view class="content-list vs-flex-item">
					content-list
				</view>
				<!-- 店铺列表区 E -->
				
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
			address: this.$store.getters.getAddress, // 顶部地址栏地址
			navList: [
				{
					img: "https://cube.elemecdn.com/7/d8/a867c870b22bc74c87c348b75528djpeg.jpeg?x-oss-process=image/format,webp/resize,w_90,h_90,m_fixed",
					title: "美食"
				},
				{
					img: "https://cube.elemecdn.com/a/7b/b02bd836411c016935d258b300cfejpeg.jpeg?x-oss-process=image/format,webp/resize,w_90,h_90,m_fixed",
					title: "大牌惠吃"
				}
			]
		};
	},
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
	// background-color: pink;
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
.nav-img{
	width: 90rpx;
	height: 90rpx;
}
</style>
