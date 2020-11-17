<template>
	<view 
	class="container vs-flex-item vs-column" 
	>
		<!-- 导航栏 S -->
		<navBar 
		:address="userInfo.shipAddress.position_name"
		:style="{top:old.scrollTop>10?'-37px':0}"
		></navBar>
		<!-- 导航栏 S -->
		
		<!-- 主体内容部分 S -->
		<view 
		:style="{marginTop:old.scrollTop>10?'60px':'97px'}"
		class="content-body flex flex-sub">
			<!-- 获取到城市时显示 S -->
			<view v-if="userInfo.shipAddress.position_name" class="vs-column vs-space-center">
				<!-- 导航区 S -->
				<view class="nav vs-column">
					<view class="bg-white vs-flex-item vs-column">
						<view class="grid margin-bottom text-center" :class="'col-5'">
							<navigator 
							url="/pages/categoryList/categoryList"
							class="padding-xs flex vs-column vs-align-center" 
							:style="{width:'150rpx'}"
							v-for="(item,index) in navList" 
							:key="index">
									<image 
									:src="item.image_hash,'w_90,h_90'|imgUrlFilter" 
									mode="aspectFill"
									class="nav-img"
									></image>
									<text 
									class="nav-title font-20 color-black6"
									>{{item.name}}</text>
							</navigator>
						</view>
					</view>
				</view>
				<!-- 导航区 E -->
				
				<!-- 广告区 S -->
				<navigator 
				url="/pages/combo/combo"
				class="banner flex vs-row vs-space-between">
					<view class="banner-text vs-column">
						<h3 class="banner-title margin-bottom-xs">品质套餐</h3>
						<text class="banner-info font-28 color-black7 margin-bottom-sm">搭配齐全吃得好</text>
						<text class="banner-link font-20 text-orange">立即抢购></text>
					</view>
					<image 
					class="banner-img"
					src="https://cube.elemecdn.com/e/ee/df43e7e53f6e1346c3fda0609f1d3png.png?x-oss-process=image/format,webp/resize,w_282,h_188,m_fixed" mode="aspectFit"></image>
				</navigator>
				<!-- 广告区 E -->
				
				<!-- 会员区 S -->
				<navigator 
				url="/pages/member/member"
				class="member padding-sm flex justify-between margin-sm margin-top-xs align-center margin-bottom">
					<view class="left align-center">
						<text class="iconfont icon-huangguan member-icon margin-right-xs"></text>
						<h3 class="text">超级会员</h3>
						<text class="iconfont icon-dian text-xs"></text>
						<text class="text-xs">每月享超值权益</text>
					</view>
					<text class="right text-xs">
						立即开通 >
					</text>
				</navigator>
				<!-- 会员区 E -->
				
				<!-- 店铺列表区 S -->
				<view class="content-list flex-direction">
					<view class="content-list-title flex-sub justify-center margin-bottom-sm">
						<text class="content-list-title-text font-30">推荐商家</text>
					</view>
					
					
					<store-list 
					:top="navBarHeight"
					:showGotop="false"
					:nativeNav="false"
					:navTapFn="scrollToStoreList"
					:storeListData="storeListData"
					:hasNext="hasNext"
					:loading="storeListDataLoading"
					class="store-list"
					></store-list>
					
				</view>
				<!-- 店铺列表区 E -->
				
			</view>
			<!-- 获取到城市时显示 E -->
			
			<!-- 未获取到城市时显示 S -->
			<noPosition v-else class="city-page"></noPosition>
			<!-- 未获取到城市时显示 E -->
		</view>
		<!-- 主体内容部分 E -->
			
		
		
		<!-- 弹窗部分 S -->
		
		<!-- 弹窗部分 E -->
		
		<!-- 回到顶部模块 S -->
		<gotop 
		:gotopFn="goTop"
		:targetTop="300"
		:scrollTop="old.scrollTop"></gotop>
		<!-- 回到顶部模块 E -->
		
	</view>
</template>

<script>
/**
 * @module index-项目首页
 * @description 项目首页
 */

// 引入vuex中的对象方便调用方法
import {mapState,mapActions,mapMutations} from 'vuex';

// 引入未获取到城市时的提示页面
import noPosition from '@/components/noPosition/noPosition.vue';
// 引入顶部导航栏模块
import navBar from '@/components/navBar/navBar.vue';
// 地址模块
import addressPage from '@/pages/address/address.vue';
// 店铺排序筛选模块
import storeList from '@/components/store-list/store-list.vue'; 
// 回到顶部工具
import gotop from '@/components/gotop/gotop.vue';

// 引入官方组件
import uniPopup from '@/components/uni-popup/uni-popup.vue';


/**
 * @static 
 * @description index模块下包含的子组件
 * @property {Component} noPosition 未获取到用户城市时显示的页面
 * @property {Component} navBar 自定义navbar模块
 * @property {Component} addressPage 地址管理模块
 * @property {Component} uniPopup uni组件-弹出层
 */
const components = { noPosition,navBar,uniPopup,addressPage,storeList,gotop };


/**
 * @static 
 * @description index模块下的数据
 * @property {String} address 顶部地址栏地址
 * @property {Array} navList 顶部分类导航栏数据
 * @property {Object} pageState 当前页面的状态信息，用于控制页面的呈现状态
 * @property {Array} popupStack 弹窗栈用于关闭多个弹窗时使用
 * @property {Number} scrollTop content-body控制滑动需要的数据
 * @property {Object} old content-body控制滑动需要的数据
 */
