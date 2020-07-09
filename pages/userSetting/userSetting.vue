<template>
	<view class="flex-direction">
		<!-- 头像 -->
		<view class="justify-between text-xl bg-white padding-sm align-center border-bottom border-color-e">
			<text class="text-color-0">头像</text>
			<view class="align-center">
				<view class="user-avatar-box margin-right-xs round">
					<image
					class="user-avatar"
					:src="userInfo.avatar" 
					mode="widthFix" />
				</view>
				<text class="lg text-gray cuIcon-right"></text>
			</view>
		</view>
		<!-- 用户名 -->
		<view class="justify-between text-xl bg-white padding-sm">
			<text class="text-color-0">用户名</text>

			<view class="">
				<text>{{userInfo.name}}</text>
				<text class="lg text-gray cuIcon-right"></text>
			</view>
			
		</view>
		<!-- 手机号 -->
		<view class="flex-direction padding-top-sm">
			<text class="text-xs padding-sm text-color-9">账号绑定</text>
			<view class="justify-between bg-white padding-sm text-xl">
				<view class="align-center">
					<text class="lg text-blue cuIcon-mobilefill margin-right-xs"></text>
					<text class="text-color-0">手机</text>
				</view>
				<view class="">
					<text>{{userInfo.phone}}</text>
					<text class="lg text-gray cuIcon-right"></text>
				</view>
			</view>
		</view>
		<!-- 密码设置 -->
		<view class="flex-direction padding-top-sm">
			<text class="text-xs padding-sm text-color-9">安全设置</text>
			<view class="justify-between bg-white padding-sm text-xl">
				<text>登录密码</text>
				<view class="align-center">
					<text class="text-blue">未设置</text>
					<text class="lg text-gray cuIcon-right"></text>
				</view>
			</view>
		</view>

		<!-- 退出登录 -->
		<view class="bg-white padding-tb margin-top-xl justify-center">
			<text class="text-red text-xl text-bold">退出登录</text>
		</view>

	</view>
</template>

<script>
	/**
	 * @module userSetting
	 * @description 修改用户相关信息
	 */

	import {mapState} from 'vuex';

	export default {
		data() {
			return {
				
			}
		},
		computed:{
			...mapState([
				'userInfo'
			])
		}
		,
	}
</script>

<style lang="scss" scoped>

	.user-avatar-box{
		width: 120rpx;
		height: 120rpx;
		overflow: hidden;
	}
</style>
