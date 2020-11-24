<template>
	<view class="store-index-container flex-direction">
		<!-- 数据加载完成前显示 S -->
		<!--  #ifndef  MP-WEIXIN -->
		<view 
		v-show="!lodingEnd"
		class="loding">
		<!--  #endif -->
		<!--  #ifdef  MP-WEIXIN -->
		<view 
		v-if="!lodingEnd"
		class="loding">
		<!--  #endif -->
		
			<image 
			:style="{width:'750rpx'}"
			:src="$i_u.lodding_bg" 
			mode="widthFix"></image>
		</view>
		<!-- 数据加载完成前显示 E -->
		
		<!-- 数据加载完成后显示 S -->
			<!--  #ifndef  MP-WEIXIN -->
		<view 
		v-if="lodingEnd"
		v-show="!pageState.showBannercontent"
		class="loding-end flex-direction">
			<!--  #endif -->
			<!--  #ifdef  MP-WEIXIN -->
		<view 
		v-if="lodingEnd && !pageState.showBannercontent"
		class="loding-end flex-direction">
			<!--  #endif -->
		
		
			<!-- nav S -->
			<storeIndexNav
			:storeData="storeData"
			@goBack="goBack"
			></storeIndexNav>
			<!-- nav E -->
			
			<!-- 店铺基础信息 S -->
			<storeInfo
			:storeData="storeData"
			></storeInfo>
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
					<!--  #ifndef  MP-WEIXIN -->
					<view 
					v-show="TabCur == 0"
					class="flex-direction">
					<!--  #endif -->
					<!--  #ifdef  MP-WEIXIN -->
					<view 
					v-if="TabCur == 0"
					class="flex-direction">
					<!--  #endif -->
					
						<!-- 广告 -->
						<view 
						@tap="controlBannerPage(true)"
						class="banner padding-lr margin-top-xs margin-bottom">
							<image 
							class="banner-img border-radius-10"
							:src="storeData.rst.posters[0].image_hash,'w_686'|imgUrlFilter" 
							mode="widthFix"></image>
						</view>

						<recommend 
						:shopCart="shopCart" 
						:recommendData="storeData.recommend[0].items"
						@showGoodsInfoPopup="showGoodsInfoPopup"
						@add2cart="add2cart"
						></recommend>

						<!-- 店铺菜单模块 -->
						<view class="store-menu-box">
						
							<!-- 商铺菜单 S -->
							<view class="store-menu flex-sub">
								
								<!-- 垂直菜单区 S -->
								<view class="VerticalBox flex-sub">
									
									<!-- 左侧分类滑动条 S -->
									<scroll-view 
									class="VerticalNav nav" 
									scroll-y 
									scroll-with-animation 
									:scroll-top="verticalNavTop" 
									style="height:100vh"
									>
										<view 
										class="cu-item text-xs justify-center flex-direction" 
										:class="index==foodsCategoryTabCur?'text-green cur':''" 
										v-for="(item,index) in foodsData.areaData" 
										:key="index" 
										@tap="foodsCategoryTabSelect"
										:data-id="index"
										 >
											<view class="food-category-item">
												<text>{{item.name}}</text>
												<view 
												v-if="shopCartFoodCategoryLen[item.id]"
												class="cu-tag badge">{{shopCartFoodCategoryLen[item.id]}}</view>
											</view>
										</view>
									</scroll-view>
									<!-- 左侧分类滑动条 E -->
									
									<!-- 右侧菜单内容滑动列表 S -->
									<scroll-view 
									class="VerticalMain" 
									:scroll-y="true"
									scroll-with-animation 
									style="height:100vh"
									:scroll-into-view="'main-'+mainCur" 
									@scroll="VerticalMain"
									scroll-anchoring="true"
									>
										<!-- 菜单分区 -->
										<view 
										class="padding-lr flex-direction flex-sub" 
										v-for="(item,index) in showFoodsData" 
										:key="index" 
										:id="'main-'+index"
										>
											<!-- 分区标题 -->
											<view 
											class="cu-bar solid-bottom bg-white"
											>
												<view 
												class="text-xs category-title-box"
												>
													<text class="text-bold text-cut margin-right-xs category-title">{{item.name}}</text>
													<text class="text-color-9 text-cut category-des">{{item.description}}</text>
												</view>
											</view>
											
											<!-- 分区内容列表 -->
											<view 
											class="cu-list flex-direction flex-sub bg-white"
											>
												<view 
												v-for="(ele) in item.foods"
												:key="ele.item_id"
												@tap="showGoodsInfoPopup(ele)"
												class="cu-item flex-sub align-start margin-bottom-lg"
												>
													
													<!-- 商品图片 -->
													<view 
													v-if="ele.image_path"
													class="food-img-box margin-right-sm">
														<image 
														:src="ele.image_path,'w_70,h_70'|imgUrlFilter" 
														mode="widthFix"
														></image>
													</view>
													
													<!-- 商品介绍 -->
													<view 
													class="food-info-box flex-direction flex-sub text-color-9 justify-around"
													:style="{height:'190rpx'}"
													>
														<!-- 名称 -->
														<text class="food-title text-cut text-bold text-color-3">{{ele.name}}</text>
														<!-- 材料 -->
														<text class="food-des text-xs">{{ele.materials||ele.description}}</text>
														<!-- 销量 -->
														<view class="text-xs">
															<text class="margin-right-xs">月售{{ele.month_sales_text}}份</text>
															<text>好评率{{ele.satisfy_rate_text||ele.satisfy_rate}}%</text>
														</view>
														
														<!-- 打折信息 -->
														<view 
														v-if="ele.discount_rate<10"
														class="text-xs">
															<text 
															class="sale-tag padding-lr-xs border-radius-3 text-scale-8"
															:style="{color:'#eb6551'}"
															>{{ele.discount_rate}}折</text>
															<text
															v-if="ele.activity"
															class="text-scale-8"
															:style="{color:'#f07373'}"
															>{{ele.activity.applicable_quantity_text}}</text>
														</view>
														
														<!-- 价格 -->
														<view class="price-box align-center justify-between">
															<view class="align-center">
																<text class="text-price text-color-price margin-right-xs text-lg">{{ele.price}}</text>
																<text 
																v-if="ele.price != ele.origin_price"
																class="text-price delete-line text-sm">{{ele.origin_price}}</text>
															</view>
															<view class="align-center">
																<text
																class="text-sm text-color-6 margin-right-xs"
																v-if="ele.min_purchase>1&&!shopCart.foodsList[ele.item_id]"
																>{{ele.min_purchase}}份起售</text>
																<view class="add-remove-box align-center">
																	<text 
																	v-if="shopCart.foodsList[ele.item_id]"
																	@tap.stop.prevent="cutFromCart(ele)"
																	class="lg add-btn-blue text-xxl cuIcon-rounddown"></text>
																	
																	<text 
																	v-if="shopCart.foodsList[ele.item_id]"
																	class="text-cut goods-number"
																	>{{shopCart.foodsList[ele.item_id].count}}</text>
																	
																	<text 
																	@tap.stop.prevent="ele.attrs.length?showFoodTasteChoosePopup(ele):add2cart(ele)"
																	class="lg add-btn-blue text-xxl cuIcon-roundaddfill"
																	></text>
																</view>
															</view>
														</view>
														
													</view>
													
												</view>
												
											</view>
										</view>

									</scroll-view>
									<!-- 右侧菜单内容滑动列表 E -->
								
								</view>
								<!-- 垂直菜单区 E -->
								
							</view>
							<!-- 商铺菜单 E -->
							
						</view>
						
					</view>
					<!-- 点餐 E -->
					
					<!-- 评价 S -->
					<!--  #ifndef  MP-WEIXIN -->
					<view v-show="TabCur == 1">
					<!--  #endif -->
					<!--  #ifdef  MP-WEIXIN -->
					<view v-if="TabCur == 1">
					<!--  #endif -->
					
					<storeComment
					:storeCommentData="storeCommentData"
					:pageState="pageState"
					:commentInfoList="commentInfoList"
					:commentHasNext="commentHasNext"
					@switchComment="switchComment"
					></storeComment>
						
					</view>
					<!-- 评价 E -->
					
					<!-- 详细信息 S -->
					<!--  #ifndef  MP-WEIXIN -->
					<view v-show="TabCur == 2">
					<!--  #endif -->
					<!--  #ifdef  MP-WEIXIN -->
					<view v-if="TabCur == 2">
					<!--  #endif -->
					
					<storeInfoTab
					:storeData="storeData"
					></storeInfoTab>
						
							
					</view>
					<!-- 详细信息 E -->
					
				</view>	
				<!-- tab-content E -->
				
			</view>
			<!-- 商家餐点、评价、详细信息 E -->

			<!-- 底部购物车 S -->
			<bottomShopcart
			:shopCart="shopCart"
			:pageState="pageState"
			:storeData="storeData"
			:bannerDataHasNext="bannerDataHasNext"
			></bottomShopcart>
			<!-- 底部购物车 E -->
			
		</view>
		<!-- 数据加载完成后显示 E -->
		
		
		<!-- banner弹窗 S -->
		<bannerPopup
		:pageState="pageState"
		:storeData="storeData"
		:shopCart="shopCart"
		@showFoodTasteChoosePopup="showFoodTasteChoosePopup"
		@add2cart="add2cart"
		@cutFromCart="cutFromCart"
		@controlBannerPage="controlBannerPage"
		></bannerPopup>
		<!-- banner弹窗 E -->

		<!-- 店铺主页相关弹窗组件 S -->
		<storeIndexPopup 
		@popupChange="popupChange" 
		@exchangeRedpack="exchangeRedpack"
		@openSvip="openSvip"
		@add2cart="add2cart"
		:lodingEnd="lodingEnd"
		:storeData="storeData"
		:shopCart="shopCart"
		:goodsInfoPopupData="goodsInfoPopupData"
		:goodsTasteData="goodsTasteData"
		ref="popBox"
		></storeIndexPopup>
		<!-- 店铺主页相关弹窗组件 E -->

	</view>
