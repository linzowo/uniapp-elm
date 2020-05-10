<template>
	<view class="content flex-sub flex-direction padding-xl">
		<!-- 顶部logo S -->
		<view class="logo flex-sub justify-center margin-top margin-bottom-lg">
			<image 
			class="logo-img"
			src="https://gw.alicdn.com/tfs/TB13RU4trj1gK0jSZFOXXc7GpXa-1000-405.png" mode="widthFix"></image>
		</view>
		<!-- 顶部logo E -->
		
		<!-- 表单输入 S -->
		<view class="input-box flex-direction">
			<view 
			class="cu-form-group border border-color-c input-border margin-bottom"
			:class="[inputFocusIndex == 0?'input-focus':'']"
			>
				<input 
				placeholder="手机号" 
				name="input"
				@focus="inputFocus(0)"
				@blur="inputBlur"
				></input>
				<button class='cu-btn bg-green shadow'>获取验证码</button>
			</view>
			<view 
			class="cu-form-group border border-color-c input-border margin-bottom"
			:class="[inputFocusIndex == 1?'input-focus':'']"
			>
				<input 
				placeholder="验证码" 
				name="input"
				@focus="inputFocus(1)"
				@blur="inputBlur"
				></input>
			</view>
			
		</view>
		<!-- 表单输入 E -->
		
		<!-- 提示信息 S -->
		<text class="logging-msg margin-bottom">
			<text>新用户登录即自动注册，并表示已同意</text>
			<text 
			class="link-blue"
			@tap="linkTo"
			>《用户服务协议》</text>
			<text>和</text>
			<text class="link-blue"
			@tap="linkTo"
			>《隐私权政策》</text>
		</text>
		<!-- 提示信息 E -->

		<!-- 底部按钮 S -->
		<view class="btn-box flex-direction flex-sub margin-tb-lg">
			<button class="cu-btn bg-green lg">登录</button>
		</view>
		<!-- 底部按钮 E -->
		<view class="about flex-sub justify-center">
			<navigator 
			url="/pages/file/file"
			class="text-gray"
			>关于我们</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				key: 1,
				inputFocusIndex:-1
			}
		},
		methods:{
			inputFocus(index){
				this.inputFocusIndex = index;
			},
			inputBlur(){
				this.inputFocusIndex = -1;
			},
			linkTo(){
				uni.navigateTo({
				    url: '/pages/file/file'
				});
			}
		}
	}
</script>

<style>
	.logo-img{
		width: 280rpx;
	}
	.input-border{
		border-radius: 5px;
	}
	.input-focus{
		border-color: #0089dc;
	}
	.logging-msg{
		
	}
	.link{
		/* color: #2395ff; */
	}
</style>
