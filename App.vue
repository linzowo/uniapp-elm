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
		// 检查并设置登录状态
		let loginState;
		try {
			let tmp = uni.getStorageSync('login_state');
			if(tmp) loginState = JSON.parse(tmp);
		} catch (e) {
			console.log(e);
		}
		
		if(loginState && loginState.expires > this._.now()){
			this.SAVE_LOGIN_STATE(loginState.login);
		}


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
			'INIT_CART',
			'SAVE_LOGIN_STATE'
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
