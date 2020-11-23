<template>
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
					<!--  #ifndef  MP-WEIXIN -->
					<view 
					v-show="shopCartPriceCount.save_money"
					class="save-money-tips flex-sub align-center justify-center text-xs text-color-3">
					<!--  #endif -->
					<!--  #ifdef  MP-WEIXIN -->
					<view 
					v-if="shopCartPriceCount.save_money"
					class="save-money-tips flex-sub align-center justify-center text-xs text-color-3">
					<!--  #endif -->
					
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
							:key="k"
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
</template>

<script>
// 引入官方组件
import uniPopup from "@/components/uni-popup/uni-popup.vue";
// import {mapState,mapMutations} from 'vuex';

// 引入购物车方法mixin
import {shopcartMethodsMixin} from "@/common/mixinMain.js";

export default {
	name: "storeIndexPopup",
	mixins:[shopcartMethodsMixin],
	props:['lodingEnd','storeData','shopCart','goodsInfoPopupData','goodsTasteData'],
	methods:{
		popupChange(e){
			this.$emit('popupChange',e);
		},
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
		 * 打开弹窗
		 * @param {String} ref 弹窗的ref值
		 */
		openPopup(ref){
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
		 * 兑换红包事件
		 * @param {String} type 兑换那种类型的 normal为普通红包 vip为vip红包
		 * @param {Number} redpackObj 红包对象
		 */
		exchangeRedpack(type,redpackObj){
			this.$emit('exchangeRedpack',type,redpackObj)
		},
		openSvip(){
			this.$emit('openSvip')
		},
		add2cart(food){
			this.$emit('add2cart',food)
		}
	}
};
</script>

<style lang="scss" scoped>
@import url(./storeIndex.scss);
</style>
