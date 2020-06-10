
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
	storeIndexData:'test_data_store_index_data.json', // 店铺主页测试数据
	storeCommentData:'test_data_store_comment.json', // 店铺评论测试数据
}

// get请求
export const get = {
	storeIndexData: () => {
		return http.get(_urlPath.storeIndexData,{});
	},
	storeCommentData: () => {
		return http.get(_urlPath.storeCommentData,{});
	}
}

// post请求
export const post = {}

// 导出默认对象
export default {
	get,
	post
}