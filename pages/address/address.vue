<template>
	<view class="address-container flex-direction">
		<view class="cu-bar search flex-sub bg-white padding-tb-sm">
			<navigator 
			url="../city/city"
			class="action">
				<text class="text-xs margin-right">广州</text>
				<text class="cuIcon-triangledownfill"></text>
			</navigator>
			<view 
			class="search-form radius padding-tb-lg"
			:style="{marginLeft:0}"
			>
					<text class="cuIcon-search"></text>
					<input 
					@focus="InputFocus" 
					@blur="InputBlur" 
					@input="InputEnter"
					:value="inputText"
					type="text" 
					placeholder="请输入地址" 
					confirm-type="search"></input>
					<text 
					v-if="inputText"
					@tap="clearInput"
					class="cuIcon-close text-lg"></text>
				</view>
		</view>
		
		<view class="content flex-direction">
			
			<!-- 我的地址 S -->
			<view 
			v-if="!inputText"
			class="my-address flex-direction flex-sub">
				<!-- 当前地址 S -->
				<view class="current-address flex-sub flex-direction margin-tb-xs">
					<text class="margin-tb-sm margin-lr text-color-6">当前地址</text>
					<view class="current-address-content padding-tb-sm padding-lr justify-between flex-sub bg-white align-center">
						<text class="text-bold text-df text-black">成都</text>
						<text class="text-color-blue flex align-center">
							<text class="lg cuIcon-focus text-xl margin-right-xs"></text>
							重新定位
						</text>
					</view>
				</view>
				<!-- 当前地址 E -->
				
				<!-- 收货地址列表 S -->
				<view class="address-list flex-sub flex-direction margin-tb-xs">
					<text class="margin-tb-sm margin-lr text-color-6">收货地址</text>
					<view 
					class="current-address-content padding-tb-sm padding-lr flex-sub bg-white flex-direction border-top border-color-e"
					v-for="i in 4"
					:key="i"
					>
						<text class="text-sm margin-bottom-xs">
							<text class="text-bold text-df text-black">林除夕</text>
							<text class="margin-lr-xs">先生</text>
							<text class="margin-left-xs">18566667777</text>
						</text>
						<text class="text-sm">天下无双小区</text>
					</view>
					
				</view>
				<!-- 收货地址列表 E -->
			</view>
			<!-- 我的地址 E -->
			
			<!-- 搜索結果列表 S -->
			<view 
			v-if="inputText"
			class="search-res">
				搜索结果
			</view>
			<!-- 搜索結果列表 E -->
			
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				key: 1,
				inputText:""
			}
		},
		onShow() {
			console.log(1);
		}
		,
		onNavigationBarButtonTap(e) {
			// console.log(e);
			if(e.index == 0){
				console.log('跳转至地址新增页');
				// uni.redirectTo({
				// 	url:''
				// })
			}
		}
		,
		methods:{
			InputFocus(e){
				
			},
			InputBlur(e){
				
			}
			,
			InputEnter(e){
				this.inputText = e.detail.value;
			},
			clearInput(){
				this.inputText = "";
			}
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
