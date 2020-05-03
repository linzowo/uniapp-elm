<template>
	<view class="container vs-flex-item vs-column">
		<!-- 导航栏 S -->
		<navBar class="nav-bar" :address="address"></navBar>
		<!-- 导航栏 S -->
		
		<!-- 主体内容部分 S -->
		<view class="content-body vs-flex-item">
			<!-- 获取到城市时显示 S -->
			<view v-if="address" class="vs-column vs-space-center">
				<!-- 导航区 S -->
				<view class="nav vs-flex-item vs-column">
					<view class="bg-white vs-flex-item vs-column">
						<view class="grid margin-bottom text-center" :class="'col-5'">
							<navigator 
							url="/pages/categoryList/categoryList"
							class="padding-xs flex vs-column vs-align-center" 
							:style="{width:'150rpx'}"
							v-for="(item,index) in navList.length*5" 
							:key="index">
									<image 
									:src="navList[item%2==0?1:0].img" 
									mode="aspectFill"
									class="nav-img"
									></image>
									<text 
									class="nav-title font-20 color-black6"
									>{{navList[item%2==0?1:0].title}}</text>
							</navigator>
						</view>
					</view>
				</view>
				<!-- 导航区 E -->
				
				<!-- 广告区 S -->
				<navigator 
				url="/pages/combo/combo"
				class="banner flex vs-flex-item vs-row vs-space-between">
					<view class="banner-text vs-column">
						<h3 class="banner-title margin-bottom-xs">品质套餐</h3>
						<text class="banner-info font-28 color-black7 margin-bottom-sm">搭配齐全吃得好</text>
						<text class="banner-link font-20 text-orange">立即抢购></text>
					</view>
					<image 
					class="banner-img"
					src="https://cube.elemecdn.com/e/ee/df43e7e53f6e1346c3fda0609f1d3png.png?x-oss-process=image/format,webp/resize,w_282,h_188,m_fixed" mode="aspectFit"></image>
				</navigator>
				<!-- 广告区 E -->
				
				<!-- 会员区 S -->
				<navigator 
				url="/pages/combo/combo"
				class="member padding-sm flex flex-sub justify-between margin-sm margin-top-xs align-center">
					<view class="left align-center">
						<svg class="icon-svg member-icon margin-right-xs" aria-hidden="true"><use xlink:href="#icon-huangguan"></use></svg>
						<h3 class="text">超级会员</h3>
						<svg class="icon-svg text-xs " aria-hidden="true"><use xlink:href="#icon-dian"></use></svg>
						<text class="text-xs">每月享超值权益</text>
					</view>
					<text class="right text-xs">
						立即开通 >
					</text>
				</navigator>
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
	// height: 1800px;
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
.nav{}
.nav-img{
	width: 90rpx;
	height: 90rpx;
}
.banner{
	background-color: #fafafa;
	margin: 0 20rpx;
	padding: 24rpx 0 0 30rpx;
	
	&-text{
		height: 220rpx;
	}
	
	&-title{
		// margin-bottom: 1.33333 * 7.5rpx;
	}
	
	&-info{
		// margin-bottom: 2.4 * 7.5rpx;
	}
	
	&-link{
		
	}
	
	&-img{
		width: 282rpx;
		height: 188rpx;
	}
}

.member{
	// margin: 0 20rpx;
	background-image: linear-gradient(90deg,#ffefc4,#f3dda0);
	color: #644f1b;
	
	&-icon{
		width: 34rpx;
		height: 34rpx;
		color: #D8B266;
	}
}
</style>
