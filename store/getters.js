import {
	GET_SHIP_ADDRESS
} from './getters-type.js';

export default {
	// 获取收货地址
	[GET_SHIP_ADDRESS](state){
		return state.userInfo.shipAddress;
	}
}