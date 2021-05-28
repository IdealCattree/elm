<template>
  <i class="iconfont icon-container" :class="fontClass"></i>
</template>

<script>
const classMap = {
  back: "icon-arrow-right-copy", // 左箭头 （返回）
  enter: "icon-icon1", // 右箭头（进入）
  arrowRight: "icon-arrfill_u-copy", // 右实心箭头
  arrowDown: "icon-f11-copy", // 下实心箭头
  dustbin: "icon-lajixiang", // 垃圾箱
  elm: "icon-SSS-copy", // logo
  phone: "icon-phone1", // 简易手机
  order: "icon-order", // 订单
  search: "icon-wddl", // 放大镜
  position: "icon-weizhi", // 实心坐标
  user: "icon-wode", // 用户
  reduce: "icon-jian", //减
  plus: "icon-jia", // 加号
  mobile: "icon-cellphone_hover_hov", //实心手机
  success: "icon-duihao", // 成功的对号
  screen: "icon-shaixuan", // 筛选
  discover: "icon-faxian", // 发现
  toTop: "icon-to_top", // 回到顶部
  money: "icon-jiaqian", // 钱
  fire: "icon-huo", // 火焰
  sort: "icon-paixu", // 排序
  clock: "icon-shijian", // 闹钟
  near: "icon-weibiaoti-_huabanfuben", // 简易坐标
  star: "icon-star-line", // 星星
  check: "icon-correct-1-mini", // 对号
  bird: "icon-fengniao", // 鸟
  scoreStar: "icon-star", //评分星星
  close: "icon-close", // 关闭按钮
  cart: "icon-gouwuche", // 购物车
  zhifubao: "icon-zhifubao", // 支付宝logo
  weixin: "icon-weixinfukuan", // 微信logo
  shangcheng: "icon-shangcheng", // 商城icon
  fuwuzhongxin: "icon-fuwuzhongxin", // 服务中心
  huiyuan: "icon-huiyuan-", // 会员
  avatar: "icon-weibiaoti-1", //未登录时的用户头像
  solid_elm: "icon-elemo", // 实心的elm图标
  wenhao: "icon-wenhao", //问号
};
export default {
  props: {
    type: {
      type: String,
      required: true,
    },
  },
  computed: {
    fontClass() {
      return classMap[this.type];
    },
  },
};
</script>

<style lang="scss" scoped>
.iconfont {
  font-size: inherit;
  color: inherit;
}
</style>
