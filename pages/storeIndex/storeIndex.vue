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
											<text>{{item.name}}</text>
										</view>
									</scroll-view>
									<!-- 左侧分类滑动条 E -->
									
									<!-- 右侧菜单内容滑动列表 S -->
									<scroll-view 
									class="VerticalMain" 
									scroll-y 
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
													class="flex-direction flex-sub text-color-9 justify-around"
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
														<view class="text-xs">
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
														<view class="align-center justify-between">
															<view class="align-center">
																<text class="text-price text-color-price margin-right-xs text-lg">{{ele.price}}</text>
																<text class="text-price delete-line text-sm">{{ele.origin_price}}</text>
															</view>
															<view class="align-center">
																<text
																class="text-sm text-color-6 margin-right-xs"
																v-if="ele.min_purchase>1"
																>{{ele.min_purchase}}份起售</text>
																<text class="lg add-btn-blue text-xxl cuIcon-roundaddfill"></text>
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
							<view class="shopping-cart-box justify-between align-center">
								<!-- 
								 存在两种状态
								 1.无商品状态
								 2.有商品状态
								 -->
								
								<!-- 购物车图标 -->
								<view 
								class="shopping-cart-icon-box round border border-xl align-center justify-center"
								:style="{backgroundColor:shopCart.length?'':'#363636'}"
								>
									<text 
									class="lg text-xxl cuIcon-cartfill"
									:class="shopCart.length?'text-white':'text-color-6'"
									></text>
									<view 
									v-show="shopCart.length"
									class="cu-tag badge">{{shopCart.length}}</view>
								</view>
								
								<!-- 选购商品提示 -->
								<view 
								class="shopping-cart-tips-box flex-direction text-scale-9"
								:class="'text-color-9'"
								>
								
									<view 
									v-if="shopCart.length"
									class="align-center">
										<text class="text-price text-bold text-white text-xl margin-right">178.6</text>
										<text class="text-price delete-line text-color-9">390</text>
									</view>
									
									<text 
									v-if="!shopCart.length"
									class="text-lg"
									>
										未选购商品
									</text>
									
									
									<text class="text-xs">另需配送费{{parseInt(storeData.rst.float_delivery_fee)}}元</text>
								</view>
								
								<!-- 结算按钮 -->
								<view 
								class="shopping-cart-pay-btn-box text-white align-center justify-center"
								:style="{backgroundColor:shopCart.length?'':'#535356'}"
								>
									<text 
									v-show="shopCart.length"
									class="text-lg">去结算</text>
									
									<text 
									v-show="!shopCart.length"
									class="text-lg"
									>¥{{parseInt(storeData.rst.float_minimum_order_amount)}}起送</text>
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
								v-for="(item,index) in storeCommentData.comments"
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
							
							<view class="padding-tb border-bottom border-color-e justify-between">
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
						<view class="margin-bottom bg-white padding flex-direction">
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
					commentTagCur:0, // 当前用户选择的是第几个评论标签
					showHasContentCommentOnly: true, // 是否只显示有内容的评论
				}, // 页面状态
				popupStack:[], // 弹窗栈
				commentHasNext:false, // 是否还有更多评论
				foodsCategoryTabCur: 0, // 当前被选中的商品列表的分类导航
				mainCur: 0, // 用于控制商品列表滑动到哪个位置的参数，记录的值与foodsCategoryTabCur一致
				verticalNavTop: 0, // 存储商品列表的分类导航滑动距离的参数
				load: true, // 记录滑动动画是否执行完毕的参数
				shopCart:[], // 临时存储购物车数据
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
				this.storeCommentData = res;
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
			/**
			 * 点赞商品过滤器，将点赞商品中5星的过滤出来
			 * @param {Array} foodList 点赞食品列表
			 */
			foodsFilter(foodList){
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
			,
			/**
			 * 商品列表侧边导航栏点击事件
			 * 点击时切换右侧分类商品位置
			 * @param {Object} e
			 */
			foodsCategoryTabSelect(e) {
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
				// #ifdef MP-ALIPAY
				   return false  //支付宝小程序暂时不支持双向联动 
				// #endif
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
	
	.store-menu-box{
		position: relative;
		z-index: 99;
		background-color: #fff;
	}
	
	// 垂直商铺菜单列表相关样式

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
	
	// 垂直商铺菜单列表相关样式
	.category-title-box{
		max-width: 600rpx;
	}
	.category-title{
		max-width: 200rpx;
	}
	.category-des{
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
</style>
