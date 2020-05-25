<template>
	<view class="search-container flex-direction">
		
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
		
		<view class="content">
			
			<!-- 搜索标签 S -->
			<view class="search-tag-box flex-direction">
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
			<view class="search-cue-box">
				
			</view>
			<!-- 搜索提示 E -->
			
			<!-- 搜索结果 S -->
			<view class="search-result-box">
				
			</view>
			<!-- 搜索结果 E -->
		</view>
		
	</view>
</template>

<script>
	
	import {mapState} from 'vuex';
	export default {
		data() {
			return {
				hotData:[], // 热搜数据
				inputText:'', // 输入框数据
				searchCueData:[], // 搜索提示数据
				searchHistory:[], // 搜索历史数据
			}
		},
		watch:{
			inputText(n,o){
				if(n){
					this.DB_getSearchCue();
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
	.search-nav{
		height: 50px;
	}
</style>
