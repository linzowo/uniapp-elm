<template>
	<view class="content">
		<uni-nav-bar title="ele.me" color="white" background-color="#3190e8"><view slot="right">登录</view></uni-nav-bar>

		<view class="city_head">
			<uni-combox label="所在城市:" :candidates="candidates" placeholder="请选择所在城市" v-model="city" labelWidth="150px" class="city_head_input"></uni-combox>

			<text class="text_size_small text_color_gray">定位不准时，请在城市列表中选择</text>
		</view>
		<view class="city_hot">
			<h2>热门城市</h2>
			<uni-grid :column="4">
				<uni-grid-item><text class="text">文本</text></uni-grid-item>
				<uni-grid-item><text class="text">文本</text></uni-grid-item>
				<uni-grid-item><text class="text">文本</text></uni-grid-item>
				<uni-grid-item><text class="text">文本</text></uni-grid-item>
			</uni-grid>
			<uni-grid :column="4">
				<uni-grid-item><text class="text">文本</text></uni-grid-item>
				<uni-grid-item><text class="text">文本</text></uni-grid-item>
				<uni-grid-item><text class="text">文本</text></uni-grid-item>
				<uni-grid-item><text class="text">文本</text></uni-grid-item>
			</uni-grid>
		</view>
		<view class="city_list">
			<h2>选择城市</h2>
			<uni-grid :column="13">
				<uni-grid-item><text class="text">文本</text></uni-grid-item>
				<uni-grid-item><text class="text">文本</text></uni-grid-item>
				<uni-grid-item><text class="text">文本</text></uni-grid-item>
				<uni-grid-item><text class="text">文本</text></uni-grid-item>
				<uni-grid-item><text class="text">文本</text></uni-grid-item>
				<uni-grid-item><text class="text">文本</text></uni-grid-item>
				<uni-grid-item><text class="text">文本</text></uni-grid-item>
				<uni-grid-item><text class="text">文本</text></uni-grid-item>
				<uni-grid-item><text class="text">文本</text></uni-grid-item>
				<uni-grid-item><text class="text">文本</text></uni-grid-item>
				<uni-grid-item><text class="text">文本</text></uni-grid-item>
				<uni-grid-item><text class="text">文本</text></uni-grid-item>
				<uni-grid-item><text class="text">文本</text></uni-grid-item>
				<uni-grid-item><text class="text">文本</text></uni-grid-item>
				<uni-grid-item><text class="text">文本</text></uni-grid-item>
				<uni-grid-item><text class="text">文本</text></uni-grid-item>
				<uni-grid-item><text class="text">文本</text></uni-grid-item>
				<uni-grid-item><text class="text">文本</text></uni-grid-item>
				<uni-grid-item><text class="text">文本</text></uni-grid-item>
				<uni-grid-item><text class="text">文本</text></uni-grid-item>
				<uni-grid-item><text class="text">文本</text></uni-grid-item>
				<uni-grid-item><text class="text">文本</text></uni-grid-item>
				<uni-grid-item><text class="text">文本</text></uni-grid-item>
				<uni-grid-item><text class="text">文本</text></uni-grid-item>
				<uni-grid-item><text class="text">文本</text></uni-grid-item>
				<uni-grid-item><text class="text">文本</text></uni-grid-item>
			</uni-grid>
			
		</view>
	</view>
</template>

<script>
import { uniNavBar, uniCombox, uniGrid, uniGridItem } from '@dcloudio/uni-ui';
export default {
	data() {
		return {
			city: '',
			candidates: []
		};
	},
	onLoad() {},
	methods: {},
	components: { uniNavBar, uniCombox, uniGrid, uniGridItem }
};
</script>

<style lang="scss">
.city_head {
	// border-bottom: 1px solid #ccc;
}
.city_head_input {
	padding: 0 10px;
	border-top: 1px solid #ccc;
	border-bottom: 1px solid #ccc;
}
.city_head_tips {
}
</style>
