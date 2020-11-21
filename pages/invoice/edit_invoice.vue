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
                    @change="radioChange"
                    name="type"
                    >
                        <view 
                        class="border border-color-c margin-lr-xs padding-tb-xs padding-lr border-radius-10"
                        :class="[index==curType?'border-color-blue text-blue':'']" 
                        v-for="(item,index) in radioItems" :key="index">
                        
                            <!--  #ifndef  MP-WEIXIN -->
                            <view v-show="false">
                            <!--  #endif -->
                            <!--  #ifdef  MP-WEIXIN -->
                            <view v-if="false">
                            <!--  #endif -->
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
                            maxlength="20" 
                            v-model="nameInput" 
                            name="name"
                            />
                        </view>
                    
                    </view>
                    
                    <!--  #ifndef  MP-WEIXIN -->
                    <text 
                    v-show="nameInput"
                    @tap="clearInput('nameInput')"
                    class="lg text-gray cuIcon-roundclosefill text-xl"></text>
                    <!--  #endif -->
                    <!--  #ifdef  MP-WEIXIN -->
                    <text 
                    v-if="nameInput"
                    @tap="clearInput('nameInput')"
                    class="lg text-gray cuIcon-roundclosefill text-xl"></text>
                    <!--  #endif -->
                    

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
                                name="tax_id"
                                />
                            </view>
                        
                        </view>
                        
                        <!--  #ifndef  MP-WEIXIN -->
                        <text 
                        v-show="taxidInput"
                        @tap="clearInput('taxidInput')"
                        class="lg text-gray cuIcon-roundclosefill text-xl"></text>
                        <!--  #endif -->
                        <!--  #ifdef  MP-WEIXIN -->
                        <text 
                        v-if="taxidInput"
                        @tap="clearInput('taxidInput')"
                        class="lg text-gray cuIcon-roundclosefill text-xl"></text>
                        <!--  #endif -->
                        

                    </view>

                    <view class="padding text-xs text-color-9">
                        <text>可咨询公司财务部门获得「税号」或「社会信用代码」信息</text>
                    </view>
                </view>

            </view>

            <!-- 提交按钮 -->
            <view class="padding flex justify-around">
                <button @click="deleteInvoice" class="cu-btn bg-red lg flex-sub margin-lr-xs">删除</button>
                <button form-type="submit" class="cu-btn bg-green lg flex-sub margin-lr-xs">保存</button>
            </view>
        </form>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                invoice:null, // 当前要编辑的发票信息
                invoiceList:null, // 发票列表
                invoiceIndex:null, // 当前要编辑的发票信息的索引值
                curType:0, // 当前类型索引值
                radioItems: ['单位','个人'],
                nameInput: '', // 抬头输入区内容
                taxidInput: '', // 税号输入区内容
            }
        },
        onLoad(option){
            this.invoiceIndex = option.index;
        }
        ,
        created() {
            
            try{
                let tmp = uni.getStorageSync('invoice_list');
				if(tmp) this.invoiceList = JSON.parse(tmp);
            }catch(e){
                uni.showModal({
                    title: '提示',
                    content: '获取发票数据失败',
                    success: function (res) {
                        if (res.confirm) {
                            console.log('用户点击确定');
                        } else if (res.cancel) {
                            console.log('用户点击取消');
                        }

                        uni.navigateBack({
                             delta: 1
                        });
                    }
                });
            }

            
            this.invoice = this.invoiceList[this.invoiceIndex];
            this.curType = this.radioItems.findIndex((ele)=>{
                return this.invoice.type == ele;
            });
            
            this.nameInput = this.invoice.name;
            this.taxidInput = this.invoice.tax_id;
        }
        ,
        methods:{
            /**
             * 删除当前的发票信息
             */
            deleteInvoice(){
                this.invoiceList.splice(this.invoiceIndex,1);
                try {
                    uni.setStorageSync('invoice_list', JSON.stringify(this.invoiceList))
                    uni.navigateTo({
                         url: this.$pages_path.choose_invoice,
                         fail(e) {
                             console.log(e);
                         }
                    });
                } catch (e) {
                    uni.showToast({
                        title: '删除失败，请重试',
                        duration: 2000,
                        icon:'none'
                    });
                }
            }
            ,
            /**
             * 新增发票数据
             */
            addInvoice(e){
                
                // 检查输入信息是否合法
                let invoice = e.detail.value;

                // 抬头超过限度
                if(invoice.name.length > 20 || !invoice.name.length){
                    uni.showToast({
                        title: '抬头不符合规范请填写正确抬头',
                        duration: 2000,
                        icon: 'none'
                    });

                    return;
                }

                // 税号不符合规范
                if(!/^[0-9a-zA-Z]*$/.test(invoice.tax_id) || invoice.tax_id==''){
                    uni.showToast({
                        title: '税号不符合规范请重新填写',
                        duration: 2000,
                        icon:'none'
                    });
                    return;
                }

                invoice.type = this.radioItems[invoice.type];
                invoice.id = this.invoiceList[this.invoiceIndex].id;

                this.invoiceList[this.invoiceIndex] = invoice;

                try {
                    uni.setStorageSync('invoice_list', JSON.stringify(this.invoiceList))
                    uni.navigateTo({
                         url: this.$pages_path.choose_invoice,
                         fail(e) {
                             console.log(e);
                         }
                    });
                } catch (e) {
                    uni.showToast({
                        title: '保存失败，请重试',
                        duration: 2000,
                        icon:'none'
                    });
                }

            }
            ,
			radioChange(e) {
				this.curType = e.detail.value
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