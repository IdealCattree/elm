import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import showMessage from "./utils/showMessage";
import "./config/rem";
import "./style/main.css";
import eventBus from "./eventBus";
import "swiper/css/swiper.css"; // import style

Vue.config.productionTip = false;

Vue.prototype.$bus = eventBus; // 事件总线

Vue.prototype.$showMessage = showMessage;

// 每次刷新页面都重新进行用户验证
store.dispatch("user/whoAmI");

// 每次刷新页面都要先从localstore中获取食物列表
store.dispatch("buyCart/setCartFromLocal");

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
