<template>
	<view class="store-index-container flex-direction">
		<!-- 数据加载完成前显示 S -->
		<view 
		v-show="!lodingEnd"
		class="loding">
			<image 
			:style="{width:'750rpx'}"
			:src="$i_u.lodding_bg" 
			mode="widthFix"></image>
		</view>
		<!-- 数据加载完成前显示 E -->
		
		<!-- 数据加载完成后显示 S -->
		<view 
		v-if="lodingEnd"
		v-show="!pageState.showBannercontent"
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
					<view 
					v-show="TabCur == 0"
					class="flex-direction">
						<!-- 广告 -->
						<view 
						@tap="controlBannerPage(true)"
						class="banner padding-lr margin-top-xs margin-bottom">
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
									@tap="showFoodTasteChoosePopup(item)"
									class="border-radius-6"
									:src="item.image_path,'w_240'|imgUrlFilter" 
									mode="widthFix"
									></image>
									
									<view 
									@tap="showGoodsInfoPopup(item)"
									class="flex-direction">
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
											<view class="align-center">
												<text
												class="text-sm text-color-6 margin-right-xs"
												v-if="item.min_purchase>1&&!shopCart.foodsList[item.item_id]"
												>{{item.min_purchase}}份起售</text>
												<view class="add-remove-box align-center">
													<text 
													v-if="shopCart.foodsList[item.item_id]"
													@tap.stop.prevent="cutFromCart(item)"
													class="lg add-btn-blue text-xxl cuIcon-rounddown"></text>
													
													<text 
													v-if="shopCart.foodsList[item.item_id]"
													class="text-cut goods-number"
													>{{shopCart.foodsList[item.item_id].count}}</text>
													
													<text 
													@tap.stop.prevent="item.attrs.length?showFoodTasteChoosePopup(item):add2cart(item)"
													class="lg add-btn-blue text-xxl cuIcon-roundaddfill"
													></text>
												</view>
											</view>
											
										</view>
									</view>
									
								</view>
								
							</scroll-view>
						</view>
					
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
										v-for="(item,index) in storeData.menu" 
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
									>
										<!-- 菜单分区 -->
										<view 
										class="padding-lr flex-direction flex-sub" 
										v-for="(item,index) in storeData.menu" 
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
												v-for="(ele,i) in item.foods"
												:key="'cu-item'+i"
												@tap="showGoodsInfoPopup(ele)"
												class="cu-item flex-sub align-start margin-bottom-lg">
													
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
							
							<!-- 底部购物车 S -->
							<view 
							@tap="shopCart.count?showShopCartPopup():''"
							class="shopping-cart-box justify-between align-center"
							:style="{zIndex:11}"
							>
								<!-- 
								 存在两种状态
								 1.无商品状态
								 2.有商品状态
								 -->
								 
								<!-- 节省金额提示 S -->
								<view 
								v-show="shopCartPriceCount.save_money&&!pageState.shopCartOpenState"
								class="save-money-tips flex-sub align-center justify-center text-xs text-color-3">
									<text>已减{{shopCartPriceCount.save_money}}元</text>
								</view>
								<!-- 节省金额提示 E -->
								
								<!-- 购物车图标 -->
								<view 
								class="shopping-cart-icon-box round border border-xl align-center justify-center"
								:style="{backgroundColor:shopCart.count?'':'#363636'}"
								>
									<text 
									class="lg text-xxl cuIcon-cartfill"
									:class="shopCart.count?'text-white':'text-color-6'"
									></text>
									<view 
									v-show="shopCart.count"
									class="cu-tag badge">{{shopCart.count}}</view>
								</view>
								
								<!-- 选购商品提示 -->
								<view 
								class="shopping-cart-tips-box flex-direction text-scale-9"
								:class="'text-color-9'"
								>
								
									<view 
									v-if="shopCart.count"
									class="align-center">
										<text class="text-price text-bold text-white text-xl margin-right">{{shopCartPriceCount.price}}</text>
										<text class="text-price delete-line text-color-9">{{shopCartPriceCount.origin_price}}</text>
									</view>
									
									<text 
									v-if="!shopCart.count"
									class="text-lg"
									>
										未选购商品
									</text>
									
									
									<text class="text-xs">另需配送费{{parseInt(storeData.rst.float_delivery_fee)}}元</text>
								</view>
								
								<!-- 结算按钮 -->
								<view 
								@tap.stop.prevent="
									shopCartPriceCount.price >= storeData.rst.float_minimum_order_amount ? 
									gotoPayPage() : '' "
								class="shopping-cart-pay-btn-box text-white align-center justify-center"
								:style="{backgroundColor:shopCartPriceCount.price >= storeData.rst.float_minimum_order_amount?'':'#535356'}"
								>
									<text 
									v-show="shopCartPriceCount.price >= storeData.rst.float_minimum_order_amount"
									class="text-lg">去结算</text>
									
									<text 
									v-show="shopCartPriceCount.price < storeData.rst.float_minimum_order_amount"
									class="text-lg"
									>{{shopCartPriceCount.price?'差':''}}¥{{parseInt(storeData.rst.float_minimum_order_amount - shopCartPriceCount.price)}}起送</text>
								</view>
								
							</view>
							<!-- 底部购物车 E -->
							
						</view>
						
					</view>
					<!-- 点餐 E -->
					
					<!-- 评价 S -->
					<view 
					v-show="TabCur == 1"
					class="flex-sub flex-direction bg-grey-f5">
					
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
					<view 
					v-show="TabCur == 2"
					class="flex-sub flex-direction bg-grey-f5">
					
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
			
			
			
		</view>
		<!-- 数据加载完成后显示 E -->
		
		<!-- banner弹窗 S -->
		<view 
		v-if="pageState.showBannercontent"
		:style="{paddingBottom:'100rpx'}"
		class="banner-content-box flex-direction">
			
			<!-- nav S -->
			<view class="store-index-nav">
				<view class="store-cover-bg-box">
					<image 
					class="store-cover-bg"
					:src="storeData.rst.shop_sign.image_hash,'w_750'|imgUrlFilter"
					mode="widthFix"></image>
				</view>
				<text 
				@tap="controlBannerPage(false)"
				class="nav-back-btn lg text-white cuIcon-back text-xxl padding-xs"></text>
			</view>
			<!-- nav E -->
			
			<view class="banner-list flex-wrap flex-sub padding-tb">
				
				<view 
				v-for="(item,index) in storeData.recommend[0].items"
				:key="index"
				class="banner-item flex-direction border-radius-6 margin-left-sm margin-bottom-sm"
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
						<view class="align-center">
							<text
							class="text-sm text-color-6 margin-right-xs"
							v-if="item.min_purchase>1&&!shopCart.foodsList[item.item_id]"
							>{{item.min_purchase}}份起售</text>
							<view class="add-remove-box align-center">
								<text 
								v-if="shopCart.foodsList[item.item_id]"
								@tap="cutFromCart(item)"
								class="lg add-btn-blue text-xxl cuIcon-rounddown"></text>
								
								<text 
								v-if="shopCart.foodsList[item.item_id]"
								class="text-cut goods-number"
								>{{shopCart.foodsList[item.item_id].count}}</text>
								
								<text 
								@tap="item.attrs.length?showFoodTasteChoosePopup(item):add2cart(item)"
								class="lg add-btn-blue text-xxl cuIcon-roundaddfill"
								></text>
							</view>
						</view>
					</view>
				</view>
				
				
			</view>
			
			<!-- 加载提示 S -->
			<view 
			class="list-end align-center justify-center">
				<view class="cu-load" :class="bannerDataHasNext?'loading':'over'"></view>
			</view>
			<!-- 加载提示 E -->
			
			<!-- 底部购物车 S -->
			<view 
			@tap="shopCart.count?showShopCartPopup():''"
			class="shopping-cart-box justify-between align-center">
				<!-- 
				 存在两种状态
				 1.无商品状态
				 2.有商品状态
				 -->
				 
				<!-- 节省金额提示 S -->
				<view 
				v-show="shopCartPriceCount.save_money&&!pageState.shopCartOpenState"
				class="save-money-tips flex-sub align-center justify-center text-xs text-color-3">
					<text>已减{{shopCartPriceCount.save_money}}元</text>
				</view>
				<!-- 节省金额提示 E -->
				
				<!-- 购物车图标 -->
				<view 
				class="shopping-cart-icon-box round border border-xl align-center justify-center"
				:style="{backgroundColor:shopCart.count?'':'#363636'}"
				>
					<text 
					class="lg text-xxl cuIcon-cartfill"
					:class="shopCart.count?'text-white':'text-color-6'"
					></text>
					<view 
					v-show="shopCart.count"
					class="cu-tag badge">{{shopCart.count}}</view>
				</view>
				
				<!-- 选购商品提示 -->
				<view 
				class="shopping-cart-tips-box flex-direction text-scale-9"
				:class="'text-color-9'"
				>
				
					<view 
					v-if="shopCart.count"
					class="align-center">
						<text class="text-price text-bold text-white text-xl margin-right">{{shopCartPriceCount.price}}</text>
						<text class="text-price delete-line text-color-9">{{shopCartPriceCount.origin_price}}</text>
					</view>
					
					<text 
					v-if="!shopCart.count"
					class="text-lg"
					>
						未选购商品
					</text>
					
					
					<text class="text-xs">另需配送费{{parseInt(storeData.rst.float_delivery_fee)}}元</text>
				</view>
				
				<!-- 结算按钮 -->
				<view 
				@tap.stop.prevent="
									shopCartPriceCount.price >= storeData.rst.float_minimum_order_amount ? 
									gotoPayPage() : '' "
				class="shopping-cart-pay-btn-box text-white align-center justify-center"
				:style="{backgroundColor:shopCartPriceCount.price >= storeData.rst.float_minimum_order_amount?'':'#535356'}"
				>
					<text 
					v-show="shopCartPriceCount.price >= storeData.rst.float_minimum_order_amount"
					class="text-lg">去结算</text>
					
					<text 
					v-show="shopCartPriceCount.price < storeData.rst.float_minimum_order_amount"
					class="text-lg"
					>{{shopCartPriceCount.price?'差':''}}¥{{parseInt(storeData.rst.float_minimum_order_amount - shopCartPriceCount.price)}}起送</text>
				</view>
				
			</view>
			<!-- 底部购物车 E -->
			
			
		</view>
		<!-- banner弹窗 E -->

		
		<!-- 页面弹窗组件 S -->
		<view
		v-if="lodingEnd"
		>
			<!-- 店铺信息弹窗 S -->
			<uni-popup
			ref="storeInfoPopup" 
			:type="'center'"
			@change="popupChange"
			:animation="true"
			id="store-info-popup-box"
			>
				<!-- 弹窗填充内容 -->
				<view class="store-info-popup-box flex-direction align-center">
					
					<!-- 弹窗主体 -->
					<view class="bg-white border-radius-10 flex-direction align-center padding-bottom-xl padding-top-sm">
						<!-- 店铺名称 -->
						<view class="padding-lr-sm flex-wrap text-center padding">
							<text class="text-color-3 text-bold text-xxl margin-right-xs">{{storeData.rst.name}}</text>
						</view>
						
						<!-- 基础信息 -->
						<view 
						:style="{width:'100%'}"
						class="align-end justify-around padding-lr-xs">
							
							<!-- 评分 -->
							<view class="flex-direction align-center">
								<text class="text-color-3 margin-bottom-xs text-bold text-lg">{{storeData.rst.rating}}</text>
								<text class="text-xs text-color-9">评分</text>
							</view>
							
							<!-- 月售 -->
							<view class="flex-direction align-center">
								<text class="text-color-3 margin-bottom-xs text-bold text-lg">{{storeData.rst.recent_order_num}}单</text>
								<text class="text-xs text-color-9">月售</text>
							</view>
							
							<!-- 商家配送 -->
							<view class="flex-direction align-center">
								<text class="text-color-3 margin-bottom-xs text-bold text-lg">商家配送</text>
								<text class="text-xs text-color-9">约{{storeData.rst.order_lead_time}}分钟</text>
							</view>
							
							<!-- 配送费 -->
							<view class="flex-direction align-center">
								<text class="text-color-3 margin-bottom-xs text-bold text-lg">{{storeData.rst.float_delivery_fee}}元</text>
								<text class="text-xs text-color-9">配送费</text>
							</view>
							
							<!-- 距离 -->
							<view class="flex-direction align-center">
								<text class="text-color-3 margin-bottom-xs text-bold text-lg">{{storeData.rst.distance_text}}</text>
								<text class="text-xs text-color-9">距离</text>
							</view>
							
						</view>
						
						<!-- 公告 -->
						<view class="flex-direction align-center">
							
							<view class="announcement justify-center padding">
								<text class="text-color-9 text-sm bg-white">公告</text>
							</view>
							<text>{{storeData.rst.promotion_info}}</text>
						</view>
					</view>
					
					<!-- 关闭按钮 -->
					<text 
					@tap="closePopup('storeInfoPopup')"
					class="margin-top-xl lg text-gray cuIcon-roundclose text-sl"></text>
					
				</view>
				
			</uni-popup>
			<!-- 店铺信息弹窗 E -->
			
			<!-- 红包信息弹窗 S -->
			<uni-popup
			ref="redpackPopup" 
			:type="'bottom'"
			@change="popupChange"
			:animation="true"
			>
				<!-- 弹窗主体 -->
				<view 
				:style="{width:'750rpx'}"
				class="flex-direction bg-grey-f5">
				
					<!-- 顶部标题 -->
					<view class="padding align-center">
						<view class="text-black flex-sub justify-center text-bold text-xl">
							<text>店铺专享红包</text>
						</view>
						<text 
						@tap="closePopup('redpackPopup')"
						class="lg text-gray cuIcon-close text-xxl"></text>
					</view>
					
					<!-- 滑动红包列表 -->
					<scroll-view 
					scroll-y="true" 
					:style="{height:'567rpx'}"
					class="padding-lr"
					>
						<!-- 会员红包 -->
						<view 
						v-if="redpackFilter(storeData.redpack).member.length"
						class="flex-direction">
							<!-- 标题 -->
							<view class="text-xs margin-bottom-sm">
								<text class="text-bold text-color-6 margin-right-xs">超级会员特权</text>
								<text class="text-color-9">限超级会员用户兑换</text>
							</view>
							<!-- 红包列表 -->
							<view class="redpack-list flex-direction">
								
								<view 
								v-for="(item,index) in redpackFilter(storeData.redpack).member"
								:key="index"
								class="redpack-item card-round-icon member-redpack-item-bg justify-between padding-tb-sm align-center margin-bottom-sm">
									<view class="align-center">
										<text 
										class="text-price redpack-price text-bold text-color-brown margin-lr"
										>{{item.value}}</text>
										<view class="flex-direction">
											<view class="text-bold text-color-brown margin-bottom-xs align-center">
												<text class="lg text-yellow cuIcon-crownfill margin-right-xs"></text>
												<text>满任意金额可用</text>
											</view>
											<text 
											:style="{color:'#735b27'}"
											class="text-xs"
											>限本店使用, 2020-06-16到期</text>
										</view>
									</view>
									<view class="redpack-btn-box align-center justify-center padding-lr padding-tb-lg border-left border-color-e">
										<text 
										v-if="!redpackInShopcart(item)"
										@tap="exchangeRedpack('vip',item)"
										class="padding-lr padding-tb-xs app-bg-brown round ">兑换</text>
										<image 
										v-if="redpackInShopcart(item)"
										:src="$i_u.exchange_redpack_success" 
										mode="widthFix"></image>
									</view>
								</view>
								
							</view>
						</view>
						
						<!-- 店铺红包  -->
						
						<!-- 红包列表 -->
						<view 
						v-if="redpackFilter(storeData.redpack).normal.length"
						class="redpack-list flex-direction">
							
							<view 
							v-for="(item,index) in redpackFilter(storeData.redpack).normal"
							:key="index"
							class="redpack-item card-round-icon justify-between padding-tb-sm align-center margin-bottom-sm">
								<view class="align-center">
									<text 
									:style="{color:'#ff5339'}"
									class="text-price redpack-price text-bold margin-lr"
									>{{item.value}}</text>
									<view class="flex-direction">
										<view class="text-bold text-color-3 margin-bottom-xs align-center">
											<text>{{item.title_detail}}</text>
										</view>
										<text 
										class="text-xs text-color-6"
										>限本店使用, 2020-06-16到期</text>
									</view>
								</view>
								<view class="redpack-btn-box align-center justify-center padding-lr padding-tb-lg border-left border-color-e">
									<text 
									v-if="!redpackInShopcart(item)"
									@tap="exchangeRedpack('normal',item)"
									class="padding-lr padding-tb-xs app-bg-red round ">领取</text>
									<image 
									v-if="redpackInShopcart(item)"
									:src="$i_u.exchange_redpack_success" 
									mode="widthFix"></image>
								</view>
							</view>
								
						</view>
						
					</scroll-view>
					
				</view>
				
			</uni-popup>
			<!-- 红包信息弹窗 E -->
			
			<!-- 超级会员开通弹窗 S -->
			<uni-popup
			ref="openSvipPopup" 
			:type="'center'"
			@change="popupChange"
			:animation="true"
			>
				<view 
				:style="{width:'640rpx'}"
				class="bg-white flex-direction border-radius-10 align-center">
				
					<!-- 顶部标签 -->
					<view class="svip-popup-title-box">
						<!-- 背景图片 -->
						<image 
						class="svip-popup-title-bg"
						src="/static/image/open-svip-title.png" 
						mode="widthFix"></image>
					</view>
					
					<!-- 展示图片 -->
					<view class="sale-value-box">
						<image 
						class="sale-value-bg"
						src="/static/image/open-svip-bg.png" 
						mode="widthFix"></image>
						<view class="sale-value-text flex-direction align-center">
							<text class="text-white text-lg margin-top-sm">本单立享</text>
							<text 
							:style="{color:'#7d490f'}"
							class="text-price text-sl text-bold margin-top">7</text>
						</view>
					</view>
					
					<!-- 超级会员介绍 -->
					<text class="svip-popup-info-box flex-wrap margin-tb">
						<text class="text-color-6">开通会员每月领至少20元无门槛红包平均每年</text><text class="text-color-price">可省785元</text>
					</text>
					
					<!-- 开通 放弃 按钮 -->
					<view class="svip-popup-btn-box justify-around margin-bottom">
						<button 
						@click="closePopup('openSvipPopup')"
						class="svip-popup-btn svip-popup-btn-giveup" type="default">放弃优惠</button>
						<button 
						@click="openSvip"
						class="svip-popup-btn svip-popup-btn-open" type="default">立即开通</button>
					</view>
					
					
				</view>
			</uni-popup>
			<!-- 超级会员开通弹窗 E -->
			
			
			<!-- 优惠活动弹窗 S -->
			<uni-popup
			ref="saleActPopup" 
			:type="'bottom'"
			@change="popupChange"
			:animation="true"
			>
				<!-- 弹窗主体 -->
				<view 
				:style="{width:'750rpx'}"
				class="flex-direction bg-grey-f5">
				
					<!-- 顶部标题 -->
					<view class="padding align-center">
						<view class="text-black flex-sub justify-center text-bold text-xl">
							<text>优惠活动</text>
						</view>
						<text 
						@tap="closePopup('saleActPopup')"
						class="lg text-gray cuIcon-close text-xxl"></text>
					</view>
					
					<!-- 滑动红包列表 -->
					<scroll-view 
					scroll-y="true" 
					:style="{height:'380rpx'}"
					class="padding-lr"
					>
						<!-- 优惠活动列表 -->
						<view class="flex-direction">
							<view 
							v-for="(e,i) in storeData.rst.activities"
							:key="e.id"
							class="align-start margin-tb-xs">
								<text class="radius active-tag text-xs margin-right-xs border text-scale-9 padding-lr-xs"
								:style="{color:e.text_color,borderColor:e.border}"
								>{{e.icon_name}}</text>
								<text
								class="text-color-6"
								:style="{width:'580rpx'}"
								>{{e.tips}}</text>
							</view>
						</view>
						
					</scroll-view>
					
				</view>
				
			</uni-popup>
			<!-- 优惠活动弹窗 E -->
			
			<!-- 商品大图介绍 S -->
			<uni-popup
			ref="goodsInfoPopup" 
			:type="'bottom'"
			@change="popupChange"
			:animation="true"
			:zIndex="10"
			>
				<view 
				v-if="goodsInfoPopupData"
				class="flex-direction bg-white"
				:style="{height:'100vh',width:'750rpx'}"
				>
					<!-- 顶部大图展示区 -->
					<view class="goods-cover-box">
						<image 
						class="goods-cover"
						:src="goodsInfoPopupData.image_path,'w_376,h_376'|imgUrlFilter" 
						mode="widthFix"
						></image>
						<text 
						@tap="closePopup('goodsInfoPopup')"
						class="goods-cover-icon lg text-white cuIcon-close text-xxl"></text>
					</view>
					
					<!-- 商品介绍区 -->
					<view class="flex-direction padding">
						
						<text class="margin-bottom-sm text-bold text-xxl text-color-0">{{goodsInfoPopupData.name}}</text>
						
						<view class="margin-bottom-sm text-xs">
							<text class="margin-right-xs">月售{{goodsInfoPopupData.month_sales}}份</text>
							<text class="">好评率{{goodsInfoPopupData.satisfy_rate_text?goodsInfoPopupData.satisfy_rate_text:0}}%</text>
						</view>
						
						<view class="margin-bottom-sm align-center justify-between">
							
							<view class="align-center">
								<text class="text-price text-color-price text-lg margin-right-sm">{{goodsInfoPopupData.price}}</text>
								<text class="delete-line text-price text-color-9">{{goodsInfoPopupData.origin_price}}</text>
								<text 
								class="sale-tag padding-lr-xs border-radius-3 text-scale-8"
								:style="{color:'#eb6551'}"
								>{{goodsInfoPopupData.discount_rate}}折</text>
								<text
								v-if="goodsInfoPopupData.activity"
								class="text-xs"
								:style="{color:'#f07373'}"
								>{{goodsInfoPopupData.activity.applicable_quantity_text}}</text>
							</view>
							
							<view class="add-remove-box align-center">
								<text 
								v-if="shopCart.foodsList[goodsInfoPopupData.item_id]"
								@tap="cutFromCart(goodsInfoPopupData)"
								class="lg add-btn-blue text-xxl cuIcon-rounddown"></text>
								
								<text 
								v-if="shopCart.foodsList[goodsInfoPopupData.item_id]"
								class="text-cut goods-number"
								>{{shopCart.foodsList[goodsInfoPopupData.item_id].count}}</text>
								
								<text 
								@tap="goodsInfoPopupData.attrs.length?showFoodTasteChoosePopup(goodsInfoPopupData):add2cart(goodsInfoPopupData)"
								class="lg add-btn-blue text-xxl cuIcon-roundaddfill"
								></text>
							</view>
							
						</view>
						
						<text class="text-xs margin-bottom-xs">主要原料：其他</text>
						
						<view 
						@tap="goToPriceDescription"
						class="text-xs align-center">
							<text class="">价格说明</text>
							<text class="lg text-gray cuIcon-questionfill"></text>
						</view>
						
					</view>
					
				</view>
			</uni-popup>
			<!-- 商品大图介绍 E -->
			
			<!-- 底部购物车弹窗 S -->
			<uni-popup
			ref="shopCartPopup" 
			:type="'bottom'"
			@change="popupChange"
			:animation="true"
			:zIndex="10"
			>
				<view class="shopcart-popup-box bg-white flex-direction">
					
					<!-- 节省金额提示 S -->
					<view 
					v-show="shopCartPriceCount.save_money"
					class="save-money-tips flex-sub align-center justify-center text-xs text-color-3">
						<text>已减{{shopCartPriceCount.save_money}}元</text>
					</view>
					<!-- 节省金额提示 E -->
					
					<!-- 购物车标题及清空按钮 -->
					<view 
					class="padding align-center justify-between text-color-6"
					:style="{backgroundColor:'#eceff1'}"
					>
						<text class="text-lg">已选商品</text>
						<view 
						@tap="clearShopcart"
						class="align-center">
							<text class="lg cuIcon-delete margin-right-xs"></text>
							<text>清空</text>
						</view>
					</view>
					
					<!-- 商品列表滑动区域 -->
					<scroll-view 
					:scroll-y="true" 
					class="shopcart-list padding-sm"
					>
						<!-- 商品列表 -->
						<view
						v-for="(item,key) in shopCart.foodsList"
						:key="key"
						class="shopcart-item flex-direction"
						>
							<!-- 有类别选项 -->
							<view 
							v-for="(ele,k,index) in item.taste"
							:key="key + k"
							class="justify-between border-bottom border-color-e padding-tb"
							>
								<view class="text-lg align-center">
									
									<view class="flex-direction">
										<text class="text-cut margin-right-xs text-color-3"
										:style="{width:'350rpx'}"
										>{{item.info.name}}</text>
										
										<view class="text-xs text-color-9">
											<text
											v-for="(e,i) in ele.index"
											:key="i"
											>{{item.info.attrs[i].values[e]}}{{_.inRange(i,-1,ele.index.length-1)?'/':''}}
											</text>
										</view>
									</view>
									
									<text class="delete-line text-xs text-price margin-right-xs">{{((item.info.origin_price * 100 )*item.count)/100}}</text>
									<text class="text-price text-color-price text-bold">{{goodsTastePriceFilter(item,k,index)}}</text>
								</view>
								
								<view class="add-remove-box align-center">
									<text 
									@tap="cutTasteGoodsFromCart(key,k)"
									class="lg add-btn-blue text-xxl cuIcon-rounddown"></text>
									
									<text 
									class="text-cut goods-number"
									>{{ele.count}}</text>
									
									<text 
									@tap="addTasteGoods2Cart(key,k)"
									class="lg add-btn-blue text-xxl cuIcon-roundaddfill"
									></text>
								</view>
							</view>
							
							<!-- 没有口味/类别选项 -->
							<view 
							v-if="_.isEmpty(item.taste)"
							class="justify-between border-bottom border-color-e padding-tb"
							>
								
								<view class="text-lg align-center">
									<text 
									class="text-cut margin-right-xs text-color-3"
									:style="{width:'350rpx'}"
									>
										{{item.info.name}}
									</text>
									<text class="delete-line text-xs text-price margin-right-xs">{{((item.info.origin_price * 100 )*item.count)/100}}</text>
									<text class="text-price text-color-price text-bold">{{goodsPriceFilter(item)}}</text>
								</view>
								
								<view class="add-remove-box align-center">
									<text 
									@tap="cutFromCart(item.info)"
									class="lg add-btn-blue text-xxl cuIcon-rounddown"></text>
									
									<text 
									class="text-cut goods-number"
									>{{item.count}}</text>
									
									<text 
									@tap="add2cart(item.info)"
									class="lg add-btn-blue text-xxl cuIcon-roundaddfill"
									></text>
								</view>
								
							</view>
						
						</view>
					</scroll-view>
					
				</view>
			</uni-popup>
			<!-- 底部购物车弹窗 E -->
			
			<!-- 商品口味选择 S -->
			<uni-popup
			ref="foodTasteChoosePopup" 
			:type="'bottom'"
			@change="popupChange"
			:animation="true"
			>
				<view 
				v-if="goodsInfoPopupData"
				class="food-taste-box flex-direction bg-white padding"
				>
				
					<!-- 关闭弹窗按钮 -->
					<text 
					@tap="closePopup('foodTasteChoosePopup')"
					class="food-taste-close-btn lg text-grey cuIcon-close text-xxl"></text>
					
					<!-- 商品基本情况 -->
					<view class="margin-bottom">
						<view class="food-cover-box margin-right-sm">
							<image 
							:src="goodsInfoPopupData.image_path,'w_95'|imgUrlFilter" 
							mode="widthFix"></image>
						</view>
						
						<view class="flex-direction justify-between">
							<view class="flex-direction">
								<!-- 商品名称 -->
								<view class="margin-bottom-xs">
									<text class="text-cut text-bold text-lg text-color-0"
									:style="{width:'400rpx'}"
									>{{goodsInfoPopupData.name}}</text>
								</view>
								<!-- 已选口味 -->
								<view 
								v-if="goodsInfoPopupData.attrs.length"
								class="text-xs">
									<text>已选：</text>
									<text
									v-for="(item,index) in goodsInfoPopupData.attrs"
									:key="index"
									>
									{{item.values[goodsTasteData[index]]}}{{( (goodsInfoPopupData.attrs.length > 1) && ((goodsInfoPopupData.attrs.length - 1)>index) ) ? '/' : ''}}
									</text>
								</view>
							</view>
							
							<text class="text-price text-bold text-color-price text-xxl">{{goodsInfoPopupData.price}}</text>
						</view>
					</view>
					
					<!-- 商品种类列表 -->
					<scroll-view 
					:scroll-y="true"
					v-if="goodsInfoPopupData.attrs.length"
					class="flex-direction food-type-list"
					>
						
						<view 
						v-for="(item,index) in goodsInfoPopupData.attrs"
						:key="index"
						class="food-type-item flex-direction">
						
							<!-- 种类名称 -->
							<text class="margin-bottom-sm">{{item.name}}</text>
							
							<!-- 口味列表 -->
							<view 
							class="food-taste-list flex-wrap">
							
								<!-- 
								口味是否被选中机制
									1.如果当前商品存在购物车中那么直接读取购物车中的索引值判断与当前的索引值匹配
									2.如果商品不在购物车中则默认每个商品的第一种口味被选中
									-->
								<view 
								v-for="(ele,i) in item.values"
								:key="i"
								@tap="tasteChoose(index,i)"
								class="food-taste-item padding-lr-xl padding-tb-xs border-color-3 bg-grey-f5 margin-lr-xs margin-bottom-sm"
								:class="i==goodsTasteData[index] ? 'cur' : ''"
								>
									<text>{{ele}}</text>
								</view>
							</view>
							
						</view>
						
					</scroll-view>
					
					<!-- 确定按钮 -->
					<button
						@click="confirmTaste(goodsInfoPopupData)"
					class="confirm-taste-btn margin"
						:style="{backgroundColor: 'rgb(35, 149, 255)',color:'#fff'}"
					type="default">选好了</button>
					
				</view>
			</uni-popup>
			<!-- 商品口味选择 E -->
		</view>
		<!-- 页面弹窗组件 E -->
		
	</view>
