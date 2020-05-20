<template>
	<view class="city-container flex-direction">
		<!-- 搜索栏 S -->
		<view 
		class="cu-bar search bg-white padding-lr-sm mbg-gradual-blue search-box"
		:style="{top:systemInfo.windowTop + 'px'}"
		>
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input 
				@focus="InputFocus" 
				@blur="InputBlur"
				@input="InputEnter"
				type="text" 
				placeholder="输入城市名或者拼音" 
				confirm-type="search"></input>
			</view>
		</view>
		<!-- 搜索栏 E -->
		
		<view 
		class="indexes flex-direction"
		:style="{top:searchBoxInfo.bottom + 'px'}"
		>
			<!-- 当前城市区域 S -->
			<view 
			v-show="!inputText"
			class="current-city padding-top-xs flex-direction">
				<text class="padding-lr padding-tb-xs text-color-6">当前定位城市</text>
				<view class="city-name padding bg-white">
					<text class="text-color-3">{{userInfo.currentCity}}</text>
				</view>
			</view>
			<!-- 当前城市区域 E -->
			
			<!-- 城市列表区域 S -->
			<view
			v-show="!inputText"
			 class="flex-sub"
			 v-for="(value,key,index) in newList" :key="key + index">
				<view 
				:class="'indexItem-' + key" 
				:id="'indexes-' + key" 
				:data-index="key"
				class="flex-direction flex-sub"
				>
					<view class="padding">{{key}}</view>
					<view class="cu-list no-padding flex-direction">
						<view 
						class="cu-item border-top border-color-e" 
						v-for="(cityName,sub,i) in value" 
						:key="sub+i"
						@tap="changeCity(cityName)"
						>
							<view class="city-name padding bg-white flex-sub">
								<text class="text-color-3">{{cityName}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 城市列表区域 E -->
			
			<!-- 搜索列表区域 S -->
			<view v-show="inputText" class="flex-sub">
				<view class="flex-direction flex-sub">
					<!-- 无结果 -->
					<view 
					v-show="!searchList"
					class="search-no bg-white flex-direction align-center">
						<text class="text-lg text-color-6">无结果</text>
					</view>
					
					<!-- 有结果 -->
					<view 
					v-show="searchList"
					class="cu-list no-padding flex-direction">
						<view 
						class="cu-item border-top border-color-e" 
						v-for="(cityName,sub) in searchList" 
						:key="sub"
						@tap="changeCity(cityName.slice(1,cityName.length-1))"
						>
							<view class="city-name padding bg-white flex-sub">
								<text class="text-color-3">{{cityName.slice(1,cityName.length-1)}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 搜索列表区域 E -->
			
		</view>
		
		<!-- 侧边bar S -->
		<view 
		v-show="!inputText"
		class="indexBar" :style="[{height:'calc(100vh - ' + 80 + 'px)'}]">
			<view class="indexBar-box">
				<view class="indexBar-item" 
				v-for="(item,index) in listKey" 
				:key="index" 
				:id="item" 
				@touchstart="getCur" 
				@touchend="setCur"
				> 
				<text>{{item}}</text>
				</view>
			</view>
		</view>
		<!-- 侧边bar E -->
	</view>
</template>

<script>
	import {pinyin} from '@/common/py.js';
	import {CITY_DATA} from "@/config/city_data.js";
	import {mapMutations,mapState} from "vuex";
	export default {
		data() {
			return {
				inputText:"", // 输入框文本
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				listCurID: '',
				list: CITY_DATA,
				listKey:Object.keys(CITY_DATA),
				newList:{},
				searchList:[], // 搜索列表
				systemInfo:{},
				searchBoxInfo:{},
				oldScroll:0,
			}
		},
		onPageScroll(e) {
			// 存储页面滚动距离用于定位元素
			this.oldScroll = e.scrollTop;
		}
		,
		mounted() {
			this.searchBoxInfo = this.$utils.getElementInfo('.search-box');
			// console.log(this.searchBoxInfo);
			
			this.getList();
			
			uni.getSystemInfo({
				success(e) {
					// console.log(e);
					this.systemInfo = e;
				}
			})
		}
		,
		computed:{
			...mapState(['userInfo'])
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
				this.inputText = e.detail.value.toLowerCase();
				
				if(!this.inputText) return;
				
				// 输入包含中文和字母以外数据
				if(!(/^([\u4e00-\u9fa5]|[a-zA-Z])+$/.test(this.inputText))) {
					this.searchList = null;
					return;
				};
				
				// 输入的中文
				if(/^[\u4e00-\u9fa5]+$/.test(this.inputText)){
					let reg = new RegExp("\\\"[\\u4e00-\\u9fa5]*"+this.inputText+"[\\u4e00-\\u9fa5]*\\\"","g");
					this.searchList = JSON.stringify(this.list).match(reg);
					return;
				}
				
				// 输入的字母
				if(/^[a-zA-Z]+$/.test(this.inputText)){
					let reg = new RegExp("(\\\"[a-zA-Z]*"+this.inputText+"[a-zA-Z]*\\\")\\\:(\\\"[\\u4e00-\\u9fa5]+\\\")","g");
					let reg1 = new RegExp("\\\"[\\u4e00-\\u9fa5]+\\\\","g");
					this.searchList = JSON.stringify(
											JSON.stringify(this.list).toLowerCase().match(reg)
										).match(reg1);
					
					return;
				}
				
				// 输入的中英混合
				if(/^([\u4e00-\u9fa5]|[a-zA-Z])+$/.test(this.inputText)){
					this.searchList = null;
					return;
				}
				
			},
			/**
			 * 改变城市
			 * @param {Object} cityName
			 */
			changeCity(cityName){
				this.$utils.log('changeCity','切换城市为'+cityName);
				
				// 修改用户的城市选择
				this.SAVE_CITY(cityName);
				// 跳回地址管理页
				uni.redirectTo({
					url:'/pages/address/address'
				})
			}
			,
			//获取文字信息
			getCur(e) {
				// this.listCurID = this.list[e.currentTarget.id].title;
				
			},
			setCur(e) {
				this.$utils.log('setCur','用户查看列表：'+e.currentTarget.id);
				let curID = e.currentTarget.id;
				// 如果该元素还未渲染就跳过
				if(!this.$utils.getElementInfo('.indexItem-'+curID)) return;

				
				this.listCurID = curID;
				
				// 获取要跳转的位置
				let scroll = this.oldScroll + this.$utils.getElementInfo('.indexItem-'+this.listCurID).top - this.searchBoxInfo.bottom;
				
				// 移动到对应的位置
				uni.pageScrollTo({
					scrollTop: scroll,
					duration: 0
				})
			}
			,
			getList(){
				this.$utils.log('getList','通过定时器向渲染列表中逐个添加数据避免一次性渲染导致的页面加载缓慢的问题');
				let i = 0,key;
				let timers = setInterval(()=>{
					key = this.listKey[i++];
					this.$set(this.newList,key,this.list[key]);
					
					if(i >= this.listKey.length){
						clearInterval(timers);
					}
				},5);
			}
			,
			...mapMutations(['SAVE_CITY'])
		}
		,
		
	}
</script>

<style lang="scss" scoped>
	.search-box{
		position: fixed;
		// top: 10px;
		z-index: 99;
		width: 750rpx;
	}
	.indexes {
		position: relative;
	}
	
	.indexBar {
		position: fixed;
		right: 0px;
		bottom: 0px;
		padding: 20upx 20upx 20upx 60upx;
		display: flex;
		align-items: center;
	}
	
	.indexBar .indexBar-box {
		width: 50rpx;
		height: auto;
		display: flex;
		flex-direction: column;
	}
	
	.indexBar-item {
		// flex: 1;
		width: 40rpx;
		height: 40rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24upx;
		color: #888;
	}
	
	movable-view.indexBar-item {
		width: 40upx;
		height: 40upx;
		z-index: 9;
		position: relative;
	}
	
	movable-view.indexBar-item::before {
		content: "";
		display: block;
		position: absolute;
		left: 0;
		top: 10upx;
		height: 20upx;
		width: 4upx;
		background-color: #f37b1d;
	}
	
	.indexToast {
		position: fixed;
		top: 0;
		right: 80upx;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		width: 100upx;
		height: 100upx;
		border-radius: 10upx;
		margin: auto;
		color: #fff;
		line-height: 100upx;
		text-align: center;
		font-size: 48upx;
	}
	
	.search-no{
		height: 100vh;
		padding-top: 30vh;
	}
</style>
