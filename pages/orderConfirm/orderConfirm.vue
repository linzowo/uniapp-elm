<template>
    <view class="order-confirm-container flex-direction">
        <!-- 数据加载中(包括加载失败的情况) S -->
        <loading :loading="pageState.loading" :success="!(_.isEmpty(orderData))"></loading>
        <!-- 数据加载中 E -->

        <!-- 数据加载成功状态 S -->
        <view 
        v-if="!pageState.loading"
        class="flex-direction padding-lr-sm">
            <!-- 收货地址 S -->
            <view 
            @tap="openPopup"
            class="margin-bottom-xs flex-direction padding-sm ">
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
            <view class="bg-white margin-bottom-sm flex-direction padding-lr">
                <view class="padding-tb-sm border-bottom border-color-e">
                    <text class="store-name"></text>
                    <text class="store-name-sub"></text>
                </view>

                <!-- 商品列表 -->
                <view class="flex-direction goods-list">
                    
                    <view class="goods-item justify-between border-bottom border-color-e">
                        <view class="flex-direction">

                            <view class="goods-img-box">
                                <image 
                                src="" 
                                mode="widthFix" />
                            </view>

                            <view class="flex-direction">
                                <text>商品名</text>
                                <view class="">
                                    <text>介绍</text>
                                    <text>数量</text>
                                </view>
                            </view>

                        </view>
                        
                        <view class="">
                            <text class="text-price">41</text>
                        </view>

                    </view>

                </view>

                <!-- 配送费 -->
                <view class="justify-between border-bottom border-color-e">
                    <view class="">
                        <text>配送费</text>
                    </view>

                    <view class="">
                        <text class="text-price delete-line"></text>
                        <text class="text-price"></text>
                    </view>
                </view>

                <!-- 优惠 -->
                <view class="justify-between border-bottom border-color-e">
                    <view class="">
                        <text class="activity-tag">满减</text>
                        <text>店铺优惠</text>
                    </view>

                    <view class="">
                        <text class="">-</text>
                        <text class="text-price text-color-price">9</text>
                    </view>
                </view>

                <!-- 红包 -->
                <view class="justify-between border-bottom border-color-e">
                    <view class="">
                        <text>红包/抵用券</text>
                    </view>

                    <view class="">
                        <!-- 未选择地址状态 -->
                        <view class="">
                            
                        </view>
                        <!-- 已选择地址状态 -->
                        <view class="">
                            
                        </view>
                    </view>
                </view>

                <!-- 总价 -->
                <view class="justify-between border-bottom border-color-e">
                    <view class="">
                        <text>优惠说明</text>
                        <text class=""></text>
                    </view>

                    <view class="">
                        <text class="">小计</text>
                        <text class="text-price">75</text>
                    </view>
                </view>

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
        <!-- 数据加载成功状态 E -->
    </view>
</template>

<script>
    /**
     * @module 订单确认模块
     */

    export default {
        name:"orderConfirm",
        data(){
            return{
                orderData:{}, // 订单数据
                pageState:{
                    loading: true, // true-页面数据加载中 false-页面数据加载完成
                }
            }
        },
        created() {
            this.$http.get.order_data().then((res)=>{
                this.orderData = res;
                this.pageState.loading = false;
            },e=>{
                console.log('请求失败',e);
                this.pageState.loading = false;
            });
        }
        ,
        methods:{
            openPopup(){
                this.$refs.codingPopup.open();
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