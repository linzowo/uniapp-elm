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
            @tap="chooseAddress"
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
            <view class="bg-white margin-bottom-sm padding-lr flex-direction">
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
            <view class="bg-white margin-bottom flex-direction padding-lr">
                <view class="padding-tb border-bottom border-color-e">
                    <text class="store-name text-bold text-lg text-color-3 margin-right-sm">{{storeData.name.split('(')[0]}}</text>
                    <text class="store-name-sub text-color-3">{{'(' + storeData.name.split('(')[1]}}</text>
                </view>

                <!-- 商品列表 -->
                <view class="flex-direction goods-list">
                    
                    <view 
                    v-for="(item, index) in goodsList" :key="index"
                    class="goods-item align-center padding-tb-sm justify-between border-bottom border-color-e">
                        <view class="">

                            <view class="goods-img-box margin-right-xs">
                                <image 
                                :src="item.image_hash,'w_72,h_72'|imgUrlFilter" 
                                mode="widthFix" />
                            </view>

                            <view class="align-center">
                                <view class="flex-direction margin-right-xs">
                                    <text class="text-cut goods-name text-color-3 margin-bottom-xs">{{item.name}}</text>
                                    <text
                                    v-for="(e, i) in item.specs" :key="i"
                                    class="text-xs text-color-6"
                                    >{{e}}</text>
                                </view>
                                <text class="text-xs">x {{item.quantity}}</text>
                            </view>

                        </view>
                        
                        <view class="text-lg">
                            <text 
                            v-if="item.total_discount_amount != 0"
                            class="text-price delete-line margin-right-xs text-color-c">{{item.total_price}}</text>
                            <text 
                            class="text-price"
                            :class="item.total_discount_amount != 0?'text-color-price':'text-color-3'"
                            >{{item.total_price + item.total_discount_amount}}</text>
                        </view>

                    </view>

                </view>

                <!-- 配送费 -->
                <view class="justify-between padding-tb text-color-3 border-bottom border-color-e">
                    <view class="">
                        <text>配送费</text>
                    </view>

                    <view class="text-lg align-center">
                        <text 
                        v-if="cart.extra.agent_fee.original_price > cart.extra.agent_fee.price"
                        class="delete-line text-color-c margin-right"
                        >￥{{cart.extra.agent_fee.original_price}}</text>
                        <text 
                        class="text-price text-color-3"
                        >{{cart.extra.agent_fee.price}}</text>
                    </view>
                </view>

                <!-- 优惠 -->
                <view 
                v-if="cart.abandoned_extra.length"
                class="justify-between border-bottom border-color-e padding-tb-sm">
                    <view class="">
                        <text class="activity-tag">折扣商品不与满减津贴等优惠同享</text>
                    </view>

                    <view class="">
                        <text class="">-</text>
                        <text class="text-price text-color-price">9</text>
                    </view>
                </view>

                <!-- 店铺活动优惠列表 -->
                <view 
                class="activity-list flex-direction"
                v-if="cart.extra.others.length"
                >
                    <view 
                    v-for="(item, index) in cart.extra.others" :key="index"
                    class="activity-item padding-tb justify-between border-bottom border-color-e">
                        <view class="">
                            <view class="text-xs activity-tag margin-right-sm text-white" :style="{backgroundColor:'#'+item.icon.color}">
                                <text>{{item.icon.name}}</text>
                            </view>
                            <text>{{item.name}}</text>
                        </view>

                        <view class="text-color-price">
                            <text class="margin-right-xs">-</text>
                            <text class="text-price text-lg">{{-item.price}}</text>
                        </view>
                    </view>

                </view>

                <!-- 红包 -->
                <view class="justify-between border-bottom border-color-e padding-tb">
                    <view class="text-color-3">
                        <text>{{redpackData.title}}</text>
                    </view>

                    <view class="">
                        <view 
                        class="align-center text-white padding-lr-xs text-xs"
                        :style="{backgroundImage:'linear-gradient(106deg,#ff7417,#ff3c15)'}"
                        >
                            <text 
                            class="lg cuIcon-redpacket_fill margin-right-xs"
                            ></text>
                            <text class="">{{redpackData.status_text}}</text>
                        </view>
                    </view>
                </view>

                <!-- 总价 -->
                <view class="justify-between border-bottom border-color-e padding-tb">
                    <view class="text-color-c align-center">
                        <text>优惠说明</text>
                        <text class="lg cuIcon-question"></text>
                    </view>

                    <view class="text-color-3 align-center">
                        <text class="margin-right-xs">小计</text>
                        <text class="text-price text-xxl">{{cart.total}}</text>
                    </view>
                </view>

            </view>
            <!-- 订单详情 E -->

            <!-- 备注信息 S -->
            <view class="bg-white margin-bottom-sm flex-direction padding-lr">
                
                <!-- 餐具 -->
                <view class="padding-tb align-center border-bottom border-color-e justify-between">
                    <view class="text-color-3">
                        <text>餐具份数</text>
                    </view>
                    <view class="align-center">
                        <view class="flex-direction align-end margin-right-xs">
                            <text class="text-color-c margin-bottom-xs">未选择</text>
                            <view class="">
                                <image class="margin-right-xs" :src="$i_u.green_leaf" mode="widthFix" :style="{width:'32rpx'}" />
                                <text class="text-xs" :style="{color:'#0bb473'}">选无需餐具，马上助力环保</text>
                            </view>
                        </view>
                        <text class="lg text-color-c cuIcon-right"></text>
                    </view>
                </view>

                <!-- 备注 -->
                <view class="padding-tb border-bottom border-color-e justify-between">
                    <view class="text-color-3">
                        <text>订单备注</text>
                    </view>
                    <view class="align-center">
                        <text class="text-color-c">口味、偏好</text>
                        <text class="lg text-color-c cuIcon-right margin-left-xs"></text>
                    </view>
                </view>
                
                <!-- 发票 -->
                <view class="padding-tb border-bottom border-color-e justify-between">
                    <view class="text-color-3">
                        <text>发票信息</text>
                    </view>
                    <view class="align-center">
                        <text class="text-color-c"> 不需要开发票</text>
                        <text class="lg text-color-c cuIcon-right margin-left-xs"></text>
                    </view>
                </view>
                
                <!-- 电话保护 -->
                <view class="padding-tb flex-direction">
                    <view class="margin-bottom-xs align-center">
                        <text class="text-color-3 margin-right-xs">号码保护</text>
                        <text class="lg text-color-c cuIcon-question"></text>
                    </view>
                    <text class="text-xs text-color-c">号码保护中，将对商家、骑士隐藏您的真实手机号</text>
                </view>

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
                cart:{}, // 购物车数据
                storeData:{}, // 店铺数据
                goodsList:[], // 商品列表
                redpackData:{}, // 红包相关数据
                pageState:{
                    loading: true, // true-页面数据加载中 false-页面数据加载完成
                }
            }
        },
        created() {
            this.$http.get.order_data().then((res)=>{
                this.orderData = res;
                this.cart = res.cart;
                this.goodsList = res.cart.group[0];
                this.storeData = res.cart.restaurant;
                this.redpackData = res.hongpon_info;
                this.pageState.loading = false;
            },e=>{
                console.log('请求失败',e);
                this.pageState.loading = false;
            });
        }
        ,
        methods:{
            /**
             * 选择收货地址
             */
            chooseAddress(){

                // 跳转到地址选择页面
                uni.navigateTo({
                     url: this.$pages_path.choose_address,
                     fail(e) {
                         console.log(e);
                     }
                });
           }
        }
    }
</script>

<style lang="scss" scoped>
    page{
        background-image: linear-gradient(0deg,#f5f5f5,#f5f5f5 65%,hsla(0,0%,96%,.3) 75%,hsla(0,0%,96%,0)),linear-gradient(90deg,#0af,#0085ff);
    }
    .order-confirm-container{
        padding-bottom: 100rpx;
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
    .goods-img-box{
        width: 72rpx;
    }
    .goods-name{
        width: 300rpx;
    }
</style>