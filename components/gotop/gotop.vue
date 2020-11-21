<template>
	<!-- 回到顶部按钮 S -->
	
	<!--  #ifndef  MP-WEIXIN -->
	<view
	v-show="gotopShow"
	@tap.stop.prevent="gotop"
	 class="gotop round bg-white border border-lg border-color-e justify-center align-center">
	<!--  #endif -->

	<!--  #ifdef  MP-WEIXIN -->
	<view
	v-show="gotopShow"
	@tap.stop.prevent="gotop"
	 class="gotop round bg-white border border-lg border-color-e justify-center align-center">
	<!--  #endif -->
		<text class="lg text-gray cuIcon-top text-xxl"></text>
	</view>
	<!-- 回到顶部按钮 E -->
</template>

<script>
	export default {
		data() {
			return {
				gotopShow:false
			}
		},
		props:{
				scrollTop:{
					type: Number,
					default:0
				},
				targetTop:{
					type: Number,
					default:350
				},
				gotopFn:{
					type: Function,
					default: null
				}
			}
		,
		watch:{
			scrollTop(n){
				
				if(n > this.targetTop){
					this.gotopShow = true;
				}else{
					this.gotopShow = false;
				}
				
			}
		}
		,
		methods:{
			/**
			 * 回到页面顶部
			 */
			gotop(){
				uni.pageScrollTo({
					duration:0,
					scrollTop:0
				})
				
				if(this.gotopFn) {
					this.gotopFn();
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.gotop{
		position: fixed;
		bottom: 140rpx;
		right: 30rpx;
		height: 85rpx;
		width: 85rpx;
	}
	
</style>
