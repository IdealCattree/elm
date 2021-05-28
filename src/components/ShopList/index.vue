<template>
  <div class="shoplist-container">
    <ul>
      <RouterLink
        :to="{
          name: 'ShopDetail',
          query: {
            geohash: `${shop.latitude},${shop.longitude}`,
            id: shop.id,
          },
        }"
        v-for="shop in shopList"
        :key="shop.id"
      >
        <li class="shop">
          <div class="shop_img">
            <img :src="shop.image_path" alt="" />
          </div>
          <div class="shop_content">
            <div class="header">
              <div class="shop_name">
                <span v-if="shop.is_new" class="new">品牌</span>
                <span>{{ shop.name }}</span>
              </div>
              <div class="shop_detail">
                <span v-for="support in shop.supports" :key="support.id">
                  {{ support.icon_name }}
                </span>
              </div>
            </div>
            <div class="rating_order">
              <div class="left">
                <div class="score">
                  <Star :width="shop.rating" />
                  <span>{{ shop.rating }}</span>
                </div>

                <span class="order_num">月销售{{ shop.recent_order_num }}单</span>
              </div>
              <div class="right">
                <span class="delivery_left">
                  蜂鸟专送
                </span>
              </div>
            </div>
            <div class="delivery">
              <div class="delivery_left">
                ¥{{ shop.float_minimum_order_amount }}起送
                <span>/</span>
                {{ shop.piecewise_agent_fee.tips }}
              </div>
              <div class="delivery_right">
                {{ shop.distance }}
                <span>/</span>
                <span class="time"> {{ shop.order_lead_time }}</span>
              </div>
            </div>
          </div>
        </li>
      </RouterLink>
    </ul>
  </div>
</template>

<script>
import Star from "../Star";
export default {
  components: {
    Star,
  },
  props: {
    shopList: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/style/var.scss";
.shoplist-container {
  .shop {
    display: flex;
    padding: 0.3rem 0.5rem;
    margin-bottom: 0.3rem;
    border-bottom: 1px solid #f1f1f1;
    .shop_img {
      margin-right: 0.3rem;
      img {
        width: 3rem;
        height: 3rem;
      }
    }
    .shop_content {
      font-size: 0.6rem;
      flex-grow: 1;

      .header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.5rem;
        .shop_name {
          font-weight: bold;
          .new {
            font-size: 0.5rem;
            display: inline-block;
            background-color: $warnBg;
            padding: 0 0.1rem;
            margin-right: 0.2rem;
            border-radius: 0.1rem;
          }
        }
        .shop_detail {
          font-size: 0.5rem;
          color: $lightWord;
          span {
            border: 0.025rem solid #f1f1f1;
            margin-right: 0.1rem;
            border-radius: 0.05rem;
          }
        }
      }

      .rating_order {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.5rem;
        .left {
          display: flex;
          justify-content: space-between;

          .score {
            display: flex;
            align-items: center;
            margin-right: 0.2rem;

            span {
              color: darken($warnBg, 20%);
            }
          }
          span {
            color: $lightWord;
            font-size: 0.5rem;
          }
        }

        .right {
          .delivery_left {
            font-size: 0.3rem;
            color: #fff;
            background-color: #57a9ff;
            display: inline-block;
            padding: 0 0.1rem;
            border-radius: 0.08rem;
          }
        }
      }

      .delivery {
        color: $word;
        font-size: 0.4rem;
        display: flex;
        justify-content: space-between;
        span {
          margin: 0 0.05rem;
        }
        .delivery_left {
        }
        .delivery_right {
          letter-spacing: -1.4px;
          .time {
            color: $primary;
          }
        }
      }
    }
  }
}
</style>
