<template>
  <div class="footer-container">
    <router-link
      :key="n.path"
      v-for="n in nav"
      :to="{ name: n.name }"
      tag="div"
      exact-active-class="active"
      class="icon"
      :class="n.type"
    >
      <Icon :type="n.type" />
      <p>{{ n.title }}</p>
    </router-link>
  </div>
</template>

<script>
import Icon from "@/components/Icon";
export default {
  components: {
    Icon,
  },
  data() {
    return {
      nav: [
        { type: "elm", title: "首页", name: "Home" },
        { type: "discover", title: "发现", name: "Discover" },
        { type: "order", title: "订单", name: "Order" },
        { type: "user", title: "我的", name: "User" },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@import "~@/style/var.scss";
.footer-container {
  position: fixed;
  bottom: 0;
  padding-top: 2vw;
  padding-bottom: 3vw;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  box-shadow: 0 -0.266667vw 0.533333vw rgba(0, 0, 0, 0.1);
  width: 100%;
  color: $lightWord;
  z-index: 999;
  background-color: #fff;
  .icon {
    text-align: center;
    &.active {
      color: $primary;
    }
    i {
      font-size: 1rem;
    }

    p {
      font-size: 0.5rem;
    }
  }
  .elm {
    i {
      font-size: 0.8rem;
    }
  }

  .user {
    i {
      font-size: 0.8rem;
    }
  }
}
</style>
