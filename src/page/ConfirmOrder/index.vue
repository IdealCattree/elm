<template>
  <div class="confirm-order-container" v-if="checkoutData.cart">
    <Header :goback="true">
      确认订单
    </Header>
    <section
      @click="
        $router.push({
          name: 'ChooseAddress',
          query: { id: checkoutData.cart.id, sig: checkoutData.sig },
        })
      "
      class="address_container container_style common_flex"
    >
      <Icon type="near" />
      <div class="content" v-if="address">
        <div class="user_detail">
          <span>{{ address.name }}</span>
          <span>{{ address.sex === 1 ? "先生" : "女士" }}</span>
          <span>{{ address.phone }}</span>
        </div>
        <div class="address_detail">
          <span class="icon">{{ address.is_valid }}</span>
          <span>{{ address.address_detail }}</span>
        </div>
      </div>
      <div class="add_address" v-else>
        请添加一个收货地址
      </div>
      <Icon type="enter" />
    </section>

    <section class="delivery_time_container common_flex container_style">
      <div class="title">送达时间</div>
      <div class="delivery_time">
        <p>尽快送达 | 预计 {{ checkoutData.delivery_reach_time }}</p>
        <p v-if="checkoutData.cart.is_deliver_by_fengniao">蜂鸟专送</p>
      </div>
    </section>

    <section class="pay_way container_style ">
      <div class="header_style pay_common">
        <span>支付方式</span>
        <span @click="isShowPayWay = true">
          在线支付
          <Icon type="enter" />
        </span>
      </div>
      <div class="hongbao pay_common">
        <span>红包</span>
        <span>暂时只在饿了么 APP 中支持</span>
      </div>
      <AlertTip :class="{ show: isShowPayWay }" :isShow="true">
        <div class="title">支付方式</div>
        <ul>
          <li
            v-for="item in checkoutData.payments"
            :class="{ disabled: !item.is_online_payment }"
            :key="item.id"
          >
            <span>{{ item.name }}{{ item.description }}</span>
            <Icon type="success" />
          </li>
        </ul>
      </AlertTip>
      <Hazy @closeHazy="isShowPayWay = false" :isShow="isShowPayWay" />
    </section>

    <section class="food_list container_style">
      <header class="shop_title">
        <img :src="`/img/${checkoutData.cart.restaurant_info.image_path}`" alt="" />
        <span>{{ checkoutData.cart.restaurant_info.name }}</span>
      </header>
      <ul class="food_list_ul" v-if="checkoutData.cart.groups">
        <li class="food_item" v-for="item in checkoutData.cart.groups[0]" :key="item.id">
          <p>{{ item.name }}</p>
          <div class="num_price">
            <span class="num">x {{ item.quantity }}</span>
            <span>¥{{ item.price }}</span>
          </div>
        </li>
      </ul>
      <div class="food_item" v-if="checkoutData.cart.extra">
        <p>{{ checkoutData.cart.extra[0].name }}</p>
        <div class="num_price">
          <span class="num"></span>
          <span>¥{{ checkoutData.cart.extra[0].price }}</span>
        </div>
      </div>
      <div class="food_item">
        <p>配送费</p>
        <div class="num_price">
          <span class="num"></span>
          <span>¥{{ checkoutData.cart.deliver_amount || 0 }}</span>
        </div>
      </div>
      <div class="food_item total_price">
        <p>订单 ¥{{ checkoutData.cart.total }}</p>
        <div class="num_price">
          <span>待支付 ¥{{ checkoutData.cart.total }}</span>
        </div>
      </div>
    </section>

    <section class="pay_way container_style">
      <div class="header_style pay_common">
        <span>订单备注</span>
        <span
          @click="
            $router.push({
              name: 'Remark',
              query: { id: checkoutData.cart.id, sig: checkoutData.sig },
            })
          "
        >
          {{
            remark.remarkList + remark.remarkText
              ? remark.remarkList + "   " + remark.remarkText
              : "口味、偏好等"
          }}
          <Icon type="enter" />
        </span>
      </div>
      <div class="hongbao pay_common">
        <span>发票抬头</span>
        <span @click="$router.push({ name: 'Invoic' })">
          不需要开发票
          <Icon type="enter" />
        </span>
      </div>
    </section>

    <section class="confrim_order">
      <div>待支付 ¥{{ checkoutData.cart.total }}</div>
      <button @click="confirmOrder">确认下单</button>
    </section>
    <Loading v-if="isLoading" />
  </div>
