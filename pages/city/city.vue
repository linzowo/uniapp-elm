<template>
	<view class="city-container flex-direction">
		<!-- 搜索栏 S -->
		<view 
		class="cu-bar search bg-white padding-lr-sm mbg-gradual-blue search-box">
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
		
		<scroll-view 
		scroll-y="true" 
		class="indexes"
		:style="{height:scrollViewHeight}"
		:scroll-into-view="'indexes-'+ listCurID"
		>
			<!-- 当前城市区域 S -->
			<view 
			v-if="!inputText"
			class="current-city padding-top-xs flex-direction">
				<text class="padding-lr padding-tb-xs text-color-6">当前定位城市</text>
				<view class="city-name padding bg-white">
					<text class="text-color-3">{{userInfo.currentCity}}</text>
				</view>
			</view>
			<!-- 当前城市区域 E -->
			
			<!-- 城市列表区域 S -->
			<view
			 class="flex-sub"
			 v-for="(item,index) in list" :key="index">
				<view 
				:class="'indexItem-' + item.title" 
				:id="'indexes-' + item.title" 
				:data-index="item.title"
				class="flex-direction flex-sub"
				>
					<view 
					v-if="!inputText"
					class="padding">{{item.title}}</view>
					<view class="cu-list no-padding flex-direction">
						<view 
						class="cu-item border-top border-color-e" 
						v-for="(cityName,sub) in item.lists" 
						:key="sub"
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
			
		</scroll-view>
		
		<!-- 侧边bar S -->
		<view 
		v-if="!inputText"
		class="indexBar" :style="[{height:'calc(100vh - ' + 80 + 'px)'}]">
			<view class="indexBar-box" @touchstart="tStart" @touchend="tEnd" @touchmove.stop="tMove">
				<view class="indexBar-item" 
				v-for="(item,index) in list" 
				:key="index" 
				:id="index" 
				@touchstart="getCur" 
				@touchend="setCur"
				> 
				<text>{{item.title}}</text>
				</view>
			</view>
		</view>
		
		<!--选择显示-->
		<text v-show="!hidden" class="indexToast">
			{{listCur}}
		</text>
		<!-- 侧边bar E -->
	</view>
</template>

<script>
	import {CITY_DATA} from "@/config/city_data.js";
	import {mapMutations,mapState} from "vuex";
	export default {
		data() {
			return {
				inputText:"", // 输入框文本
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				hidden: true,
				listCurID: '',
				list: CITY_DATA,
				listCur: '',
				scrollViewHeight:"",
			}
		},
		onReady() {
			let that = this;
			uni.createSelectorQuery().select('.indexBar-box').boundingClientRect(function(res) {
				that.boxTop = res.top
			}).exec();
			uni.createSelectorQuery().select('.indexes').boundingClientRect(function(res) {
				that.barTop = res.top
			}).exec()
		},
		mounted() {
			// 动态设置滑动区域高度
			this.scrollViewHeight = this.$system_info.containerHeight - this.$utils.getElementInfo('.search-box').height + 'px';
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
				this.inputText = e.detail.value;
			},
			/**
			 * 改变城市
			 * @param {Object} cityName
			 */
			changeCity(cityName){
				console.log(cityName);
				
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
				this.hidden = false;
				this.listCur = this.list[e.currentTarget.id].title;
			},
			setCur(e) {
				this.hidden = true;
				this.listCur = this.listCur
			},
			//滑动选择Item
			tMove(e) {
				let y = e.touches[0].clientY,
					offsettop = this.boxTop,
					that = this;
				//判断选择区域,只有在选择区才会生效
				if (y > offsettop) {
					let num = parseInt((y - offsettop) / 20);
					this.listCur = that.list[num].title
				};
			},

			//触发全部开始选择
			tStart() {
				this.hidden = false
			},

			//触发结束选择
			tEnd() {
				this.hidden = true;
				this.listCurID = this.listCur
			},
			indexSelect(e) {
				console.log(e);
				let that = this;
				let barHeight = this.barHeight;
				let list = this.list;
				let scrollY = Math.ceil(list.length * e.detail.y / barHeight);
				for (let i = 0; i < list.length; i++) {
					if (scrollY < i + 1) {
						that.listCur = list[i].title;
						that.movableY = i * 20
						return false
					}
				}
			}
			,
			...mapMutations(['SAVE_CITY'])
		}
		,
		
	}
</script>

<style lang="scss" scoped>
	// .search-box{
	// 	position: sticky;
	// 	top: 10px;
	// }
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
</style>
