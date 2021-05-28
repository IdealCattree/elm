import { loginIn, loginOut } from "@/apis";
import { setStorage, removeStorage } from "@/utils/setLocalStorage";
import { getUserInfo, getAddressList, deleteAddress } from "@/apis";

export default {
  namespaced: true,
  state: {
    userInfo: null,
    loading: false,
    addressList: null,
  },
  mutations: {
    setUser(state, payload) {
      state.userInfo = payload;
    },
    setIsLoading(state, payload) {
      state.loading = payload;
    },
    setUserName(state, payload) {
      state.userInfo = {
        ...state.userInfo,
        username: payload,
      };
    },

    /**
     * 保存用户所有的收货地址
     * @param {*} state
     * @param {*} payload
     */
    setUserAddress(state, payload) {
      state.addressList = payload;
    },

    /**
     * 根据id移除指定的地址
     * @param {*} state
     * @param {*} payload
     */
    removeAddressById(state, payload) {
      state.addressList = state.addressList.filter(item => item.id !== payload);
    },
  },
  actions: {
    /**
     * 登录
     * @param {*} ctx
     * @param {*} payload
     * @returns
     */
    async login(ctx, payload) {
      // 设置状态为正在登录中
      ctx.commit("setIsLoading", true);
      const resp = await loginIn(payload.loginId, payload.password, payload.code);
      if (resp.user_id) {
        // 成功
        ctx.commit("setUser", resp);
        ctx.commit("setIsLoading", false);
        setStorage("user_id", resp.user_id);
        return resp;
      }
      ctx.commit("setIsLoading", false);
      return resp; // 失败
    },

    /**
     * 登出
     * @param {*} ctx
     */
    async loginOut(ctx) {
      const data = await loginOut();
      ctx.commit("setUser", null);
      removeStorage("user_id");
      return data.message;
    },

    /**
     * 验证
     * @param {*} ctx
     */
    async whoAmI(ctx) {
      const userInfo = await getUserInfo();
      if (userInfo.user_id) {
        ctx.commit("setUser", userInfo);
        return true;
      }
      return false;
    },

    /**
     * 获取用户的所有地址并保存到仓库中
     * @param {*} ctx
     * @param {*} payload 用户的user_id
     */
    async saveAddressList(ctx, payload) {
      const addressList = await getAddressList(payload);
      ctx.commit("setUserAddress", addressList);
    },

    /**
     * 根据用户id 与 地址id删除指定的地址
     * @param {*} ctx
     * @param {*} param1
     */
    async removeAddress(ctx, { user_id, address_id }) {
      const result = await deleteAddress(user_id, address_id);
      if (result.status === 1) {
        ctx.commit("removeAddressById", address_id);
      } else {
        this.$showMessage({ content: result.message });
      }
    },
  },
};
