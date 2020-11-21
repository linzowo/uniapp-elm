<template>
    <view class="choose-address-container flex-direction">
        
        <!-- 数据加载中 S -->
        <loading :loading="pageState.loading" :success="myAddress.length!==0"></loading>
        <!-- 数据加载中 E -->

        <!-- 数据加载成功 S -->
        <view 
        v-if="!pageState.loading"
        class="flex-direction">
            <!-- 配送范围内店铺 S -->
            <view class="flex-direction address-list">
                
                <view 
                v-for="(item, index) in myAddress" :key="index"
                class="address-item padding bg-white justify-between align-center">
                    <view 
                    @tap="SAVE_SHIP_ADDRESS(item)"
                    class="align-center">
                        <view 
                        class="choose-tag-box margin-right-xs text-xxl">
                        
                            <!--  #ifndef  MP-WEIXIN -->
                            <text 
                            v-show="JSON.stringify(item) == JSON.stringify(userInfo.shipAddress)"
                            class="lg text-green cuIcon-roundcheckfill"></text>
                            <!--  #endif -->
                            <!--  #ifdef  MP-WEIXIN -->
                            <text 
                            v-if="JSON.stringify(item) == JSON.stringify(userInfo.shipAddress)"
                            class="lg text-green cuIcon-roundcheckfill"></text>
                            <!--  #endif -->
                            
                        </view>

                        <view class="user-box flex-direction">
                            <view class="align-center text-xl">
                                <text class="text-bold text-color-3 margin-right-xs">{{item.name}}</text>
                                <text v-if="item.gender !== null" class="margin-right-xs">{{item.gender?'先生':'女士'}}</text>
                                <text class="">{{item.phone}}</text>
                            </view>
                            <view class="align-center">
                                <view 
                                v-if="item.tag"
                                class="cu-tag line-blue type-tag margin-right-xs">{{item.tag}}</view>
                                <text class="">{{item.address}}</text>
                            </view>
                        </view>
                    </view>

                    <view class="text-xxl">
                        <text 
                        @tap="editAddress(index)"
                        class="lg text-gray cuIcon-post margin-right-sm"></text>
                        <text 
                        @tap="deleteAddress(index)"
                        class="lg text-gray cuIcon-close"></text>
                    </view>

                </view>

            </view>
            <!-- 配送范围内店铺 E -->

            <!-- 配送范围外店铺 S -->
            <view class="flex-direction address-list">

                <view class="padding padding-bottom-xs text-color-6">
                    <text>以下地址超出配送范围</text>
                </view>
                
                <view 
                v-for="(item, index) in myAddress" :key="index"
                class="address-item padding bg-white justify-between align-center">
                    <view class="align-center">
                        <view class="flex-direction over-distance-box">
                            <view class="align-center text-lg">
                                <text class="text-bold text-color-3 margin-right-xs">{{item.name}}</text>
                                <text v-if="item.gender !== null" class="margin-right-xs">{{item.gender?'先生':'女士'}}</text>
                                <text class="">{{item.phone}}</text>
                            </view>
                            <view class="align-center">
                                <view 
                                v-if="item.tag"
                                class="cu-tag line-blue type-tag margin-right-xs">{{item.tag}}</view>
                                <text class="">{{item.address}}</text>
                            </view>
                        </view>
                    </view>

                    
                    <view class="text-xxl">
                        <text 
                        @tap="editAddress(index)"
                        class="lg text-gray cuIcon-post margin-right-sm"></text>
                        <text 
                        @tap="deleteAddress(index)"
                        class="lg text-gray cuIcon-close"></text>
                    </view>

                </view>

            </view>
            <!-- 配送范围外店铺 E -->
        </view>
        <!-- 数据加载成功 E -->

        <!-- 底部新增地址按钮 S -->
        <view 
        @tap="addAddress"
        class="add-address-btn-box bg-white justify-center align-center">
            <text class="lg text-color-blue-0 text-xxl cuIcon-roundadd margin-right-xs"></text>
            <text class="text-color-blue text-lg">新增收货地址</text>
        </view>
        <!-- 底部新增地址按钮 E -->

        <!-- 弹窗组件 -->
        <uni-popup ref="deletePopup" type="dialog">
            <uni-popup-dialog 
            message="成功消息" 
            :duration="2000" 
            :before-close="true" 
            :style="{display:'block'}"
            :title="deleteTips.title"
            :content="deleteTips.content"
            @close="close" 
            @confirm="confirm"></uni-popup-dialog>
        </uni-popup>
        <!-- 弹窗组件 -->
    </view>
