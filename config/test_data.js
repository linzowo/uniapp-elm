/**
 * 测试数据
 */

// 测试用的用户数据
export const USER_DATA = [{
	name: "linzowo",
	phone: 13645678520,
	avatar: 'https://shadow.elemecdn.com/faas/h5/static/sprite.3ffb5d8.png',
	currentCity: "成都",
	shipAddress: {},
	balance: 0,
	points: 0,
	coupons: 0,
	order: {},
	history: {},
	vip:false
}]


// 所有地址相关的测试数据
export const ADDRESS_DATA = {
	my_address: [{
			name: "林除夕",
			gender: 1,
			phone: 18455556666,
			address: "上海浦东新区陆家嘴滨江大道旁的花园石桥路28弄",
			position_name: "汤臣一品",
			tag: null
		},
		{
			name: "林除夕",
			gender: 1,
			phone: 18455556666,
			address: "上海浦东新区陆家嘴滨江大道旁的花园石桥路28弄",
			position_name: "汤臣二品",
			tag: null
		},
		{
			name: "林除夕",
			gender: 0,
			phone: 18455556666,
			address: "上海浦东新区陆家嘴滨江大道旁的花园石桥路28弄",
			position_name: "汤臣三品",
			tag: "学校"
		},
		{
			name: "小李",
			gender: 0,
			phone: 18455557777,
			address: "上海浦东新区陆家嘴滨江大道旁的花园石桥路28弄",
			position_name: "汤臣一品",
			tag: "公司"
		},
		{
			name: "spike",
			gender: null,
			phone: 18455553333,
			address: "太平洋沿岸和比弗利山山脚下",
			position_name: "比利佛山庄",
			tag: "家"
		}
	],
	search_res: [{
			position_name: "汤臣一品",
			position_address: "上海市浦东新区花园石桥路28弄1-8号",
			distance: 10
		},
		{
			position_name: "汤臣二品",
			position_address: "上海市浦东新区花园石桥路28弄2-8号",
			distance: 20
		},
		{
			position_name: "云空煮海(富城路店)",
			position_address: "上海浦东新区富城路190号近汤臣一品近花园石桥路28弄2-8号",
			distance: 50
		},
		{
			position_name: "云空煮海",
			position_address: "上海浦东新区富城路190号近汤臣一品近花园石桥路",
			distance: 80
		}
	]
}


// 默认导出对象
export default {
	ADDRESS_DATA
}
