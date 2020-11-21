<template>
	<view 
	class="order-box flex-direction bg-grey-f5"
	:style="{height : $system_info.containerHeight + 'px'}"
	>
		<!-- 未登录 S -->
		<view 
		v-if="!login"
		class="login-no flex-sub flex-direction align-center">
			<image 
			class="logged-img"
			:src="$i_u.login_no" mode="widthFix"></image>
			<text 
			class="margin-bottom-sm text-xl login-text"
			>{{$c_t.login.order.login_tips}}</text>
			<navigator 
			url="/pages/login/login"
			class="logged-btn cu-btn lg">立即登录</navigator>
		</view>
		<!-- 未登录 E -->
		
		
		<!-- 已登录 S -->
		<view 
		v-if="login"
		class="flex-direction">
			
			<!-- 三个月内无订单 S -->
			<view 
			v-if="!hasOrderIn3m"
			class="flex-direction no-order-box align-center">
				<image 
				class="no_order_img margin-bottom"
				:src="$i_u.no_order" 
				mode="widthFix" />
				<text class="text-color-6 margin-bottom text-xl">{{$c_t.order.no_order}}</text>
			</view>
			<!-- 三个月内无订单 E -->
			
			<!-- 订单展示区 S -->
			<view class="order-list flex-direction">
				
				<view 
				v-for="(item,index) in orderData"
				:key="index"
				@tap="gotoOrderInfo(item)"
				class="order-item flex-sub padding margin-bottom bg-white flex-direction">

					
					<view class="flex-sub">
						<!-- 店铺封面 -->
						<image 
						class="store-cover margin-right-sm"
						:src="item.image_path|imgUrlFilter" 
						mode="widthFix" />

						<view class="flex-direction flex-sub">

							<!-- 顶部店铺名称等基础信息 S -->
							<view class="justify-between padding-bottom-sm border-bottom border-color-e">
								<view class="flex-direction">
									<!-- 店名 -->
									<view class="align-center margin-bottom-xs">
										<text class="text-xl text-color-3 margin-right-xs">{{item.name}}</text>
										<text class="lg text-gray cuIcon-right"></text>
									</view>

									<!-- 订单创建时间 -->
									<text class="text-xs text-grey">{{item.created_at}}</text>
								</view>

								<text class="text-color-3">{{getArrayTips(item)}}</text>

							</view>
							<!-- 顶部店铺名称等基础信息 E -->

							<!-- 商品基本详情 S -->
							<view class="align-center padding-tb-sm justify-between">
								<text class="text-color-6 food-name text-cut">{{item.foods[0].name}}{{item.foods.length>1?'等'+item.foods.length+'件商品':''}}</text>
								<text class="text-price text-color-3 text-lg">{{item.total_price}}</text>	
							</view>
							<!-- 商品基本详情 S -->

						</view>
					</view>

					<view 
					v-if="getArrayTips(item) == '订单超时未支付'"
					class="border-top border-color-e justify-end padding-top">
						<text 
						@tap.stop.prevent="reCreatOrder"
						class="padding-xs border border-color-blue text-blue">再来一单</text>
					</view>
					
				</view>

			</view>
			
			<!--  #ifndef  MP-WEIXIN -->
			<view 
			v-show="dataLoading"
			class="cu-load bg-white loading"></view>
			<!--  #endif -->
			<!--  #ifdef  MP-WEIXIN -->
			<view 
			v-if="dataLoading"
			class="cu-load bg-white loading"></view>
			<!--  #endif -->
			
			<!-- 订单展示区 E -->

			<!-- 三月提示 S -->
			<view 
			@tap="get3mOrder"
			v-if="showGetMoreBtn"
			class="text-color-9 justify-center text-xs">
				<text>{{$c_t.order.show_more}}</text>
				<text class="lg cuIcon-unfold"></text>
			</view>
			<!-- 三月提示 E -->

			<!-- 一年提示 S -->
			<view 
			v-if="!showGetMoreBtn"
			class="justify-center text-color-9 text-xs">
				<text>{{$c_t.order.over_year}}</text>
			</view>
			<!-- 一年提示 E -->

		</view>
		<!-- 已登录 E -->

	</view>
