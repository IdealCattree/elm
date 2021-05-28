import Vue from "vue";
import Vuex from "vuex";
import user from "./user";
import location from "./location";
import buyCart from "./buyCart";
import confirmOrder from "./confirmOrder";
import orderList from "./orderList";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    location,
    buyCart,
    confirmOrder,
    orderList,
  },
});
