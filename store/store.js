
// 引入vue和vuex
import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations.js';
import getters from './getters.js';
import actions from './actions.js';

// 将vuex挂载到vue
Vue.use(Vuex);

const state = {
	userInfo:null, // 用户信息
	login: false, // 登录状态
	cartList:{}, // 购物车列表
	note:null, // 订单备注
	invoice:null, // 发票数据 {name:发票抬头,id:发票创建时间的秒数,type:'单位'|'个人',tax_id:纳税人识别号}
}

export default new Vuex.Store({
	state,
	mutations,
	getters,
	actions
});