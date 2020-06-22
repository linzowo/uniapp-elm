import {
	SAVE_SHIP_ADDRESS,
	SAVE_USERINFO,
	SAVE_CITY,
	ADD_CART,
	REMOVE_CART
} from './mutations-type.js';

import _ from 'lodash';


export default {
	// 存储用户信息
	[SAVE_USERINFO](state,newUserInfo){
		state.userInfo = newUserInfo;
	},
	// 存储收货地址
	[SAVE_SHIP_ADDRESS](state,newAdd){
		Object.assign(state.userInfo.shipAddress,newAdd);
	},
	// 存储用户选择的城市
	[SAVE_CITY](state,newCity){
		state.userInfo.currentCity = newCity;
	},
	// 加入公共购物车
	[ADD_CART](state,{
		shopId,
		cartInfo
	}){
		let cart = state.cartList;

		cart[shopId] = cartInfo;
		// this.$set(cart,shopId,cartInfo);

	},
	// 将店铺购物车信息移除公共购物车
	[REMOVE_CART](state,shopId){
		let cart = state.cartList;

		delete cart[shopId];
		// this.$delete(cart,shopId);
	}
}