<template>
    <view class="flex-direction padding-tb">
        <view 
        @tap="chooseInvoice(null)"
        class="padding bg-white align-center">
            <view class="confirm-tag-box text-xxl margin-right-xs">
                
                <!--  #ifndef  MP-WEIXIN -->
                <text 
                v-show="invoice === null"
                class="lg text-green cuIcon-roundcheckfill"></text>
                <!--  #endif -->
                <!--  #ifdef  MP-WEIXIN -->
                <text 
                v-if="invoice === null"
                class="lg text-green cuIcon-roundcheckfill"></text>
                <!--  #endif -->
                
            </view>
            <text class="text-bold text-lg text-color-3">不需要发票</text>
        </view>

        <view 
        v-if="invoiceList.length"
        class="invoice-list flex-direction">
            
            <view class="padding-lr padding-top padding-bottom-xs text-color-6">
                <text>发票信息</text>
            </view>

            <view 
            v-for="(item, index) in invoiceList" :key="index"
            class="invoice-item bg-white padding justify-between">

                <view 
                @tap="chooseInvoice(index)"
                class="align-center flex-sub">
                    <view class="confirm-tag-box text-xxl margin-right-xs">
                        
                        <!--  #ifndef  MP-WEIXIN -->
                        <text 
                        v-show="JSON.stringify(invoice) == JSON.stringify(item)"
                        class="lg text-green cuIcon-roundcheckfill"></text>
                        <!--  #endif -->
                        <!--  #ifdef  MP-WEIXIN -->
                        <text 
                        v-if="JSON.stringify(invoice) == JSON.stringify(item)"
                        class="lg text-green cuIcon-roundcheckfill"></text>
                        <!--  #endif -->
                        
                    </view>

                    <!-- 单位 -->
                    <view 
                    v-if="item.type == '单位'"
                    class="invoice-company flex-direction">
                        <view class="align-center margin-bottom-xs">
                            <view class="cu-tag line-blue sm margin-right-xs">
                                <text>单位</text>
                            </view>
                            <text class="text-color-3 text-bold">{{item.name}}</text>
                        </view>
                        <text class="text-color-9">{{item.tax_id}}</text>
                    </view>

                    <!-- 个人 -->
                    <view 
                    v-if="item.type == '个人'"
                    class="invoice-person align-center">
                        <view class="cu-tag line-green sm margin-right-xs">
                            <text>个人</text>
                        </view>
                        <text class="text-color-3 text-bold">{{item.name}}</text>
                    </view>
                </view>

                
                <view class="text-xxl">
                    <text 
                    @tap="editInvoice(index)"
                    class="lg text-gray cuIcon-post margin-right-sm"></text>
                </view>

            </view>

        </view>

        <view 
        @tap="addInvoice"
        class="add-invoice-box justify-center bg-white align-center text-xl text-blue">
            <text class="lg cuIcon-roundadd margin-right-xs"></text>
            <text class="">新增发票信息</text>
        </view>
    </view>
</template>

<script>
    /**
     * @module choose_invoice
     * @description 选择发票模块
     */
    import {mapState,mapMutations} from 'vuex';

    export default {
        name:'choose_invoice',
        data() {
            return {
                invoiceList:[], // 发票数据列表
            }
        },
        computed:{
            ...mapState([
                'invoice'
            ])
        }
        ,
        created() {

            try{
                let tmp = uni.getStorageSync('invoice_list');
				if(tmp) this.invoiceList = JSON.parse(tmp);
			}catch(e){
                console.log('获取缓存失败');
                uni.setStorage({
                    key: 'invoice_list',
                    data: '[]',
                    success: function () {
                        console.log('success');
                    }
                });
            }
        },
        methods: {
            ...mapMutations([
                'CONFIRM_INVOICE'
            ])
            ,
            /**
             * 选择发票信息
             * @param {Number || null} index 发票的索引值或者null
             */
            chooseInvoice(index){

                if(index === null){
                    this.CONFIRM_INVOICE(null);
                    return;
                }
                
                this.CONFIRM_INVOICE(this.invoiceList[index]);

            }
            ,
            /**
             * 编辑当前发票信息
             * @param {Number} index 发票的索引值
             */
            editInvoice(index){
                uni.navigateTo({
                     url: this.$pages_path.edit_invoice + '?index=' + index,
                     fail(e) {
                         console.log(e);
                     }
                });
            }
            ,
            /**
             * 新增发票信息
             */
            addInvoice(){
                uni.navigateTo({
                     url: this.$pages_path.add_invoice,
                     fail(e) {
                         console.log(e);
                     }
                });
            }
        }
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