</template>

<script>
	/**
	 * @module 店铺主页模块
	 * 用于呈现店铺主页及购物车相关模块
	 */
	
	// 引入官方组件
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	
	import {mapState,mapMutations} from 'vuex';
	
	export default {
		data() {
			return {
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
				popupStack:[], // 弹窗栈
				commentHasNext:false, // 是否还有更多评论
				bannerDataHasNext:false, // 是否还有更多banner商品数据
				foodsCategoryTabCur: 0, // 当前被选中的商品列表的分类导航
				mainCur: null, // 用于控制商品列表滑动到哪个位置的参数，记录的值与foodsCategoryTabCur一致
				verticalNavTop: 0, // 存储商品列表的分类导航滑动距离的参数
				load: true, // 记录滑动动画是否执行完毕的参数
				shopCart:{
					foodsList:{}, // 购物车商品数据详情
					/*
					商品列表的数据格式如下
					foodList: {
						foodId:{
							info:{商品的详细数据},
							count:Number, // 该商品id下商品的总数量
							taste:{
								goodsTasteData.join(''):{
									index:[], // 该商品的口味，数组长度与info中attrs的长度一致，值为用户选择的口味的索引值
									count:Number, // 当前口味的商品数量
								}
							}, // 用户选择的口味列表，不同口味视为不同商品，当该商品无口味选项时此对象为空
						}
					}
					*/
					redpackList:[], // 用户兑换的红包
					count:null, // 当前购物车的商品总数量
				}, // 店铺私有购物车数据，加入数据后会同步到总购物车中
				goodsInfoPopupData:null, // 临时存储商品详情弹窗所需的数据
				goodsTasteData:[], // 临时存储用户选择的商品口味
			}
		},
		watch:{
			/**
			 * 监听页面状态变化，根据状态设置对应的操作
			 * @param {Object} n
			 * @param {Object} o
			 */
			pageState(n,o){},
			shopCart:{
				handler(n,o){
					if(this._.isEmpty(n.foodsList)){
						this.showShopCartPopup();
					}

					let len = 0;
					
					for (let key in n.foodsList) {
						len += n.foodsList[key].count;
					}
					this.shopCart.count = len;
					
					// 购物车无商品 且 无红包数据 直接返回
					if(this._.isEmpty(n.foodsList) && !n.redpackList.length) {
						if(this.cartList[this.storeData.rst.id]){
							this.REMOVE_CART(this.storeData.rst.id);
						}
						return;
					};

					// 将商品数据存入公共购物车
					let shopId = this.storeData.rst.id;
					this.ADD_CART({
						shopId,
						cartInfo:this.shopCart
					});

				},
				deep:true
			}
		}
		,
		computed:{
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
			/**
			 * 统计购物车价格
			 */
			shopCartPriceCount(){
				let res = {
					origin_price:0,
					price:0,
					save_money:0
				};
				
				for (let key in this.shopCart.foodsList) {
					
					let curGoodsObj = this.shopCart.foodsList[key],
					price = curGoodsObj.info.price * 100,
					origin_price = curGoodsObj.info.origin_price * 100
					;
					
					// 有优惠活动
					if(curGoodsObj.info.activity){
					
						// 当前商品数量超过了最大优惠数
						if(curGoodsObj.count > curGoodsObj.info.activity.applicable_quantity){
							// 当前价格计算 (总数量 - 活动上限数量) * 原始价格 + (活动上限数量 * 当前价格)
							let overPrice = (
										curGoodsObj.count - 
										curGoodsObj.info.activity.applicable_quantity
							) * origin_price;
							
							let salePrice = curGoodsObj.info.activity.applicable_quantity * price;
							
							res.price += (overPrice + salePrice);
						} // end if
						
					} // end if
					
					if(!curGoodsObj.info.activity || 
						(curGoodsObj.count <=
						curGoodsObj.info.activity.applicable_quantity)
					){
						res.price += curGoodsObj.count * price;
					} // end if
					
					res.origin_price += curGoodsObj.count * origin_price;
				} // end for
				
				res.save_money = res.origin_price - res.price;
				res.price /= 100;
				res.origin_price /= 100;
				res.save_money /= 100;
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
		created() {
			// 请求店铺主要数据
			this.$http.get.store_index_data().then((res)=>{
					this.lodingEnd = true;
					this.storeData = res;
					// 判断当前店铺是否有购物车数据存储在公共区域
					let cartList = mapState.cartList || this.cartList;
					if(cartList[res.rst.id]){
						this.shopCart = cartList[res.rst.id];
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

				// 根据商品id查询店铺的电话号码

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
			 * 从购物车中删除某种口味类型的商品
			 * @param {Object} foodId 该商品id
			 * @param {Object} tasteId 该口味类型的键
			 */
			cutTasteGoodsFromCart(foodId,tasteId){
				let curGoodsObj = this.shopCart.foodsList[foodId],
				minPurchase = curGoodsObj.info.min_purchase,
				tasteObj = this.shopCart.foodsList[foodId].taste
				;
				
				// 只剩下一种口味
				// 其数量小于等于最低起购量直接删除整个商品对象
				// 其数量大于最低起购量则数量-1
				
				// 还有多种口味
				// 该口味数量小于等于最低起购量直接删除这个口味对象
				// 其数量大于最低起购量则数量-1
				
				// 当前口味删除后是否小于等于最低起购量
				if(curGoodsObj.taste[tasteId].count <= minPurchase){
					
					// 多种口味
					if(this._.keys(tasteObj).length > 1) {
						this.$set(curGoodsObj,'count',curGoodsObj.count - curGoodsObj.taste[tasteId].count);
						this.$delete(curGoodsObj.taste,tasteId);
					}else{
					// 只有一种口味
						this.$delete(this.shopCart.foodsList,foodId);
					} // end if 口味类型数量
					
					return;
				} // end if 小于等于最低起购量
				
				// 不小于最低起购量
				this.$set(curGoodsObj,'count',curGoodsObj.count-1);
				this.$set(tasteObj[tasteId],'count',tasteObj[tasteId].count-1);
			}
			,
			/**
			 * 在购物车弹窗中向购物车中添加某种口味类型的商品
			 * @param {Object} foodId 该商品id
			 * @param {Object} tasteId 该口味类型的键
			 */
			addTasteGoods2Cart(foodId,tasteId){
				let curGoodsObj = this.shopCart.foodsList[foodId];
				
				this.$set(curGoodsObj,'count',curGoodsObj.count + 1);
				this.$set(curGoodsObj.taste[tasteId],'count',curGoodsObj.taste[tasteId].count + 1);
				
				// 该商品有优惠活动
				if(curGoodsObj.info.activity){
					if(curGoodsObj.count > curGoodsObj.info.activity.max_quantity){
						// 提示用户已经超出活动限定
						uni.showToast({
							title:curGoodsObj.info.activity.applicable_quantity_detail_text,
							icon:'none'
						});
					}// end if 商品数量超出活动上限
				}; // end if 商品存在活动
			}
			,
			/**
			 * 从购物车中删除
			 * @param {Object} food 商品对象
			 */
			cutFromCart(food){
				this.$utils.log('cutFromCart','从购物车中删除');
				let curInShopcartObj = this.shopCart.foodsList[food.item_id];
				
				// 该对象不存在
				if(!curInShopcartObj) return false;
				
				// 该对象存在多种口味和规格，提示用户只能在购物车中删除
				if(this._.keys(curInShopcartObj.taste).length >= 2) {
					
					uni.showToast({
						title:this.$c_t.store_index.has_more_taste,
						icon:'none'
					})
					
					return false;
				}
				
				// 该对象数量超过最低购买数量
				if(curInShopcartObj.count > food.min_purchase){
					// 商品数量-1
					this.$set(curInShopcartObj,'count',curInShopcartObj.count-1);
					// 存在口味参数，当前口味参数的数量-1
					if(!this._.isEmpty(curInShopcartObj.taste)){
						this.$set(
							curInShopcartObj.taste[this._.keys(curInShopcartObj.taste)[0]],
							'count',
							curInShopcartObj.count
						)
					}
					
					// 检查其数量是否仍然超过最大优惠数量。超过了就给予提示
					if(food.activity){
						
						if(
							curInShopcartObj.count >
							food.activity.applicable_quantity
						){
							uni.showToast({
								title:food.activity.applicable_quantity_detail_text,
								icon:'none'
							});
						} // end if
						
					} // end if
					
					// 检查该商品是否存在多种口味
					
					
					return;
				}
				
				// 将该对象从购物车中删除
				this.$delete(this.shopCart.foodsList,food.item_id);
			}
			,
			/**
			 * 添加到购物车
			 * @param {Object} food 商品对象
			 */
			add2cart(food){
				this.$utils.log('add2cart','添加到购物车');
				
				/*
				商品列表的数据格式如下
				foodList: {
					foodId:{
						info:{商品的详细数据},
						count:Number, // 该商品的数量
						taste:[], // 该商品的口味，数组长度与info中attrs的长度，值为用户选择的口味的索引值
					}
				}
				*/
			   
				
				// ==============该商品存在购物车中================
				
				if(this.shopCart.foodsList[food.item_id]){
					
					// 该商品有活动限制
					if(food.activity){
						
						// 商品数量是否超过了活动中规定的限定优惠数量
						if(
							this.shopCart.foodsList[food.item_id].count >=
							food.activity.applicable_quantity
						){
							// 提示用户已经超出活动限定
							uni.showToast({
								title:food.activity.applicable_quantity_detail_text,
								icon:'none'
							});
						} // end if
						
					} // end if
					
					// 修改商品总数量
					// 追加购物车中该商品数量
					this.$set(
						this.shopCart.foodsList[food.item_id],
						'count',
						this.shopCart.foodsList[food.item_id].count+1
					);
					
					// 如果不存在口味选项则直接跳过后续的口味类型商品数量计算
					if(!food.attrs.length) return;
					
					
					// 判断口味是否为新的
					let curTasteObj = this.shopCart.foodsList[food.item_id].taste[this.goodsTasteData.join('')];
					
					// 该口味存在其中,使其数量+1
					if(curTasteObj){
						this.$set(curTasteObj,'count',curTasteObj.count + 1);
						
					}else{
						// 该口味不存在，新增一个口味，数量设置为最低起购数量
						this.$set(
							this.shopCart.foodsList[food.item_id].taste,
							this.goodsTasteData.join(''),
							{
							index:this.goodsTasteData,
							count:food.min_purchase
							}
						);
						
						// 重新设置商品总数量
						this.$set(
							this.shopCart.foodsList[food.item_id],
							'count',
							this.shopCart.foodsList[food.item_id].count-1+food.min_purchase
						);
						
					} // end if 当前口味是否存在购物车中
					
					
					return;
				} // end if
				
				
				// ==============该商品不存在购物车中==============
				
				// 向购物车中新增商品
				this.$set(this.shopCart.foodsList,food.item_id,{
					info:food,
					count:food.min_purchase,
					taste:{}
				});
				
				// 判断商品数量是否超出了优惠限制数量
				if(food.activity){
					
					if(
						this.shopCart.foodsList[food.item_id].count >
						food.activity.applicable_quantity
					){
						uni.showToast({
							title:food.activity.applicable_quantity_detail_text,
							icon:'none'
						});
					} // end if
				} // end if
				
				// 判断是否有口味选项
				if(food.attrs.length) {
					// 当前商品有口味选项，根据用户选择的口味设置口味属性
					let tasteId = this.goodsTasteData.join('');
					this.$set(
						this.shopCart.foodsList[food.item_id].taste,
						tasteId,
						{
							index:this.goodsTasteData,
							count:food.min_purchase
						}
					);
				} // end if 存在口味选项
				
			}
			,
			/**
			 * 清空购物车
			 */
			clearShopcart(){
				this.$set(this.shopCart,'foodsList',{});
				this.showShopCartPopup();
			}
			,
			/**
			 * 无口味选项的：输入商品的数据及其在购物车中的索引值计算该商品总价
			 * @param {Object} goods 购物车中的商品对象
			 */
			goodsPriceFilter(goods){
				let res = 0,
				price = goods.info.price * 100,
				origin_price = goods.info.origin_price * 100
				;
				
				// 当前商品有优惠活动
				if(goods.info.activity){
					// 商品总量超过了优惠活动上限
					if(goods.count > goods.info.activity.max_quantity){
						res += price * goods.info.activity.max_quantity;
						res += origin_price * (goods.count - goods.info.activity.max_quantity);
						
						return res/100;
					} // end if 商品数量超出活动上限
				} // end if 优惠活动
				
				
				// 当前商品无优惠活动
				res += price * goods.count;
				
				return res/100;
			}
			,
			/**
			 * 有口味选项的：输入商品的数据及其在购物车中的索引值计算该商品总价
			 * @param {Object} goods 购物车中的商品对象
			 * @param {String} key 该商品在口味列表中的键值
			 * @param {Number} index 该商品在口味类型列表中的索引值
			 */
			goodsTastePriceFilter(goods,key,index){
				let res = 0,
				price = goods.info.price * 100,
				origin_price = goods.info.origin_price * 100
				;
				
				// 当前商品有优惠活动
				if(goods.info.activity){
					// 当前商品是口味类型中的第一种，并且商品总量超过了优惠活动上限
					if(index == 0 && goods.count > goods.info.activity.max_quantity){
						res += price * goods.info.activity.max_quantity;
						res += origin_price * (goods.taste[key].count-goods.info.activity.max_quantity);
						
						return res/100;
					} // end if 商品数量超出活动上限
				} // end if 优惠活动
				
				
				// 当前商品无优惠活动
				res += price * goods.taste[key].count;
				
				return res/100;
			}
			,
			/**
			 * 前往支付页面
			 */
			gotoPayPage(){
				uni.navigateTo({
					url:this.$pages_path.add_address,
					fail(e) {
						console.log('跳转失败',e);
					}
				})
			}
			,
			/**
			 * 显示购物车弹窗
			 */
			showShopCartPopup(){
				if(this.pageState.shopCartOpenState){
					this.closePopup('shopCartPopup');
				}else{
					this.openPopup('shopCartPopup');
				}
				
				this.pageState.shopCartOpenState = !this.pageState.shopCartOpenState;
			}
			,
			/**
			 * 用户确定了当前商品的口味，将其加入购物车
			 * @param {Object} goods 商品数据
			 */
			confirmTaste(goods){
				this.$utils.log('confirmTaste','用户确定了当前商品的口味，将其加入购物车');
				this.add2cart(goods);
				this.closePopup('foodTasteChoosePopup');
			}
			,
			/**
			 * 记录当前用户选择的是哪种口味
			 * @param {Number} index 当前要修改哪个类别的口味
			 * @param {Number} value 口味的索引值
			 */
			tasteChoose(index,value){
				this.$utils.log('tasteChoose','记录当前用户选择的是哪种口味');
				this.$set(this.goodsTasteData,index,value);
			}
			,
			/**
			 * 跳转到价格说明页
			 */
			goToPriceDescription(){
				this.$utils.log('goToPriceDescription','跳转到价格说明页');
				uni.navigateTo({
					url:this.$pages_path.add_address,
					fail(e) {
						console.log('跳转失败',e);
					}
				})
			}
			,
			/**
			 * 查看商品口味选择弹窗
			 * @param {Object} goods 商品数据
			 */
			showFoodTasteChoosePopup(goods){
				this.$utils.log('showFoodTasteChoosePopup','查看商品口味选择弹窗');
				this.goodsInfoPopupData = goods;
				this.goodsTasteData = Array(goods.attrs.length).fill(0);
				
				this.openPopup('foodTasteChoosePopup');
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
			 * 检查当前这个红包是否已经加入了购物车中
			 * @param {Object} redpackObj 红包对象
			 */
			redpackInShopcart(redpackObj){
				// this.$utils.log('redpackInShopcart','检查当前这个红包是否已经加入了购物车中');
				return JSON.stringify(
						this.shopCart.redpackList
					).includes(
						JSON.stringify(redpackObj)
					);
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
			 * 将红包数据拆分为普通和超级会员两种
			 * @param {Array} data 红包列表
			 */
			redpackFilter(data){
				// this.$utils.log('redpackFilter','将红包数据拆分为普通和超级会员两种');
				let res = {};
				
				res.member = data.filter(ele => ele.type == 1);
				res.normal = data.filter(ele => ele.type == 0);
				
				return res;
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
			 * 弹窗状态变化完成时触发的方法
			 * @param {Object} e 事件参数对象
			 */
			popupChange(e){
				this.$utils.log('popupChange','弹窗状态改变==>' + (e.show?'开':'关'),e);
				let popData = '';
				if(e.show == false){
					popData = this.popupStack.pop();
					if(popData == 'shopCartPopup'){
						this.pageState.shopCartOpenState = false;
					}
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
				if (this.load) {
					for (let i = 0; i < this.storeData.menu.length; i++) {
						let view = uni.createSelectorQuery().select("#main-" + i);
						view.fields({
							size: true
						}, data => {
							this.storeData.menu[i].top = tabHeight;
							tabHeight = tabHeight + data.height;
							this.storeData.menu[i].bottom = tabHeight;
						}).exec();
					}
					this.load = false
				}
				let scrollTop = e.detail.scrollTop + 10;
				for (let i = 0; i < this.storeData.menu.length; i++) {
					if (scrollTop > this.storeData.menu[i].top && scrollTop < this.storeData.menu[i].bottom) {
						this.verticalNavTop = (i - 1) * 50
						this.foodsCategoryTabCur = i
						// console.log(scrollTop)
						return false
					}
				}
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
	
	
	.comment-tag-item{
		margin: 8rpx;
	}
	
	.comment-tag-bg{
		color: #6d7885;
		background-color: #ebf5ff;
	}
	.comment-tag-bg.cur{
		color: #fff;
		background-color: #0097ff;
	}
	.comment-tag-bg.bad{
		color: #aaa;
		background-color: #f5f5f5;
	}
	.comment-tag-bg.bad.cur{
		color: #fff;
		background-color: #ccc;
	}
	.icon-color-76d572{
		color: #76d572;
	}
	
	.icon-color-e8{
		color: #e8e8e8;
	}
	
	.user-avatar-box{
		width: 60rpx;
		height: 60rpx;
		overflow: hidden;
	}
	
	.comment-content-img-item{
		overflow: hidden;
	}
	
	.bad{
		color: rgb(137, 159, 188);
	}
	.super-good{
		color: rgb(255, 96, 0);
	}
	
	.store-reply-box{
		background-color: #f3f3f3;
		position: relative;
	}
	.store-reply-box::after{
		content: "";
		position: absolute;
		width: 0;
		height: 0;
		border-style: solid;
		border-color: transparent transparent #f3f3f3;
		border-width: 0 18rpx 18rpx;
		top: -18rpx;
	}
	
	.good-goods-tag-item{
		color: #6d7885;
		background-color: #ebf5ff;
		margin: 5rpx;
	}
	
	.store-img-box{
		width: 156rpx;
		height: 156rpx;
		position: relative;
	}
	.store-img-tips{
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgba(0,0,0,.6);
		text-align: center;
	}
	
	.store-address{
		width: 500rpx;
	}
	.store-menu{
		position: relative;
		z-index: 9;
		background-color: #fff;
	}
	// 垂直商铺菜单列表相关样式
	.VerticalMain{
		padding-bottom: 100rpx;
	}
	.VerticalNav.nav {
		width: 200upx;
		white-space: initial;
	}

	.VerticalNav.nav .cu-item {
		width: 100%;
		background-color: #f8f8f8;
		margin: 0;
		border: none;
		height: 50px;
		position: relative;
		line-height: 1.5;
		padding: 0 10rpx;
		display: inline-flex;
	}

	.VerticalNav.nav .cu-item.cur {
		background-color: #fff;
	}

	.VerticalNav.nav .cu-item.cur::after {
		content: "";
		width: 8upx;
		height: 30upx;
		border-radius: 10upx 0 0 10upx;
		position: absolute;
		background-color: currentColor;
		top: 0;
		right: 0upx;
		bottom: 0;
		margin: auto;
	}
	
	.food-category-item{
		position: relative;
	}
	
	// 垂直商铺菜单列表相关样式
	.category-title-box{
		max-width: 600rpx;
	}
	.category-title{
		max-width: 200rpx;
	}
	.category-des,.price-box{
		max-width: 300rpx;
	}
	.food-img-box{
		width: 190rpx;
		height: 190rpx;
	}
	.food-title{
		max-width: 300rpx;
		font-size: 30rpx;
	}
	.sale-tag{
		border: 1px solid hsla(8,79%,62%,.3);
	}
	
	// 底部购物车相关样式
	
	.save-money-tips{
		background-color: #fffad6;
		border-top: 5rpx solid #f9e8a3;
		opacity: .96;
		position: absolute;
		height: 40rpx;
		top: -40rpx;
		left: 0;
		right: 0;
	}
	.shopping-cart-box{
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 96rpx;
		background-color: rgba(61,61,63,.9);
		padding-left: 158rpx;
	}
	
	.shopping-cart-icon-box{
		position: absolute;
		width: 100rpx;
		height: 100rpx;
		left: 29rpx;
		bottom: 20rpx;
		background-color: #3190e8;
		border-color: #444;
	}
	
	.shopping-cart-pay-btn-box{
		background-color: #38ca73;
		height: 96rpx;
		width: 210rpx;
	}
	
	// 弹窗区域相关样式
	
	// 弹窗-店铺详情
	.store-info-popup-box{
		width: 600rpx;
	}
	.announcement{
		width: 152rpx;
		background-image: linear-gradient(90deg,#fff,#333 50%,#fff);
		background-size: 100% 1px;
		background-position: 50%;
		background-repeat: no-repeat;
	}
	
	// 弹窗-店铺红包
	.redpack-item{
		border: 1px dotted #eae5b9;
	}
	.member-redpack-item-bg{
		background: #fff4be;
	}
	.redpack-price{
		font-size: 64rpx;
	}
	.redpack-btn-box{
		width: 180rpx;
	}
	.card-round-icon::after,.card-round-icon::before{
		right: 170rpx;
		background-color: #F5F5F5;
		width: 12rpx;
		height: 12rpx;
		border: 1px solid #eae5b9;
	}
	.card-round-icon::after{
		bottom: -6rpx;
		border-bottom: none;
	}
	.card-round-icon::before{
		top: -6rpx;
		border-top: none;
	}
	
	// 开通超级vip弹窗
	.svip-popup-title-box{
		width: 360rpx;
		height: 79rpx;
		position: relative;
	}
	.svip-popup-title-bg{
		width: 360rpx;
		height: 79rpx;
		position: absolute;
		top: -30rpx;
		left: 0;
	}
	.sale-value-box{
		width: 392rpx;
		height: 246rpx;
		position: relative;
	}
	.sale-value-bg{
		width: 392rpx;
		height: 246rpx;
		position: absolute;
		left: 0;
		z-index: 0;
	}
	.sale-value-text{
		width: 243rpx;
		height: 243rpx;
		position: absolute;
		left: 80rpx;
	}
	.svip-popup-info-box{
		width: 320rpx;
	}
	.svip-popup-btn-box{
		width: 100%;
	}
	.svip-popup-btn{
		width: 280rpx;
		background: #fff;
	}
	.svip-popup-btn-open{
		color: #7b460a;
		background-image: linear-gradient(90deg,#ffeda1,#e3c957);
	}
	
	// 广告展示区域
	.banner-item{
		width: 346rpx;
		box-shadow: 0 5rpx 10rpx 0 rgba(0,0,0,.04);
	}
	
	// 商品详情展示页
	.goods-cover-box{
		position: relative;
		
	}
	.goods-cover{
		width: 750rpx;
	}
	.goods-cover-icon{
		position: absolute;
		right: 20rpx;
		top: 20rpx;
	}
	
	// 商品口味弹窗
	.food-taste-box{
		position: relative;
		width: 750rpx;
		height: 1100rpx;
	}
	.food-type-list{
		height: 730rpx;
	}
	.food-taste-close-btn{
		position: absolute;
		right: 20rpx;
		top: 20rpx;
	}
	.food-cover-box{
		width: 190rpx;
	}
	.food-taste-item.cur{
		color: rgb(35, 149, 255);
		background-color: rgba(35, 149, 255, 0.2);
	}
	.confirm-taste-btn{
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
	}
	
	// 购物车弹窗
	.shopcart-popup-box{
		padding-bottom: 100rpx;
		width: 750rpx;
	}
	.shopcart-list{
		height: 600rpx;
	}
	
	.add-remove-box{
		max-width: 140rpx;
		justify-content: flex-end;
	}
	.goods-number{
		width: 48rpx;
		text-align: center;
	}
</style>
