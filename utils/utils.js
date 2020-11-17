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

/**
 * 将rpx值转换为px值
 * @param {Number} rpx 要转换的rpx值
 */
export const rpx2px = (rpx)=>{
	let res;
	
	uni.getSystemInfo({
		success(e) {
			// console.log(e.screenWidth);
			res = rpx * (e.screenWidth / 750);
		}
	})
	
	return res;
}

/**
 * 多数相加方法,支持浮点数相加，同时解决浮点数导致计算精度问题
 * 目前只支持精确到小数点后两位的浮点数运算
 * @param {Number} number 你可以传入任意数量的数字作为参数
 * @return {Number}
 */
export const add = () => {
	let res = 0;
	for(let i in arguments){
		if(typeof(arguments[i]) === 'number'){
			res += (arguments[i].toFixed(2))*100;
		}
	}
	
	return res / 100;
}

/**
 * 多数相减方法,支持浮点数相减，同时解决浮点数导致计算精度问题
 * 目前只支持精确到小数点后两位的浮点数运算
 * 按照参数传入顺序依次相减
 * @param {Number} number 你可以传入任意数量的数字作为参数
 * @return {Number}
 */
export const minus = () => {
	let res = 0;
	for(let i in arguments){
		if(typeof(arguments[i]) === 'number'){
			if(res == 0){
				res = (arguments[i].toFixed(2))*100;
			}else{
				res -= (arguments[i].toFixed(2))*100;
			}
		}
	}
	
	return res / 100;
}

/**
 * 多数相乘方法,支持浮点数相乘，同时解决浮点数导致计算精度问题
 * 目前只支持精确到小数点后两位的浮点数运算
 * @param {Number} number 你可以传入任意数量的数字作为参数
 * @return {Number}
 */
export const multiply = () => {
	let res = 1;
	for(let i in arguments){
		if(typeof(arguments[i]) === 'number'){
			res = (res * 100) * (arguments[i].toFixed(2))*100;
			res /= 10000;
		}
	}
	
	return res.toFixed(2);
}

/**
 * 多数相除方法,支持浮点数相除，同时解决浮点数导致计算精度问题
 * 目前只支持精确到小数点后两位的浮点数运算
 * 按照传入顺序依次相除
 * @param {Number} number 你可以传入任意数量的数字作为参数
 * @return {Number}
 */
export const divide = () => {
	let res = 0;
	for(let i in arguments){
		if(typeof(arguments[i]) === 'number'){
			if(res == 0){
				res = arguments[i].toFixed(2);
			}else{
				res = (res * 100) / ((arguments[i].toFixed(2)) * 100);
			}
		}
	}
	
	return res.toFixed(2);
}


export default {
	getElementInfo,
	log,
	rpx2px,
	add,
	minus,
	multiply,
	divide
}