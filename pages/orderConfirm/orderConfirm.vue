<template>
    <view class="order-confirm-container flex-direction padding-lr-sm">
        
        <!-- 收货地址 S -->
        <view class="margin-bottom-xs flex-direction padding-sm ">
            <view class="text-color-e margin-bottom-xs">
                <text>订单配送至</text>
            </view>
            <view class="flex-direction">
                <view class="text-xl text-white align-center margin-bottom-xs">
                    <text>选择收货地址</text>
                    <text class="lg cuIcon-right"></text>
                </view>
                <view class="align-center">
                    <text>林除夕（先生）</text>
                    <text class="">18542456345</text>
                </view>
            </view>
        </view>
        <!-- 收货地址 E -->

        <!-- 送达、支付 S -->
        <view class="bg-white margin-bottom-xs padding-lr flex-direction">
            <view class="padding-tb border-bottom border-color-e justify-between text-lg">
                <view class="flex-direction">
                    <text class="text-color-3 margin-bottom-xs">送达时间</text>
                    <view>
                        <text class="text-xs padding-lr-xs fengniao">蜂鸟专送</text>
                    </view>
                </view>
                <view class="align-center">
                    <text class="text-color-blue">尽快送达</text>
                    <text class="lg text-color-c cuIcon-right"></text>
                </view>
            </view>
            <view class="padding-tb justify-between text-lg">
                <text class="text-color-3">支付方式</text>
                <view class="align-center">
                    <text class="text-color-blue">在线支付</text>
                </view>
            </view>
        </view>
        <!-- 送达、支付 E -->

        <!-- 订单详情 S -->
        <view class="bg-white margin-bottom-sm flex-direction">
            
        </view>
        <!-- 订单详情 E -->

        <!-- 备注信息 S -->
        <view class="bg-white margin-bottom-xs flex-direction">
            
        </view>
        <!-- 备注信息 E -->

        <!-- 底部固定区域 S -->
        <view class="footer-box justify-between padding-left-sm">
            <view class="justify-center align-center">
                <text class="text-price text-white text-xl text-bold">25</text>
                <text class="text-color-9 text-xs padding-lr-xs border-left border-color-9 margin-left-xs">已优惠￥14</text>
            </view>
            <view class="pay-btn text-xl padding-lr-xl justify-center align-center">
                <text>去支付</text>
            </view>
        </view>
        <!-- 底部固定区域 E -->
    </view>
</template>

<script>
    export default {
        data(){
            return{
                
            }
        }
    }
</script>

<style lang="scss" scoped>
    page{
        background-image: linear-gradient(0deg,#f5f5f5,#f5f5f5 65%,hsla(0,0%,96%,.3) 75%,hsla(0,0%,96%,0)),linear-gradient(90deg,#0af,#0085ff);
    }
    .footer-box{
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 88rpx;
        background-color: #3c3c3c;
    }
    .pay-btn{
        background-color: #00e067;
        color:#fff;
    }
</style>