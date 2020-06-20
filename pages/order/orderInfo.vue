<template>
    <view class="order-info-container flex-direction padding-sm">
        <!-- 顶部标题 S -->
        <view class="order-card margin-bottom-sm padding bg-white flex-direction">
            <text 
            class="border-bottom border-color-e padding-bottom text-xl text-color-3 text-bold"
            >{{orderData.is_arrive?$c_t.order.is_arrive:$c_t.order.deliverying}}</text>
            <text class="padding-tb-sm text-color-6 text-lg">{{$c_t.order.thank}}</text>
        </view>
        <!-- 顶部标题 E -->
        
        <!-- 商品详情 S -->
        <view class="order-card margin-bottom-sm padding bg-white flex-direction">
            <!-- 店铺名称 -->
            <view 
            @tap="gotoStoreIndex(orderData.id)"
            class="padding-bottom-sm border-bottom border-color-e border-lg justify-between align-center">
                <view class="align-center">
                    <image 
                    class="store-cover margin-right-sm"
                    :src="orderData.image_path|imgUrlFilter" 
                    mode="widthFix" />
                    <text>{{orderData.name}}</text>
                </view>
                <text class="lg text-black cuIcon-right"></text>
            </view>

            <!-- 商品列表 -->
            <view class="goods-list flex-direction">
                <view 
                v-for="(item, index) in orderData.foods" :key="index"
                class="goods-item padding-tb-sm border-bottom border-color-e justify-between align-center">
                    <text class="text-cut" :style="{width:'460rpx'}">{{item.name}}</text>
                    <view class="">
                        <text class="margin-right-xs">x{{item.count}}</text>
                        <text class="text-price text-right text-cut" :style="{width:'120rpx'}">{{item.price}}</text>
                    </view>
                </view>
            </view>

            <!-- 订单价格 -->
            <view class="padding-top justify-between align-center border-top border-color-e margin-top">
                <view 
                @tap="makePhoneCall(orderData.id)"
                class="text-color-blue-0 align-center">
                    <text class="lg cuIcon-phone margin-right-xs text-xl"></text>
                    <text>联系商家</text>
                </view>

                <view class="align-end">
                    <text class="margin-right-xs">实付</text>
                    <text class="text-price text-right text-lg text-color-3 text-cut" :style="{maxWidth:'300rpx'}">{{orderData.total_price}}</text>
                </view>

            </view>

        </view>
        <!-- 商品详情 E -->

        <!-- 配送信息 S -->
        <view class="order-card margin-bottom-sm padding bg-white flex-direction">
            <text class="padding-bottom-sm border-bottom border-color-e text-color-3">配送信息</text>
            <text class="padding-tb-sm border-bottom border-color-e">送达时间：{{orderData.delivery_info.arrive_time?orderData.delivery_info.arrive_time:'尽快送达'}}</text>
            <view class="padding-tb-sm border-bottom border-color-e">
                <text>送货地址：</text>
                <view class="flex-direction" :style="{width:'500rpx'}">
                    <text>{{orderData.delivery_info.user.name}}{{orderData.delivery_info.user.gender?(orderData.delivery_info.user.gender==1?'（先生）':'（女士）'):''}}</text>
                    <text>{{orderData.delivery_info.user.address}}</text>
                </view>
            </view>
            <text class="padding-top-sm">配送方式：{{orderData.delivery_info.delivery_type}}</text>
        </view>
        <!-- 配送信息 E -->

        <!-- 订单信息 S -->
        <view class="order-card margin-bottom-sm padding bg-white flex-direction">
            <text class="padding-bottom-sm border-bottom border-color-e text-color-3">订单信息</text>
            <text class="padding-tb-sm border-bottom border-color-e">订单号：{{orderData.order_id}}</text>
            <text class="padding-tb-sm border-bottom border-color-e">支付方式：{{orderData.pay_type}}</text>
            <text class="padding-tb-sm border-bottom border-color-e">下单时间：{{orderData.created_at}}</text>
            
        </view>
        <!-- 订单信息 E -->

    </view>
</template>

<script>
    export default {
        data() {
            return {
                orderData:{}, // 当前的订单详细信息
            }
        },
        created(){
            uni.getStorage({
                key: 'order_info',
                success: (res)=>{
                    // 将数据存储到对象中
                    this.orderData = JSON.parse(res.data);
                    // 清空缓存数据
                    // uni.setStorage({
                    //     key: 'order_info',
                    //     data: '{}',
                    //     success: function () {
                    //         console.log('清空缓存成功');
                    //     }
                    // });
                }
            });
        },
        onNavigationBarButtonTap(e){
            console.log(e);
            if(e.index == 0){
                uni.navigateTo({
                     url: this.$pages_path.service,
                     fail(e) {
                         console.log('跳转失败',e);
                     }
                });
            }
        }
        ,
        methods: {
            /**
             * 跳转至店铺主页
             * @param {Number} storeId 店铺id
             */
            gotoStoreIndex(storeId){
                uni.navigateTo({
                     url: this.$pages_path.store_index,
                     fail(e) {
                         console.log('跳转失败',e);
                     }
                });
            },
            /**
             * 拨打用户电话
             * @param {Number} storeId 店铺id
             */
            makePhoneCall(storeId){
                // 根据店铺id查询店铺电话

                // 调用拨号器
                uni.makePhoneCall({
                    phoneNumber: '1234567',
                    success: (result)=>{
                        console.log('唤起成功');
                    },
                    fail: (e)=>{
                        console.log('唤起失败',e);
                        uni.showToast({
                            title: '调用电话功能失败，请手动联系用户。',
                            icon: 'none'
                        });

                    },
                    complete: ()=>{}
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .store-cover{
        width: 40rpx;
    }
</style>