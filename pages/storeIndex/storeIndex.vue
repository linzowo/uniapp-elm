<template>
	<view class="store-index-container flex-direction">
		<!-- 数据加载完成前显示 S -->
		<view 
		v-show="!lodingEnd"
		class="loding">
			数据加载中
		</view>
		<!-- 数据加载完成前显示 E -->
		
		<!-- 数据加载完成后显示 S -->
		<view 
		v-if="lodingEnd"
		class="loding-end flex-direction">
			<!-- nav S -->
			<view class="store-index-nav">
				<view class="store-cover-bg-box">
					<image 
					class="store-cover-bg"
					:src="storeData.rst.shop_sign.image_hash,'w_750'|imgUrlFilter"
					mode="widthFix"></image>
				</view>
				<view class="store-cover-box">
					<image 
					class="store-cover"
					:src="storeData.rst.image_path|imgUrlFilter" 
					mode="widthFix"></image>
				</view>
				<text class="nav-back-btn lg text-white cuIcon-back text-xxl padding-xs"></text>
			</view>
			<!-- nav E -->
			
			<!-- 店铺基础信息 S -->
			<view class="store-base-info padding-lr-xl padding-top-xl flex-direction align-center flex-sub">
				<!-- 店名 -->
				<view class="store-name-box align-center flex-direction padding-lr-sm margin-bottom-xs">
					<view class="align-end margin-bottom-xs">
						<text class="store-name text-cut text-bold text-xxl margin-right-xs">{{storeData.rst.name}}</text>
						<text class="lg text-color-3 cuIcon-playfill"></text>
					</view>
					<view class="text-xs text-color-6">
						<text class="margin-right-xs">评价</text>
						<text class="margin-right-xs">月售</text>
						<text>商家配送约넫눾分钟</text>
					</view>
				</view>
				
				<!-- 红包 -->
				<view class="red-packets-list justify-around margin-top-xs margin-bottom-sm">
					<!-- 任意使用 -->
					<view class="red-packets-item red-packets-item1 padding-left-lg padding-right-xs align-center border-radius-3 justify-around">
						<text class="text-price margin-right-xs text-bold text-lg">7</text>
						<view class="margin-right align-center text-xs">
							<text class="lg text-yellow cuIcon-crownfill margin-right-xs"></text>
							<text class="">无门槛</text>
						</view>
						<text class="text-xs">领取</text>
					</view>
					<!-- 满减红包 -->
					<view class="red-packets-item red-packets-item2 padding-left-lg padding-right-xs align-center border-radius-3">
						<text class="text-price margin-right-xs text-bold text-lg">3</text>
						<view class="margin-right align-center text-xs">
							<text class="">满39元使用</text>
						</view>
						<text class="text-xs">领取</text>
					</view>
				</view>
				
				<!-- 优惠 -->
				<view class="sale-box justify-between margin-bottom-sm">
					<view class="sale-tag-list">
						<view 
						v-for="item in 4"
						:key="item"
						class="sale-tag-item text-xs text-scale-9 padding-lr-xs">
							30减20
						</view>
					</view>
					<view class="align-center text-xs text-gray">
						<text>9个优惠</text>
						<text class="lg cuIcon-triangledownfill"></text>
					</view>
				</view>
				
				<!-- 公告 -->
				<view class="notice-box justify-start text-xs text-gray">
					<text class="notice">公告：小龙虾全场特价抢购，快快下单吧，亲</text>
				</view>
				
			</view>
			<!-- 店铺基础信息 E -->
			
			<!-- 商家餐点、评价、详细信息 S -->
			<view class="store-tab flex-direction">
				
				<!-- tab-nav S -->
				<scroll-view 
				scroll-x 
				class="bg-white nav tab-nav">
					<view class="flex text-center">
						<view 
						class="cu-item flex-sub" 
						:class="index==TabCur?'text-orange cur':''" 
						v-for="(item,index) in tabList" 
						:key="index" 
						@tap="tabSelect" 
						:data-id="index">
							{{item}}
						</view>
					</view>
				</scroll-view>
				<!-- tab-nav E -->
				
				<!-- tab-content S -->
				<view class="tab-content">
					<!-- 点餐 S -->
					<view 
					v-show="TabCur == 0"
					class="flex-direction">
						<!-- 广告 -->
						<view class="banner padding-lr margin-top-xs margin-bottom">
							<image 
							class="banner-img border-radius-10"
							:src="storeData.rst.posters[0].image_hash,'w_686'|imgUrlFilter" 
							mode="widthFix"></image>
						</view>
						<!-- 滑动菜单 -->
						<view class="scroll-menu-column flex-direction">
							<text class="title padding-lr text-lg text-bold margin-bottom-sm">商家推荐</text>
							
							<scroll-view 
							class="scroll-view_H recommend-foods-list" 
							scroll-x="true"
							>
							
								<view 
								v-for="(item,index) in storeData.recommend[0].items"
								:key="index"
								class="scroll-view-item_H recommend-foods-item flex-direction border-radius-6 margin-left-sm"
								>
									<image 
									class="border-radius-6"
									:src="item.image_path,'w_240'|imgUrlFilter" 
									mode="widthFix"
									></image>
									<text 
									class="recommend-foods-name text-cut"
									>
									{{item.name}}
									</text>
									<!-- 商品售卖情况 -->
									<view class="text-xs text-grey margin-bottom-xs">
										<text class="margin-right-xs">月售{{item.month_sales}}</text>
										<text>好评率{{item.satisfy_rate_text?item.satisfy_rate_text:0}}%</text>
									</view>
									
									<!-- 价格及添加购物车 -->
									<view class="justify-between align-center">
										<text 
										class="text-price text-xl text-color-price"
										>
										{{item.price}}
										</text>
										<text class="lg add-btn-blue text-xxl cuIcon-roundaddfill"></text>
									</view>
								</view>
								
							</scroll-view>
						</view>
					</view>
					<!-- 点餐 E -->
					
					<!-- 评价 S -->
					<view 
					v-show="TabCur == 1"
					class="align-center justify-around flex-sub">
					
						<!-- 店铺评分 -->
						<text class="rating text-sl text-color-orange">4.4</text>
						
						<!-- 店铺星级 -->
						<view class="flex-direction">
							<text>商家评分</text>
							
							<!-- star S -->
							<view class="star-box star-size">
								<view class="star-bg">
									<image class="star-size" :src="$i_u.star_bg" mode="left"></image>
								</view>
								<view 
								class="star"
								:style="{width:parseInt(120 * (4.4/5)) + 'rpx'}"
								>
									<image 
									class="star-size" 
									:src="$i_u.star" 
									mode="left"
									></image>
								</view>
							</view>
							<!-- star E -->
							
						</view>
						
						<!-- 味道评分 -->
						<view class="flex-direction">
							<text>味道</text>
							<text>4.5</text>
						</view>
						
						<!-- 包装评分 -->
						<view class="flex-direction">
							<text>包装</text>
							<text>4.5</text>
						</view>
						
						<!-- 配送评分 -->
						<view class="flex-direction">
							<text>配送</text>
							<text>4.7</text>
						</view>
						
					</view>
					<!-- 评价 E -->
					
					<!-- 详细信息 S -->
					<view 
					v-show="TabCur == 2"
					class="">
						商家
					</view>
					<!-- 详细信息 E -->
				</view>	
				<!-- tab-content E -->
				
			</view>
			<!-- 商家餐点、评价、详细信息 E -->
			
			<!-- 商铺菜单 S -->
			<view class="store-menu">
				
			</view>
			<!-- 商铺菜单 E -->
			
			<!-- 底部购物车 S -->
			<view class="car-box">
				
			</view>
			<!-- 底部购物车 E -->
		</view>
		<!-- 数据加载完成后显示 E -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				storeData:{}, // 店铺数据
				storeCommentData:{}, // 店铺评价数据
				lodingEnd: false,
				TabCur: 0,
				tabList:['点餐','评价','商家'],
				pageState:{
					
				}, // 页面状态
				popupStack:[], // 弹窗栈
			}
		},
		watch:{
			/**
			 * 监听页面状态变化，根据状态设置对应的操作
			 * @param {Object} n
			 * @param {Object} o
			 */
			pageState(n,o){}
		}
		,
		created() {
			
			// 请求店铺主要数据
			this.$http.get.storeIndexData().then((res)=>{
					this.lodingEnd = true;
					this.storeData = res;
			},(err)=>{console.log('请求失败：',err);});
			
			// 请求店铺评论数据
			this.$http.get.storeCommentData().then((res)=>{
				this.storeCommentData = res.data;
			},(err)=>{console.log('请求失败：',err);});
			
			
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
			},
			/**
			 * 改变页面状态的方法，页面所有的状态改变都在这里进行
			 * @param {Object} state
			 */
			changePageState(state){
				this.$utils.log('changePageState','改变页面状态',state);
				this.pageState = Object.assign({},this.pageState,state);
			}
			,
			/**
			 * 弹窗状态变化完成时触发的方法
			 * @param {Object} e 事件参数对象
			 */
			popupChange(e){
				this.$utils.log('popupChange','弹窗状态改变==>' + (e.show?'开':'关'),e);
				if(e.show == false){
					this.popupStack.pop();
				}
			}
			,
			/**
			 * 打开弹窗
			 * @param {String} ref 弹窗的ref值
			 */
			openPopup(ref){
				this.$utils.log('openPopup','打开弹窗'+ref);
				if(this.popupStack.includes(ref)) return;
				
				this.popupStack.push(ref);
				this.$refs[ref].open();
			}
			,
			/**
			 * 关闭弹窗
			 * @param {String} ref 弹窗的ref值
			 */
			closePopup(ref){
				this.$utils.log('closePopup','关闭弹窗'+ref);
				this.$refs[ref].close();
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #fff;
	}
	.store-index-nav{
		position: relative;
		width: 750rpx;
		height: 200rpx;
	}
	.store-cover-bg-box{
		position: absolute;
		width: 750rpx;
		height: 200rpx;
		overflow: hidden;
	}
	.store-cover-bg{
		position: relative;
		top: -20rpx;
		width: 750rpx;
	}
	.store-cover-bg::before{
		content: "";
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background-image: linear-gradient(0deg,hsla(0,0%,100%,0),rgba(0,0,0,.5));
	}
	.store-cover-box{
		position: absolute;
		bottom: -30rpx;
		left: 50%;
		margin-left: -75rpx;
	}
	.store-cover{
		width: 150rpx;
		height: 150rpx;
	}
	.nav-back-btn{
		position: relative;
		z-index: 9;
	}
	
	.store-name{
		width: 500rpx;
	}
	
	.red-packets-list,.sale-box,.notice-box{
		width: 100%;
	}
	.red-packets-item{
		width: 300rpx;
		padding-top:5rpx;
		padding-bottom:5rpx;
		position: relative;
	}
	.red-packets-item1{
		color: #594519;
		background: #ffe578;
	}
	
	.red-packets-item2{
	    background: #fff4f4;
	    color: #5c1603;
	}
	
	.red-packets-item::before,.red-packets-item::after{
		content: "";
		border-radius: 50%;
		width: 10rpx;
		height: 10rpx;
		background-color: #fff;
		display: block;
		position: absolute;
		right: 70rpx;
	}
	.red-packets-item::before{
		top: -5rpx;
	}
	.red-packets-item::after{
		bottom: -5rpx;
	}
	
	.sale-tag-item{
		color: rgb(255, 75, 51);
		border: 1px solid rgb(255, 201, 193);
	}
	
	.tab-nav{
		position: sticky;
		top: 0;
		z-index: 9;
	}
	.tab-content{
		// height: 1000px;
	}
	.banner-img{
		width: 686rpx;
	}
	
	.scroll-view_H {
		white-space: nowrap;
		width: 750rpx;
	}
	
	.scroll-view-item {
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
		font-size: 36rpx;
	}
	.scroll-view-item_H {
		display: inline-flex;
		width: 240rpx;
	}
	.recommend-foods-name{
		width: 240rpx;
	}
	.add-btn-blue{
		color: rgb(35, 149, 255);
	}
	
	
	.star-size{
		width: 120rpx;
		height: 20rpx;
	}
	.star-box{
		position: relative;
	}
	.star-bg{
		position: absolute;
		z-index: 0;
	}
	.star{
		position: relative;
		z-index: 1;
	}
</style>
