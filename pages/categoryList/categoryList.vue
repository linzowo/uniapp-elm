<template>
	<view 
	class="category-container flex-direction"
	:style="{paddingTop:'50px'}"
	>
		
		<!-- navBar S -->
		<view 
		class="cu-bar flex-direction mbg-gradual-blue align-stretch nav-bar"
		:style="{zIndex:pageState.navBtnSelected?0:999}"
		>
			
			<!-- 顶部自定义导航栏 S -->
			<view class="flex-sub">
				<scroll-view 
				scroll-x 
				class="nav scroll-box" 
				scroll-with-animation 
				:scroll-into-view="categotyID"
				>
					<view 
					class="cu-item" 
					:class="[index==TabCur?'text-white cur':'text-color-e']" 
					v-for="(item,index) in foodType.sub_categories" 
					:key="index" 
					@tap="typeSelect" 
					:data-id="index"
					:id="'cu-item'+index"
					>
						{{item.name}}
					</view>
				</scroll-view>
				<view 
				@tap="navBtnTap"
				class="padding nav-bar-btn">
					<text class="lg text-white cuIcon-unfold"></text>
				</view>
			</view>
			<!-- 顶部自定义导航栏 E -->
			
		</view>
		<!-- navBar E -->
		
		<!-- content S -->
		<store-list 
		:top="50"
		:nativeNav="false"
		:nativeTabbar="false"
		:storeListData="storeListData"
		:hasNext="hasNext"
		:pageScroll="pageScroll"
		:loading="storeListDataLoading"
		></store-list>
		<!-- content E -->
		
		<!-- 弹窗部分 S -->
		
		<!-- nav弹窗 S -->
		<uni-popup
		ref="filterCategoryPopup" 
		:type="'top'"
		@change="popupChange"
		:animation="true"
		class="filter-bar-popup-box"
		>
			<view class="category-box flex-direction">
				<!-- title S -->
				<view class="title-box bg-grey-fa justify-between">
					<text class="padding">请选择分类</text>
					<text 
					@tap="changePageState({navBtnSelected:false})"
					class="cuIcon-close text-xl padding"></text>
				</view>
				<!-- title E -->
				
				<!-- category S -->
				<view class="category-box flex-sub">
					
					<!-- category-head S -->
					<scroll-view scroll-y class="bg-white nav flex-direction category-head bg-grey-fc">
						<view 
						class="cu-item justify-between padding-lr-sm align-center" 
						:class="index==categoryCur?'cur-left text-color-blue bg-white':' bg-grey-fc'" 
						v-for="(item,index) in categoryData" 
						:key="index" 
						@tap="categoryHeadtabSelect" 
						:data-id="index"
						:style="{display:'flex'}"
						>
							<text class="text-color-6">{{item.name}}</text>
							<text class="round text-xs border border-color-e padding-0 tag-text">{{item.count}}</text>
						</view>
					</scroll-view>
					<!-- category-head E -->
					
					<!-- category-body S -->
					<scroll-view scroll-y class="bg-white nav flex-direction category-body">
						<view 
						class="cu-item justify-between padding-lr-sm align-center" 
						:class="index == categorySelected[1] && categoryCur == categorySelected[0] ? 'text-color-blue':''" 
						v-for="(item,index) in categoryData[categoryCur].sub_categories" 
						:key="index" 
						@tap="categoryBodytabSelect" 
						:data-id="index"
						:style="{display:'flex'}"
						>
							<view class="">
								<!-- <image :src="'https://fuss10.elemecdn.com/d/60/'+item.image_url+'.png'" mode="widthFix"></image> -->
								<text>{{item.name}}</text>
							</view>
							<text 
							:class="index == categorySelected[1] && categoryCur == categorySelected[0] ?'cur':''"
							class="round text-xs border border-color-e padding-0 tag-text">{{item.count}}</text>
						</view>
					</scroll-view>
					<!-- category-body E -->
					
				</view>
				<!-- category E -->
			</view>
		</uni-popup>
		<!-- nav弹窗 E -->
		
		<!-- 弹窗部分 E -->
		
	</view>
</template>

