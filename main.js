import Vue from 'vue'
import App from './App'

// 引入vuex
import store from 'store/store.js';
Vue.prototype.$store = store;

// 阻止生产环境消息输出
// Vue.config.productionTip = false

const isDebug_mode = process.env.NODE_ENV !== 'production';

Vue.config.debug = isDebug_mode;

Vue.config.devtools = isDebug_mode;

Vue.config.productionTip = isDebug_mode;

// 引入工具文件
import utils from '@/utils/utils.js';
Vue.prototype.$utils = utils;

import _ from 'lodash';
Vue.prototype._ = _;

// 网络请求模块
import http from '@/utils/http/service.js';
Vue.prototype.$http = http;

// 引入配置文件
// 公共文本
import {
	COMMON_TEXT
} from '@/config/common_text.js';
Vue.prototype.$c_t = COMMON_TEXT;

// 公共图片地址
import {
	IMG_URL
} from '@/config/img_url.js';
Vue.prototype.$i_u = IMG_URL;

// 测试数据
import TEST_DATA from '@/config/test_data.js';
Vue.prototype.$t_d = TEST_DATA;

// 页面导航地址配置
import {PAGES_PATH} from '@/config/pages_path.js';
Vue.prototype.$pages_path = PAGES_PATH;

// 将系统信息绑定到对象上方便后面使用
uni.getSystemInfo({
	success(e) {
		e.containerHeight = e.windowHeight - (e.windowBottom ? 0 : 50);
		Vue.prototype.$system_info = e;
	}
});

// 全局组件绑定
// 功能开发中提示组件
import codingPopup from '@/components/coding-popup/coding-popup.vue';
Vue.component('codingPopup',codingPopup);
// 未登录提示组件
import noLogin from '@/components/noLogin/noLogin.vue';
Vue.component('noLogin',noLogin);
// 引入顶部导航栏模块
import myNavBar from '@/components/my-nav-bar/my-nav-bar.vue';
Vue.component('myNavBar',myNavBar);
// 数据加载中组件
import loading from '@/components/loading/loading.vue';
Vue.component('loading',loading);

// 弹窗组件
import uniPopup from '@/components/uni-popup/uni-popup.vue';
import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue';
import UniPopupMessage from '@/components/uni-popup/uni-popup-message.vue';
import UniPopupShare from '@/components/uni-popup/uni-popup-share.vue';
Vue.component('uniPopup',uniPopup);
Vue.component('uniPopupDialog',uniPopupDialog);
Vue.component('UniPopupMessage',UniPopupMessage);
Vue.component('UniPopupShare',UniPopupShare);


// 创建全局过滤器

// 图片hash转url
Vue.filter('imgUrlFilter', (origin,resize='w_130,h_130,m_fixed') => {
	
	
	return 'https://cube.elemecdn.com/' + origin[0] + '/' + origin.slice(1, 3) + '/' + origin.slice(3) + '.' + (origin.slice(
		-3) == 'png' ? 'png' : origin.slice(-4)) + '?x-oss-process=image/format,webp/resize,'+resize;
});

App.mpType = 'app';
const app = new Vue({
	store,
	...App
})

app.$mount()
