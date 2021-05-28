<template>
  <div class="header-container">
    <slot name="position"></slot>
    <slot name="user"></slot>
    <slot name="edit"></slot>
    <slot></slot>
    <div @click="$router.back()" class="header_goback" v-if="goback">
      <Icon type="back" />
    </div>
  </div>
</template>

<script>
import Icon from "@/components/Icon";
export default {
  components: {
    Icon,
  },
  props: {
    goback: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleGoBack() {
      console.log(this.$router);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/style/common.scss";
@import "~@/style/var.scss";
.header-container {
  font-size: 0.8rem;
  font-weight: bold;
  width: 100%;
  height: 2rem;
  line-height: 2rem;
  color: #fff;
  background: linear-gradient(90deg, #0af, $primaryBg);
  position: relative;
  text-align: center;
  .header_goback {
    @include self-center;
    left: 0.8rem;
  }
}
</style>
