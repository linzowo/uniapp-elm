<template>
    <view class="flex-direction">

        <!-- loading S -->
            <loading :loading="pageState.loading" :success="orderData !== null"></loading>
        <!-- loading E -->

        <!-- 主体内容 S -->
        <view 
        v-if="orderData !== null"
        class="flex-direction">
            
            <!-- 顶部详情区 S -->
            <view class="padding-lr bg-white flex-direction">
                <view class="padding padding-top-xl align-center flex-direction">
                    <text class="text-xs margin-bottom-xs text-color-9">支付剩余时间</text>
                    <uni-countdown 
                    v-if="!timeOver"
                    class="text-xxl" 
                    :show-day="false" 
                    :minute="15" 
                    :second="0"
                    @timeup="timeup"
                     />
                     <text 
                     v-else
                     class="text-xxl text-color-3">订单已超时</text>
                </view>
                <view 
                @tap="tapOrderInfo"
                class="padding-tb border-top border-color-e justify-between">
                    <view class="text-lg">
                        <text 
                        class="text-color-0 text-cut margin-right" 
                        :style="{maxWidth:'380rpx'}"
                        >{{orderData.orderName}}</text>
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

                    <view 
                    @tap="choosePayType(0)"
                    class="alipay align-center pay-item padding-lr padding-tb-sm border-bottom border-color-e justify-between">
                        <view class="align-center">
                            <view class="text-sl margin-right-sm">
                                <text class="iconfont text-blue text-xxl icon-zhifubao"></text>
                            </view>
                            <text class="text-lg text-color-0">支付宝</text>
                        </view>

                        <text 
                        class="lg cuIcon-roundcheckfill text-xxl"
                        :class="[payType==0?'text-green':'text-gray']"
                        ></text>
                    </view>

                    <view 
                    @tap="choosePayType(1)"
                    class="alipay align-center pay-item padding-lr padding-tb-sm border-bottom border-color-e justify-between">
                        <view class="align-center">
                            <view class="text-sl margin-right-sm">
                                <text class="iconfont text-green text-xxl icon-weixinzhifu1"></text>
                            </view>
                            <text class="text-lg text-color-0">微信支付</text>
                        </view>

                        <text 
                        class="lg cuIcon-roundcheckfill text-xxl"
                        :class="[payType==1?'text-green':'text-gray']"
                        ></text>
                    </view>

                </view>

                <view class="padding-lr margin-top-xs">
                    <button 
                    @click="timeOver?'':pay()"
                    :class="[timeOver?'bg-grey':'bg-green']"
                    class="flex flex-sub cu-btn lg">确认支付</button>
                </view>
            </view>
            <!-- 支付区 E -->

        </view>
        <!-- 主体内容 E -->

        <!-- 弹窗区域 S -->
        <view 
        v-if="orderData !== null"
        class="">
            <!-- 订单详情弹窗 S -->
            <uni-popup ref="orderInfoPopup" type="center">
                <view 
                @tap="closeOrderInfo"
                class="order-info-box align-center flex-direction text-color-f padding-lr-xl">
                    <!-- 订单标题 S -->
                    <view class="justify-center text-xl margin-bottom-xl">
                        <text>{{orderData.orderName}}</text>
                    </view>
                    <!-- 订单标题 E -->

                    <!-- 订单主体 S -->
                    <view class="flex-direction">
                        <!-- 分割线 S -->
                        <view class="justify-center margin-tb split-line">
                            <text class="padding-xs border border-color-e border-radius-30">订单详情</text>
                        </view>
                        <!-- 分割线 E -->
                        
                        <!-- 订单内容 S -->
                        <view class="flex-direction">
                            <text>{{orderData.orderMemo.user_info}}</text>
                            <text>{{orderData.orderMemo.address}}</text>
                            <text>-</text>
                            <text 
                            v-for="(item, index) in orderData.orderMemo.goods" :key="index"
                            >{{item}}</text>
                        </view>
                        <!-- 订单内容 E -->
                    </view>
                    <!-- 订单主体 E -->

                    <!-- 底部关闭按钮 S -->
                    <view class="text-sl order-info-close-btn justify-center padding-lr flex-sub">
                        <text class="lg text-gray cuIcon-roundclose"></text>
                    </view>
                    <!-- 底部关闭按钮 E -->

                </view>
            </uni-popup>
            <!-- 订单详情弹窗 E -->
            
            <!-- 支付弹窗 S -->
            <uni-popup ref="payPopup" type="center">
                <view class="flex-direction justify-center align-center padding-lr bg-white">
                    <view class="pay-img-box margin-bottom">
                        <image
                        v-if="payType" 
                        src="/static/image/wx-pay.png" 
                        mode="widthFix" />
                        <image 
                        v-else
                        src="/static/image/zfb-pay.jpg" 
                        mode="widthFix" />
                    </view>
                    <view class="text-xxl">
                        <text>如果你觉得这个项目还不错，欢迎你支持我进行更多开源项目的开发。</text>
                    </view>
                </view>
            </uni-popup>
            <!-- 支付弹窗 E -->

        </view>
        <!-- 弹窗区域 E -->

    </view>
</template>

<script>
	import uniCountdown from '@/components/uni-countdown/uni-countdown.vue'
    export default {
        name:'pay',
        data() {
            return {
                orderData:null, // 订单数据
                pageState:{
                    loading: true, // 页面数据加载中
                },
                payType:0, // 支付方式索引值 0-支付宝 1-微信支付
                timeOver:false, // 倒计时是否结束
            }
        },
        components:{
            uniCountdown
        }
        ,
        created() {
            this.$http.get.order_pay_data().then((res)=>{
                this.orderData = res;
                this.pageState.loading = false;
            },e=>{
                console.log(e);
                this.pageState.loading = false;
            })
        }
        ,
        mounted(){
            // #ifdef  H5
            document.querySelector('.uni-page-head-hd').style.display = 'none'
            // #endif
        },
        methods: {
            pay(){
                console.log('唤起支付');
                this.$refs.payPopup.open();
            }
            ,
            /**
             * 倒计时到了
             */
            timeup(){
                this.timeOver = true;
            }
            ,
            /**
             * 选择支付方式
             * @param {Number} index 支付方式的索引值
             */
            choosePayType(index){
                this.payType = index;
            }
            ,
            tapOrderInfo(){
                this.$refs.orderInfoPopup.open();
            },
            closeOrderInfo(){
                this.$refs.orderInfoPopup.close();
            }
        }
    }
</script>

<style lang="scss" scoped>
    .order-info-box{
        height: 100vh;
        width: 750rpx;
        background-color: rgba(0,0,0,.71);
        padding-top: 300rpx;
    }
    .split-line{
        position: relative;
    }
    .split-line::after{
        content: "";
        position: absolute;
        width: 100%;
        height: 1px;
        background-color: #eee;
        top: 50%;
        z-index: -1;
    }
    .order-info-close-btn{
        position: absolute;
        bottom: 100rpx;
        width: 100%;
    }
    .pay-img-box{
        width: 350rpx;
    }
</style>