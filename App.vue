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
		// 检查本地缓存中是否有购物车数据
		this.INIT_CART();
	}
	,
	methods:{
		...mapActions([
			'getUserInfo',
			'saveAddress'
		])
		,
		...mapMutations([
			'INIT_CART'
		])
	}
};
</script>

<style lang="scss">
@import 'colorui/icon.css';
@import 'colorui/main.css';
@import 'colorui/animation.css';
@import "app.css";
@import 'css/aliicon.css';
</style>
