<template>
	<view 
	class="category-container flex-direction"
	:style="style.categoryContainer"
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
				<noLogin></noLogin>
			</view>
			<!-- 未登录 E -->
			
			<!-- 登录 S -->
			<view
			 v-if="login"
			 class="flex-direction login store-list flex-sub">
				<view 
				v-for="(item,index) in storeListData"
				:key="index"
				@tap="gotoStoreIndex(index)"
				class="store-list-item padding-tb padding-lr-sm border-bottom border-color-e align-start flex-sub">
					<!-- 遮罩层 S -->
					<view 
					v-show="index == storeMaskIndex"
					@tap.stop.prevent="controlStoreMask(index)"
					class="store-item-mask align-center justify-center">
						<text 
						@tap.stop.prevent="dislikeStore(index)"
						class="store-item-mask-btn round bg-white text-xs text-center">不喜欢</text>
					</view>
					<!-- 遮罩层 E -->
					
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
								class="text-cut store-title-text text-bold flex-sub"
								>{{item.restaurant.name}}
								</text>
							</view>
							
							<view
							@tap.stop.prevent="controlStoreMask(index)"
							 class="dont-like-btn padding-left">
								<text class="lg text-gray cuIcon-more"></text>
							</view>
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
						<view class="">
							<text class="text-scale-8 store-categroy text-color-6 text-xs margin-tb-xs text-xs border border-color-e">{{item.restaurant.flavors[0].name}}</text>
						</view>
						<!-- 店铺分类 E -->
						
						<!-- 店铺促销活动 S -->
						<view class="store-activities text-color-6 flex-sub text-xs align-start">
							<view class="active-left flex-direction text-scale-9">
								<view 
								v-for="(e,i) in item.restaurant.act_tag ? item.restaurant.activities : item.restaurant.activities.slice(0,2)"
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
						
					</view>
					<!-- 店铺详情 E -->
					
				</view>
				
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
	
	// 未登录模块
	import noLogin from '@/components/noLogin/noLogin.vue';
	import {mapState,mapMutations} from 'vuex';
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
				storeListData:[], // 登录后要显示的商铺列表数据
				// 商铺分类列表
				storeNavList: [], // 商铺导航栏数据
				// 记录当前页面状态
				pageState:{
					login:false, // 登录状态
					storeNavSelected:false, // 店铺导航栏的nav是否被选中
					navBtnSelected:false, // 自定义顶部nav按钮被选中
				}, 
				popupStack:[], // 弹窗栈用于帮助用户关闭多个弹窗
				elementInfo:{}, // 存储元素的基本信息
				style:{}, // 元素的style样式
				storeMaskIndex:null, // 控制店铺的遮罩开闭
			}
		},
		components:{noLogin},
		onPageScroll(e) {
			if(this.storeMaskIndex || this.storeMaskIndex == 0){
				this.storeMaskIndex = null;
			}
		}
		,
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
			
			if(this.login){
				this.storeListData = [...this.$t_d.STORE_lIST_DATA_1.items];
			}
			
		}
		,
		mounted() {
			this.navBarInfo = this.$utils.getElementInfo('.nav-bar');
			
			this.style.categoryContainer = {
						paddingTop: this.navBarInfo.bottom + 'px',
					}
		}
		,
		filters:{
			imgUrlFilter(origin){
				return 'https://cube.elemecdn.com/' + origin[0] + '/' + origin.slice(1,3) + '/' + origin.slice(3) + '.' + (origin.slice(-3) == 'png'?'png':origin.slice(-4)) + '?x-oss-process=image/format,webp/resize,w_130,h_130,m_fixed';
			},
			distaceFilter(o){
				return o > 1000 ? (o/1000).toFixed(2) + 'km' : o + 'm';
			}
		}
		,
		methods:{
			/**
			 * 跳转到用户点击的店铺主页
			 * @param {Object} index
			 */
			gotoStoreIndex(index){
				this.$utils.log('gotoStoreIndex','跳转到用户点击的店铺主页'+index);
				
				uni.navigateTo({
					url:'/pages/storeIndex/storeIndex'
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
	.nav-bar{
		position: fixed;
		top: 0;
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
	
	// 店铺列表区域样式
	.store-list-item{
		position: relative;
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
	.store-cover{
		width: 128rpx;
		height: 128rpx;
	}
	
	.store-title-text{
		font-size: 30rpx;
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
</style>