</template>

<script>
import Header from "@/components/Header";
import Icon from "@/components/Icon";
import AlertTip from "@/components/AlertTip";
import Hazy from "@/components/Hazy";
import { mapState, mapMutations } from "vuex";
import { checkout, getAddressList, placeOrder } from "@/apis";
import borderBg from "@/assets/border.png";
import fetchData from "@/mixins/fetchData";
import Loading from "@/components/Loading";
export default {
  mixins: [fetchData],
  components: {
    Header,
    Icon,
    AlertTip,
    Hazy,
    Loading,
  },
  data() {
    return {
      shopId: "",
      shopCart: "",
      geohash: "",
      borderBg,
      checkoutData: {},
      isShowPayWay: false, // 是否显示支付方式的遮罩层
    };
  },
  computed: {
    ...mapState("buyCart", ["cartList"]),
    ...mapState("confirmOrder", ["remark", "address", "sig", "cart_id"]),
    ...mapState("user", ["userInfo"]),
    remarklist() {
      let str = "";
      if (this.remark.remarkList) {
        str += this.remark.remarkList;
        if (this.remark.remarkText) {
          str += "，" + this.remark.remarkText;
        }
      }
      return str;
    },
  },
  methods: {
    ...mapMutations("confirmOrder", ["saveOrderParmas", "saveOrderMessage", "saveShopId"]),
    // 初始化该订单的数据
    async initData() {
      this.isLoading = true;
      let arr = [];
      // 整理该店铺购物车中的食物数据
      Object.values(this.shopCart).forEach(categoryItem => {
        Object.values(categoryItem).forEach(itemValue => {
          Object.values(itemValue).forEach(item => {
            if (item.num > 0) {
              arr.push({
                attrs: [],
                extra: {},
                id: item.id,
                name: item.name,
                packing_fee: item.packing_fee,
                price: item.price,
                quantity: item.num,
                sku_id: item.sku_id,
                specs: [item.specs],
                stock: item.stock,
              });
            }
          });
        });
      });

      const checkoutData = await checkout(this.geohash, [arr], this.shopId);
      this.checkoutData = checkoutData;
      this.$store.commit("confirmOrder/saveCartIdAndSig", {
        sig: this.checkoutData.sig,
        cart_id: this.checkoutData.cart.id,
      });

      // 获取收货地址
      await this.initAddress();
      this.isLoading = false;
    },

    // 获取收货地址信息，第一个为默认地址
    async initAddress() {
      if (!(this.userInfo && this.userInfo.user_id)) {
        return;
      }
      const addressList = await getAddressList(this.userInfo.user_id);
      if (addressList instanceof Array && addressList.length) {
        if (this.address) {
          return;
        }
        this.$store.commit("confirmOrder/chooseAddress", {
          address: addressList[0],
          index: addressList[0].id,
        });
      }
    },

    async confirmOrder() {
      this.isLoading = true;
      if (!(this.userInfo && this.userInfo.user_id)) {
        this.$showMessage({
          content: "请先登录",
          duration: 1000,
          cb: () => {
            this.$router.push({ name: "Login" });
          },
        });
        return;
      } else if (!this.address) {
        this.$showMessage({ content: "请添加一个地址" });
        return;
      }
      this.saveOrderParmas({
        user_id: this.userInfo.user_id,
        cart_id: this.checkoutData.cart.id,
        address_id: this.address.id,
        description: this.remarklist,
        entities: this.checkoutData.cart.groups,
        geohash: this.geohash,
        sig: this.checkoutData.sig,
      });

      const orderRes = await placeOrder({
        user_id: this.userInfo.user_id,
        cart_id: this.checkoutData.cart.id,
        address_id: this.address.id,
        description: this.remarklist,
        entities: this.checkoutData.cart.groups,
        geohash: this.geohash,
        sig: this.checkoutData.sig,
      });
      this.isLoading = false;
      // 第一次下单的手机号需要验证，否则直接下单成功
      if (orderRes.need_validation) {
        // 用短信验证码验证，跳转到验证界面
      } else {
        // 保存下单返回的信息 跳转到支付界面
        this.saveOrderMessage(orderRes);
        this.$router.push({ name: "Payment" });
      }
    },
  },

  async created() {
    const id = this.$route.query.id;
    this.shopId = id;
    this.saveShopId(id);
    this.geohash = this.$route.query.geohash;
    this.shopCart = this.cartList[this.shopId];
    await this.initData();
  },
};
</script>

