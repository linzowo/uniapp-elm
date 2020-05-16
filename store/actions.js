// 引入测试数据代替请求用户数据的过程
import {
	USER_DATA,
	ADDRESS_DATA
} from '@/config/test_data.js'

import {
	SAVE_USERINFO,
	SAVE_SHIP_ADDRESS
	} from './mutations-type.js';

export default {
	getUserInfo({
		commit,
		state
	}) {
		let res = USER_DATA[0];
		commit(SAVE_USERINFO,res);
	},
	saveAddress({
		commit,
		state
	}){
		// 发起定位方法获取当前位置
		
		// 模拟获取用户定位的过程
		let address = ADDRESS_DATA.my_address[0];
		
		
		// 将获取到的位置存储到对象中
		commit(SAVE_SHIP_ADDRESS,address)
	}
}