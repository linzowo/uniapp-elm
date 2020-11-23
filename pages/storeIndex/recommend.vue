<template>
  <view>
    <!-- 滑动菜单 -->
    <view class="scroll-menu-column flex-direction">
      <text class="title padding-lr text-lg text-bold margin-bottom-sm"
        >商家推荐</text
      >

      <scroll-view class="scroll-view_H recommend-foods-list" scroll-x="true">
        <view
          v-for="(item, index) in recommendData"
          :key="item.item_id"
          class="scroll-view-item_H recommend-foods-item flex-direction border-radius-6 margin-left-sm"
        >
          <image
            @tap="showFoodTasteChoosePopup(item)"
            class="border-radius-6"
            :src="item.image_path, 'w_240' | imgUrlFilter"
            mode="widthFix"
          ></image>

          <view @tap="showGoodsInfoPopup(item)" class="flex-direction">
            <text class="recommend-foods-name text-cut">
              {{ item.name }}
            </text>
            <!-- 商品售卖情况 -->
            <view class="text-xs text-grey margin-bottom-xs">
              <text class="margin-right-xs">月售{{ item.month_sales }}</text>
              <text
                >好评率{{
                  item.satisfy_rate_text ? item.satisfy_rate_text : 0
                }}%</text
              >
            </view>

            <!-- 价格及添加购物车 -->
            <view class="justify-between align-center">
              <text class="text-price text-xl text-color-price">
                {{ item.price }}
              </text>
              <view class="align-center">
                <text
                  class="text-sm text-color-6 margin-right-xs"
                  v-if="
                    item.min_purchase > 1 && !shopCart.foodsList[item.item_id]
                  "
                  >{{ item.min_purchase }}份起售</text
                >
                <view class="add-remove-box align-center">
                  <text
                    v-if="shopCart.foodsList[item.item_id]"
                    @tap.stop.prevent="cutFromCart(item)"
                    class="lg add-btn-blue text-xxl cuIcon-rounddown"
                  ></text>

                  <text
                    v-if="shopCart.foodsList[item.item_id]"
                    class="text-cut goods-number"
                    >{{ shopCart.foodsList[item.item_id].count }}</text
                  >

                  <text
                    @tap.stop.prevent="
                      item.attrs.length
                        ? showFoodTasteChoosePopup(item)
                        : add2cart(item)
                    "
                    class="lg add-btn-blue text-xxl cuIcon-roundaddfill"
                  ></text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
// 引入购物车方法mixin
import {shopcartMethodsMixin,popupMixin} from "@/common/mixinMain.js";

export default {
  name:"recommend",
  data(){
    return{}
  },
  props:['recommendData','shopCart'],
  mixins:[shopcartMethodsMixin,popupMixin],
  methods:{
    showGoodsInfoPopup(item){
      this.$emit('showGoodsInfoPopup',item)
    }
  }
};
</script>

<style lang="scss" scoped>
	@import url(./storeIndex.scss);
</style>
