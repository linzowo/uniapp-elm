
// 引入vue和vuex
import Vue from 'vue';
import Vuex from 'vuex';

// 将vuex挂载到vue
Vue.use(Vuex);

// 实例化store
const store = new Vuex.Store({
	state:{
		userList:{
			admin:{
				name:"admin",
				password:"123456",
				phone:123456789,
				city:"成都",
				balance:0,
				points:0,
				coupons:0,
				order:{},
				history:{}
			}
		}
	},
	mutations:{},
	getters:{
		
		// 返回所在城市信息
		getCity(state){
			return state.userList.admin.city;
		}
	}
})


export default store;