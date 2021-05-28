export default {
  namespaced: true,
  state: {
    orderDetail: null,
  },
  mutations: {
    /**
     * 保存订单详情信息
     * @param {*} state
     * @param {*} payload
     */
    saveOrderDetail(state, payload) {
      state.orderDetail = payload;
    },
  },
  actions: {},
};
