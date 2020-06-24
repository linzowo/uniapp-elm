<template>
    <view class="order-confirm-container flex-direction">
        
        <!-- 收货地址 S -->
        <view class="margin-bottom-xs flex-direction">
            
        </view>
        <!-- 收货地址 E -->

        <!-- 送达、支付 S -->
        <view class="bg-white margin-bottom-xs">
            
        </view>
        <!-- 送达、支付 E -->

        <!-- 订单详情 S -->
        <view class="bg-white margin-bottom-sm">
            
        </view>
        <!-- 订单详情 E -->

        <!-- 备注信息 S -->
        <view class="bg-white margin-bottom-xs">
            
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
    .order-confirm-container{
        // position: relative;
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