<template>
	<view class="user-container flex-direction">
		<!-- nav S -->
		<view 
		@tap="loginTap"
		class="user-nav mbg-gradual-blue padding-lr padding-tb-xl align-center justify-between">
			<view class="align-center">
				<view class="user-avatar-box margin-right round">
					<image 
					class="user-avatar"
					:src="login ? userInfo.avatar : $i_u.user_default_avatar" 
					mode="widthFix"
					></image>
				</view>
				<view class="user-name-box flex-direction">
					<text class="text-bold text-xxl margin-xs">{{login ? userInfo.name : '登录/注册'}}</text>
					<view class="align-center">
						<text class="lg text-white cuIcon-mobilefill"></text>
						<text>{{login ? userInfo.phone.toString().replace(/(\d{3})\d{4}(\d{4})/, '$1****$2') : '登录后享受更多特权'}}</text>
					</view>
				</view>
			</view>
			<text class="lg text-white cuIcon-right"></text>
		</view>
		<!-- nav E -->
		
		<!-- 主体内容 S -->
		<view class="user-content flex-direction">
			
			<!-- 红包及金币盒子 S -->
			<view class="card-box card-box-1 margin-bottom-sm bg-white">
				
				<view 
				@tap="go('/pages/redPacket/redPacket')"
				class="padding-lg border-right border-color-e flex-sub flex-direction align-center justify-center">
					<view class="user-icon-box padding-xs round user-icon-bg-orange margin-bottom-xs">
						<text class="lg text-white cuIcon-redpacket"></text>
					</view>
					<text class="text-sm text-color-6 text-bold">红包</text>
				</view>
				
				<view 
				@tap="go('/pages/gold/goldExchange')"
				class="padding-lg flex-sub flex-direction align-center justify-center">
					<view class="user-icon-box bg-green padding-xs round margin-bottom-xs">
						<text class="iconfont icon-29"></text>
					</view>
					<text class="text-sm text-color-6 text-bold">金币</text>
				</view>
				
			</view>
			<!-- 红包及金币盒子 E -->
			
			<!-- 地址 S -->
			<view class="card-box card-box-2 margin-bottom-sm flex-direction">
				<view 
				@tap="go('/pages/address/manage_address')"
				class="card-content-item bg-white justify-between align-center flex-sub padding-sm border-bottom border-color-e">
					<view class="align-center">
						<text class="lg icon-blue text-xl cuIcon-locationfill margin-right-xs"></text>
						<text class="text-lg text-color-3">我的地址</text>
					</view>
					<text class="lg text-grey cuIcon-right"></text>
				</view>
			</view>
			<!-- 地址 E -->
			
			<!-- 金币商城与分享 S -->
			<view class="card-box card-box-2 margin-bottom-sm flex-direction">
				<view 
				@tap="go('/pages/gold/goldShop')"
				class="card-content-item bg-white justify-between align-center flex-sub padding-sm border-bottom border-color-e">
					<view class="align-center">
						<text class="icon-green text-xl lg cuIcon-goodsfill margin-right-xs"></text>
						<text class="text-lg text-color-3">金币商城</text>
					</view>
					<text class="lg text-grey cuIcon-right"></text>
				</view>
				<view 
				@tap="go('/pages/share/share')"
				class="card-content-item bg-white justify-between align-center flex-sub padding-sm border-bottom border-color-e">
					<view class="align-center">
						<text class="icon-orange text-xl lg cuIcon-presentfill margin-right-xs"></text>
						<text class="text-lg text-color-3">分享拿20元现金</text>
					</view>
					<text class="lg text-grey cuIcon-right"></text>
				</view>
			</view>
			<!-- 金币商城与分享 E -->
			
			<!-- 客服、下载、规则 S -->
			<view class="card-box card-box-2 margin-bottom-sm flex-direction">
				<view 
				@tap="go('/pages/service/service')"
				class="card-content-item bg-white justify-between align-center flex-sub padding-sm border-bottom border-color-e">
					<view class="align-center">
						<text class="icon-blue text-xl lg cuIcon-servicefill margin-right-xs"></text>
						<text class="text-lg text-color-3">我的客服</text>
					</view>
					<text class="lg text-grey cuIcon-right"></text>
				</view>
				<view 
				@tap="go('download')"
				class="card-content-item bg-white justify-between align-center flex-sub padding-sm border-bottom border-color-e">
					<view class="align-center">
						<text class="iconfont icon-blue text-xl margin-right-xs icon-platform-eleme"></text>
						<text class="text-lg text-color-3">下载饿了么APP</text>
					</view>
					<text class="lg text-grey cuIcon-right"></text>
				</view>
				<view 
				@tap="go('/pages/rulerCenter/rulerCenter')"
				class="card-content-item bg-white justify-between align-center flex-sub padding-sm border-bottom border-color-e">
					<view class="align-center">
						<text class="icon-blue text-xl lg cuIcon-formfill margin-right-xs"></text>
						<text class="text-lg text-color-3">规则中心</text>
					</view>
					<text class="lg text-grey cuIcon-right"></text>
				</view>
			</view>
			<!-- 客服、下载、规则 E -->
			
		</view>
		<!-- 主体内容 E -->
		
		<!-- 隐私政策 S -->
		<view 
		@tap="go('/pages/file/file')"
		class="justify-center padding-top">
			<text class="icon-blue">隐私政策</text>
		</view>
		<!-- 隐私政策 E -->
		
	</view>
</template>

<script>
	/**
	 * @module tabbar-我的
	 */
	import {mapState} from 'vuex';
	
	export default {
		data() {
			return {
				
			}
		},
		computed:{
			...mapState([
				'login',
				'userInfo'
			])
		}
		,
		created() {
			// console.log(this.userInfo);
		}
		,
		methods:{
			/**
			 * 用户点击了顶部的登录或者头像区域
			 */
			loginTap(){
				
				// 如果用户已登录 跳转至用户信息设置页
				// 用户未登录跳转至登录注册页
				let pagePath = this.login ? this.$pages_path.user_setting : this.$pages_path.login;
				uni.navigateTo({
					url:pagePath,
					fail(e) {
						console.log('跳转失败',e);
					}
				})
				
			}
			,
			/**
			 * 通过这个方法让各个按钮跳转至对应页面
			 * @param {String} pagePath 要跳转到的页面路径
			 */
			go(pagePath){
				// 通过这个方法让各个按钮跳转至对应页面
				this.$utils.log('go','通过这个方法让各个按钮跳转至对应页面');
				
				if(pagePath == 'download'){
					console.log('用户点击下载应用，直接开始下载应用');
					return;
				}
				
				uni.navigateTo({
					url:pagePath,
					fail(e) {
						console.log('跳转失败',e);
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.user-avatar-box{
		width: 120rpx;
		height: 120rpx;
		overflow: hidden;
	}
	.user-icon-bg-orange{
		background-color: #FF5F3E;
	}
	
	.icon-green{
		color: #94D94A;
	}
	.icon-orange{
		color: #FC7B53;
	}
	.icon-blue{
		color: #3cabff;
	}
</style>
