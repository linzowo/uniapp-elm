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
		ele.src = '//at.alicdn.com/t/font_1704517_twtostvdwo.js';
		document.head.appendChild(ele);
	}
};
</script>

<style>
/*每个页面公共css */
html{
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
	font-family: 'Helvetica Neue',Tahoma,Arial,PingFangSC-Regular,'Hiragino Sans GB','Microsoft Yahei',sans-serif;;
}

i {
	font-style: normal;
}

/* 字体图标 */
/* @font-face {
	font-family: 'iconfont'; 
	src: url('//at.alicdn.com/t/font_1704517_twtostvdwo.eot');
	src: url('//at.alicdn.com/t/font_1704517_twtostvdwo.eot?#iefix') format('embedded-opentype'), url('//at.alicdn.com/t/font_1704517_twtostvdwo.woff2') format('woff2'),
		url('//at.alicdn.com/t/font_1704517_twtostvdwo.woff') format('woff'), url('//at.alicdn.com/t/font_1704517_twtostvdwo.ttf') format('truetype'),
		url('//at.alicdn.com/t/font_1704517_twtostvdwo.svg#iconfont') format('svg');
} */
.icon {
	font-family: 'iconfont' !important;
	font-size: 16px;
	ont-style: normal;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
.icon_svg {
   width: 1em; height: 1em;
   vertical-align: -0.15em;
   fill: currentColor;
   overflow: hidden;
}
/* 字体样式 */

/* 字体大小 */
.text_size_small {
	font-size: 12px;
}
.text_size_default {
	font-size: 14px;
}
.text_size_big {
	font-size: 20px;
}
/* 字体颜色 */
.text_color_gray {
	color: #808080;
}
</style>
