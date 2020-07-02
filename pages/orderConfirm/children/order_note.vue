<template>
    <view class="flex-direction">
        <form @submit="formSubmit">
            <view class="margin-top padding padding-bottom-xl bg-white">
                <textarea 
                name="orderNote"
                class="text-color-6 bg-grey-f9 border border-color-c border-radius-3 flex-sub padding-sm"
                maxlength="100"
                placeholder="填写额外对餐厅和骑士小哥备注的信息"
                :value="note?note:''"
                />
            </view>
            <view class="padding flex flex-direction">
                <button form-type="submit" class="cu-btn bg-green lg">确定</button>
            </view>
        </form>
    </view>
</template>

<script>
    /**
     * @module order_note
     * @description 订单备注编辑页
     */
    
    import {mapState,mapMutations} from 'vuex';
    export default {
        name:'order_note',
        data() {
            return {

            }
        },
        computed:{
            ...mapState([
                'note'
            ])
        }
        ,
        methods: {
            /**
             * 提交表单信息
             */
            formSubmit(e){
                // console.log(e);
                this.CONFIRM_NOTE(e.detail.value.orderNote);
                uni.navigateBack({
                     delta: 1
                });
            }
            ,
            ...mapMutations([
                'CONFIRM_NOTE'
            ])
        }
    }
</script>

<style lang="scss" scoped>
    
</style>