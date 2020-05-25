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
				<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="输入商家、商品名称" confirm-type="search"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-green shadow-blur round">搜索</button>
			</view>
		</view>
		<!-- searchbar E -->
		
		<!-- 历史搜索 S -->
		<view class="history-search flex-direction margin-bottom">
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
				class="search-tag-item padding-tb-xs padding-lr-sm bg-grey-f7 margin-xs">
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
				v-for="item in 10"
				:key="item"
				class="search-tag-item padding-tb-xs padding-lr-sm bg-grey-f7 margin-xs">
					<text>茶百道</text>
				</view>
			</view>
		</view>
		<!-- 热门搜索 E -->
		
	</view>
</template>

<script>
	
	import {mapState} from 'vuex';
	export default {
		data() {
			return {
				
			}
		},
		computed:{
			...mapState([
				'login'
			])
		}
		,
		created() {
			if(!this.login){
				uni.redirectTo({
					url:'/pages/login/login',
				})
			}
		}
		,
		methods:{
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
