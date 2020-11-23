<template>
  <view
    class="store-base-info padding-lr-xl padding-top-xl flex-direction align-center flex-sub"
  >
    <!-- 店名 -->
    <view
      @tap="openPopup('storeInfoPopup')"
      class="store-name-box align-center flex-direction padding-lr-sm margin-bottom-xs"
    >
      <view class="align-end margin-bottom-xs">
        <text class="store-name text-cut text-bold text-xxl margin-right-xs">{{
          storeData.rst.name
        }}</text>
        <text class="lg text-color-3 cuIcon-playfill"></text>
      </view>
      <view class="text-xs text-color-6">
        <text class="margin-right-xs">评价{{ storeData.rst.rating }}</text>
        <text class="margin-right-xs"
          >月售{{ storeData.rst.recent_order_num }}</text
        >
        <text>商家配送约{{ storeData.rst.order_lead_time }}分钟</text>
      </view>
    </view>

    <!-- 红包 -->
    <view
      @tap="openPopup('redpackPopup')"
      class="red-packets-list justify-around margin-top-xs margin-bottom-sm"
    >
      <!-- 任意使用 -->
      <view
        class="red-packets-item red-packets-item1 padding-left-lg padding-right-xs align-center border-radius-3 justify-around"
      >
        <text class="text-price margin-right-xs text-bold text-lg">7</text>
        <view class="margin-right align-center text-xs">
          <text class="lg text-yellow cuIcon-crownfill margin-right-xs"></text>
          <text class="">无门槛</text>
        </view>
        <text class="text-xs">领取</text>
      </view>
      <!-- 满减红包 -->
      <view
        class="red-packets-item red-packets-item2 padding-left-lg padding-right-xs align-center border-radius-3"
      >
        <text class="text-price margin-right-xs text-bold text-lg">3</text>
        <view class="margin-right align-center text-xs">
          <text class="">满39元使用</text>
        </view>
        <text class="text-xs">领取</text>
      </view>
    </view>

    <!-- 优惠 -->
    <view
      @tap="openPopup('saleActPopup')"
      class="sale-box justify-between margin-bottom-sm"
    >
      <view class="sale-tag-list">
        <view
          v-for="item in 4"
          :key="item"
          class="sale-tag-item text-xs text-scale-9 padding-lr-xs"
        >
          30减20
        </view>
      </view>
      <view class="align-center text-xs text-gray">
        <text>9个优惠</text>
        <text class="lg cuIcon-triangledownfill"></text>
      </view>
    </view>

    <!-- 公告 -->
    <view class="notice-box justify-start text-xs text-gray">
      <text class="notice">公告：小龙虾全场特价抢购，快快下单吧，亲</text>
    </view>
  </view>
</template>

<script>
import {popupMixin} from '@/common/mixinMain.js'
export default {
  name:"storeInfo",
  props:['storeData'],
  mixins:[popupMixin]
};
</script>

<style lang="scss" scoped>
	@import url(./storeIndex.scss);
</style>
