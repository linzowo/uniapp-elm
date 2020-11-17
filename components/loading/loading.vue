<template>
    <view class="loading-container flex-direction">
        <!-- 数据加载中 -->
        <view 
        v-if="loading"
        class="cu-load bg-white loading" 
        :style="{display:'block'}"
        ></view>

        <!-- 数据加载失败 -->
        <view 
        v-if="!loading && !success"
        class="cu-load bg-red erro"
        ></view>
    </view>
</template>

<script>
    /**
     * @module 数据加载提示模块
     * 存在两种状态
     * 1.数据加载中 显示loading
     * 2.数据加载完成但是加载失败 显示数据加载失败提示
     */
    export default {
        data() {
            return {

            }
        }
        ,
        props:{
            // 是否处于加载中，默认为加载状态 true 加载中 false加载完成
            loading: {
                type: Boolean,
                default: true
            },
            // 数据是否加载成功，默认为成功 true 成功 false 失败
            success: {
                type: Boolean,
                default: true
            }
        }
    }
</script>

<style lang="scss" scoped>
    
</style>