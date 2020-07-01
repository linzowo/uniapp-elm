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
                <view class="text-white flex-direction">
                    <view class="text-xl align-center margin-bottom-xs">
                        <text class="text-cut">{{userInfo.shipAddress?userInfo.shipAddress.address:'选择收货地址'}}</text>
                        <text class="lg cuIcon-right"></text>
                    </view>
                    <view 
                    v-if="userInfo.shipAddress"
                    class="align-center">
                        <text>{{userInfo.shipAddress.name}}{{userInfo.shipAddress.gender===null?'':userInfo.shipAddress.gender?'（先生）':'（女士）'}}</text>
                        <text class="">{{userInfo.shipAddress.phone}}</text>
                    </view>
                </view>
            </view>
            <!-- 收货地址 E -->

            <!-- 送达、支付 S -->
            <view 
            @tap="openPopup('arriveTimePopup')"
            class="bg-white margin-bottom-sm padding-lr flex-direction">
                <view class="padding-tb border-bottom border-color-e justify-between text-lg">
                    <view class="flex-direction">
                        <text class="text-color-3 margin-bottom-xs">送达时间</text>
                        <view>
                            <text class="text-xs padding-lr-xs fengniao">蜂鸟专送</text>
                        </view>
                    </view>
                    <view class="align-center">
                        <text class="text-color-blue">{{!deliverTimesCur[0]&&!deliverTimesCur[1]?'尽快送达':deliverTimes[deliverTimesCur[0]].tab + deliverTimes[deliverTimesCur[0]].time_points[deliverTimesCur[1]].time}}</text>
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

        <!-- 弹窗区域 S -->
        <view 
        v-if="!pageState.loading"
        class="">
            <!-- 送达时间弹窗 S -->
            <uni-popup 
            ref="arriveTimePopup" 
            @change="popupChange" 
            type="bottom">
                <view class="arrive-time-box bg-e flex-direction">
                    
                    <view class="arrive-time-title-box justify-center text-lg padding-top padding-bottom-xs">
                        <text>选择送达时间</text>
                    </view>

                    <view class="arrive-time-body-box text-sm">
                        <scroll-view 
                        :scroll-y="true" 
                        class="arrive-time-nav-head nav-head-list"
                        >
                            <view 
                            v-for="(item, index) in deliverTimes" :key="index"
                            @tap="switchDelicerTab(index)"
                            class="nav-head-item bg-white text-color-3 justify-center padding border-bottom border-color-e">
                                <text>{{item.tab}}</text>
                            </view>

                        </scroll-view>

                        <scroll-view 
                        :scroll-y="true" 
                        class="arrive-time-nav-body nav-body-list"
                        >
                            <view 
                            v-for="(item, index) in deliverTimes[deliverTimesCur[0]].time_points" :key="index"
                            @tap="chooseDeliverTimes(index)"
                            class="nav-body-item bg-white text-color-3 padding-lr">
                                <view class="border-bottom border-color-e padding-tb flex-sub align-center justify-between">
                                    <view class="align-center">
                                        <text class="text-df">{{!deliverTimesCur[0]&&!index?'尽快送达 | ':''}}{{item.time}}</text>
                                        <text class="text-color-9 text-xs">（{{item.delivery_fee_description}}）</text>
                                    </view>
                                    <view class="text-xxl">
                                        <text 
                                        v-show="deliverTimesTabIndex == deliverTimesCur[0] && index == deliverTimesCur[1]"
                                        class="lg text-green cuIcon-roundcheckfill"></text>
                                    </view>
                                </view>
                            </view>

                        </scroll-view>
                    </view>
                </view>
            </uni-popup>
            <!-- 送达时间弹窗 E -->


        </view>
        <!-- 弹窗区域 E -->
    </view>
</template>

<script>
    /**
     * @module 订单确认模块
     */
    import {mapState} from 'vuex';

    export default {
        name:"orderConfirm",
        data(){
            return{
                orderData:{}, // 订单数据
                cart:{}, // 购物车数据
                storeData:{}, // 店铺数据
                goodsList:[], // 商品列表
                redpackData:{}, // 红包相关数据
                deliverTimes:[], // 送达时间相关数据
                deliverTimesCur:[0,0], // 第一项为 tab的curIndex 第二项为 list的 curIndex
                deliverTimesTabIndex:0, // 当前查看的是哪个送达时间区间
                pageState:{
                    loading: true, // true-页面数据加载中 false-页面数据加载完成
                },
		        popupStack:[], // 弹窗栈用于帮助用户关闭多个弹窗
            }
        },
        computed:{
            ...mapState([
                'userInfo'
            ])
        }
        ,
        created() {
            this.$http.get.order_data().then((res)=>{
                this.orderData = res;
                this.cart = res.cart;
                this.goodsList = res.cart.group[0];
                this.storeData = res.cart.restaurant;
                this.redpackData = res.hongpon_info;
                this.deliverTimes = res.deliver_times;
                this.pageState.loading = false;
            },e=>{
                console.log('请求失败',e);
                this.pageState.loading = false;
            });
        }
        ,
        onBackPress(e) {
            
            // 当存在打开的弹窗时通过返回键可以关闭弹窗
            if(this.popupStack.length > 0){
                this.closePopup(this.popupStack[this.popupStack.length-1]);
                return true;
            }
            
        }
        ,
        methods:{
            /**
             * 切换送达时间的大区间-预约第二天等
             * @param {Number} index 当前选择的时间区间的索引值
             */
            switchDelicerTab(index){
                this.deliverTimesTabIndex = index;
            }
            ,
            /**
             * 选择送达时间
             * @param {Number} index 当前选择的送达时间的索引值
             */
            chooseDeliverTimes(index){
                this.$set(this.deliverTimesCur,0,this.deliverTimesTabIndex);
                this.$set(this.deliverTimesCur,1,index);
            }
            ,
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
		    ,
            /**
             * 弹窗状态变化完成时触发的方法
             * @param {Object} e 事件参数对象
             */
            popupChange(e){
                this.$utils.log('popupChange','弹窗状态改变==>' + (e.show?'开':'关'),e);
                if(e.show == false){
                    this.popupStack.pop();
                }
            }
            ,
            /**
             * 打开弹窗
             * @param {String} ref 弹窗的ref值
             */
            openPopup(ref){
                this.$utils.log('openPopup','打开弹窗'+ref);
                if(this.popupStack.includes(ref)) return;
                
                this.popupStack.push(ref);
                this.$refs[ref].open();
            }
            ,
            /**
             * 关闭弹窗
             * @param {String} ref 弹窗的ref值
             */
            closePopup(ref){
                this.$utils.log('closePopup','关闭弹窗'+ref);
                this.$refs[ref].close();
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

    .arrive-time-box{
        width: 750rpx;
    }
    .arrive-time-box,.nav-head-list,.nav-body-list{
        height: 600rpx;
    }
    .nav-head-list{
        flex:3;
    }
    .nav-body-list{
        flex: 7;
    }
</style>