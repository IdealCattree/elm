<template>
  <div class="choose-address-container">
    <Header :goback="true">
      选择地址
    </Header>
    <RouterLink :to="{ name: 'AddAddress', query: { user_id: '62143' } }" class="add_address">
      <img src="../../../assets/add_address.png" alt="" />
      <span>新增收货地址</span>
    </RouterLink>

    <section class="list_cotainer">
      <ul class="delivery_address">
        <li @click="chooseAddress(address)" v-for="address in deliverable">
          <Icon type="success" :class="{ active: address.id === addressIndex }" />
          <div class="cotent">
            <div class="user_detail">
              <span>{{ address.name }}</span>
              <span>{{ address.sex === 1 ? "先生" : "女士" }}</span>
              <span>{{ address.phone }}</span>
            </div>
            <div class="address_detail">
              <span class="icon">1</span>
              <span>{{ address.address_detail }}</span>
            </div>
          </div>
        </li>
      </ul>
    </section>
    <Loading v-if="isLoading" />
  </div>
</template>

<script>
import Header from "@/components/Header";
import Icon from "@/components/Icon";
import { getAddressList } from "@/apis";
import { mapState } from "vuex";
import fetchData from "@/mixins/fetchData";
import Loading from "@/components/Loading";
export default {
  mixins: [fetchData],
  components: {
    Header,
    Icon,
    Loading,
  },

  data() {
    return {
      id: "", // 购物车id
      sig: "",
      addressList: [], //地址列表
    };
  },

  computed: {
    ...mapState("confirmOrder", ["address", "addressIndex"]),
    ...mapState("user", ["userInfo"]),
    //有效地址列表
    deliverable() {
      return this.addressList.filter(item => item.is_deliverable);
    },

    //无效地址列表
    deliverdisable() {
      return this.addressList.filter(item => !item.is_deliverable);
    },
  },

  methods: {
    chooseAddress(address) {
      this.$store.commit("confirmOrder/chooseAddress", { address, index: address.id });
      this.$router.go(-1);
    },
  },

  async created() {
    this.isLoading = true;
    this.id = this.$route.query.id;
    this.sig = this.$route.query.sig;
  },

  async mounted() {
    // 根据user_id获取地址

    if (this.userInfo && this.userInfo.user_id) {
      const address = await getAddressList(this.userInfo.user_id);
      this.addressList = address;
      this.isLoading = false;
    } else {
      const result = await this.$store.dispatch("user/whoAmI");
      if (result) {
        const address = await getAddressList(this.userInfo.user_id);
        this.addressList = address;
        this.isLoading = false;
        return;
      }

      this.$showMessage({
        content: "请先登录",
        duration: 1000,
        cb: () => {
          this.$router.push({ name: "Login" });
        },
      });
    }
  },
};
</script>

<style lang="scss" scoped>
@import "~@/style/var.scss";
.choose-address-container {
  .add_address {
    position: absolute;
    bottom: 10px;
    font-size: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    img {
      width: 1rem;
      height: 1rem;
      margin-right: 0.3rem;
    }
  }

  .list_cotainer {
    .delivery_address {
      padding: 0 0.5rem;
      li {
        display: flex;
        align-items: center;
        padding: 0.8rem 0;
        border-bottom: 1px solid #f7f7f7;
        .icon-container {
          width: 1.5rem;
          color: $success;
          opacity: 0;
          &.active {
            opacity: 1;
          }
        }
        .cotent {
          flex-grow: 1;
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
      }
    }
  }
}
</style>
