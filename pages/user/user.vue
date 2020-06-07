<template>
	<view class="user-container flex-direction">
		<!-- nav S -->
		<view class="user-nav mbg-gradual-blue padding-lr padding-tb-xl align-center justify-between">
			<view class="align-center">
				<view class="user-avatar-box margin-right">
					<image 
					class="user-avatar round"
					:src="$i_u.user_default_avatar" 
					mode="widthFix"
					></image>
				</view>
				<view class="user-name-box flex-direction">
					<text class="text-bold text-xxl margin-xs">登录/注册</text>
					<view class="align-center">
						<text class="lg text-white cuIcon-mobilefill"></text>
						<text>登录后享受更多特权</text>
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
				<view class="padding-lg border-right border-color-e flex-sub flex-direction align-center justify-center">
					<view class="user-icon-box padding-xs round user-icon-bg-orange margin-bottom-xs">
						<text class="lg text-white cuIcon-redpacket"></text>
					</view>
					<text class="text-sm text-color-6 text-bold">红包</text>
				</view>
				<view class="padding-lg flex-sub flex-direction align-center justify-center">
					<view class="user-icon-box bg-green padding-xs round margin-bottom-xs">
						<svg class="icon-svg" aria-hidden="true"><use xlink:href="#icon-29"></use></svg>
					</view>
					<text class="text-sm text-color-6 text-bold">金币</text>
				</view>
			</view>
			<!-- 红包及金币盒子 E -->
			
			<!-- 地址 S -->
			<view class="card-box card-box-2 margin-bottom-sm flex-direction">
				<view class="card-content-item bg-white justify-between align-center flex-sub padding-sm border-bottom border-color-e">
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
				<view class="card-content-item bg-white justify-between align-center flex-sub padding-sm border-bottom border-color-e">
					<view class="align-center">
						<text class="icon-green text-xl lg cuIcon-goodsfill margin-right-xs"></text>
						<text class="text-lg text-color-3">金币商城</text>
					</view>
					<text class="lg text-grey cuIcon-right"></text>
				</view>
				<view class="card-content-item bg-white justify-between align-center flex-sub padding-sm border-bottom border-color-e">
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
				<view class="card-content-item bg-white justify-between align-center flex-sub padding-sm border-bottom border-color-e">
					<view class="align-center">
						<text class="icon-blue text-xl lg cuIcon-servicefill margin-right-xs"></text>
						<text class="text-lg text-color-3">我的客服</text>
					</view>
					<text class="lg text-grey cuIcon-right"></text>
				</view>
				<view class="card-content-item bg-white justify-between align-center flex-sub padding-sm border-bottom border-color-e">
					<view class="align-center">
						<svg class="icon-blue text-xl icon-svg margin-right-xs" aria-hidden="true"><use xlink:href="#icon-platform-eleme"></use></svg>
						<text class="text-lg text-color-3">下载饿了么APP</text>
					</view>
					<text class="lg text-grey cuIcon-right"></text>
				</view>
				<view class="card-content-item bg-white justify-between align-center flex-sub padding-sm border-bottom border-color-e">
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
		<view class="justify-center padding-top">
			<text class="icon-blue">隐私政策</text>
		</view>
		<!-- 隐私政策 E -->
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
	}
</script>

<style lang="scss" scoped>
	.user-avatar{
		width: 120rpx;
		height: 120rpx;
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
