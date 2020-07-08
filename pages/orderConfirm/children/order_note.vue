<template>
    <view class="flex-direction">
        <form @submit="formSubmit">
            <view class="margin-top padding bg-white">
                <textarea 
                name="orderNote"
                class="text-color-6 bg-grey-f9 border border-color-c border-radius-3 flex-sub padding-sm"
                maxlength="100"
                placeholder="填写额外对餐厅和骑士小哥备注的信息"
                :value="note?note:''"
                />

            </view>
                
            <!-- 可选标签区域 -->
            <view 
            v-if="optionalRemark.length"
            class="padding-lr padding-bottom bg-white">
                <!-- 标签列表 -->
                <view class="tag-list flex-wrap">
                    
                    <view 
                    v-for="(item, index) in optionalRemark" :key="index"
                    class="tag-item margin-right-sm margin-bottom-sm border-radius-10 border border-color-e">
                        
                        <view class="sub-tag-list">
                            <view 
                            v-for="(e, i) in item" :key="i"
                            @tap="chooseRemark(index,i)"
                            :class="[optionalRemarkCur[index].includes(i)?'bg-blue':'']"
                            class="sub-tag-item padding-tb-xs">
                                <text class="padding-lr-xs border-right border-color-e">{{e}}</text>
                            </view>
                        </view>

                    </view>

                </view>
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
                optionalRemark:[], // 可选备注选项数据
                optionalRemarkCur:[] , // 当前选中的备注标签
            }
        },
        computed:{
            ...mapState([
                'note'
            ])
        }
        ,
        created() {
            this.$http.get.remark_data().then(res=>{
                console.log(res);
                this.optionalRemark = res;
                this.optionalRemarkCur = Array(this.optionalRemark.length).fill([]);

            },
            e=>{
                console.log(e);
            })
        }
        ,
        methods: {
            chooseRemark(y,x){
                let index = this.optionalRemarkCur[y].indexOf(x);
                if(index != -1){
                    this.optionalRemarkCur[y].splice(index,1);
                    return;
                }

                this.$set(this.optionalRemarkCur,y,[].concat(this.optionalRemarkCur[y],x));
            }
            ,
            /**
             * 提交表单信息
             */
            formSubmit(e){
                // console.log(e);
                let optionalRemark = this.optionalRemarkCur.map((e,i)=>{
                    return e.map((item,index)=>{
                        return this.optionalRemark[i][item]
                    }).join(' ');
                }).join(' ');

                this.CONFIRM_NOTE(e.detail.value.orderNote + ' ' + optionalRemark);
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