<script>
	/**
	 * @module category-list 店铺分类列表页面
	 */
	
	import {mapState,mapMutations} from 'vuex';
	
	// 店铺排序筛选模块
	import storeList from '@/components/store-list/store-list.vue'; 
	
	export default {
		name:'categoryList',
		data() {
			return {
				navBarInfo:{},
				TabCur: 0, // 当前顶部navbar中选中的是第几个分类
				foodType:[], // 顶部navbar显示的商铺类别数据
				categoryCur:0, // 现在选择的是那个大类
				categorySelected:[0,0], // 类别矩阵 标识当前选中的是第几个大类中的第几个小类
				categoryData:[], // 分类列表呈现时使用的数据
				categotyID:null, // 锚点定位id
				// 记录当前页面状态
				pageState:{
					login:false, // 登录状态
					navBtnSelected:false, // 自定义顶部nav按钮被选中
				}, 
				popupStack:[], // 弹窗栈用于帮助用户关闭多个弹窗
				elementInfo:{}, // 存储元素的基本信息
				style:{}, // 元素的style样式
				pageScroll:0, // 页面滚动距离
				storeListData: [], // 商铺列表数据
				storeListDataLoading: true, // 商铺数据加载中
				hasNext: false, // 是否还存在下一组数据
			}
		},
		components:{storeList},
		computed:{
			...mapState([
				'login'
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
				
				if(n.navBtnSelected !== o.navBtnSelected){
					if(n.navBtnSelected){
						// 打开筛选弹窗
						this.openPopup('filterCategoryPopup');
					}else{
						this.closePopup('filterCategoryPopup');
					}
				}
			}
		}
		,
		onPageScroll(e) {
			this.pageScroll = e.scrollTop;
		}
		,
		onReachBottom(){
			// 调用getmore方法获取更多数据
			this.getMore();
		}
		,
		created() {
			// 请求一些渲染页面必须的数据
			
			// 模拟网络请求需要数据
			
			// 顶部导航栏下拉菜单需要的数据
			
			try {
				let tmp = uni.getStorageSync('category_data');
				if(tmp) this.categoryData = JSON.parse(tmp);
			} catch (e) {
				console.log('获取缓存失败');
			}

			if(!this.categoryData || !this.categoryData.length){

				this.$http.get.categore_data().then((res)=>{
					this.categoryData = res;
					
					uni.setStorage({
						key: 'category_data',
						data: JSON.stringify(res),
						success: function () {
							console.log('存储category_data成功');
						}
					});

					this.categoryData = this.categoryData.filter(ele=>{
						return ele.sub_categories.length !== 0;
					});

					// 顶部导航栏默认navbar中的内容值
					this.foodType = this.categoryData[0];
					
				},(e)=>{
					console.log('请求失败',e);
				})
			}else{
				this.categoryData = this.categoryData.filter(ele=>{
					return ele.sub_categories.length !== 0;
				});
				
				// 顶部导航栏默认navbar中的内容值
				this.foodType = this.categoryData[0];
			}

			// 获取默认商铺列表数据
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
		methods:{
			/**
			 * 当页面滑动底部时触发获取更多列表数据
			 */
			getMore(){
				// console.log('滑到底部了');
				// 发起请求获取新的数据
				
				
				// 模拟请求过程
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
			 * 切换顶部分类列表
			 * @param {Object} e
			 */
			categoryHeadtabSelect(e){
					console.log(e.currentTarget.dataset.id);
					this.categoryCur = e.currentTarget.dataset.id;
			}
			,
			/**
			 * 选取子分类
			 * @param {Object} e
			 */
			categoryBodytabSelect(e){
				
				// 存储当前矩阵位置
				this.categorySelected[0] = this.categoryCur;
				this.categorySelected[1] = e.currentTarget.dataset.id;
				
				// 更改当前页面中呈现的分类
				this.foodType = this.categoryData[this.categorySelected[0]];
				
				// 移动标签至对应位置
				this.TabCur = this.categorySelected[1];
				this.categotyID = 'cu-item'+this.TabCur;
				
				// 根据新分类发起请求获取最新数据
				
				// 关闭弹窗
				this.changePageState({navBtnSelected:false});
			}
			,
			navBtnTap(){
				// 改变页面状态
				this.changePageState({navBtnSelected:true});
			}
			,
			/**
			 * 顶部自定义navbar中的分类点击事件
			 * @param {Object} e 事件参数对象
			 */
			typeSelect(e){
				this.TabCur = e.currentTarget.dataset.id;
				this.categotyID = 'cu-item'+this.TabCur;
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
					
					if(this.pageState.storeNavSelected){
						this.pageState.storeNavSelected = false;
					}
					
					if(this.pageState.navBtnSelected){
						this.pageState.navBtnSelected = false;
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
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #fff;
	}
	.nav-bar{
		position: fixed;
		top: 0;
		z-index: 999;
		height: 50px!important;
	}
	.scroll-box{
		width: 660rpx;
	}
	.nav-bar-btn{
		box-shadow: -1px 2px 3px rgba($color: #000000, $alpha: .3);
	}
	.category-box{
		width: 750rpx;
		height: 60vh;
	}
	.category-head{
		flex: 3;
	}
	.category-body{
		flex: 6;
	}
	.tag-text{
		line-height: 1.5;
		padding: 0 5px;
		color: #999;
	}
	.tag-text.cur{
		background-color: #2395ff;
		border-color: #2395ff;
		color: #fff;
	}
	
</style>
