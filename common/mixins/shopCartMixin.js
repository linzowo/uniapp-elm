// 购物车mixin

const shopcartMethods = {
  /**
   * 添加到购物车
   * @param {Object} food 商品对象
   */
  add2cart(food) {
    this.$utils.log("add2cart", "添加到购物车");

    /*
      商品列表的数据格式如下
      foodList: {
        foodId:{
          info:{商品的详细数据},
          count:Number, // 该商品的数量
          taste:[], // 该商品的口味，数组长度与info中attrs的长度，值为用户选择的口味的索引值
        }
      }
      */

    // ==============该商品存在购物车中================

    if (this.shopCart.foodsList[food.item_id]) {
      // 该商品有活动限制
      if (food.activity) {
        // 商品数量是否超过了活动中规定的限定优惠数量
        if (
          this.shopCart.foodsList[food.item_id].count >=
          food.activity.applicable_quantity
        ) {
          // 提示用户已经超出活动限定
          uni.showToast({
            title: food.activity.applicable_quantity_detail_text,
            icon: "none",
          });
        } // end if
      } // end if

      // 修改商品总数量
      // 追加购物车中该商品数量
      this.$set(
        this.shopCart.foodsList[food.item_id],
        "count",
        this.shopCart.foodsList[food.item_id].count + 1
      );

      // 如果不存在口味选项则直接跳过后续的口味类型商品数量计算
      if (!food.attrs.length) return;

      // 判断口味是否为新的
      let curTasteObj = this.shopCart.foodsList[food.item_id].taste[
        this.goodsTasteData.join("")
      ];

      // 该口味存在其中,使其数量+1
      if (curTasteObj) {
        this.$set(curTasteObj, "count", curTasteObj.count + 1);
      } else {
        // 该口味不存在，新增一个口味，数量设置为最低起购数量
        this.$set(
          this.shopCart.foodsList[food.item_id].taste,
          this.goodsTasteData.join(""),
          {
            index: this.goodsTasteData,
            count: food.min_purchase,
          }
        );

        // 重新设置商品总数量
        this.$set(
          this.shopCart.foodsList[food.item_id],
          "count",
          this.shopCart.foodsList[food.item_id].count - 1 + food.min_purchase
        );
      } // end if 当前口味是否存在购物车中

      return;
    } // end if

    // ==============该商品不存在购物车中==============

    // 向购物车中新增商品
    this.$set(this.shopCart.foodsList, food.item_id, {
      info: food,
      count: food.min_purchase,
      taste: {},
    });

    // 判断商品数量是否超出了优惠限制数量
    if (food.activity) {
      if (
        this.shopCart.foodsList[food.item_id].count >
        food.activity.applicable_quantity
      ) {
        uni.showToast({
          title: food.activity.applicable_quantity_detail_text,
          icon: "none",
        });
      } // end if
    } // end if

    // 判断是否有口味选项
    if (food.attrs.length) {
      // 当前商品有口味选项，根据用户选择的口味设置口味属性
      let tasteId = this.goodsTasteData.join("");
      this.$set(this.shopCart.foodsList[food.item_id].taste, tasteId, {
        index: this.goodsTasteData,
        count: food.min_purchase,
      });
    } // end if 存在口味选项
  },
  /**
   * 无口味选项的：输入商品的数据及其在购物车中的索引值计算该商品总价
   * @param {Object} goods 购物车中的商品对象
   */
  goodsPriceFilter(goods) {
    let res = 0,
      price = goods.info.price * 100,
      origin_price = goods.info.origin_price * 100;
    // 当前商品有优惠活动
    if (goods.info.activity) {
      // 商品总量超过了优惠活动上限
      if (goods.count > goods.info.activity.max_quantity) {
        res += price * goods.info.activity.max_quantity;
        res += origin_price * (goods.count - goods.info.activity.max_quantity);

        return res / 100;
      } // end if 商品数量超出活动上限
    } // end if 优惠活动

    // 当前商品无优惠活动
    res += price * goods.count;

    return res / 100;
  },
  /**
   * 有口味选项的：输入商品的数据及其在购物车中的索引值计算该商品总价
   * @param {Object} goods 购物车中的商品对象
   * @param {String} key 该商品在口味列表中的键值
   * @param {Number} index 该商品在口味类型列表中的索引值
   */
  goodsTastePriceFilter(goods, key, index) {
    let res = 0,
      price = goods.info.price * 100,
      origin_price = goods.info.origin_price * 100;
    // 当前商品有优惠活动
    if (goods.info.activity) {
      // 当前商品是口味类型中的第一种，并且商品总量超过了优惠活动上限
      if (index == 0 && goods.count > goods.info.activity.max_quantity) {
        res += price * goods.info.activity.max_quantity;
        res +=
          origin_price *
          (goods.taste[key].count - goods.info.activity.max_quantity);

        return res / 100;
      } // end if 商品数量超出活动上限
    } // end if 优惠活动

    // 当前商品无优惠活动
    res += price * goods.taste[key].count;

    return res / 100;
  },
  /**
   * 显示购物车弹窗
   */
  showShopCartPopup() {
    if (this.pageState.shopCartOpenState) {
      this.closePopup("shopCartPopup");
    } else {
      this.openPopup("shopCartPopup");
    }

    this.pageState.shopCartOpenState = !this.pageState.shopCartOpenState;
  },
  /**
   * 从购物车中删除某种口味类型的商品
   * @param {Object} foodId 该商品id
   * @param {Object} tasteId 该口味类型的键
   */
  cutTasteGoodsFromCart(foodId, tasteId) {
    let curGoodsObj = this.shopCart.foodsList[foodId],
      minPurchase = curGoodsObj.info.min_purchase,
      tasteObj = this.shopCart.foodsList[foodId].taste;
    // 只剩下一种口味
    // 其数量小于等于最低起购量直接删除整个商品对象
    // 其数量大于最低起购量则数量-1

    // 还有多种口味
    // 该口味数量小于等于最低起购量直接删除这个口味对象
    // 其数量大于最低起购量则数量-1

    // 当前口味删除后是否小于等于最低起购量
    if (curGoodsObj.taste[tasteId].count <= minPurchase) {
      // 多种口味
      if (this._.keys(tasteObj).length > 1) {
        this.$set(
          curGoodsObj,
          "count",
          curGoodsObj.count - curGoodsObj.taste[tasteId].count
        );
        this.$delete(curGoodsObj.taste, tasteId);
      } else {
        // 只有一种口味
        this.$delete(this.shopCart.foodsList, foodId);
      } // end if 口味类型数量

      return;
    } // end if 小于等于最低起购量

    // 不小于最低起购量
    this.$set(curGoodsObj, "count", curGoodsObj.count - 1);
    this.$set(tasteObj[tasteId], "count", tasteObj[tasteId].count - 1);
  },
  /**
   * 在购物车弹窗中向购物车中添加某种口味类型的商品
   * @param {Object} foodId 该商品id
   * @param {Object} tasteId 该口味类型的键
   */
  addTasteGoods2Cart(foodId, tasteId) {
    let curGoodsObj = this.shopCart.foodsList[foodId];

    this.$set(curGoodsObj, "count", curGoodsObj.count + 1);
    this.$set(
      curGoodsObj.taste[tasteId],
      "count",
      curGoodsObj.taste[tasteId].count + 1
    );

    // 该商品有优惠活动
    if (curGoodsObj.info.activity) {
      if (curGoodsObj.count > curGoodsObj.info.activity.max_quantity) {
        // 提示用户已经超出活动限定
        uni.showToast({
          title: curGoodsObj.info.activity.applicable_quantity_detail_text,
          icon: "none",
        });
      } // end if 商品数量超出活动上限
    } // end if 商品存在活动
  },
  /**
   * 从购物车中删除
   * @param {Object} food 商品对象
   */
  cutFromCart(food) {
    this.$utils.log("cutFromCart", "从购物车中删除");
    let curInShopcartObj = this.shopCart.foodsList[food.item_id];

    // 该对象不存在
    if (!curInShopcartObj) return false;

    // 该对象存在多种口味和规格，提示用户只能在购物车中删除
    if (this._.keys(curInShopcartObj.taste).length >= 2) {
      uni.showToast({
        title: this.$c_t.store_index.has_more_taste,
        icon: "none",
      });

      return false;
    }

    // 该对象数量超过最低购买数量
    if (curInShopcartObj.count > food.min_purchase) {
      // 商品数量-1
      this.$set(curInShopcartObj, "count", curInShopcartObj.count - 1);
      // 存在口味参数，当前口味参数的数量-1
      if (!this._.isEmpty(curInShopcartObj.taste)) {
        this.$set(
          curInShopcartObj.taste[this._.keys(curInShopcartObj.taste)[0]],
          "count",
          curInShopcartObj.count
        );
      }

      // 检查其数量是否仍然超过最大优惠数量。超过了就给予提示
      if (food.activity) {
        if (curInShopcartObj.count > food.activity.applicable_quantity) {
          uni.showToast({
            title: food.activity.applicable_quantity_detail_text,
            icon: "none",
          });
        } // end if
      } // end if

      // 检查该商品是否存在多种口味

      return;
    }

    // 将该对象从购物车中删除
    this.$delete(this.shopCart.foodsList, food.item_id);
  },
  /**
   * 清空购物车
   */
  clearShopcart() {
    this.$set(this.shopCart, "foodsList", {});
    this.showShopCartPopup();
  },
  /**
   * 前往支付页面
   */
  gotoPayPage() {
    this.$utils.log("gotoPayPage", "前往支付页面");

    // 向后台发送购物车数据生成对应的订单

    // 跳转到订单确定页
    uni.navigateTo({
      url:
        this.$pages_path.order_confirm + "?order_id=" + this.storeData.rst.id,
      fail(e) {
        console.log("跳转失败", e);
      },
    });
  },
  /**
   * 用户确定了当前商品的口味，将其加入购物车
   * @param {Object} goods 商品数据
   */
  confirmTaste(goods) {
    this.$utils.log("confirmTaste", "用户确定了当前商品的口味，将其加入购物车");
    this.add2cart(goods);
    this.closePopup("foodTasteChoosePopup");
  },
  /**
   * 记录当前用户选择的是哪种口味
   * @param {Number} index 当前要修改哪个类别的口味
   * @param {Number} value 口味的索引值
   */
  tasteChoose(index, value) {
    this.$utils.log("tasteChoose", "记录当前用户选择的是哪种口味");
    this.$set(this.goodsTasteData, index, value);
  },
  /**
   * 跳转到价格说明页
   */
  goToPriceDescription() {
    this.$utils.log("goToPriceDescription", "跳转到价格说明页");
    uni.navigateTo({
      url: this.$pages_path.add_address,
      fail(e) {
        console.log("跳转失败", e);
      },
    });
  },
};

