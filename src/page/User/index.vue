<template>
  <div class="user-container">
    <Header>
      我的
    </Header>
    <RouterLink
      class="profile_number"
      :to="userInfo && userInfo.user_id ? '/user/info' : '/login'"
      tag="div"
    >
      <img class="avatar" v-if="userInfo && userInfo.user_id" :src="`/img/${avatar}`" alt="" />
      <img class="avatar" v-else src="../../assets/avatart_default.png" alt="" />
      <div class="user_info">
        <p class="user_name">{{ username }}</p>
        <p class="user_phone">
          <Icon type="mobile" />
          <span>{{ mobile }}</span>
        </p>
      </div>
      <Icon type="enter" />
    </RouterLink>

    <section class="info_data">
      <ul class="info_data_ul">
        <RouterLink tag="li" :to="{ name: 'Balance' }" class="info_data_link">
          <span class="info_data_top"
            ><b>{{ balance.toFixed(2) }}</b
            >元</span
          >
          <span class="info_data_bottom">我的余额</span>
        </RouterLink>
        <RouterLink tag="li" to="/" class="info_data_link">
          <span class="info_data_top"
            ><b>{{ count }}</b
            >个</span
          >
          <span class="info_data_bottom">我的优惠</span>
        </RouterLink>
        <RouterLink tag="li" :to="{ name: 'Points' }" class="info_data_link">
          <span class="info_data_top"
            ><b>{{ pointNumber }}</b
            >分</span
          >
          <span class="info_data_bottom">我的积分</span>
        </RouterLink>
      </ul>
    </section>

    <section class="info_power">
      <RouterLink class="myorder" to="/order" tag="li">
        <aside>
          <Icon type="order" />
          <span>我的订单</span>
        </aside>
        <Icon type="enter" />
      </RouterLink>
      <RouterLink class="shangcheng" to="/order" tag="li">
        <aside>
          <Icon type="shangcheng" />
          <span>积分商城</span>
        </aside>
        <Icon type="enter" />
      </RouterLink>
      <RouterLink class="huiyuan" to="/order" tag="li">
        <aside>
          <Icon type="huiyuan" />
          <span>饿了么会员卡</span>
        </aside>
        <Icon type="enter" />
      </RouterLink>
    </section>

    <section class="info_power">
      <RouterLink class="fuwu" to="/order" tag="li">
        <aside>
          <Icon type="fuwuzhongxin" />
          <span>服务中心</span>
        </aside>
        <Icon type="enter" />
      </RouterLink>
      <RouterLink class="xiazai" to="/order" tag="li">
        <aside>
          <Icon type="solid_elm" />
          <span>下载饿了么APP</span>
        </aside>
        <Icon type="enter" />
      </RouterLink>
    </section>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Icon from "@/components/Icon";
import { mapState } from "vuex";
export default {
  components: {
    Header,
    Icon,
  },
  data() {
    return {
      username: "登录/注册",
      mobile: "暂无绑定手机号",
      balance: 0, // 我的余额
      count: 0, // 优惠券个数
      pointNumber: 0, // 积分数
      avatar: "", // 头像地址
    };
  },

  computed: {
    ...mapState("user", ["userInfo"]),
  },

  async created() {
    if (!(this.userInfo && this.userInfo.user_id)) {
      await this.$store.dispatch("user/whoAmI");
    }
    if (this.userInfo && this.userInfo.user_id) {
      this.avatar = this.userInfo.avatar;
      this.username = this.userInfo.username;
      this.mobile = this.userInfo.mobile || "暂无绑定手机号";
      this.balance = this.userInfo.balance;
      this.count = this.userInfo.gift_amount;
      this.pointNumber = this.userInfo.point;
    }
  },
};
</script>

<style lang="scss" scoped>
@import "~@/style/var.scss";
.user-container {
  background-color: #f1f1f1;
  height: 100vh;

  .profile_number {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.6rem;
    background: linear-gradient(90deg, #0af, #0085ff);
    color: #fff;
    .avatar {
      font-size: 3rem;
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      margin-right: 0.5rem;
    }
    .user_info {
      flex: 1;
      .user_name {
        font-size: 0.8rem;
        font-weight: bold;
        margin-bottom: 0.3rem;
      }
      .user_phone {
        font-size: 0.65rem;
      }
    }
  }

  .info_data {
    background-color: #fff;
    margin-bottom: 0.8rem;
    .info_data_ul {
      display: flex;
      text-align: center;
      font-size: 0.58rem;
      color: $word;
      .info_data_link {
        flex: 1;
        border-right: 1px solid #f1f1f1;
        .info_data_top {
          display: block;
          padding: 0.85rem 0 0.45rem;
          b {
            font-size: 1.2rem;
            font-weight: bold;
            color: #f90;
          }
        }
        .info_data_bottom {
          display: block;
          padding-bottom: 0.4rem;
        }

        &:nth-of-type(2) {
          b {
            color: #ff5f3e;
          }
        }
        &:nth-of-type(3) {
          b {
            color: #6ac20b;
          }
        }
      }
    }
  }

  .info_power {
    background-color: #fff;
    margin-bottom: 0.8rem;
    li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.2rem 0.5rem;
      font-size: 0.7rem;
      line-height: 1.5rem;
      border-bottom: 1px solid #f1f1f1;
      aside {
        .icon-container {
          margin-right: 0.3rem;
          font-size: 0.9rem;
        }
      }

      &.shangcheng {
        aside {
          .icon-container {
            color: #fc7b53;
          }
        }
      }
      &.huiyuan {
        aside {
          .icon-container {
            color: #ffc636;
          }
        }
      }
      &.fuwu {
        aside {
          .icon-container {
            color: #4aa5f0;
          }
        }
      }
      &.xiazai {
        aside {
          .icon-container {
            color: #3cabff;
          }
        }
      }
    }
  }
}
</style>
