<template>
	<view class="flex-direction">
		 <!-- 数据加载中 S -->
        <loading :loading="pageState.loading" :success="myAddress.length!==0"></loading>
        <!-- 数据加载中 E -->
		
		<scroll-view 
		v-if="!pageState.loading"
		scroll-y
		class="flex-direction address-list">
			
			<view 
			v-for="(item, index) in myAddress" :key="index"
			class="address-item padding bg-white justify-between align-center">
				<view class="align-center">
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

		</scroll-view>

        <!-- 底部新增地址按钮 S -->
		<view 
		@tap="addAddress"
		class="add-address-box justify-center bg-white align-center text-xl text-blue">
			<text class="lg cuIcon-roundadd margin-right-xs"></text>
			<text class="">新增地址</text>
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
    import {mapState,mapMutations} from 'vuex';

	export default {
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
		},
        computed:{
            ...mapState([
                'userInfo'
            ])
        }
		,
		onShow(){
			
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
            /**
             * 新增地址信息
             */
            addAddress(){
                uni.navigateTo({
                     url: this.$pages_path.add_address,
                     fail(e) {
                         console.log(e);
                     }
                });
            },
            /**
             * 编辑地址
             * @param {Number} index 当前地址在地址列表中的序号
             */
            editAddress(index){
                console.log('编辑地址',index);
                uni.navigateTo({
                     url: this.$pages_path.edit_address + '?index=' + index,
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

    .add-address-box{
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
		height: 100rpx;
		z-index: 99;
	}
	.address-list{
		height: calc(100vh - 100rpx - 44px - env(safe-area-inset-top));
	}
    .type-tag{
        height: 30rpx;
        padding: 5rpx;
    }
</style>
