<template>
  <view class="store-index-nav">
    <view class="store-cover-bg-box">
      <image 
      class="store-cover-bg"
      :src="storeData.rst.shop_sign.image_hash,'w_750'|imgUrlFilter"
      mode="widthFix"></image>
    </view>
    <view class="store-cover-box">
      <image 
      class="store-cover"
      :src="storeData.rst.image_path|imgUrlFilter" 
      mode="widthFix"></image>
    </view>
    <text 
    @tap="goBack"
    class="nav-back-btn lg text-white cuIcon-back text-xxl padding-xs"></text>
  </view>
</template>

<script>
export default {
  name:'storeIndexNav',
  props: ['storeData'],
  methods:{
    goBack(){
      this.$emit('goBack')
    }
  }
}
</script>

<style lang="scss" scoped>
	@import url(./storeIndex.scss);
</style>