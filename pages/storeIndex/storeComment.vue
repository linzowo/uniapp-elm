<template>
  <view class="flex-sub flex-direction bg-grey-f5">

    <!-- 顶部店铺评分栏 S -->
    <view class="align-center justify-around flex-sub text-color-6 padding-top-lg padding-bottom-xl bg-white margin-bottom-sm">
      <!-- 店铺评分 -->
      <text class="rating text-sl text-color-orange"
      >
        {{storeCommentData.rating.fixedShopScore}}
      </text>
      
      <!-- 店铺星级 -->
      <view class="flex-direction">
        <text class="margin-bottom-xs">商家评分</text>
        
        <!-- star S -->
        <view class="star-box star-size">
          <view class="star-bg">
            <image class="star-size" :src="$i_u.star_bg" mode="left"></image>
          </view>
          <view 
          class="star"
          :style="{width:parseInt(120 * (parseFloat(storeCommentData.rating.fixedShopScore).toFixed(1)/5)) + 'rpx'}"
          >
            <image 
            class="star-size" 
            :src="$i_u.star" 
            mode="left"
            ></image>
          </view>
        </view>
        <!-- star E -->
        
      </view>
      
      <view class="border-right border-color-e">
        <!-- 味道评分 -->
        <view class="flex-direction align-center padding-lr">
          <text class="text-xs margin-bottom-xs">味道</text>
          <text class="text-xxl">{{storeCommentData.rating.fixedTasteScore}}</text>
        </view>
        
        <!-- 包装评分 -->
        <view class="flex-direction align-center padding-lr">
          <text class="text-xs margin-bottom-xs">包装</text>
          <text class="text-xxl">{{storeCommentData.rating.fixedPackageScore}}</text>
        </view>
      </view>
      
      <!-- 配送评分 -->
      <view class="flex-direction align-cente padding-lr">
        <text class="text-xs margin-bottom-xs">配送</text>
        <text class="text-xxl">{{storeCommentData.rating.fixedRiderScore}}</text>
      </view>
    </view>
    <!-- 顶部店铺评分栏 E -->
    
    <!-- 用户评论区 S -->
    <view class="comment-content-box bg-white flex-direction">
      
      <!-- 评论标签 S -->
      <view class="comment-tag-list padding-sm flex-wrap">
        
        <view 
        @tap="switchComment(index)"
        class="comment-tag-item padding-tb-xs padding-lr-sm comment-tag-bg border-radius-6 text-sm"
        v-for="(item,index) in storeCommentData.tags"
        :key="index"
        :class="[
          index == pageState.commentTagCur ? 'cur' : '',
          item.unsatisfied ? 'bad' : ''
        ]"
        >
          <text>{{item.name}} {{item.count > 0 ? item.count : ''}}</text>
        </view>
        
      </view>
      <!-- 评论标签 E -->
      
      <!-- 查看有内容评价开关 S -->
      <view class="padding-tb-sm padding-lr border-top border-color-e align-center">
        <text 
        class="lg cuIcon-roundcheckfill margin-right-xs"
        :class="pageState.showHasContentCommentOnly ? 'icon-color-76d572' : 'icon-color-e8'"
        ></text>
        <text class="">只看有内容的评价</text>
      </view>
      <!-- 查看有内容评价开关 E -->
      
      <!-- 用户评论列表 S -->
      <view class="comment-list flex-direction">
        
        <view 
        v-for="(item,index) in commentInfoList"
        :key="index"
        class="comment-item border-top border-color-e padding-sm flex-sub"
        :class="foodsFilter(item.food_ratings)?'':'padding-bottom-xl'"
        >
          
          <!-- 用户头像 -->
          <view class="user-avatar-box margin-right round">
            <image 
            class="user-avatar"
            :src="item.avatar|userAvatarUrlFilter" 
            mode="widthFix"
            ></image>
          </view>
          
          <!-- 评论内容 -->
          <view class="comment-content flex-direction flex-sub">
            
            <view class="comment-content-head flex-direction margin-bottom-xs">
              
              <view class="justify-between margin-bottom-xs">
                <text>{{item.username}}</text>
                <text class="text-color-9 text-sm">{{item.rated_at}}</text>
              </view>
              
              <view class="align-center">
                
                <!-- star S -->
                <view class="star-box star-size margin-right-xs">
                  <view class="star-bg">
                    <image class="star-size" :src="$i_u.star_bg" mode="left"></image>
                  </view>
                  <view 
                  class="star"
                  :style="{
                    width:parseInt((120 * item.rating)/5) + 'rpx'
                  }"
                  >
                    <image 
                    class="star-size" 
                    :src="$i_u.star" 
                    mode="left"
                    ></image>
                  </view>
                </view>
                <!-- star E -->
                
                <text
                class="text-sm"
                :class="item.rating<5?'bad':'super-good'"
                >
                  {{item.rating|rating2text}}
                </text>
              </view>
              
            </view>
            
            <view class="comment-content-body flex-direction">
              <!-- 文本评论 -->
              <view class="comment-content-text margin-bottom-xs">
                <text>{{item.rating_text}}</text>
              </view>
              
              <!-- 商家回复 -->
              <view 
              v-if="item.reply"
              class="store-reply-box padding-sm text-sm margin-tb-sm border-radius-6">
                <text>商家回复：{{item.reply.content}}</text>
              </view>
              
              <!-- 图片列表 -->
              <view 
              v-if="item.order_images"
              class="comment-content-img-list flex-wrap flex-sub">
                <view 
                v-for="(ele,i) in item.order_images"
                :key="i"
                :style="{
                  height:item.order_images.length > 4 ? '196rpx' : '300rpx',
                  width:item.order_images.length > 4 ? '196rpx' : '300rpx'
                }"
                class="comment-content-img-item margin-right-xs margin-bottom-xs">
                  <image 
                  :src="ele.image_hash,(item.order_images.length > 4?'w_196':'w_300')|imgUrlFilter" 
                  mode="widthFix"></image>
                </view>
              </view>
              
              <!-- 单件商品点赞 -->
              <view 
              v-if="foodsFilter(item.food_ratings)"
              class="good-goods-tag-list align-center flex-wrap">
                <text class="lg text-gray cuIcon-appreciate"></text>
                <view 
                v-for="(ele,i) in foodsFilter(item.food_ratings)"
                :key="i"
                class="good-goods-tag-item padding-xs text-sm border-radius-6">
                  <text>{{ele.rate_name}}</text>
                </view>
              </view>
              
            </view>
            
          </view>
          
        </view>
        
      </view>
      
      <!-- 加载提示 S -->
      <view 
      class="list-end align-center justify-center">
        <view class="cu-load" :class="commentHasNext?'loading':'over'"></view>
      </view>
      <!-- 加载提示 E -->
      <!-- 用户评论列表 E -->
      
    </view>
    <!-- 用户评论区 E -->
						
  </view>
</template>

<script>

import {storeIndexMethodsMixin,filtersMixin} from "@/common/mixinMain.js";

export default {
  name:'storeComment',
  props:['storeCommentData','pageState','commentInfoList','commentHasNext'],
  mixins:[storeIndexMethodsMixin,filtersMixin],
  methods:{
    switchComment(index){
      this.$emit("switchComment",index);
    }
  }
}
</script>

<style lang="scss" scoped>
	@import url(./storeIndex.scss);
</style>