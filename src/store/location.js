export default {
  namespaced: true,
  state: {
    latitude: "31.23037", //当前纬度
    longitude: "121.473701", // 当前经度
    cityName: "上海", //当前城市的名称
    geohash: "31.23037,121.473701",
  },
  mutations: {
    /**
     * 设置精度和纬度
     * @param {*} state
     * @param {Object} payload
     */
    setLoaction(state, payload) {
      state.latitude = payload.latitude;
      state.longitude = payload.longitude;
      state.geohash = payload.geohash;
    },
    /**
     * 设置当前城市名称
     * @param {*} state
     * @param {*} payload
     */
    setCityName(state, payload) {
      state.cityName = payload;
    },
  },
  actions: {},
};
