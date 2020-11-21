<template>
  <view class="city-container flex-direction">
    <!-- 搜索栏 S -->
    <view
      class="cu-bar search bg-white padding-lr-sm mbg-gradual-blue search-box"
      :style="{ top: systemInfo.windowTop + 'px' }"
    >
      <view class="search-form round">
        <text class="cuIcon-search"></text>
        <input
          @focus="InputFocus"
          @blur="InputBlur"
          @input="InputEnter"
          type="text"
          placeholder="输入城市名或者拼音"
          confirm-type="search"
        />
      </view>
    </view>
    <!-- 搜索栏 E -->

    <view
      class="indexes flex-direction"
      :style="{ top: searchBoxInfo.bottom + 'px' }"
    >
      <!-- 搜索列表区域 S -->
      <!-- v-show="!inputText" -->
      <view class="flex-sub" v-for="(value, key) in showSearchList" :key="key">
        <view
          :class="'indexItem-' + key"
          :id="'indexes-' + key"
          :data-index="key"
          class="flex-direction flex-sub"
        >
          <view class="cu-list no-padding flex-direction">
            <view
              class="cu-item border-top border-color-e"
              @tap="changeCity(value)"
            >
              <view class="city-name padding bg-white flex-sub">
                <text class="text-color-3">{{ value }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 搜索数据加载中显示加载图标 -->
      <!-- loading S -->
      
      <!--  #ifndef  MP-WEIXIN -->
      <view
          v-show="searchLoading"
          :style="{ display: 'block' }"
          class="cu-load bg-white loading"
        ></view>
      <!--  #endif -->
      <!--  #ifdef  MP-WEIXIN -->
      <view
          v-if="searchLoading"
          :style="{ display: 'block' }"
          class="cu-load bg-white loading"
        ></view>
      <!--  #endif -->
      
      <!-- loading E -->

      <!-- 无结果 -->
      <!--  #ifndef  MP-WEIXIN -->
      <view
        v-show="!searchList && inputText"
        class="search-no bg-white flex-direction align-center"
      >
      <!--  #endif -->
      <!--  #ifdef  MP-WEIXIN -->
      <view
        v-if="!searchList && inputText"
        class="search-no bg-white flex-direction align-center"
      >
      <!--  #endif -->
      
        <text class="text-lg text-color-6">没有找到相关城市</text>
      </view>
      <!-- 搜索列表区域 E -->

      <!-- 当前城市区域 S -->
      <view class="current-city padding-top-xs flex-direction">
        <text class="padding-lr padding-tb-xs text-color-6">当前定位城市</text>
        <view class="city-name padding bg-white">
          <text class="text-color-3">{{ userInfo.currentCity }}</text>
        </view>
      </view>
      <!-- 当前城市区域 E -->

      <!-- 城市列表区域 S -->
      <!-- v-show="!inputText" -->
      <view class="flex-sub" v-for="(value, key, index) in newList" :key="key">
        <view
          :class="'indexItem-' + key"
          :id="'indexes-' + key"
          :data-index="key"
          class="flex-direction flex-sub"
        >
          <view class="padding">{{ key }}</view>

          <view class="cu-list no-padding flex-direction">
            <view
              class="cu-item border-top border-color-e"
              v-for="(cityName, sub, i) in value"
              :key="sub"
              @tap="changeCity(cityName)"
            >
              <view class="city-name padding bg-white flex-sub">
                <text class="text-color-3">{{ cityName }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>
      <!-- 城市列表区域 E -->

      <!-- 分页加载中显示加载图标 -->
      <!-- loading S -->
      <view
        v-show="loading"
        :style="{ display: 'block' }"
        class="cu-load bg-white loading"
      ></view>
      <!-- loading E -->
    </view>

    <!-- 侧边bar S -->
    <view class="indexBar" :style="[{ height: 'calc(100vh - ' + 80 + 'px)' }]">
      <view class="indexBar-box">
        <view
          class="indexBar-item"
          v-for="(item, index) in listKey"
          :key="index"
          :id="item"
          @touchstart="getCur"
          @touchend="setCur"
        >
          <text>{{ item }}</text>
        </view>
      </view>
    </view>
    <!-- 侧边bar E -->
  </view>
</template>

<script>
/**
 * TODO: 搜索功能采用覆盖式，不再采用隐藏式优化执行效果
 */

import { pinyin } from "@/utils/py.js";
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      inputText: "", // 输入框文本
      StatusBar: this.StatusBar,
      CustomBar: this.CustomBar,
      listCurID: "",
      list: {},
      listKey: [],
      newList: {},
      searchList: [], // 搜索结果列表
      showSearchList: [], // 展示搜索结果列表
      searchTimer: null, // 用来控制搜索结果的定时器id
      searchLoading: false, // 搜索结果加载中
      systemInfo: {},
      searchBoxInfo: {},
      oldScroll: 0,
      loading: true, // 数据加载中
    };
  },
  onPageScroll(e) {
    // 存储页面滚动距离用于定位元素
    this.oldScroll = e.scrollTop;
  },
  onLoad() {
    console.log(this.list);
    try {
      let tmp = uni.getStorageSync("city_data");
      if (tmp) this.list = JSON.parse(tmp);
      this.listKey = Object.keys(this.list);
    } catch (e) {
      this.list = {};
    }

    // 本地没有数据向网络请求数据
    if (!this.list || this._.isEmpty(this.list)) {
      this.$http.get.city_data().then(
        (res) => {
          this.list = res;
          this.listKey = Object.keys(this.list);

          uni.setStorage({
            key: "city_data",
            data: JSON.stringify(res),
            success: function() {
              console.log("存储index_enter_data成功");
            },
          });
        },
        (e) => {
          console.log("请求失败");
        }
      );
    }
  },
  mounted() {
    this.searchBoxInfo = this.$utils.getElementInfo(".search-box");
    // console.log(this.searchBoxInfo);

    uni.getSystemInfo({
      success(e) {
        // console.log(e);
        this.systemInfo = e;
      },
    });
  },
  watch: {
    list(n) {
      if (!this._.isEmpty(n)) {
        this.getList();
      }
    },
    searchList(n) {
      // console.log(n);
      this.getSearchList();
    },
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  methods: {
    /**
     * 搜索栏获取焦点
     * @param {Object} e
     */
    InputFocus(e) {},
    /**
     * 搜索栏失去焦点
     * @param {Object} e
     */
    InputBlur(e) {},
    /**
     * 搜索栏输入
     * @param {Object} e
     */
    InputEnter: _.debounce(function(e) {
      // if(!e.detail.value) return this.searchList = [];
      // this.searchList = ["安达市", "安多县", "安福县", "安国市", "安化县", "安吉县", "安康市", "安龙县", "安陆市", "安宁市", "安平县", "安庆市", "安丘市", "安仁县", "安塞区", "安顺市", "安图县", "安溪县", "安乡县", "安新县", "安阳市", "安阳县", "安义县", "安远县", "安岳县", "安泽县", "北安市", "成安县", "淳安县", "大安市", "达尔罕茂明安联合旗", "大兴安岭地区", "德安县", "定安县", "东安县", "都安瑶族自治县", "福安市", "高安市", "公安县", "固安县", "广安市", "海安县", "红安县", "华安县", "淮安市", "怀安县", "惠安县", "集安市", "吉安县", "江安县", "靖安县", "积石山保安族东乡族撒拉族自治县", "来安县", "乐安县", "六安市", "隆安县", "南安市", "宁安市", "农安县", "磐安县", "蓬安县", "普安县", "迁安市", "乾安县", "秦安县", "庆安县", "融安县", "瑞安市", "泰安市", "台安县", "万安县", "文安县", "瓮安县", "武安市", "西安市", "新安县", "兴安盟", "兴安县", "雅安市", "延安市", "姚安县", "依安县", "永安市", "远安县", "诏安县", "镇安县", "正安县"];
      this.inputText = e.detail.value.toLowerCase();

      if (!this.inputText) return (this.searchList = []);

      // 输入包含中文和字母以外数据
      if (!/^([\u4e00-\u9fa5]|[a-zA-Z])+$/.test(this.inputText)) {
        this.searchList = null;
        return;
      }

      // 输入的中文
      if (/^[\u4e00-\u9fa5]+$/.test(this.inputText)) {
        let reg = new RegExp(
          "[\\u4e00-\\u9fa5]*" + this.inputText + "[\\u4e00-\\u9fa5]*",
          "g"
        );
        this.searchList = JSON.stringify(this.list).match(reg);
        return;
      }

      // 输入的字母
      if (/^[a-zA-Z]+$/.test(this.inputText)) {
        let reg = new RegExp(
          '(\\"[a-zA-Z]*' +
            this.inputText +
            '[a-zA-Z]*\\")\\\:(\\"[\\u4e00-\\u9fa5]+\\")',
          "g"
        );
        let reg1 = new RegExp("[\\u4e00-\\u9fa5]+", "g");
        this.searchList = JSON.stringify(
          JSON.stringify(this.list)
            .toLowerCase()
            .match(reg)
        ).match(reg1);

        return;
      }

      // 输入的中英混合
      if (/^([\u4e00-\u9fa5]|[a-zA-Z])+$/.test(this.inputText)) {
        this.searchList = null;
        return;
      }
    }, 1000),
    /**
     * 改变城市
     * @param {Object} cityName
     */
    changeCity(cityName) {
      this.$utils.log("changeCity", "切换城市为" + cityName);

      // 修改用户的城市选择
      this.SAVE_CITY(cityName);
      // 跳回地址管理页
      uni.redirectTo({
        url: "/pages/address/address",
      });
    },
    //获取文字信息
    getCur(e) {
      // this.listCurID = this.list[e.currentTarget.id].title;
    },
    setCur(e) {
      this.$utils.log("setCur", "用户查看列表：" + e.currentTarget.id);
      let curID = e.currentTarget.id;
      // 如果该元素还未渲染就跳过
      if (!this.$utils.getElementInfo(".indexItem-" + curID)) return;

      this.listCurID = curID;

      // 获取要跳转的位置
      let scroll =
        this.oldScroll +
        this.$utils.getElementInfo(".indexItem-" + this.listCurID).top -
        this.searchBoxInfo.bottom;

      // 移动到对应的位置
      uni.pageScrollTo({
        scrollTop: scroll,
        duration: 0,
      });
    },
    getList() {
      this.$utils.log(
        "getList",
        "通过定时器向渲染列表中逐个添加数据避免一次性渲染导致的页面加载缓慢的问题"
      );
      let i = 0,
        key;
      let timers = setInterval(() => {
        key = this.listKey[i++];
        this.$set(this.newList, key, this.list[key]);

        if (i >= this.listKey.length) {
          clearInterval(timers);
          this.loading = false;
        }
      }, 10);
    },
    /**
     * 检查搜索结果数组，如果长度过长采用分页的方式加载，定时添加
     */
    getSearchList() {
      // this.showSearchList = this.searchList.slice(0,10);
      // return;
      if (Object.prototype.toString.call(this.searchList) !== "[object Array]")
				return;
				
      this.searchLoading = true;
      this.showSearchList = [];
			clearInterval(this.searchTimer);
			
			if(this.searchList.length <= 20) {
				this.searchLoading = false;
				this.showSearchList = this.searchList;
				return;
			}

      // 分页计数器和分页尺寸
      let i = 0,
        size = 20;

      this.showSearchList = [].concat(
        this.showSearchList,
        this.searchList.slice(i * size, (i + 1) * size)
			);
			
      // 进行定时数据加载
      this.searchTimer = setInterval(() => {
        i++;

        this.showSearchList = [].concat(
          this.showSearchList,
          this.searchList.slice(i * size, (i + 1) * size)
        );

        if (this.showSearchList.length >= this.searchList.length) {
          clearInterval(this.searchTimer);
          this.searchLoading = false;
        }
      }, 500);
    },
    ...mapMutations(["SAVE_CITY"]),
  },
};
</script>

