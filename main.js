import Vue from 'vue'
import App from './App'

// 引入vuex
import store from 'store/store.js';
Vue.prototype.$store = store;

// 阻止生产环境消息输出
// Vue.config.productionTip = false

// 引入工具文件
import utils from '@/common/utils.js';
Vue.prototype.$utils = utils;
import _ from 'lodash';
Vue.prototype._ = _;

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

// 将系统信息绑定到对象上方便后面使用
uni.getSystemInfo({
	success(e) {
		e.containerHeight = e.windowHeight - (e.windowBottom ? 0 : 50);
		Vue.prototype.$system_info = e;
	}
});

// 创建全局过滤器
Vue.filter('imgUrlFilter', origin => {
	return 'https://cube.elemecdn.com/' + origin[0] + '/' + origin.slice(1, 3) + '/' + origin.slice(3) + '.' + (origin.slice(
		-3) == 'png' ? 'png' : origin.slice(-4)) + '?x-oss-process=image/format,webp/resize,w_130,h_130,m_fixed';
});

App.mpType = 'app';
const app = new Vue({
	store,
	...App
})
app.$mount()
