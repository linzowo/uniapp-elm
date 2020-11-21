<template>
	<!-- 店铺列表组件 -->
	<view class="store-list-container flex-direction">
		
		<!-- 分类筛选nav S -->
		<view 
		v-if="storeListData.length"
		:style="{top:top + 'px'}"
		class="content-list-tab-box bg-white"
		>
			<scroll-view scroll-x class="nav">
				<view class="flex text-center">
					<view 
					class="cu-item flex-sub" 
					:class="item.selected?'text-orange cur':''" 
					v-for="(item,index) in storeNavList" 
					:key="index" 
					@tap="tabSelect" 
					:data-id="index">
						<text>{{item.title}}</text>
						<text 
						v-if="index == 0"
						class="iconfont text-xs icon-sanjiao"></text>

						<text 
						v-if="index == 3"
						class="lg" :class="'cuIcon-filter'"></text>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 分类筛选nav E -->
		
		
		<!-- content S -->

		<!-- loading S -->
		<view 
		v-if="loading"
		:style="{display:'block'}"
		class="cu-load bg-white loading"></view>
		<!-- loading E -->
		
		<view 
		v-if="!loading"
		class="content-box flex-sub">
			
			<!-- 未登录 S -->
			<view 
			v-if="!login"
			class="login-no flex-direction align-center flex-sub justify-center padding-top">
				<noLogin></noLogin>
			</view>
			<!-- 未登录 E -->
			
			<!-- 登录 S -->
			<view
			 v-if="login"
			 class="flex-direction login store-list flex-sub">
		
				<!-- 没有结果 S -->
				<view 
				v-if="!storeListData.length"
				class="search-no-result padding-lg justify-center align-center">
					<image :src="$i_u.search_no_result" mode="widthFix" class="search-no-result-img"></image>
					<view class="search-no-result-text flex-direction">
						<text class="text-lg margin-bottom-xs">附近没有搜索结果</text>
						<text class="text-xs text-color-9">换个关键词试试吧</text>
					</view>
				</view>
				<!-- 没有结果 E -->
			 
				<!-- store-list-item S -->
				<view 
				v-for="(item,index) in storeListData"
				:key="index"
				@tap="gotoStoreIndex(item.restaurant.id)"
				class="store-list-item padding-tb padding-lr-sm border-bottom border-color-e align-start flex-sub">
					<!-- 遮罩层 S -->
					<view 
					v-if="index == storeMaskIndex"
					@tap.stop.prevent="controlStoreMask(index)"
					class="store-item-mask align-center justify-center">
						<text 
						@tap.stop.prevent="dislikeStore(index)"
						class="store-item-mask-btn round bg-white text-xs text-center">不喜欢</text>
					</view>
					<!-- 遮罩层 E -->
					
					<!-- 店铺封面 S -->
					<view class="store-cover-box margin-right-xs">
						<image 
						class="store-cover" 
						:src="item.restaurant.image_path|imgUrlFilter" 
						mode="widthFix"></image>
						<view 
						v-if="cartList[item.restaurant.id]"
						class="cu-tag badge">{{cartList[item.restaurant.id].count}}</view>
					</view>
					<!-- 店铺封面 E -->
					
					<!-- 店铺详情 S -->
					<view class="store-info-box flex-direction flex-sub">
						
						<!-- 店铺名称 S -->
						<view class="store-title flex-sub align-center justify-between">
							<view class="">
								<text 
								v-if="item.restaurant.brand_id"
								class="ele-tag bg-tag-color-yellow">品牌</text>
								<text
								class="text-cut store-title-text text-bold"
								>{{item.restaurant.name}}
								</text>
							</view>
							
							<!-- 普通模式-遮罩开关 S -->
							<view
							v-if="mode=='normal'"
							@tap.stop.prevent="controlStoreMask(index)"
							 class="dont-like-btn padding-left">
								<text class="lg text-gray cuIcon-more"></text>
							</view>
							<!-- 普通模式-遮罩开关 E -->
							
							<!-- 搜索模式-商家支持服务标签 S -->
							<view 
							v-if="mode=='search'"
							class="supports-box">
								<text 
								v-for="(ele,i) in item.restaurant.supports"
								:key="i"
								:style="{
									color:'#'+ele.text_color, 
									borderColor: '#'+ele.border
								}"
								class="supports-tag text-xs text-scale-8"
								>{{ele.icon_name}}</text>
							</view>
							<!-- 搜索模式-商家支持服务标签 E -->
							
						</view>
						<!-- 店铺名称 E -->
						
						<!-- 店铺销售及评价情况 S -->
						<view class="store-star padding-tb-xs justify-between">
							<view class="left align-center">
								<!-- star S -->
								<view class="star-box star-size">
									<view class="star-bg">
										<image class="star-size" :src="$i_u.star_bg" mode="left"></image>
									</view>
									<view 
									class="star"
									:style="{width:parseInt(120 * (item.restaurant.rating/5)) + 'rpx'}"
									>
										<image class="star-size" :src="$i_u.star" mode="left"></image>
									</view>
								</view>
								<!-- star E -->
								
								<!-- rate S -->
								<text class="text-scale-9 text-sm text-color-6 margin-lr-xs">{{item.restaurant.rating}}</text>
								<!-- rate E -->
								
								<!-- 销售量 S -->
								<text class="text-scale-9 text-sm text-color-6">月售{{item.restaurant.recent_order_num}}单</text>
								<!-- 销售量 E -->
							</view>
							
							<view
							v-if="item.restaurant.delivery_mode"
							 class="right">
								<text 
								:style="{
										color:'#'+item.restaurant.delivery_mode.text_color,
										backgroundColor:'#'+item.restaurant.delivery_mode.color
									}"
								class="text-scale-8 text-sm padding-lr-xs">{{item.restaurant.delivery_mode.text}}</text>
							</view>
							
						</view>
						<!-- 店铺销售及评价情况 E -->
						
						<!-- 配送相关信息 S -->
						<view class="text-xs store-distance-box text-color-6 justify-between align-center">
							<view class="text-scale-9 left align-center">
								<text>￥{{item.restaurant.float_minimum_order_amount}}起送</text>
								<text class="margin-lr-xs text-color-d">|</text>
								<text>配送￥{{item.restaurant.float_delivery_fee}}</text>
							</view>
							<view class="text-scale-9 right align-center text-color-9">
								<text>{{item.restaurant.distance|distaceFilter}}</text>
								<text class="margin-lr-xs text-color-d">|</text>
								<text>{{item.restaurant.order_lead_time}}分钟</text>
							</view>
						</view>
						<!-- 配送相关信息 E -->
						
						<!-- 店铺分类 S -->
						<view
						v-if="item.restaurant.flavors"
						>
							<text class="text-scale-8 store-categroy text-color-6 text-xs margin-tb-xs text-xs border border-color-e">{{item.restaurant.flavors[0].name}}</text>
						</view>
						<!-- 店铺分类 E -->
						
						<!-- 店铺促销活动 S -->
						<view 
						v-if="item.restaurant.activities"
						class="store-activities text-color-6 flex-sub text-xs align-start">
							<view class="active-left flex-direction text-scale-9">
								<view 
								v-for="(e) in item.restaurant.act_tag ? item.restaurant.activities : item.restaurant.activities.slice(0,2)"
								:key="e.id"
								class="activities-item align-center margin-tb-xs">
									<text class="radius active-tag text-xs margin-right-xs color-white"
									:style="{backgroundColor:'#'+e.icon_color}"
									>{{e.icon_name}}</text>
									<text class="text-cut">{{e.tips}}</text>
								</view>
							</view>
							<view 
							v-if="item.restaurant.activities.length>2"
							@tap.stop.prevent="showMoreActive(index)"
							class="active-right margin-tb-xs text-color-9 justify-end align-center">
								<text class="text-scale-9">{{item.restaurant.activities.length}}个活动</text>
								<text 
								:class="[item.restaurant.act_tag?'animation-rotate':'']"
								class="active-icon text-df lg text-gray cuIcon-triangledownfill"></text>
							</view>
						</view>
						<!-- 店铺促销活动 E -->
						
						<!-- 店铺商品列表 S -->
						<view 
						v-if="item.foods"
						class="store-goods-list flex-direction">
						
							<!-- 图片展示模式 S -->
							<view class="img-mode">
								
								<view 
								v-for="(ele,i) in item.foods.slice(0,3)"
								:key="i"
								class="store-goods-item flex-direction margin-right-xs">
									<image 
									:src="ele.image_path|imgUrlFilter" 
									mode="widthFix"
									class="store-goods-img"
									></image>
									<text class="text-cut text-xs text-color-9 margin-tb-xs">{{ele.name}}</text>
									<text class="text-price text-color-price text-lg">{{ele.price}}</text>
								</view>
								
							</view>
							<!-- 图片展示模式 E -->
							
							<!-- 文字模式 S -->
							
							<!--  #ifndef  MP-WEIXIN -->
							<view 
							v-show="showTextModeGoods.includes(index)"
							class="text-mode flex-direction">
							<!--  #endif -->

							<!--  #ifdef  MP-WEIXIN -->
							<view 
							v-if="showTextModeGoods.includes(index)"
							class="text-mode flex-direction">
							<!--  #endif -->
								<view 
								v-for="(ele,i) in item.foods.slice(3)"
								:key="i"
								class="store-goods-item flex-sub flex-direction margin-top">
									<view class="info flex-sub justify-between text-color-9 text-xs">
										<text>{{ele.name}}</text>
										<text>月售{{ele.month_sales}}份</text>
									</view>
									<text class="text-price text-color-price text-lg margin-top-xs">{{ele.price}}</text>
								</view>
							</view>
							<!-- 文字模式 E -->
							
							<!-- 查看其他 S -->
							<view 
							v-if="item.foods.length"
							@tap.stop.prevent="controlGoodsList(index)"
							class="store-goods-show-more align-center flex-sub justify-center padding-sm text-xs">

								<!--  #ifndef  MP-WEIXIN -->
								<view v-show="!showTextModeGoods.includes(index)">
								<!--  #endif -->

								<!--  #ifdef  MP-WEIXIN -->
								<view v-if="!showTextModeGoods.includes(index)">
								<!--  #endif -->
									<text>查看其他相关商品 {{item.foods.length-3}} 个</text>
									<text class="lg text-gray cuIcon-unfold margin-left-xs"></text>
								</view>
								
								<!--  #ifndef  MP-WEIXIN -->
								<view v-show="showTextModeGoods.includes(index)">
								<!--  #endif -->

								<!--  #ifdef  MP-WEIXIN -->
								<view v-if="showTextModeGoods.includes(index)">
								<!--  #endif -->
									<text>收起</text>
									<text class="lg text-gray cuIcon-fold margin-left-xs"></text>
								</view>
							</view>
							<!-- 查看其他 E -->
							
						</view>
						<!-- 店铺商品列表 E -->
						
					</view>
					<!-- 店铺详情 E -->
					
				</view>
				<!-- store-list-item E -->
				
				<!-- 加载提示 S -->
				<view 
				v-if="storeListData.length"
				class="list-end align-center justify-center">
					<view class="cu-load" :class="hasNext?'loading':'over'"></view>
				</view>
				<!-- 加载提示 E -->
				
				<!-- 为你推荐 S -->
				<view
				v-if="recommendData.length"
				 class="recommend-box flex-direction">
					
					<!-- 推荐标题 S -->
					<view class="recommend-title padding justify-center align-center bg-grey-f5 text-color-3 text-bold">
						<text class="line"></text>
						<text class="lg cuIcon-appreciate margin-left-xs"></text>
						<text class="text-bold margin-lr-xs">为你推荐</text>
						<text class="line"></text>
					</view>
					<!-- 推荐标题 E -->
					
					<view 
					v-for="(item) in recommendData"
					:key="item.restaurant.authentic_id"
					@tap="gotoStoreIndex(item.restaurant.id)"
					class="store-list-item padding-tb padding-lr-sm border-bottom border-color-e align-start flex-sub">
						
						<!-- 店铺封面 S -->
						<image 
						class="store-cover margin-right-xs" 
						:src="item.restaurant.image_path|imgUrlFilter" 
						mode="widthFix"></image>
						<!-- 店铺封面 E -->
						
						<!-- 店铺详情 S -->
						<view class="store-info-box flex-direction flex-sub">
							
							<!-- 店铺名称 S -->
							<view class="store-title flex-sub align-center justify-between">
								<view class="">
									<text 
									v-if="item.restaurant.brand_id"
									class="ele-tag bg-tag-color-yellow">品牌</text>
									<text
									class="text-cut store-title-text text-bold"
									>{{item.restaurant.name}}
									</text>
								</view>
								
								<!-- 搜索模式-商家支持服务标签 S -->
								<view 
								v-if="mode=='search'"
								class="supports-box">
									<text 
									v-for="(ele,i) in item.restaurant.supports"
									:key="i"
									:style="{
										color:'#'+ele.text_color, 
										borderColor: '#'+ele.border
									}"
									class="supports-tag text-xs text-scale-8"
									>{{ele.icon_name}}</text>
								</view>
								<!-- 搜索模式-商家支持服务标签 E -->
								
							</view>
							<!-- 店铺名称 E -->
							
							<!-- 店铺销售及评价情况 S -->
							<view class="store-star padding-tb-xs justify-between">
								<view class="left align-center">
									<!-- star S -->
									<view class="star-box star-size">
										<view class="star-bg">
											<image class="star-size" :src="$i_u.star_bg" mode="left"></image>
										</view>
										<view 
										class="star"
										:style="{width:parseInt(120 * (item.restaurant.rating/5)) + 'rpx'}"
										>
											<image class="star-size" :src="$i_u.star" mode="left"></image>
										</view>
									</view>
									<!-- star E -->
									
									<!-- rate S -->
									<text class="text-scale-9 text-sm text-color-6 margin-lr-xs">{{item.restaurant.rating}}</text>
									<!-- rate E -->
									
									<!-- 销售量 S -->
									<text class="text-scale-9 text-sm text-color-6">月售{{item.restaurant.recent_order_num}}单</text>
									<!-- 销售量 E -->
								</view>
								
								<view
								v-if="item.restaurant.delivery_mode"
								 class="right">
									<text 
									:style="{
											color:'#'+item.restaurant.delivery_mode.text_color,
											backgroundColor:'#'+item.restaurant.delivery_mode.color
										}"
									class="text-scale-8 text-sm padding-lr-xs">{{item.restaurant.delivery_mode.text}}</text>
								</view>
								
							</view>
							<!-- 店铺销售及评价情况 E -->
							
							<!-- 配送相关信息 S -->
							<view class="text-xs store-distance-box text-color-6 justify-between align-center">
								<view class="text-scale-9 left align-center">
									<text>￥{{item.restaurant.float_minimum_order_amount}}起送</text>
									<text class="margin-lr-xs text-color-d">|</text>
									<text>配送￥{{item.restaurant.float_delivery_fee}}</text>
								</view>
								<view class="text-scale-9 right align-center text-color-9">
									<text>{{item.restaurant.distance|distaceFilter}}</text>
									<text class="margin-lr-xs text-color-d">|</text>
									<text>{{item.restaurant.order_lead_time}}分钟</text>
								</view>
							</view>
							<!-- 配送相关信息 E -->
							
							<!-- 店铺分类 S -->
							<view
							v-if="item.restaurant.flavors"
							>
								<text class="text-scale-8 store-categroy text-color-6 margin-tb-xs text-xs border border-color-e">{{item.restaurant.flavors[0].name}}</text>
							</view>
							<!-- 店铺分类 E -->
							
							<!-- 店铺标签 S -->
							<view class="store-tag-list flex-wrap">
								<text 
								v-for=" (ele,i) in item.restaurant.support_tags"
								:key="i"
								class="store-tag-item border text-xs margin-top-xs text-scale-8 padding-lr-xs"
								:style="{
									color:'#'+ele.color,
									borderColor: '#'+ele.border
								}"
								>{{ele.text}}</text>
							</view>
							<!-- 店铺标签 E -->
							
							
						</view>
						<!-- 店铺详情 E -->
						
					</view>
					
				</view>
				
				<!-- 为你推荐 E -->
			</view>
			<!-- 登录 E -->
			
		</view>
		<!-- content E -->
		
		<!-- 弹窗部分 S -->
		
		<!-- 筛选及排序弹窗 S -->
		<uni-popup 
		v-if="storeListData.length"
		ref="filterBarPopup" 
		:type="'top'"
		@change="popupChange"
		:animation="true"
		class="filter-bar-popup-box"
		:positionTop="{top: 'calc(6.8vh + ' + ((top + 'px') || '0px') + ')'}"
		:zIndex="9"
		>
			<scroll-view
			scroll-y
			class="popup-box bg-white flex-sub flex-direction">
				
				<!-- 弹窗主体 S -->
				<view 
				class="filter-list flex-sub solids-top"
				>
					
					<!-- 排序选项 S -->
					<view
					v-if="storeNavList[0].selected"
					 class="cu-list menu flex-sub order-box">
						<view 
						v-for="(item,index) in storeNavList[0].list"
						:key="item.name"
						@tap="orderTap(index)"
						class="cu-item"
						:class="storeNavList[0].listSelected ? 
										(storeNavList[0].listSelectedIndex == index ? 
												'text-blue':'' ) : ''"
						>
							<view class="content">
								<text class="text-sm">{{item.name}}</text>
							</view>
							<view 
							v-if="storeNavList[0].listSelected && storeNavList[0].listSelectedIndex == index"
							class="action">
								<text class="cuIcon-check text-lg"></text>
							</view>
						</view>
					</view>
					<!-- 排序选项 S -->
					
					<!-- 筛选选项 S -->
					<view 
					v-else
					class="flex-sub flex-direction">
						<view 
						v-for="(filterValue,name,index) in storeNavList[3].list"
						:key="index"
						class="margin-lr-sm flex-direction flex-sub">
							<text class="text-sm padding-tb-sm">
								{{['商家服务（可多选）','优惠活动（单选）','人均消费'][index]}}
							</text>
							<view 
							class="cu-list grid col-3 no-border" 
							:style="{paddingLeft:0,paddingRight:0,paddingTop:0}">
								<view 
								v-for="(item,i) in filterValue"
								:key="i"
								@tap="filterTap(name,i)"
								class="cu-item"
								:style="{padding:0}"
								>
									<view 
									class="margin-top-xs align-center bg-grey-fa margin-right-xs padding-tb-xs justify-center" 
									:class="[
										index == 0 ? 
										(storeNavList[3].selectedIndex[name].includes(i) ? 'cur-item':'') : 
										(i == storeNavList[3].selectedIndex[name] ? 'cur-item':'')
										]"
										>
										<image 
										v-if="item.icon_url"
										class="bar-icon"
										:src="item.icon_url" mode="aspectFit"></image>
										{{item.text || item.name || item}}
									</view>
								</view>
							</view>
						</view>
						
						<!-- 按钮 S -->
						<view>
							<text 
							class="flex-sub bg-white padding solid shadow text-center"
							:class="
							storeNavList[3].selectedIndex.filterDataSupports.length ||
							storeNavList[3].selectedIndex.filterDataActivity != -1 || 
							storeNavList[3].selectedIndex.averagePrice != -1 ? 
							'' : 'ban-click'"
							@tap="storeNavBtnTap('clear')"
							>清空</text>
							<text 
							class="flex-sub bg-green padding solid shadow text-center"
							@tap="storeNavBtnTap('ok')"
							>确定</text>
						</view>
						<!-- 按钮 E-->
					</view>
					
					<!-- 筛选选项 E -->
					
				</view>
				<!-- 弹窗主体 S -->
			</scroll-view>
		
		</uni-popup>
		<!-- 筛选及排序弹窗 S -->
		
		<!-- 回到顶部模块 S -->
		<gotop 
		v-if="showGotop"
		:scrollTop="pageScroll" :gotopFn="goTop"></gotop>
		<!-- 回到顶部模块 E -->
		
	</view>
