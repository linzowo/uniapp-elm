import Vue from 'vue'
import App from './App'

// 引入vuex
import store from 'store/store.js';
Vue.prototype.$store = store;

// Vue.config.productionTip = false

App.mpType = 'app';
const app = new Vue({
	store,
	...App
})
app.$mount()
