<template>
    <view class="flex-direction padding-tb">
        <form @submit="addInvoice">
            
            <!-- 输入表单 -->
            <view class="form-list flex-direction">

                <!-- 单位、个人切换 -->
                <view 
                class="bg-white border-bottom border-color-e padding flex-sub align-center"
                >
                    <view class="text-color-3 text-bold margin-right-xs">
                        <text>类型</text>
                    </view>
                    <radio-group 
                    class="flex" 
                    @change="radioChange">
                        <view 
                        class="border border-color-c margin-lr-xs padding-tb-xs padding-lr border-radius-10"
                        :class="[index==curType?'border-color-blue text-blue':'']" 
                        v-for="(item,index) in radioItems" :key="index">
                            <view
                            v-show="false"
                            >
                                <radio 
                                :id="index+''" 
                                :value="index+''" 
                                :checked="index==curType"
                                ></radio>
                            </view>
                            <label class="label-2-text" :for="index+''">
                                <text>{{item}}</text>
                            </label>
                        </view>
                    </radio-group>
                </view>

                <!-- 抬头 -->
                <view 
                class="bg-white justify-between align-center border-bottom border-color-e padding flex-sub align-center"
                >
                    <view class="align-center flex-sub">
                        <view class="text-color-3 text-bold margin-right-xs">
                            <text>抬头</text>
                        </view>

                        <view class="flex-sub margin-right-xs">
                            <input 
                            class="flex flex-sub" 
                            placeholder="请填写准确的抬头名称" 
                            v-model="nameInput" 
                            />
                        </view>
                    
                    </view>
                    
                    <text 
                    v-show="nameInput"
                    @tap="clearInput('nameInput')"
                    class="lg text-gray cuIcon-roundclosefill text-xl"></text>

                </view>

                <view 
                v-if="curType==0"
                class="flex-direction">
                    <!-- 税号 -->
                    <view 
                    class="bg-white justify-between align-center border-bottom border-color-e padding flex-sub align-center"
                    >
                        <view class="align-center flex-sub">
                            <view class="text-color-3 text-bold margin-right-xs">
                                <text>税号</text>
                            </view>

                            <view class="flex-sub margin-right-xs">
                                <input 
                                class="flex flex-sub" 
                                placeholder="请填写「税号」或「社会信用代码」" 
                                v-model="taxidInput" 
                                />
                            </view>
                        
                        </view>
                        
                        <text 
                        v-show="nameInput"
                        @tap="clearInput('taxidInput')"
                        class="lg text-gray cuIcon-roundclosefill text-xl"></text>

                    </view>

                    <view class="padding text-xs text-color-9">
                        <text>可咨询公司财务部门获得「税号」或「社会信用代码」信息</text>
                    </view>
                </view>

            </view>

            <!-- 提交按钮 -->
            <view class="padding flex flex-direction">
                <button form-type="submit" class="cu-btn bg-green lg">保存</button>
            </view>
        </form>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                curType:0, // 当前类型索引值
                radioItems: ['单位','个人'],
                nameInput: '', // 抬头输入区内容
                taxidInput: '', // 税号输入区内容
            }
        },
        methods: {
            /**
             * 新增发票数据
             */
            addInvoice(e){
                console.log(e);
            }
            ,
			radioChange(e) {
				this.curType = e.detail.value
				console.log(this.curType)
				console.log(e.detail)
            }
            ,
            /**
             * 清除输入框中内容
             */
            clearInput(name){
                this[name] = '';
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>