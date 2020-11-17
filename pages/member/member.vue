<template>
	<view class="member-container flex-direction">
		<!-- 顶部banner S -->
		<view class="member-banner">
			<image 
			class="member-banner-bgimg"
			src="https://cube.elemecdn.com/2/ba/a823f6fee0ea47583ed5254103ac9png.png?x-oss-process=image/quality,q_90/format,webp" 
			mode="widthFix"></image>
			<view class="member-banner-content flex-direction align-center justify-center padding-sm">
				<text class="text-lg">开通超级会员</text>
				<view class="banner-title text-bold align-center">
					<text>每月领</text>
					<text class="text-color-price">￥20</text>
					<text>专属红包</text>
				</view>
				<text class="text-color-banner margin-bottom">再享4大会员专属特权</text>
				<button 
				@click="openVip"
				class="head-open-vip-btn round cu-btn lg" type="default">超低价格开通会员</button>
			</view>
		</view>
		<!-- 顶部banner E -->
		
		<!-- 特权列表 S -->
		<view class="card-list padding-lr flex-direction">
			
			<!-- 内容盒子 S -->
			
			<!-- box1 -->
			<view class="card-box margin-tb-xs flex-sub bg-white padding-sm flex-direction">
				<view class="card-title align-center margin-bottom-sm">
					<text class="title-tag text-sm padding-lr-xs text-bold margin-right-xs">特权1</text>
					<text class="title-content text-bold text-lg text-color-3">每月免费领4个会员红包</text>
				</view>
				
				<view class="card-content justify-around">
					<view 
					v-for="item in 4"
					:key="item"
					class="red-packets-box flex-direction justify-center align-center padding-lr padding-tb-sm">
						<text class="red-packets-value text-price text-color-price margin-bottom-xs">5</text>
						<text class="text-color-b47738">无门槛</text>
					</view>
				</view>
				
			</view>
			
			<!-- box2 -->
			<view class="card-box margin-tb-xs flex-sub bg-white padding-sm flex-direction">
				<view class="card-title align-center margin-bottom-sm">
					<text class="title-tag text-sm padding-lr-xs text-bold margin-right-xs">特权2</text>
					<text class="title-content text-bold text-lg text-color-3">会员红包可升级大额商家红包</text>
				</view>
				
				<view class="card-content">
					
					<!-- 轮播组件 -->
					<swiper 
					class="screen-swiper flex-sub store-red-packets-swiper" 
					:class="'square-dot'" 
					:indicator-color="'#b47738'"
					:indicator-active-color="'#b47738'"
					:indicator-dots="true" 
					:circular="true"
					:autoplay="true" 
					interval="5000" 
					duration="500"
					v-if="storeRedPackets"
					>
						<swiper-item 
						v-for="(item,index) in parseInt(storeRedPackets.prizes.length/6)" 
						:key="index"
						class="store-list flex justify-between flex-wrap"
						>
							<view 
							v-for="(ele,i) in storeRedPackets.prizes.slice(index*6,(index+1)*6)"
							:key="ele.coupons.activity_id"
							class="store-item flex-direction align-center margin-bottom padding-tb border-radius-10"
							>
								<image 
								class="store-cover border-radius-10"
								:src="ele.restaurant.image_url" 
								mode="widthFix"
								></image>
								<text class="store-title text-cut text-sm margin-bottom-xs">{{ele.restaurant.name}}</text>
								<view class="align-end">
									<text class="text-price text-color-price text-xxl text-bold margin-right-xs">{{ele.coupons[0].reduce_amount}}</text>
									<text class="text-color-b47738">无门槛</text>
								</view>
								
							</view>
						</swiper-item>
					</swiper>
					<!-- 轮播组件 -->
					
				</view>
			</view>
			
			<!-- box3 -->
			<view 
			v-if="rewardReadPackets"
			class="card-box card-box-3 margin-tb-xs flex-sub bg-white padding-sm flex-direction">
				<view class="card-title margin-bottom-sm flex-direction">
					<view class="align-center">
						<text class="title-tag text-sm padding-lr-xs text-bold margin-right-xs">{{rewardReadPackets.tag}}</text>
						<text class="title-content text-bold text-lg text-color-3">{{rewardReadPackets.title}}</text>
					</view>
					<text class="text-xs text-color-c">{{rewardReadPackets.subTitle}}</text>
				</view>
				
				<view class="reward-list justify-between">
					
					<view 
					v-for="(item,index) in rewardReadPackets.content"
					:key="index"
					class="reward-item border border-radius-20 padding-sm flex-direction align-center">
						<view class="reward-title margin-bottom-xs align-center">
							<image 
							class="reward-icon margin-right-xs"
							src="https://cube.elemecdn.com/9/a9/3bf74c7fc7e8a989be429a56b7053svg.svg" 
							mode="widthFix"
							></image>
							<text class="text-color-price">{{item.title.highlight[0]}}</text>
							<text>{{item.title.text.slice(item.title.highlight[0].length)}}</text>
						</view>
						<view class="reward-red-packets padding align-center padding-right-xl">
							<text class="text-price text-color-price margin-right text-xxl text-bold">{{item.amount}}</text>
							<text class="reward-name">{{item.name}}</text>
						</view>
					</view>
					
				</view>
			</view>
			
			<!-- box4 -->
			<view class="card-box margin-tb-xs flex-sub bg-white padding-sm flex-direction">
				<view class="card-title align-center margin-bottom-sm">
					<text class="title-tag text-sm padding-lr-xs text-bold margin-right-xs">特权4</text>
					<text class="title-content text-bold text-lg text-color-3">会员专属特价商品</text>
				</view>
				
				<view class="card-content flex-direction">
					
					<!-- 轮播组件 -->
					<swiper 
					class="screen-swiper flex-sub sale-goods-swiper" 
					:class="'square-dot'" 
					:indicator-color="'#b47738'"
					:indicator-active-color="'#b47738'"
					:indicator-dots="true" 
					:circular="true"
					:autoplay="true" 
					interval="5000" 
					duration="500"
					v-if="saleGoods"
					>
						<swiper-item 
						v-for="(item,index) in parseInt(saleGoods.query_list.length/4)" 
						:key="index"
						class="sale-goods-list flex justify-between flex-wrap"
						>
							<view 
							v-for="(ele,i) in saleGoods.query_list.slice(index*4,(index+1)*4)"
							:key="ele.foods[0].food_id"
							class="sale-goods-item flex-direction align-start margin-bottom-sm padding-tb-xs border-radius-10"
							>
							
								<view class="sale-goods-cover-box">
									<image
									class="sale-goods-cover border-radius-10"
									:src="ele.foods[0].image_path,'w_250,h_250'|imgUrlFilter" 
									mode="top|aspectFill"
									></image>
									<text 
									class="sale-goods-cover-tips text-white text-sm border-radius-10 padding-lr-xs"
									:style="{backgroundColor:'#'+ele.foods[0].activities[0].icon_color}"
									>会员专享{{ele.foods[0].activities[0].tips}}</text>
								</view>
								
								<text class="sale-goods-title text-cut text-sm margin-bottom-xs text-color-3">{{ele.foods[0].name}}</text>
								<view class="align-center">
									<text class="text-price text-color-3 text-xxl text-bold margin-right-xs">{{ele.foods[0].price}}</text>
									<text class="text-price text-color-9 delete-line">{{ele.foods[0].original_price}}</text>
								</view>
								
							</view>
						</swiper-item>
					</swiper>
					<!-- 轮播组件 -->
					<view class="justify-center flex-sub">
						<text class="text-xs text-color-9">特价菜品及价格以商家店内实际上架为准</text>
					</view>
				</view>
			</view>
			
			<!-- box5 -->
			<view class="card-box margin-tb-xs flex-sub bg-white padding-sm flex-direction">
				<view class="card-title align-center margin-bottom-sm">
					<text class="title-tag text-sm padding-lr-xs text-bold margin-right-xs">特权5</text>
					<text class="title-content text-bold text-lg text-color-3">会员专属客服</text>
				</view>
				
				<view class="card-content flex-direction align-center">
					<image 
					class="service-cover margin-tb"
					src="https://cube.elemecdn.com/9/b8/c5f575ba0eb4ed2531c21c8f3ce0bpng.png?x-oss-process=image/quality,q_90/format,webp" 
					mode="widthFix"></image>
					<text class="text-xs">超级会员享有24小时客服专线，配有专属客服，竭诚提供更专业、更优质的服务</text>
				</view>
			</view>
			<!-- 内容盒子 E -->	
		
		</view>
		<!-- 特权列表 E -->
		
		<!-- 底部固定按钮 S -->
		<view 
		class="fixed-btn-box justify-center padding-bottom footer-open-vip-btn-box"
		:class="[showFooterBtn?'animation-slide-bottom':'btn-hidden']"
		>
			<button 
			@click="openVip"
			class="footer-open-vip-btn round cu-btn padding-xl flex-sub" type="default">超低价格开通会员</button>
		</view>
		<!-- 底部固定按钮 E -->
		
		
	</view>
