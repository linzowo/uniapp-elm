<template>
	<scroll-view 
	class="container vs-flex-item vs-column" 
	:style="{
		height:systemInfo.windowHeight+'px',
		paddingTop:(old.scrollTop>10?120:195) + 'rpx'
		}" 
	scroll-y="true"
	:scroll-top="scrollTop"
	>
		<!-- 导航栏 S -->
		<navBar 
		:address="address"
		:style="{top:old.scrollTop>10?'-75rpx':0}"
		></navBar>
		<!-- 导航栏 S -->
		
		<!-- 主体内容部分 S -->
		<scroll-view 
		class="content-body flex flex-sub"
		scroll-y="true"
		:scroll-top="scrollTop" 
		@scroll="scroll"
		:style="{height:'100%'}"
		>
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
							v-for="(item,index) in navList.length*5" 
							:key="index">
									<image 
									:src="navList[item%2==0?1:0].img" 
									mode="aspectFill"
									class="nav-img"
									></image>
									<text 
									class="nav-title font-20 color-black6"
									>{{navList[item%2==0?1:0].title}}</text>
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
					
					<!-- nav S -->
					<view 
					class="content-list-tab-box bg-white"
					>
						<scroll-view scroll-x class="bg-white nav">
							<view class="flex text-center">
								<view 
								class="cu-item flex-sub" 
								:class="item.selected?'text-orange cur':''" v-for="(item,index) in storeNavList" 
								:key="index" 
								@tap="tabSelect" 
								:data-id="index">
									<text>{{item.title}}</text>
									<svg 
									v-if="index == 0"
									class="icon-svg text-xs " aria-hidden="true"><use xlink:href="#icon-sanjiao"></use></svg>
									<text 
									v-if="index == 3"
									class="lg" :class="'cuIcon-filter'"></text>
								</view>
							</view>
						</scroll-view>
					</view>
					<!-- nav E -->
					
					<!-- body S -->
					<view class="content-list-body justify-center">
						<!-- 已登录 S -->
						<view 
						v-if="loggedIn"
						class="logged-in margin-lr-sm"></view>
						<!-- 已登录 E -->
						
						<!-- 未登录 S -->
						<view 
						v-if="!loggedIn"
						class="logged-out flex-direction align-center justify-center text-grey">
							<image 
							class="logged-img"
							src="//fuss10.elemecdn.com/d/60/70008646170d1f654e926a2aaa3afpng.png" mode="aspectFit"></image>
							<h3 class="margin-bottom-sm">没有结果</h3>
							<text class="margin-bottom-sm text-xs">登录后查看更多商家</text>
							<navigator 
							url="/pages/login/login"
							class="logged-btn cu-btn lg">登录</navigator>
						</view>
						<!-- 未登录 E -->
						
						
					</view>
					<!-- body E -->
					
				</view>
				<!-- 店铺列表区 E -->
				
			</view>
			<!-- 获取到城市时显示 E -->
			
			<!-- 未获取到城市时显示 S -->
			<noPosition v-else class="city-page"></noPosition>
			<!-- 未获取到城市时显示 E -->
		</scroll-view>
		<!-- 主体内容部分 E -->
			
		
		
		<!-- 弹窗部分 S -->
		
		<!-- 筛选弹窗 S -->
		<uni-popup 
		ref="filterBarPopup" 
		:type="'top'"
		@change="popupChange"
		:animation="false"
		class="filter-bar-popup-box"
		>
		
			<view class="bg-white flex-sub flex-direction">
				<!-- 搜索框 S -->
				<navBar class="nav-bar"></navBar>
				<!-- 搜索框 E -->
				
				<!-- 筛选nav S -->
				<view 
				class="popup-content bg-white"
				>
					<scroll-view scroll-x class="bg-white nav">
						<view class="flex text-center">
							<view 
							class="cu-item flex-sub" 
							:class="item.selected?'text-orange cur':''" v-for="(item,index) in storeNavList" 
							:key="index" 
							@tap="tabSelect" 
							:data-id="index">
								<text>{{item.title}}</text>
								<svg 
								v-if="index == 0"
								class="icon-svg text-xs " aria-hidden="true"><use xlink:href="#icon-sanjiao"></use></svg>
								<text 
								v-if="index == 3"
								class="lg" :class="'cuIcon-filter'"></text>
							</view>
						</view>
					</scroll-view>
				</view>
				<!-- 筛选nav E -->
				
				<!-- 弹窗主体 S -->
				<view 
				class="filter-list flex-sub solids-top"
				>
					
					<!-- 排序选项 S -->
					<view
					v-if="storeNavList[0].selected"
					 class="cu-list menu flex-sub">
						<view 
						v-for="(item,index) in storeNavList[0].list"
						:key="item.name+index"
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
						<view class="flex-sub">
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
			</view>
			
		</uni-popup>
		<!-- 筛选弹窗 E -->
		
		<!-- 弹窗部分 E -->
		
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
const components = { noPosition,navBar,uniPopup,addressPage };


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
		// 顶部分类导航栏数据
		navList: [
			{
				img: "https://cube.elemecdn.com/7/d8/a867c870b22bc74c87c348b75528djpeg.jpeg?x-oss-process=image/format,webp/resize,w_90,h_90,m_fixed",
				title: "美食"
			},
			{
				img: "https://cube.elemecdn.com/a/7b/b02bd836411c016935d258b300cfejpeg.jpeg?x-oss-process=image/format,webp/resize,w_90,h_90,m_fixed",
				title: "大牌惠吃"
			}
		],
		// 商铺分类列表
		storeNavList: [
			{
				selected:true,
				list:[],
				listSelected:false,
				listSelectedIndex:0,
				title:'通用排序',
			},
			{
				selected:false,
				title:'距离最近'
			},
			{
				selected:false,
				title:'销量最高'
			},
			{
				selected:false,
				list:{
					// 筛选数据
					filterDataSupports:[],
					filterDataActivity:[],
					averagePrice:['￥20以下','￥20-￥40','￥40-￥60','￥60-￥80','￥80-￥100','￥100以上']
				},
				selectedIndex:{
					filterDataSupports:[],
					filterDataActivity:-1,
					averagePrice:-1
				},
				title:'筛选'
			}], // 商铺导航栏数据
		loggedIn: false, // 登录状态 true-登录 false-未登录
		// 一些需要的元素信息
		elementInfo:{
			'nav-bar-container':{
				bottom:0
			},
			'content-list-tab-box':{
				bottom:0,
			},
			'container':{}
		}, // 元素位置信息，key该元素的class
		// 记录当前页面状态
		pageState:{
			login:false, // 登录状态
			storeNavSelected:false, // 店铺导航栏的nav是否被选中
		}, 
		// 系统信息宽高尺寸等
		systemInfo:null, 
		// 弹窗栈用于帮助用户关闭多个弹窗
		popupStack:[],
		scrollTop: 0,
		old: {
			scrollTop: 0
		}
		
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
		
		// 获取主页单排筛选和排序方式数据
		this.storeNavList[0].list = this.$t_d.INDEX_SORT_DATA.outside.inside_sort_filter;
		this.storeNavList[3].list.filterDataSupports = [this.$t_d.INDEX_SORT_DATA.bar.delivery_mode,...this.$t_d.INDEX_SORT_DATA.bar.supports];
		this.storeNavList[3].list.filterDataActivity = this.$t_d.INDEX_SORT_DATA.bar.activity_types;
		
	}
	,
	mounted() {
		
		// 动态获取需要使用的元素的位置信息
		for (let key in this.elementInfo) {
			this.elementInfo[key] = this.$utils.getElementInfo('.'+key);
		}
		
	}
	,
	onPageScroll(e) {
		
		// 当页面滚动到顶部导航栏缩进后，获取其位置信息，用于设置商铺分类导航栏的定位设置
		if(e.scrollTop > 30 && 
				this.elementInfo['nav-bar-container'].bottom >
						this.$utils.getElementInfo('.nav-bar-container').bottom)
		{
							
				this.$set(this.elementInfo,'nav-bar-container', 
								this.$utils.getElementInfo('.nav-bar-container'));
				// console.log(this.elementInfo);
								
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
		// 监听content-body盒子的滑动事件
		scroll: function(e) {
			// 为了实现点击滑动到指定位置效果，存储的滑动数据
			this.old.scrollTop = e.detail.scrollTop;
		},
		// content-body盒子中的内容滑动到指定位置
		goTop: function(e) {
			if(this.old.scrollTop > this.elementInfo['content-list-tab-box'].top) return;
			this.scrollTop = this.old.scrollTop;
			this.$nextTick(function() {
				this.scrollTop = this.elementInfo['content-list-tab-box'].top;
			});
		}
	}
	
};
</script>

