<template>
  <view class="flex-sub flex-direction bg-grey-f5">

    <!-- 配送信息 -->
    <view class="margin-bottom bg-white padding flex-direction">
      <text class="text-bold text-color-0 margin-bottom-sm">配送信息</text>
      <view class="flex-direction">
        <text class="margin-bottom-xs"
          >由商家配送提供配送，约{{
            storeData.rst.order_lead_time
          }}分钟送达，距离{{ storeData.rst.distance_text }}</text
        >
        <text class="margin-bottom-sm"
          >配送费￥{{ storeData.rst.float_delivery_fee }}</text
        >
      </view>
    </view>

    <!-- 商家服务 -->
    <view
      class="margin-bottom bg-white padding flex-direction padding-bottom-xl"
    >
      <text class="text-bold text-color-0 margin-bottom-sm">商家服务</text>
      <view class="supports-list">
        <view
          v-for="(item, index) in storeData.rst.supports"
          :key="index"
          class="supports-item marging-bottom-xs align-center"
          :style="{ color: '#' + item.icon_color }"
        >
          <text
            class="supports-tag padding-lr-xs border border-color-9 text-xs margin-right-xs"
          >
            {{ item.icon_name }}
          </text>
          <text>{{ item.description }}</text>
        </view>
      </view>
    </view>

    <!-- 商家实景 -->
    <view class="margin-bottom bg-white padding flex-direction">
      <text class="text-bold text-color-0 margin-bottom-sm">商家实景</text>
      <view class="store-img-list">
        <view
          v-for="(item, index) in storeData.rst.albums"
          :key="index"
          class="store-img-box"
        >
          <image
            class="store-img"
            :src="item.photos[0].image_hash | imgUrlFilter"
            mode="widthFix"
          ></image>
          <text class="store-img-tips text-white"
            >{{ item.name }}{{ item.count }}张</text
          >
        </view>
      </view>
    </view>

    <!-- 商家信息 -->
    <view class="margin-bottom bg-white padding flex-direction">
      <text class="text-bold text-color-0 margin-bottom-sm">商家信息</text>
      <view class="padding-bottom-sm border-bottom border-color-e">
        <text>{{ storeData.rst.description }}</text>
      </view>

      <view class="padding-tb border-bottom border-color-e justify-between">
        <text class="text-bold text-color-3">品类</text>
        <text>{{ storeData.rst.flavors[0].name }}</text>
      </view>

      <view
        @tap="makePhoneCall(storeData.rst.id)"
        class="padding-tb border-bottom border-color-e justify-between"
      >
        <text class="text-bold text-color-3">商家电话</text>
        <view class="text-color-blue-0 align-center">
          <text class="lg cuIcon-phone margin-right-xs text-xl"></text>
          <text>联系商家</text>
        </view>
      </view>

      <view class="padding-tb border-bottom border-color-e justify-between">
        <text class="text-bold text-color-3">地址</text>
        <view class="store-address">
          <text class="text-right text-xs">{{ storeData.rst.address }}</text>
        </view>
      </view>

      <view class="padding-tb border-bottom border-color-e justify-between">
        <text class="text-bold text-color-3">营业时间</text>
        <view class="">
          <text>{{ storeData.rst.opening_hours[0].replace("/", "-") }}</text>
        </view>
      </view>
    </view>

    <!-- 营业资质 -->
    <view
      @tap="gotoCertificatesPage"
      class="margin-bottom bg-white padding flex-direction"
    >
      <text class="text-bold text-color-0">营业资质</text>
    </view>
  </view>
  <!-- 详细信息 E -->
</template>

<script>

import {storeIndexMethodsMixin} from "@/common/mixinMain.js";

export default {
  name:'storeInfoTab',
  props:['storeData'],
  methods:{},
  mixins:[storeIndexMethodsMixin]
};
</script>

<style lang="scss" scoped>
	@import url(./storeIndex.scss);
</style>