// 导出购物车方法mixin
export const shopcartMethodsMixin = {
  methods: shopcartMethods,
  computed: {
    /**
     * 统计购物车价格
     */
    shopCartPriceCount() {
      let res = {
        origin_price: 0,
        price: 0,
        save_money: 0,
      };

      for (let key in this.shopCart.foodsList) {
        let curGoodsObj = this.shopCart.foodsList[key],
          price = curGoodsObj.info.price * 100,
          origin_price = curGoodsObj.info.origin_price * 100;
        // 有优惠活动
        if (curGoodsObj.info.activity) {
          // 当前商品数量超过了最大优惠数
          if (
            curGoodsObj.count > curGoodsObj.info.activity.applicable_quantity
          ) {
            // 当前价格计算 (总数量 - 活动上限数量) * 原始价格 + (活动上限数量 * 当前价格)
            let overPrice =
              (curGoodsObj.count -
                curGoodsObj.info.activity.applicable_quantity) *
              origin_price;

            let salePrice =
              curGoodsObj.info.activity.applicable_quantity * price;

            res.price += overPrice + salePrice;
          } // end if
        } // end if

        if (
          !curGoodsObj.info.activity ||
          curGoodsObj.count <= curGoodsObj.info.activity.applicable_quantity
        ) {
          res.price += curGoodsObj.count * price;
        } // end if

        res.origin_price += curGoodsObj.count * origin_price;
      } // end for

      res.save_money = res.origin_price - res.price;
      res.price /= 100;
      res.origin_price /= 100;
      res.save_money /= 100;
      return res;
    },
  },
};

