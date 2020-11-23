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
				<text 
				@tap="goBack"
				class="nav-back-btn lg text-white cuIcon-back text-xxl padding-xs"></text>
			</view>
			<!-- nav E -->
			
			<!-- 店铺基础信息 S -->
			<view class="store-base-info padding-lr-xl padding-top-xl flex-direction align-center flex-sub">
				<!-- 店名 -->
				<view 
				@tap="openPopup('storeInfoPopup')"
				class="store-name-box align-center flex-direction padding-lr-sm margin-bottom-xs">
					<view class="align-end margin-bottom-xs">
						<text class="store-name text-cut text-bold text-xxl margin-right-xs">{{storeData.rst.name}}</text>
						<text class="lg text-color-3 cuIcon-playfill"></text>
					</view>
					<view class="text-xs text-color-6">
						<text class="margin-right-xs">评价{{storeData.rst.rating}}</text>
						<text class="margin-right-xs">月售{{storeData.rst.recent_order_num}}</text>
						<text>商家配送约{{storeData.rst.order_lead_time}}分钟</text>
					</view>
				</view>
				
				<!-- 红包 -->
				<view 
				@tap="openPopup('redpackPopup')"
				class="red-packets-list justify-around margin-top-xs margin-bottom-sm">
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
				<view 
				@tap="openPopup('saleActPopup')"
				class="sale-box justify-between margin-bottom-sm">
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
					<view 
					v-show="TabCur == 1"
					class="flex-sub flex-direction bg-grey-f5">
					<!--  #endif -->
					<!--  #ifdef  MP-WEIXIN -->
					<view 
					v-if="TabCur == 1"
					class="flex-sub flex-direction bg-grey-f5">
					<!--  #endif -->
					
					
						<!-- 顶部店铺评分栏 S -->
						<view class="align-center justify-around flex-sub text-color-6 padding-top-lg padding-bottom-xl bg-white margin-bottom-sm">
							<!-- 店铺评分 -->
							<text class="rating text-sl text-color-orange"
							>
								{{storeCommentData.rating.fixedShopScore}}
							</text>
							
							<!-- 店铺星级 -->
							<view class="flex-direction">
								<text class="margin-bottom-xs">商家评分</text>
								
								<!-- star S -->
								<view class="star-box star-size">
									<view class="star-bg">
										<image class="star-size" :src="$i_u.star_bg" mode="left"></image>
									</view>
									<view 
									class="star"
									:style="{width:parseInt(120 * (parseFloat(storeCommentData.rating.fixedShopScore).toFixed(1)/5)) + 'rpx'}"
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
							
							<view class="border-right border-color-e">
								<!-- 味道评分 -->
								<view class="flex-direction align-center padding-lr">
									<text class="text-xs margin-bottom-xs">味道</text>
									<text class="text-xxl">{{storeCommentData.rating.fixedTasteScore}}</text>
								</view>
								
								<!-- 包装评分 -->
								<view class="flex-direction align-center padding-lr">
									<text class="text-xs margin-bottom-xs">包装</text>
									<text class="text-xxl">{{storeCommentData.rating.fixedPackageScore}}</text>
								</view>
							</view>
							
							<!-- 配送评分 -->
							<view class="flex-direction align-cente padding-lr">
								<text class="text-xs margin-bottom-xs">配送</text>
								<text class="text-xxl">{{storeCommentData.rating.fixedRiderScore}}</text>
							</view>
						</view>
						<!-- 顶部店铺评分栏 E -->
						
						<!-- 用户评论区 S -->
						<view class="comment-content-box bg-white flex-direction">
							
							<!-- 评论标签 S -->
							<view class="comment-tag-list padding-sm flex-wrap">
								
								<view 
								@tap="switchComment(index)"
								class="comment-tag-item padding-tb-xs padding-lr-sm comment-tag-bg border-radius-6 text-sm"
								v-for="(item,index) in storeCommentData.tags"
								:key="index"
								:class="[
									index == pageState.commentTagCur ? 'cur' : '',
									item.unsatisfied ? 'bad' : ''
								]"
								>
									<text>{{item.name}} {{item.count > 0 ? item.count : ''}}</text>
								</view>
								
							</view>
							<!-- 评论标签 E -->
							
							<!-- 查看有内容评价开关 S -->
							<view class="padding-tb-sm padding-lr border-top border-color-e align-center">
								<text 
								class="lg cuIcon-roundcheckfill margin-right-xs"
								:class="pageState.showHasContentCommentOnly ? 'icon-color-76d572' : 'icon-color-e8'"
								></text>
								<text class="">只看有内容的评价</text>
							</view>
							<!-- 查看有内容评价开关 E -->
							
							<!-- 用户评论列表 S -->
							<view class="comment-list flex-direction">
								
								<view 
								v-for="(item,index) in commentInfoList"
								:key="index"
								class="comment-item border-top border-color-e padding-sm flex-sub"
								:class="foodsFilter(item.food_ratings)?'':'padding-bottom-xl'"
								>
									
									<!-- 用户头像 -->
									<view class="user-avatar-box margin-right round">
										<image 
										class="user-avatar"
										:src="item.avatar|userAvatarUrlFilter" 
										mode="widthFix"
										></image>
									</view>
									
									<!-- 评论内容 -->
									<view class="comment-content flex-direction flex-sub">
										
										<view class="comment-content-head flex-direction margin-bottom-xs">
											
											<view class="justify-between margin-bottom-xs">
												<text>{{item.username}}</text>
												<text class="text-color-9 text-sm">{{item.rated_at}}</text>
											</view>
											
											<view class="align-center">
												
												<!-- star S -->
												<view class="star-box star-size margin-right-xs">
													<view class="star-bg">
														<image class="star-size" :src="$i_u.star_bg" mode="left"></image>
													</view>
													<view 
													class="star"
													:style="{
														width:parseInt((120 * item.rating)/5) + 'rpx'
													}"
													>
														<image 
														class="star-size" 
														:src="$i_u.star" 
														mode="left"
														></image>
													</view>
												</view>
												<!-- star E -->
												
												<text
												class="text-sm"
												:class="item.rating<5?'bad':'super-good'"
												>
													{{item.rating|rating2text}}
												</text>
											</view>
											
										</view>
										
										<view class="comment-content-body flex-direction">
											<!-- 文本评论 -->
											<view class="comment-content-text margin-bottom-xs">
												<text>{{item.rating_text}}</text>
											</view>
											
											<!-- 商家回复 -->
											<view 
											v-if="item.reply"
											class="store-reply-box padding-sm text-sm margin-tb-sm border-radius-6">
												<text>商家回复：{{item.reply.content}}</text>
											</view>
											
											<!-- 图片列表 -->
											<view 
											v-if="item.order_images"
											class="comment-content-img-list flex-wrap flex-sub">
												<view 
												v-for="(ele,i) in item.order_images"
												:key="i"
												:style="{
													height:item.order_images.length > 4 ? '196rpx' : '300rpx',
													width:item.order_images.length > 4 ? '196rpx' : '300rpx'
												}"
												class="comment-content-img-item margin-right-xs margin-bottom-xs">
													<image 
													:src="ele.image_hash,(item.order_images.length > 4?'w_196':'w_300')|imgUrlFilter" 
													mode="widthFix"></image>
												</view>
											</view>
											
											<!-- 单件商品点赞 -->
											<view 
											v-if="foodsFilter(item.food_ratings)"
											class="good-goods-tag-list align-center flex-wrap">
												<text class="lg text-gray cuIcon-appreciate"></text>
												<view 
												v-for="(ele,i) in foodsFilter(item.food_ratings)"
												:key="i"
												class="good-goods-tag-item padding-xs text-sm border-radius-6">
													<text>{{ele.rate_name}}</text>
												</view>
											</view>
											
										</view>
										
									</view>
									
								</view>
								
							</view>
							
							<!-- 加载提示 S -->
							<view 
							class="list-end align-center justify-center">
								<view class="cu-load" :class="commentHasNext?'loading':'over'"></view>
							</view>
							<!-- 加载提示 E -->
							<!-- 用户评论列表 E -->
							
						</view>
						<!-- 用户评论区 E -->
						
					</view>
					<!-- 评价 E -->
					
					<!-- 详细信息 S -->
					<!--  #ifndef  MP-WEIXIN -->
					<view 
					v-show="TabCur == 2"
					class="flex-sub flex-direction bg-grey-f5">
					<!--  #endif -->
					<!--  #ifdef  MP-WEIXIN -->
					<view 
					v-if="TabCur == 2"
					class="flex-sub flex-direction bg-grey-f5">
					<!--  #endif -->
					
					
						<!-- 配送信息 -->
						<view class="margin-bottom bg-white padding flex-direction">
							<text class="text-bold text-color-0 margin-bottom-sm">配送信息</text>
							<view class="flex-direction">
								<text class="margin-bottom-xs">由商家配送提供配送，约{{storeData.rst.order_lead_time}}分钟送达，距离{{storeData.rst.distance_text}}</text>
								<text class="margin-bottom-sm">配送费￥{{storeData.rst.float_delivery_fee}}</text>
							</view>
						</view>
						
						<!-- 商家服务 -->
						<view class="margin-bottom bg-white padding flex-direction padding-bottom-xl">
							<text class="text-bold text-color-0 margin-bottom-sm">商家服务</text>
							<view class="supports-list">
								
								<view 
								v-for="(item,index) in storeData.rst.supports"
								:key="index"
								class="supports-item marging-bottom-xs align-center"
								:style="{color:'#'+item.icon_color}"
								>
									<text 
									class="supports-tag padding-lr-xs border border-color-9 text-xs margin-right-xs"
									>
										{{item.icon_name}}
									</text>
									<text>{{item.description}}</text>
								</view>
								
							</view>
						</view>
						
						<!-- 商家实景 -->
						<view class="margin-bottom bg-white padding flex-direction">
							<text class="text-bold text-color-0 margin-bottom-sm">商家实景</text>
							<view class="store-img-list">
								
								<view 
								v-for="(item,index) in storeData.rst.albums"
								:key="index"
								class="store-img-box">
									<image 
									class="store-img"
									:src="item.photos[0].image_hash|imgUrlFilter" 
									mode="widthFix"
									></image>
									<text class="store-img-tips text-white">{{item.name}}{{item.count}}张</text>
								</view>
								
							</view>
							
						</view>
						
						<!-- 商家信息 -->
						<view class="margin-bottom bg-white padding flex-direction">
							<text class="text-bold text-color-0 margin-bottom-sm">商家信息</text>
							<view class="padding-bottom-sm border-bottom border-color-e">
								<text>{{storeData.rst.description}}</text>
							</view>
							
							<view class="padding-tb border-bottom border-color-e justify-between">
								<text class="text-bold text-color-3">品类</text>
								<text>{{storeData.rst.flavors[0].name}}</text>
							</view>
							
							<view 
							@tap="makePhoneCall(storeData.rst.id)"
							class="padding-tb border-bottom border-color-e justify-between">
								<text class="text-bold text-color-3">商家电话</text>
								<view class="text-color-blue-0 align-center">
									<text class="lg cuIcon-phone margin-right-xs text-xl"></text>
									<text>联系商家</text>
								</view>
							</view>
							
							<view class="padding-tb border-bottom border-color-e justify-between">
								<text class="text-bold text-color-3">地址</text>
								<view class="store-address">
									<text class="text-right text-xs">{{storeData.rst.address}}</text>
								</view>
							</view>
							
							<view class="padding-tb border-bottom border-color-e justify-between">
								<text class="text-bold text-color-3">营业时间</text>
								<view class="">
									<text>{{storeData.rst.opening_hours[0].replace('/','-')}}</text>
								</view>
							</view>
							
							
						</view>
						
						<!-- 营业资质 -->
						<view 
						@tap="gotoCertificatesPage"
						class="margin-bottom bg-white padding flex-direction">
							<text class="text-bold text-color-0">营业资质</text>
						</view>
							
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

	// 引入购物车 和 弹窗组件相关的 mixin
	import {shopcartMixin,popupMixin} from "@/common/mixinMain.js";
	
	export default {
		data() {
			return {
				storeId: null, // 测试用店铺id因为没有多的店铺数据，所以通过修改店铺id来模拟多家的店铺
				storeData:{}, // 店铺数据
				storeCommentData:{}, // 店铺总评论数据包含分类标签及各种评分
				commentInfoList:[], // 评论列表数据只有单独的评论数据
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
		mixins:[shopcartMixin,popupMixin],
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
			bannerPopup
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
		},
		filters:{
			userAvatarUrlFilter(imgHash,size='w_30,h_30,m_fixed'){
				
				if(imgHash){
					return 'https://cube.elemecdn.com/' + imgHash[0] + '/' + imgHash.slice(1, 3) + '/' + imgHash.slice(3) + '.' + (imgHash.slice(-3) == 'png' ? 'png' : imgHash.slice(-4)) +'?x-oss-process=image/format,webp/resize,' + size;
				}else{
					return '//shadow.elemecdn.com/faas/h5/static/sprite.3ffb5d8.png';
				}
			},
			rating2text(rating){
				let ratingTextList = ['吐槽','较差','一般','很好','超赞'];
				
				return ratingTextList[parseInt(rating)-1];
			}
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
			 * 跳转至店铺资质页
			 */
			gotoCertificatesPage(){
				uni.navigateTo({
					 url: this.$pages_path.file,
					 fail(e) {
						 console.log('跳转失败',e);
					 }
				});
			}
			,
			/**
			 * 唤起拨号键盘准备打电话给商家
			 * @param {String} storeId 商品id
			 */
			makePhoneCall(storeId){
				// 模拟查询过程
				setTimeout(()=>{
					let phoneNumber = '123456';

					uni.makePhoneCall({
						phoneNumber,
						fail(e) {
							console.log('唤起失败',e);
							uni.showToast({
								title: '调用电话功能失败请手动呼叫商家',
								icon:'none'
							});
						}
					})
				},200)
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
			 * 用户选择开通超级vip
			 */
			openSvip(){
				this.$utils.log('openSvip','用户选择开通超级vip');
				uni.navigateTo({
					url:this.$pages_path.member,
					fail(e) {
						console.log('跳转失败:',e);
					}
				})
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
			/**
			 * 点赞商品过滤器，将点赞商品中5星的过滤出来
			 * @param {Array} foodList 点赞食品列表
			 */
			foodsFilter(foodList){
				// this.$utils.log('foodsFilter','点赞商品过滤器，将点赞商品中5星的过滤出来');
				let res = foodList.filter((ele)=>{
					return ele.rating >= 5;
				});
				return res.length?res:null;
			},
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
