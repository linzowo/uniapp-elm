<template>
  <view
  @tap="shopCart.count ? showShopCartPopup() : ''"
  class="shopping-cart-box justify-between align-center"
  >

        <!-- 
				 存在两种状态
				 1.无商品状态
				 2.有商品状态
				 -->

    <!-- 节省金额提示 S -->

    <!--  #ifndef  MP-WEIXIN -->
    <view
      v-show="shopCartPriceCount.save_money && !pageState.shopCartOpenState"
      class="save-money-tips flex-sub align-center justify-center text-xs text-color-3"
    >
      <!--  #endif -->
      <!--  #ifdef  MP-WEIXIN -->
      <view
        v-if="shopCartPriceCount.save_money && !pageState.shopCartOpenState"
        class="save-money-tips flex-sub align-center justify-center text-xs text-color-3"
      >
        <!--  #endif -->

        <text>已减{{ shopCartPriceCount.save_money }}元</text>
      </view>
      <!-- 节省金额提示 E -->

      <!-- 购物车图标 -->
      <view
        class="shopping-cart-icon-box round border border-xl align-center justify-center"
        :style="{ backgroundColor: shopCart.count ? '' : '#363636' }"
      >
        <text
          class="lg text-xxl cuIcon-cartfill"
          :class="shopCart.count ? 'text-white' : 'text-color-6'"
        ></text>

        <!--  #ifndef  MP-WEIXIN -->
        <view v-show="shopCart.count" class="cu-tag badge">
          <!--  #endif -->
          <!--  #ifdef  MP-WEIXIN -->
          <view v-if="shopCart.count" class="cu-tag badge">
            <!--  #endif -->
            {{ shopCart.count }}</view
          >
        </view>

        <!-- 选购商品提示 -->
        <view
          class="shopping-cart-tips-box flex-direction text-scale-9"
          :class="'text-color-9'"
        >
          <view v-if="shopCart.count" class="align-center">
            <text
              class="text-price text-bold text-white text-xl margin-right"
              >{{ shopCartPriceCount.price }}</text
            >
            <text class="text-price delete-line text-color-9">{{
              shopCartPriceCount.origin_price
            }}</text>
          </view>

          <text v-if="!shopCart.count" class="text-lg">
            未选购商品
          </text>

          <text class="text-xs"
            >另需配送费{{ parseInt(storeData.rst.float_delivery_fee) }}元</text
          >
        </view>

        <!-- 结算按钮 -->
        <view
          @tap.stop.prevent="
            shopCartPriceCount.price >= storeData.rst.float_minimum_order_amount
              ? gotoPayPage()
              : ''
          "
          class="shopping-cart-pay-btn-box text-white align-center justify-center"
          :style="{
            backgroundColor:
              shopCartPriceCount.price >=
              storeData.rst.float_minimum_order_amount
                ? ''
                : '#535356',
          }"
        >
          <!--  #ifndef  MP-WEIXIN -->
          <text
            v-show="
              shopCartPriceCount.price >=
                storeData.rst.float_minimum_order_amount
            "
            class="text-lg"
            >去结算</text
          >

          <text
            v-show="
              shopCartPriceCount.price <
                storeData.rst.float_minimum_order_amount
            "
            class="text-lg"
            >{{ shopCartPriceCount.price ? "差" : "" }}¥{{
              parseInt(
                storeData.rst.float_minimum_order_amount -
                  shopCartPriceCount.price
              )
            }}起送</text
          >
        </view>
        <!--  #endif -->
        <!--  #ifdef  MP-WEIXIN -->
        <text
          v-if="
            shopCartPriceCount.price >= storeData.rst.float_minimum_order_amount
          "
          class="text-lg"
          >去结算</text
        >

        <text
          v-if="
            shopCartPriceCount.price < storeData.rst.float_minimum_order_amount
          "
          class="text-lg"
          >{{ shopCartPriceCount.price ? "差" : "" }}¥{{
            parseInt(
              storeData.rst.float_minimum_order_amount -
                shopCartPriceCount.price
            )
          }}起送</text
        >
      </view>
      <!--  #endif -->
    </view>
  </view>
</template>

<script>

	// 引入购物车mixin
import {shopcartMethodsMixin,popupMixin} from "@/common/mixinMain.js";

export default {
  name:"bottomShopcart",
  props:['shopCart','pageState','storeData'],
  mixins:[shopcartMethodsMixin,popupMixin]
};
</script>

<style lang="scss" scoped>
	@import url(./storeIndex.scss);
</style>
