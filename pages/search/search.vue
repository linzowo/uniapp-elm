<template>
	<view class="search-container flex-direction">
		
		<view class="header flex-direction">
			
			<!-- nav S -->
			<view class="search-nav padding-lr-xs align-center">
				<text 
				@tap="goback"
				class="lg text-gray cuIcon-back"></text>
			</view>
			<!-- nav E -->
			
			<!-- searchbar S -->
			<view class="cu-bar search bg-white">
				<view class="search-form round">
					<text class="cuIcon-search"></text>
					
					<input 
					v-model="inputText"
					:adjust-position="false" 
					type="text" 
					placeholder="输入商家、商品名称(输入'没有结果'查看搜索无结果情况)" 
					confirm-type="search"
					@confirm="requestSearchRes"
					>
					
					<!--  #ifndef  MP-WEIXIN -->
					<view 
					v-show="inputText"
					@tap="clearSearch"
					class="padding-xs">
					<!--  #endif -->
					<!--  #ifdef  MP-WEIXIN -->
					<view 
					v-if="inputText"
					@tap="clearSearch"
					class="padding-xs">
					<!--  #endif -->
					
						<text class="lg text-gray cuIcon-close text-bold text-lg"></text>
					</view>
				</view>
				<view class="action">
					<button class="cu-btn bg-green shadow-blur round" @click="requestSearchRes">搜索</button>
				</view>
			</view>
			<!-- searchbar E -->
			
		</view>
		
		<view class="content flex-sub">
			
			<!-- 搜索标签 S -->
			
			<!--  #ifndef  MP-WEIXIN -->
			<view 
			v-show="!inputText"
			class="search-tag-box flex-direction">
			<!--  #endif -->
			<!--  #ifdef  MP-WEIXIN -->
			<view 
			v-if="!inputText"
			class="search-tag-box flex-direction">
			<!--  #endif -->
			
				<!-- 历史搜索 S -->
				<view 
				v-if="searchHistory.length"
				class="history-search flex-direction margin-bottom">
					<view class="title padding-tb padding-lr-sm justify-between align-center">
						<text class="text-color-6 text-lg text-bold">历史搜索</text>
						<view 
						@tap="clearSearchHistory"
						class="padding-lr-xs">
							<text class="lg text-color-c cuIcon-deletefill"></text>
						</view>
					</view>
					<view class="search-tag-list flex-wrap">
						<view 
						v-for="(item,i) in searchHistory"
						:key="i"
						@tap="fillSearch(item)"
						class="search-tag-item padding-tb-xs radius padding-lr-sm bg-grey-f7 margin-xs">
							<text>{{item}}</text>
						</view>
					</view>
				</view>
				<!-- 历史搜索 E -->
				
				<!-- 热门搜索 S -->
				<view class="hot-search flex-direction">
					<view class="title padding-tb padding-lr-sm">
						<text class="text-color-6 text-lg text-bold">热门搜索</text>
					</view>
					<view class="search-tag-list flex-wrap">
						<view 
						v-for="(item,index) in hotData"
						:key="index"
						@tap="fillSearch(item.word)"
						class="search-tag-item padding-tb-sm radius padding-lr-sm bg-grey-f7 margin-xs">
							<text>{{item.word}}</text>
						</view>
					</view>
				</view>
				<!-- 热门搜索 E -->
			</view>
			<!-- 搜索标签 E -->
			
			<!-- 搜索提示 S -->
			<!--  #ifndef  MP-WEIXIN -->
			<view 
			v-show="inputText && (!searchRes.length && !recommendData.length)"
			class="search-cue-box flex-sub padding-lr flex-direction">
			<!--  #endif -->
			<!--  #ifdef  MP-WEIXIN -->
			<view 
			v-if="inputText && (!searchRes.length && !recommendData.length)"
			class="search-cue-box flex-sub padding-lr flex-direction">
			<!--  #endif -->
			
			
				<!-- 输入内容显示 S -->
				<view 
				v-if="!searchCueData.word_with_meta"
				class="search-cue-item flex-sub flex-direction">
				
					<view class="align-center flex-sub normal">
						<text class="cuIcon-search padding-sm"></text>
						<view class="padding-tb border-bottom border-color-e flex-sub">
							<text>查找 {{inputText}}</text>
						</view>
					</view>
					
				</view>
				<!-- 输入内容显示 E -->
				
				<!-- 特殊搜索提示 S -->
				<view 
				v-for="(item,index) in searchCueData.restaurants"
				:key="index"
				@tap="fillSearch(item.name)"
				class="search-cue-item flex-sub flex-direction">
					
					<view class="align-center flex-sub special">
						
						<!-- 封面 S -->
						<view class="cover margin-right">
							<image 
							class="search-cue-cover"
							:src="item.image_path|imgUrlFilter" mode="widthFix"></image>
						</view>
						<!-- 封面 E -->
						
						<view class="align-center justify-between flex-sub border-bottom border-color-e padding-top-sm padding-bottom-xs">
							
							<!-- 内容 S -->
							<view class="search-cue-content flex-direction flex-sub">
								<view class="title padding-tb-xs flex-sub">
									<view class="basis-xl text-cut">
										<text class="text-cut">{{item.name}}</text>
									</view>
									<view class="basis-sm">
										<text
										v-for="(e,i) in item.tags"
										:key="i"
										:style="{color:'#fff',backgroundColor:'#'+e.name_color,height:'35rpx'}"
										class="text-scale-8 text-sm padding-lr-xs">{{e.name}}</text>
									</view>
								</view>
								<view class="">
									<text class="reservation text-xs round border justify-center text-scale-8 padding-lr-xs">接受预定，{{item.next_business_time}}开始配送</text>
								</view>
								
							</view>
							<!-- 内容 E -->
							
							<!-- 评分 S -->
							<view class="rating margin-left-sm text-xs text-color-9">
								<text>评价{{item.rating}}</text>
							</view>
							<!-- 评分 E -->
							
						</view>
						
						
					</view>
					
					
				</view>
				<!-- 特殊搜索提示 E -->
				
				<!-- 普通搜索提示 S -->
				<view 
				v-for="(item) in searchCueData.word_with_meta"
				:key="item.word"
				@tap="fillSearch(item.word)"
				class="search-cue-item flex-sub flex-direction">
				
					<view class="align-center flex-sub normal">
						<text class="cuIcon-search padding-sm"></text>
						<view class="padding-tb border-bottom border-color-e flex-sub">
							<text>{{item.word}}</text>
						</view>
					</view>
					
				</view>
				<!-- 普通搜索提示 E -->
				
			</view>
			<!-- 搜索提示 E -->
			
			<!-- 搜索结果 S -->
			<!--  #ifndef  MP-WEIXIN -->
			
			<view 
			v-show="searchRes.length || recommendData.length"
			class="search-result-box flex-sub">
			<!--  #endif -->
			<!--  #ifdef  MP-WEIXIN -->
			
			<view 
			v-if="searchRes.length || recommendData.length"
			class="search-result-box flex-sub">
			<!--  #endif -->
				<storeList
				:top="100"
				:nativeNav="false"
				:nativeTabbar="false"
				:storeListData="searchRes"
				:loading="searchResLoading"
				:recommendData="recommendData"
				:hasNext="hasNext"
				:mode="'search'"
				></storeList>
			</view>
			<!-- 搜索结果 E -->
		</view>
		
	</view>
