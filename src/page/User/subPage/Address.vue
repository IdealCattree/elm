<template>
  <div class="address-container">
    <Header :goback="true">
      编辑地址
      <template #edit>
        <span @click="isClose = !isClose" class="edit">编辑</span>
      </template>
    </Header>
    <ul class="address_list">
      <li class="address_item" v-for="(address, i) in addressList" :key="address.id">
        <div class="address_info">
          <p>{{ address.address }}</p>
          <p>
            <span>
              {{ address.name }}
              {{ address.sex === 1 ? "先生" : "女士" }}
            </span>
            <span>{{ address.phone }}</span>
          </p>
        </div>
        <Icon @click.native="deleteAddress(address)" v-show="isClose" type="close" />
      </li>
    </ul>

    <div class="add" @click="$router.push({ name: 'AddAddress' })">
      <Icon type="plus" />
      <span>新增地址</span>
    </div>
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
      isClose: false,
    };
  },
  computed: {
    ...mapState("user", ["addressList", "userInfo"]),
  },

  methods: {
    deleteAddress(address) {
      this.$store.dispatch("user/removeAddress", {
        user_id: this.userInfo.user_id,
        address_id: address.id,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/style/var.scss";
.address-container {
  .header-container {
    position: relative;
    .edit {
      font-size: 0.7rem;
      font-weight: normal;
      position: absolute;
      right: 0.4rem;
    }
  }

  .address_list {
    font-size: 0.7rem;
    .address_item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: $dark;
      border-bottom: 1px solid #d9d9d9;
      padding: 0.4rem;
      p {
        margin-bottom: 0.2rem;
        span {
          margin-right: 0.3rem;
        }
      }
    }
  }

  .add {
    font-size: 0.8rem;
    color: $primary;
    position: fixed;
    bottom: 0.5rem;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    span {
      margin-left: 0.3rem;
    }
  }
}
</style>
