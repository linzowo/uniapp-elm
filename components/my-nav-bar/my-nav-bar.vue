<template>
	<view class="nav-bar-container flex-direction">
		<!-- 当前位置信息 S -->
		<navigator
		v-if="!hideAddress"
		 url="/pages/address/address" 
		 class="add-box font-w700">
			<text class="iconfont icon-Locationpinmarker"></text>
			<text class="add-content">{{address}}</text>
			<text class="iconfont icon-sanjiao"></text>
		</navigator>
		<!-- 当前位置信息 E -->
		
		<!-- 搜索框 S -->
		<view
		@tap="searchTap"
		class="search flex vs-space-center vs-align-center color-black9">
			<text class="iconfont icon-fangdajing"></text>
			<text class="search-text color-black9">搜索饿了么商家、商品名称</text>
		</view>
		<!-- 搜索框 E -->
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		name:'my-nav-bar',
		data() {
			return {}
		},
		props:{
			// 显示的地址信息
			address: {
				type: String,
				default: '未能获取地址'
			},
			// 是否隐藏顶部地址显示区
			hideAddress: {
				type: Boolean,
				default: false
			}
		},
		computed:{
			...mapState(['login'])
		},
		methods:{
			searchTap(){
				if(this.login){
					uni.navigateTo({
						 url:this.$pages_path.search
					})
					return;
				}
				
				uni.navigateTo({
					url:this.$pages_path.login
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	// 整个导航栏的高度为195rpx
	.nav-bar-container{
		background-image: linear-gradient(90deg, #0af, #0085ff);
		padding: 15px 30rpx 0;
		position: fixed;
		z-index: 99;
		width: 750rpx;
		height: 97px;
	}
	.add-box{
		color: #fff;
		height: 22px;
		font-size: 17px;
	}
	.add-content{
		margin: 0 10rpx;
	}
	.search{
		background-color: #fff;
		padding: 10px 0;
		margin: 10px 0;
		height: 40px;
		font-weight: 15px;
		
		&-text{
			margin-left: 20rpx;
		}
	}
	
</style>
