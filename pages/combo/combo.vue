<template>
	<view class="combo-container flex-direction">
		
		<!-- 顶部自定义导航栏 S -->
		
		<scroll-view 
		scroll-x class="bg-white nav" 
		scroll-with-animation 
		:scroll-into-view="categotyID"
		>
			<view 
			class="cu-item" 
			:id="'cu-item'+index"
			:class="index==TabCur?'text-green cur':''" 
			v-for="(item,index) in navData" 
			:key="index" 
			@tap="tabSelect(index)" 
			:data-id="index"
			>
				{{item.name}}
			</view>
		</scroll-view>
		<!-- 顶部自定义导航栏 E -->
		
		<view class="body flex-sub flex-direction">
			
			<!-- 商铺列表 S -->
			<view class="store-list flex-direction flex-sub">
				
				<!-- 商铺 S -->
				<view 
				v-for="(item,index) in storeList"
				:key="index"
				class="store-item flex-direction flex-sub border-bottom border-color-e padding">
					
					<!-- 商铺基本信息 S -->
					<view 
					@tap="storeTap(item.restaurant.id)"
					class="store-info justify-between align-center margin-bottom">
						
						<!-- 店铺头像 -->
						<image 
						class="store-img margin-right-sm"
						:src="item.restaurant.image_path|imgUrlFilter" 
						mode="widthFix"></image>
						
						<view class="flex-sub justify-start flex-direction">
							
							<!-- 店名 标签 -->
							<view class="justify-between margin-bottom-xs align-center">
								<text class="store-name text-color-6 text-cut">{{item.restaurant.name}}</text>
								<!-- 评分月售 -->
								<view class="rating-sale text-xs text-color-c align-center">
									<text class="">评分{{item.restaurant.rating}}</text>
									<text class="line"></text>
									<text>月售{{item.restaurant.recent_order_num}}</text>
								</view>
							</view>
							
							
							<view>
								<text
								v-for="(ele,i) in item.restaurant.recommend_reasons"
								:key="i"
								class="store-tag border padding-lr-xs text-xs text-scale-9"
								>{{ele.name}}</text>
							</view>
						</view>
						
					</view>
					<!-- 商铺基本信息 E -->
					
					<!-- 套餐列表 S -->
					<view class="combo-list flex-direction">
						<!-- 套餐 S -->
						
						<!-- 默认显示的第一件商品 S -->
						<view 
						v-for="(ele,i) in item.foods.slice(0,1)"
						:key="ele.food_id"
						@tap="comboTap(item.restaurant.id,ele.food_id)"
						class="combo-item margin-bottom">
							<!-- 套餐图片 -->
							<image 
							class="combo-img margin-right-sm"
							:src="ele.image_path|imgUrlFilter"
							 mode="widthFix"
							 ></image>
							<!-- 套餐详情 -->
							<view class="combo-info flex-direction justify-between">
								<view class="flex-direction">
									<text class="combo-title text-lg text-cut margin-bottom-xs">{{ele.name}}</text>
									<text class="combo-description text-sm text-color-9">{{ele.description.replace(/\n/g,'')}}</text>
								</view>
								
								<view class="combo-buy justify-between">
									<text class="text-price text-xl text-bold">{{ele.price}}</text>
									<text class="lg text-xxl text-color-3 cuIcon-roundaddfill"></text>
								</view>
							</view>
						</view>
						<!-- 默认显示的第一件商品 E -->
						
						<!-- 更多商品 S -->
						
						<!--  #ifndef  MP-WEIXIN -->
						<view 
						v-show="showMoreGoods.includes(index)"
						v-for="(ele,i) in item.foods.slice(1)"
						:key="ele.food_id"
						@tap="comboTap(item.restaurant.id,ele.food_id)"
						class="combo-item margin-bottom">
						<!--  #endif -->
						<!--  #ifdef  MP-WEIXIN -->
						<view v-if="showMoreGoods.includes(index)">
						<view 
						v-for="(ele,i) in item.foods.slice(1)"
						:key="ele.food_id"
						@tap="comboTap(item.restaurant.id,ele.food_id)"
						class="combo-item margin-bottom">
						<!--  #endif -->
						
						
							<!-- 套餐图片 -->
							<image 
							class="combo-img margin-right-sm"
							:src="ele.image_path|imgUrlFilter"
							 mode="widthFix"
							 ></image>
							<!-- 套餐详情 -->
							<view class="combo-info flex-direction justify-between">
								<view class="flex-direction">
									<text class="combo-title text-lg text-cut margin-bottom-xs">{{ele.name}}</text>
									<text class="combo-description text-sm text-color-9">{{ele.description.replace(/\n/g,'')}}</text>
								</view>
								
								<view class="combo-buy justify-between">
									<text class="text-price text-xl text-bold">{{ele.price}}</text>
									<text class="lg text-xxl text-color-3 cuIcon-roundaddfill"></text>
								</view>
							</view>
						</view>
						
						<!--  #ifdef  MP-WEIXIN -->
						</view>
						<!--  #endif -->
						<!-- 更多商品 E -->
						
						<!-- 套餐 E -->
					</view>
					<!-- 套餐列表 S -->
					
					<!-- 显示更多套餐 S -->
					
					<!--  #ifndef  MP-WEIXIN -->
					<view 
					@tap.stop.prevent="controlGoodsList(index)"
					v-show="!showMoreGoods.includes(index)"
					class="show-more padding-sm justify-center text-color-9 align-center">
					<!--  #endif -->
					<!--  #ifdef  MP-WEIXIN -->
					<view 
					@tap.stop.prevent="controlGoodsList(index)"
					v-if="!showMoreGoods.includes(index)"
					class="show-more padding-sm justify-center text-color-9 align-center">
					<!--  #endif -->

					
						<text>展开更多套餐 {{item.foods.length-1}}个</text>
						<text class="lg text-gray cuIcon-unfold margin-left-xs"></text>
					</view>
					
					<!--  #ifndef  MP-WEIXIN -->
					<view 
					@tap.stop.prevent="controlGoodsList(index)"
					v-show="showMoreGoods.includes(index)"
					class="show-more padding-sm justify-center text-color-9 align-center">
					<!--  #endif -->
					<!--  #ifdef  MP-WEIXIN -->
					<view 
					@tap.stop.prevent="controlGoodsList(index)"
					v-if="showMoreGoods.includes(index)"
					class="show-more padding-sm justify-center text-color-9 align-center">
					<!--  #endif -->
					
						<text>收起</text>
						<text class="lg text-gray cuIcon-fold margin-left-xs"></text>
					</view>
					<!-- 显示更多套餐 E -->
					
				</view>
				<!-- 商铺 E -->
				
			</view>
			<!-- 商铺列表 E -->
			
			<view class="list-end align-center justify-center">
				<view class="cu-load" :class="hasNext?'loading':'over'"></view>
			</view>
			
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				TabCur: 0,
				categotyID:null, // 锚点定位id
				navData:[], // 导航栏分类数据
				storeList: [], // 商铺数据
				showMoreGoods:[], // 索引值在这个列表中的即为显示状态不在的即为隐藏状态
				hasNext: false, // 是否还有下一组数据
				
			}
		},
		created() {
			
			// 模拟获取数据过程
			let comboData;
			uni.showLoading({
				title: ''
			});
			try {
				let tmp = uni.getStorageSync('combo_data');
				if(tmp) comboData = JSON.parse(tmp);
				this.navData = comboData.tabs;
				this.storeList = comboData.query_list
				uni.hideLoading();
			} catch (e) {
				console.log('获取缓存失败');
			}

			if(!comboData || this._.isEmpty(comboData)){

				this.$http.get.combo_data().then((res)=>{
					this.navData = res.tabs;
					this.storeList = res.query_list
					uni.hideLoading();

					uni.setStorage({
						key: 'combo_data',
						data: JSON.stringify(res),
						success: function () {
							console.log('存储combo_data成功');
						}
					});
				},(e)=>{
					console.log('请求失败',e);
				})
			}
			
		}
		,
		onReachBottom() {
			// 获取更多数据
			this.getMore();
		}
		,
		methods: {
			/**
			 * 套餐商品点击事件
			 * @param {String} storeId 店铺id
			 * @param {Number} foodId 商品id用于传递到商铺主页定位其在页面中的位置
			 */
			comboTap(storeId,foodId){
				// 跳转至商铺主页 并定位到该套餐
				
				uni.navigateTo({
					url:this.$pages_path.store_index+'?food_id='+foodId + '&store_id=' + storeId,
					fail(e) {
						console.log('跳转失败');
					}
				})
			}
			,
			/**
			 * 店铺标题点击事件
			 * @param {String} storeId 店铺id
			 */
			storeTap(storeId){
				// 跳转至商铺主页
				uni.navigateTo({
					url:this.$pages_path.store_index + '?store_id=' + storeId,
					fail(e) {
						console.log('跳转失败');
					}
				})
			}
			,
			/**
			 * 切换顶部分类
			 * @param {Object} index
			 */
			tabSelect(index) {
				this.$utils.log('tabSelect','切换分类');
				this.TabCur = index;
				this.categotyID = 'cu-item' + index;
			},
			/**
			 * 控制商铺列表中的商品显示区是否显示全部商品
			 * @param {Object} index 该商品渲染是的索引值
			 */
			controlGoodsList(index){
				if(this.showMoreGoods.includes(index)){
					this.showMoreGoods.splice(this.showMoreGoods.indexOf(index),1);
				}else{
					this.showMoreGoods.push(index);
				}
				
			}
			,
			/**
			 * 获取更多数据
			 */
			getMore(){
				if(!this.hasNext) return;

				// 发起获取更多数据请求
				this.$utils.log('getMore','获取更多套餐数据')
			}
		}
		
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #fff;
	}
	.store-img{
		width: 80rpx;
	}
	.combo-img{
		width: 218rpx;
	}
	.store-tag{
		color: #a45b1c;
		border-color: #a45b1c;
	}
	.line{
		width: 1px;
		height: 20rpx;
		background-color: #ccc;
		margin: 0 15rpx;
	}
	.store-name{
		width: 350rpx;
	}
	.combo-description,.combo-title{
		width: 460rpx;
	}
	.combo-description{
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	.text-price{
		color: #b91f20;
	}
</style>
