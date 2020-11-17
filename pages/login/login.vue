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
			:class="[inputState.inputFocusIndex == 0?'input-focus':'']"
			>
				<input 
				placeholder="手机号" 
				name="input"
				@focus="inputFocus(0)"
				@blur="inputBlur"
				type="number"
				@input="inputPhone"
				@confirm="inputState.showBtn?loggin():getCode()"
				>
				<button 
				@tap="getCode"
				:disabled="inputState.showBtn" class='cu-btn bg-green shadow'>{{inputState.phoneState.getCodeBtnText}}</button>
			</view>
			<view 
			class="cu-form-group border border-color-c input-border margin-bottom"
			:class="[inputState.inputFocusIndex == 1?'input-focus':'']"
			>
				<input 
				placeholder="验证码" 
				name="input"
				type="number"
				@focus="inputFocus(1)"
				@blur="inputBlur"
				@input="inputCode"
				@confirm="loggin"
				:focus="inputState.codeState.codeFocus"
				>
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
			<button 
			@tap="loggin"
			class="cu-btn bg-green lg">登录</button>
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
	/**
	 * @module login
	 * @description 登录模块
	 */

	import {mapState,mapMutations} from 'vuex';

	export default {
		name:'login',
		data() {
			return {
				inputState:{
					inputFocusIndex:-1, // 当前是哪个输入框获得焦点
					showBtn:true, // 是否显示获取验证码按钮 true不显示 false显示
					phoneState:{
						getCodeBtnText:'获取验证码', // 获取验证码按钮上的文本
						phone:null, // 手机号
						phoneRegExp:/^1[345789]\d{9}$/, // 检查手机号是否正确的正则
					},
					codeState:{
						code:null, // 验证码
						codeRegExp:/^\d{6}$/, // 检查验证码是否合法的正则
						codeFocus:false, // 验证码输入框是否自动获取焦点
					}
				}
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
				'SAVE_LOGIN_STATE',
				'SAVE_USERINFO'
			])
			,
			inputFocus(index){
				this.inputState.inputFocusIndex = index;
			},
			inputBlur(){
				this.inputState.inputFocusIndex = -1;
				this.inputState.codeState.codeFocus = false;
			},
			linkTo(){
				
				// todo:根据点击的不同区域传递不同参数
				
				uni.navigateTo({
				    url: this.$pages_path.file
				});
			},
			/**
			 * 检查用户输入是否是正确的手机号
			 * @param {Object} e 事件参数对象
			 */
			inputPhone(e){
				this.inputState.phoneState.phone = e.detail.value;
				
				if(this.inputState.phoneState.phoneRegExp.test(this.inputState.phoneState.phone)){
					this.inputState.showBtn = false;
				}else{
					this.inputState.showBtn = true;
				}
			},
			/**
			 * 检查用户输入的验证码
			 * @param {Object} e 事件参数对象
			 */
			inputCode(e){
				this.inputState.codeState.code = e.detail.value;
			}
			,
			/**
			 * 通过输入的手机号获取验证码
			 */
			getCode(){
				if(!this.inputState.showBtn){
					console.log('获取验证码');
					// 将获取验证码按钮变为不可使用状态
					this.inputState.showBtn = true;
					// focus下移至验证码输入框
					this.inputState.codeState.codeFocus = true;
					
					// todo：发起获取验证码请求
					
					
					let time = 30;
					const timers = setInterval(()=>{
						this.inputState.phoneState.getCodeBtnText = `已发送(${time--}s)`;
						if(time <= 0){
							this.inputState.showBtn = false;
							this.inputState.phoneState.getCodeBtnText = '重新获取';
							clearInterval(timers);
						}
					},1000);
				}
			},
			loggin(){
				// 检查是否输入完成了对应的内容没有的话提示用户
				if(!this.inputState.phoneState.phone){
					uni.showToast({
						title:'请填写手机号',
						icon:"none"
					});
					return;
				}
				
				// 检查手机号是否合法
				if(!this.inputState.phoneState.phoneRegExp.test(this.inputState.phoneState.phone)){
					uni.showToast({
						title:'请填写合法手机号',
						icon:"none"
					});
					return;
				}
				
				// 检查验证码是否填写
				if(!this.inputState.codeState.code){
					uni.showToast({
						title:'请填写验证码',
						icon:"none"
					});
					return;
				}
				
				// 检查验证码是否合法
				if(!this.inputState.codeState.codeRegExp.test(this.inputState.codeState.code)){
					uni.showToast({
						title:'验证码不正确',
						icon:"none"
					});
					return;
				}
				
				// 发起登录请求
				console.log('发起登录请求');

				// 将用户输入的电话作为用户电话使用
				let newInfo = JSON.parse(JSON.stringify(this.userInfo));
				newInfo.phone = this.inputState.phoneState.phone;
				this.SAVE_USERINFO(newInfo);
				
				// 修改登录状态为已登录
				this.SAVE_LOGIN_STATE(true);

				// 如果当前页面栈中没有返回的区域就返回主页
				if(getCurrentPages().length < 2){
					uni.switchTab({
						 url: this.$pages_path.index
					});
					return;
				}

				uni.navigateBack({
					 delta: 1
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
