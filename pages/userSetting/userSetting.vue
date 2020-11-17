<template>
	<view class="flex-direction">
		<!-- 头像 -->
		<view 
		@tap="setAvatar"
		class="justify-between text-xl bg-white padding-sm align-center border-bottom border-color-e">
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
		<view 
		@tap="gotoInput('username')"
		class="justify-between text-xl bg-white padding-sm">
			<text class="text-color-0">用户名</text>

			<view class="align-center">
				<text>{{userInfo.name}}</text>
				<text class="lg text-gray cuIcon-right"></text>
			</view>
			
		</view>
		<!-- 手机号 -->
		<view 
		@tap="gotoInput('phone')"
		class="flex-direction padding-top-sm">
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
		<view 
		@tap="gotoInput('password')"
		class="flex-direction padding-top-sm">
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
		<view 
		@tap="logout"
		class="bg-white padding-tb margin-top-xl justify-center">
			<text class="text-red text-xl text-bold">退出登录</text>
		</view>

		<!-- 弹窗组件 S -->
		<view class="">
			<codingPopup ref="codingPopup"></codingPopup>
		</view>
		<!-- 弹窗组件 E -->


	</view>
</template>

<script>
	/**
	 * @module userSetting
	 * @description 修改用户相关信息
	 */

	import {mapState,mapMutations} from 'vuex';

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
		methods:{
			...mapMutations([
				'SAVE_LOGIN_STATE'
			])
			,
			/**
			 * 修改头像
			 */
			setAvatar(){
				console.log('修改头像');
				this.$refs.codingPopup.open();
			}
			,
			gotoInput(mode){
				uni.navigateTo({
					 url: this.$pages_path.input_user_setting + '?mode=' + mode,
					 fail(e) {console.log(e);}
				});
			}
			,
			/**
			 * 退出登录
			 */
			logout(){
				console.log('退出登录');
				this.SAVE_LOGIN_STATE(false);

				uni.switchTab({
					 url: this.$pages_path.user,
					 fail(e) {console.log(e);}
				});
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
</style>
