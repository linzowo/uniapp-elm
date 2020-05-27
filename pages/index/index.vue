<template>
	<scroll-view 
	class="container vs-flex-item vs-column" 
	:style="{
		height:'calc(100vh - 50px)',
		paddingTop:old.scrollTop>10?'120rpx':'195rpx'
		}" 
	:scroll-y="controlPageScroll"
	@scroll="scroll"
	:scroll-top="scrollTop"
	>
		<!-- 导航栏 S -->
		<navBar 
		:address="address"
		:style="{top:old.scrollTop>10?'-75rpx':0}"
		></navBar>
		<!-- 导航栏 S -->
		
		<!-- 主体内容部分 S -->
		<view class="content-body flex flex-sub">
			<!-- 获取到城市时显示 S -->
			<view v-if="address" class="vs-column vs-space-center">
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
									:src="item.img" 
									mode="aspectFill"
									class="nav-img"
									></image>
									<text 
									class="nav-title font-20 color-black6"
									>{{item.title}}</text>
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
						<svg class="icon-svg member-icon margin-right-xs" aria-hidden="true"><use xlink:href="#icon-huangguan"></use></svg>
						<h3 class="text">超级会员</h3>
						<svg class="icon-svg text-xs " aria-hidden="true"><use xlink:href="#icon-dian"></use></svg>
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
					:nav-style="{top:navBarHeight+'px'}"
					:showGotop="false"
					:scroll="controlStoreScroll"
					:nativeNav="false"
					:navTapFn="scrollToStoreList"
					:gotopFlag="scrollTop==0"
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
		:scrollTop="old.scrollTop"></gotop>
		<!-- 回到顶部模块 E -->
		
	</scroll-view>
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
import navBar from '@/components/common/navBar.vue';
// 地址模块
import addressPage from '@/pages/address/address.vue';
// 店铺排序筛选模块
import storeList from '@/components/store-list/store-list.vue'; 
// 回到顶部工具
import gotop from '@/components/common/gotop.vue';

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
 * @property {Array} storeNavList 商铺分类列表数据
 * @property {Object} elementInfo 部分元素的位置信息-可以根据需要自行添加类样式获取其他元素
 * @property {Object} pageState 当前页面的状态信息，用于控制页面的呈现状态
 * @property {Object} systemInfo 系统信息：宽高尺寸等
 * @property {Array} popupStack 弹窗栈用于关闭多个弹窗时使用
 * @property {Number} scrollTop content-body控制滑动需要的数据
 * @property {Object} old content-body控制滑动需要的数据
 */
const data = function() {
	return {
		navList: [], // 顶部分类导航栏数据
		storeNavList: [], // 商铺导航栏数据
		loggedIn: false, // 登录状态 true-登录 false-未登录
		elementInfo:{}, // 元素位置信息，key该元素的class
		// 记录当前页面状态
		pageState:{
			login:false, // 登录状态
			storeNavSelected:false, // 店铺导航栏的nav是否被选中
		}, 
		systemInfo:null, // 系统信息宽高尺寸等
		popupStack:[], // 弹窗栈用于帮助用户关闭多个弹窗
		scrollTop: 0,
		old: {
			scrollTop: 0
		},
		controlStoreScroll: false,
		controlPageScroll: true,
		navBarHeight:60,
		
	};
};

const computed = {
	...mapState([
		'userInfo'
	]),
	// 顶部收货地址
	address(){
		return this.userInfo.shipAddress.position_name || null;
	}
};

const watch = {
	/**
	 * 监听页面状态变化，根据状态设置对应的操作
	 * @param {Object} n
	 * @param {Object} o
	 */
	pageState(n,o){
		if(n.storeNavSelected){
			// 打开筛选弹窗
			this.openPopup('filterBarPopup');
			
			// 获取元素位置，将元素置顶
			this.goTop();
		}else{
			this.closePopup('filterBarPopup');
		}
	}
};

export default {
	components,
	data,
	computed,
	watch,
	onLoad() {
		
		// 获取系统信息备用
		uni.getSystemInfo({
			success:(e)=>{
				// console.log(e);
				this.systemInfo = e;
			}
		})
	},
	created() {
		
		// 在结构创建完成后页面渲染前获取一些渲染必要的数据
		
		// 将收货定位信息绑定到元素上
		// this.address = this.userInfo.shipAddress.position_name || null;
		
		this.navList = Array(10);
		this.navList.fill(this.$t_d.NAV_LIST_DATA[0],0,5);
		this.navList.fill(this.$t_d.NAV_LIST_DATA[1],5,10);
		
		this.storeNavList = this.$t_d.STORE_FILTER_DATA;
	}
	,
	mounted() {
		
		// 动态获取需要使用的元素的位置信息
		for (let key in this.elementInfo) {
			this.elementInfo[key] = this.$utils.getElementInfo('.'+key);
		}
		
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
		scrollToStoreList(){
			
			if(this.$utils.getElementInfo('.store-list').top>this.navBarHeight){
				
				this.scrollTop = this.old.scrollTop;
				this.$nextTick(function() {
					this.scrollTop = this.$utils.getElementInfo('.store-list').top;
				});
			}
		}
		,
		/**
		 * 切换推荐商家分类选择
		 * @param {Object} e
		 */
		tabSelect(e) {
			this.$utils.log('tabSelect','切换商家排序筛选导航的选项');
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
			this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
			
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
				
				if(this.pageState.storeNavSelected){
					this.pageState.storeNavSelected = false;
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
		...mapActions([
			'getUserInfo',
			'saveAddress'
		])
		,
		// 监听主页面滑动
        scroll: function(e) {
			
			// 为了实现点击滑动到指定位置效果，存储的滑动数据
            this.old.scrollTop = e.detail.scrollTop
			
			// console.log(this.$utils.getElementInfo('.store-list'));
			// 如果商铺列表盒子滑动到顶部就打开其滑动控制让其能够滑动
			if(this.$utils.getElementInfo('.store-list').top <= this.navBarHeight && !this.controlStoreScroll){
				this.controlStoreScroll = true;
			}
			
			// 如果商铺列表盒子离开顶部就关闭其滑动
			if(this.$utils.getElementInfo('.store-list').top > this.navBarHeight && this.controlStoreScroll){
				this.controlStoreScroll = false;
			}
        }
		,
		// content-body盒子中的内容滑动到指定位置
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