<style lang="scss" scoped>
.container {
	// background-color: #FFFFFF;
	// background-color: pink;
	// height: 1800px;
}
.content-body{
	// display: flex;
}
.nav-bar{
	position: relative;
	top: 0;
}
.logo {
	height: 200rpx;
	width: 200rpx;
	margin-top: 200rpx;
	margin-left: auto;
	margin-right: auto;
	margin-bottom: 50rpx;
}

.text-area {
	display: flex;
	justify-content: center;
}

.title {
	font-size: 36rpx;
	color: #8f8f94;
}

.city-page {
	width: 100%;
}
.nav{}
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
	// margin: 0 20rpx;
	background-image: linear-gradient(90deg,#ffefc4,#f3dda0);
	color: #644f1b;
	
	&-icon{
		width: 34rpx;
		height: 34rpx;
		color: #D8B266;
	}
}

.content-list{
	// background-color: pink;
}
.content-list-title{
	// background-color: blue;
}
.content-list-title-text{
	
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

.content-list-tab-box{
	position: sticky;
	top: 0;
	z-index: 9;
}
.content-list-body{
	// height: 1800px;
	position: relative;
}
.logged-img{
	width: 426rpx;
	height: 426rpx;
}
.logged-btn{
	width: 256rpx;
	border-radius: 6rpx;
	background-color: #56d176;
	color: #fff;
}

.popup-content{
	width: 750rpx;
}
.filter-list{
	// height: 200px;
}
.filter-bar-popup-box{
	top: -75rpx;
}
.bar-icon{
	width: 24rpx;
	height: 24rpx;
	margin-right: 10rpx;
}
.ban-click{
	color: #ddd;
}
</style>
