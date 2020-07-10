/**
 * @module 存储全局页面地址信息
 * 方便后续维护地址
 */

 export const PAGES_PATH = {
    index: "/pages/index/index", // 主页
    discover: "/pages/discover/discover", // 发现页
    order: "/pages/order/order", // 订单页
    order_info: "/pages/order/orderInfo", // 订单详情页
    order_confirm: "/pages/orderConfirm/orderConfirm", // 订单确认页
    user: "/pages/user/user", // 用户页-tab-我的
    user_setting: "/pages/userSetting/userSetting", // 用户管理设置
    input_user_setting: "/pages/userSetting/children/setting", // 用户信息修改页
    address: "/pages/address/address",  // 地址页
    add_address: "/pages/address/add_address", // 新增地址页
    manage_address: "/pages/address/manage_address", // 地址管理页
    choose_address: "/pages/address/choose_address", // 选择地址
    edit_address: "/pages/address/edit_address", // 地址编辑页
    search: "/pages/search/search", // 搜索页
    category_list: "/pages/categoryList/categoryList", // 分类列表页
    combo: "/pages/combo/combo", // 套餐页
    member: "/pages/member/member", // 会员页
    login: "/pages/login/login", // 登录页
    file: "/pages/file/file", // 文件页
    city: "/pages/city/city", // 城市选择页
    store_index: "/pages/storeIndex/storeIndex", // 店铺主页
    gold_shop: "/pages/gold/goldShop", // 金币商店
    gold_exchange: "/pages/gold/goldExchange", // 金币兑换
    share: "/pages/share/share", // 分享
    service: "/pages/service/service", // 服务页
    ruler_center: "/pages/rulerCenter/rulerCenter", // 规则中心
    redpacket: "/pages/redPacket/redPacket", // 红包
    order_note: "/pages/orderConfirm/children/order_note", // 订单备注
    choose_invoice: "/pages/invoice/choose_invoice", // 选择发票信息
    add_invoice: "/pages/invoice/add_invoice", // 新增发票信息
    edit_invoice: "/pages/invoice/edit_invoice", // 编辑发票信息
    pay: "/pages/pay/pay", // 支付页
 }

 export default {
    PAGES_PATH
 }