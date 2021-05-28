<template>
  <div class="detail-container">
    <Header v-if="shopDetail" :shopData="shopDetail" />
    <!-- 菜单与评论的切换 -->
    <div class="change_show_type">
      <div @click="switchChange = true" :class="{ active: switchChange }">
        <span>商品</span>
      </div>
      <div @click="switchChange = false" :class="{ active: !switchChange }">
        <span>评价</span>
      </div>
    </div>
    <MenuList v-if="switchChange && foodMenu" :foodData="foodMenu" />
    <BuyCart
      v-if="switchChange && shopId && startingPrice"
      :shopId="shopId"
      :startingPrice="startingPrice"
    />
    <Rating
      v-if="!switchChange && shopRating && shopScore && RatingTags"
      :RatingTags="RatingTags"
      :shopRating="shopRating"
      :shopScore="shopScore"
    />
    <Loading v-if="isLoading" />
  </div>
</template>

<script>
import { getShopDetail, getShopMenu, getRatingList, getRatingScore, getRatingTags } from "@/apis";
import Header from "./components/Header";
import MenuList from "./components/MenuList";
import BuyCart from "./components/BuyCart";
import Rating from "./components/Rating";
import fetchData from "@/mixins/fetchData";
import Loading from "@/components/Loading";

export default {
  mixins: [fetchData],
  components: {
    Header,
    MenuList,
    BuyCart,
    Rating,
    Loading,
  },
  data() {
    return {
      shopId: null, // 商铺id
      shopDetail: null, // 商铺详情
      foodMenu: null, // 商铺菜单
      shopRating: null, // 商铺评价
      shopScore: null, // 商铺评分
      RatingTags: null, // 评价分类
      startingPrice: null, // 起送价
      switchChange: true, // 商品与评价的切换开关
    };
  },

  methods: {
    async getData() {
      const query = this.$route.query;
      this.shopId = query.id + "";
      // 获取商铺详情信息
      const shopDetail = await getShopDetail(query.id);
      this.shopDetail = shopDetail;
      this.startingPrice = shopDetail.float_minimum_order_amount;
      // 获取商铺菜单
      const foodMenu = await getShopMenu(query.id);
      this.foodMenu = foodMenu;
      // 获取评论列表
      const shopRating = await getRatingList(query.id);
      this.shopRating = shopRating;
      // 获取评价信息
      const score = await getRatingScore(query.id);
      this.shopScore = score;
      // 获取评价分类
      const tags = await getRatingTags(query.id);
      this.RatingTags = tags;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/style/var.scss";
.detail-container {
  position: relative;
  .change_show_type {
    width: 100%;
    height: 2rem;
    line-height: 2rem;
    display: flex;
    box-shadow: 0 1px 2px #f1f1f1;
    margin-bottom: 1px;
    background-color: #fff;
    div {
      width: 50%;
      text-align: center;
      font-size: 0.7rem;
      line-height: 1.5rem;
      &.active {
        color: $primary;
        span {
          position: relative;

          &::before {
            content: "";
            display: block;
            position: absolute;
            width: 1.6rem;
            height: 2px;
            background-color: $primary;
            bottom: -0.3rem;
            left: 50%;
            transform: translateX(-50%);
          }
        }
      }
    }
  }
}
</style>
