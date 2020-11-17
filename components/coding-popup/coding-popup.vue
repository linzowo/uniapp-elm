<template>
    <view class="">
		<uni-popup
		ref="codingTipsPopup"
		type="center"
        @change="change"
		>
			<view class="content-box bg-white border-radius-10 align-center flex-direction padding-xl">
				<text>{{tipsText}}</text>
			</view>
		</uni-popup>
    </view>
</template>

<script>
    /**
     * @module 功能开发中-提示模块
     * 弹窗提示用户这个功能还在开发中
     */
	import uniPopup from '@/components/uni-popup/uni-popup.vue'

    export default {
        name:'coding-popup',
        data() {
            return {
                tipsText:'功能开发中...'
            }
        }
        ,
        props:{
            change: {
                type: Function,
                default(){
                    return null;
                }
            }
        }
        ,
		 components: {
			uniPopup,
		}
        ,
        methods: {
            open() {
                this.$refs.codingTipsPopup.open();
            },
            close(){
                this.$refs.codingTipsPopup.close();
            }
        }
    }
</script>

<style lang="scss" scoped>
    .content-box{
        width: 500rpx;
    }
</style>