<style lang="scss" scoped>
@import "~@/style/var.scss";
.confirm-order-container {
  background-color: #f1f1f1;
  height: 100vh;
  padding-bottom: 4rem;

  .header-container {
    position: sticky;
    top: 0;
  }

  .container_style {
    margin-bottom: 0.5rem;
    background-color: #fff;
    padding: 0 0.8rem;
  }
  .common_flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .header-container {
    font-size: 0.8rem;
    font-weight: bold;
  }

  .address_container {
    padding: 0.8rem;
    background-image: url("../../assets/border.png");
    background-repeat: repeat-x;
    background-position: bottom;

    .icon-container {
      flex-grow: 1;
      color: $primary;
      &:last-of-type {
        color: $lightWord;
        text-align: right;
      }
    }
    .content {
      flex-grow: 4;
      color: $dark;
      font-size: 0.6rem;
      .user_detail {
        span {
          margin-right: 0.3rem;
          &:first-of-type {
            font-size: 0.8rem;
            font-weight: bold;
          }
        }
      }
      .address_detail {
        span {
          color: $lightWord;
          &:first-of-type {
            display: inline-block;
            padding: 0.02rem 0.19rem;
            color: #fff;
            font-size: 0.5rem;
            border-radius: 0.15rem;
            margin-right: 0.2rem;
            background-color: #f40;
          }
        }
      }
    }
    .add_address {
      font-size: 0.75rem;
      color: $primary;
    }
  }

  .delivery_time_container {
    padding: 0.8rem;
    font-size: 0.7rem;
    height: 3rem;
    border-left: 4px solid $primaryWord;
    .title {
      font-size: 0.8rem;
      font-weight: bold;
    }
    .delivery_time {
      color: $primary;
      p {
        &:last-of-type {
          font-size: 0.55rem;
          display: inline-block;
          margin-left: 4.2rem;
          margin-top: 0.3rem;
          border-radius: 0.1rem;
          padding: 0.05rem 0.2rem;
          color: #fff;
          background-color: $primary;
        }
      }
    }
  }

  .pay_way {
    font-size: 0.75rem;

    .alert-tip-container {
      width: 100vw;
      top: 100%;
      transform: translate(-50%, 0);
      padding-bottom: 1rem;
      transition: all 0.3s;
      &.show {
        transform: translate(-50%, -100%);
      }
      .title {
        background-color: #fafafa;
        color: $dark;
        text-align: center;
        height: 2rem;
        line-height: 2rem;
      }
      ul {
        li {
          font-size: 0.7rem;
          height: 2.5rem;
          line-height: 2.5rem;
          padding: 0 0.8rem;
          display: flex;
          justify-content: space-between;

          .icon-container {
            font-size: 1rem;
            color: $success;
          }

          &.disabled {
            color: $lightWord;
            .icon-container {
              color: #ccc;
            }
          }
        }
      }
    }

    .pay_common {
      display: flex;
      justify-content: space-between;
      height: 2rem;
      line-height: 2rem;
      border-bottom: 1px solid #f5f5f5;
      color: $word;
      span {
        &:last-of-type {
          color: $lightWord;
          font-size: 0.6rem;
        }
      }
    }

    .hongbao {
      height: 1.8rem;
      line-height: 1.8rem;
      span {
        font-size: 0.6rem;
        color: $lightWord;
      }
    }
  }

  .food_list {
    .shop_title {
      padding: 0.7rem 0;
      display: flex;
      align-items: center;
      font-size: 0.8rem;
      border: 1px solid#f7f7f7;
      img {
        margin-right: 0.4rem;
        width: 1.2rem;
        height: 1.2rem;
      }
    }

    .food_list_ul {
      padding-top: 0.5rem;
    }

    .food_item {
      display: flex;
      justify-content: space-between;
      line-height: 1.8rem;
      font-size: 0.65rem;
      p {
        width: 11rem;
      }
      .num_price {
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          &:first-of-type {
            color: #f60;
          }
        }
      }
    }

    .total_price {
      border-top: 1px solid #f7f7f7;
    }
  }

  .confrim_order {
    display: flex;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 2rem;
    line-height: 2rem;
    font-size: 0.75rem;
    color: #fff;
    div {
      background-color: #3c3c3c;
      flex: 5;
      padding-left: 0.7rem;
    }
    button {
      flex: 2;
      background-color: #56d176;
      text-align: center;
      color: #fff;
      font-size: 0.75rem;
    }
  }
}
</style>
