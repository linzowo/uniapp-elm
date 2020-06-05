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
		
		<view class="body flex-sub">
			
			<!-- 商铺列表 S -->
			<view class="store-list flex-direction flex-sub">
				
				<!-- 商铺 S -->
				<view 
				v-for="(item,index) in storeList"
				:key="index"
				class="store-item flex-direction flex-sub border-bottom border-color-e padding">
					
					<!-- 商铺基本信息 S -->
					<view class="store-info justify-between align-center margin-bottom">
						
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
						<view 
						v-for="(ele,i) in item.foods"
						:key="i"
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
						<!-- 套餐 E -->
					</view>
					<!-- 套餐列表 S -->
					
					<!-- 显示更多套餐 S -->
					<view class="show-more padding-sm justify-center text-color-9">
						<text>展开更多套餐 {{item.foods.length-1}}个</text>
						<text>收起</text>
					</view>
					<!-- 显示更多套餐 E -->
					
				</view>
				<!-- 商铺 E -->
				
			</view>
			<!-- 商铺列表 E -->
			
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
				
			}
		},
		created() {
			
			// 模拟获取数据过程
			this.navData = this.$t_d.COMBO_DATA.tabs;
			this.storeList = this.$t_d.COMBO_DATA.query_list;
			
		}
		,
		methods: {
			tabSelect(index) {
				this.TabCur = index;
				this.categotyID = 'cu-item' + index;
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
