<template>
    <view class="flex-direction padding-top">

        <!-- 用户名 -->
        <form 
        @submit="setUsername"
        v-if="mode=='username'"
        class="flex-direction">
            <view class="bg-white padding">
                <input name="username" v-model="usernameInput" class="flex-sub" placeholder="用户名" />
            </view>
            <view class="padding-lr flex-direction">
                <view class="padding-tb-sm">
                    <text class="text-xs text-color-9">用户名只能修改一次（5-24个字）</text>
                </view>
                <view class="flex-sub">
                    <button 
                    form-type="submit" 
                    class="cu-btn lg flex-sub"
                    :class="[_.inRange(usernameInput.length,5,25) ? 'bg-green':'bg-grey']"
                    >确认修改</button>
                </view>
            </view>
        </form>

        <!-- 电话 -->
        <form 
        @submit="setUsername"
        v-if="mode=='phone'"
        class="flex-direction">
            <view class="bg-white flex-direction padding-lr text-lg text-color-3">
                
                <!-- 获取验证码区 S -->
				<view class="justify-between align-center border-bottom border-color-e padding-tb">

                    <view class="align-center">
                        <text class="margin-right-xl">手机号</text>
                        <text>{{userInfo.phone}}</text>
                    </view>

                    <button 
                    @tap="getCode"
                    :disabled="inputState.showBtn"
                    class='cu-btn bg-green shadow'>
                        {{inputState.phoneState.getCodeBtnText}}
                    </button>

                </view>
                <!-- 获取验证码区 E -->

                <!-- 验证码输入区 S -->
                <view class="padding-tb">
                    <text class="margin-right-xl">验证码</text>
                    <input 
                    v-model="phoneCode"
                    type="number" 
                    placeholder="请输入验证码" 
                    name="code" />
                </view>
                <!-- 验证码输入区 E -->

            </view>

            <view class="margin-top padding-lr">
                <button 
                @click="setPhone"
                :disabled="phoneCode.length !== 6"
                class='cu-btn bg-green flex-sub shadow'>
                    验证后绑定新手机号
                </button>
            </view>

            <view class="margin-top">
                <text>注意本页未提供相关短信接口，上述操作仅为模拟过程</text>
            </view>
        </form>

        <!-- 密码 -->
        <form 
        @submit="setPassword"
        v-if="mode=='password'"
        class="flex-direction">
            <view class="flex-direction bg-white padding-sm">
                <view class="padding-lr-xs padding-tb-sm bg-grey-f7">
                    <input 
                    v-model="passwordInput.old"
                    class="flex-sub" 
                    name="oldpassword" 
                    type="password" 
                    placeholder="旧密码" 
                    password />
                </view>
                <view class="padding-lr-xs padding-tb-sm bg-grey-f7 margin-tb-sm">
                    <input 
                    v-model="passwordInput.new"
                    class="flex-sub" 
                    name="newpassword" 
                    type="password" 
                    placeholder="新密码" 
                    password />
                </view>
                <view class="padding-lr-xs padding-tb-sm bg-grey-f7">
                    <input 
                    v-model="passwordInput.confirm"
                    class="flex-sub" 
                    name="confirmpassword" 
                    type="password" 
                    placeholder="确认密码" 
                    password />
                </view>
            </view>
            <view class="margin-top-xl padding-lr">
                <button 
                form-type="submit" 
                class="flex-sub bg-green"
                :disabled="showSavePasswordBtn" 
                hover-class="defaultTap"
                > 
                    确认并保存 
                </button>
            </view>
        </form>

        <!-- 弹窗区域 S -->
        <view class="">
            <codingPopup ref="codingPopup"></codingPopup>
            
        </view>
        <!-- 弹窗区域 E -->

    </view>
</template>

<script>
    /**
     * @module 用户信息修改页
     * @description 在此页修改用户的名称电话及密码等
     */

	import {mapState,mapMutations} from 'vuex';

    export default {
        data() {
            return {
                mode:null, // 当前处于那种模式 username phone password
                usernameInput:'', // 用户名输入框内容
                phoneCode:'', // 手机验证码输入框内容
                passwordInput:{
                    old:'',
                    new:'',
                    confirm:''
                }, // 密码验证修改输入框内容
				inputState:{
					showBtn:false, // 是否显示获取验证码按钮 true不显示 false显示
					phoneState:{
						getCodeBtnText:'获取验证码', // 获取验证码按钮上的文本
					}
				}
            }
        },
        onLoad(e){
            console.log(e);
            this.mode = e.mode;
        }
        ,
        computed:{
            showSavePasswordBtn(){
                return !(this.passwordInput.old !== '' && 
                        this.passwordInput.new !== '' && 
                        this.passwordInput.confirm !== '' &&
                        this.passwordInput.new == this.passwordInput.confirm)
            },
            ...mapState([
                'userInfo'
            ])
        }
        ,
        methods:{
            ...mapMutations([
                'SAVE_USERINFO'
            ])
            ,
            setPassword(e){
                if(!this.showSavePasswordBtn){
                    console.log('存储新密码',e);
                    this.$refs.codingPopup.open();
                }
            }
            ,
            setPhone(){
                if(this.phoneCode.length == 6){
                    this.$refs.codingPopup.open();
                }
            }
            ,
            /**
             * 存储用户姓名数据
             */
            setUsername(e){
                if(this._.inRange(this.usernameInput.length,5,25)){
                    // console.log(e.detail.value);
                    let newInfo = JSON.parse(JSON.stringify(this.userInfo));
                    newInfo.name = this.usernameInput;
                    console.log(newInfo);
                    this.SAVE_USERINFO(newInfo);

                    uni.navigateBack({
                         delta: 1
                    });
                }
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
        }
    }
</script>

<style lang="scss" scoped>
    
</style>