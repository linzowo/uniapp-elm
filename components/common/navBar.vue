<template>
	<view class="nav-bar-container vs-column">
		<!-- 当前位置信息 S -->
		<navigator
		v-if="!hideAddress"
		 url="/pages/address/address" 
		 class="add-box font-34 font-w700">
			<svg class="icon-svg" aria-hidden="true"><use xlink:href="#icon-Locationpinmarker"></use></svg>
			<text class="add-content">{{address?address:'未能获取地址'}}</text>
			<svg class="icon-svg" aria-hidden="true"><use xlink:href="#icon-sanjiao"></use></svg>
		</navigator>
		<!-- 当前位置信息 E -->
		
		<!-- 搜索框 S -->
		<view
		@tap="searchTap"
		class="search flex vs-space-center vs-align-center font-30 color-black9">
			<svg class="icon-svg" aria-hidden="true"><use xlink:href="#icon-fangdajing"></use></svg>
			<text class="search-text color-black9">搜索饿了么商家、商品名称</text>
		</view>
		<!-- 搜索框 E -->
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		name:'navbar',
		data() {
			return {
				key: 'value'
			}
		},
		props:['address','hideAddress'],
		computed:{
			...mapState(['login'])
		},
		methods:{
			searchTap(){
				if(this.login){
					uni.navigateTo({
						 url:'/pages/search/search' 
					})
					return;
				}
				
				uni.navigateTo({
					url:'/pages/login/login'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	// 整个导航栏的高度为195rpx
	.nav-bar-container{
		background-image: linear-gradient(90deg, #0af, #0085ff);
		padding: 30rpx 30rpx 0;
		position: fixed;
		z-index: 99;
		width: 750rpx;
		height: 195rpx;
	}
	.add-box{
		color: #fff;
		margin-bottom: 15rpx;
		height: 30rpx;
	}
	.add-content{
		margin: 0 10rpx;
	}
	.search{
		background-color: #fff;
		padding: 20rpx 0;
		margin: 20rpx 0;
		height: 80rpx;
		
		&-text{
			margin-left: 20rpx;
		}
	}
	
</style>
