<template>
  <div class="payment-container">
    <Header :goback="true">
      在线支付
    </Header>
    <section class="time_last">
      <header class="header">剩余支付时间</header>
      <p class="time">
        <Countdown :countNum="countNum" />
      </p>
    </section>
    <section class="payway">
      <header class="header">
        选择支付方式
      </header>
      <ul class="payway_list">
        <li @click="payWay = 1" class="payway_item">
          <div class="icon zhifubao">
            <Icon type="zhifubao" />
            <span>支付宝</span>
          </div>
          <Icon :class="{ active: payWay === 1, select: true }" type="success" />
        </li>
        <li @click="payWay = 2" class="payway_item">
          <div class="icon weixin">
            <Icon type="weixin" />
            <span>微信</span>
          </div>
          <Icon :class="{ active: payWay === 2, select: true }" type="success" />
        </li>
      </ul>
    </section>

    <button @click="confirmPay" class="determine">确认支付</button>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Icon from "@/components/Icon";
import Countdown from "@/components/Countdown";
import { payRequest } from "@/apis";
import { mapState, mapMutations } from "vuex";
export default {
  components: {
    Header,
    Icon,
    Countdown,
  },

  data() {
    return {
      payWay: 1, // 付款方式 1为支付宝 2为微信
      countNum: 900, // 支付倒计时
      timer: null, // 计时器
      payDetail: null, // 支付详情
    };
  },

  computed: {
    ...mapState("user", ["userInfo"]),
    ...mapState("confirmOrder", ["orderMessage", "shopId"]),
  },

  methods: {
    ...mapMutations("buyCart", ["clearCartOfShopId"]),
    async initData() {
      const payDetail = await payRequest({
        merchantOrderNo: this.orderMessage.order_id,
        userId: this.userInfo.user_id,
      });
      this.payDetail = payDetail;
      if (this.payDetail.message) {
        this.$showMessage({ content: this.payDetail.message });
        return;
      }
    },

    /**
     * 确认付款
     */
    confirmPay() {
      this.$showMessage({
        content: "当前环境无法支付，请打开官方APP进行付款",
        cb: () => {
          this.$router.push({ name: "Order" });
        },
      });
    },
  },

  async created() {
    await this.initData();
    if (this.shopId) {
      this.clearCartOfShopId(this.shopId);
    }
  },
};
</script>

<style lang="scss" scoped>
@import "~@/style/var.scss";
.payment-container {
  background-color: #f1f1f1;
  height: 100vh;
  color: $dark;
  .time_last {
    padding: 0.8rem;
    text-align: center;
    background-color: #fff;

    .header {
      margin-top: 1rem;
      font-size: 0.7rem;
      color: $word;
    }
    .time {
      font-size: 1.5rem;
      margin: 0.3rem 0 1rem;
    }
  }

  .payway {
    color: $word;
    .header {
      font-size: 0.75rem;
      line-height: 2rem;
      padding: 0 0.8rem;
    }
    .payway_list {
      background-color: #fff;
      padding: 0 0.8rem;
      .payway_item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        line-height: 3rem;
        font-size: 0.7rem;
        .icon {
          display: flex;
          align-items: center;
          .icon-container {
            margin-right: 0.6rem;
          }
          &.zhifubao {
            .icon-container {
              margin-right: 0.6rem;
              font-size: 2rem;
              color: $primary;
            }
          }
          &.weixin {
            .icon-container {
              margin-right: 0.4rem;
              font-size: 2.7rem;
              color: $success;
              margin-left: -0.4rem;
            }
          }
        }

        .select {
          font-size: 1rem;

          &.active {
            color: $success;
          }
        }
      }
    }
  }

  .determine {
    display: block;
    margin: 1rem auto;
    width: 14rem;
    height: 2rem;
    border-radius: 0.2rem;
    background-color: $success;
    color: #fff;
    font-size: 0.7rem;
  }
}
</style>