</template>

<script>
	/**
	 * @module 会员介绍页
	 */
	
	import {mapState} from 'vuex';
	
	export default {
		data() {
			return {
				storeRedPackets:null, // 商家大额红包服务数据
				rewardReadPackets:null, // 奖励红包数据
				saleGoods:null, // 折扣商品数据
				showFooterBtn:false, // 控制底部按钮出现的指标
			}
		},
		computed:{
			...mapState([
				'login'
			])
		}
		,
		created() {
			
			// 模拟获取必要数据过程
			// 获取支持商家大额红包兑换的商家列表
			this.$http.get.store_red_packets().then((res)=>{
				this.storeRedPackets = res;
			},e=>{
				console.log(e);
			});
			// 获取奖励红包数据
			this.$http.get.reward_red_packets().then((res)=>{
				this.rewardReadPackets = res[2];
			},e=>{
				console.log(e);
			});
			// 折扣商品数据
			this.$http.get.member_sale_goods().then((res)=>{
				this.saleGoods = res;
			},e=>{
				console.log(e);
			});
		},
		onPageScroll(e) {
			if(this.$utils.getElementInfo('.card-box-3').bottom <= this.$system_info.screenHeight && !this.showFooterBtn){
				this.showFooterBtn = true;
			}else if(this.$utils.getElementInfo('.card-box-3').bottom > this.$system_info.screenHeight && this.showFooterBtn){
				this.showFooterBtn = false;
			}
		},
		methods:{
			/**
			 * 开通vip
			 */
			openVip(){
				this.$utils.log('openVip','开通vip按钮被点击，如果已登录就跳转至开通页，未登录就跳转至登录页')
				if(this.login){
					console.log('跳转至会员开通页面');
				}else{
					uni.navigateTo({
						url:this.$pages_path.login,
						fail(e) {
							console.log('跳转登录页失败：',e);
						}
					})
				}
			}
		}
		
	}
