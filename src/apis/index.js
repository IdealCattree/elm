import request from "../services/request";

/**
 * 获取食物分类列表
 */
export const getFoodTypes = async () => {
  return await request.get("/v2/index_entry");
};

/**
 * 获取所有商铺分类列表
 */

export const getShopTypes = async () => {
  return await request.get("/shopping/v2/restaurant/category");
};

/**
 * 获取城市列表
 * @param {*} type 城市的类型（guess：定位城市， hot：热门城市， group：所有城市）
 * @returns
 */
export const getCities = async (type = "guess") => {
  return await request.get("/v1/cities?type=" + type);
};

/**
 * 商家属性活动列表
 * @returns
 */
export const getFoodActivity = async () => {
  return await request.get("/shopping/v1/restaurants/activity_attributes");
};

/**
 * 获取配送方式
 */
export const getFoodDelivery = async () => {
  return await request.get("/shopping/v1/restaurants/delivery_modes");
};

/**
 * 获取商铺列表
 * @param {*} latitude 纬度
 * @param {*} longitude 经度
 * @param {*} restaurant_category_id 餐馆分类id
 * @param {*} order_by 排序方式id： 1：起送价、2：配送速度、3:评分、4: 智能排序(默认)、5:距离最近、6:销量最高
 * @returns
 */
export const getShopList = async (
  { latitude, longitude, restaurant_category_id, order_by },
  offset = 0,
  limit = 10
) => {
  return await request.get("/shopping/restaurants", {
    params: {
      latitude,
      longitude,
      restaurant_category_id,
      order_by,
      offset: offset * limit,
      limit,
    },
  });
};

/**
 * 搜索店铺
 * @param {*} geohash
 * @param {*} keyword
 * @returns
 */
export const getSearchShopList = async (geohash, keyword) => {
  return request.get("/v4/restaurants", {
    params: {
      geohash,
      keyword,
    },
  });
};

/**
 * 根据店铺id获取店铺信息
 * @param {*} id 店铺id
 * @returns
 */
export const getShopDetail = async id => {
  const data = await request.get("/shopping/restaurant/" + id);
  return data;
};

/**
 * 根据店铺id获取店铺食品菜单
 * @param {*} id 店铺id
 * @returns
 */
export const getShopMenu = async id => {
  return await request.get("/shopping/v2/menu", {
    params: {
      restaurant_id: id,
    },
  });
};

/**
 * 根据商铺id分页获取商铺评价
 * @param {*} id 商铺id
 * @param {*} page
 * @param {*} limit
 * @returns
 */
export const getRatingList = async (id, page, limit) => {
  return await request.get(`/ugc/v2/restaurants/${id}/ratings`, {
    params: {
      offset: page * limit,
      limit,
    },
  });
};

/**
 * 根据id获取评价分数
 * @param {*} id 商铺id
 * @returns
 */
export const getRatingScore = async id => {
  return await request.get(`/ugc/v2/restaurants/${id}/ratings/scores`);
};

/**
 * 根据商铺id获取评价分类
 * @param {*} id 商铺id
 * @returns
 */
export const getRatingTags = async id => {
  return await request.get(`/ugc/v2/restaurants/${id}/ratings/tags`);
};

export const getMobileCode = async phone => {
  return await request.post("/v4/mobile/verify_code/send", {
    mobile: phone,
    scene: "login",
    type: "sms",
  });
};

/**
 * 获取验证码
 * @returns
 */
export const getQRCode = async () => {
  return await request.post("/v1/captchas");
};

/**
 * 登录
 * @param {} loginId
 * @param {*} loginPwd
 * @returns
 */
export const loginIn = async (loginId, loginPwd, code) => {
  return await request.post("/v2/login", {
    username: loginId,
    password: loginPwd,
    captcha_code: code,
  });
};

/**
 * 登出
 * @returns
 */
export const loginOut = async () => {
  return await request.get("/v2/signout");
};

/**
 * 修改密码
 * @param {*} username
 * @param {*} oldpassWord
 * @param {*} newpassword
 * @param {*} confirmpassword
 * @param {*} captcha_code
 * @returns
 */
export const changePwd = async (
  username,
  oldpassWord,
  newpassword,
  confirmpassword,
  captcha_code
) => {
  return request.post("/v2/changepassword", {
    username,
    oldpassWord,
    newpassword,
    confirmpassword,
    captcha_code,
  });
};

/**
 * 获取用户信息
 * @returns
 */
export const getUserInfo = async () => {
  return await request.get("/v1/user");
};

/**
 * 添加到购物车，检验订单是否满足条件
 * @param {*} geohash 经纬度
 * @param {*} entities 购物车数据
 * @param {*} shopid 商铺id
 * @returns
 */
export const checkout = async (geohash, entities, shopid) => {
  return await request.post("/v1/carts/checkout", {
    restaurant_id: shopid,
    geohash,
    entities,
    come_from: "web",
  });
};

/**
 * 根据用户id获取地址
 * @param {*} user_id
 * @returns
 */
export const getAddressList = async user_id => {
  return await request.get("/v1/users/" + user_id + "/addresses");
};

/**
 * 获取首页默认地址
 */
export const cityGuess = () => {
  return request.get("https://elm.cangdu.org/v1/cities?type=guess");
};

/**
 * 根据用户id与地址id删除指定的地址
 * @param {*} user_id
 * @param {*} address_id
 * @returns
 */
export const deleteAddress = async (user_id, address_id) => {
  return request.delete("/v1/users/" + user_id + "/addresses/" + address_id);
};

/**
 * 获取备注信息
 */
export const getRemark = async (id, sig) => {
  return await request.get(`/v1/carts/${id}/remarks`, {
    params: {
      sig,
    },
  });
};

/**
 * 添加地址
 * @param {*} addressInfo
 */
export const postAddress = async ({
  user_id,
  name,
  sex,
  phone,
  phone_bk,
  address,
  address_detail,
  geohash,
  tag,
  tag_type,
  poi_type,
}) => {
  return await request.post("/v1/users/" + user_id + "/addresses", {
    name,
    sex,
    phone,
    phone_bk,
    address,
    address_detail,
    geohash,
    tag,
    tag_type,
    poi_type,
  });
};

/**
 * 下订单
 * @param {*} param0
 * @returns
 */
export const placeOrder = async ({
  user_id,
  cart_id,
  address_id,
  description,
  entities,
  geohash,
  sig,
}) => {
  return await request.post("/v1/users/" + user_id + "/carts/" + cart_id + "/orders", {
    address_id,
    description,
    entities,
    geohash,
    sig,
    deliver_time: "",
    paymethod_id: 1,
  });
};

/**
 * 支付后返回的数据
 * @param {*} param0
 * @returns
 */
export const payRequest = async ({ merchantOrderNo, userId }) => {
  return await request.get("/payapi/payment/queryOrder", {
    merchantId: 5,
    merchantOrderNo,
    source: "MOBILE_WAP",
    userId,
    version: "1.0.0",
  });
};

/**
 * 分页获取订单列表
 * @param {*} user_id
 * @param {*} offset
 * @param {*} limit
 * @returns
 */
export const getOrderList = async (user_id, offset, limit = 10) => {
  return await request.get("/bos/v2/users/" + user_id + "/orders", {
    params: {
      limit,
      offset,
    },
  });
};

/**
 * 根据订单id获取指定的订单
 * @param {*} user_id
 * @param {*} orderid
 * @returns
 */
export const getOrderDetail = async (user_id, orderid) => {
  return await request.get("/bos/v1/users/" + user_id + "/orders/" + orderid + "/snapshot");
};
