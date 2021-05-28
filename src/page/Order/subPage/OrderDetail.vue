<template>
  <div class="order-detail-container">
    <Header :goback="true">
      订单详情
    </Header>
    <section class="order_title" v-if="orderDetail">
      <img :src="`/img/${orderDetail.restaurant_image_url}`" alt="" />
      <p class="order_status">{{ orderDetail.status_bar.title }}</p>
      <RouterLink
        :to="{ name: 'ShopDetail', query: { id: orderDetail.restaurant_id, geohash } }"
        tag="p"
        class="order_again"
        >再来一单</RouterLink
      >
    </section>

    <section class="food_list" v-if="orderDetail">
      <RouterLink
        :to="{ name: 'ShopDetail', query: { id: orderDetail.restaurant_id, geohash } }"
        tag="div"
        class="shop_detail"
      >
        <div class="shop_name">
          <img :src="`/img/${orderDetail.restaurant_image_url}`" alt="" />
          <span>{{ orderDetail.restaurant_name }}</span>
        </div>
        <Icon type="enter" />
      </RouterLink>

      <ul class="food_list_ul">
        <li class="food_list_li" v-for="food in orderDetail.basket.group[0]" :key="food._id">
          <p class="food_name">{{ food.name }}</p>
          <div class="quantity_price">
            <span>x{{ food.quantity }}</span>
            <span>¥{{ food.price }}</span>
          </div>
        </li>
      </ul>

      <div class="delivery_fee">
        <span>{{ orderDetail.basket.deliver_fee.name }}</span>
        <span>{{ orderDetail.basket.deliver_fee.price }}</span>
      </div>

      <div class="pay_ment">实付¥{{ orderDetail.total_amount.toFixed(2) }}</div>
    </section>

    <section class="delivery_info" v-if="orderData">
      <header class="title">
        配送信息
      </header>
      <div class="info_item">
        <p class="info_itme_left">
          送达时间：
        </p>
        <div class="info_item_right">
          <p>{{ orderData.deliver_time }}</p>
        </div>
      </div>
      <div class="info_item">
        <p class="info_itme_left">
          送货地址：
        </p>
        <div class="info_item_right">
          <p>{{ orderData.consignee }}</p>
          <p>{{ orderData.phone }}</p>
          <p>{{ orderData.addressDetail }}</p>
        </div>
      </div>
      <div class="info_item">
        <p class="info_itme_left">
          配送方式：
        </p>
        <div class="info_item_right">
          <p>蜂鸟专送</p>
        </div>
      </div>
    </section>

    <section class="delivery_info">
      <header class="title">
        订单信息
      </header>
      <div class="info_item">
        <p class="info_itme_left">
          订单号：
        </p>
        <div class="info_item_right">
          <p>{{ orderDetail.id }}</p>
        </div>
      </div>
      <div class="info_item">
        <p class="info_itme_left">
          支付方式：
        </p>
        <div class="info_item_right">
          <p>在线支付</p>
        </div>
      </div>
      <div class="info_item">
        <p class="info_itme_left">
          下单时间：
        </p>
        <div class="info_item_right">
          <p>{{ orderDetail.formatted_created_at }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Icon from "@/components/Icon";
import { mapState } from "vuex";
import { getOrderDetail } from "@/apis";
export default {
  components: {
    Header,
    Icon,
  },
  data() {
    return {
      orderData: null, // 根据订单id请求回来的订单详情信息
    };
  },

  computed: {
    ...mapState("orderList", ["orderDetail"]),
    ...mapState("user", ["userInfo"]),
    ...mapState("location", ["geohash"]),
  },

  async created() {
    if (this.userInfo && this.userInfo.user_id && this.orderDetail) {
      const data = await getOrderDetail(this.userInfo.user_id, this.orderDetail.unique_id);
      this.orderData = data;
    }
  },
};
</script>

<style lang="scss" scoped>
@import "~@/style/var.scss";
.order-detail-container {
  background-color: #f1f1f1;
  .header-container {
    position: fixed;
    top: 0;
  }

  .order_title {
    background-color: #fff;
    padding: 3rem 0;
    text-align: center;
    img {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      margin-bottom: 0.5rem;
    }
    .order_status {
      margin-bottom: 0.5rem;
      font-size: 0.8rem;
      font-weight: bold;
    }
    .order_again {
      display: inline-block;
      font-size: 0.7rem;
      color: $primary;
      border: 1px solid $primary;
      padding: 0.1rem 0.2rem;
      border-radius: 0.15rem;
    }
  }

  .food_list {
    background-color: #fff;
    margin-top: 0.8rem;
    padding: 0 0.5rem;
    font-size: 0.6rem;
    color: $dark;
    .shop_detail {
      display: flex;
      padding: 0.5rem 0;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #f7f7f7;
      .shop_name {
        display: flex;
        align-items: center;
        font-size: 0.75rem;
        font-weight: bold;
        img {
          width: 1.5rem;
          height: 1.5rem;
          margin-right: 0.5rem;
        }
      }
    }

    .food_list_ul {
      border-bottom: 1px solid #f7f7f7;
      .food_list_li {
        display: flex;
        line-height: 2rem;
        align-items: center;
        .food_name {
          flex: 4;
        }
        .quantity_price {
          flex: 1;
          display: flex;
          justify-content: space-between;
          span {
            &:first-of-type {
              color: $lightWord;
            }
          }
        }
      }
    }

    .delivery_fee {
      display: flex;
      justify-content: space-between;
      line-height: 2rem;
      border-bottom: 1px solid #f7f7f7;
    }

    .pay_ment {
      text-align: right;
      line-height: 2rem;
      color: #f40;
      font-weight: bold;
    }
  }

  .delivery_info {
    background-color: #fff;
    margin-top: 0.8rem;
    padding: 0 0.5rem;
    font-size: 0.65rem;
    .title {
      font-size: 0.75rem;
      line-height: 2rem;
      border-bottom: 1px solid #f7f7f7;
    }
    .info_item {
      display: flex;
      padding: 0.5rem 0;
      color: $word;
    }
  }
}
</style>