</template>

<script>
	/**
	 * @module 订单模块
	 */

	// 引入数据
	import {mapState} from 'vuex';
	
	export default {
		name:'order',
		data() {
			return {
				hasOrderIn3m:false, // 最近三个月内有订单吗
				hasOrderIn1y:false, // 最近一年内有订单吗
				showGetMoreBtn: true, // 是否显示获取更多订单数据的按钮
				orderData:[], // 历史订单数据
				showCodingTips: false, // 显示开发中提示
				dataLoading: false, // 当前是否处于数据加载中
				unpaidOrder: null, // 未付订单
			}
		},
		computed:{
			...mapState([
				'login'
			])
		}
		,
		created() {

			// 获取当前订单
			try{
				let tmp = uni.getStorageSync('unpaid_order');
				if(tmp) this.unpaidOrder = JSON.parse(tmp);
			}catch(e){
				console.log(e);
			}

			if(this.unpaidOrder){
				this.$http.get.history_order().then((res)=>{

					for (const key in this.unpaidOrder) {
						res.orders[0].expires = this.unpaidOrder[key].expires;
						this.orderData = this.orderData.concat(res.orders);
					}
					this.hasOrderIn3m = true;
					this.dataLoading = false;
				},(e)=>{
					console.log('请求数据失败',e);
				});
			}

			// 获取历史订单数据

			// 有三个月内数据
			console.log('需要测试三个月内有数据的取消下方注释');
			// this.hasOrderIn3m = true;
			// this.orderData = 获取的数据

			// 没有三个月内数据

		}
		,
		methods:{
			/**
			 * 再来一单
			 */
			reCreatOrder(){
				uni.navigateTo({
					 url: this.$pages_path.store_index,
					 fail(e) {
						 console.log(e);
					 }
				});
			}
			,
			/**
			 * 获取订单是否送达的提示
			 * @param {Object} order 订单对象
			 * @return {String} 提示文本
			 */
			getArrayTips(order){
				// 判断订单是否有过期时间
				if(order.expires){
					return (this._.now() + (15 * 60 * 1000)) > order.expires ? this.$c_t.order.timeup : this.$c_t.order.unpaid;
				}

				// 没有超时时间
				return order.is_arrive?this.$c_t.order.is_arrive:this.$c_t.order.deliverying;
			}
			,
			/**
			 * 获取三个月以上一年以内购物数据
			 */
			get3mOrder(){
				// 请求接口获取到数据后渲染至页面中
				this.showGetMoreBtn = false;
				this.dataLoading = true;

				
				this.$http.get.history_order().then((res)=>{
					this.$set(this,'orderData',[].concat(this.orderData,res.orders));
					console.log(this.orderData);

					this.dataLoading = false;
				},(e)=>{
					console.log('请求数据失败',e);
				});
			},
			/**
			 * 跳转到订单详情页
			 * @param {Object} orderObj 当前的订单对象
			 */
			gotoOrderInfo(orderObj){
				// 将订单数据存到本地方便另外一个页面读取
				try {
					uni.setStorageSync('order_info', JSON.stringify(orderObj));
				} catch (e) {
					// error
					console.log('存储数据失败',e);
				}
				// 跳转至订单详情页或者打开订单详情
				uni.navigateTo({
					 url: this.$pages_path.order_info,
					 fail(e) {
						 console.log('跳转失败',e);
					 }
				});
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #F5F5F5;
	}
	.login-no{
		padding-top: 200rpx;
	}
	.logged-btn{
		width: 256rpx;
		border-radius: 6rpx;
		background-color: #56d176;
		color: #fff;
	}
	.logged-img{
		width: 400rpx;
		height: 400rpx;
	}
	.login-text{
		color: #6a6a6a;
	}

	.no-order-box{
		padding-top: 200rpx;
	}
	.no_order_img{
		width: 400rpx;
	}

	.store-cover{
		width: 80rpx;
	}
	.food-name{
		width: 450rpx;
	}
	.cu-load{
		display: block;
	}
	.cu-load::after{
		content: "";
	}
</style>
