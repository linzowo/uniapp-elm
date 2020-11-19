import {
	SAVE_SHIP_ADDRESS,
	SAVE_USERINFO,
	SAVE_CITY,
	ADD_CART,
	REMOVE_CART,
	INIT_CART,
	CONFIRM_NOTE,
	CONFIRM_INVOICE,
	SAVE_LOGIN_STATE
} from './mutations-type.js';

import _ from 'lodash';
import Vue from 'vue';


export default {
	[SAVE_LOGIN_STATE](state,loginState){
		state.login = loginState;

		let login_state = JSON.stringify({
			login:loginState,
			expires: _.now() + (24 * 60 * 60 * 1000)
		});

		uni.setStorage({
			key: 'login_state',
			data: login_state,
			success: function () {
				console.log('success');
			}
		});
	}
	,
	// 存储发票数据
	[CONFIRM_INVOICE](state,newInvoice){
		state.invoice = newInvoice;
	}
	,
	// 存储订单备注信息
	[CONFIRM_NOTE](state,newNote){
		state.note = newNote;
	}
	,
	// 存储用户信息
	[SAVE_USERINFO](state,newUserInfo){
		state.userInfo = newUserInfo;
		console.log(state.userInfo);
	},
	// 存储收货地址
	[SAVE_SHIP_ADDRESS](state,newAdd){
		state.userInfo.shipAddress = newAdd;
		console.log(state.userInfo);
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
		Vue.set(cart,shopId,cartInfo);
		uni.setStorage({
			key: 'cart_map',
			data: JSON.stringify(cart),
			success: function () {
				console.log('将购物车数据存储到本地');
			}
		});
	},
	// 将店铺购物车信息移除公共购物车
	[REMOVE_CART](state,shopId){
		let cart = state.cartList;

		delete cart[shopId];

		uni.setStorage({
			key: 'cart_map',
			data: JSON.stringify(cart),
			success: function () {
				console.log('将购物车数据存储到本地');
			}
		});
	},
	// 初始化购物车数据：如果本地存储有购物车相关数据就读取其数据存储至vuex
	[INIT_CART](state){
		try{
			let tmp = uni.getStorageSync('cart_map');
			if(tmp) state.cartList = JSON.parse(tmp);
		}catch(e){
			//TODO handle the exception
			console.log('本地无购物车数据');
		}
	}
}