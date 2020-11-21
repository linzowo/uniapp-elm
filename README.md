# uniapp-elm





<img src="https://img.shields.io/badge/build-linzowo-brightgreen" alt="linzowo">

<img alt="APM badge" src="https://img.shields.io/badge/license-MIT-green">

## 项目简介
这是一个前端练习项目，灵感来源于[vue2-elm](https://github.com/bailicangdu/vue2-elm)，如果你是一个前端学习者，想要完成一个相对复杂的项目来锻炼自己，那么不妨尝试一下这个项目。我将为你提供较为完整的设计图纸和一些必要的静态数据源。

`注意：因为gitee无法进行跨域访问，所以静态数据挂载在github上，国内请求速度可能较为缓慢。（页面加载速度会有影响）。但是第一次加载完成后会将数据缓存到本地，后续访问速度会有提升。`

码云-[在线demo](https://linzowo.gitee.io/h5/elm-uniapp/)  
github-[在线demo](https://linzowo.github.io/h5/elm-uniapp/)  

`注意：电脑端访问时请在开发模式中开启手机模拟，具体操作：f12 → ctrl + shift + m 或者 鼠标点击相关图标切换`



## 技术框架
框架：uni-app（基于vue的跨端开发框架）

本项目采用了基于`vue的uni-app`框架，目的是能够实现一个能够在各种环境（`H5` `app` `小程序`）中运行的应用。你也可以采用其他框架进行开发，重点在于你对框架、语言的熟悉程度，以及对于复杂业务的掌控能力这些方面的锻炼。



## run

如果你想在本地运行当前项目请按照以下流程操作，目前仅支持以下两种运行方式

### HBuilderX

如果你使用的是HBuilderX作为编译平台，

`文件 → 导入 → 从本地导入（或从git导入） → 运行`

### Vue-cli

如果你使用Vue-cli作为编译工具

[官方运行方案](https://uniapp.dcloud.io/quickstart?id=_2-%e9%80%9a%e8%bf%87vue-cli%e5%91%bd%e4%bb%a4%e8%a1%8c)

可能无法一次运行，会缺少部分插件，如果出现，按提示安装相关插件即可。



## 通过本项目你能获得的

通过这个项目你会遇到在项目开发中会遇到的一些实际问题，那么如何解决它们便是我们的收获了。

+ 长列表渲染性能优化
+ 前端查询搜索功能实现
+ 页面状态管理（基本页面常见的状态处理）
+ 多页面间的数据、状态共享管理
+ 页面操作优化
+ 功能测试
+ bug排查与修复
+ 特殊css效果实现
+ 可复用模块提取封装
+ 通用配置文件设计与管理
+ 多设备适配处理
+ ...

以上只是其中一些比较让我留心的问题和难点，更多的试炼将会在你上手之后一个一个出现。相信我完成它你的功力将能进一步提升（大佬略过）。



## 我将提供的资源


### 项目设计稿

[项目设计图](https://app.mockplus.cn/team/invitation/F1lI55_TnG)




### 静态数据接口

#### baseURL

`https://linzowo.github.io/json/ele_data/`

#### 使用方式

`baseURL ` + `文件地址（见下列表）`

#### 文件地址列表

| 接口名称 | 地址 |
| ---- | ---- |
|店铺主页测试数据      |test_data_store_index_data.json      |
|店铺评论测试数据      |test_data_store_comment.json      |
|店铺评论测试数据      |test_data_good_comment.json      |
|历史订单数据      |test_data_history_order.json      |
|主页顶部tab数据      |index_enter_data.json      |
|发现页顶部数据      |discover_enter_data.json      |
|发现页兑换数据      |discover_duiba_gifs.json      |
|城市列表数据全国各级市县      |city_data.json      |
|测试用-用户地址数据      | address_data.json |
|商品总分类数据      |categore_data.json      |
|套餐页数据      |combo_data.json      |
|热搜数据      |hot_search.json      |
|会员折扣商品数据      |member_sale_goods.json      |
|奖励红包数据      |reward_red_packets.json      |
|店铺红包数据      |store_red_packets.json      |
|搜索提示      |search_cue.json      |
|搜索结果1      |search_res_1.json      |
|搜索结果2      |search_res_2.json      |
|商铺列表navtab的筛选标签数据      |store_filter_data.json      |
|商铺列表商品数据1      |store_list_data_1.json      |
|商铺列表商品数据2      |store_list_data_2.json      |
|商铺列表商品数据3      |store_list_data_3.json      |
|商铺列表navtab排序标签数据      |store_sort_data.json      |
|订单数据1      |order_data.json      |
|订单数据2      |order_data_2.json      |
|可选备注选项数据      |remark_data.json      |
|订单支付页数据 |order_pay_data.json |

[已封装的object对象](https://github.com/linzowo/vue-elm/blob/master/common/http/service.js)

---

## TODO

- [x] H5支持

- [x] 微信小程序支持

- [ ] 支付宝小程序支持

- [ ] 头条小程序支持

- [x] app支持

  
---

## 感谢

### 依赖库

本项目开发使用的ui库

+ [color-ui](https://github.com/weilanwl/ColorUI)
+ uni-app官方ui

感谢以上库作者的辛勤付出

