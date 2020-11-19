<template>
	<view class="discover-container flex-direction">
		<!-- 顶部跳转区域 -->
		<view 
		v-if="navData.length"
		class="nav-box bg-white margin-bottom">
			<view 
			@tap="openCodingPopup"
			class="gold-shop-box padding-left padding-right align-end border-right border-color-e">
				<view class="flex-direction gold-text-box padding-top-lg">
					<text class="text-lg text-orange margin-bottom-xs">{{navData[0].title}}</text>
					<text class="text-xs text-color-9">{{navData[0].subtitle}}</text>
				</view>
				<view class="gold-img-box">
					<image 
					class="gold-img"
					:src="navData[0].main_pic_hash|imgUrlFilter" 
					mode="widthFix" />
				</view>
			</view>
			<view class="flex-direction flex-sub">
				<view 
				@tap="openCodingPopup"
				class="border-bottom border-color-e padding align-center justify-between">
					<view class="flex-direction">
						<text class="text-lg margin-bottom-xs text-blue">{{navData[1].title}}</text>
						<text class="text-xs text-color-9">{{navData[1].subtitle}}</text>
					</view>
					<image 
					class="nav-img"
					:src="navData[1].main_pic_hash|imgUrlFilter" 
					mode="widthFix" />
				</view>
				<view 
				@tap="openCodingPopup"
				class="padding align-center justify-between">
					<view class="flex-direction">
						<text class="text-lg margin-bottom-xs text-red">{{navData[2].title}}</text>
						<text class="text-xs text-color-9">{{navData[2].subtitle}}</text>
					</view>
					<image 
					class="nav-img"
					:src="navData[2].main_pic_hash|imgUrlFilter" 
					mode="widthFix" />
				</view>
			</view>
		</view>

		<view class="flex-direction bg-white padding">
			<!-- 兑换标题 -->
			<view class="flex-direction exchange-title-box justify-center align-center margin-bottom">
				<view class="align-center">
					<view class="left line margin-right-sm"></view>
					<text class="lg text-red text-xl cuIcon-remind margin-right-xs"></text>
					<text class="text-xl text-bold text-color-3">限时好礼</text>
					<view class="right line margin-left-sm"></view>
				</view>
				<text class="text-xs text-color-9">金币换豪礼</text>
			</view>

			<!-- 红包列表 -->
			<view class="redpack-list padding-top-xs justify-around">
				
				<view 
				v-for="(item, index) in exchangeData" :key="index"
				@tap="openCodingPopup"
				class="redpack-item flex-direction">
					<view class="redpack-img-box margin-bottom-xs">
						<image 
						:src="item.image_hash|imgUrlFilter" 
						mode="widthFix" />
						<text class="redpack-img-tips text-xs padding-lr-xs">{{item.corner_marker}}</text>
					</view>
					<text class="text-color-3 margin-bottom-xs">{{item.title}}</text>
					<view class="align-center">
						<text class="text-color-price margin-right-xs">{{item.points_required}}金币</text>
						<text class="text-price delete-line text-xs text-color-9">{{item.original_price}}</text>
					</view>
				</view>

			</view>

			<!-- 查看更多 -->
			<view 
			@tap="openCodingPopup"
			class="align-center margin-top-xl justify-center text-color-9">
				<text>查看更多</text>
				<text class="lg cuIcon-right"></text>
			</view>

		</view>

		<!-- 功能开发中提示 -->
		<codingPopup ref="codingPopup"></codingPopup>
		<!-- 功能开发中提示 -->
	</view>
</template>

<script>
	/**
	 * @module 发现页
	 */
	export default {
		name:'discover',
		data() {
			return {
				navData:[], // 顶部导航区域的数据
				exchangeData:[], // 兑换红包数据
			}
		}
		,
		created() {
			try{
				
				let tmp = uni.getStorageSync('discover_enter_data');
				if(tmp) this.navData = JSON.parse(tmp);
			}catch(e){
				console.log(e);
			}

			if(!this.navData || !this.navData.length){
				this.$http.get.discover_enter_data().then((res)=>{
					this.navData = res[0];

					uni.setStorage({
						key: 'discover_enter_data',
						data: JSON.stringify(res[0]),
						success: function () {
							console.log('success');
						}
					});
				},e=>{
					console.log(e);
				})
			}

			
			try{
				let tmp = uni.getStorageSync('discover_duiba_gifs');
				if(tmp) this.exchangeData = JSON.parse(tmp);

			}catch(e){
				console.log(e);
			}

			if(!this.exchangeData || !this.exchangeData.length){
				this.$http.get.discover_duiba_gifs().then((res)=>{
					this.exchangeData = res;

					uni.setStorage({
						key: 'discover_duiba_gifs',
						data: JSON.stringify(res),
						success: function () {
							console.log('success');
						}
					});
				},e=>{
					console.log(e);
				})
			}
		}
		,
		methods: {
			/**
			 * 打开功能开发中的弹窗
			 */
			openCodingPopup(){
				this.$refs.codingPopup.open();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.nav-box,.gold-text-box,.gold-shop-box{
		height: 320rpx;
	}
	.gold-img-box{
		width: 150rpx;
	}
	.nav-img{
		width: 90rpx;
	}
	.line{
		width: 30rpx;
		height: 1px;
		background-color: #333;
		position: relative;
	}
	.line.left::after,.line.right::before{
		content: "";
		width: 10rpx;
		height: 10rpx;
		border-radius: 10rpx;
		background-color: #333;
		position: absolute;
		top: -5rpx;
	}
	.line.left::after{
		right: -5rpx;
	}
	.line.right::before{
		left: -5rpx;
	}

	.redpack-img-box{
		width: 220rpx;
		position: relative;
	}
	.redpack-img-tips{
		position: absolute;
		top: 0;
		left: 0;
		background-color: #333;
		color: #fff;
	}
</style>
