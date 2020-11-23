// 弹窗mixin
export const popupMixin = {
  data() {
    return {};
  },
  methods: {
    /**
     * 弹窗状态变化完成时触发的方法
     * @param {Object} e 事件参数对象
     */
    popupChange(e) {
      this.$utils.log(
        "popupChange",
        "弹窗状态改变==>" + (e.show ? "开" : "关"),
        e
      );
      let popData = "";
      if (e.show == false) {
        if (this.popupStack) {
          popData = this.popupStack.pop();
          console.log(this.popupStack, "删除");
        } else {
          this.$root.$data.popupStack.pop();
        }

        if (popData == "shopCartPopup") {
          this.pageState.shopCartOpenState = false;
        }
      }
    },
    /**
     * 打开弹窗
     * @param {String} ref 弹窗的ref值
     */
    openPopup(ref) {
      this.$utils.log("openPopup", "打开弹窗" + ref);
      if (this.popupStack) {
        if (this.popupStack.includes(ref)) return;
        this.popupStack.push(ref);
      } else {
        if (this.$root.$data.popupStack.includes(ref)) return;
        this.$root.$data.popupStack.push(ref);
      }
      
      this.$root.$refs.popBox.openPopup(ref);
      // this.$refs.popBox.openPopup(ref);
      // this.$refs[ref].open();
    },
    /**
     * 关闭弹窗
     * @param {String} ref 弹窗的ref值
     */
    closePopup(ref) {
      this.$utils.log("closePopup", "关闭弹窗" + ref);
      this.$refs[ref].close();
    },
    /**
     * 查看商品口味选择弹窗
     * @param {Object} goods 商品数据
     */
    showFoodTasteChoosePopup(goods) {
      this.$utils.log("showFoodTasteChoosePopup", "查看商品口味选择弹窗");
      if (this.goodsInfoPopupData) {
        this.goodsInfoPopupData = goods;
      } else {
        // console.log();
        this.$root.$data.goodsInfoPopupData = goods;
      }
      this.goodsTasteData = Array(goods.attrs.length).fill(0);

      this.openPopup("foodTasteChoosePopup");
    },
  },
};
