import { setStorage, getStoreage } from "@/utils/setLocalStorage";
export default {
  namespaced: true,
  state: {
    cartList: {},
  },
  mutations: {
    /**
     * 向购物车中添加一个商品
     * 如果有num值 +1 如果没有创建一个商品对象
     * @param {*} state
     * @param {*} param1
     */
    addToCart(
      state,
      {
        shop_id,
        category_id,
        item_id,
        food_id,
        name,
        price,
        specs,
        packing_fee,
        sku_id,
        stock,
        food,
      }
    ) {
      let cart = state.cartList;
      let shop = (cart[shop_id] = cart[shop_id] || {});
      let category = (shop[category_id] = shop[category_id] || {});
      let item = (category[item_id] = category[item_id] || {});
      if (item[food_id]) {
        item[food_id].num = item[food_id].num + 1;
      } else {
        item[food_id] = {
          num: 1,
          id: food_id,
          name,
          price,
          specs,
          packing_fee,
          sku_id,
          stock,
          food,
        };
      }
      state.cartList = { ...cart };
      setStorage("cartList", cart);
    },

    /**
     * 减少购物车中指定商品的数量
     * 至少为0
     * @param {*} state
     * @param {*} param1
     */
    removeToCart(state, { shop_id, category_id, item_id, food_id }) {
      let cart = state.cartList;
      let shop = cart[shop_id] || {};
      let category = shop[category_id] || {};
      let item = category[item_id] || {};
      if (item && item[food_id]) {
        if (item[food_id].num > 0) {
          item[food_id].num = item[food_id].num - 1;
        } else {
          item[food_id].num = 0;
        }
      }
      state.cartList = { ...cart };
      setStorage("cartList", cart);
    },

    /**
     * 清空购物车中的所有商品
     * @param {*} state
     */
    clearCart(state) {
      state.cartList = {};
    },

    /**
     * 根据商铺id删除购物车中指定商铺的商品
     * @param {*} state
     * @param {*} payload
     */
    clearCartOfShopId(state, payload) {
      delete state.cartList[payload];
    },

    /**
     * 当页面刷新后从localstorage中获取购物车商品
     */
    setAllCart(state, payload) {
      state.cartList = payload;
    },
  },
  actions: {
    setCartFromLocal(ctx, payload) {
      // 从localstorage中获取cartList的数据
      let cartList = getStoreage("cartList");
      cartList = JSON.parse(cartList);
      if (cartList) {
        ctx.commit("setAllCart", cartList);
      }
    },
  },
};