</template>

<script>
	/**
	 * @module 店铺排序筛选列表模块
	 */
	
	
	import {mapState,mapMutations} from 'vuex';
	
	// 回到顶部工具
	import gotop from '@/components/gotop/gotop.vue';
	
	// 未登录模块
	import noLogin from '@/components/noLogin/noLogin.vue';
	
	export default {
		name:'store-list',
		data() {
			return {
				// 商铺分类列表
				storeNavList: [], // 商铺导航栏数据
				// 记录当前页面状态
				pageState:{
					login:false, // 登录状态
					storeNavSelected:false, // 店铺导航栏的nav是否被选中
				}, 
				popupStack:[], // 弹窗栈用于帮助用户关闭多个弹窗
				elementInfo:{}, // 存储元素的基本信息
				navBarInfo:{},
				style:{}, // 元素的style样式
				storeMaskIndex:null, // 控制店铺的遮罩开闭
				gotopShow: false, // 控制回到顶部按钮的显示与隐藏
				zIndexControl: false, // 控制导航栏的层级
				showTextModeGoods:[], // 索引值在这个列表中的即为显示状态不在的即为隐藏状态
				// cartList:{}, // 存储购物车数据
			}
		},
		components:{noLogin,gotop},
		props:{
			// 是否还存在下一组数据
			hasNext: {
				type: Boolean,
				default: false
			}
			,
			// 登录后要显示的商铺列表数据
			storeListData:{
				type: Array,
				default(){
					return []
				}
			}
			,
			// 更多推荐数据
			recommendData:{
				type: Array,
				default(){
					return []
				}
			}
			,
			// nav采用的sticky定位 通过设置top来确定其在屏幕中的固定位置
			top:{
				type: Number,
				default: 0
			},
			// 是否渲染回到顶部按钮，默认渲染
			showGotop:{
				type: Boolean,
				default: true
			},
			// 是否采用使用了默认原生nav
			nativeNav:{
				type: Boolean,
				default: true
			},
			// 是否采用使用了默认原生tabbr
			nativeTabbar:{
				type: Boolean,
				default: true
			},
			// 导航栏被点击时触发的外部方法
			navTapFn: {
				type: Function,
				default: null
			},
			// 页面滚动的距离通过绑定这个参数接收 用于控制何时显示回到顶部按钮
			pageScroll: {
				type: Number,
				default: 0
			},
			// 组件的呈现模式
			// 默认为 normal模式，就是普通的商铺列表呈现模式
			// search模式会显示商铺的特色商品及支持服务
			mode: {
				type: String,
				default: 'normal'
			}
			,
			// 数据加载中
			loading:{
				type: Boolean,
				default: true
			},
		},
		computed:{
			...mapState([
				'login',
				'cartList'
			])
		}
		,
		watch:{
			
			/**
			 * 监听页面状态变化，根据状态设置对应的操作
			 * @param {Object} n
			 * @param {Object} o
			 */
			pageState(n,o){
				if(n.storeNavSelected !== o.storeNavSelected){
					if(n.storeNavSelected){
						// 打开筛选弹窗
						this.openPopup('filterBarPopup');
					}else{
						this.closePopup('filterBarPopup');
					}
				}
			}
		}
		,
		created() {
			// 请求一些渲染页面必须的数据
			
			// 模拟网络请求需要数据
			try {
				let tmp = uni.getStorageSync('store_filter_data');
				if(tmp) this.storeNavList = JSON.parse(tmp);
			} catch (e) {
				console.log('获取缓存失败');
			}

			if(!this.storeNavList || !this.storeNavList.length){

				this.$http.get.store_filter_data().then((res)=>{
					this.storeNavList = res;

					uni.setStorage({
						key: 'store_filter_data',
						data: JSON.stringify(res),
						success: function () {
							console.log('存储store_filter_data成功');
						}
					});
				},(e)=>{
					console.log('请求失败',e);
				})
			}
		}
		,
		filters:{
			distaceFilter(o){
				return o > 1000 ? (o / 1000).toFixed(2) + 'km' : o + 'm';
			}
		}
		,
		methods:{
			/**
			 * 控制商铺列表中的商品显示区是否显示全部商品
			 * @param {Object} index 该商品渲染是的索引值
			 */
			controlGoodsList(index){
				if(this.showTextModeGoods.includes(index)){
					this.showTextModeGoods.splice(this.showTextModeGoods.indexOf(index),1);
				}else{
					this.showTextModeGoods.push(index);
				}
				
			}
			,
			/**
			 * 回到顶部方法
			 */
			goTop() {
				uni.pageScrollTo({
					duration:0,
					scrollTop:0
				})
			}
			,
			/**
			 * 跳转到用户点击的店铺主页
			 * @param {String} storeId 店铺id
			 */
			gotoStoreIndex(storeId){
				this.$utils.log('gotoStoreIndex','跳转到用户点击的店铺主页'+storeId);
				
				uni.navigateTo({
					url:this.$pages_path.store_index + '?store_id=' + storeId
				})
			}
			,
			/**
			 * 不喜欢该店铺
			 * @param {Number} index 店铺索引值
			 */
			dislikeStore(index){
				this.$utils.log('dislikeStore','不喜欢该店铺'+index);
				
				// 发起不喜欢请求
				
				// 将店铺从当前列表移除
				this.storeListData.splice(index,1);
				
				// 关闭遮罩
				this.controlStoreMask(index);
			}
			,
			/**
			 * 控制店铺遮罩层的打开关闭
			 * @param {Number} index 店铺索引值
			 */
			controlStoreMask(index){
				this.$utils.log('controlStoreMask','控制遮罩的开关');
				if(this.storeMaskIndex == index){
					this.storeMaskIndex = null;
					return;
				}
				
				this.storeMaskIndex = index;
			}
			,
			/**
			 * 控制是否显示更多活动
			 * @param {Number} index 店铺索引值
			 */
			showMoreActive(index){
				this.storeListData[index].restaurant.act_tag = this.storeListData[index].restaurant.act_tag ? 0 : 1;
			}
			,
			/**
			 * 用于过滤当前要展示的店铺活动数量
			 * 初始情况下默认展示2个
			 * 当用户点击下拉按钮显示全部
			 * @param {Number} index 当前店铺索引值
			 */
			activeFilter(index){
				let item = this.storeListData[index].restaurant;
				
				if(item.act_more){
					return item.activities;
				}
				
				return item.activities.slice(0,2);
			}
			,
			/**
			 * 切换排序和筛选标记
			 * @param {Object} e
			 */
			tabSelect(e) {
				this.$utils.log('tabSelect','切换商家排序筛选导航的选项');
				
				// 如果用户传递了nav点击事件先执行传递方法
				if(this.navTapFn){
					this.navTapFn()
				}
				
				// 用户唤起弹窗后再次点击相同的元素时，直接关闭弹窗
				if(this.storeNavList[e.currentTarget.dataset.id].selected && this.pageState.storeNavSelected){
					// 改变页面状态
					this.changePageState({storeNavSelected:false});
					return;
				}
				
				// 将所有nav的状态切换为未选中
				this.storeNavList.forEach(ele=>{
					ele.selected = false;
				});
				
				// 将用户选择的元素设置为选中状态
				this.$set(this.storeNavList[e.currentTarget.dataset.id],'selected',true);
				
				// console.log(e.currentTarget);
				// 开关筛选弹窗
				// 通用排序被点击
				if(e.currentTarget.dataset.id==0 || e.currentTarget.dataset.id==3){
					// 改变页面状态
					this.changePageState({storeNavSelected:true});
				}else{
					// 改变页面状态
					this.changePageState({storeNavSelected:false});
				}
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
					
					// #ifdef H5
					document.body.style = 'overflow: static;';
					// #endif
					
					if(this.pageState.storeNavSelected){
						this.pageState.storeNavSelected = false;
					}
				}
				
				if(e.show){
					
					// #ifdef H5
					document.body.style = 'overflow: hidden;';
					// #endif
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
			 * 点击选择排序方式
			 * @param {Number} index 当前选中元素索引值
			 */
			orderTap(index){
				this.$utils.log('orderTap','选择排序方式',this.storeNavList[0].list[index].name);
				this.storeNavList[0].listSelected = true;
				this.storeNavList[0].listSelectedIndex = index;
				this.storeNavList[0].title = this.storeNavList[0].list[index].name;
			}
			,
			/**
			 * 点击选择筛选方式
			 * @param {String} key 当前的分类名
			 * @param {Number} index 当前选中元素索引值
			 */
			filterTap(key,index){
				this.$utils.log('filterTap','选择筛选方式');
				// 判断是否是多选
				if(key == 'filterDataSupports'){
					
					// 判断当期选中的元素是否已经存在了 存在就将其删除
					let eleIndex = this.storeNavList[3].selectedIndex[key].findIndex(ele=>{
						return ele == index;
					});
					
					if(eleIndex !== -1){
						this.storeNavList[3].selectedIndex[key].splice(eleIndex,1);
						return;
					}
					
					// 不存在就加入数组
					if(this.storeNavList[3].selectedIndex[key][0] == -1){
						this.$set(this.storeNavList[3].selectedIndex[key],0,index);
					}else{
						this.storeNavList[3].selectedIndex[key].push(index);
					}
					
					return;
				}
				
				// 非多选操作
				if(this.storeNavList[3].selectedIndex[key] == index) {
					this.storeNavList[3].selectedIndex[key] = -1;
					return;
				}
				
				this.storeNavList[3].selectedIndex[key] = index;
			}
			,
			/**
			 * 筛选弹窗中的按钮点击事件
			 * @param {String} option 按钮标记，表示当前是哪个按钮触发的事件
			 */
			storeNavBtnTap(option){
				this.$utils.log('storeNavBtnTap','筛选中的底部按钮点击',option);
				// 清空当前选择项
				if(option == 'clear'){
					// 将已经选择的选项都清空
					this.storeNavList[3].selectedIndex.filterDataSupports = [];
					this.storeNavList[3].selectedIndex.filterDataActivity = -1;
					this.storeNavList[3].selectedIndex.averagePrice = -1;
				}
				
				// 确定当前选择的筛选项
				if(option == 'ok'){
					// 发起确定请求
					
					// 监听结果
					
					// 关闭弹窗
					this.changePageState({storeNavSelected:false});
					// 根据结果渲染新的列表
				}
			}
			,
		}
	}
</script>

<style lang="scss" scoped>
	@media screen and (min-width: 760px) {
		.popup-box{
			height: 80vh;
		}
	}
	
	.nav .cu-item{
		height: 6.8vh;
	}
	.content-box{
		width: 750rpx;
	}
	.store-list-container{
		position: relative;
	}
	.content-list-tab-box{
		position: sticky;
		z-index: 99;
		height: 6.8vh!important;
		width: 750rpx;
	}
	.bar-icon{
		width: 24rpx;
		height: 24rpx;
		margin-right: 10rpx;
	}
	.order-box{
		width: 750rpx;
	}
	
	/* // 店铺列表区域样式 */
	.store-list-item{
		position: relative;
		width: 750rpx;
	}
	.store-item-mask{
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgba($color: #000000, $alpha: 0.5);
		z-index: 9;
	}
	.store-item-mask-btn{
		width: 100rpx;
		height: 100rpx;
		line-height: 100rpx;
	}
	.store-cover-box{
		width: 128rpx;
		height: 128rpx;
		position: relative;
	}
	
	.store-title-text{
		font-size: 30rpx;
		width: 440rpx;
	}
	
	.supports-tag{
		border-width: 1px;
		border-style: solid;
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
	.store-categroy{
		padding: 0 10rpx;
	}
	
	.active-left{
		width: 440rpx;
	}
	.active-right{
		flex: 3;
		text-align: end;
	}
	.active-icon{
		height: 20rpx;
		animation: fillRotateDown 300ms ease;
	}
	.active-tag{
		padding: 0 5rpx;
		margin: 0 10rpx 0 -10rpx;
	}
	
	.animation-rotate{
		animation: fillRotateUp 300ms ease;
		transform: rotate(180deg);
	}
	
	@keyframes fillRotateUp{
		0%{transform: rotate(0deg);}
		50%{transform: rotate(90deg);}
		100%{transform: rotate(180deg);}
	}
	
	@keyframes fillRotateDown{
		0%{transform: rotate(180deg);}
		50%{transform: rotate(90deg);}
		100%{transform: rotate(0deg);}
	}
	
	.store-goods-img{
		width: 176rpx;
		height: 176rpx;
	}
	
	.img-mode .store-goods-item {
		width: 176rpx;
	}
	
	.line{
		height: 1px;
		width: 20rpx;
		background-color: #999;
	}
	
	.search-no-result-img{
		width: 180rpx;
	}
</style>