const data = function() {
	return {
		navList: [], // 顶部分类导航栏数据
		loggedIn: false, // 登录状态 true-登录 false-未登录
		// 记录当前页面状态
		pageState:{}, 
		popupStack:[], // 弹窗栈用于帮助用户关闭多个弹窗
		scrollTop: 0, // 用于控制页面滚动到哪个位置的
		old: {
			scrollTop: 0, // 记录当前页面的滚动位置的
		},
		controlPageScroll: true, // 控制主页面是否可以滑动的
		navBarHeight:60, // 顶部自定义navbar的默认高度用来设置其他元素的高度使用的
		storeListData: [], // 商铺列表数据
		storeListDataLoading: true, // 商铺数据加载中
		hasNext: false, // 是否还存在下一组数据
	};
};

const computed = {
	...mapState([
		'userInfo',
		'login'
	])
};

const watch = {
	/**
	 * 监听页面状态变化，根据状态设置对应的操作
	 * @param {Object} n
	 * @param {Object} o
	 */
	pageState(n,o){},
	/**
	 * 监听登录状态变化
	 * 如果新状态与旧状态不一致且新状态为已登录就获取数据
	 */
	login(n,o){
		if(n !== o && n){
			this.storeListDataLoading = true;

			this.$http.get.store_list_data_1().then((res)=>{
				this.storeListData = res.items;
				this.hasNext = res.has_next;
				this.storeListDataLoading = false;
			},e=>{
				console.log(e);
				this.storeListDataLoading = false;
			});
		}
	}
};

export default {
	components,
	data,
	computed,
	watch,
	created() {
		
		// 在结构创建完成后页面渲染前获取一些渲染必要的数据
		
		// 将收货定位信息绑定到元素上
		// this.address = this.userInfo.shipAddress.position_name || null;
		try {
			this.navList = JSON.parse(uni.getStorageSync('index_enter_data'));
		} catch (e) {
			this.navList = [];
		}

		// 本地没有数据向网络请求数据
		if(!this.navList || !this.navList.length){
			this.$http.get.index_enter_data().then((res)=>{
				this.navList = res;

				uni.setStorage({
					key: 'index_enter_data',
					data: JSON.stringify(res),
					success: function () {
						console.log('存储index_enter_data成功');
					}
				});

			},(e)=>{
				console.log('请求失败');
			});
		}

		
		
		if(this.login){
			this.$http.get.store_list_data_1().then((res)=>{
				this.storeListData = res.items;
				this.hasNext = res.has_next;
				this.storeListDataLoading = false;
			},e=>{
				console.log(e);
				this.storeListDataLoading = false;
			});
		}else{
			this.storeListDataLoading = false;
		}
		
	}
	,
	mounted() {}
	,
	onPageScroll(e) {
		this.old.scrollTop = e.scrollTop;
	}
	,
	onReachBottom(){
		// 调用getmore方法获取更多数据
		this.getMore();
	}
	,
	onBackPress(e) {
		
		// 当存在打开的弹窗时通过返回键可以关闭弹窗
		if(this.popupStack.length > 0){
			this.closePopup(this.popupStack[this.popupStack.length-1]);
			return true;
		}
		
	}
	,
	methods: {
		/**
		 * 当页面滑动底部时触发获取更多列表数据
		 */
		getMore(){
			// console.log('滑到底部了');
			// 发起请求获取新的数据
			
			if(this.hasNext){

				if(this.storeListData.length>8){
					this.$http.get.store_list_data_3().then(res=>{
						this.storeListData = [
							...this.storeListData,
							...res.items
						];
						this.hasNext = res.has_next;
					},e=>{
						console.log(e);
						this.hasNext = false;
					});
					return;
				}

				this.$http.get.store_list_data_2().then(res=>{
					this.storeListData = [
						...this.storeListData,
						...res.items
					];
					this.hasNext = res.has_next;
				},e=>{
					console.log(e);
					this.hasNext = false;
				});
			}
			
		}
		,
		/**
		 * 使页面滚动到商铺列表位置
		 */
		scrollToStoreList(){
			this.$utils.log('scrollToStoreList','使页面滚动到商铺列表位置');
			
			if(this.$utils.getElementInfo('.store-list').top > this.navBarHeight){
				uni.pageScrollTo({
					duration:0,
					scrollTop: this.$utils.getElementInfo('.store-list').top - this.$utils.getElementInfo('.container').top - this.navBarHeight
				})
			}
		}
		,
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
		...mapActions([
			'getUserInfo'
		])
		,
		// 使主页面回到顶部
		goTop: function() {
			this.scrollTop = this.old.scrollTop;
			this.$nextTick(function() {
				this.scrollTop = 0;
			});
		}
	}
	
};
</script>

<style lang="scss" scoped>

.city-page {
	width: 100%;
}
.nav-img{
	width: 90rpx;
	height: 90rpx;
}
.banner{
	background-color: #fafafa;
	margin: 0 20rpx;
	padding: 24rpx 0 0 30rpx;
	
	&-text{
		height: 220rpx;
	}
	
	&-title{
		// margin-bottom: 1.33333 * 7.5rpx;
	}
	
	&-info{
		// margin-bottom: 2.4 * 7.5rpx;
	}
	
	&-link{
		
	}
	
	&-img{
		width: 282rpx;
		height: 188rpx;
	}
}

.member{
	background-image: linear-gradient(90deg,#ffefc4,#f3dda0);
	color: #644f1b;
	
	&-icon{
		width: 34rpx;
		height: 34rpx;
		color: #D8B266;
	}
}

.content-list-title-text::before,
.content-list-title-text::after{
	content: "";
	display: inline-block;
    vertical-align: middle;
	width: 50rpx;
	height: 1rpx;
	background-color: #999;
	margin: 0 30rpx;
}
</style>
