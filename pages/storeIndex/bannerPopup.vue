<template>
  
  <view 
  v-if="pageState.showBannercontent"
  :style="{paddingBottom:'100rpx'}"
  class="banner-content-box flex-direction">
    
    <!-- nav S -->
    <view class="store-index-nav">
      <view class="store-cover-bg-box">
        <image 
        class="store-cover-bg"
        :src="storeData.rst.shop_sign.image_hash,'w_750'|imgUrlFilter"
        mode="widthFix"></image>
      </view>
      <text 
      @tap="controlBannerPage(false)"
      class="nav-back-btn lg text-white cuIcon-back text-xxl padding-xs"></text>
    </view>
    <!-- nav E -->
    
    <view class="banner-list flex-wrap flex-sub padding-tb">
      
      <view 
      v-for="(item,index) in storeData.recommend[0].items"
      :key="index"
      class="banner-item flex-direction border-radius-6 margin-left-sm margin-bottom-sm"
      >
        <image 
        class="border-radius-6"
        :src="item.image_path,'w_240'|imgUrlFilter" 
        mode="widthFix"
        ></image>
        <text 
        class="recommend-foods-name text-cut"
        >
        {{item.name}}
        </text>
        <!-- 商品售卖情况 -->
        <view class="text-xs text-grey margin-bottom-xs">
          <text class="margin-right-xs">月售{{item.month_sales}}</text>
          <text>好评率{{item.satisfy_rate_text?item.satisfy_rate_text:0}}%</text>
        </view>
        
        <!-- 价格及添加购物车 -->
        <view class="justify-between align-center">
          <text 
          class="text-price text-xl text-color-price"
          >
          {{item.price}}
          </text>
          <view class="align-center">
            <text
            class="text-sm text-color-6 margin-right-xs"
            v-if="item.min_purchase>1&&!shopCart.foodsList[item.item_id]"
            >{{item.min_purchase}}份起售</text>
            <view class="add-remove-box align-center">
              <text 
              v-if="shopCart.foodsList[item.item_id]"
              @tap="cutFromCart(item)"
              class="lg add-btn-blue text-xxl cuIcon-rounddown"></text>
              
              <text 
              v-if="shopCart.foodsList[item.item_id]"
              class="text-cut goods-number"
              >{{shopCart.foodsList[item.item_id].count}}</text>
              
              <text 
              @tap="item.attrs.length?showFoodTasteChoosePopup(item):add2cart(item)"
              class="lg add-btn-blue text-xxl cuIcon-roundaddfill"
              ></text>
            </view>
          </view>
        </view>
      </view>

    </view>
    
    <!-- 加载提示 S -->
    <view 
    class="list-end align-center justify-center">
      <view class="cu-load" :class="bannerDataHasNext?'loading':'over'"></view>
    </view>
    <!-- 加载提示 E -->
    
    
  </view>
</template>

<script>
export default {
  name:"bannerPopup",
  props:['pageState','storeData','shopCart','bannerDataHasNext'],
  methods:{
    add2cart(item){
      this.$emit('add2cart',item);
    },
    showFoodTasteChoosePopup(item){
      console.log(item);
      this.$emit('showFoodTasteChoosePopup',item);
    },
    cutFromCart(item){
      this.$emit('cutFromCart',item);
    },
    controlBannerPage(status){
      this.$emit('controlBannerPage',status)
    }
  }
}
</script>

<style lang="scss" scoped>
	@import url(./storeIndex.scss);
</style>