// 导出完整购物车mixin
export const shopcartMixin = {
  data() {
    return {
      goodsInfoPopupData: null, // 临时存储商品详情弹窗所需的数据
      goodsTasteData: [], // 临时存储用户选择的商品口味
      shopCart: {
        foodsList: {}, // 购物车商品数据详情
        /*
					商品列表的数据格式如下
					foodList: {
						foodId:{
							info:{商品的详细数据},
							count:Number, // 该商品id下商品的总数量
							taste:{
								goodsTasteData.join(''):{
									index:[], // 该商品的口味，数组长度与info中attrs的长度一致，值为用户选择的口味的索引值
									count:Number, // 当前口味的商品数量
								}
							}, // 用户选择的口味列表，不同口味视为不同商品，当该商品无口味选项时此对象为空
						}
					}
					*/
        redpackList: [], // 用户兑换的红包
        count: null, // 当前购物车的商品总数量
      }, // 店铺私有购物车数据，加入数据后会同步到总购物车中
    };
  },
  watch: {
    shopCart: {
      handler(n, o) {
        if (this._.isEmpty(n.foodsList)) {
          this.showShopCartPopup();
        }

        let len = 0;

        for (let key in n.foodsList) {
          len += n.foodsList[key].count;
        }
        this.shopCart.count = len;

        // 购物车无商品 且 无红包数据 直接返回
        if (this._.isEmpty(n.foodsList) && !n.redpackList.length) {
          if (this.cartList[this.storeData.rst.id]) {
            this.REMOVE_CART(this.storeData.rst.id);
          }
          return;
        }

        // 将商品数据存入公共购物车
        let shopId = this.storeData.rst.id;
        this.ADD_CART({
          shopId,
          cartInfo: this.shopCart,
        });
      },
      deep: true,
    },
  },
  computed: {
    /**
     * 统计购物车价格
     */
    shopCartPriceCount() {
      let res = {
        origin_price: 0,
        price: 0,
        save_money: 0,
      };

      for (let key in this.shopCart.foodsList) {
        let curGoodsObj = this.shopCart.foodsList[key],
          price = curGoodsObj.info.price * 100,
          origin_price = curGoodsObj.info.origin_price * 100;
        // 有优惠活动
        if (curGoodsObj.info.activity) {
          // 当前商品数量超过了最大优惠数
          if (
            curGoodsObj.count > curGoodsObj.info.activity.applicable_quantity
          ) {
            // 当前价格计算 (总数量 - 活动上限数量) * 原始价格 + (活动上限数量 * 当前价格)
            let overPrice =
              (curGoodsObj.count -
                curGoodsObj.info.activity.applicable_quantity) *
              origin_price;

            let salePrice =
              curGoodsObj.info.activity.applicable_quantity * price;

            res.price += overPrice + salePrice;
          } // end if
        } // end if

        if (
          !curGoodsObj.info.activity ||
          curGoodsObj.count <= curGoodsObj.info.activity.applicable_quantity
        ) {
          res.price += curGoodsObj.count * price;
        } // end if

        res.origin_price += curGoodsObj.count * origin_price;
      } // end for

      res.save_money = res.origin_price - res.price;
      res.price /= 100;
      res.origin_price /= 100;
      res.save_money /= 100;
      return res;
    },
  },
  methods: {
    ...shopcartMethods,
  },
};
