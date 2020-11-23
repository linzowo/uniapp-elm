
// 弹窗mixin
export const popupMixin = {
  data() {
    return {
      popupStack: [], // 弹窗栈
    };
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
        popData = this.popupStack.pop();
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
      if (this.popupStack.includes(ref)) return;

      this.$refs.popBox.openPopup(ref);
      this.popupStack.push(ref);
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
  },
};