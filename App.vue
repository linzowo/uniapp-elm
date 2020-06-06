<script>
	
	// 引入vuex中的对象方便调用方法
	import {mapState,mapActions,mapMutations} from 'vuex';
	
export default {
	onLaunch: function() {
		console.log('App Launch');
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	},
	created() {
		// 获取用户的登录信息
		this.getUserInfo();
		// 获取用户当前的位置信息
		this.saveAddress();
	}
	,
	mounted() {
		// 云函数
		let ele = document.createElement('script');
		ele.src = '//at.alicdn.com/t/font_1704517_k40zo27cx3b.js';
		document.head.appendChild(ele);
	}
	,
	methods:{
		...mapActions([
			'getUserInfo',
			'saveAddress'
		])
	}
};
</script>

<style lang="scss">
@import 'colorui/icon.css';
@import 'colorui/main.css';
@import 'colorui/animation.css';
@import "app.css";
</style>
