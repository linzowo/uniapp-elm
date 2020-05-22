<template>
	<view class="category-container flex-direction">
		
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
			
			<!-- 分类筛选nav S -->
			<view 
			class="content-list-tab-box bg-white flex-sub"
			>
				<scroll-view scroll-x class="nav">
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
			<!-- 分类筛选nav E -->
			
		</view>
		<!-- navBar E -->
		
		<!-- content S -->
		
		<view class="content-box flex-sub">
			
			<!-- 未登录 S -->
			<view 
			v-if="!login"
			class="login-no flex-direction align-center flex-sub justify-center padding-top">
				<image :src="$i_u.login_no" class="login-img" mode="widthFix"></image>
				<text class="text-lg text-color-9 margin-bottom">没有结果</text>
				<text class="text-lg text-color-9">登录后可查看更多商家</text>
				<navigator url="/pages/login/login" class="link">点此登录 ></navigator>
			</view>
			<!-- 未登录 E -->
			
			<!-- 登录 S -->
			<view
			 v-if="login"
			 class="login">
				登录后
			</view>
			<!-- 登录 E -->
			
		</view>
		<!-- content E -->
		
		<!-- 弹窗部分 S -->
		
		<!-- 筛选及排序弹窗 S -->
		<uni-popup 
		ref="filterBarPopup" 
		:type="'top'"
		@change="popupChange"
		:animation="false"
		class="filter-bar-popup-box"
		:positionTop="{top: navBarInfo.bottom + 'px'}"
		>
			<view class="bg-white flex-sub flex-direction">
				
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
		<!-- 筛选及排序弹窗 S -->
		
		<!-- nav弹窗 S -->
		<uni-popup
		ref="filterCategoryPopup" 
		:type="'top'"
		@change="popupChange"
		:animation="false"
		class="filter-bar-popup-box"
		>
			<view class="category-box flex-direction">
				<!-- title S -->
				<view class="title-box flex-sub bg-grey-fa justify-between">
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
	import {mapState,mapMutations} from 'vuex';
	export default {
		data() {
			return {
				navBarInfo:{},
				TabCur: 0,
				foodType:[],
				categoryCur:0,
				categorySelected:[0,0],
				categoryData:[],
				categotyID:null, // 锚点定位id
				// 商铺分类列表
				storeNavList: [], // 商铺导航栏数据
				// 记录当前页面状态
				pageState:{
					login:false, // 登录状态
					storeNavSelected:false, // 店铺导航栏的nav是否被选中
					navBtnSelected:false, // 自定义顶部nav按钮被选中
				}, 
				// 弹窗栈用于帮助用户关闭多个弹窗
				popupStack:[],
		
			}
		},
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
				if(n.storeNavSelected !== o.storeNavSelected){
					if(n.storeNavSelected){
						// 打开筛选弹窗
						this.openPopup('filterBarPopup');
					}else{
						this.closePopup('filterBarPopup');
					}
				}
				
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
		created() {
			// 请求一些渲染页面必须的数据
			
			// 模拟网络请求需要数据
			
			// 顶部导航栏下拉菜单需要的数据
			this.categoryData = this.$t_d.CATEGORE_DATA.filter(ele=>{
				return ele.sub_categories.length !== 0;
			});
			
			// 顶部导航栏默认navbar中的内容值
			this.foodType = this.categoryData[0];
			
			this.storeNavList = this.$t_d.STORE_FILTER_DATA;
			
		}
		,
		mounted() {
			this.navBarInfo = this.$utils.getElementInfo('.nav-bar');
		}
		,
		methods:{
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
			 * 切换排序和筛选标记
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
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #fff;
	}
	.content-box{
		position: relative;
	}
	.nav-bar{
		position: relative;
		z-index: 999;
	}
	.scroll-box{
		width: 660rpx;
	}
	.nav-bar-btn{
		box-shadow: -1px 2px 3px rgba($color: #000000, $alpha: .3);
	}
	.login-no{
		
	}
	.link{
		border-bottom: 1px solid #0081FF;
		color: #0081FF;
	}
	.login-img{
		width: 400rpx;
		height: 400rpx;
	}
	.bar-icon{
		width: 24rpx;
		height: 24rpx;
		margin-right: 10rpx;
	}
	.order-box{
		width: 750rpx;
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