</template>

<script>
	/**
	 * @module 店铺主页模块
	 * 用于呈现店铺主页及购物车相关模块
	 */

	// import "./storeIndex.scss";
	import {mapState,mapMutations} from 'vuex';
	
	// 引入官方组件
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	

	// 引入相关组件
	// 商家推荐区域组件
	import recommend from "./recommend.vue";
	// 页面弹窗组件
	import storeIndexPopup from './storeIndexPopup.vue';
	// 底部购物车组件
	import bottomShopcart from './bottomShopcart.vue';
	// banner弹窗组件
	import bannerPopup from './bannerPopup.vue';
	// 店铺主页nav
	import storeIndexNav from './storeIndexNav.vue';
	// 店铺主页nav
	import storeInfo from './storeInfo.vue';
	// 店铺评论区
	import storeComment from './storeComment.vue';
	// 店铺详情页
	import storeInfoTab from './storeInfoTab.vue';
	

	// 引入购物车 和 弹窗组件相关的 mixin
	import {shopcartMixin,popupMixin,storeIndexMethodsMixin} from "@/common/mixinMain.js";
	
	export default {
		data() {
			return {
				storeId: null, // 测试用店铺id因为没有多的店铺数据，所以通过修改店铺id来模拟多家的店铺
				storeData:{}, // 店铺数据
				storeCommentData:{}, // 店铺总评论数据包含分类标签及各种评分
				commentInfoList:[], // 评论列表数据只有单独的评论数据
				popupStack: [], // 弹窗栈
				lodingEnd: false,
				TabCur: 0,
				tabList:['点餐','评价','商家'],
				pageState:{
					commentTagCur:0, // 当前用户选择的是第几个评论标签
					showHasContentCommentOnly: true, // 是否只显示有内容的评论
					showBannercontent: false, // 是否显示banner内容区域
					shopCartOpenState: false, // 当前底部购物车是否处于打开状态
				}, // 页面状态
				commentHasNext:false, // 是否还有更多评论
				bannerDataHasNext:false, // 是否还有更多banner商品数据
				foodsCategoryTabCur: 0, // 当前被选中的商品列表的分类导航
				mainCur: null, // 用于控制商品列表滑动到哪个位置的参数，记录的值与foodsCategoryTabCur一致
				verticalNavTop: 0, // 存储商品列表的分类导航滑动距离的参数
				load: true, // 记录滑动动画是否执行完毕的参数
				// 拆解后的数据
				foodsData:{
					list:[], // 商品数据
					areaData:[], // 分区数据
					start:0, // 起始商品区间
					end: 20, // 结束商品区间
					timer:null
				},
				foodsListDefaultEnd:20, // 食品列表默认的大小
				foodsListUpdateSize:80, // 食品列表分页默认跟新尺寸
				// 商品列表滑动时的数据跟新边界
				foodsListScrollBoundary:2000,
			}
		},
		mixins:[shopcartMixin,popupMixin,storeIndexMethodsMixin],
		watch:{
			/**
			 * 监听页面状态变化，根据状态设置对应的操作
			 * @param {Object} n
			 * @param {Object} o
			 */
			pageState(n,o){},
			TabCur(n){
				if(parseInt(n) === 0){
					this.foodsPage()
				}else{
					clearInterval(this.foodsData.timer)
					this.foodsData.end = this.foodsListDefaultEnd;
				}
			}
		}
		,
		components: {
			recommend,
			storeIndexPopup,
			bottomShopcart,
			bannerPopup,
			storeIndexNav,
			storeInfo,
			storeComment,
			storeInfoTab,
		}
		,
		computed:{
			/**
			 * 根据起始结束索引动态计算要显示哪些数据
			 */
			showFoodsData(){
				// 商品数据
				let foods = this.foodsData.list.slice(
					this.foodsData.start,this.foodsData.end
				);

				// 分区数据
				let area = JSON.parse(JSON.stringify(this.foodsData.areaData));

				area.forEach(ele=>{
					ele.foods = foods.filter(e=>{
						return e.index >= ele.start && e.index < ele.end
					})
				})

				return area;
			}
			,
			/**
			 * 统计每个分类下有几件商品
			 * @return {Object} {category_id:count}
			 */
			shopCartFoodCategoryLen(){
				let res = {};
				
				for (let key in this.shopCart.foodsList) {
					
					if(res[this.shopCart.foodsList[key].info.category_id]){
						res[this.shopCart.foodsList[key].info.category_id] += this.shopCart.foodsList[key].count;
					}else{
						res[this.shopCart.foodsList[key].info.category_id] = this.shopCart.foodsList[key].count;
					} // end if
					
				} // end for
				
				return res;
			}
			,
			...mapState([
				'login',
				'userInfo',
				'cartList'
			])
		}
		,
		onLoad(e){
			this.storeId = e.store_id;
		}
		,
		created() {
			// 请求店铺主要数据
			this.$http.get.store_index_data().then((res)=>{
					this.lodingEnd = true;
					this.storeData = res;

					// 拆解数据
					res.menu.forEach((ele,i)=>{

						// 拆解区域数据
						this.foodsData.areaData.push({
							name:ele.name,
							description:ele.description,
							id:ele.id,
							start:this.foodsData.list.length,
							end:ele.foods.length + this.foodsData.list.length
						})

						// 拆解商品数据
						ele.foods.forEach((e,j)=>{
							e.index = this.foodsData.list.length;
							this.foodsData.list.push(e);
						})

					})

					// 动态插入商品列表数据
					this.foodsPage()

					// 	this.foodsData.end += this.foodsListUpdateSize;
					// },1000)
					// console.log(this.foodsData.areaData);
					// console.log(this.foodsData.list);
					// console.log(this.foodsData);
				
					this.storeId?this.storeData.rst.id = this.storeId:'';

					// 判断当前店铺是否有购物车数据存储在公共区域
					let cartList = mapState.cartList || this.cartList;
					if(cartList[this.storeData.rst.id]){
						this.shopCart = cartList[this.storeData.rst.id];
					}

			},(err)=>{console.log('请求失败：',err);});
			
			// 请求店铺评论数据
			this.$http.get.store_comment().then((res)=>{
				this.storeCommentData = res;
				this.commentInfoList = res.comments;
			},(err)=>{console.log('请求失败：',err);});
		}
		,
		methods: {
			...mapMutations([
				'ADD_CART',
				'REMOVE_CART'
			])
			,
			goBack(){
				// 判断当前页面栈中是否还有上一级的页面没有的话就直接返回主页

				if(getCurrentPages().length <= 1){
					uni.switchTab({
						 url: '/pages/index/index',
						 fail(e) {
							 console.log('跳转失败',e);
						 }
					});
				}else{
					uni.navigateBack({
						 delta: 1,
						 fail(e) {
							 console.log('跳转失败',e);
						 }
					});
				}
			}
			,
			/**
			 * 切换当前页面中的分类呈现数据，同时切换当前选中的索引标签
			 * @param {Number} index 当前选择的分类索引值
			 */
			switchComment(index){
				this.pageState.commentTagCur = index;
				// 根据索引值请求接口返回新的数据
				console.log('请求当前索引的数据结果并替换当前渲染数据');

				// 模拟替换过程
				if(JSON.stringify(this.storeCommentData.comments) == JSON.stringify(this.commentInfoList)){
					this.$http.get.store_good_comment().then((res)=>{
						// console.log(res);
						this.commentInfoList = res;
					},(e)=>{
						console.log('请求失败',e);
					})

					return;
				}

				this.commentInfoList = this.storeCommentData.comments;
				
			}
			,
			/**
			 * 查看商品详情弹窗
			 * @param {Object} goods 商品数据
			 */
			showGoodsInfoPopup(goods){
				this.$utils.log('showGoodsInfoPopup','查看商品详情弹窗');
				this.goodsInfoPopupData = goods;
				
				this.openPopup('goodsInfoPopup');
			}
			,
			/**
			 * 控制店铺中的banner展示区的开关
			 * @param {Boolean} status true-显示banner区域 false-关闭banner区域
			 */
			controlBannerPage(status){
				this.$utils.log('controlBannerPage','控制店铺中的banner展示区的开关');
				this.pageState.showBannercontent = status;
			}
			,
			/**
			 * 将兑换的红包加入购物车中
			 * @param {Number} redpackObj 红包对象
			 */
			redpack2shopcart(redpackObj){
				this.$utils.log('redpack2shopcart','将兑换的红包加入购物车中');
				// 当前这个红包已经存在了
				if(JSON.stringify(
						this.shopCart.redpackList
					).includes(
						JSON.stringify(redpackObj)
					)
				) return;
				
				this.shopCart.redpackList.push(redpackObj);
			}
			,
			/**
			 * 兑换红包事件
			 * @param {String} type 兑换那种类型的 normal为普通红包 vip为vip红包
			 * @param {Number} redpackObj 红包对象
			 */
			exchangeRedpack(type,redpackObj){
				this.$utils.log('exchangeRedpack','兑换红包事件');
				// 用户兑现换红包
				
				// 处理vip红包兑换
				if(type == 'vip'){
					
					// 判断是否为会员
					if(this.userInfo.vip){
						// 将红包加入购物车中
						this.redpack2shopcart(redpackObj);
						return;
					} // end if
					
					// 不是vip提示用户开通
					this.openPopup('openSvipPopup');
					
				} // end if vip
				
				if(type == 'normal'){
					// 将兑换按钮转换为兑换成功
					this.redpack2shopcart(redpackObj);
				} // end if normal 
			}
			,
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
			 * 商品列表侧边导航栏点击事件
			 * 点击时切换右侧分类商品位置
			 * @param {Object} e
			 */
			foodsCategoryTabSelect(e) {
				this.$utils.log('foodsCategoryTabSelect','商品列表侧边导航栏点击事件');
				
				this.foodsCategoryTabCur = e.currentTarget.dataset.id;
				this.mainCur = e.currentTarget.dataset.id;
				this.verticalNavTop = (e.currentTarget.dataset.id - 1) * 50
			},
			/**
			 * 商品列表滑动事件监听
			 * 当滑动到下一个分类时自动切换左侧分类
			 * @param {Object} e
			 */
			VerticalMain(e) {


				// 如果此时页面没有滑动到顶部 自动滑动到顶部 
				if(this.$utils.getElementInfo('.store-menu-box') != 0){
					uni.pageScrollTo({
						scrollTop: this.$utils.getElementInfo('.store-index-container').height,
						duration: 0
					});
				}


				// #ifdef MP-ALIPAY
				   return false  //支付宝小程序暂时不支持双向联动 
				// #endif

				// 使商铺列表与tab区域选项卡联动
				let that = this;
				let tabHeight = 0;

				// if (this.load) {
					for (let i = 0; i < this.storeData.menu.length; i++) {
						let view = uni.createSelectorQuery().select("#main-" + i);
						view.fields({
							size: true
						}, data => {
							if(!data) return false;
							this.storeData.menu[i].top = tabHeight;
							tabHeight = tabHeight + data.height;
							this.storeData.menu[i].bottom = tabHeight;
						}).exec();
					}
				// 	this.load = false
				// }

				let scrollTop = e.detail.scrollTop + 10;
				for (let i = 0; i < this.storeData.menu.length; i++) {
					if (scrollTop > this.storeData.menu[i].top && scrollTop < this.storeData.menu[i].bottom) {
						this.verticalNavTop = (i - 1) * 50
						this.foodsCategoryTabCur = i
						// console.log(scrollTop)
						return false
					}
				}
			},
			/**
			 * 商品数据分页插入方法
			 * 将过长的商品数据拆分为多个分段依次插入页面
			 * 采用定时器
			 */
			foodsPage(){
				this.mainCur = 0;
				this.foodsCategoryTabCur = 0;
				// 动态插入商品列表数据
				this.foodsData.timer = setInterval(()=>{
					if(this.foodsData.end >= this.foodsData.list.length){
						clearInterval(this.foodsData.timer);
						return;
					}

					this.foodsData.end += this.foodsListUpdateSize;
				},500)
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import url(./storeIndex.scss);
</style>
