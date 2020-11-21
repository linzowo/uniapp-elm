<template>
	<view class="add-address-container flex-direction">
		<!-- 表单区域 E -->
		<!--  #ifndef  MP-WEIXIN -->
		<view 
		v-show="!pageState.searchShow"
		class="from-box flex-direction">
		<!--  #endif -->
		<!--  #ifdef  MP-WEIXIN -->
		<view 
		v-if="!pageState.searchShow"
		class="from-box flex-direction">
		<!--  #endif -->
			<form class="from-box" @submit="formSubmit">
				<view class="cu-form-group">
					<view class="title">联系人</view>
					<input placeholder="姓名" name="name" type="text" v-model="formData.name">
				</view>
				<view class="cu-form-group justify-start">
					<view class="title"></view>
					<button 
					@tap="tagTap('gender',1)"
					:class="[formData.gender == 1?'btn-bg-tag':'bg-white']"
					class='cu-btn shadow'>先生</button>
					<button 
					@tap="tagTap('gender',0)"
					:class="[formData.gender == 0?'btn-bg-tag':'bg-white']"
					class='cu-btn shadow'>女士</button>
					
					<radio-group name="gender" class="form-display" v-model="formData.gender">
						<label>
							<radio value="1" :checked="formData.gender == 1" /><text>男</text>
						</label>
						<label>
							<radio value="0" :checked="formData.gender == 0" /><text>女</text>
						</label>
					</radio-group>
				</view>
				<view class="cu-form-group">
					<view class="title">电话</view>
					<input placeholder="手机号码" name="phone" type="number" v-model="formData.phone">
				</view>
				<view class="cu-form-group" @tap="chooseAddress">
					<view class="title">地址</view>
					<text 
					:class="[formData.address.position_address?'':'text-color-9']"
					class="placeholder flex flex-sub">
						{{formData.address.position_address?formData.address.position_address:'小区/写字楼/学校等'}}
					</text>
					<text class="lg text-gray" :class="'cuIcon-right'"></text>
					<input type="text" name="address" v-model="formData.address.position_address" class="form-display" />
				</view>
				<view class="cu-form-group">
					<view class="title">门牌号</view>
					<input placeholder="10号楼5层501室222" name="addressInfo" v-model="formData.addressInfo">
					<text class='cuIcon-edit'></text>
				</view>
				<view class="cu-form-group justify-start">
					<view class="title">标签</view>
					<button 
					@tap="tagTap('tag',0)"
					:class="[formData.tag === '家'?'btn-bg-tag':'bg-white']"
					class='cu-btn shadow'>家</button>
					<button 
					@tap="tagTap('tag',1)"
					:class="[formData.tag == '学校'?'btn-bg-tag':'bg-white']"
					class='cu-btn shadow'>学校</button>
					<button 
					@tap="tagTap('tag',2)"
					:class="[formData.tag == '公司'?'btn-bg-tag':'bg-white']"
					class='cu-btn shadow'>公司</button>
					
					<radio-group name="tag" class="form-display" v-model="formData.tag">
						<label>
							<radio value="家" :checked="formData.tag === '家'" /><text>家</text>
						</label>
						<label>
							<radio value="学校" :checked="formData.tag === '学校'" /><text>学校</text>
						</label>
						<label>
							<radio value="公司" :checked="formData.tag === '公司'" /><text>公司</text>
						</label>
					</radio-group>
				</view>
				
				<view class="padding flex flex-direction">
					<button 
					form-type="submit"
					class="cu-btn btn-bg-green lg padding text-bold text-xl">确定</button>
				</view>
			</form>
				
		</view>
		<!-- 表单区域 S -->
		
		<!-- 地址搜索区 s -->
		<!--  #ifndef  MP-WEIXIN -->
		<view 
		v-show="pageState.searchShow"
		class="search-address flex-direction flex-sub">
		<!--  #endif -->
		<!--  #ifdef  MP-WEIXIN -->
		<view 
		v-if="pageState.searchShow"
		class="search-address flex-direction flex-sub">
		<!--  #endif -->
			<view class="cu-bar search bg-white">
				<view class="search-form round">
					<text class="cuIcon-search"></text>
					<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="请输入小区/写字楼/学校等" confirm-type="search">
				</view>
				<view class="action">
					<button class="cu-btn bg-blue-base shadow-blur round">搜索</button>
				</view>
			</view>
			
			<!-- 搜索结果列表 S -->
			<view class="search-list flex-direction">
				<view 
				class="search-item flex-direction bg-white padding-sm border-bottom border-color-e"
				v-for="(item,i) in aroundAddList"
				:key="i"
				@tap="changeAddress(item)"
				>
					<text class="add-name text-lg">{{item.position_name}}</text>
					<text class="add-info text-color-9 text-df">{{item.position_address}}</text>
				</view>
			</view>
			<!-- 搜索结果列表 E -->
			
		</view>
		<!-- 地址搜索区 E -->
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formData:{
					name:null,
					gender:null,
					phone:null,
					address:{},
					addressInfo:null, // 门牌号
					tag:null
				},
				pageState:{
					searchShow:false
				},
				aroundAddList:null, // 周边可用的默认地址
				my_address: [], // 我的地址
			}
		},
		created() {
			// 获取周边默认地址
			// 模拟网络请求
			this.$http.get.address_data().then((res)=>{
				this.aroundAddList = res.search_res;
			},(e)=>{
				console.log('请求失败',e);
			})

			try{
				let tmp = uni.getStorageSync('my_address');
				if(tmp) this.my_address = JSON.parse(tmp);	
			}catch(e){
				console.log('获取缓存失败');
			}
			
		}
		,
		methods:{
			/**
			 * 选择收货地址
			 */
			chooseAddress(){
				this.$utils.log('chooseAddress','选择收货地址');
				// 跳转至选择收货地址页面 或者 显示搜索地址页面
				// uni.navigateTo({
				// 	url:'../file/file'
				// })
				this.pageState.searchShow = true;
			},
			/**
			 * 改变当前选择的地址选择
			 * @param {Object} address 当前选择的地址内容 包括地点名 详细信息 距离等
			 */
			changeAddress(address){
				this.$utils.log('changeAddress','改变新的收货地址');
				this.formData.address = address;
				this.pageState.searchShow = false;
			},
			/**
			 * 用户选择标签
			 * @param {String} type 用户点击选择的类型 
			 * @param {Number} val 用户选择是哪个选项
			 */
			tagTap(type,val){
				let tagType = ['家','学校','公司'];
				let oldVal = this.formData[type];
				
				if(type == 'gender'){
					if(val == oldVal) return;
					
					this.formData[type] = val;
				}
				
				if(type == 'tag'){
					
					if(val == oldVal){
						this.formData[type] = null;
						return;
					}
					
					this.formData[type] = tagType[val];
				}
			},
			/**
			 * 用户准备提交表单数据
			 */
			formSubmit(e){
				console.log(e.detail.value);
				// 检查姓名
				if(!this.formData.name){
					uni.showToast({
						title:'请输入联系人',
						icon:'none'
					})
					return;
				}
				
				// 检查性别 可以不检查 不重要
				
				// 检查手机
				if(!this.formData.phone || !/^1[345789]\d{9}$/.test(this.formData.phone)){
					uni.showToast({
						title:'请输入正确的手机号',
						icon:'none'
					})
					return;
				}
				// 检查地址
				if(!this.formData.address){
					uni.showToast({
						title:'请输入正确小区/写字楼/学校等信息',
						icon:'none'
					})
					return;
				}
				// 检查门牌号 可以不检查 不重要
				
				// 检查标签 可以不检查 不重要
				
				// 以上检查都通过表示输入合法 存储用户数据
				// 在联网环境下应该发起存储数据请求，当返回成功结果后更新本地数据
				// 更新本地数据有两种模式，一是修改已经缓存到本地的数据
				// 二是发起地址数据请求再次获取最新数据
				console.log('存储数据’');

				this.my_address.push({
						name:this.formData.name,
						gender:this.formData.gender,
						phone:this.formData.phone,
						address:this.formData.address.position_address + this.formData.addressInfo,
						position_name:this.formData.address.position_name,
						tag:this.formData.tag
				});
				
				uni.setStorage({
					key: 'my_address',
					data: JSON.stringify(this.my_address),
					success: function () {
						console.log('success');
					}
				});
				
				// 返回收货地址选择页
				if(getCurrentPages().length < 3){
					uni.redirectTo({
						url:'/pages/address/address'
					});
				}else{
					uni.navigateBack({
						delta: 1
					});
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.add-address-container{}
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
	.title{
		font-weight: 600;
	}
	.from-box{
		width: 750rpx;
	}
	.cu-form-group{
		flex: 1;
	}
	.cu-form-group .cu-btn{
		width: 136rpx;
		margin: 0 10rpx;
	}
	.form-display{
		display: none;
	}
</style>
