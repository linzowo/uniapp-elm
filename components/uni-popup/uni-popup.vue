<template>
	<view 
	v-if="showPopup" 
	class="uni-popup" 
	:style="{zIndex}"
	:class="[popupstyle]" 
	@touchmove.stop.prevent="clear">
		<uni-transition v-if="maskShow" :mode-class="['fade']" :styles="getMaskClass()" :duration="duration" :show="showTrans"
		 @click="onTap" />
		<uni-transition :mode-class="ani" :styles="getTransClass()" :duration="duration" :show="showTrans" @click="onTap">
			<view class="uni-popup__wrapper-box" @click.stop="clear">
				<slot />
			</view>
		</uni-transition>
	</view>
</template>

<script>
	import uniTransition from '../uni-transition/uni-transition.vue'
	import popup from './popup.js'
	/**
	 * PopUp 弹出层
	 * @description 弹出层组件，为了解决遮罩弹层的问题
	 * @tutorial https://ext.dcloud.net.cn/plugin?id=329
	 * @property {String} type = [top|center|bottom] 弹出方式
	 * 	@value top 顶部弹出
	 * 	@value center 中间弹出
	 * 	@value bottom 底部弹出
	 * 	@value message 消息提示
	 * 	@value dialog 对话框
	 * 	@value share 底部分享示例
	 * @property {Boolean} animation = [ture|false] 是否开启动画
	 * @property {Boolean} maskClick = [ture|false] 蒙版点击是否关闭弹窗
	 * @event {Function} change 打开关闭弹窗触发，e={show: false}
	 */

	export default {
		name: 'UniPopup',
		components: {
			uniTransition
		},
		props: {
			// 开启动画
			animation: {
				type: Boolean,
				default: true
			},
			// 弹出层类型，可选值，top: 顶部弹出层；bottom：底部弹出层；center：全屏弹出层
			// message: 消息提示 ; dialog : 对话框
			type: {
				type: String,
				default: 'center'
			},
			// maskClick
			maskClick: {
				type: Boolean,
				default: true
			},
			// 自定义遮罩层的样式，通过传递对应的参数可以修改其呈现样式
			myMaskClass: {
				type: Object,
				default() {
					return null;
				}
			},
			// 弹窗主体盒子样式，通过设置这个参数可以实现调节弹窗对应的呈现效果
			myTransClass: {
				type: Object,
				default() {
					return null;
				}
			},
			// 弹窗的top位置，通过这个参数可以将从顶部弹出的弹窗的高度控制在需要范围内
			positionTop: {
				type: Object,
				default() {
					return null;
				}
			},
			// 弹窗层级，某些特殊情况下需要一些特殊层级可以通过这个参数设置
			zIndex: {
				type: Number,
				default: 99
			}
		},
		provide() {
			return {
				popup: this
			}
		},
		mixins: [popup],
		watch: {
			/**
			 * 监听type类型
			 */
			type: {
				handler: function(newVal) {
					this[this.config[newVal]]()
				},
				immediate: true
			},
			/**
			 * 监听遮罩是否可点击
			 * @param {Object} val
			 */
			maskClick(val) {
				this.mkclick = val
			}
		},
		data() {
			return {
				duration: 300,
				ani: [],
				showPopup: false,
				showTrans: false,
				maskClass: {
					'position': 'fixed',
					'bottom': 0,
					'top': 0,
					'left': 0,
					'right': 0,
					'backgroundColor': 'rgba(0, 0, 0, 0.4)'
				},
				transClass: {
					'position': 'fixed',
					'left': 0,
					'right': 0,
				},
				maskShow: true,
				mkclick: true,
				popupstyle:'top'
			}
		}
		,
		created() {
			if (this.animation) {
				this.duration = 300
			} else {
				this.duration = 0
			}
		},
		methods: {
			// 自定义方法：过滤弹窗遮罩层样式
			getMaskClass(){
				
				Object.assign(this.maskClass,this.positionTop);
				
				if(this.myMaskClass){
					return Object.assign(this.maskClass,this.myMaskClass);
				}
				return this.maskClass;
			}
			,
			// 自定义方法：过滤弹窗主体盒子样式
			getTransClass(){
				
				Object.assign(this.transClass,this.positionTop);
				
				if(this.myTransClass){
					return Object.assign(this.transClass,this.myTransClass);
				}
				
				return this.transClass;
			}
			,
			clear(e) {
				// TODO nvue 取消冒泡
				e.stopPropagation()
			},
			open() {
				this.showPopup = true
				this.$nextTick(() => {
					new Promise(resolve => {
						clearTimeout(this.timer)
						this.timer = setTimeout(() => {
							this.showTrans = true
							// fixed by mehaotian 兼容 app 端
							this.$nextTick(() => {
								resolve();
							})
						}, 50);
					}).then(res => {
						// 自定义打开事件
						clearTimeout(this.msgtimer)
						this.msgtimer = setTimeout(()=>{
							this.customOpen && this.customOpen()
						},100)
						this.$emit('change', {
							show: true,
							type: this.type
						})
					})
				})
			},
			close(type) {
				this.showTrans = false
				this.$nextTick(() => {
					this.$emit('change', {
						show: false,
						type: this.type
					})
					clearTimeout(this.timer)
					// 自定义关闭事件
					this.customOpen && this.customClose()
					this.timer = setTimeout(() => {
						this.showPopup = false
					}, 300)
				})
			},
			onTap() {
				if (!this.mkclick) return
				this.close()
			},
			/**
			 * 顶部弹出样式处理
			 */
			top() {
				this.popupstyle = 'top'
				this.ani = ['slide-top']
				this.transClass = {
					'position': 'fixed',
					'left': 0,
					'right': 0,
				}
			},
			/**
			 * 底部弹出样式处理
			 */
			bottom() {
				this.popupstyle = 'bottom'
				this.ani = ['slide-bottom']
				this.transClass = {
					'position': 'fixed',
					'left': 0,
					'right': 0,
					'bottom': 0
				}
			},
			/**
			 * 中间弹出样式处理
			 */
			center() {
				this.popupstyle = 'center'
				this.ani = ['zoom-out', 'fade']
				this.transClass = {
					'position': 'fixed',
					/* #ifndef APP-NVUE */
					'display': 'flex',
					'flexDirection': 'column',
					/* #endif */
					'bottom': 0,
					'left': 0,
					'right': 0,
					'top': 0,
					'justifyContent': 'center',
					'alignItems': 'center'
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	.uni-popup {
		position: fixed;
		/* #ifndef APP-NVUE */
		z-index: 99;
		/* #endif */
	}

	.uni-popup__mask {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: $uni-bg-color-mask;
		opacity: 0;
	}

	.mask-ani {
		transition-property: opacity;
		transition-duration: 0.2s;
	}

	.uni-top-mask {
		opacity: 1;
	}

	.uni-bottom-mask {
		opacity: 1;
	}

	.uni-center-mask {
		opacity: 1;
	}

	.uni-popup__wrapper {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		position: absolute;
	}

	.top {
		/* #ifdef H5 */
		top: var(--window-top);
		/* #endif */
		/* #ifndef H5 */
		top: 0;
		/* #endif */
	}

	.bottom {
		bottom: 0;
	}
	.uni-popup__wrapper-box {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		position: relative;
		/* iphonex 等安全区设置，底部安全区适配 */
		/* #ifndef APP-NVUE */
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		/* #endif */
	}

	.content-ani {
		// transition: transform 0.3s;
		transition-property: transform, opacity;
		transition-duration: 0.2s;
	}


	.uni-top-content {
		transform: translateY(0);
	}

	.uni-bottom-content {
		transform: translateY(0);
	}

	.uni-center-content {
		transform: scale(1);
		opacity: 1;
	}
</style>
