<template>
    <view class="flex-direction">
        <!-- 顶部详情区 S -->
        <view class="padding-lr bg-white flex-direction">
            <view class="padding padding-top-xl align-center flex-direction">
                <text class="text-xs margin-bottom-xs text-color-9">支付剩余时间</text>
                <uni-countdown 
                class="text-xxl" 
                :show-day="false" 
                :minute="15" 
                :second="0" />
            </view>
            <view class="padding-tb border-top border-color-e justify-between">
                <view class="">
                    <text class="text-color-0 text-cut margin-right" :style="{maxWidth:'360rpx'}">超级小店超级分店a sfasdf as asdf a</text>
                    <text>详情</text>
                </view>
                <text class="text-price text-color-price text-lg">25.77</text>
            </view>
        </view>
        <!-- 顶部详情区 E -->

        <!-- 支付区 S -->
        <view class="flex-direction">
            <view class="padding-lr padding-top padding-bottom-xs text-color-9">
                <text>其他支付</text>
            </view>
            <view class="pay-list margin-bottom-sm flex-direction bg-white">

                <view class="alipay align-center pay-item padding-lr padding-tb-sm border-bottom border-color-e justify-between">
                    <view class="align-center">
                        <view class="text-sl margin-right-sm">
                            <svg class="icon-svg" aria-hidden="true"><use xlink:href="#icon-zhifubao"></use></svg>
                        </view>
                        <text class="text-lg text-color-0">支付宝</text>
                    </view>

                    <text 
                    class="lg cuIcon-roundcheckfill text-xxl"
                    :class="['text-green']"
                    ></text>
                </view>

                <view class="alipay align-center pay-item padding-lr padding-tb-sm border-bottom border-color-e justify-between">
                    <view class="align-center">
                        <view class="text-sl margin-right-sm">
                            <svg class="icon-svg" aria-hidden="true"><use xlink:href="#icon-weixinzhifu1"></use></svg>
                        </view>
                        <text class="text-lg text-color-0">微信支付</text>
                    </view>

                    <text class="lg text-gray cuIcon-roundcheckfill text-xxl"></text>
                </view>

            </view>

            <view class="padding-lr margin-top-xs">
                <button class="flex flex-sub cu-btn bg-green lg">确认支付</button>
            </view>
        </view>
        <!-- 支付区 E -->
    </view>
</template>

<script>
	import uniCountdown from '@/components/uni-countdown/uni-countdown.vue'
    export default {
        name:'pay',
        data() {
            return {
                
            }
        },
        components:{
            uniCountdown
        }
        ,
        mounted(){
            // #ifdef  H5
            document.querySelector('.uni-page-head-hd').style.display = 'none'
            // #endif
        },
    }
</script>

<style lang="scss" scoped>
    
</style>