
/**
 * @global
 * @module 全局-全局网络请求接口-service
 * @description 全局http请求模块所有前端接口均封装在此
 */
import http from './interface'

/**
 * @description 将业务所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 */

// (接口案例，可单独配置拦截和响应)
// export const test = (data) => {
// 	/* http.config.baseUrl = "http://localhost:8080/api/"
// 	//设置请求前拦截器
// 	http.interceptor.request = (config) => {
// 		config.header = {
// 			"token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
// 		}
// 	} */
// 	//设置请求结束后拦截器
// 	http.interceptor.response = (response) => {
// 		console.log('个性化response....')
// 		//判断返回状态 执行相应操作
// 		return response;
// 	}
//     return http.request({
// 		baseUrl: 'https://unidemo.dcloud.net.cn/',
//         url: 'ajax/echo/text?name=uni-app',
// 		dataType: 'text',
//         data,
//     })
// }
//baseUrl: http://152.136.149.54/api/wechat/
// 示例
// export const baiduMatchFace = (data)=>{
//     return http.request({
//         method: 'DELETE',
//         url: 'baidu/match',
//         data
//     })
// }

const _urlPath = {
	store_index_data:'test_data_store_index_data.json', // 店铺主页测试数据
	store_comment:'test_data_store_comment.json', // 店铺评论测试数据
	store_good_comment:'test_data_good_comment.json', // 店铺评论测试数据
	history_order:'test_data_history_order.json', // 历史订单数据
	index_enter_data:'index_enter_data.json', // 主页顶部tab数据
	discover_enter_data:'discover_enter_data.json', // 发现页顶部数据
	discover_duiba_gifs:'discover_duiba_gifs.json', // 发现页兑换数据
	city_data:'city_data.json', // 城市列表数据全国各级市县
	address_data:'address_data.json', // 测试用-用户地址数据
	categore_data:'categore_data.json', // 商品总分类数据
	combo_data:'combo_data.json', // 套餐页数据
	hot_search:'hot_search.json', // 热搜数据
	member_sale_goods:'member_sale_goods.json', // 会员折扣商品数据
	reward_red_packets:'reward_red_packets.json', // 奖励红包数据
	store_red_packets:'store_red_packets.json', // 店铺红包数据
	search_cue:'search_cue.json', // 搜索提示
	search_res_1:'search_res_1.json', // 搜索结果1
	search_res_2:'search_res_2.json', // 搜索结果2
	store_filter_data:'store_filter_data.json', // 商铺列表navtab的筛选标签数据
	store_list_data_1:'store_list_data_1.json', // 商铺列表商品数据1
	store_list_data_2:'store_list_data_2.json', // 商铺列表商品数据2
	store_list_data_3:'store_list_data_3.json', // 商铺列表商品数据3
	store_sort_data:'store_sort_data.json', // 商铺列表navtab排序标签数据
	order_data:'order_data.json', // 订单数据1
	order_data_2:'order_data_2.json', // 订单数据2
	remark_data:'remark_data.json', // 可选备注选项数据
	order_pay_data:'order_pay_data.json', // 订单支付页数据
}

// get请求
export const get = {
	store_index_data: () => {
		return http.get(_urlPath.store_index_data,{});
	},
	store_comment: () => {
		return http.get(_urlPath.store_comment,{});
	},
	store_good_comment: ()=>{
		return http.get(_urlPath.store_good_comment,{});
	},
	history_order: ()=>{
		return http.get(_urlPath.history_order,{});
	},
	index_enter_data: ()=>{
		return http.get(_urlPath.index_enter_data,{});
	},
	discover_enter_data: ()=>{
		return http.get(_urlPath.discover_enter_data,{});
	},
	discover_duiba_gifs: ()=>{
		return http.get(_urlPath.discover_duiba_gifs,{});
	},
	city_data: ()=>{
		return http.get(_urlPath.city_data,{});
	},
	address_data: ()=>{
		return http.get(_urlPath.address_data,{});
	},
	categore_data: ()=>{
		return http.get(_urlPath.categore_data,{});
	},
	combo_data: ()=>{
		return http.get(_urlPath.combo_data,{});
	},
	hot_search: ()=>{
		return http.get(_urlPath.hot_search,{});
	},
	member_sale_goods: ()=>{
		return http.get(_urlPath.member_sale_goods,{});
	},
	reward_red_packets: ()=>{
		return http.get(_urlPath.reward_red_packets,{});
	},
	store_red_packets: ()=>{
		return http.get(_urlPath.store_red_packets,{});
	},
	search_cue: ()=>{
		return http.get(_urlPath.search_cue,{});
	},
	search_res_1: ()=>{
		return http.get(_urlPath.search_res_1,{});
	},
	search_res_2: ()=>{
		return http.get(_urlPath.search_res_2,{});
	},
	store_filter_data: ()=>{
		return http.get(_urlPath.store_filter_data,{});
	},
	store_list_data_1: ()=>{
		return http.get(_urlPath.store_list_data_1,{});
	},
	store_list_data_2: ()=>{
		return http.get(_urlPath.store_list_data_2,{});
	},
	store_list_data_3: ()=>{
		return http.get(_urlPath.store_list_data_3,{});
	},
	store_sort_data: ()=>{
		return http.get(_urlPath.store_sort_data,{});
	},
	order_data: ()=>{
		return http.get(_urlPath.order_data,{});
	},
	order_data_2: ()=>{
		return http.get(_urlPath.order_data_2,{});
	},
	remark_data: ()=>{
		return http.get(_urlPath.remark_data,{});
	},
	order_pay_data: ()=>{
		return http.get(_urlPath.order_pay_data,{});
	}
}


// post请求
export const post = {}

// 导出默认对象
export default {
	get,
	post
}