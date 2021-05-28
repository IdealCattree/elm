<template>
  <div class="buy-cart-container" :class="{ active: allPrice >= startingPrice }">
    <div class="cart_icon" @click="isShowBuyList = !isShowBuyList">
      <Icon type="cart" />
      <span v-show="foodNum" class="num">{{ foodNum }}</span>
    </div>
    <div class="buy_btn">
      <span>¥{{ allPrice }}</span>
      <span @click="placeOrder" class="btn">{{
        allPrice >= startingPrice ? "去结算" : `差¥${startingPrice - allPrice}元起送`
      }}</span>
      <div class="buy_list" :class="{ active: isShowBuyList }">
        <div class="title">
          <span>购物车</span>
          <div class="empty" @click="clearCart">
            <Icon type="dustbin" />
            <span>清空</span>
          </div>
        </div>
        <ul class="list">
          <li class="item" v-show="item.num > 0" v-for="item in list" :key="item.id">
            <div class="name">
              <p class="food">{{ item.name }}</p>
              <p class="specs">{{ item.specs }}</p>
            </div>
            <div class="price">¥{{ item.price }}</div>
            <div class="choose_num">
              <Icon
                type="reduce"
                @click.native="
                  chooseCart(
                    'remove',
                    item.food.restaurant_id,
                    item.food.category_id,
                    item.food.item_id,
                    item.id
                  )
                "
              />
              <span class="num">{{ item.num }}</span>
              <Icon
                type="plus"
                @click.native="
                  chooseCart(
                    'add',
                    item.food.restaurant_id,
                    item.food.category_id,
                    item.food.item_id,
                    item.id,
                    item.name,
                    item.price,
                    item.specs,
                    item.packing_fee,
                    item.sku_id,
                    item.stock
                  )
                "
              />
            </div>
          </li>
        </ul>
      </div>
    </div>

    <Hazy @closeHazy="isShowBuyList = !isShowBuyList" :isShow="isShowBuyList" />
  </div>
</template>

<script>
import Icon from "@/components/Icon";
import Hazy from "@/components/Hazy";
import ChooseNum from "./ChooseNum";
import chooseBuyCart from "@/mixins/chooseBuyCart";

import { mapState } from "vuex";
export default {
  mixins: [chooseBuyCart()],
  components: {
    Icon,
    ChooseNum,
    Hazy,
  },

  props: {
    shopId: {
      type: String,
      required: true,
    },
    startingPrice: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      isShowBuyList: false,
    };
  },

  computed: {
    ...mapState("buyCart", ["cartList"]),
    shopCart() {
      if (this.cartList[this.shopId]) {
        return { ...this.cartList[this.shopId] };
      }
      return {};
    },

    foodNum() {
      let num = 0;
      num = this.sum("num");
      return num;
    },

    allPrice() {
      let allPrice = 0;
      allPrice = this.sum("price");
      return allPrice;
    },

    list: {
      get() {
        let arr = [];
        arr = this.sum("list");
        return arr;
      },
      set(val) {},
    },
  },

  methods: {
    sum(type) {
      let sum = 0;
      const arr = [];
      const shop = Object.values(this.shopCart);
      if (shop.length === 0) {
        return sum;
      }

      shop.forEach(item => {
        const category = Object.values(item);
        category.forEach(item => {
          const food = Object.values(item);
          food.forEach(item => {
            if (type === "list") {
              arr.push(item);
            } else if (type === "price") {
              sum += item[type] * item.num;
            } else {
              sum += item[type];
            }
          });
        });
      });

      if (type === "list") {
        return arr;
      }
      return sum;
    },

    clearCart() {
      if (!this.list) {
        return;
      }
      this.$store.commit("buyCart/clearCart");
    },

    placeOrder() {
      if (this.allPrice >= this.startingPrice) {
        // 可以下单
        const query = this.$route.query;
        this.$router.push({
          name: "ConfirmOrder",
          query,
        });
      } else {
        // 金额不够
        this.$showMessage({ content: `还差${this.startingPrice - this.allPrice}元` });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/style/var.scss";
.buy-cart-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3rem;
  background-color: rgba($dark, 0.9);
  box-sizing: border-box;

  .cart_icon {
    width: 13.333vw;
    height: 13.333vw;
    border-radius: 50%;
    border: 0.25rem solid darken(#444, $amount: 10%);
    position: absolute;
    z-index: 10;
    top: -0.7rem;
    left: 0.6rem;
    background-color: $dark;
    text-align: center;
    line-height: 13.333vw;
    color: #fff;

    .num {
      position: absolute;
      top: -0.4rem;
      right: -0.4rem;
      line-height: 1;
      font-size: 0.7rem;
      padding: 0.1rem 0.2rem;
      background-color: $danger;
      border-radius: 50%;
    }
  }
  .buy_btn {
    box-sizing: border-box;
    padding-left: 4rem;
    padding-top: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.8rem;
    color: #fff;
    position: relative;
    .btn {
      font-size: 0.7rem;
      border-radius: 0.1rem;
      padding: 0.3rem 0.5rem;
      background-color: #535356;
      margin-right: 0.5rem;
      font-weight: bold;
    }

    .buy_list {
      position: absolute;
      width: 100%;
      left: 0rem;
      top: 0rem;
      z-index: 10;
      background-color: #fff;
      color: $word;
      font-size: 0.7rem;
      padding-bottom: 1rem;
      display: none;
      transition: all 0.3s;

      &.active {
        transform: translateY(-100%);
        display: block;
      }

      .title {
        display: flex;
        justify-content: space-between;
        padding: 0.3rem 0.5rem;
        background-color: #eceff1;
        height: 1.3rem;
        line-height: 1.3rem;
      }

      .list {
        .item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem;
          .name {
            width: 55%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            .food {
              font-weight: bold;
            }
            .specs {
              font-size: 0.5rem;
            }
          }
          .price {
            font-weight: bold;
            color: #f60;
          }
          .choose_num {
            display: flex;
            align-items: center;
          }
        }
      }
    }
  }
  &.active {
    .cart_icon {
      background-color: $primary;
    }
    .buy_btn {
      .btn {
        background-color: $success;
      }
    }
  }
}
</style>