</template>

<script>
    /**
     * @module choose_address 
     * @description 选择收货地址地址
     */

    import {mapState,mapMutations} from 'vuex';

    export default {
        name:'choose_address',
        data() {
            return {
                myAddress:[], // 用户的地址信息 在组件创建后获取
                deleteIndex: null, // 要删除的地址的索引值
                pageState: {
                    loading: true, // 数据加载中-true 加载完成-false
                },
                deleteTips:{
                    title:'删除地址',
                    content:'确定要删除地址'
                }
            }
        }
        ,
        computed:{
            ...mapState([
                'userInfo'
            ])
        }
        ,
        created() {
            
			// 获取我的地址数据
			// 模拟网络环境下请求我的地址数据

			try{
                
				let tmp = uni.getStorageSync('my_address');
				if(tmp) this.myAddress = JSON.parse(tmp);
                this.pageState.loading = false;
			}catch(e){
                console.log('获取缓存失败');
			}

			if(!this.myAddress || !this.myAddress.length){
				this.$http.get.address_data().then((res)=>{
					this.myAddress = res.my_address;
                    this.pageState.loading = false;

					uni.setStorage({
						key: 'my_address',
						data: JSON.stringify(res.my_address),
						success: function () {
							console.log('存储my_address成功');
						}
					});
				},(e)=>{
                    console.log('请求失败',e);
                    this.pageState.loading = false;
                    
				})
			}

        }
        ,
        methods:{
            ...mapMutations([
                'SAVE_SHIP_ADDRESS'
            ]),
            /**
             * 新增地址
             */
            addAddress(){
                uni.navigateTo({
                     url: this.$pages_path.add_address,
                     fail(e) {
                         console.log(e);
                     }
                });
            }
            ,
            /**
             * 编辑地址
             * @param {Number} index 当前地址在地址列表中的序号
             */
            editAddress(index){
                console.log('编辑地址',index);
                uni.navigateTo({
                     url: this.$pages_path.edit_address,
                     fail(e) {
                         console.log(e);
                     }
                });
            }
            ,
            /**
             * 删除地址
             * @param {Number} index 当前地址在地址列表中的序号
             */
            deleteAddress(index){
                console.log('删除地址',index);
                this.$refs.deletePopup.open();
                this.deleteIndex = index;
            }
            ,
            /**
             * 点击取消按钮触发
             * @param {Object} done
             */
            close(done){
                console.log('取消');
                // 将删除索引值重置为null
                this.deleteIndex = null;
                done()
            },
            /**
             * 点击确认按钮触发
             * @param {Object} done
             */
            confirm(done){
                console.log('确定');

                // 执行删除过程
                this.myAddress.splice(this.deleteIndex,1);
                this.deleteIndex = null;

                // 判断当前选择的收货地址是否在被删除
                if(!JSON.stringify(this.myAddress).includes(JSON.stringify(this.userInfo.shipAddress))){
                    this.SAVE_SHIP_ADDRESS(this.myAddress[0]);
                }

                // 更新本地存储
                uni.setStorage({
                    key: 'my_address',
                    data: JSON.stringify(this.myAddress),
                    success: function () {
                        console.log('success');
                    }
                });

                done()
            }
        }
    }
</script>

<style lang="scss" scoped>
    .choose-address-container{
        padding-bottom: 120rpx;
    }
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