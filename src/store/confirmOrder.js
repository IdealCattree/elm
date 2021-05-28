export default {
  namespaced: true,
  state: {
    sig: "",
    cart_id: "", // 购物车id
    address: null, // 收货地址
    addressIndex: null, // 收货地址的id用于确认当前的收货地址
    // 订单的备注
    remark: {
      remarkList: "", // 快速选择的备注
      remarkText: "", // 用户自定义备注
    },
    invoice: false, // 是否开发票
    orderParmas: null, // 订单的参数
    orderMessage: {}, // 下单之后返回的信息
    shopId: "", // 商铺id
  },
  mutations: {
    /**
     * 保存购物车id 和 sig
     * @param {*} state
     * @param {*} payload
     */
    saveCartIdAndSig(state, payload) {
      state.sig = payload.sig;
      state.cart_id = payload.cart_id;
    },
    /**
     * 改变收货地址
     * @param {*} state
     * @param {*} payload
     */
    chooseAddress(state, payload) {
      state.address = payload.address;
      state.addressIndex = payload.index;
    },

    /**
     * 设置确认订单的口味备注
     * @param {*} state
     * @param {*} payload
     */
    setConfirmRemark(state, payload) {
      state.remark.remarkList = payload.remarkList;
      state.remark.remarkText = payload.remarkText;
    },

    /**
     * 是否开发票
     * @param {*} state
     * @param {*} payload
     */
    setConfrimInvoice(state, payload) {
      state.invoice = payload;
    },

    /**
     * 保存订单的参数
     * @param {*} state
     * @param {*} payload
     */
    saveOrderParmas(state, payload) {
      state.orderParmas = payload;
    },

    /**
     * 保存返回的订单信息
     * @param {*} state
     * @param {*} payload
     */
    saveOrderMessage(state, payload) {
      state.orderMessage = payload;
    },

    /**
     * 保存商铺id
     * @param {*} state
     * @param {*} payload
     */
    saveShopId(state, payload) {
      state.shopId = payload;
    },
  },
  actions: {},
};
