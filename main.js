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

// 引入配置文件
import {COMMON_TEXT} from '@/config/common_text.js';
import {IMG_URL} from '@/config/img_url.js';

// 将一些默认图片地址数据挂载到vue对象上
Vue.prototype.$img_url = IMG_URL;
Vue.prototype.$common_text = COMMON_TEXT;

// 将系统信息绑定到对象上方便后面使用
uni.getSystemInfo({
	success(e) {
		e.containerHeight = e.windowHeight - (e.windowBottom?0:50);
		Vue.prototype.$system_info = e;
	}
});

App.mpType = 'app';
const app = new Vue({
	store,
	...App
})
app.$mount()
