<script>
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
	mounted() {
		let ele = document.createElement('script');
		ele.src = '//at.alicdn.com/t/font_1704517_ycm7nev7ez.js';
		document.head.appendChild(ele);
	}
};
</script>

<style lang="scss">
@import 'colorui/main.css';
@import 'colorui/icon.css';
@import "app.css";
</style>