<style lang="scss" scoped>
.search-box {
  position: fixed;
  // top: 10px;
  z-index: 99;
  width: 750rpx;
}
.indexes {
  position: relative;
}

.indexBar {
  position: fixed;
  right: 0px;
  bottom: 0px;
  padding: 20upx 20upx 20upx 60upx;
  display: flex;
  align-items: center;
}

.indexBar .indexBar-box {
  width: 50rpx;
  height: auto;
  display: flex;
  flex-direction: column;
}

.indexBar-item {
  // flex: 1;
  width: 40rpx;
  height: 40rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24upx;
  color: #888;
}

movable-view.indexBar-item {
  width: 40upx;
  height: 40upx;
  z-index: 9;
  position: relative;
}

movable-view.indexBar-item::before {
  content: "";
  display: block;
  position: absolute;
  left: 0;
  top: 10upx;
  height: 20upx;
  width: 4upx;
  background-color: #f37b1d;
}

.indexToast {
  position: fixed;
  top: 0;
  right: 80upx;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  width: 100upx;
  height: 100upx;
  border-radius: 10upx;
  margin: auto;
  color: #fff;
  line-height: 100upx;
  text-align: center;
  font-size: 48upx;
}

.search-no {
  height: 10vh;
  line-height:10vh;
}
</style>
