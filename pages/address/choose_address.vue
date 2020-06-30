<template>
    <view class="choose-address-container flex-direction">
        
        <!-- 配送范围内店铺 S -->
        <view class="flex-direction address-list">
            
            <view class="address-item padding bg-white justify-between align-center">
                <view class="align-center">
                    <view class="choose-tag-box margin-right-xs text-xxl">
                        <text class="lg text-green cuIcon-roundcheckfill"></text>
                    </view>

                    <view class="user-box flex-direction">
                        <view class="align-center text-xl">
                            <text class="text-bold text-color-3">林除夕</text>
                            <text class="margin-right-xs">先生</text>
                            <text class="">1546864549</text>
                        </view>
                        <view class="align-center">
                            <view class="cu-tag line-blue type-tag margin-right-xs">公司</view>
                            <text class="">凯信家居装饰城成都市温江区来凤路288号凯信·双子国际1-4层5-1005</text>
                        </view>
                    </view>
                </view>

                <view class="text-xxl">
                    <text class="lg text-gray cuIcon-post margin-right-sm"></text>
                    <text class="lg text-gray cuIcon-close"></text>
                </view>

            </view>

        </view>
        <!-- 配送范围内店铺 E -->

        <!-- 配送范围外店铺 S -->
        <view class="flex-direction address-list">

            <view class="padding padding-bottom-xs text-color-6">
                <text>以下地址超出配送范围</text>
            </view>
            
            <view class="address-item padding bg-white justify-between align-center">
                <view class="align-center">
                    <view class="flex-direction over-distance-box">
                        <view class="align-center text-lg">
                            <text class="text-bold text-color-3">林除夕</text>
                            <text class="margin-right-xs">先生</text>
                            <text class="">1546864549</text>
                        </view>
                        <view class="align-center">
                            <view class="cu-tag line-blue type-tag margin-right-xs">公司</view>
                            <text class="">凯信家居装饰城成都市温江区来凤路288号凯信·双子国际1-4层5-1005</text>
                        </view>
                    </view>
                </view>

                <view class="text-xxl">
                    <text class="lg text-gray cuIcon-post margin-right-sm"></text>
                    <text class="lg text-gray cuIcon-close"></text>
                </view>

            </view>

        </view>
        <!-- 配送范围外店铺 E -->

        <!-- 底部新增地址按钮 S -->
        <view class="add-address-btn-box bg-white justify-center align-center">
            <text class="lg text-color-blue-0 text-xxl cuIcon-roundadd margin-right-xs"></text>
            <text class="text-color-blue text-lg">新增收货地址</text>
        </view>
        <!-- 底部新增地址按钮 E -->
    </view>
</template>

<script>
    /**
     * @module choose_address 
     * @description 选择收货地址地址
     */

    export default {
        name:'choose_address',
        data() {
            return {

            }
        }
        ,
        created() {

        }
    }
</script>

<style lang="scss" scoped>
    .add-address-btn-box{
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 100rpx;
    }
    .choose-tag-box{
        min-width: 55rpx;
        min-height: 55rpx;
    }
    .user-box{
        width: 535rpx;
    }
    .type-tag{
        height: 30rpx;
        padding: 5rpx;
    }
    .over-distance-box{
        opacity: .5;
    }
</style>