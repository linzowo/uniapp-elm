import {
	SAVE_SHIP_ADDRESS,
	SAVE_USERINFO
} from './mutations-type.js';


export default {
	// 存储用户信息
	[SAVE_USERINFO](state,newUserInfo){
		state.userInfo = newUserInfo;
	},
	// 存储收货地址
	[SAVE_SHIP_ADDRESS](state,newAdd){
		state.userInfo.shipAddress = newAdd;
	},
}