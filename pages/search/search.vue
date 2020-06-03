<template>
	<view class="search-container flex-direction">
		
		<view class="header flex-direction">
			
			<!-- nav S -->
			<view class="search-nav padding-tb padding-lr-xs">
				<text 
				@tap="goback"
				class="lg text-xxl text-gray cuIcon-back"></text>
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
					placeholder="输入商家、商品名称" 
					confirm-type="search"
					@confirm="requestSearchRes"
					></input>
					
					<view 
					v-show="inputText"
					@tap="clearSearch"
					class="padding-xs">
						<text class="lg text-gray cuIcon-close text-bold text-lg"></text>
					</view>
				</view>
				<view class="action">
					<button class="cu-btn bg-green shadow-blur round">搜索</button>
				</view>
			</view>
			<!-- searchbar E -->
			
		</view>
		
		<view class="content">
			
			<!-- 搜索标签 S -->
			<view 
			v-show="!inputText"
			class="search-tag-box flex-direction">
				<!-- 历史搜索 S -->
				<view 
				v-if="searchHistory.length"
				class="history-search flex-direction margin-bottom">
					<view class="title padding-tb padding-lr-sm justify-between align-center">
						<text class="text-color-6 text-lg text-bold">历史搜索</text>
						<view class="padding-lr-xs">
							<text class="lg text-color-c cuIcon-deletefill"></text>
						</view>
					</view>
					<view class="search-tag-list flex-wrap">
						<view 
						v-for="item in 10"
						:key="item"
						class="search-tag-item padding-tb-xs radius padding-lr-sm bg-grey-f7 margin-xs">
							<text>茶百道</text>
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
						class="search-tag-item padding-tb-sm radius padding-lr-sm bg-grey-f7 margin-xs">
							<text>{{item.word}}</text>
						</view>
					</view>
				</view>
				<!-- 热门搜索 E -->
			</view>
			<!-- 搜索标签 E -->
			
			<!-- 搜索提示 S -->
			<view 
			v-show="inputText && !searchRes.length"
			class="search-cue-box flex-sub padding-lr flex-direction">
			
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
				v-for="(item,index) in searchCueData.word_with_meta"
				:key="'word_with_meta'+index"
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
			<view 
			v-show="searchRes.length"
			class="search-result-box">
				<storeList
				:top="100"
				:nativeNav="false"
				:nativeTabbar="false"
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
			}
		},
		components:{storeList}
		,
		watch:{
			inputText(n,o){
				console.log(n);
				if(n){
					this.DB_getSearchCue();
				}else{
					this.searchCueData = {};
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
			uni.getStorage({
			    key: 'search_history',
			    success: function (res) {
					this.searchHistory = res.data || [];
			    }
			});
			
			// 热门搜索
			this.hotData = this.$t_d.HOT_SEARCH;
			
			
		}
		,
		methods:{
			/**
			 * 根据用户输入请求搜索结果
			 * @param {Object} e
			 */
			requestSearchRes(e){
				this.$utils.log('requestSearchRes','请求搜索结果');
				// 发起请求，获取搜索结果
				 
				// 显示等待界面
				
				// 得到结果后改变页面视图
				
				// 模拟上述网络请求过程
				setTimeout(()=>{
					for (let key in this.$t_d.SEARCH_RES_1.inside) {
						console.log(key);
						this.searchRes.push(this.$t_d.SEARCH_RES_1.inside[key]);
					}
					
					// this.searchRes = this.$t_d.SEARCH_RES_1.inside
				},1000);
				
				
			}
			,
			/**
			 * 获取搜索提示
			 */
			getSearchCue(){
				this.$utils.log('getSearchCue','获取搜索提示');
				
				// 模拟网络请求获取搜索提示数据
				this.searchCueData = this.$t_d.SEARCH_CUE;
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
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #fff;
	}
	.search-container{
		
	}
	.header{
		position: fixed;
		top: 0;
		background-color: #fff;
		z-index: 99;
		width: 750rpx;
	}
	.content{
		margin-top: 100px;
	}
	.search-nav{
		height: 50px;
	}
	.cu-bar{
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
</style>
