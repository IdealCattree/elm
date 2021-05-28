<template>
  <div class="order-container" ref="orderContainer">
    <Header>
      订单列表
    </Header>
    <ul class="order_list" v-if="orderList && userInfo.user_id">
      <li class="order_item" v-for="order in orderList">
        <div class="order_item_left">
          <img :src="`/img/${order.restaurant_image_url}`" alt="" />
        </div>
        <section class="order_item_right">
          <div class="order_content">
            <div class="content_header">
              <div class="shop_name" @click="showDetail(order)">
                <div class="name">
                  <span>{{ order.restaurant_name }}</span>
                  <Icon type="enter" />
                </div>
                <div class="time">{{ order.formatted_created_at }}</div>
              </div>
              <div class="order_detail_info">
                {{ order.status_bar.title }}
              </div>
            </div>
            <div class="order_basket">
              <p class="order_name">
                {{ `${order.basket.group[0][0].name}等${order.basket.group[0].length}件商品` }}
              </p>
              <p class="order_price">¥{{ order.total_amount.toFixed(2) }}</p>
            </div>
          </div>
          <div class="order_again">
            <div @click="gotoPay" v-if="order.status_bar.title == '等待支付'" class="count_down">
              <Countdown :countNum="900 - order.time_pass" />
            </div>
            <RouterLink
              v-else
              :to="{ name: 'ShopDetail', query: { id: order.restaurant_id, geohash } }"
              class="buy_again"
              >再来一单</RouterLink
            >
          </div>
        </section>
      </li>
    </ul>
    <Loading v-if="isLoading" />
  </div>
</template>

<script>
import Header from "@/components/Header";
import Icon from "@/components/Icon";
import Countdown from "@/components/Countdown";
import { mapMutations } from "vuex";
import { mapState } from "vuex";
import { getOrderList } from "@/apis";
import fetchData from "@/mixins/fetchData";
import Loading from "@/components/Loading";
export default {
  mixins: [fetchData],
  components: {
    Header,
    Countdown,
    Icon,
    Loading,
  },
  data() {
    return {
      page: 0, // 分页获取订单列表的页数
      orderList: null, // 获取的订单列表
      limit: 10, // 页容量
      isLoading: false, // 是否正在加载数据
      fetchMore: false, // 是否正在加载更多数据
    };
  },

  computed: {
    ...mapState("user", ["userInfo"]),
    ...mapState("location", ["geohash"]),
  },

  methods: {
    ...mapMutations("orderList", ["saveOrderDetail"]),

    /**
     * 点击 li元素进入订单详情页
     */
    showDetail(order) {
      this.saveOrderDetail(order);
      this.$router.push({ name: "OrderDetail" });
    },

    /**
     * 重新请求下一页数据
     */
    async fetchMoreData() {
      this.fetchMore = true;
      this.page = this.page + 1;
      const list = await getOrderList(this.userInfo.user_id, this.page * this.limit, this.limit);
      this.orderList = [...this.orderList, ...list];
      this.fetchMore = false;
    },

    /**
     * 监听滚动条滚动事件
     * 当快滚动到底部时重新去请求下一页数据
     */
    handleScroll() {
      const rect = 90;
      const dom = this.$refs.orderContainer;
      const dec = Math.abs(dom.scrollHeight - dom.scrollTop - dom.clientHeight);
      if (dec < rect && !this.fetchMore) {
        // 重新请求数据
        this.fetchMoreData();
      }
    },

    //当订单未超时时点击倒计时执行去支付操作
    gotoPay() {
      this.$showMessage({ content: "当前环境无法支付，请打开官方APP进行付款" });
    },

    /**
     * 请求数据
     */
    async getData() {
      if (!(this.userInfo && this.userInfo.user_id)) {
        await this.$store.dispatch("user/whoAmI");
      }
      const list = await getOrderList(this.userInfo.user_id, this.page * this.limit, this.limit);
      this.orderList = list;
    },
  },

  mounted() {
    // 监听根元素的滚动条事件
    this.$refs.orderContainer.addEventListener("scroll", this.handleScroll, false);
  },
};
</script>

<style lang="scss" scoped>
@import "~@/style/var.scss";
.order-container {
  background-color: #f1f1f1;
  height: 100vh;
  padding-bottom: 3rem;
  box-sizing: border-box;
  overflow-y: auto;
  .header-container {
    position: fixed;
    top: 0;
  }

  .order_list {
    margin-top: 2rem;
    background-color: #f1f1f1;

    .order_item {
      background-color: #fff;
      padding: 0.5rem 0.5rem 0;
      margin-bottom: 0.5rem;
      display: flex;
      .order_item_left {
        margin-right: 0.5rem;
        img {
          width: 2rem;
          height: 2rem;
        }
      }
      .order_item_right {
        font-size: 0.6rem;
        color: $lightWord;
        flex: 1;
        .order_content {
          .content_header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 0.5rem;
            border-bottom: 1px solid #f7f7f7;
            .shop_name {
              flex-grow: 5;
              .name {
                font-size: 0.75rem;
                color: $dark;
              }
              .time {
                letter-spacing: -1px;
              }
            }
            .order_detail_info {
              flex-grow: 1;
              text-align: right;
              color: $word;
            }
          }
          .order_basket {
            font-size: 0.55rem;
            display: flex;
            justify-content: space-between;
            line-height: 1.5rem;
            border-bottom: 1px solid #f7f7f7;
            margin-bottom: 0.5rem;
            .order_name {
              color: $word;
            }
            .order_price {
              font-weight: bold;
              color: #f60;
            }
          }
        }

        .order_again {
          line-height: 1.5rem;
          text-align: right;
          .buy_again {
            background-color: #fff;
            border: 1px solid $primary;
            border-radius: 0.1rem;
            color: $primary;
            padding: 0.05rem 0.2rem;
          }

          .count_down {
            .countdown-container {
              background-color: $warnBg;
              padding: 0.1rem 0.3rem;
              border-radius: 0.15rem;
              color: $warnWord;
              font-weight: bold;
            }
          }
        }
      }
    }
  }
}
</style>