</script>

<style lang="scss" scoped>
	.member-container{
		padding-bottom: 200rpx;
	}
	.member-banner{
		position: relative;
		height: 340rpx;
	}
	.member-banner-bgimg{
		position: absolute;
		width: 750rpx;
		z-index: 0;
	}
	.member-banner-content{
		position: relative;
		width: 750rpx;
		z-index: 9;
		color: #f2d499;
	}
	.head-open-vip-btn{
		background-color: #f2d499;
		background-image: linear-gradient(135deg,#f7e8c9,#f2d499);
		width: 500rpx;
		color: rgba(64,33,10,.8);
		font-size: 32rpx;
	}
	.banner-title{
		font-size: 60rpx;
	}
	.text-color-banner{
		color: #8a7a5c;
	}
	.card-box{
		border-radius: 10rpx;
		box-shadow: 0 8rpx 10rpx 0 rgba(0,0,0,.03);
	}
	.title-tag{
		background-color: #f2d499;
		color: rgba(64,33,10,.8);
		border-radius: 10rpx;
	}
	.red-packets-box{
		background-color: rgba(255,230,181,.5);
		border-radius: 10rpx;
		position: relative;
		overflow: hidden;
	}
	.red-packets-value{
		font-size: 65rpx;
		font-weight: 500;
	}
	.red-packets-box::before,.red-packets-box::after{
		content: "";
		border-radius: 50%;
		width: 16rpx;
		height: 16rpx;
		background-color: #fff;
		display: block;
		position: absolute;
		bottom: 50rpx;
	}
	.red-packets-box::before{
		left: -8rpx;
	}
	.red-packets-box::after{
		right: -8rpx;
	}
	.text-color-b47738{
		color: #b47738;
	}
	
	.store-red-packets-swiper{
		height: 600rpx;
	}
	.store-list{
		height: 560rpx!important;
	}
	.store-item{
		width: 200rpx;
		display: inline-flex;
		margin: 0 10rpx 10rpx 0;
		background-color: rgba(255,230,181,.2);
		position: relative;
	}
	.store-title{
		width: 140rpx;
	}
	.store-cover{
		width: 120rpx;
		height: 120rpx;
	}
	
	.reward-item{
		border-color: rgba(180,119,56,.25);
	}
	.reward-title{
		color: #b47738;
	}
	.reward-red-packets{
		background-color: rgba(255,230,181,.5);
		position: relative;
	}
	.reward-red-packets::before,.reward-red-packets::after{
		content: "";
		border-radius: 50%;
		width: 16rpx;
		height: 16rpx;
		background-color: #fff;
		display: block;
		position: absolute;
		left: 80rpx;
	}
	.reward-red-packets::before{
		top: -8rpx;
	}
	.reward-red-packets::after{
		bottom: -8rpx;
	}
	.reward-icon{
		width: 28rpx;
		height: 28rpx;
	}
	.reward-name{
		color: #b47738;
	}
	
	.sale-goods-swiper{
		height: 710rpx!important;
	}
	.sale-goods-list{
		
	}
	.sale-goods-cover,.sale-goods-title{
		width: 310rpx;
	}
	.sale-goods-cover{
		height: 222rpx;
	}
	.sale-goods-cover-box{
		position: relative;
	}
	.sale-goods-cover-tips{
		position: absolute;
		bottom: 0;
		left: 0;
	}
	
	.service-cover{
		width: 256rpx;
	}
	
	.footer-open-vip-btn-box{
		width: 750rpx;
		position: fixed;
		bottom: 0;
		background-color: #F4F4F4;
	}
	.footer-open-vip-btn{
		background-color: #f2d499;
		background-image: linear-gradient(135deg,#f7e8c9,#f2d499);
		color: rgba(64,33,10,.8);
		font-size: 32rpx;
	}
	.btn-hidden{
		display: none;
	}
</style>
