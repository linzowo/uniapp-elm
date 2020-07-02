<template>
    <view class="flex-direction padding-tb">
        <view class="padding bg-white align-center">
            <view class="confirm-tag-box text-xxl margin-right-xs">
                <text 
                v-show="true"
                class="lg text-green cuIcon-roundcheckfill"></text>
            </view>
            <text class="text-bold text-lg text-color-3">不需要发票</text>
        </view>

        <view class="invoice-list flex-direction">
            
            <view class="padding-lr padding-top padding-bottom-xs text-color-6">
                <text>发票信息</text>
            </view>

            <view class="invoice-item bg-white padding justify-between">

                <view class="align-center">
                    <view class="confirm-tag-box text-xxl margin-right-xs">
                        <text 
                        v-show="true"
                        class="lg text-green cuIcon-roundcheckfill"></text>
                    </view>

                    <!-- 单位 -->
                    <view 
                    v-if="false"
                    class="invoice-company flex-direction">
                        <view class="align-center margin-bottom-xs">
                            <view class="cu-tag line-blue sm margin-right-xs">
                                <text>单位</text>
                            </view>
                            <text class="text-color-3 text-bold">公司名称</text>
                        </view>
                        <text class="text-color-9">562154654651</text>
                    </view>

                    <!-- 个人 -->
                    <view 
                    v-if="true"
                    class="invoice-person align-center">
                        <view class="cu-tag line-green sm margin-right-xs">
                            <text>个人</text>
                        </view>
                        <text class="text-color-3 text-bold">林除夕</text>
                    </view>
                </view>

                
                <view class="text-xxl">
                    <text 
                    @tap="editAddress(index)"
                    class="lg text-gray cuIcon-post margin-right-sm"></text>
                </view>

            </view>

        </view>

        <view class="add-invoice-box justify-center bg-white align-center text-xl text-blue">
            <text class="lg cuIcon-roundadd margin-right-xs"></text>
            <text class="">新增发票信息</text>
        </view>
    </view>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
    .add-invoice-box{
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 100rpx;
    }

    .confirm-tag-box{
        min-width: 44rpx;
    }
</style>