// mixin管理文件，所有mixin文件的出口

// 引入需要的mixin

// 弹窗mixin
import { popupMixin } from "./mixins/popupMixin.js";

// 购物车相关 mixin
import { shopcartMethodsMixin, shopcartMixin } from "./mixins/shopCartMixin";

// 过滤器 mixin
import { filtersMixin } from "./mixins/filtersMixin.js";

export { popupMixin, shopcartMixin, shopcartMethodsMixin, filtersMixin };
