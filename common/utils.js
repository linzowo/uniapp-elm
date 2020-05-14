// 工具类
import Vue from 'vue'

/**
 * 获取元素基本信息（宽高定位等)
 * @param {String} selector 元素选择器
 * ID选择器：#the-id
 * class选择器（可以连续指定多个）：.a-class.another-class
 * 子元素选择器：.the-parent > .the-child
 * 后代选择器：.the-ancestor .the-descendant
 * 跨自定义组件的后代选择器：.the-ancestor >>> .the-descendant
 * 多选择器的并集：#a-node, .some-other-nodes
 * 
 * @param {Function} callback 回调函数，不传就不执行
 * 
 * @param {Object} range 你要在什么组件范围内查找元素 详情参见
 * https://uniapp.dcloud.io/api/ui/nodes-info?id=selectorqueryin 
 */
export const getElementInfo = (selector,callback,range) => {
	let res;
	let query = range?uni.createSelectorQuery().in(range):uni.createSelectorQuery();
	query.select(selector).boundingClientRect(data=>{
		res = data;
		if(callback){
			callback(res);
		}
	}).exec();
	
	return res;
}

/**
 * 用于输出日志方法
 * @param {String} fnName 方法名
 * @param {String} description 描述
 * @param {*} data 获取的数据，非必要
 */
export const log = (fnName,description,data="") => {
	
	// 阻止生产环境输出日志消息
	if(!Vue.config.productionTip) return;
	
	// 输出日志
	console.log(fnName+"：",description,data);
}

export default {
	getElementInfo,
	log
}