</template>

<script>
	
	import {mapState} from 'vuex';
	
	// 店铺排序筛选模块
	import storeList from '@/components/store-list/store-list.vue'; 
	
	export default {
		data() {
			return {
				hotData: [], // 热搜数据
				inputText: '', // 输入框数据
				searchCueData: {}, // 搜索提示数据
				searchHistory: [], // 搜索历史数据
				searchRes: [], // 搜索结果数据
				searchResLoading: true, // 搜索结果加载中
				hasNext: false, // 是否还存在下一组数据
				recommendData:[], // 更多推荐数据
			}
		},
		components:{storeList}
		,
		watch:{
			inputText(n,o){
				if(n){
					// 清空旧数据 解决因为防抖带来的提示延迟出现的问题
					this.searchCueData = {};
					this.DB_getSearchCue();
				}else{
					this.searchCueData = {};
					this.searchRes = [];
					this.recommendData = [];
				}
				
				if(n !== o){
					this.searchRes = [];
					this.recommendData = [];
				}
			}
		}
		,
		computed:{
			...mapState([
				'login'
			])
		}
		,
		created() {
			
			// 检查登录情况
			if(!this.login){
				uni.redirectTo({
					url:'/pages/login/login',
				})
			}
			
			// 创建防抖函数
			this.DB_getSearchCue = this._.debounce(this.getSearchCue,1000);
			
			// 获取必要数据
			
			// 搜索历史获取
			try {
			    const res = uni.getStorageSync('SEARCH_HISTORY');
			    if (res) {
					this.searchHistory = res
			    }
			} catch (e) {
			    // error
				console.log(e);
			}
			
			// 热门搜索
			this.$http.get.hot_search().then((res)=>{
				this.hotData = res;
				this.searchResLoading = false;
			},e=>{
				console.log(e);
				this.searchResLoading = false;
			})
			
		}
		,
		onReachBottom() {}
		,
		methods:{
			/**
			 * 将标签内容填充到搜索框中并发起搜索
			 */
			fillSearch(value){
				this.inputText = value;
				this.requestSearchRes();
			}
			,
			/**
			 * 清空搜索历史
			 */
			clearSearchHistory(){
				this.searchHistory = [];
				uni.setStorage({
					key:'SEARCH_HISTORY',
					data:this.searchHistory,
					success() {
						console.log('清空搜索历史成功');
					}
				})
			}
			,
			/**
			 * 根据用户输入请求搜索结果
			 * @param {Object} e
			 */
			requestSearchRes(e){
				this.$utils.log('requestSearchRes','请求搜索结果');
				
				// 将当前输入内容加入本地存储中作为搜索历史
				if(!this.searchHistory.includes(this.inputText)){
					this.searchHistory.push(this.inputText);
					uni.setStorage({
						key:'SEARCH_HISTORY',
						data:this.searchHistory,
						success() {
							console.log('存储搜索历史成功');
						}
					});
				}
				
				// 发起请求，获取搜索结果
				
				// 隐藏搜索提示结果
				 
				// 显示等待界面
				
				// 得到结果后改变页面视图
				
				// 模拟上述网络请求过程
				this.searchCueData = {};
				this.searchCueData.word_with_meta = true;
				uni.showLoading({
					title:''
				});
				
				if(this.inputText == '没有结果'){
					// 模拟搜索没有结果的情况
					this.searchRes = []
					this.$http.get.search_res_1().then((res)=>{
						this.recommendData = res.inside[1].restaurant_with_foods;
						uni.hideLoading();
					},e=>{
						console.log(e);
					});
					
				}else{
					// 模拟搜索有结果的情况
					this.$http.get.search_res_1().then((res)=>{
						this.searchRes = res.inside[0].restaurant_with_foods;
						this.recommendData = res.inside[1].restaurant_with_foods;
						uni.hideLoading();
					},e=>{
						console.log(e);
					});
				}
				
			}
			,
			/**
			 * 获取搜索提示
			 */
			getSearchCue(){
				this.$utils.log('getSearchCue','获取搜索提示');
				
				// 清空旧数据
				this.searchCueData = {};
				
				this.$http.get.search_cue().then((res)=>{
					this.searchCueData = res;
				},e=>{
					console.log(e);
				})
			}
			,
			/**
			 * 清空搜索框内的内容
			 */
			clearSearch(){
				this.inputText = '';
			}
			,
			/**
			 * 返回上一页
			 */
			goback(){
				if(getCurrentPages().length<=1){
					uni.switchTab({
						url:'/pages/index/index',
						fail(e) {
							console.log(e);
						}
					})
				}else{
					uni.navigateBack({
						delta:1
					})
				}
				
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #fff;
	}
	.header{
		position: fixed;
		top: 0;
		background-color: #fff;
		z-index: 99;
		width: 750rpx;
		height: 100px;
	}
	.content{
		margin-top: 100px;
	}
	.cu-bar,.search-form,.search .action button{
		max-height: 50px;
	}
	@media screen and (min-width: 760px){
		.cu-bar{
			min-height: 0;
		}
	}
	.search-nav{
		height: 50px;
	}
	.search-cue-cover{
		width: 48rpx;
		height: 48rpx;
	}
	.reservation{
		color: #00e066;
		border-color: #00e066;
		margin-left: -40rpx;
	}
	.search-result-box{
		width: 750rpx;
	}
</style>
