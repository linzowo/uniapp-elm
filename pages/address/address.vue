<template>
	<view class="address-container flex-direction">
		<view class="cu-bar search flex-sub bg-white padding-tb-sm">
			<navigator 
			url="../city/city"
			class="action">
				<text class="text-xs margin-right">
					{{userInfo?userInfo.currentCity:"未知"}}
				</text>
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
						<text class="text-bold text-df text-black text-cut"
						:style="{width:'500rpx'}"
						>
							{{
								userInfo ? 
								userInfo.shipAddress.position_name : 
								$c_t.address.no_ship_address
							}}
						</text>
						<text 
						@tap="getCurrentPosition"
						class="text-color-blue flex align-center">
							<text class="lg cuIcon-focus text-xl margin-right-xs"></text>
							<text>重新定位</text>
						</text>
					</view>
				</view>
				<!-- 当前地址 E -->
				
				<!-- 收货地址列表 S -->
				<view class="address-list flex-sub flex-direction margin-tb-xs">
					<text class="margin-tb-sm margin-lr text-color-6">收货地址</text>
					<view 
					class="current-address-content padding-tb-sm padding-lr flex-sub bg-white flex-direction border-color-e"
					:class="[i==0?'':'border-top']"
					v-for="(item,i) in myAddress"
					:key="i"
					@tap="changeAddress(i)"
					>
						<text class="text-sm margin-bottom-xs">
							<text class="text-bold text-df text-black">{{item.name}}</text>
							<text class="margin-lr-xs">{{item.gender?"先生":"女士"}}</text>
							<text class="margin-left-xs">{{item.phone}}</text>
						</text>
						<text class="text-sm">{{item.position_name}}</text>
					</view>
					
				</view>
				<!-- 收货地址列表 E -->
			</view>
			<!-- 我的地址 E -->
			
			<!-- 搜索結果列表 S -->
			<view 
			v-if="inputText"
			class="search-res flex-direction">
				<view 
				class="current-address-content padding-tb-xs padding-lr flex-sub justify-between bg-white border-color-e align-center"
				:class="[i==1?'':'border-top']"
				v-for="(item,i) in searchAddress()"
				:key="i"
				>
					<view class="text-sm margin-bottom-xs flex-direction">
						<text class="text-bold text-df text-black">{{item.position_name}}</text>
						<text class="">{{item.position_address}}</text>
					</view>
					<text class="text-sm margin-lr">{{item.distance}}m</text>
				</view>
				<view class="tips flex-direction align-center text-color-9 padding-lg">
					<text class="text-lg margin-bottom-sm">找不到地址？</text>
					<text class="text-sm">请尝试只输入小区、写字楼或学校名</text>
					<text class="text-sm">详细地址（如门牌号）可稍后输入</text>
				</view>
			</view>
			<!-- 搜索結果列表 E -->
			
		</view>
		
		
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex';
	export default {
		data() {
			return {
				inputText:"", // 存储输入框内容
				myAddress:[], // 用户的地址信息 在组件创建后获取
			}
		},
		onShow() {},
		created() {
			
			// 在结构创建完成后页面渲染前获取一些渲染必要的数据
			
			// 获取我的地址数据
			this.myAddress = this.$t_d.ADDRESS_DATA.my_address;
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
		computed:{
			...mapState([
				'userInfo'
			])
		}
		,
		methods:{
			/**
			 * 搜索栏获取焦点
			 * @param {Object} e
			 */
			InputFocus(e){
				
			},
			/**
			 * 搜索栏失去焦点
			 * @param {Object} e
			 */
			InputBlur(e){
				
			}
			,
			/**
			 * 搜索栏输入
			 * @param {Object} e
			 */
			InputEnter(e){
				this.inputText = e.detail.value;
			},
			/**
			 * 清空搜索栏
			 */
			clearInput(){
				this.inputText = "";
			},
			/**
			 * 获取搜索结果
			 */
			searchAddress(){
				// 发起网络请求查询搜索结果
				
				// 将结果清洗为需要的结构
				
				// 返回结果数组
				
				return this.$t_d.ADDRESS_DATA.search_res;
			},
			/**
			 * 获取当前地址
			 */
			getCurrentPosition(){
				
				// 获取地址信息
				uni.getLocation({
					type:"wgs84",
					success(e) {
						console.log('获取到了当前的位置坐标但是没有定位api所以没法操作',e);
					}
				})
				
				// 通过地图api转换为实际地址
				
				// 存储实际地址，更新数据
			}
			,
			changeAddress(index){
				// 更改公共区域数据
				this.SAVE_SHIP_ADDRESS(this.myAddress[index]);
				// 因为当前页面渲染的数据是缓存数据，所以通过更新缓存更新视图
				this.userInfo.shipAddress = JSON.parse(JSON.stringify(this.myAddress[index]));
			}
			,
			...mapMutations(['SAVE_SHIP_ADDRESS'])
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
